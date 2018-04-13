import $ from 'jquery';
import 'bootstrap';
import 'jquery-scrollify';
import ScrollData from './scrollData';

/* eslint-disable no-console */
const scrollToHash = (e) => {
  // Figure out element to scroll to
  let target = typeof e.delegateTarget.hash !== 'undefined' ? e.delegateTarget.hash : false;
  const windowHash = target;

  target = $(target);
  target = target.length ? target : $(`[name=${e.target.hash.slice(1)}]`);
  // target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  // Does a scroll target exist?
  if (target.length) {
    // Only pre default if animation is actually gonna happen
    e.preventDefault();
    window.history.pushState(null, null, windowHash);
    const scrollTo = target.offset().top;
    $('html, body').animate({
      scrollTop: scrollTo,
    }, 500, () => {
      // Callback after animation
      // @todo: Is this doing anything?
      // Must change focus!
      const $target = $(target);
      $target.focus();
      if ($target.is(':focus')) { // Checking if the target was focused
        return false;
      }
      // Else.
      $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
      $target.focus(); // Set focus again
    });
  }
};

// Create breakpoint variables.
const viewportSize = [];
const checkViewportSize = () => {
  viewportSize.xs = window.matchMedia('(min-width: 0px) and (max-width: 575px)').matches;
  viewportSize.sm = window.matchMedia('(min-width: 576px) and (max-width: 767px)').matches;
  viewportSize.md = window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches;
  viewportSize.lg = window.matchMedia('(min-width: 992px) and (max-width: 1199px)').matches;
  viewportSize.xl = window.matchMedia('(min-width: 1200px) and (max-width: 1919px)').matches;
  viewportSize.xxl = window.matchMedia('(min-width: 1920px)').matches;

  if (viewportSize.xs) {
    // console.log('XS Breakpoint matches.');
    viewportSize.xs = true;
    viewportSize.sm = false;
    viewportSize.md = false;
    viewportSize.lg = false;
    viewportSize.xl = false;
    viewportSize.xxl = false;
  }

  if (viewportSize.sm) {
    // console.log('SM Breakpoint matches.');
    viewportSize.xs = false;
    viewportSize.sm = true;
    viewportSize.md = false;
    viewportSize.lg = false;
    viewportSize.xl = false;
    viewportSize.xxl = false;
  }

  if (viewportSize.md) {
    // console.log('MD Breakpoint matches.');
    viewportSize.xs = false;
    viewportSize.sm = false;
    viewportSize.md = true;
    viewportSize.lg = false;
    viewportSize.xl = false;
    viewportSize.xxl = false;
  }

  if (viewportSize.lg) {
    // console.log('LG Breakpoint matches.');
    viewportSize.xs = false;
    viewportSize.sm = false;
    viewportSize.md = false;
    viewportSize.lg = true;
    viewportSize.xl = false;
    viewportSize.xxl = false;
  }

  if (viewportSize.xl) {
    // console.log('XL Breakpoint matches.');
    viewportSize.xs = false;
    viewportSize.sm = false;
    viewportSize.md = false;
    viewportSize.lg = false;
    viewportSize.xl = true;
    viewportSize.xxl = false;
  }

  if (viewportSize.xxl) {
    // console.log('XL Breakpoint matches.');
    viewportSize.xs = false;
    viewportSize.sm = false;
    viewportSize.md = false;
    viewportSize.lg = false;
    viewportSize.xl = false;
    viewportSize.xxl = true;
  }
  return viewportSize;
};

const setViewportClass = (size) => {
  if (size.xs) {
    $('body').removeClass('xs sm md lg xl xxl').addClass('xs');
  }

  if (size.sm) {
    $('body').removeClass('xs sm md lg xl xxl').addClass('sm');
  }

  if (size.md) {
    $('body').removeClass('xs sm md lg xl xxl').addClass('md');
  }

  if (size.lg) {
    $('body').removeClass('xs sm md lg xl xxl').addClass('lg');
  }

  if (size.xl) {
    $('body').removeClass('xs sm md lg xl xxl').addClass('xl');
  }

  if (size.xxl) {
    $('body').removeClass('xs sm md lg xl xxl').addClass('xxl');
  }
};

const isMobile = () => {
  const $body = $('body');
  if ($body.hasClass('xs') || $body.hasClass('sm')) {
    return true;
  }
  return false;
};

(function chili() {
  $(window).on('load', () => {
    // On the last cover skip link, swap the link to go up.
    $('body > section:last-of-type .cover-section-skip a')
      .attr('href', '#intro');

    // Make all external links have a special class.
    $('a:not([href*="himerus.com"]):not([href^="#"]):not([href^="/"])')
      .addClass('external')
      .attr('target', '_blank');

    // Setup scrollspy.
    $('body').scrollspy({ target: '#navbarContent' });
  });

  // When the window is resized or loaded initially, calculate the scrollspy accordingly.
  $(window).on('resize load', () => {
    const size = checkViewportSize(viewportSize);
    setViewportClass(size);
  });

  // Close dropdown menu when nav item is clicked.
  $('.navbar .nav-item .nav-link').on('click', () => {
    if (isMobile()) {
      $('.navbar-toggler')
        .addClass('collapsed')
        .attr('aria-expanded', 'false');
      $('#navbarContent')
        .removeClass('show');
    }
  });
}());

/**
 * Handles creating a page scroll progress bar.
 */
(function scrollTracker() {
  const scrollOptions = {
    debug: false,
    detailedDebug: false,
    element: $(document),
    wrapper: $(window),
  };
  const scroll = new ScrollData(scrollOptions);

  $(window).on('ready resize scroll', () => {
    // Fire new tracker.
    const progress = scroll.getProgress().scroll;
    $('nav .progress-bar').attr('aria-valuenow', progress).css('width', `${progress}%`);
  });
}());

(function pageScrolling() {
  const loadUnloadScrollify = () => {
    if (isMobile()) {
      $.scrollify.disable();
    }
    else if ($.scrollify.isDisabled()) {
      $.scrollify.enable();
    }
  };

  $(window).on('load', () => {
    // Using jquery.scrollify to handle between section scroll navigation.
    $.scrollify({
      section: '.horizontal-section',
      sectionName: false,
      interstitialSection: '',
      easing: 'easeOutExpo',
      scrollSpeed: 1000, // Needs to be ~1000 to avoid odd double scrolls.
      offset: 0,
      scrollbars: true,
      standardScrollElements: '',
      setHeights: false,
      overflowScroll: true,
      updateHash: false,
      touchScroll: false,
      before: () => {
        // A callback that is fired before a section is scrolled to via the move method.
        // Arguments include the index of the section and an array of all section elements.
      },
      after: () => {
        // A callback that is fired after a new section is scrolled to.
        // Arguments include the index of the section and an array of all section elements.
        const windowHash = $.scrollify.current().attr('id');
        window.history.pushState(null, null, `#${windowHash}`);
      },
      afterResize: () => {
        // A callback that is fired after the window is resized.
        loadUnloadScrollify();
      },
      afterRender: () => {
        // A callback that is fired after Scrollify's initialisation.
        loadUnloadScrollify();
      },
    });

    // Add smooth scrolling on all anchor links.
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click((e) => {
      scrollToHash(e);
    });
  });
}());
/* eslint-enable no-console */
