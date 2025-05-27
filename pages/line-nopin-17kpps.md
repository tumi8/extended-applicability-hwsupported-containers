---
layout: page
title: Line Topology
permalink: /line/nopin-17kpps
order: 2
toc: 'No Pinning, 17kpps'
---

> Figure 7, 8

{% assign lengths = "1,2,4,8,16,32,64" | split: "," %}
{% assign repeats = "0,1,2" | split: "," %}

{% for num in lengths %}

<h2>Length {{num}}</h2>

<div style="display: flex; flex-wrap: wrap;">
{% for repeat in repeats %}

<figure style="width: 33%">
<img src="../assets/svg/lines/no-pin-17kpps/{{num}}/hdr-histogram-latencies-repeat-{{repeat}}.svg">
<figcaption style="display: flex; justify-content: center;">Repeat {{repeat}}</figcaption>
</figure>
{% endfor %}

{% for repeat in repeats %}
<figure style="width: 33%">
<img src="../assets/svg/lines/no-pin-17kpps/{{num}}/worstof-timeseries-latencies-repeat-{{repeat}}.svg">
<figcaption style="display: flex; justify-content: center;">Repeat {{repeat}}</figcaption>
</figure>
{% endfor %}

</div>
{% endfor %}

