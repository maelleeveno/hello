$(document).ready(function(){
  // dynamical age variable
  let date = new Date();
  let currentYear = date.getFullYear();
  let age = currentYear - 1990;
  $('#age').text(age);

  // Scroll to top
  $('.fa-circle-arrow-up').on('click', function(){
    $('html,body').animate({
      scrollTop: 0
    }, 300);
  });

  // sticky nav - desktop & mobile
  const menu = $("#menu").offset().top;
  const menuDisplayMode = $("#menu").css('display');
  
  const mobileMenu = $("#mobile-menu").offset().top;
  const mobileMenuDisplayMode = $("#mobile-menu").css('display');

  // smooth scroll to anchor ...
  function scrollToAnchor(aid){
    let destination = $("#"+ aid);
    $('html,body').animate({
      scrollTop: destination.offset().top,
    }, 100);
  }

  // ... on desktop menu ...
  $('.menu-item').on('click', function(){
    let menuItemId = $(this).attr('href').substring(1);
    scrollToAnchor(menuItemId);
  });

  $(window).scroll(function (e) {
    e.preventDefault();
    if($(window).scrollTop() > menu && menuDisplayMode != 'none') {
      $("#menu").addClass('sticky');
      $('#main').css('margin-top', '62px');
    } else {
      $("#menu").removeClass('sticky');
      $('#main').css('margin-top', '0');
      $('.menu-item').removeClass('active-item');
    }
  
    if($(window).scrollTop() > mobileMenu && mobileMenuDisplayMode != 'none') {
      $("#mobile-menu").addClass('sticky');
    } else {
      $("#mobile-menu").removeClass('sticky');
    }

    // Scroll to top arrow hide and show on scroll
    if($(window).scrollTop() >= 200) {
      $('#scroll-to-top').removeClass('hide').addClass('show');
    } else {
      $('#scroll-to-top').removeClass('show').addClass('hide');
    }

    // add section ID to hash
    var that = this;
    $('section.content-section').each(function () {
      if ($(that).scrollTop() >= $(this).offset().top && $(that).scrollTop() <= $(this).offset().top + $(this).height()) {
        window.location.hash = $(this).attr('id');
      };
    });
  });

  // burger mobile
  $('.mobile-menu-header').on('click', function(){
    $('.mobile-menu-items').slideToggle('hide show');
  });
  $('.mobile-menu-item').on('click', function(){
    $('.mobile-menu-items').slideToggle('hide show');
  });

  // add and remove active classes from menu items
  const menuItems = "skills experiences production education";
  $('#menu').on('click', 'a', function(e) {
    e.preventDefault();
    let menuItemId = $(this).attr('href').substring(1);
    $('.menu-item').removeClass('active-item');
    $('#menu a.active-item').removeClass('active-item').removeClass(menuItems);
    $(this).addClass('active-item').addClass( menuItemId);
  });

  // add active class on menu item when ID in hash
  $(window).on('hashchange', function(e) {
    e.preventDefault();
    let hash = window.location.hash;
    $('a.menu-item').removeClass('active-item');
    $('a.menu-item[href="'+hash+'"]').addClass('active-item');
  });

  // Random color on scrolltop arrow mouseover animation
  let lightYellow = '#ffeb95', lightGreen = '#99D4B7', lightViolet = '#e2d3fe', lightRose = '#ffc4c8',lightGrey = '#aaa';
  var colors = [lightYellow, lightGreen, lightViolet, lightRose, 'PaleTurquoise', 'PeachPuff', 'DarkSeaGreen', 'Wheat'];

  $('#scroll-to-top').hover(function(e) {
    var rand = colors[Math.floor(Math.random() * colors.length)];
    $(this).css('color', rand);
  }, function(){
    $(this).css('color', lightGrey);
  });

  // Toggle on experience's headers
  jQuery.fn.extend({
    toggleText: function (a, b){
      let that = this;
        if (that.html() != a && that.html() != b){
          that.html(a);
        }
        else
        if (that.html() == a){
          that.html(b);
        }
        else
        if (that.html() == b){
          that.html(a);
        }
      return this;
    }
  });

  // Flipped card
  $('.card').click(function(){
    $(this).toggleClass('flipped');
    console.log('hello');
  });
  
  // Change more link text on click
  $('.more-link').each(function(){
    let expId = $(this).attr('id');
    let expContentDiv = $(this).parent().closest('div');
    let moreContentDiv = expContentDiv.find('div#'+expId);
    $(this).on('click', function(){
      $(this).toggleText('<strong>En voir </strong><i class="fa-solid fa-plus"></i>', '<strong>En voir </strong><i class="fa-solid fa-minus"></i>');
      $(this).toggleClass('see-more see-less');
      moreContentDiv.slideToggle('hide show');
    });
  });

  // slick carousel
  $('.productions-slider').slick({
    slidesToShow: 4,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 450,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      }
    ]
  });

  // Animated gif when mouseover on slick slider images
  $('.slide').on('mouseover', function(){
    const slideId = $(this).attr('id');
    $(this).attr('src', './assets/img/productions/gif/'+ slideId +'.gif');
  });
  $('.slide').on('mouseout', function(){
    const slideId = $(this).attr('id');
    $(this).attr('src', './assets/img/productions/' + slideId + '.jpg');
  });

  // Copy to clipboard
  $('.copy').on('click', function(e) {
    navigator.clipboard.writeText($(this).find('.hide').html());
    $(this).find('.tooltip').addClass('show').delay(1000).queue(function(){
      $(this).removeClass('show').dequeue();
    });
  });
  
});