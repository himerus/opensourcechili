import $ from 'jquery';
import 'bootstrap';
// @see https://github.com/vsn4ik/bootstrap-checkbox.
import 'bootstrap-checkbox';
// @see https://github.com/lukehaas/Scrollify.
import 'jquery-scrollify';
// @see https://github.com/andreruffert/rangeslider.js.
import 'rangeslider.js';
// @see https://github.com/julien-maurel/js-storage.
import Storages from 'js-storage';
import ScrollData from './scrollData';
import './recipe';

const storage = Storages.localStorage;

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
    $('.navbar-toggler')
      .addClass('collapsed')
      .attr('aria-expanded', 'false');
    $('#navbarContent')
      .removeClass('show');
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

(function chiliInstructionCheckboxes() {
  // Add in custom checkboxes.
  $('.instruction-checkbox').checkboxpicker({
    html: true,
    offLabel: '<i class="fas fa-times"></i>',
    onLabel: '<i class="fas fa-check"></i>',
    baseGroupCls: 'btn-group btn-group-sm btn-group--ingredient-toggle',
    offCls: 'btn-light',
    onCls: 'btn-light',
    offActiveCls: 'btn-danger btn--off',
    onActiveCls: 'btn-success btn--on',
  })
    .on('change', function updateInstructionStatus() {
      const checked = $(this).prop('checked');
      const instruction = $(this).attr('name');
      // console.log(`${ingredient}: ${checked}`);
      storage.set(`instruction--${instruction}`, checked);
    });

  $(window).on('load', () => {
    $('.instruction-checkbox').each(function loadInstructionStatus() {
      const instruction = $(this).attr('name');
      const storedInstructionStatus = storage.get(`instruction--${instruction}`);
      if (storedInstructionStatus) {
        $(this).prop('checked', storedInstructionStatus);
      }
    });
  });
}());

/**
 * Creates custom checkbox styling for recipe items.
 */
(function chiliIngredientCheckboxes() {
  // Add in custom checkboxes.
  $('.ingredient-checkbox').checkboxpicker({
    html: true,
    offLabel: '<i class="fas fa-times"></i>',
    onLabel: '<i class="fas fa-check"></i>',
    baseGroupCls: 'btn-group btn-group-sm btn-group--ingredient-toggle',
    offCls: 'btn-light',
    onCls: 'btn-light',
    offActiveCls: 'btn-danger btn--off',
    onActiveCls: 'btn-success btn--on',
  })
    .on('change', function updateIngredientStatus() {
      const checked = $(this).prop('checked');
      const ingredient = $(this).attr('name');
      // console.log(`${ingredient}: ${checked}`);
      storage.set(`ingredient--${ingredient}`, checked);
    });

  $(window).on('load', () => {
    $('.ingredient-checkbox').each(function loadIngredientStatus() {
      const ingredient = $(this).attr('name');
      const storedIngredientStatus = storage.get(`ingredient--${ingredient}`);
      if (storedIngredientStatus) {
        $(this).prop('checked', storedIngredientStatus);
      }
    });
  });

  // check/uncheck all
  $('.all-sauce a.all').on('click', () => {
    $('.row-sauce .ingredient-checkbox').prop('checked', true);
    return false;
  });
  $('.all-sauce a.none').on('click', () => {
    $('.row-sauce .ingredient-checkbox').prop('checked', false);
    return false;
  });
  $('.all-substance a.all').on('click', () => {
    $('.row-substance .ingredient-checkbox').prop('checked', true);
    return false;
  });
  $('.all-substance a.none').on('click', () => {
    $('.row-substance .ingredient-checkbox').prop('checked', false);
    return false;
  });
  $('.all-spice a.all').on('click', () => {
    $('.row-spice .ingredient-checkbox').prop('checked', true);
    return false;
  });
  $('.all-spice a.none').on('click', () => {
    $('.row-spice .ingredient-checkbox').prop('checked', false);
    return false;
  });
}());

/**
 * Function to handle adjusting batch size.
 * @param {number} size
 *   The number of batch(es).
 */
const batchSizeUpdate = (size) => {
  // update stored value
  storage.set('batch-size', size);

  $('.output-size .batch-size .number').html(size);

  // add the appropriately formatted (plural) text
  if (size > 1) {
    $('.output-size .batch-size .label').html('Batches');
  }
  else {
    $('.output-size .batch-size .label').html('Batch');
  }

  // adjust the quarts
  const quarts = size * 5;
  $('.output-size .batch-size .quart-value').html(quarts);

  // update the recipe
  // Not using es6 arrow function here as I want to actually use the iterated this.
  $('.recipe-ingredients td span.item-qty').each(function adjustQuantities() {
    const thisQty = $(this).attr('data-qty') * size;
    $(this).html(thisQty);

    if (thisQty > 1) {
      $(this).next('.item-type').children('.item-plural').addClass('is-plural');
    }
    else {
      $(this).next('.item-type').children('.item-plural').removeClass('is-plural');
    }
  });
};

/**
 * Handles updating the quantity of batches.
 */
(function chiliRecipeAmountQuantitySlider() {
  const $slider = $('.output-size input[type="range"]');
  // console.log($slider);
  $slider.rangeslider({
    // Feature detection the default is `true`.
    // Set this to `false` if you want to use
    // the polyfill also in Browsers which support
    // the native <input type="range"> element.
    polyfill: false,
    // Callback function
    onSlide: (position, value) => {
      batchSizeUpdate(value);
    },
  });

  $(window).on('load ready', () => {
    const storedBatchSize = storage.get('batch-size');
    let value;
    if (storedBatchSize) {
      value = storedBatchSize;
      $slider.val(storedBatchSize);
    }
    else {
      value = $slider.val();
    }
    batchSizeUpdate(value);
    $slider.rangeslider('update', true);
  });
}());

/**
 * Function to handle adjusting batch heat level.
 * @param {number} heat
 *   The numerical value of the heat level.
 */
const batchHeatUpdate = (heat) => {
  const heatTxt = {
    1: 'mild',
    2: 'medium',
    3: 'hot',
  };

  const heatClass = heatTxt[heat];
  // update stored value
  storage.set('batch-heat', heat);

  $('.recipe-ingredients tbody tr').each(() => {
    if ($(this).hasClass(heatClass)) {
      $(this).slideDown('slow');
    }
    else {
      $(this).slideUp('slow');
    }
  });
};

/**
 * Handles updating the heat of the batch(es).
 */
(function chiliRecipeAmountHeatSlider() {
  const $slider = $('.output-heat input[type="range"]');
  // console.log($slider);
  $slider.rangeslider({
    // Feature detection the default is `true`.
    // Set this to `false` if you want to use
    // the polyfill also in Browsers which support
    // the native <input type="range"> element.
    polyfill: false,
    // Callback function
    onSlide: (position, value) => {
      batchHeatUpdate(value);
    },
  });

  $(window).on('load ready', () => {
    const storedHeatLevel = storage.get('batch-heat');
    let value;
    if (storedHeatLevel) {
      value = storedHeatLevel;
      $slider.val(value);
    }
    else {
      value = $slider.val();
    }
    batchHeatUpdate(value);
    $slider.rangeslider('update', true);
  });
}());
/* eslint-enable no-console */
