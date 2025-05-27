---
layout: page
title: Complex Topology
permalink: /complex/1queue
order: 2
toc: Complex Topology, 1 Queue
---

> Figure 14

<figure>
<img src="../assets/svg/topo/topo.svg">
<figcaption>Topology</figcaption>
</figure>

{% assign repeats = "3,5" | split: "," %}

<h2>Packet Rate</h2>
<div style="display: flex;">
{%for repeat in repeats %}
<figure>
<img src="../assets/svg/topo/1q/packetrate-latencies-pre-repeat{{repeat}}.pcap.zst.trim_ms0.packetratepre.csv.svg">
<figcaption style="display: flex; justify-content: center;">Repeat {{forloop.index0}}</figcaption>
</figure>
{% endfor %}
</div>

<h2>Worst Case</h2>
<div style="display: flex;">
{%for repeat in repeats %}
<figure>
<img src="../assets/svg/topo/1q/worstof-timeseries-latencies-pre-repeat{{repeat}}.pcap.zst.trim_ms0.num_worst5000.worst.csv.svg">
<figcaption style="display: flex; justify-content: center;">Repeat {{forloop.index0}}</figcaption>
</figure>
{% endfor %}
</div>

{% for flow in (1..38) %}

<h2>Flow {{flow}}</h2>

<div style="display: flex;">
{% for repeat in repeats %}

<figure>
<img src="../assets/svg/topo/1q/hdr-repeat{{repeat}}flow-{{flow}}.svg">
<figcaption style="display: flex; justify-content: center;">Repeat {{forloop.index0}}</figcaption>
</figure>
{% endfor %}

</div>
{% endfor %}

