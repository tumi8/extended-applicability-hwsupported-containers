---
layout: page
title: Line Topology
permalink: /line/pernodepin-17kpps
order: 2
toc: 'Per Node Pinning, max pps'
---

> Figure 7, 8

{% assign lengths = "1,2,4,8,16,32,64" | split: "," %}
{% assign repeats = "0,1,2" | split: "," %}

{% for num in lengths %}

<h2>Length {{num}}</h2>

<div style="display: flex;">
{% for repeat in repeats %}

<figure>
<img src="../assets/svg/lines/node-pin-17kpps/{{num}}/hdr-histogram-latencies-repeat-{{repeat}}.svg">
<figcaption style="display: flex; justify-content: center;">Repeat {{repeat}}</figcaption>
</figure>
{% endfor %}

</div>
{% endfor %}

