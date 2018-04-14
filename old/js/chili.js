(function($) {
  
  // $.fn.sizeUpdate = function(batchSize) {
  //   // update stored value
  //   storage.set('batch-size', batchSize);
  //
  //   $('#output-size .batch-size .number').html(batchSize);
  //   // add the appropriately formated (plural) text
  //   if (batchSize > 1) {
  //     $('#output-size .batch-size .label').html("Batches");
  //   }
  //   else {
  //     $('#output-size .batch-size .label').html("Batch");
  //   }
  //
  //   // adjust the quarts
  //   var quarts = batchSize * 5;
  //   $('#output-size .batch-size .quart-value').html(quarts);
  //
  //   // update the recipe
  //   $('#recipe td span.item-qty').each(function(){
  //     var thisQty = $(this).attr('data-qty') * batchSize;
  //     $(this).html(thisQty);
  //
  //     if (thisQty > 1) {
  //       $(this).next('.item-type').children('.item-plural').addClass('is-plural');
  //     }
  //     else {
  //       $(this).next('.item-type').children('.item-plural').removeClass('is-plural');
  //     }
  //   });
  // };
  
  // $.fn.heatUpdate = function(batchHeat) {
  //
  //   var heatTxt = {
  //     1: "mild",
  //     2: "medium",
  //     3: "hot",
  //   }
  //
  //   //var heatTxt = new Array ("mild","medium","hot");
  //   var heatClass = heatTxt[batchHeat];
  //   // update stored value
  //   storage.set('batch-heat', batchHeat);
  //   //console.log('heat: ' + heat);
  //   //heatClass = heatTxt[heat];
  //
  //   $('#recipe tbody tr').each(function(){
  //     if ($(this).hasClass(heatClass)) {
  //       $(this).slideDown('slow');
  //     }
  //     else {
  //       $(this).slideUp('slow');
  //     }
  //   });
  // };
  
  $.fn.checkboxLoader = function() {
    var cbox = $(this[0]);
    var cboxName = cbox.attr('name');
    
    if (storage.get(cboxName)) {
      $(this).iCheck('check', function(){
        // run callback
      });
    }
    else {
      $(this).iCheck('uncheck', function(){
        // run callback
      });
    }
  };
  
  $.fn.checkboxSaver = function() {
    var cbox = $(this[0]);
    var cboxName = cbox.attr('name');
    var cboxValue = cbox.is(':checked');
    storage.set(cboxName, cboxValue);
  };
  
  $(document).ready(function(){
    // start localstorage
    recipeStorage = $.initNamespaceStorage('OpenSourceChili');
    storage = $.localStorage;
    
    // BATCH SIZE
    var batchSelector = $('#output-size .batch-selector input');
    
    if (storage.get('batch-size')) {
      var savedBatchValue = storage.get('batch-size');
    }
    else {
      var savedBatchValue = batchSelector.val();
    }    
    
    if (savedBatchValue != 1) {
      batchSelector.simpleSlider("setValue", savedBatchValue);
      batchSelector.sizeUpdate(savedBatchValue);
    }
    else {
      batchSelector.simpleSlider("setValue", "1");  
      batchSelector.sizeUpdate(1);
    }
    
    batchSelector.bind("slider:ready slider:changed", function (event, data) {
      var batch = data.value.toFixed(0);
      batchSelector.sizeUpdate(batch);
    });
    
    
    // BATCH HEAT
    var heatSelector = $('#output-heat .batch-heat input');
    //var savedHeatValue = heatSelector.val();
    
    if (storage.get('batch-heat')) {
      var savedHeatValue = storage.get('batch-heat');
    }
    else {
      var savedHeatValue = heatSelector.val();
    } 
    
    if (savedHeatValue != 2) {
      heatSelector.simpleSlider("setValue", savedHeatValue);
      heatSelector.heatUpdate(savedHeatValue);
    }
    else {
      heatSelector.simpleSlider("setValue", "2");  
      heatSelector.heatUpdate(2);
    }
    
    
    
    heatSelector.bind("slider:ready slider:changed", function (event, data) {
      var heat = data.value.toFixed(0);
      heatSelector.heatUpdate(heat);
    });
    
    // let's reset the value if the window is resized because it goes a little wonky
    $(window).resize(function(){
      var batchVal = batchSelector.val();
      batchSelector.simpleSlider("setValue", batchVal);  
      
      var heatVal = heatSelector.val();
      heatSelector.simpleSlider("setValue", heatVal);  
    });
    
    // FITTEXT
    $('h2.section-header').fitText(1, { minFontSize: '18px', maxFontSize: '60px' });
    $('#navbar h1').fitText(1, { minFontSize: '18px', maxFontSize: '36px' });
    
    $('#instruction-grid h3').fitText(1, { minFontSize: '14px', maxFontSize: '32px' });
  
    // make all local links scroll sweetly
    $.localScroll({duration:500, hash: false});
    
    // MENU FUNCTIONALITY
    // only deal with focus and mouse on non-touch enabled browsers
    $('.no-touch #site-navigation').on('focusin mouseenter', function(e){
      //e.stopPropagation();
      $('#recipe-navigation').stop().slideDown('fast');
      $('#site-navigation').addClass('active');
    });
    
    // only deal with focus and mouse on non-touch enabled browsers
    $('.no-touch #site-navigation').on('focusout mouseleave', function(e){
      //e.stopPropagation();
      $('#recipe-navigation').stop().slideUp('fast');
      $('#site-navigation').removeClass('active');
    });

    // hide menu when escape key is hit
    $(document).on('keydown', function (e) {
      if (e.keyCode === 27) { // ESC
        $('#recipe-navigation').stop().slideUp('fast');
        $('#site-navigation').removeClass('active');
      }
    });
    
    
    // click function can be used on touch and non-touch browsers
    // however, since mousenter is used above, only the action of
    // hovering on the menu, then clicking the icon again to close
    // is ever fired.
    $('#site-navigation h4 a').on('click', function(e){
      if ($('#site-navigation').hasClass('active')) {
        $('#recipe-navigation').slideUp('fast');
        $('#site-navigation').removeClass('active');
      }
      else {
        $('#recipe-navigation').slideDown('fast');
        $('#site-navigation').addClass('active');
      }
    });
    
    // if a link is clicked in the menu, close the menu
    $('#recipe-navigation li a').click(function(){
      $('#recipe-navigation').stop().slideUp('fast');
      $('#site-navigation').removeClass('active');
      return false;
    });
    
    // don't do anything when the icon link is clicked
    $('#site-navigation h4 a, #site-share h4 a').click(function(){
      return false;
    });
    
    
    // // checkboxes for recipe
    // $(':checkbox').iCheck({
    //   labelHover: false,
    //   cursor: true,
    //   checkboxClass: 'icheck icheckbox_square-green',
    // });
    //
    // // check/uncheck all
    // $('.all-sauce a.all').click(function(){
    //   $('.row-sauce input:checkbox:not(:hidden)').iCheck('check', function(){
    //     // run callback
    //   });
    //   return false;
    // });
    // $('.all-sauce a.none').click(function(){
    //   $('.row-sauce input:checkbox').iCheck('uncheck', function(){
    //     // run callback
    //   });
    //   return false;
    // });
    // $('.all-substance a.all').click(function(){
    //   $('.row-substance input:checkbox:not(:hidden)').iCheck('check', function(){
    //     // run callback
    //   });
    //   return false;
    // });
    // $('.all-substance a.none').click(function(){
    //   $('.row-substance input:checkbox').iCheck('uncheck', function(){
    //     // run callback
    //   });
    //   return false;
    // });
    // $('.all-spice a.all').click(function(){
    //   $('.row-spice input:checkbox:not(:hidden)').iCheck('check', function(){
    //     // run callback
    //   });
    //   return false;
    // });
    // $('.all-spice a.none').click(function(){
    //   $('.row-spice input:checkbox').iCheck('uncheck', function(){
    //     // run callback
    //   });
    //   return false;
    // });

    // load stored values
    $(':checkbox').each(function() {
      $(this).checkboxLoader();
    });

    // update stored values
    $(':checkbox').on('ifToggled', function() {
      $(this).checkboxSaver();
    });
    
  });
  
  $(window).ready(function(){
    
  });

})(jQuery);
