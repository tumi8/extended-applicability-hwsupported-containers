---
layout: main
toc: Home
order: 1
title: Concurrency of Hardware-Supported Containers in Low-Latency Networking
description:  Florian Wiedner, Alexander Daichendt, Jonas Andre, Georg Carle
image: []
---

<article class="card">
  <header>Abstract</header>
  <div class="content">
    <p>
    Containers are suitable, but achieving connectivity between containers exclusively in software is unsuitable for low-latency requirements. The impact of network latencies in containerized environments has received comparatively less attention, particularly in comparison to research on virtual machines. This paper analyzes throughput and network latencies in container-based topologies on a single host featuring single-root input/output virtualization, Linux Containers, and commercial off-the-shelf hardware. We conduct measurements using a state-of-the-art timestamping methodology to identify tail- latency behavior, achieving a resolution of 1.25 µs. We evaluate a single flow in a line topology with up to 64 containers and a complex topology with 38 flows and 12 nodes. The experiments demonstrate that pinning interrupt request handlers to non-uniform memory access nodes increases throughput and decreases latencies. Furthermore, we identify data translation lookaside buffer misses, rescheduling interrupts, and soft interrupt floods as critical challenges causing spikes in latencies while isolation remains impossible. A comparison with VM measurements shows that containers can achieve latencies up to 60 µs lower. Our findings identify bottlenecks for real-time container applications and provide suggestions to reduce their impact.
    </p>
  </div>

</article>


<p class="content"> 
  This page contains the supplementary material for the paper "Concurrency of Hardware-Supported Containers in Low-Latency Networking" by Florian Wiedner,Alexander Daichendt, Jonas Andre, Georg Carle. The paper is submitted for IEEE Transactions on Network and Service Management.
</p>


<!-- <div class="accordion-box">
  <div class="accordion-box__title">
    Demo
  </div>
  <div class="accordion-box__content">
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>
      <p>Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vu</p>
  </div>
</div> -->
