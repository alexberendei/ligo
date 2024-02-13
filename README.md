# Ligo

## Features

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
        -   Contact
        -   Whatsapp button
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
    -   Testimonials
    -   Features
    -   Customers
    -   Recent posts

## Installation

-   hugo new site siteName
-   cd siteName/themes
-   Add the repository into your Hugo Project repository as a submodule, `git submodule add git@github.com:alexberendei/ligo.git ligo`
-   cd ../ && cp -a themes/ligo/exampleSite/\* .
-   npm install
-   hugo serve -D

// HUGO MODULES in the future // hugo mod init randomName // if init does not work, comment the modules from hugo.toml and repeat
// hugo mod get // hugo mod vendor (optional)

## Licensing

This Repository is licensed under the MIT License.
