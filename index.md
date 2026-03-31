---
layout: main
toc: Home
order: 1
title: Utilizing Hardware-Supported Containers for Low-Latency Networking
description:  Florian Wiedner, Alexander Daichendt, Jonas Andre, Georg Carle
image: []
---

<article class="card">
  <header>Abstract</header>
  <div class="content">
    <p>
    Applications requiring low-latency packet processing are challenging for today's network and service management when resources are limited and must be shared. Containers are suitable, but achieving connectivity between containers exclusively in software is unsuitable for low-latency requirements. The impact of network latencies in containerized environments has received comparatively less attention, particularly in comparison to research on virtual machines. This paper analyzes throughput and network latencies in container-based networks on a single host featuring single-root input/output virtualization, Linux Containers, and commercial off-the-shelf hardware. We conduct measurements using a state-of-the-art measurement methodology to identify tail-latency behavior, achieving a resolution of 1.25us. We evaluate a single flow in a line topology with up to 64 containers and a complex topology with 38 flows and 12 container nodes. The experiments demonstrate that pinning interrupt request handlers to non-uniform memory access nodes increases throughput and decreases latencies. Furthermore, we identify data translation lookaside buffer misses, rescheduling interrupts, and soft interrupt floods as critical challenges causing spikes in latencies while isolation remains impossible. Our findings identify bottlenecks for real-time container applications. A comparison with VM measurements shows that containers can achieve latencies up to 60 us lower. We support in this paper, network and service management in deciding on the underlying virtualization technology for packet-processing applications by providing recommendations accordingly.
    </p>
  </div>

</article>


<p class="content"> 
  This page contains the supplementary material for the paper "Utilizing Hardware-Supported Containers for Low-Latency Networking" by Florian Wiedner,Alexander Daichendt, Jonas Andre, Georg Carle. The paper is submitted for IEEE Transactions on Network and Service Management.
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
