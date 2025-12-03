---
layout: page
title: Line Topology
permalink: /line/percorepin-maxpps
order: 2
toc: 'Per Core Pinning, max pps'
---

> Figure 7

{% assign lengths = "1" | split: "," %}
{% assign repeats = "0,1" | split: "," %}

{% for num in lengths %}

<h2>Length {{num}}</h2>

<div style="display: flex;">
{% for repeat in repeats %}

<figure>
<img src="../assets/svg/lines/core-pin-max/{{num}}/hdr-histogram-latencies-repeat-{{repeat}}.svg">
<figcaption style="display: flex; justify-content: center;">Repeat {{repeat}}</figcaption>
</figure>
{% endfor %}

</div>
{% endfor %}

{% assign lengths = "2,4,8" | split: "," %}
{% assign repeats = "0,1,2" | split: "," %}

{% for num in lengths %}

<h2>Length {{num}}</h2>

<div style="display: flex;">
{% for repeat in repeats %}

<figure>
<img src="../assets/svg/lines/core-pin-max/{{num}}/hdr-histogram-latencies-repeat-{{repeat}}.svg">
<figcaption style="display: flex; justify-content: center;">Repeat {{repeat}}</figcaption>
</figure>
{% endfor %}

</div>
{% endfor %}

