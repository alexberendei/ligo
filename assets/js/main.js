'use strict';

document.documentElement.classList.remove("no-js");
var _clickEvents = ['click', 'touch'];

function ready(callbackFunc) {
  if (document.readyState !== 'loading') {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener('DOMContentLoaded', callbackFunc);
  } else {
    // Old IE browsers
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'complete') {
        callbackFunc();
      }
    });
  }
}

function initImg() {
  var imgDefer = document.getElementsByTagName('img');
  for (var i=0; i<imgDefer.length; i++) {
  if(imgDefer[i].getAttribute('data-src')) {
  imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
  } } }

ready(function () {

  //init images
  initImg();

  // Initialize all div with carousel class
  // const carousels = bulmaCarousel.attach('.carousel', {
  //   slidesToScroll: 1,
  //   slidesToShow: 1
  // });

  // Initialize all elements with carousel class.
  const mainCarousel = bulmaCarousel.attach('#main-carousel', {
    slidesToScroll: 1,
    slidesToShow: 1,
    pagination: false,
    effect: 'fade'
  });
  const testimonialCarousel = bulmaCarousel.attach('#testimonial-carousel', {
    slidesToScroll: 1,
    slidesToShow: 1
  });
  const clientCarousel =  bulmaCarousel.attach('#client-carousel', {
    slidesToScroll: 1,
    slidesToShow: 3
  });
  const galleryCarousel = bulmaCarousel.attach('#gallery-carousel', {
    slidesToScroll: 1,
    slidesToShow: 4
  });

  // ### Dropdowns
  var $dropdowns = getAll('.dropdown:not(.is-hoverable)');

  if ($dropdowns.length > 0) {
    $dropdowns.forEach(function ($el) {
      $el.addEventListener('click', function (event) {
        event.stopPropagation();
        $el.classList.toggle('is-active');
      });
    });
    document.addEventListener('click', function (event) {
      closeDropdowns();
    });
  }

  function closeDropdowns() {
    $dropdowns.forEach(function ($el) {
      $el.classList.remove('is-active');
    });
  }

  //  ###  SCROLL CHANGE class (display block on bottom after you scroll)
  // This is a handy wrapper function that will return an array of matching element instead of a nodeList
  function querySelectorArray(query, root){
    return Array.prototype.slice.call((root || document).querySelectorAll(query));
  }
  // Get all headers that are designated 'scroll-group'
  var headers = querySelectorArray('[data-scroll-group]');
  // Loop through the headers
  headers.forEach(function(header){
    // Get the name of the group from the headers [data-scroll-group] attribute
    var group = header.getAttribute('data-scroll-group');
    // Get all the sections with a matching data-[data-scroll-group] attribute
    var sections = querySelectorArray('[data-' + group + ']');
    // Create an Event Listener for scrolling
    window.addEventListener('scroll', function(){
      // Declare a lastSection variable that can store the last class that scrolled by
      var lastSection = false;
      sections.forEach(function(section){
        // Get the elements position compared to the viewport
        var offset = section.getBoundingClientRect();
        // If the position is smaller than 0 it has scrolled further than that section
        // The same is true for the scroll being smaller than the negative height - if so, it is out of view.
        if(offset.top <= 0 && offset.top > -offset.height) lastSection = section.getAttribute('data-' + group + '');
      });
      // Apply the class to your header
      header.className = lastSection || ''; 
    })
  });

  //// ### MODALS
  function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
  }
  var rootEl = document.documentElement;
  var $modals = getAll('.modal');
  var $modalButtons = getAll('.modal-button');
  var $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');
  if ($modalButtons.length > 0) {
    $modalButtons.forEach(function ($el) {
      $el.addEventListener('click', function () {
        var target = $el.dataset.target;
        openModal(target);
      });
    });
  }
  if ($modalCloses.length > 0) {
    $modalCloses.forEach(function ($el) {
      $el.addEventListener('click', function () {
        closeModals();
      });
    });
  }
  function openModal(target) {
    var $target = document.getElementById(target);
    rootEl.classList.add('is-clipped');
    $target.classList.add('is-active');
  }
  function closeModals() {
    rootEl.classList.remove('is-clipped');
    $modals.forEach(function ($el) {
      $el.classList.remove('is-active');
    });
  }
  document.addEventListener('keydown', function (event) {
    var e = event || window.event;
    if (e.keyCode === 27) {
      closeModals();
      closeDropdowns();
    }
  });

  // ### BURGER MENUS
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {
        // $navbar.classList.toggle('has-shadow');
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }



  // ### Initialise Google Maps if necessary.
  // initMap();

});

