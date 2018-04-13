/**
 * ScrollData class for tracking data for user scrolling.
 *
 * @todo: Cleanup and refactor scroll.js.
 * @todo: Allow for hooking in at any %value.
 * @todo: Remove the need for jQuery.
 *   This ensures we aren't continually printing the element height when it's not changing.
 *
 * @example
 * import ScrollData from './scrollData';
 *
 * (function scrollTracker() {
 *   const scrollOptions = {
 *     debug: false,
 *     detailedDebug: false,
 *     element: $(document),
 *     wrapper: $(window),
 *   };
 *   const scroll = new ScrollData(scrollOptions);
 *
 *   $(window).on('ready resize scroll', () => {
 *     // Fire new tracker.
 *     const progress = scroll.getProgress().scroll;
 *     // Do something with the scroll data variable(s).
 *   });
 * }());
 *
 * @class ScrollData
 */

import $ from 'jquery';

class ScrollData {
  /**
   * Constructs ScrollData configurations.
   *
   * @constructor
   *
   * @param {Object} options
   *  Options for the ScrollData implementation.
   */
  constructor(options = {}) {
    const defaults = {
      element: $(document),
      wrapper: $(window),
      debug: false,
      detailedDebug: false,
    };
    this.options = Object.assign({}, defaults, options);
    this.progress = {};
  }

  /**
   * Return the current progress.
   *
   * @return {Object}
   *   The ScrollData data object.
   */
  getProgress() {
    this.elementTrackScroll();
    return this.progress;
  }

  /**
   * Function to handle debugging the progress of the page scrolling.
   */
  debugScrollProgress() {
    // eslint-disable-next-line no-console
    console.log(`Scroll progress: ${this.progress.scroll}%`);
  }

  /**
   * Function to handle debugging positioning variables.
   */
  // eslint-disable-next-line no-unused-vars
  debugScroll() {
    /* eslint-disable no-console */
    console.log(`Wrapper height: ${this.progress.wrapperHeight}px`);
    console.log(`Element height: ${this.progress.elementHeight}px`);
    /* eslint-enable no-console */
  }

  /**
   * Function to calculate and return the current height of a window.
   */
  elementGetHeight() {
    this.progress.elementHeight = this.options.element.height();
    this.progress.wrapperHeight = this.options.wrapper.height();
  }

  /**
   * Function to manage tracking a current scroll position on the page.
   */
  elementTrackScroll() {
    if (!this.progress.elementHeight || !this.progress.wrapperHeight) {
      // The height of the actual element.
      this.elementGetHeight();
      if (this.options.debug) {
        // Default (once) debugging output.
        this.debugScroll();
      }
    }

    // If the page is for some reason only one 'pane',
    // then the progress value is both 0 and 100.
    if (this.progress.elementHeight === this.progress.wrapperHeight) {
      this.progress.scroll = 100;
    }
    else {
      // The progress (percentage) a user has scrolled of the total page.
      this.progress.position = this.options.element.scrollTop();

      const adjustedHeight = this.progress.elementHeight - this.progress.wrapperHeight;
      this.progress.scroll = Math.floor((this.progress.position * 100) / adjustedHeight);
    }

    // Detailed (every percent value) debugging output.
    if (this.options.detailedDebug) {
      this.debugScrollProgress();
    }

    /**
     * Handles logic to determine to only fire an event once during the course of
     * computations around Math.floor(). Since numbers would track many times
     * in the scope of a scroll.
     *
     * Our current implementation assumes that it is OKAY to fire this event for
     * a user on EVERY page they view. This will however, only fire ONCE on a
     * single page. Additional logic would need to be added/adjusted if we change
     * the logic behind when this fires.
     *
     * @type {{zero: boolean, fifty: boolean, hundred: boolean}}
     */
    const fired = {
      zero: false,
      fifty: false,
      hundred: false,
    };

    // Handle what should happen at 0% page scroll;
    if (this.progress.scroll === 0 && !fired.zero) {
      if (this.options.debug) {
        this.debugScrollProgress();
      }
      fired.zero = true;
    }

    // Handle what should happen at 50% page scroll;
    if (this.progress.scroll === 50 && !fired.fifty) {
      if (this.options.debug) {
        this.debugScrollProgress();
      }
      fired.fifty = true;
    }

    // Handle what should happen at 100% page scroll;
    if (this.progress.scroll === 100 && !fired.hundred) {
      if (this.options.debug) {
        this.debugScrollProgress();
      }
      fired.hundred = true;
    }
  }
}

// Works with import ScrollData from 'scrollData';
export default ScrollData;
