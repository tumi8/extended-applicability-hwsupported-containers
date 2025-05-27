---
layout: page
title: Complex Topology
permalink: /complex/4queues
order: 2
toc: Complex Topology, 4 Queues
---

> Figure 11, 12, 13, 14

<figure>
<img src="../assets/svg/topo/topo.svg">
<figcaption>Topology</figcaption>
</figure>

{% assign repeats = "0,2,4" | split: "," %}

<h2>Packet Rate</h2>
<div style="display: flex;">
{%for repeat in repeats %}
<figure>
<img src="../assets/svg/topo/4q/packetrate-latencies-pre-repeat{{repeat}}.pcap.zst.trim_ms0.packetratepre.csv.svg">
<figcaption style="display: flex; justify-content: center;">Repeat {{forloop.index0}}</figcaption>
</figure>
{% endfor %}
</div>

<h2>Worst Case</h2>
<div style="display: flex;">
{%for repeat in repeats %}
<figure>
<img src="../assets/svg/topo/4q/worstof-timeseries-latencies-pre-repeat{{repeat}}.pcap.zst.trim_ms0.num_worst5000.worst.csv.svg">
<figcaption style="display: flex; justify-content: center;">Repeat {{forloop.index0}}</figcaption>
</figure>
{% endfor %}
</div>

{% for flow in (1..38) %}

<h2>Flow {{flow}}</h2>

<div style="display: flex;">
{% for repeat in repeats %}

<figure>
<img src="../assets/svg/topo/4q/hdr-repeat{{repeat}}flow-{{flow}}.svg">
<figcaption style="display: flex; justify-content: center;">Repeat {{forloop.index0}}</figcaption>
</figure>
{% endfor %}

</div>
{% endfor %}

