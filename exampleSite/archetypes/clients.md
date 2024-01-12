---
title: "{{ replace .Name "-" " " | title }}"
icon: fa fa-quote-left fa-2x
image: "misc/client-{{ replace .Name "-" " " | title }}.jpg"
site: https://example.com
draft: true
date: {{ .Date }}
# robotsdisallow: true
# sitemap:
#   priority : 0.5
#   changefreq: weekly
# headless: false
---
