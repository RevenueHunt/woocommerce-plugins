/*! RevenueHunt embed.js commit=6889f041d */
"use strict";
// embedjs embed.js embed js

// npm install uglify-js -g
// npx uglifyjs extensions/prq/assets/embed-development.js --output extensions/prq/assets/embed.js --compress --mangle
// npm run deploy (to upload to Shopify)

window.rhScheduledMaintenance = false;
window.rhVersion = '1.0.0';
window.rhDate = new Date();

// Replaced by scripts/build-embed.cjs for staging builds.
var RH_ADMIN_ORIGIN = 'https://admin.revenuehunt.com';
var RH_QUIZ_ORIGIN = 'https://preview.revenuehunt.com';
var RH_API_ORIGIN = 'https://api.revenuehunt.com';
var RH_SPACE_ORIGIN = 'https://space.revenuehunt.com';

// Wrapped in IIFE to avoid leaking var declarations (e.g. `var i`) to the global scope,
// which can conflict with other scripts on the page (e.g. Booster Page Speed Optimizer).
(function() {
  // Get current script URL with fallback for edge cases
  // document.currentScript can be null in async/deferred scripts or certain browser contexts
  window.rhCurrentScript = '';
  if (document.currentScript && document.currentScript.src) {
    window.rhCurrentScript = document.currentScript.src;
  } else {
    // Fallback: try to find the embed.js script tag
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.indexOf('embed.js') !== -1) {
        window.rhCurrentScript = scripts[i].src;
        break;
      }
    }
  }

  // fix for page-level installs
  var scriptUrl = null;
  var prqParams = new URLSearchParams();

  if (window.rhCurrentScript) {
    try {
      scriptUrl = new URL(window.rhCurrentScript);
      prqParams = new URLSearchParams(scriptUrl.search);
    } catch (e) {
      console.warn('RevenueHunt: Could not parse script URL:', window.rhCurrentScript);
    }
  }

  window.rhCurrentShop = prqParams.get('shop');
})();

function prqSetCookie(name, value, days) {
  console_log('embed.js - prqSetCookie - ' + name + ' - ' + value + ' - ' + days);
  var expires = "";

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }


  try {
    document.cookie = name + "=" + (value || "") + expires + "; sameSite=Lax; path=/";
  }
  catch(e) {
    // console_log('embed.js error','prqSetCookie()', name, value, days);
    // console_log(e);
    console.warn("Failed to set cookie:", e);
    console.warn("cookie details:", name, value, days);
  }
}

function prqGetCookie(name) {
  // NOTE we can not use console_log in prqGetCookie function
  // otherwise we run on a "Maximum call stack size exceeded" error
  // console_log('embed.js - prqGetCookie - ' + name);

  try {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  }
  catch(e) {
    // console_log('embed.js error','prqGetCookie()', name);
    // console_log(e);
    console.warn("Failed to read cookie:", e);
    console.warn("cookie name:", name);
  }

  return null;
}

function console_log(value) {
  if (prqGetCookie('console_log') || window.location.hostname === 'localhost') {
    console.log(value);
    return true;
  }
  return false;
}

function iFrameEvent(d) {

  console_log('embed.js - iFrameEvent - ' + d);
  
  var iFrame = document.querySelector('.rh-widget iframe');
  var obj = JSON.stringify(d);

  // https://stackoverflow.com/questions/61548354/how-to-postmessage-into-iframe
  if (iFrame && iFrame.contentWindow && iFrame.contentWindow.postMessage) {
    iFrame.contentWindow.postMessage(obj, '*');
  }
}

window.iFrameEvent = iFrameEvent;

(function () {
  // Function to send error data to Ahoy events endpoint
  function sendErrorToAhoy(errorMessage) {
    // Replace with your Ahoy events endpoint
    const endpoint = RH_API_ORIGIN + '/ahoy/events';

    // Set up the event data
    const eventData = {
      events: [
        {
          name: 'Embed.js JavaScript Error',
          properties: {
            message: errorMessage.toString(),
            location: window.location.href,
            stack: errorMessage.stack
          }
        }
      ]
    };

    // Send the data using a POST request
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
      .catch(error => {
        console.error('Error sending event data to Ahoy:', error);
      });
  }

  try {

    window.addingToCart = false;

    console_log('console_log enabled // ' + window.rhVersion + ' // ' + window.rhDate);

    /*
    function console_log(value) {
      if (prqGetCookie('console_log') || window.location.hostname === 'localhost') {
        console.log(value);
        return true;
      }
      return false;
    }
    */

    function showQuizListShopifyEditor() {
      /** only run in Shopify editor */
      if ( typeof Shopify === 'undefined' || !Shopify || !Shopify.designMode ) { 
        return;
      }

      var quizLists = document.querySelectorAll('.rh-quiz-list');
      for (let i = 0; i < quizLists.length; i++) {
        quizLists[i].style.display = 'block';
      }
    }


    /**
     * Function that gets triggers callback when added all to cart, if the callback exists
     * @param    {Object} e       Quiz callback event
     * @return   {false}          Does not return anything
     */
    function triggerPrqAddedAllToCartCallback(e) {
      if (typeof prqAddedAllToCartCallback === 'function') {
        prqAddedAllToCartCallback(e);
      }
    }

    /**
     * Sends an asynchronous GET request to the specified URL.
     * @param {string} url - The URL to send the request to.
     * @param {function} callback - The callback function to execute when the request is successful.
     */
    const httpGetAsync = (url, callback) => {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = () => { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          callback(JSON.parse(xmlHttp.responseText));            
        }
      };
      xmlHttp.open('GET', url, true);
      xmlHttp.send(null);
    };

    /**
     * Sends an asynchronous POST request to the specified URL.
     * @param {string} url - The URL to send the request to.
     * @param {object} json - The JSON object to send in the request body.
     * @param {function} callback - The callback function to execute when the request is successful.
     */
    const httpPostAsync = (url, json, callback) => {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = () => { 
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          callback(JSON.parse(xmlHttp.responseText));            
        }
      };
      xmlHttp.open('POST', url, true);
      xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xmlHttp.send(JSON.stringify(json));
    };

    /*
    function iFrameEvent(d) {

      console_log('embed.js - iFrameEvent - ' + d);
      
      var iFrame = document.querySelector('.rh-widget iframe');
      var obj = JSON.stringify(d);

      // https://stackoverflow.com/questions/61548354/how-to-postmessage-into-iframe
      if (iFrame && iFrame.contentWindow && iFrame.contentWindow.postMessage) {
        iFrame.contentWindow.postMessage(obj, '*');
      }
    }

    window.iFrameEvent = iFrameEvent;
    */

    function updateInnerHTML(items) {
      if (items && items.length > 0) {
        httpGetAsync('/cart.js', function (cart) {
          for (var i = 0; i < items.length; i++) {
            var el = items[i];
            el.innerHTML = cart.item_count;
          }
        });
      }
    }

    /**
     * Checks if an item is being added to the cart. If so, waits until the item is added
     * before redirecting to a specified URL. If not, redirects immediately.
     * 
     * Uses a recursive setTimeout to check `window.addingToCart` every 2 seconds, stopping after 20 checks.
     * 
     * @param {string} url - The redirect URL.
     */
    function waitForPopulatedCart(url){

      console_log('embed.js - waitForPopulatedCart');

      var i = 1;                  //  set your counter to 1

      function myLoop() {         //  create a loop function
        setTimeout(function() {   //  call a 3s setTimeout when the loop is called
          if(window.addingToCart){
            console_log('wait... ' + i); //  your code here
            i++;                    //  increment the counter
            if (i < 20) {           //  if the counter < 10, call the loop function
              myLoop();             //  ..  again which will trigger another 
            }                       //  ..  setTimeout()
          }else{
            console_log('redirecting to url...');
            window.location.href = url;
          }
        }, 2000)
      }

      if(window.addingToCart){
        console_log('start loop');
        myLoop();                   //  start the loop
      }else{
        console_log('redirecting to url...');
        window.location.href = url;
      }
    }

    /**
     * Function that tags the Shopify cart/order with the response ID and the quiz answers
     * @param    {Object} e       Quiz callback event
     * @return   {false}          Does not return anything
     */
    function tagCart(e) {
      console_log('embed.js - tagCartWithResponseId');

      if ( !e.responseId && !e.quizAnswers ) {
        return;
      }

      var attributes = {}
      if ( e.responseId ) {
        attributes.__prq_response_id = e.responseId;
        attributes.__prq_quiz_id = e.quizId;
      }
      if ( e.quizAnswers ) {
        for (let key in e.quizAnswers) {
          attributes[key] = e.quizAnswers[key];
        }
      }

      console_log('/cart/update.js');
      console_log(attributes);
      httpPostAsync(
        '/cart/update.js',            // API URL
        { attributes: attributes},    // data payload
        function (response) {         // callback function
          console_log(response);
        });
    }

    /**
     * Updates the cart counter displayed on the webpage.
     * 
     * @note This function relies on the `httpGetAsync` and `updateInnerHTML` functions.
     */
    function updateCartCounter() {
      // RH
      var cartCount = document.getElementById('CartCount');

      if (cartCount) {
        httpGetAsync('/cart.js', function (cart) {
          cartCount.innerHTML = '<span>' + cart.item_count + '</span>';
          if (cart.item_count === 0) {
            cartCount.classList.add('hide');
          } else {
            cartCount.classList.remove('hide');
          }
        });
      }

      // MK
      var mk = document.getElementsByClassName('cart-item-count-header');
      updateInnerHTML(mk);

      // BB
      var bb = document.getElementsByClassName('cart_count');
      updateInnerHTML(bb);
    }

    function addProductsToCartBigCommerce(products) {

      console_log('embed.js - addProductsToCartBigCommerce');
      console_log(products);
      window.addingToCart = true;

      var buffer = [];
      for (let key in products) {
        var sku = encodeURIComponent(JSON.parse(key).sku);
        var qty = encodeURIComponent(products[key]);
        var url = '/cart.php?action=add&sku='+sku+'&qty=' + qty;
        buffer.push(url);
      }

      console_log(buffer);

      var i = 0;
      function loopVariants(i) {
        bcAddToCart(buffer[i]).then(function(response){
          console_log(buffer[i]);
          console_log(response);
          i++;
          if (i < buffer.length) {
            loopVariants(i);
          }else{
            console_log('embed.js - addProductsToCartBigCommerce - finished');
            window.addingToCart = false;
            url = '/cart.php';
            window.location.href = url;
          }
        });
      }

      loopVariants(i);
    }

    function bcAddToCart(url) {

      // AJAX call without jQuery, with promise
      return new Promise(function(resolve,reject)
        {
          var req = new XMLHttpRequest();
          req.open('GET', url, true);
          req.onreadystatechange = function () {
            if (req.readyState == 4) {
              if(req.status == 200) {
                resolve(true);
              } else {
                reject(Error(req.statusText));
              }
            }
          };
          req.onerror = function() {
            reject(Error("network error"));
          };
          req.send();
        });
    }

    /*
    function wcSetCartQuantity(product_id, quantity) {

      console_log('embed.js - wcSetCartQuantity');

      // TODO add promise, like in wcAddToCart
      var xhr = new XMLHttpRequest();
      var url = woocommerce_params.ajax_url;
      var data = 'action=set_cart_item_quantity&product_id=' + encodeURIComponent(product_id) + '&quantity=' + encodeURIComponent(quantity);
    
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      
      xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if(response.success) {
            console_log('Quantity updated successfully');
          } else {
            console_log('Failed to update quantity');
          }
        }
      };
      
      xhr.send(data);
    } 
    */   

    function wcAddToCart(product) {

      console_log('embed.js - wcAddToCart');

      // AJAX call without jQuery, with promise
      return new Promise(function(resolve,reject)
        {
          var req = new XMLHttpRequest();
          // 'https://' + window.rhCurrentShop + -> fix for page-level installs
          if ( window.rhCurrentShop && window.rhCurrentShop !== null ) {
            req.open('POST', 'https://' + window.rhCurrentShop + '/?wc-ajax=add_to_cart');
          } else {
            req.open('POST', '/?wc-ajax=add_to_cart');
          }
          req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

          var formBody = [];

          for (var property in product) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(product[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }

          formBody = formBody.join("&");

          req.onreadystatechange = function () {
            if (req.readyState == 4) {
              if(req.status == 200) {
                resolve(JSON.parse(req.responseText));
                // console_log('embed.js - RESPONSE to POST: /?wc-ajax=add_to_cart');
                // console_log(JSON.parse(req.responseText));
                iFrameEvent({ action: 'added_one', product: product });
                if (typeof prqAddedOneToCartCallback === 'function') {
                  prqAddedOneToCartCallback(product);
                }
              } else {
                reject(Error(req.statusText));
              }
            }
          };
          req.onerror = function() {
            reject(Error("network error"));
          };
          req.send(formBody);
        });
    }

    function fbPixel(facebook_pixel, action, event, quizParams) {


      if(typeof window.fbq === 'undefined'){
        // console_log('no fbq: return');
        return;
      }

      // trigger event
      if(quizParams){
        window.fbq(action, event, quizParams)
      }else{
        window.fbq(action, event)
      }
    }

    function gtagTrack(gtag_id, action, category, label) {

      if(typeof gtag === 'undefined'){
        console.warn('RevenueHunt: make sure to load gtag, before the embed.js script');
        return;
      }

      console_log('trigger gtag');

      const eventData = {
        'event_category': category,
        'event_label': label
      };

      if (typeof gtag_id !== 'undefined') {
        console_log('set user defined gtag');

        eventData.send_to = gtag_id;
      }

      gtag('event', action, eventData);

      return;
    }

    // --- GA4-native event tracking (mirrors frontend_v2/app/services/ga4Client.ts) ---

    var PRQ_GA4_MAX_PARAM_VALUE_LENGTH = 100;
    var PRQ_GA4_MAX_EVENT_NAME_LENGTH = 40;

    // Primary parameter per event, used to build the dynamic event name.
    // generate_lead is intentionally omitted so it keeps its base name (standard GA4 event).
    var PRQ_GA4_PRIMARY_PARAM = {
      quiz_started: 'quiz_name',
      question_viewed: 'question_title',
      block_answered: 'choice_text',
      email_lead: 'quiz_name',
      phone_lead: 'quiz_name',
      results_page_viewed: 'results_page_title',
      product_recommended: 'product_name',
      product_clicked: 'product_name',
      product_added_to_cart: 'product_name',
      proceed_to_checkout: 'quiz_name',
      quiz_retake_quiz: 'quiz_name'
    };

    function prqGa4SanitizeEventName(text) {
      var sanitized = String(text)
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_+|_+$/g, '');
      if (sanitized && !/^[a-z]/.test(sanitized)) {
        sanitized = 'quiz_' + sanitized;
      }
      return sanitized || 'unknown';
    }

    function prqGa4GenerateDynamicEventName(baseEvent, parameterValue) {
      var sanitizedValue = prqGa4SanitizeEventName(parameterValue);
      var dynamicEventName = baseEvent + '_' + sanitizedValue;
      if (dynamicEventName.length <= PRQ_GA4_MAX_EVENT_NAME_LENGTH) {
        return dynamicEventName;
      }
      var maxParameterLength = PRQ_GA4_MAX_EVENT_NAME_LENGTH - baseEvent.length - 1;
      return baseEvent + '_' + sanitizedValue.slice(0, maxParameterLength);
    }

    function prqGa4GenerateEventNameByType(eventName, eventData) {
      var primary = PRQ_GA4_PRIMARY_PARAM[eventName];
      if (primary && eventData[primary]) {
        return prqGa4GenerateDynamicEventName(eventName, eventData[primary]);
      }
      return eventName;
    }

    function prqGa4ValidateParams(eventData) {
      var validated = {};
      for (var key in eventData) {
        var value = eventData[key];
        if (value !== null && value !== undefined) {
          var str = String(value);
          validated[key] = str.length <= PRQ_GA4_MAX_PARAM_VALUE_LENGTH
            ? str
            : str.slice(0, PRQ_GA4_MAX_PARAM_VALUE_LENGTH - 3) + '...';
        }
      }
      return validated;
    }

    function prqGa4Track(eventName, eventData) {
      if (typeof gtag === 'undefined') {
        console.warn('RevenueHunt: make sure to load gtag, before the embed.js script');
        return;
      }
      var validated = prqGa4ValidateParams(eventData || {});
      var finalEventName = prqGa4GenerateEventNameByType(eventName, validated);
      console_log('ga4 event: ' + finalEventName);
      gtag('event', finalEventName, validated);
    }

    /**
     * Adds an event listener for the 'message' event on the window object.
     * 
     * This function will be called whenever a 'message' event is dispatched on the window object.
     * The 'message' event is typically used for cross-origin communication via the postMessage API.
     * 
     * @param {MessageEvent} event - The event object associated with the 'message' event.
     */
    const addWindowEventListenerMessage = () => {

      console_log('embed.js - addWindowEventListenerMessage');

      window.addEventListener('message', function (event) {
        // Trust the quiz origin and cached admin pages during rollout. Local/dev
        // remain explicit exceptions for testing embed-development.js.
        if (event.origin !== RH_QUIZ_ORIGIN && event.origin !== RH_ADMIN_ORIGIN && event.origin !== 'http://localhost:9528' && event.origin !== 'https://admin-dev.revenuehunt.com' ) {
          return;
        }

        var e;
        if (typeof event.data === 'object') {
          e = event.data;
        } else {
          e = JSON.parse(event.data);
        }

        try {
          if(e.action === 'gtag_event'){
            console_log('gtag_event')
            console_log(e)
            gtagTrack(e.gtag_id, e.gtag_action, e.gtag_category, e.gtag_label);
          }
        }
        catch(e) {
          console_log(e);
        }

        try {
          if(e.action === 'ga4_event'){
            console_log('ga4_event')
            console_log(e)
            prqGa4Track(e.event, e.params);
          }
        }
        catch(e) {
          console_log(e);
        }

        try {
          if(e.action === 'fbpixel_event'){
            fbPixel(e.facebook_pixel, e.fbq_action, e.fbq_event, e.fbq_params);
          }
        }
        catch(e) {
          console_log(e);
        }

        // var platform = getPlatform();

        if (e.action === 'iframe_height') {

          var inlineQuizzes = document.querySelectorAll('.rh-inline');

          if ( inlineQuizzes.length === 0 ) {
            return;
          }

          for (let i = 0; i < inlineQuizzes.length; i++) {
            var qid = inlineQuizzes[i].dataset.url.split('/').pop();
            if ( e.quizid === qid) {
              var iFrameContainer = inlineQuizzes[i];
              var iFrame = iFrameContainer.querySelector('.rh-inline iframe');
            }
          }

          if (!iFrameContainer || !iFrame) {
            return;
          }

          storeInitialHeights(iFrameContainer, iFrame);

          var fixedHeight = iFrameContainer.getAttribute('data-fixed-height') === 'true';

          /** always max out quiz response, not fixed */
          if ( e.location === 'response' ) {
            fixedHeight = false;
          } 

          if (e.height !== 0 && !fixedHeight) {
            iFrameContainer.style.height = e.height + 'px';
            iFrame.style.height = e.height + 'px';
          }
        }

        if (e.action === 'quiz_callback') {
          console_log('embed.js - quiz_callback');
          prqSetCookie('prq-responseId-' + e.quiz.id, e.response.id, 7);
          tagCart(e);
          // checkResponseAndCart();

          // trigger callback function in store
          if (typeof prqQuizCallback === 'function') {
            prqQuizCallback(e);
          }

          console_log('set klaviyo identify');
          console_log(e.klaviyoIdentify);
          if ( e.klaviyoIdentify && typeof klaviyo === 'object' ) {
            klaviyo.push(['identify', e.klaviyoIdentify]);
          } else if ( e.klaviyoIdentify && typeof _learnq === 'object') {
            _learnq.push(['identify', e.klaviyoIdentify]);
          } else {
            // do nothing
          }
        }

        if (e.action === 'slide_callback' && typeof prqSlideCallback === 'function') {
          console_log('embed.js - slide_callback');
          prqSlideCallback(e);
        }

        if (e.action === 'start_callback' && typeof prqStartCallback === 'function') {
          console_log('embed.js - start_callback');
          prqStartCallback(e);
        }

        if (e.action === 'view_product') {
          try {
            if (['http:', 'https:'].includes(new URL(e.url, window.location.href).protocol)) {
              window.location.href = e.url;
            }
          } catch (_) {
            // Ignore invalid product URLs.
          }
        }

        if (e.action === 'proceed_to_cart') {
          console_log('embed.js - proceed_to_cart');
          console_log(e);

          // redirect to cart
          var url = '/cart';

          if ( typeof Shopify !== 'undefined' && Shopify && Shopify.routes && Shopify.routes.root ) {
            url = Shopify.routes.root + 'cart';
          }

          // auto apply discount code
          if(e.platform === 'ShopifyShop' && e.discountcode) {
            url = '/discount/'+e.discountcode.trim()+'/?redirect=/cart';
          }

          // add locale Shopify
          if ( e.platform === 'ShopifyShop' && url.includes('?') ) {
            url = url + '&locale=' + e.locale
          } else if ( e.platform === 'ShopifyShop' ) {
            url = url + '?locale=' + e.locale
          } else {
            // do nothing
          }

          // auto apply discount code
          if(e.platform === 'MagentoShop') {
            url = '/checkout/cart/';
          }

          // custom cart url
          if(e.carturl && e.platform !== 'ShopifyShop'){
            var url = e.carturl;
            url = '/' + url;
            url = url.replace('//', '/');
          }

          // add UTM source/medium/campaign if passed
          if (e.quizid) {
            url = url + e.setutm;
          }

          if(e.platform === 'BigcommerceShop') {
            addProductsToCartBigCommerce(e.products);
            return;
          }

          try {
            if(e.platform !== 'ShopifyShop') {
              // temp hack, delaying proceed to cart 2s only for woo & bigCommerce
              console_log('embed.js - waitForPopulatedCart:');
              console_log(url);

              waitForPopulatedCart(url);
            } else if ( rebuySmartCartEnabled() ) {
              console_log('embed.js - Rebuy Cart');
              Rebuy.SmartCart.show();
              document.querySelector('rebuy-cart__flyout').style.zIndex = 9999999999;
              iFrameEvent({ action: 'checking_out_false' });
            } else {
              console_log('embed.js - Cart Redirect:');
              console_log(url);

              window.location.href = url;
            }
          } catch(e) {
            console_log(e);
          }

        }

        if (e.action === 'retake_quiz' || e.action === 'view_question' || e.action === 'quiz_callback') {
          console_log('retake_quiz or view_question or quiz_callback');
          console_log(e);

          var inlineQuizzes = document.querySelectorAll('.rh-inline');

          if ( inlineQuizzes.length === 0 ) {
            return;
          }

          for (let i = 0; i < inlineQuizzes.length; i++) {
            var qid = inlineQuizzes[i].dataset.url.split('/').pop();
            if ( e.quizid === qid) {
              var iFrameContainer = inlineQuizzes[i];
              var iFrame = iFrameContainer.querySelector('.rh-inline iframe');
            }
          }

          if (!iFrameContainer || !iFrame) {
            return;
          }

          storeInitialHeights(iFrameContainer, iFrame);

          // restore the height the quiz was rendered with: the results page
          // always expands the iFrame, including when data-fixed-height is set
          iFrameContainer.style.height = iFrameContainer.dataset.rhInitialHeight;
          iFrame.style.height = iFrameContainer.dataset.rhInitialIframeHeight;

          scrollToTop(iFrameContainer);
        }

        if (e.action === 'close_quiz') {
          console_log('embed.js - close_quiz');
          closeQuiz(e.quizid);
        }

        if (e.action === 'add_one' && typeof prqAddOneToCartCallback === 'function') {
          console_log('embed.js - add_one callback');
          prqAddOneToCartCallback(e);
        }

        if (e.action === 'add_one' && e.platform === 'ShopifyShop') {
          // add one product to cart on Shopify
          console_log('embed.js - add_one Shopify');
          console_log(e);

          if ( e.recharge ) {
            console_log('ReCharge product')
            const rechargePayload = { id: e.variantId, sellingPlanId: e.recharge.external_plan_id, sellingPlanGroupId: e.recharge.external_plan_group_id, isSubscription: true }
            console_log(rechargePayload);
            window.ReChargeWidget.api.postToCart(rechargePayload);
            return;
          }

          console_log('Shopify product')

          httpPostAsync(
            '/cart/add.js',                     // API URL
            { quantity: 1, id: e.variantId },   // data payload
            function (response) {               // callback function
              updateCartCounter();

              if (typeof prqAddedOneToCartCallback === 'function') {
                prqAddedOneToCartCallback(response);
              }
            });
        }

        if (e.action === 'add_one' && e.platform === 'WoocommerceShop') {
          // add one product to cart on WooCommerce
          console_log('embed.js - add_one WooCommerce');

          var pid = e.variantId || e.originId;

          var product = {
            quantity: 1,
            product_id: pid,
            product_sku: e.sku
          };
          wcAddToCart(product);
        }

        if (e.action === 'add_one' && e.platform === 'MagentoShop') {
          // add one product to cart on Magento
          console_log('embed.js - add_one Magento');

          var pid = e.variantId || e.originId;

          var product = {
            quantity: 1,
            product_id: pid,
            product_sku: e.sku
          };

          const req = new XMLHttpRequest();
          req.responseType = 'json';
          req.open('GET', '/productquiz/index/addquizproductstocart/product_id/' + pid + '?' + cachebuster());
          req.onload = () => {
            console_log(req.response);
            if (typeof prqAddedOneToCartCallback === 'function') {
              prqAddedOneToCartCallback(product);
            }
          };    
          req.send();
        }

        if (e.action === 'add_all' && typeof prqAddAllToCartCallback === 'function') {
          console_log('embed.js - add_all');
          prqAddAllToCartCallback(e);
        }

        if (e.action === 'add_all' && e.platform === 'ShopifyShop') {
          // add multiple products in one call, one of each
          // https://help.shopify.com/en/themes/development/getting-started/using-ajax-api
          console_log('embed.js - add_all Shopify');

          window.addingToCart = true;
          var variants = e.variantId.split('||');
          var aa = {};
          variants.forEach(function (variant) {
            aa[parseInt(variant)] = 1;
          });

          httpPostAsync(
            '/cart/update.js',        // API URL
            { updates: aa },          // data payload
            function (response) {     // callback function
              window.addingToCart = false;
              updateCartCounter();
              triggerPrqAddedAllToCartCallback(e);
            });
        }

        if (e.action === 'add_all' && e.platform === 'WoocommerceShop') {
          // add multiple products looping   
          console_log('embed.js - add_all WooCommerce');

          window.addingToCart = true;
          var variants = e.variantId.split('||');
          var i = 0;

          // WARNING: do not nest functions, peta el use strict
          function loopVariants(i) {
            var product = {
              quantity: 1,
              product_id: variants[i]
            };
            wcAddToCart(product).then(function(response){
              i++;
              if (i < variants.length) {
                // console_log('adding product: '+i);
                loopVariants(i);
              }else{
                window.addingToCart = false;
                // console_log('Finished adding to cart.');
                iFrameEvent({ action: 'added_all' });
                triggerPrqAddedAllToCartCallback(e);
              }
            });
          }

          loopVariants(i);
        }

        if (e.action === 'add_all' && e.platform === 'MagentoShop') {
          // add multiple products Magento
          console_log('embed.js - add_all Magento');

          var pids = e.variantId.replace(/\|\|/g, ',');

          const req = new XMLHttpRequest();
          req.responseType = 'json';
          req.open('GET', '/productquiz/index/addallquizproductstocart/product_ids/' + pids + '?' + cachebuster());
          req.onload = () => {
            console_log(req.response);
            iFrameEvent({ action: 'added_all' });
            triggerPrqAddedAllToCartCallback(e);
          };    
          req.send();
        }

        if (e.action === 'change_variant') {
          console_log('embed.js - change_variant');

          // remove one variant, add another
          // https://help.shopify.com/en/themes/development/getting-started/using-ajax-api
          var variants = e.variantId.split('||');
          var newId = variants[0];
          var oldId = variants[1];

          console_log(newId);
          console_log(oldId);

          if (e.platform === 'ShopifyShop') {
            // console_log('change_variant Shopify');

            newId = JSON.parse(newId);
            oldId = JSON.parse(oldId);

            if ( newId.recharge ) {
              console_log('ReCharge product');
              const rechargePayload = { id: newId.variant_id, sellingPlanId: newId.recharge.external_plan_id, sellingPlanGroupId: newId.recharge.external_plan_group_id, isSubscription: true };
              console_log(rechargePayload);
              window.ReChargeWidget.api.postToCart(rechargePayload);
              return;
            }

            var ud = {};
            ud[oldId.variant_id] = 0;
            ud[newId.variant_id] = e.quantity; 

            console_log('/cart/update.js');
            console_log(ud);

            httpPostAsync(
              '/cart/update.js',          // API URL
              { updates: ud },            // data payload
              function (updateResponse) { // callback function
                console_log(updateResponse);
              });
          }

          if (e.platform === 'WoocommerceShop') {
            // add one product to cart on WooCommerce
            var product = {
              quantity: 1,
              product_id: newId
            };
            wcAddToCart(product);
          }
        }

        if (e.action === 'remove_one' && typeof prqRemoveOneFromCartCallback === 'function') {
          // trigger remove one product from cart callback
          console_log('remove_one callback');
          prqRemoveOneFromCartCallback(e);
        }

        if (e.action === 'remove_one' && e.platform === 'ShopifyShop') {
          // remove one product from cart on shopify
          console_log('remove_one Shopify');

          var payload = {};

          if ( typeof e.quantity === 'undefined' || !e.quantity ) {
            e.quantity = 0;
          }

          payload[e.variantId] = e.quantity; 

          console_log('/cart/update.js');
          console_log(payload);

          httpPostAsync(
            '/cart/update.js',          // API URL
            { updates: payload },       // data payload
            function (response) {       // callback function
              console_log(response);
              updateCartCounter();

              if (typeof prqRemovedOneFromCartCallback === 'function') {
                prqRemovedOneFromCartCallback(response);
              }
            });
        }

        if(e.action === 'remove_one' && e.platform === 'WoocommerceShop'){
          // remove one product from cart on WooCommerce
          console_log('embed.js - remove_one WooCommerce');

          // AJAX call without jQuery
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/?wc-ajax=remove_from_cart');
          // https://docs.woocommerce.com/wc-apidocs/source-class-WC_AJAX.html
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

          var details = { cart_item_key: e.originId };

          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");


          xhr.onload = function () {
            console_log(xhr);
          };
          xhr.send(formBody);
        }

        if (e.action === 'remove_one' && e.platform === 'MagentoShop') {
          // remove one product from cart on Magento
          console_log('embed.js - remove_one Magento');

          var pid = e.variantId || e.originId;

          var product = {
            quantity: 1,
            product_id: pid,
            product_sku: e.sku
          };

          const req = new XMLHttpRequest();
          req.responseType = 'json';
          req.open('GET', '/productquiz/index/removequizproductstocart/product_id/' + pid + '?' + cachebuster());
          req.onload = () => {
            console_log(req.response);
            if (typeof prqRemovedOneFromCartCallback === 'function') {
              prqRemovedOneFromCartCallback(product);
            }
          };    
          req.send();
        }

      }, false);
    };

    /**
     * Generates a random ID of 6 characters using letters from the alphabet (uppercase and lowercase).
     * @return {string}  The generated ID.
     */
    const makeid = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var result = '';
      for (var i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    function cachebuster() {
      return 'cachebuster=' + makeid(); 
    }

    const isObject = (obj) => {
      return Object.prototype.toString.call(obj) === '[object Object]';
    };

    /**
     * Generates the URL for an iFrame
     * @param {string} url - The base URL for the iFrame
     * @param {boolean} isPopup - Whether or not the iFrame is a popup
     * @param {boolean} autoscroll - Whether or not the iFrame should auto-scroll
     * @param {string} popupWidth - The width of the popup
     * @param {string} popupHeight - The height of the popup
     * @returns {string} - The generated URL
     */
    const generateIframeUrl = (url, isPopup = false, autoscroll = false, popupWidth = false, popupHeight = false) => {
      // Generate the quiz parameters
      var quizParams = quizParameters(isPopup, autoscroll, popupWidth, popupHeight);
      // Convert the parameters to a URL-encoded string
      var params_string = new URLSearchParams(quizParams).toString();
      // Add the parameters to the URL
      var params_url = params_string === '' ? '' : '?' + params_string;
      // Combine the base URL and parameters to create the full URL
      return url + params_url
    };

    const foolProofUrl = (url) => {    
      // Check if the URL contains "#quiz-"
      const quizIndex = url.indexOf('#quiz-');
      if (quizIndex !== -1) {
        // Extract the part after "#quiz-"
        const newUrl = url.substring(0, quizIndex) + url.substring(quizIndex + 6);
        return newUrl;
      }
      return url;
    };

    const shopifyCurrency = (url) => {
      console_log('shopifyCurrency');
      console_log(url);

      /** for testing purposes only, in local
      var Shopify = {};
      Shopify.currency = { active: "HKD", rate: "8.0065002" }; 
      */

      // Only for Shopify stores
      if (typeof Shopify === 'undefined' || !Shopify || !Shopify.currency) { 
        return url;
      }

      // build URL parameters string
      const { active, rate } = Shopify.currency;
      const currency_params = `currency_code=${active}&currency_rate=${rate}`;

      // concatenate params with existing URL
      return url.includes('?') ? `${url}&${currency_params}` : `${url}?${currency_params}`;
    }

    // GET QUIZ PARAMS
    const quizParameters = function quizParameters(isPopup, autoscroll, popupWidth, popupHeight) {
      console_log('embed.js - quizParameters');
      // FAQs - https://docs.revenuehunt.com/how-to-guides/pass-parameteres-to-fill-quiz-responses/

      const urlParams = new URLSearchParams(window.location.search);
      var quizParams = {};

      // first, check if it's a popup
      if(isPopup) {
        quizParams.popup = 'true';
        autoscroll = 'true';
      }

      if(popupWidth) {
        quizParams.popupWidth = popupWidth;
      }

      if(popupHeight) {
        quizParams.popupHeight = popupHeight;
      }

      if(!autoscroll) {
        quizParams.autoscroll = 'false';
      }

      // check window.prq_vars and iterate
      if (isObject(window.prq_vars)) {
        // merge objects
        quizParams = Object.assign(quizParams, window.prq_vars);
      }

      // iterate through all the URL parameters, only get ours, starting with prq_
      console_log('URLSearchParams');
      for(var url_param of urlParams.entries()) {
        if ( url_param[0].startsWith('prq_') ) {
          var key = url_param[0].replace('prq_', '');
          var value = url_param[1];
          console_log(url_param);
          quizParams[key] = value;
        }
      }

      return quizParams;
    }

    /**
     * Check if autoscroll is enabled
     * @param    {string} autoscroll - the value of the data-autoscroll attribute
     * @returns  {boolean} - true if autoscroll is enabled, false otherwise
     */
    const isAutoScroll = function isAutoScroll(autoscroll) {
      console_log('embed.js - isAutoScroll');
      console_log(autoscroll);
      if (autoscroll && autoscroll.toLowerCase() === 'false') {
        return false;
      }
      return true;
    };

    /**
     * Check if Rebuy Smart Cart is enabled
     * @param    {void}           // Does not require any arguments
     * @returns  {boolean}        // true if Rebuy Smart Cart is enabled, false otherwise
     */
    const rebuySmartCartEnabled = () => {
      return document.querySelector('body.smart-cart--enabled') !== null &&
        typeof Rebuy !== 'undefined' &&
        typeof Rebuy?.SmartCart !== 'undefined';
    };

    const RenderInlineMaintenance = function RenderInlineMaintenance() {

      // REMOVE ALL DUPLICATE IFRAMES FIRST
      if (document.querySelectorAll('.rh-widget iframe')) {
        document.querySelectorAll('.rh-widget iframe').forEach(function (el) {
          el.remove();
        });
      }

      // THEN RENDER MAINTENANCE MESSAGE
      var inlines = document.querySelectorAll('.rh-widget');
      inlines.forEach(function(element) {
          // Set background color
          element.style.backgroundColor = '#aaa';
      
          // Create a container for the title and message
          var container = document.createElement('div');
          container.style.textAlign = 'center';
          container.style.display = 'flex';
          container.style.flexDirection = 'column';
          container.style.justifyContent = 'center';
          container.style.height = 'calc(100% - 60px)';
          container.style.width = 'calc(100% - 60px)';
          container.style.padding = '30px';
          container.style.color = '#fff';
      
          // Create and append the title
          var title = document.createElement('h2');
          title.textContent = 'Quiz Temporarily Unavailable';
          container.appendChild(title);
      
          // Create and append the message
          var message = document.createElement('p');
          message.textContent = "We're currently improving your experience! Please check back shortly after our brief maintenance period.";
          container.appendChild(message);
      
          // Append the container to the element
          element.appendChild(container);
      });      
    };

    const RenderInlineEmbed = function RenderInlineEmbed() {

      // REMOVE ALL DUPLICATE IFRAMES FIRST
      if (document.querySelectorAll('.rh-widget iframe')) {
        document.querySelectorAll('.rh-widget iframe').forEach(function (el) {
          el.remove();
        });
      }

      // THEN RENDER IFRAME
      var inlines = document.querySelectorAll('.rh-widget');
      inlines.forEach(function(element) {
        var quizId = makeid();
        var url = foolProofUrl(element.dataset.url);
        try {
          var parsedUrl = new URL(url);
          url = getDomain() + parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
        } catch (e) {
          // Hand-written data-url without a scheme: keep it as before.
        }
        var iframeUrl = generateIframeUrl(url, false, isAutoScroll(element.dataset.autoscroll));
        iframeUrl = shopifyCurrency(iframeUrl);
        console_log('RenderInlineEmbed - shopifyCurrency');
        console_log(iframeUrl);
        var iframe = document.createElement('iframe');
        iframe.name = 'Product Recommendation Quiz';
        iframe.title = 'Product Recommendation Quiz';
        iframe.ariaLabel = 'Product Recommendation Quiz';
        iframe.src = iframeUrl;
        iframe.id = quizId;
        iframe.style.cssText = 'transform-style: preserve-3d; padding: 0; border: none; margin: 0 auto; height: 100%; flex-grow: 1; background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjBweCIgIGhlaWdodD0iNjBweCIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLXJvbGxpbmciIHN0eWxlPSJiYWNrZ3JvdW5kOiBub25lOyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgZmlsbD0ibm9uZSIgbmctYXR0ci1zdHJva2U9Int7Y29uZmlnLmNvbG9yfX0iIG5nLWF0dHItc3Ryb2tlLXdpZHRoPSJ7e2NvbmZpZy53aWR0aH19IiBuZy1hdHRyLXI9Int7Y29uZmlnLnJhZGl1c319IiBuZy1hdHRyLXN0cm9rZS1kYXNoYXJyYXk9Int7Y29uZmlnLmRhc2hhcnJheX19IiBzdHJva2U9IiNkZGRkZGQiIHN0cm9rZS13aWR0aD0iNSIgcj0iNDUiIHN0cm9rZS1kYXNoYXJyYXk9IjIxMi4wNTc1MDQxMTczMTEwNSA3Mi42ODU4MzQ3MDU3NzAzNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTEzLjk4MSA1MCA1MCkiPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ibGluZWFyIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiBrZXlUaW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9zdmc+) no-repeat center;';
        iframe.setAttribute('data-hj-allow-iframe', 'true');
        element.appendChild(iframe);
        document.getElementById(quizId).onload = function () {
          document.getElementById(quizId).contentWindow.focus();
        };
      });
    };

    const RenderPopupEmbed = function RenderPopupEmbed() {
      var links = document.querySelectorAll('a');
      links.forEach(function(element) {
        if (element && element.href && typeof element.href === 'string' && element.href.match(/\#quiz\-/)) {
          var quizId = element.href.split('#quiz-')[1];

          // CLICK EVENT LISTENER
          element.addEventListener('click', function (event) {
            event.preventDefault();
            // REMOVE ALL IDs FIRST
            if(document.getElementById(quizId)){
              document.getElementById(quizId).remove();    
            }
            // THEN RENDER IFRAME
            showQuiz(quizId, false, 'true');
          });
        }
      });
    };

    /**
     * Returns the correct domain based on the current URL.
     * @param    {void}           // Does not require any arguments
     * @returns  {string}         // The correct domain.
     */
    const getDomain = () => {
      const { rhCurrentScript } = window;
      const { URL } = document;

      const domainMap = [
        { regex: /admin\-dev\.revenuehunt\.com/, domain: 'https://admin-dev.revenuehunt.com' },
        { regex: /localhost|productrecommendationquizforwoocommerce|productrecommendationquiz.local/, domain: 'http://localhost:9528' }
      ];

      for (let { regex, domain } of domainMap) {
        if (regex.test(rhCurrentScript) || regex.test(URL)) {
          return domain;
        }
      }

      return RH_QUIZ_ORIGIN;
    };

    const addChatStyles = function addChatStyles() {
      const domain = getDomain();
      const styles = '.rh-chat {\
      width: 50px;\
      height: 50px;\
      bottom: 20px;\
      right: 20px;\
      cursor: pointer;\
      position: fixed;\
      border-radius: 25px;\
        -webkit-border-radius: 25px;\
        -moz-border-radius: 25px;\
        -webkit-box-shadow: 0 0 3px 0 rgba(0,0,0,0.1);\
        -moz-box-shadow: 0 0 3px 0 rgba(0,0,0,0.1);\
      box-shadow: 0 0 3px 0 rgba(0,0,0,0.1);\
    }\
    \
      .rh-greeting {\
        padding: 8px;\
        background-color: white;\
        bottom: 29px;\
        right: 80px;\
        position: fixed;\
        color: #666;\
        font-size: 12px;\
        border: 1px solid #eee;\
        border-radius: 6px;\
          -webkit-border-radius: 6px;\
          -moz-border-radius: 6px;\
          -webkit-box-shadow: 0 0 3px 0 rgba(0,0,0,0.1);\
          -moz-box-shadow: 0 0 3px 0 rgba(0,0,0,0.1);\
        box-shadow: 0 0 3px 0 rgba(0,0,0,0.1);\
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;\
      }\
    \
    span.rh-close {\
      cursor: pointer;\
      font-weight: bold;\
      background-image: url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgd2lkdGg9IjEyLjAxMTU5NyIKICAgaGVpZ2h0PSIxMi4wMDk4OSIKICAgdmlld0JveD0iMCAwIDEyLjAxMTU5NyAxMi4wMDk4OSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnODMyIgogICBzb2RpcG9kaTpkb2NuYW1lPSJjbG9zZS1zdmdyZXBvLWNvbS5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMS4xIChjMzA4NGVmLCAyMDIxLTA5LTIyKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzODM2IiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3ODM0IgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzk5OTk5OSIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMjYuMTI1IgogICAgIGlua3NjYXBlOmN4PSI1Ljk5MDQzMDYiCiAgICAgaW5rc2NhcGU6Y3k9IjUuOTkwNDMwNiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzMTIiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iOTU1IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIyMyIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9Imc4MjgiIC8+CiAgPGcKICAgICBkYXRhLW5hbWU9IkxheWVyIDIiCiAgICAgaWQ9Imc4MzAiCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTUuOTk0MjAxNywtNS45OTU5MDg0KSI+CiAgICA8ZwogICAgICAgZGF0YS1uYW1lPSJjbG9zZSIKICAgICAgIGlkPSJnODI4Ij4KICAgICAgPHJlY3QKICAgICAgICAgd2lkdGg9IjI0IgogICAgICAgICBoZWlnaHQ9IjI0IgogICAgICAgICB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMTIsMTIpIgogICAgICAgICBvcGFjaXR5PSIwIgogICAgICAgICBpZD0icmVjdDgyNCIKICAgICAgICAgeD0iMCIKICAgICAgICAgeT0iMCIgLz4KICAgICAgPHBhdGgKICAgICAgICAgZD0ibSAxMy40MSwxMiA0LjMsLTQuMjkgQSAxLjAwNDA5MTYsMS4wMDQwOTE2IDAgMSAwIDE2LjI5LDYuMjkgTCAxMiwxMC41OSA3LjcxLDYuMjkgQSAxLjAwNDA5MTYsMS4wMDQwOTE2IDAgMCAwIDYuMjksNy43MSBsIDQuMyw0LjI5IC00LjMsNC4yOSBhIDEsMSAwIDAgMCAwLDEuNDIgMSwxIDAgMCAwIDEuNDIsMCBsIDQuMjksLTQuMyA0LjI5LDQuMyBhIDEsMSAwIDAgMCAxLjQyLDAgMSwxIDAgMCAwIDAsLTEuNDIgeiIKICAgICAgICAgaWQ9InBhdGg4MjYiIC8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K\');\
        background-size: cover;\
        background-position: center;\
        opacity: 0.25;\
        width: 10px;\
        height: 10px;\
        margin-left: 4px;\
        display: inline-block !important;\
      }\
    \
      .rh-dot {\
        width: 10px;\
        height: 10px;\
        background-color: #FF5500;\
        border: 2px solid white;\
        float: right;\
        box-sizing: content-box;\
        border-radius: 10px;\
          -webkit-border-radius: 10px;\
          -moz-border-radius: 10px;\
        display: block !important;\
      }\
    \
      .rh-icon {\
        width: 25px;\
        height: 25px;\
        position: absolute;\
        margin: 12px;\
        background-image: url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgdmVyc2lvbj0iMS4xIgogICB4PSIwcHgiCiAgIHk9IjBweCIKICAgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIKICAgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpZD0ic3ZnODM2IgogICBzb2RpcG9kaTpkb2NuYW1lPSJjaGF0LXF1aXouc3ZnIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjEuMSAoYzMwODRlZiwgMjAyMS0wOS0yMikiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnMKICAgaWQ9ImRlZnM4NDAiIC8+PHNvZGlwb2RpOm5hbWVkdmlldwogICBpZD0ibmFtZWR2aWV3ODM4IgogICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgIGJvcmRlcmNvbG9yPSIjOTk5OTk5IgogICBib3JkZXJvcGFjaXR5PSIxIgogICBpbmtzY2FwZTpwYWdlc2hhZG93PSIwIgogICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCIKICAgc2hvd2dyaWQ9ImZhbHNlIgogICBpbmtzY2FwZTp6b29tPSIwLjIxMzI5MTg4IgogICBpbmtzY2FwZTpjeD0iMTk5MC4yMzA0IgogICBpbmtzY2FwZTpjeT0iNDMzLjY3ODAxIgogICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE3OTEiCiAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijk2OSIKICAgaW5rc2NhcGU6d2luZG93LXg9IjAiCiAgIGlua3NjYXBlOndpbmRvdy15PSIyMyIKICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0iZzgzNCIgLz4KPGcKICAgaWQ9Imc4MzQiCiAgIGlua3NjYXBlOmhpZ2hsaWdodC1jb2xvcj0iNDI5NDk2NzI5NSI+PHBhdGgKICAgICBkPSJNIDQxNi42LDY2MCBDIDYzNy40LDY2MCA4MDguNiw1MzMuOSA4MDYsMzQ2LjcgODA2LDE4MSA2MzAuOCw0OC43IDQwOS45LDQ4LjcgMTg5LjEsNDguNyAxMCwxODEgMTAsMzQ2LjcgYyAwLDEwMy4yIDUwLjYsMjEzLjIgMTU2LjMsMjY3LjIgMCwwLjcgLTAuMiwxLjEgLTAuMiwxLjggMCw0NC44IC0zNy4zLDEwNi40IC01Mi4xLDEzMS43IGggMC4xIGMgLTEuMiwyLjcgLTEuOSw1LjcgLTEuOSw4LjkgMCwxMi41IDEwLjEsMjIuNyAyMi43LDIyLjcgMS45LDAgNC44LC0wLjQgNS45LC0wLjQgMC4zLDAgMC40LDAgMC40LDAuMSA3OC4xLC0xMi44IDE5My40LC0xMDAuNyAyMTAuNSwtMTIxLjUgMTcuNSwyLjYgMjkuNCwzLjEgNDQuMSwzLjEgNi4zLC0wLjEgMTMsLTAuMyAyMC44LC0wLjMgeiBtIC05MCwtNjUuOCAtMzkuMiwzMi42IGMgLTkuMSwxMC40IC00OC42LDQzLjQgLTgyLjYsNjQuOCAyMC43LC01OSAxOS43LC03Ny43IDE5LjcsLTc3LjcgbCAyLjksLTM3LjQgLTMzLjMsLTE3IEMgMTA5LjMsNTE2IDcxLjIsNDI1LjggNzEuMiwzNDYuNyBjIDAsLTEzMS42IDE1MiwtMjM2LjkgMzM4LjcsLTIzNi45IDE4Ni43LDAgMzM0LjksMTA1LjIgMzM0LjksMjM2LjkgLTAuNSwxNDYgLTEzOS41LDI1My4xIC0zMjYuMiwyNTMuMSAwLDAgLTI4LjUsMS4xIC01Ny44LC0zLjIgeiBNIDk5MCw1OTQgYyAwLC04MyAtMzIuNCwtMTQ2LjIgLTExMy4zLC0xOTMuNyAtMiwyMiAtOC42LDUwLjcgLTE1LjEsNjYuNiAtMTIyLjgsMjk5LjYgLTUwMCwyNTUuNSAtNTAyLjIsMjU3LjUgNjAuOCw3NC4yIDE2MC4yLDEyMS4xIDI4NC45LDEyMS4xIDYuOCwwIDEyLjUsMC4xIDE3LjksMC4xIDEyLjcsMCAyMi45LC0wLjMgMzguMiwtMi41IDE0LjgsMTggOTcuOCw5NyAxNjUuMywxMDguMSAwLC0wLjEgMC4xLC0wLjEgMC4zLC0wLjEgMC45LDAgMy41LDAuMyA1LjIsMC4zIDEwLjksMCAxOS42LC04LjggMTkuNiwtMTkuNiAwLC0yLjcgLTAuNywtNS40IC0xLjYsLTcuNyBoIDAuMSBjIC0xMi43LC0yMS45IC0zMi43LC04NS45IC0zMi43LC0xMjQuNiAwLC0wLjYgLTAuMiwtMSAtMC4yLC0xLjUgQyA5NDcuNyw3NTEuMiA5OTAsNjgzLjEgOTkwLDU5NCBaIgogICAgIGlkPSJwYXRoODI0IgogICAgIHN0eWxlPSJmaWxsOiNmZmZmZmYiIC8+PHBhdGgKICAgICBkPSJtIDE4MS4zLDM2MS4xIGMgMCwxNy4yIDcuMSwzNC4zIDE5LjMsNDYuNSAxMi4yLDEyLjIgMjkuMywxOS4zIDQ2LjUsMTkuMyAxNy4yLDAgMzQuMywtNy4xIDQ2LjUsLTE5LjMgMTIuMiwtMTIuMiAxOS4zLC0yOS4zIDE5LjMsLTQ2LjUgMCwtMTcuMiAtNy4xLC0zNC4zIC0xOS4zLC00Ni41IC0xMi4yLC0xMi4yIC0yOS4zLC0xOS4zIC00Ni41LC0xOS4zIC0xNy4yLDAgLTM0LjMsNy4xIC00Ni41LDE5LjMgLTEyLjIsMTIuMSAtMTkuMywyOS4yIC0xOS4zLDQ2LjUgeiIKICAgICBpZD0icGF0aDgyNiIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmIiAvPjxwYXRoCiAgICAgZD0ibSA1MzMuOSwzNjEuMSBjIDAsMTcuMiA3LjEsMzQuMyAxOS4zLDQ2LjUgMTIuMiwxMi4yIDI5LjMsMTkuMyA0Ni41LDE5LjMgMTcuMiwwIDM0LjMsLTcuMSA0Ni41LC0xOS4zIDEyLjIsLTEyLjIgMTkuMywtMjkuMyAxOS4zLC00Ni41IDAsLTE3LjIgLTcuMSwtMzQuMyAtMTkuMywtNDYuNSAtMTIuMiwtMTIuMiAtMjkuMywtMTkuMyAtNDYuNSwtMTkuMyAtMTcuMiwwIC0zNC4zLDcuMSAtNDYuNSwxOS4zIC0xMi4yLDEyLjEgLTE5LjMsMjkuMiAtMTkuMyw0Ni41IHoiCiAgICAgaWQ9InBhdGg4MjgiCiAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiIgLz48cGF0aAogICAgIGQ9Im0gMzU4LjEsMzYxLjEgYyAwLDE3LjIgNy4xLDM0LjMgMTkuMyw0Ni41IDEyLjIsMTIuMiAyOS4zLDE5LjMgNDYuNSwxOS4zIDE3LjIsMCAzNC4zLC03LjEgNDYuNSwtMTkuMyAxMi4yLC0xMi4yIDE5LjMsLTI5LjMgMTkuMywtNDYuNSAwLC0xNy4yIC03LjEsLTM0LjMgLTE5LjMsLTQ2LjUgLTEyLjIsLTEyLjIgLTI5LjMsLTE5LjMgLTQ2LjUsLTE5LjMgLTE3LjIsMCAtMzQuMyw3LjEgLTQ2LjUsMTkuMyAtMTIuMywxMi4xIC0xOS4zLDI5LjIgLTE5LjMsNDYuNSB6IgogICAgIGlkPSJwYXRoODMwIgogICAgIHN0eWxlPSJmaWxsOiNmZmZmZmYiIC8+PHBhdGgKICAgICBkPSJtIDE3Ny4xLDM2MS4xIGMgMCwxNy4yIDcuMSwzNC4zIDE5LjMsNDYuNSAxMi4yLDEyLjIgMjkuMywxOS4zIDQ2LjUsMTkuMyAxNy4yLDAgMzQuMywtNy4xIDQ2LjUsLTE5LjMgMTIuMiwtMTIuMiAxOS4zLC0yOS4zIDE5LjMsLTQ2LjUgMCwtMTcuMiAtNy4xLC0zNC4zIC0xOS4zLC00Ni41IC0xMi4yLC0xMi4yIC0yOS4zLC0xOS4zIC00Ni41LC0xOS4zIC0xNy4yLDAgLTM0LjMsNy4xIC00Ni41LDE5LjMgLTEyLjIsMTIuMSAtMTkuMywyOS4yIC0xOS4zLDQ2LjUgeiIKICAgICBpZD0icGF0aDgzMiIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmIiAvPjwvZz4KPC9zdmc+Cg==\');\
          background-size: cover;\
          background-position: center;\
          display: inline-block !important;\
        }';

    var styleSheet = document.createElement("style")
    styleSheet.innerText = styles.replace(/[\r\n]+/gm, "");
    document.head.appendChild(styleSheet)
  };  

  window.rhCloseGreeting = function rhCloseGreeting() {
    console_log('rhCloseGreeting');
    if ( document.getElementById('rh-greeting') ) {
      document.getElementById('rh-greeting').outerHTML = '';
    }
  };

  window.rhCloseNotification = function rhCloseNotification() {
    console_log('rhCloseNotification');
    if ( document.getElementById('rh-dot') ) {
      document.getElementById('rh-dot').outerHTML = '';
    }
  };

  window.rhClickChat = function rhClickChat(quizId,popupWidth,popupHeight) {
    console_log('rhClickChat');
    console_log(quizId);
    window.rhCloseGreeting();
    window.rhCloseNotification();
    window.openQuizPopup(quizId,popupWidth,popupHeight);
  };

  const addChatButton = function addChatButton(quizId, color, dot, greeting, popupWidth, popupHeight) {
    const html = document.createElement("div");
    const chatDiv = document.createElement("div");
    const iconDiv = document.createElement("div");

    chatDiv.classList.add("rh-chat");
    chatDiv.style.backgroundColor = color;
    chatDiv.addEventListener("click", function() {
      window.rhClickChat(quizId, popupWidth, popupHeight);
    });

    iconDiv.classList.add("rh-icon");
    chatDiv.appendChild(iconDiv);

    if (dot) {
      const dotDiv = document.createElement("div");
      dotDiv.classList.add("rh-dot");
      dotDiv.setAttribute("id", "rh-dot");
      chatDiv.appendChild(dotDiv);
    }

    html.appendChild(chatDiv);

    if (greeting) {
      const greetingDiv = document.createElement("div");
      const closeSpan = document.createElement("span");

      greetingDiv.classList.add("rh-greeting");
      greetingDiv.setAttribute("id", "rh-greeting");
      greetingDiv.textContent = greeting;

      closeSpan.classList.add("rh-close");
      closeSpan.addEventListener("click", window.rhCloseGreeting);
      greetingDiv.appendChild(closeSpan);

      html.appendChild(greetingDiv);
    }

    document.body.appendChild(html);
  };

  const RenderChatEmbed = function RenderChatEmbed() {
    const rhchat = document.getElementById('rh-chat');
    if (rhchat !== null) {
      console_log('--------------------------------');
      console_log('RenderChatEmbed');

      // basic chat settings
      var quizId = rhchat.getAttribute('data-quiz-id');
      quizId = foolProofUrl(quizId);
      const color = rhchat.getAttribute('data-chat-color');
      const dot = rhchat.getAttribute('data-chat-dot') && rhchat.getAttribute('data-chat-dot').toLocaleLowerCase() === 'true';
      const hide = rhchat.getAttribute('data-chat-hide') && rhchat.getAttribute('data-chat-hide').toLocaleLowerCase() === 'true';
      const popupWidth = rhchat.getAttribute('data-popup-width');
      const popupHeight = rhchat.getAttribute('data-popup-height');

      // greeting message
      let greeting = false;
      if (rhchat.getAttribute('data-chat-greeting')) {
        greeting = rhchat.getAttribute('data-chat-greeting');
      }

      // check if the quiz has already been completed
      const c = prqGetCookie('prq-responseId-' + quizId);
      console_log(c);

      // inject HTML and CSS
      if (!hide || !c) {
        addChatStyles();
        addChatButton(quizId, color, dot, greeting, popupWidth, popupHeight);
      }
    }
  };

  const GetAutomaticPopupData = function GetAutomaticPopupData() {

    console_log('embed.js - GetAutomaticPopupData');

    var t = prqGetCookie('data-timeout');
    var n = Date.now();
    var timeTimeout = false;
    var quizId = false;

    if (t) {
      console_log('data-timeout cookie set:');
      quizId = t.split('||')[0];
      timeTimeout = parseInt(t.split('||')[1]);
    }

    if (document.getElementById('auto-popup') !== null) {
      var rhpopup = document.getElementById('auto-popup');
      var timeout = parseFloat(rhpopup.getAttribute('data-timeout'));
      var exitIntent = rhpopup.getAttribute('data-exit-intent') && rhpopup.getAttribute('data-exit-intent').toLocaleLowerCase() === 'true';
      var aggressive = rhpopup.getAttribute('data-aggressive') && rhpopup.getAttribute('data-aggressive').toLocaleLowerCase() === 'true';
      window.popupWidth = rhpopup.getAttribute('data-popup-width')
      window.popupHeight = rhpopup.getAttribute('data-popup-height')
      quizId = rhpopup.getAttribute('data-quiz-id');
      quizId = foolProofUrl(quizId);

      // check if the quiz has already been displayed
      var c = prqGetCookie('auto-popup-' + quizId);

      // if it's aggressive, display the quiz unless the customer has already completed it
      if ( aggressive ) {
        c = prqGetCookie('prq-responseId-' + quizId);
      }

      if (timeout && timeout <= 0) {
        timeout = 0.5;
      }

      timeTimeout = (timeout * 1000) + n;
    }

    // set data-timeout cookie if not set
    if (!t) {
      prqSetCookie('data-timeout', quizId + '||' +  timeTimeout, 7);
    }    

    // exit intent popup
    if (quizId && exitIntent && !c) {
      document.addEventListener('mouseout', e => {
        if (!e.toElement && !e.relatedTarget && !c && !window.popupAlreadyShown) {
          window.popupAlreadyShown = quizId;
          showQuiz(quizId, false, 'true', window.popupWidth, window.popupHeight);
        }
      });
    }

    console_log('timeTimeout:');
    console_log((timeTimeout - n)/1000);
    console_log(quizId);

    if (quizId && !c && (timeTimeout - n) > 0) {
      console_log('setInterval TIMEOUT');

      var timeoutInterval = setInterval(function() {
        n = Date.now();
        if((timeTimeout - n) < 0 && !window.popupAlreadyShown){
          console_log('Show Quiz after timeout: ' + quizId);
          window.popupAlreadyShown = quizId;
          showQuiz(quizId, false, 'true', window.popupWidth, window.popupHeight);
          clearInterval(timeoutInterval);
        }
      }, 1000);
    }
  };

  const showQuiz = function showQuiz(quizId, resultsId, isPopup, popupWidth, popupHeight) {
    if (isPopup && window.prqPopup) {
      console_log('window.isPopup: ' + isPopup);
      return;
    }

    if (isPopup) {
      // COOKIE only one popup per session
      window.prqPopup = quizId;
      document.querySelector('body').style.overflow = 'hidden';
      prqSetCookie('auto-popup-' + quizId, 'true', 7);
    }

    var quizUrl = getDomain();

    var modal = document.createElement('div');
    modal.className = 'rh-modal';
    // this z-index is not higher so the Rebuy cart still stays above
    modal.style.cssText = "display: block; position: fixed; z-index: 9998 !important; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(254,254,254,0.6);";
    var close = document.createElement('span');
    close.innerHTML = '&times;';
    close.ariaLabel = 'Close';
    close.style.cssText = "position: fixed; color: #888888; z-index: 9999 !important; font-size: 36px; line-height: 36px; text-align: center; font-weight: normal; right: 20px; top: 20px; cursor: pointer; width: 38px; height: 38px; border-radius: 5px; -webkit-border-radius: 5px; -moz-border-radius: 5px; background-color: rgba(255,255,255,0.5)";

    close.onclick = function (event) {
      console_log('click X close quiz');
      // Stop video when closing popup
      let iFrameSelector = "[id='" + window.prqPopup + "'] iframe";
      let iFrame = document.querySelector(iFrameSelector);
      if (iFrame) {
          iFrameEvent({ action: 'close_quiz' });
      } else {
          console.error("iFrame not found for ID: " + window.prqPopup);
      }

      document.querySelector('body').style.overflow = null;
      window.prqPopup = false;
      modal.style.display = 'none';
      if (window.location.hash.indexOf('#quiz-') !== -1) {
        history.pushState('', document.title, window.location.pathname + window.location.search);
      }
    };

    var url = quizUrl + '/public/quiz/' + quizId
    var iframeUrl = generateIframeUrl(url, isPopup, false, popupWidth, popupHeight);

    if (resultsId !== undefined && resultsId !== false) {
      var checkInline = true;
      iframeUrl = quizUrl + '/public/quiz/' + quizId + '/results/' + resultsId;
    }

    iframeUrl = shopifyCurrency(iframeUrl);
    console_log('showQuiz - shopifyCurrency');
    console_log(iframeUrl);

    var inlines = document.querySelectorAll('.rh-inline');
    var inlineExists = false;
    if (checkInline && inlines.length > 0) {

      // RENDER RESULTS IN IFRAME
      window.quizId = quizId;
      inlines.forEach(function(element) {

        var url = element.dataset.url;
        var inlineQuizId = url.split('/').pop();

        if (inlineQuizId === window.quizId) {
          inlineExists = true;
          document.querySelector('body').style.overflow = null;
          element.querySelectorAll('iframe').forEach(function (el) {
            el.remove();
          });

          var quizId = makeid();
          var iframe = document.createElement('iframe');
          iframe.name = 'Product Recommendation Quiz';
          iframe.title = 'Product Recommendation Quiz';
          iframe.ariaLabel = 'Product Recommendation Quiz';
          iframe.src = iframeUrl;
          iframe.id = quizId;
          iframe.style.cssText = 'transform-style: preserve-3d; padding: 0; border: none; margin: 0 auto; height: 100%; flex-grow: 1; background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjBweCIgIGhlaWdodD0iNjBweCIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0ibGRzLXJvbGxpbmciIHN0eWxlPSJiYWNrZ3JvdW5kOiBub25lOyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgZmlsbD0ibm9uZSIgbmctYXR0ci1zdHJva2U9Int7Y29uZmlnLmNvbG9yfX0iIG5nLWF0dHItc3Ryb2tlLXdpZHRoPSJ7e2NvbmZpZy53aWR0aH19IiBuZy1hdHRyLXI9Int7Y29uZmlnLnJhZGl1c319IiBuZy1hdHRyLXN0cm9rZS1kYXNoYXJyYXk9Int7Y29uZmlnLmRhc2hhcnJheX19IiBzdHJva2U9IiNkZGRkZGQiIHN0cm9rZS13aWR0aD0iNSIgcj0iNDUiIHN0cm9rZS1kYXNoYXJyYXk9IjIxMi4wNTc1MDQxMTczMTEwNSA3Mi42ODU4MzQ3MDU3NzAzNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTEzLjk4MSA1MCA1MCkiPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ibGluZWFyIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiBrZXlUaW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+PC9jaXJjbGU+PC9zdmc+) no-repeat center;';
          iframe.setAttribute('data-hj-allow-iframe', 'true');
          element.appendChild(iframe);
          document.getElementById(quizId).onload = function () {
            document.getElementById(quizId).contentWindow.focus();
          };
        }
      });

      if ( inlineExists ) {
        return;
      }
    }

    // IF NO INLINE, RENDER POPUP
    var content = document.createElement('div');
    content.id = quizId;
    content.className = 'rh-widget';
    content.dataset.url = iframeUrl;
    content.style.cssText = "display: flex; background-color: rgba(254,254,254,0.4); margin: 0; padding: 0; height: 100%;";
    content.style['flex-grow'] = 1;

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };

    modal.appendChild(content);
    content.appendChild(close);

    document.getElementsByTagName('body')[0].appendChild(modal);
    RenderInlineEmbed();    
  };

  /**
   * Adds a DNS prefetch link to the document head.
   * @param {string} href - The URL to prefetch.
   */
  const dnsPrefetch = (href) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = href;
    document.head.appendChild(link);
  };

  /**
   * Reload quiz when change hash to allow forwarding to other quizzes
   * @param    {void}           // Does not require any arguments
   * @return   {void}          // Returns nothing
   */
  const checkHash = function checkHash() {
    
    const hash = window.location.hash;

    // This code is not relevant
    // if (window.location.origin === window.top.location.origin) {
    //   hash = window.top.location.hash;
    // }

    console_log('checkHash');
    console_log('hash');

    // render quiz
    if (hash.match(/\#quiz\-/)) {
      const quizId = hash.split('#quiz-')[1];
      const quizSpan = document.querySelector('.rh-widget span');

      const showQuizPopup = () => showQuiz(quizId, false, 'true');

      if (quizSpan) {
        quizSpan.click();
        setTimeout(showQuizPopup, 200);
      } else {
        showQuizPopup();
      }
    }

    // render results page
    if (hash.match(/\#results\-/)) {
      const quizIdResult = hash.split('#results-')[1].split('-');
      console_log('#results');
      console_log(quizIdResult);

      showQuiz(quizIdResult[0], quizIdResult[1], false);

      // scroll to top of rendered results page in the inline iFrame
      const inlineQuizzes = document.querySelectorAll('.rh-inline');
      inlineQuizzes.forEach(inlineQuiz => {
        const qid = inlineQuiz.dataset.url.split('/').pop();
        if (quizIdResult[0] === qid) {
          document.querySelector('body').style.overflow = null;
          inlineQuiz.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          // scrollToTop(inlineQuiz);
        }
      });
    }
  };

  /**
   * Closes the quiz with the given quizId.
   * @param {string} quizId - The ID of the quiz to close.
   * @note If quizId starts with a number we have a 'not a valid selector' an error on the querySelector
   * CSS.escape is not used due to lack of IE support.
   */
  const closeQuiz = (quizId) => {
    const q = `[id='${quizId}'] span`;
    document.querySelector(q).click();
  };

  /**
   * Scroll to top of quiz or page, only if quiz top is below screen top
   * @param    {Object} iFrameContainer  // DOM object, iFrame Container
   * @return   {void}                    // Returns nothing
   */
  const scrollToTop = (iFrameContainer) => {
    if (!iFrameContainer || !iFrameContainer.dataset || iFrameContainer.dataset.autoscroll === 'false') {
      return false;
    }

    const rect = iFrameContainer.getBoundingClientRect();
    const topPos = rect.y + window.pageYOffset;

    if (rect && rect.y < 0) {
      console_log(`scroll_to: ${topPos}`);
      window.scrollTo({
        top: topPos,
        left: 0,
        behavior: 'smooth'
      });
    }
  };  

  /**
   * Remember the inline heights the quiz was rendered with, before any resize
   * overwrites them. The results page always expands the iFrame (even when
   * data-fixed-height is set), so this is the only record left of the height
   * the merchant configured once that has happened.
   * @param    {Object} iFrameContainer  // DOM object, iFrame Container
   * @param    {Object} iFrame           // DOM object, iFrame
   * @return   {void}                    // Returns nothing
   */
  const storeInitialHeights = (iFrameContainer, iFrame) => {
    if (typeof iFrameContainer.dataset.rhInitialHeight !== 'undefined') {
      return;
    }

    iFrameContainer.dataset.rhInitialHeight = iFrameContainer.style.height || '600px';
    iFrameContainer.dataset.rhInitialIframeHeight = iFrame.style.height || '100%';
  };

  /**
   * Listen for changes in the URL hash and trigger checkHash function
   * @param    {void}           // Does not require any arguments
   * @return   {void}           // Returns nothing
   */
  const detectHashChange = () => {
    window.addEventListener('hashchange', () => {
      console_log('embed.js - detectHashChange');
      checkHash();
    }); 
  };

  /**
   * FIX error in Safari browsers, force reload of iframes when navigating back
   * @param    {void}           // Does not require any arguments
   * @return   {void}           // Returns nothing
   */
  const fixSafari = () => {
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if(isSafari){
      window.addEventListener('pageshow', function(){
        document.querySelectorAll('.rh-widget iframe').forEach(function (el) {
          console_log('embed.js - is Safari, reload iframe');
          el.src = el.src;
        });
      });
    }
  };

  /**
   * Adds a CSS style to the document head.
   * @param {string} styleString - The CSS style to add.
   */
  const addStyle = (styleString) => {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
  };

  /**
   * Public Method - opens the quiz
   * @param    {String} quizId  // Quiz ID
   * @return   {false}          // Does not return anything
   */
  window.openQuizPopup = function(quizId,popupWidth,popupHeight) {
    showQuiz(quizId, false, 'true', popupWidth, popupHeight);
  };

  const commonStyle = `
  .rh-inline, .rh-inline iframe{-webkit-transition: height 0.5s; -moz-transition: height 0.5s; -ms-transition: height 0.5s; -o-transition: height 0.5s; transition: height 0.5s;}
  .mtop-20 { margin-top: 20px; }
  .mbot-20 { margin-bottom: 20px; }
  .rh-quiz-list { display: none; }
  .rh-info-box {
      background-color: #D8F0FE;
      color: #2c81b2;
      border: 1px dotted #2c81b2;
      padding: 15px;
      border-radius: 8px;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
  }
  .rh-inline { width: 100%; display: flex; }
  .rh-inline iframe { width: 100%; }
  .rh-fullwidth { width: 100vw; max-width: 100vw; margin-left: calc(50% - 50vw); }
`;

function commonSetup() {
  console_log('embed.js # prqApp # 2024-01-24 # v001');
  console_log(`rhScheduledMaintenance: ${window.rhScheduledMaintenance}`);
  addStyle(commonStyle);
  [RH_API_ORIGIN, RH_SPACE_ORIGIN].forEach(dnsPrefetch);
}

function prqApp() {
  setTimeout(function() {
    commonSetup();
    GetAutomaticPopupData();
    RenderInlineEmbed();
    RenderPopupEmbed();
    RenderChatEmbed();
    fixSafari();
    checkHash();
    detectHashChange(); 
    showQuizListShopifyEditor();
    addWindowEventListenerMessage();
  }, 50);
}

function prqAppMaintenance() {
  setTimeout(function() {
    commonSetup();
    RenderInlineMaintenance();
    fixSafari();
    // Add any additional maintenance-specific functions here if needed
  }, 50);
}

function initializeApp() {
  if (window.prqAppLoaded === undefined) {
    window.rhScheduledMaintenance ? prqAppMaintenance() : prqApp();
    window.prqAppLoaded = true;
    if (typeof prqAppLoadedCallback === 'function') {
      prqAppLoadedCallback();
    }
  }
}

initializeApp();

} catch (error) {
  console.error(error);
  sendErrorToAhoy(error)
}

})();
