---
title: "{{ replace .Name "-" " " | title }}"
slug: "{{ title }}"
url: "blog/{{ title }}"

banner: "img/banners/product-{{ replace .Name "-" " " | title }}.jpg"
thumb: "thumbs/img/banners/product-{{ replace .Name "-" " " | title }}.jpg"
gallery: [
"img/gallery/product-{{ replace .Name "-" " " | title }}-1.jpg",
"img/gallery/product-{{ replace .Name "-" " " | title }}-2.jpg",
"img/gallery/product-{{ replace .Name "-" " " | title }}-3.jpg",
"img/gallery/product-{{ replace .Name "-" " " | title }}-4.jpg"
]

tags: ["{{ replace .Name '-' ' ' | title }}", ""]
categories: [""]

keywords: ["{{ replace .Name '-' ' ' | title }}", ""]
description: "{{ replace .Name '-' ' ' | title }}"
sitemap:
  priority : 0.5
  changefreq: weekly

weight: 1
date: {{ .Date }}
draft: true
---

#Post X

Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet repellendus exercitationem adipisci quasi laborum error eligendi veniam omnis optio totam, fuga, voluptatum, natus libero laudantium soluta necessitatibus odit temporibus explicabo?
