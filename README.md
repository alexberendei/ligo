# Ligo

## Features
-   Bulma v1.0 - CSS Framework
-   Mobile-first Responsive Design
-   High Performance
-   OpenGraph support : SEO-optimized using OpenGraph
-   Schema Structured Data : Schema Structured Data and Meta tags
-   Paginated Lists : Simple list pagination with page indicators
-   Modular CSS & JS Libraries
-   WIDGETS
    -   Cookies
        -   vanilla-cookieconsent [npm]
        -   Cookieconsnet [self host script]
        -   FreeCookieScript [in progress]
        -   Cookiebot [3rd party]
        -   CookieOsano [3rd party]
    -   Contact
        -   Contact page & form
        -   Whatsapp button
        -   Fixed contact phones
    -   Marketing
        -   Google TAG Manager
    -   Social
        -   Instafeed
        -   Sharebuttons
    -   Related Content
-   Shortcodes
    -   gallery
    -   images
    -   button
    -   columns
    -   contactform_standard
    -   fa - icons
-   Sections
    -   Features
    -   Testimonials
    -   Customers
    -   Recent posts
    -   CTA

## Installation

-   hugo new site siteName
-   cd siteName/themes
-   Add the repository into your Hugo Project repository as a submodule, `git submodule add git@github.com:alexberendei/ligo.git ligo`
-   cd ../ && cp -a themes/ligo/exampleSite/\* .
-   npm install
-   hugo serve -D

## Content 

### Archetypes
1. default
2. blog
3. products (optional)
4. clients (if content is used )
4. testimonials (if content is used )

### - Scripts to transform images
```
#script to generate favicons
cd static/img/favicons
convert favicon.png -resize 512x512 -transparent white favicon-512x512.png
convert favicon-512x512.png -resize 16x16 favicon-16x16.png
convert favicon-512x512.png -resize 32x32 favicon-32x32.png
convert favicon-512x512.png -resize 60x60 favicon-60x60.png
convert favicon-512x512.png -resize 72x72 favicon-72x72.png
convert favicon-512x512.png -resize 114x114 favicon-114x114.png
convert favicon-512x512.png -resize 120x120 favicon-120x120.png
convert favicon-512x512.png -resize 128x128 favicon-128x128.png
convert favicon-512x512.png -resize 144x144 favicon-144x144.png
convert favicon-512x512.png -resize 152x152 favicon-152x152.png
convert favicon-512x512.png -resize 196x196 favicon-196x196.png
convert favicon-512x512.png -resize 270x270 favicon-270x270.png
convert favicon.png -define icon:auto-resize=128,64,48,32,16 favicon.ico
# generate thumbs
mogrify -path ../thumbs/img/blog -auto-orient -thumbnail 768x blog/*.jpg

# script to convert all images from current folder and subfolders to webp
#! /bin/bash

shopt -s nullglob       # Globs that match nothing expand to nothing
shopt -s globstar       # ** matches multiple directory levels

root_webp_dir="$(pwd)"

for jpg_path in **/*.{jpg,jpeg,png,svg,tif,tiff}; do
    jpg_file=${jpg_path##*/}
    [[ $jpg_path == */* ]] && jpg_dir=${jpg_path%/*} || jpg_dir=.

    webp_dir=${root_webp_dir}/${jpg_dir}
    webp_path=${webp_dir}/${jpg_file}.webp

    [[ -d $webp_dir ]] || mkdir -p -- "$webp_dir"
    cwebp -m 6 -z 9 -q 70 -mt -af -progress "$jpg_path" -o "$webp_path"
done
```


## Licensing

This Repository is licensed under the MIT License.