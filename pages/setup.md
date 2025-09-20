---
layout: page
title: Experiment Setup
permalink: /setup
order: 2
toc: Experiment Setup
---

## Hardware Setup

<img src="/extended-applicability-hwsupported-containers/assets/images/setup.pdf.svg" >

The setup consists of three nodes:

- Load generator (LoadGen): runs MoonGen as a traffic generator, creates traffic for the DuT, and receives the traffic from the DuT
- Device under test (DuT): forwards the traffic received from the LoadGen between its interfaces through packet processing applications
- Timestamper (Timer): Receives a copy of every packet exchanged between LoadGen and DuT for timestamping, which is done in hardware using the capabilities of the E810 NIC

DuT and LoadGen are directly connected via optical fibers. The Timer is connected via passive optical taps to mirror both fibers between DuT and LoadGen. The impact of passive optical terminal access points on latency is negligible.

All presented Scripts contain different names for the interfaces; those need to be adapted to be runnable on other infrastructure as the interface name is hardware-dependent.


## Images

- DuT: `Linux machine 5.10.0-10-rt-amd64 #1 SMP PREEMPT_RT Debian 5.10.84-1 (2021-12-08) x86_64 GNU/Linux`
- Loadgen: `Linux machine 4.19.0-17-amd64 #1 SMP Debian 4.19.194-3 (2021-07-18) x86_64 GNU/Linux`
- Timestamper and Evaluator: `Linux machine 5.10.0-8-amd64 #1 SMP Debian 5.10.46-4 (2021-08-03) x86_64 GNU/Linux`
- Containers: Debian Bullseye amd64 default privileged from the [official image server](https://images.linuxcontainers.org/)

## Setup Scripts
 
### DuT

Kernel parameters (adjust core lists according to experiment)
```bash
mce=ignore_ce tsc=reliable idle=poll nohz=on audit=0 nosmt console=ttyS0,115200
apparmor=0 amd_iommu=off nohz_full=24,25,26,8,9 rcu_nocbs=24,25,26,8,9
skew_tick=1 irqaffinity=0 intel_pstate=disable nmi_watchdog=0 nosoftlockup
rcu_nocb_poll random.trust_cpu=on intel_idle.max_cstate=0
systemd.unified_cgroup_hierarchy=1
```

Dependencies
```bash

for i in $(pgrep rcu[^c]) ; do taskset -pc 0 "$i" ; done

set -x

# Improving performance for the waiting time as we have no hard-drive to wait for
sysctl  vm.dirty_ratio=5
sysctl  vm.dirty_background_ratio=1

PACKAGES="pip lxc debootstrap python3-lxc ethtool"
DEBIAN_FRONTEND=noninteractive apt-get -y update --allow-releaseinfo-change
DEBIAN_FRONTEND=noninteractive apt-get -y install $PACKAGES

# disable apparmor. Apparmor otherwise blocks mounting the rootfs in the containers
aa-teardown

cd /root || exit
git clone https://github.com/tumi8/VirtualLXCBMC
cd virtuallxcbmc || exit

# install dependencies
python3 -m pip install -r requirements.txt
# compile project and move the executables to the right locations
python3 setup.py install
# starts the vbmc daemon in the background
vbmcd
```

Container setup

Define nodes in variable `NODES_LIST` with the following format:
```json
{
    "node1": {
        "host_index": 1,
        "cpu": {"start": "0", "stop": "23"},
        "memory": {"node": "0", "amount": 4096},
    },
    "node2": {
        "host_index": 2,
        "cpu": {"start": "24", "stop": "47"},
        "memory": {"node": "1", "amount": 4096},
    },
    "node3": {
        "host_index": 3,
        "cpu": {"start": "48", "stop": "71"},
        "memory": {"node": "0", "amount": 4096},
    },
    "node4": {
        "host_index": 4,
        "cpu": {"start": "72", "stop": "95"},
        "memory": {"node": "1", "amount": 4096},
    },
}
```

... and run the following code 

```bash
class Container:
    """
    This is an interface for interacting with LXC. Unfortunately, the python-lxc library is broken here and there making
    it unreliable to use for many task. Hence, we fall back to calling the lxc userspace tools here. In case python-lxc
    ever gets fixed, this class may be adjusted easily.
    """

    def __init__(self, name):
        """
        Initialize a container
        :param name: The set name
        """
        self.name = name

    def create(self):
        """
        Create the corresponding container
        :return:
        """
        return (
                run_command(
                    "apt update;"
                    f"lxc-create -n {self.name} -t debian -- --arch amd64 --release bullseye"
                ).returncode
                == 0
        )

    def start(self):
        """
        Start this container and return the success
        :return:
        """
        return run_command(f"lxc-start -n {self.name}").returncode == 0

    def defined(self):
        """
        :return: Show when an container is already defined
        """
        try:
            run_command(f"lxc-info -n {self.name}", mute=True)
            return True
        except RuntimeError:
            return False

    def stop(self):
        """
        Stopping an container
        :return:
        """
        return run_command(f"lxc-stop -n {self.name}").returncode == 0

    def set_config_item(self, key, value):
        """
        Set new configuration elements
        :param key: The key to set
        :param value: The value to set
        :return:
        """
        cnt = lxc.Container(self.name)
        cnt.set_config_item(key, value)
        # Finally, save the config. Will write the config to the disk at /var/lib/lxc
        cnt.save_config()

    def append_config_item(self, key, value):
        """
        Add new config item
        :param key: The key to update
        :param value: The value to use
        :return:
        """
        cnt = lxc.Container(self.name)
        cnt.append_config_item(key, value)
        # Finally, save the config. Will write the config to the disk at /var/lib/lxc
        cnt.save_config()

    def write_to_config(self, string):
        """
        Write new config into the corresponding config file
        :param string: The string to add to the config
        :return:
        """
        # For some reason python-lxc does not support to write these values with set_config_item or even set_cgroup_item
        # Hence, we write them into the file by hand.
        with open(f"/var/lib/lxc/{self.name}/config", "a", encoding="utf-8") as cfg:
            cfg.write(string)

    def run_script(self, path):
        """
        Execute a script on the lxc container
        :param path: The path to the script
        :return:
        """
        return (
                run_command(
                    f"cat {path} | lxc-attach -n {self.name} -- sh;", mute=True
                ).returncode
                == 0
        )

    def run_command(self, cmd):
        """
        Running an lxc command on a container
        :param cmd: The command to execute
        :return:
        """
        return (
                run_command(f"lxc-attach -n {self.name} -- /bin/bash -c '{cmd}'").returncode
                == 0
        )

    def copy_file(self, path, target_path):
        """
        Helper function to copy a file
        :param path: The path
        :param target_path: The new path
        :return: The run_command statement result
        """
        return (
                run_command(
                    f"cat {path} | lxc-attach -n {self.name} -- /bin/sh -c '/bin/cat > {target_path}'"
                ).returncode
                == 0
        )

def run_command(command: str, debug=False, mute=False, ignoreErrors=False):
    """
    Executes a shell command.

    :param command: The command(s) to execute. Each command is separated with a semicolon
    :param debug: Print the output
    :param mute: Ignore all output
    :return: SubProcess info
    """
    try:
        if mute:
            proc_stdout = subprocess.run(
                command,
                text=True,
                check=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                shell=True,
            )
        else:
            proc_stdout = subprocess.run(
                command, text=True, check=True, stdout=subprocess.PIPE, shell=True
            )
    except subprocess.CalledProcessError as error_process:
        if ignoreErrors:
            return error_process
        raise RuntimeError(
            f"command '{error_process.cmd}' return with error (code {error_process.returncode}): {error_process.output}"
        ) from error_process

    if debug:
        print(proc_stdout)
    return proc_stdout

def set_optimizations(container: Container, cpu_start: str, cpu_stop: str, mem_node: str, memory: int):
    """
    Set the optimizations when the LXC optimizations is enabled
    :param container: The container to use
    :param cpu_start: The cpu start
    :param cpu_stop: The cpu stop
    :param mem_node: The memory node
    :param memory: The memory amount
    """

    # comment out here, if you want to run NOT_PINNED
    container.write_to_config(
        # cgroup config for cpus https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html#cpuset-interface-files 
        f"lxc.cgroup2.cpuset.cpus = {cpu_start}-{cpu_stop}\n"
        # defines the memory nodes this container is allowed to use.
        f"lxc.cgroup2.cpuset.mems = {mem_node}\n"
        # cgroup config for memory https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html#memory-interface-files 
        f"lxc.cgroup2.memory.max = {memory * pow(10, 6)}\n"
        f"lxc.cgroup2.cpuset.cpus.partition = 'root'\n"
    )


def setup_cpu_isolation():

    # Goal: Get a string of this format: "0-23,25,29-31"
    max_core = os.cpu_count() - 1

    sorted_isolation = [int(x) for x in boot_isolation.split(",")]
    sorted_isolation.sort()

    # List of numbers from 0 to max_core: [0,1,2,.......,31]
    ext_max_core = list(range(max_core + 1))

    # List of numbers excluding the cores in sorted_isolation [0,1,2,...,23,29,30,31]
    filtered_cores = list(filter(lambda x: x not in sorted_isolation, ext_max_core))

    # Source for the following snippet, which reduces filtered_cores to the representation ("0-23,25,29-31") we want
    # https://codereview.stackexchange.com/questions/5196/grouping-consecutive-numbers-into-ranges-in-python-3-2
    # -- start of snippet
    groupby(filtered_cores, lambda n, c=count(): n - next(c))

    def as_range(iterable):
        l_iter = list(iterable)
        if len(l_iter) > 1:
            return f"{l_iter[0]}-{l_iter[-1]}"
        return f"{l_iter[0]}"

    core_range = ",".join(
        as_range(g)
        for _, g in groupby(filtered_cores, key=lambda n, c=count(): n - next(c))
    )
    # -- end of snippet

    commands = ""
    """Sets up the core isolation on the host - only works with CG2 due to AllowedCPUs not being available on non-unified 
        CGs https://www.man7.org/linux/man-pages/man5/systemd.resource-control.5.html

    systemd creates two slices, which are essentially cgroups:
    1. user.slice - handles all processes of users
    2. system.slice - handles services and scope units

    So whenever a new process/service is created with systemd, systemd places them in a cgroup **below** the user/system
    slice. These slices have by default permissive cgroups, so that all cores, all memory, all system resources may be
    assigned. In our case this is not desirable, since we want containers to have exclusive control over certain core
    without the host scheduling tasks on these core.

    This method changes the cpuset.cpus of both slices to only include those cores, that are not in use by a container.

    :return: void
    """
    commands = f"""
    systemctl set-property user.slice AllowedCPUs={core_range};
    systemctl set-property system.slice AllowedCPUs={core_range};
    systemctl set-property sys-kernel-config.mount AllowedCPUs={core_range};
    systemctl set-property sys-kernel-debug.mount AllowedCPUs={core_range};
    systemctl set-property sys-kernel-tracing.mount AllowedCPUs={core_range};
    systemctl set-property sys-fs-fuse-connections.mount AllowedCPUs={core_range};
    systemctl set-property init.scope AllowedCPUs={core_range};
    """

    return run_command(commands, ignoreErrors=True)

def setup_containers():
    for _, net_config in NODES_LIST.items():
        index = net_config["host_index"]

        port = 6000 + index
        cpu_start = net_config["cpu"]["start"]  # The start point for the CPU
        cpu_stop = net_config["cpu"]["stop"]  # The stop point for the CPU settings
        mem_node = net_config["memory"]["node"]  # The NUMA-memory node
        memory = net_config["memory"]["amount"]  # The amount of memory

        target = hostname + f"-vm{index}"
        print("Pulling images, setting up container...")
        container = Container(target)
        if container.defined():
            print(f"Container {target} already exists!", file=sys.stderr)
            sys.exit(1)

        # Create the container rootfs
        if not container.create():
            print("Failed to create the container rootfs", file=sys.stderr)
            sys.exit(1)

        # use DHCP to receive the ip address for the eth1 interface - this will allow the container to be accessible
        # via pos. A specific formatted MAC is required.
        container.set_config_item("lxc.net.0.type", "veth")
        container.set_config_item("lxc.net.0.link", "br0")
        # following the way libvirt assigns names to interfaces due to compatibility
        container.set_config_item("lxc.net.0.name", "eth0")
        # init mac-address to be pos conform
        container.set_config_item("lxc.net.0.hwaddr", f"55:55:00:00:00:{index:02x}")
        container.set_config_item("lxc.net.0.flags", "up")

        # Handle the SR-IOV interfaces
        # assign SR-IOV interfaces according to Figure 

        set_optimizations(container=container, cpu_start=cpu_start, cpu_stop=cpu_stop, memory=memory, mem_node=mem_node)

        # start container
        if not container.start():
            print("Failed to start the container", file=sys.stderr)
            sys.exit(1)

        time.sleep(5)

        # wait for interfaces to come online, then prepare the container for pos by running the
        # prepare-container.sh script. This script installs the default software, that is usually bundled via
        # mandelstamm onto the images. We could of course look into preparing our own debian images with this
        # software preinstalled. Finally, we copy the ssh keys over.
        container.run_script("/root/prepare_container.sh")
        container.run_command("mkdir /root/.ssh")
        container.copy_file(
            path="/root/.ssh/authorized_keys",
            target_path="/root/.ssh/authorized_keys",
        )

        # add the container to vbmc
        run_command(
            f"vbmc add --username ADMIN --password blockchain --port {port} {target};vbmc start {target}"
        )

        # must be executed after restarting the container. 
        # for cg1 we cant start the container once all processes are moved into the housekeeping cg, since
        # the lxc-start program forks of the current process, which is then also a part of the housekeeping cg.
        # the housekeeping cg does not have access to the cores that are requried for the container, 
        # therefore the start fails. 
        # it is possible to circumvent this problem by moving all PIDs back into the default cg, so that they 
        # have access to all cores, start the container, and move them back again.
        setup_cpu_isolation()

        # restart the container to make sure all settings are applied.
        if not container.stop():
            print("Restarting container failed", file=sys.stderr)
            sys.exit(1)

        if not container.start():
            print("Failed starting container", file=sys.stderr)
            sys.exit(1)

        print(f"Finished setting up container {target} and started it.")
``` 

After setup, the container can now be started using IPMI from remote or local when the ipmitools are installed:

```
 ipmitool -I lanplus -H [IP-Adresse] -U ADMIN -P password power on 
```

Setup pinning variants:

```bash
$PIN="none"

# path to the pcie devices the IRQs should be pinned to /sys/devices/$PCIE0/*  
PCIE0="pci0000:17/0000:17:00.0"
PCIE1="pci0000:17/0000:17:02.0"
PCIE0_EXT="0000:18:0a"
PCIE0_INT="0000:18:02"
PCIE1_EXT="0000:19:0a"
PCIE1_INT="0000:19:02"

# repin for every run to mitigate potentially respawned irqs without affinity
if [ "$PIN" == "none" ]; then
    # do nothing
    echo "doing nothing..."
elif if [ "$PIN" == "all" ]; then
    irqs=$(ls -1 /sys/devices/$PCIE0/*/msi_irqs/ | awk '/^[0-9]+$/{print}')
    for num in $irqs; do
        echo 1-31 > /proc/irq/$num/smp_affinity_list || true
    done
    irqs=$(ls -1 /sys/devices/$PCIE1/*/msi_irqs/ | awk '/^[0-9]+$/{print}')
    for num in $irqs; do
        echo 1-31 > /proc/irq/$num/smp_affinity_list || true
    done
elif [ "$PIN" == "per-node" ]; then
    irqs=$(ls -1 /sys/devices/$PCIE0/*/msi_irqs/ | awk '/^[0-9]+$/{print}')
    for num in $irqs; do
        echo 0000ff00 > /proc/irq/$num/smp_affinity || true
    done
    irqs=$(ls -1 /sys/devices/$PCIE1/*/msi_irqs/ | awk '/^[0-9]+$/{print}')
    for num in $irqs; do
        echo ff000000 > /proc/irq/$num/smp_affinity || true
    done
elif [ "$PIN" == "per-core" ]; then
    # pin VFs
    i=0
    a=0
    irqs=$(ls -1 /sys/devices/$PCIE0/$PCIE0_INT.*/msi_irqs/ | awk '/^[0-9]+$/{print}')
    for num in $irqs; do
        echo $((9+i)) > /proc/irq/$num/smp_affinity_list || true
        # only incremet i every 2nd run
        if [ $a -eq 1 ]; then
            i=$((i+1))
            a=0
        else
            a=1
        fi
    done
    j=0
    a=0
    irqs=$(ls -1 /sys/devices/$PCIE1/$PCIE1_INT.*/msi_irqs/ | awk '/^[0-9]+$/{print}')
    for num in $irqs; do
        echo $((25+j)) > /proc/irq/$num/smp_affinity_list || true
        # only incremet i every 2nd run
        if [ $a -eq 1 ]; then
            j=$((j+1))
            a=0
        else
            a=1
        fi
    done


    # pin ingress to first core of node
    irqs=$(ls -1 /sys/devices/$PCIE0/$PCIE0_EXT.0/msi_irqs/ | awk '/^[0-9]+$/{print}')
    for num in $irqs; do
        echo 8 > /proc/irq/$num/smp_affinity_list || true
    done 
    # pin egress to first core of node
    irqs=$(ls -1 /sys/devices/$PCIE1/$PCIE1_EXT.0/msi_irqs/ | awk '/^[0-9]+$/{print}')
    for num in $irqs; do
        echo 24 > /proc/irq/$num/smp_affinity_list || true
    done
else
    echo "no irq pinning"
fi
```

### Container

Each container is set up with the following script:

```bash
VM=1 # adjust to the VM number
INDEX=$VM
tempvariable= # set interface list here, external1/2 for ingress/egress 
VMCONFIG=(${tempvariable// / })
tempvariable="[1, 1]"
L3NETWORK=(${tempvariable// / })

tempvariable='["enp33s0f1", "enp33s0f2"]' # list of external interfaces used for flow injection
EXTERNALSRIOV=(${tempvariable//;/ })

#Flowlevel variables
tempvariable="1 2" # set the link endpoints here
LINKENDPOINTS=(${tempvariable// / })

tempvariable="flow1 flow2" # set the flow names here
FLOWS=(${tempvariable// / })

QUEUE_COUNT=1 # adjust this value to the number of queues


echo 1 > /proc/sys/net/ipv4/ip_forward

i=3
p=0
EXTERNAL=false #Set to enable looking if an external interface was added
printf -v tempvariable "%02x" $VM
MAC_BASIS="52:54:00:00:$tempvariable"
for x in "${VMCONFIG[@]}"
do
  if [[ ${x} != "external"* ]];then
    printf -v tempvariable "%02x" $p
    interfaceName=$(ip -br link | awk -v MAC_BASIS="$MAC_BASIS:$tempvariable" '$3 ~ MAC_BASIS {print $1}')
    ip link set dev $interfaceName up
    ip link set dev $interfaceName promisc on
    echo 360000000 > /proc/sys/net/ipv4/neigh/ens$i/base_reachable_time_ms  # To have at least 5 hours validity of the ARP-Cache

    sleep 1
    ethtool -L $interfaceName combined $QUEUE_COUNT
    sleep 1

    ip addr add 10.0."${L3NETWORK[p]}".$VM/24 dev $interfaceName
    i=$((i+1))
    p=$((p+1))
  else
    EXTERNAL="$x"
  fi
done
if [ "${#EXTERNALSRIOV[@]}" -eq "0" ]; then
  if [[ ${EXTERNAL} == "external"* ]];then
    ip link set dev ens"$((i+1))" up
    ip link set dev ens"$((i+1))" promisc on
    if [[ ${EXTERNAL} == "external1" ]];then
      ip addr add 10.0.0.1/24 dev ens"$((i+1))"
    else
      ip addr add 10.0.250.1/24 dev ens"$((i+1))"
    fi
  fi
else
  ip link set dev ens"$((i))" up
  ip link set dev ens"$((i))" promisc on
  ip link set dev ens"$((i+1))" up
  ip link set dev ens"$((i+1))" promisc on
  ip addr add 10.0.0.1/24 dev ens"$((i))"
  ip addr add 10.0.250.1/24 dev ens"$((i+1))"

  sleep 1
  ethtool -L ens"$((i))" combined $QUEUE_COUNT
  ethtool -L ens"$((i+1))" combined $QUEUE_COUNT

  arp -s 10.0.250.10 56:54:00:00:00:01
fi

ip route flush cache

i=3
p=0
for x in "${LINKENDPOINTS[@]}"
do
  ip route add default via 10.0."${L3NETWORK[$p]}"."$x" dev ens$i table $((600+i))
  i=$((i+1))
  p=$((p+1))
done

for x in "${FLOWS[@]}"
do
  flowName=$x
  flowNumber=$(echo "$flowName" | tr -dc '0-9')
  nextHop=$(pos_get_variable HVNet/flow_next_hop/$flowName/next_hop)


  #Receive index of array for the correct interface
  for z in "${!LINKENDPOINTS[@]}"
  do
      if [[ "${LINKENDPOINTS[z]}" == "$nextHop" ]]
      then
          ip rule add dport $((1000+flowNumber+1)) table $((603+z))
      fi
  done
done
```



### LoadGen

```bash
LOADGEN=moongen


apt-get update
apt-get install -y libssl-dev
git clone --branch dpdk-19.05 --recurse-submodules --jobs 4 https://github.com/emmericp/MoonGen "$LOADGEN"
cd $LOADGEN/
/root/$LOADGEN/build.sh
/root/$LOADGEN/bind-interfaces.sh
/root/$LOADGEN/setup-hugetlbfs.sh
```

### Timestamper

```bash
LOADGEN=moongen


apt-get update
apt-get install -y libssl-dev
git clone --branch dpdk-19.05 --recurse-submodules --jobs 4 https://github.com/emmericp/MoonGen "$LOADGEN"
cd $LOADGEN/
/root/$LOADGEN/build.sh
/root/$LOADGEN/bind-interfaces.sh
/root/$LOADGEN/setup-hugetlbfs.sh
```

## Run Experiment

### LoadGen

```bash

LOADGEN=moongen


/root/$LOADGEN/build/MoonGen /root/$LOADGEN/examples/moonsniff/traffic-gen.lua -x 64 --fix-packetrate [PACKET_RATE]
 --packets [PACKET_RATE*1500] --warm-up 30 --flows 10 --burst 1 [PORT_TX] [PORT_RX]
```

### Timestamper

After MoonGen on the LoadGen has been started, a few packets are send for warm-up. After those packets, we have a break in the execution of 30 seconds, which should be used to start the packet sniffer on the timestamper to record the measurements:

```bash
TIMER=moongen


/root/$TIMER/build/MoonGen /root/$TIMER/examples/moonsniff/sniffer.lua [PORT_PRE] [PORT_POST] --capture --time 150 --snaplen 84
```

The timestamper stops automatically after 150 seconds and creates two PCAPs, a latencies-pre.pcap and latencies-post.pcap to the respective side of the evaluation

Repeat Steps for each rate to be analyzed after saving the PCAPs at another place, because they will be overwritten otherwise.


## Evaluation

Setup:
```bash
apt update
DEBIAN_FRONTEND=noninteractive apt install -y postgresql
DEBIAN_FRONTEND=noninteractive apt install -y postgresql-client
DEBIAN_FRONTEND=noninteractive apt install -y parallel
DEBIAN_FRONTEND=noninteractive apt install -y python3-pip
DEBIAN_FRONTEND=noninteractive apt install -y texlive-full
DEBIAN_FRONTEND=noninteractive apt install -y lbzip2
DEBIAN_FRONTEND=noninteractive apt install -y rename
DEBIAN_FRONTEND=noninteractive apt install -y zstd

python3 -m pip install pypacker
python3 -m pip install netifaces
python3 -m pip install pylatex
python3 -m pip install matplotlib
python3 -m pip install pandas
python3 -m pip install pyyaml

mkdir /root/results
```

Evaluation of Pcaps
```bash
# Do not use too much as otherwise the evaluation will fail, require a significant amount of disk and memory space
NUM_CORES=4

# Used for the evaluator scripts
git clone https://github.com/WiednerF/containierized-low-latency/ /root/containierized-low-latency

# Download PCAPs to /root/results
cd /root/results
Will be made available after the acceptance

env --chdir /var/lib/postgresql setpriv --init-groups --reuid postgres -- createuser -s root || true

# import and analyze to database
mkdir /root/results/data
cd /root/results/data

parallel -j $NUM_CORES "dropdb --if-exists root{ % }; createdb root{ % };
 export PGDATABASE=root{ % };
 ~/containierized-low-latency/scripts/evaluator/dbscripts/import.sh {};
 ~/containierized-low-latency/scripts/evaluator/analysis.sh {}"
 ::: ../latencies-pre.pcap*.zst

# After this under the folder /root/results/data all required CSVs are available
```

Generate Plots
```bash
# When using the precompiled CSV data, decompress them first and then put them into /root/results/data for generation of Figures

# Copy required files for plotting
cp -r ~/containierized-low-latency/scripts/evaluator/plotter/* ~/results

cd ~/results
mkdir figures

python3 plotcreator.py figures data .
make -i

# All compiled figures are now available under ~/results/figures
```
