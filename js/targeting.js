require([], function() {try {;
    var GLOBAL = GLOBAL || {};
    
    GLOBAL.stopEvent = function stopEvent(event, mode) {
      if (arguments.length == 0 || !event || !jQuery) {
        return;
      } else {
        if ((arguments.length == 1 || (''+mode).toLowerCase().search(/(^|\|)propagation($|\|)/) != -1 ) && jQuery.isFunction(event.stopPropagation)) {
          event.stopPropagation();
        }
        if ((arguments.length == 1 || (''+mode).toLowerCase().search(/(^|\|)default($|\|)/) != -1) && jQuery.isFunction(event.preventDefault)) {
          event.preventDefault();
        }
        if ((arguments.length == 2 && (''+mode).toLowerCase().search(/(^|\|)immediate($|\|)/) != -1) && jQuery.isFunction(event.stopImmediatePropagation)) {
          event.stopImmediatePropagation();
        }
      }
    };
  
    GLOBAL.parseData = function parseData(data) {
      try {
        data = JSON.parse(data.replace(/'/gim, '"'));
      }catch(e) {
        data = {};
      }
      return data;
    };
  
  /*----*/
    function Popup( elem, params ){
      this.$element = jQuery(elem);
      this.params = params || {};
  
      this.onShow = this.params.onShow || null;
      this.onHide = this.params.onHide || null;
      this.classLock = this.params.classLock || 'JS-Popup-lock';
      this.classReady = this.params.classReady || 'JS-Popup-ready';
  
      this.__construct();
    }
  
      Popup.prototype.__construct = function __construct() {
        this.$window = jQuery(window);
        this.$body = jQuery('body');
        this.$overlay = jQuery('.JS-Popup-Overlay');
        this.$close = this.$element.find('.JS-Popup-Close');
        this.$content = this.$element.find('.JS-Popup-Content');
        this.$inner = this.$element.find('.JS-Popup-Inner');
  
        this._init();
      };
  
      Popup.prototype._init = function _init() {
        var _this = this;
  
        this.$close.add(this.$overlay).on('click.JS-Popup', function(e) {
          e.preventDefault();
          _this.hide.apply(_this, [true]);
        });
  
        this.$element.on('click.JS-Popup', function(e) {
          if (_this.$element.is(e.target)) {
            _this.hide.apply(_this, [true]);
          }
        });
  
        this.$element
       .on('jsshow.JS-Popup', function(e, data) {
          _this.show.apply(_this, [data]);
        })
        .on('jshide.JS-Popup', function() {
          _this.hide.apply(_this, []);
        });
  
        this._ready();
      };
  
      Popup.prototype._ready = function _ready() {
        this.$element
          .addClass('JS-Popup-ready')
          .addClass(this.classReady);
      };
  
      Popup.prototype.show = function show(content) {
        this.$body
          .addClass('JS-Popup-lock')
          .addClass(this.classLock);
  
        this.$window.trigger('resize');
  
        this.$overlay.show();
  
        if (content) {
          this.$content.html(content);
        }
  
        this.$element
         .show()
         .addClass('JS-Popup-active');
  
        var top = (this.$element.innerHeight() - this.$inner.innerHeight())/2,
            left = (this.$element.innerWidth() - this.$inner.innerWidth())/2;
  
        this.$inner
          .css({
            'top': top < 0 ? 0 : top,
            'left': left < 0 ? 0 : left
          });
  
        if (jQuery.isFunction(this.onShow)) {
          this.onShow.apply(this.$element, []);
        }
      };
  
      Popup.prototype.hide = function hide(isByUser) {
        if (!this.$element.hasClass('JS-Popup-active')) {
          return;
        }
  
        this.$element
          .hide()
          .removeClass('JS-Popup-active')
          .trigger('jspopuphide');
  
        this.$overlay.hide();
  
        this.$body
          .removeClass('JS-Popup-lock')
          .removeClass(this.classLock);
  
        this.$window.trigger('resize');
  
        if (isByUser) {
          this.$element.trigger('jspopupuserhide');
        }
  
        if (jQuery.isFunction(this.onHide)) {
          this.onHide.apply(this.$element, []);
        }
      };
    /*--/Popup--*/
  
  function AjaxSender( elem, params ){
    this.$element = jQuery(elem);
    this.params = params || {};
  
    this.emailReg = this.params.emailReg || /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
    this.url = this.params.url || '';
    this.successMessage = this.params.successMessage || '';
    this.errorMessage = this.params.errorMessage || {
      name: {
        empty: 'Укажите ваше имя'
      },
      company: {
        empty: 'Укажите название компании'
      },
      phone: {
        empty: 'Укажите номер телефона',
        format: {
          message: 'Некорректный номер телефона',
          rule: function(value) {
            return value.length == 17
          }
        }
      },
      common: 'Произошла ошибка'
    };
    this.eventClear = this.params.eventClear || '';
    this.isTrackFilling= this.params.isTrackFilling || false;
    this.cssActiveSuccess = this.params.cssActiveSuccess || 'JS-AjaxSender-Success-active';
    this.cssErrorInput = this.params.cssErrorInput || 'JS-AjaxSender-Input-error';
    this.cssActiveCommonError = this.params.cssActiveCommonError || 'JS-AjaxSender-CommonError-active';
    this.classReady = this.params.classReady || 'JS-AjaxSender-ready';
  
    this.__construct();
  }
  
    AjaxSender.prototype.__construct = function __construct() {
      this.$form = this.$element.find('.JS-AjaxSender-Form');
      this.$fields = this.$form.find('.JS-AjaxSender-Field');
      this.$inputs = this.$form.find('.JS-AjaxSender-Input');
      this.$required = this.$inputs.filter('.JS-AjaxSender-Input-required');
      this.$errors = this.$form.find('.JS-AjaxSender-Error');
      this.$success = this.$element.find('.JS-AjaxSender-Success');
      this.$commonError = this.$element.find('.JS-AjaxSender-CommonError');
  
      this.requiredLength = this.$required.length;
  
      if (!this.$success.length) {
        this.$success = jQuery('.JS-AjaxSender-Success');
      }
  
      this._init();
    };
  
    AjaxSender.prototype._init = function _init() {
      var _this = this;
  
      this.$form.on('submit.JS-AjaxSender', function(e){
        GLOBAL.stopEvent(e);
        _this.send.apply(_this, []);
      });
  
      if (this.eventClear) {
        this.$element.on(this.eventClear + '.JS-AjaxSender', function() {
          _this._hideErrors.apply(_this, []);
          _this._clear.apply(_this, []);
        });
      }
  
      this.$inputs.on('input.JS-AjaxSender', function() {
         _this._hideErrors.apply(_this, [jQuery(this)]);
      });
  
  
      if (this.isTrackFilling) {
        this.$inputs.on('blur.JS-AjaxSender', function() {
           _this.fill.apply(_this, [jQuery(this)]);
        });
  
        this.fill();
      }
  
      this._ready();
    };
  
    AjaxSender.prototype._ready = function _ready() {
      this.$element
        .addClass('JS-AjaxSender-ready')
        .addClass(this.classReady);
    };
  
    AjaxSender.prototype.send = function send() {
      if (!this.validate()) {
        return;
      }
  
      var _this = this,
          data = this._serialize(),
          url = this.url || this.$form.prop('action');
  
      jQuery.ajax({
        type: 'post',
        url: url,
        data: data,
        success: function(response) {
          if (response && typeof response.status !== 'undefined') {
            _this._hideErrors.apply(_this, []);
  
            if (response.status === 'success') {
              _this._success.apply(_this, []);
            } else {
              _this._showErrors(response.errors);
            }
          }
        },
        error: function() {
          _this._error.apply(_this, []);
        }
      });
    };
  
    AjaxSender.prototype._serialize = function _serialize() {
      var data = {},
          $input,
          name,
          i,
          l;
  
      for (i = 0, l = this.$inputs.length; i < l; i++) {
        $input = this.$inputs.eq(i);
        name = $input.prop('name');
  
        data[name] = $input.val();
      }
  
      return data;
    };
  
    AjaxSender.prototype._success = function _success() {
      this.$success
        .addClass('JS-AjaxSender-Success-active')
        .addClass(this.cssActiveSuccess);
  
      this.$element.trigger('jshide');
    };
  
    AjaxSender.prototype._error = function _error() {
      this.$commonError
        .addClass('JS-AjaxSender-CommonError-active')
        .addClass(this.cssActiveCommonError);
    };
  
    AjaxSender.prototype._clear = function _clear() {
      this.$form.trigger('reset');
    };
  
    AjaxSender.prototype._isEmpty = function _isEmpty($input) {
      var value = $input.val();
  
      return ('' + value).search(/\S/) == -1;
    };
  
    AjaxSender.prototype._validate = function _validate($input) {
      var name = $input.prop('name'),
          error = {},
          format;
  
      if (this._isEmpty($input)) {
        error[name] = this.errorMessage[name].empty;
  
        return error;
      }
  
      if (format = this.errorMessage[name].format) {
        if (!format.rule($input.val())) {
          error[name] = format.message;
        }
      }
  
      return error;
    };
  
    AjaxSender.prototype.validate = function validate() {
      var isValid = true,
          errors = {},
          i;
  
      this._hideErrors();
  
      for (i = 0; i < this.requiredLength; i++) {
        errors = jQuery.extend({}, errors, this._validate(this.$required.eq(i)));
      }
  
      isValid = !Object.keys(errors).length;
  
      if (!isValid) {
        this._showErrors(errors);
      }
  
      return isValid;
    };
  
    AjaxSender.prototype.fill = function fill($input) {
      var $inputs = $input ? $input : this.$inputs;
  
      $inputs
        .off('input.JS-AjaxSender textInput.JS-AjaxSender')
        .on('input.JS-AjaxSender textInput.JS-AjaxSender', function() {
        jQuery(this)
          .trigger('jsajaxsenderinputfilling')
          .off('input.JS-AjaxSender textInput.JS-AjaxSender');
      });
    };
  
    AjaxSender.prototype._showErrors = function _showErrors(data) {
      if (!data) {
        return;
      }
  
      var $input,
          key;
  
      for(key in data) {
        $input = this.$inputs.filter('[name="'+ key +'"]');
  
        $error = $input
          .closest(this.$fields)
            .find(this.$errors)
              .html(data[key]);
  
        $input
          .addClass('JS-AjaxSender-Input-error')
          .addClass(this.cssErrorInput);
      }
  
      this.$inputs
        .filter('.JS-AjaxSender-Input-error')
          .eq(0)
            .focus();
    };
  
      AjaxSender.prototype._hideErrors = function _hideErrors($target) {
        if ($target && $target.length) {
          $target
            .removeClass('JS-AjaxSender-Input-error')
            .removeClass(this.cssErrorInput);
        } else {
          this.$inputs
            .removeClass('JS-AjaxSender-Input-error')
            .removeClass(this.cssErrorInput);
  
          this.$commonError
            .removeClass('JS-AjaxSender-CommonError-active')
            .removeClass(this.cssActiveCommonError);
        }
      };
  /*--/AjaxSender--*/
    
    /*--------*/
  
    !function(namespace) {
      'use strict';
  
      function Navigate(elem, params) {
        this.$element = jQuery(elem);
        this.params = params || {};
  
        this.useHash = this.params.useHash || false;
  
        this.classSwitcherActive = this.params.classSwitcherActive || 'JS-Navigate-Switcher-active';
        this.classContentInActive = this.params.classContentInActive || 'JS-Navigate-Content-inactive';
        this.classReady = this.params.classReady || 'JS-Navigate-ready';
  
        this.onNavigate = this.params.onNavigate || null;
  
        this.__construct();
      }
  
      Navigate.prototype.__construct = function __construct() {
        var name = this.$element.data('navigate-name'),
          _this = this;
  
        this.$switchers = this.$element
          .find('.JS-Navigate-Switcher')
          .filter(function() { return _this.nameFilter.apply(this, [name]); });
  
        this.$contents = this.$element
          .find('.JS-Navigate-Content')
          .filter(function() { return _this.nameFilter.apply(this, [name]); });
  
        this._init();
  
        this.$element.data('JS-Navigate', this);
      };
  
      Navigate.prototype._init = function _init() {
        var _this = this;
  
        this.$switchers
          .not('select, :radio')
          .on('click.JS-Navigate jsnavigate.JS-Navigate', function() {
            _this.navigate.apply(_this, [this]);
          })
          .end()
          .filter('select, :radio')
          .on('change.JS-Navigate jsnavigate.JS-Navigate', function() {
            _this.navigate.apply(_this, [this, true]);
          });
  
        if (this.useHash) {
          jQuery(window).on('hashchange.JS-Navigate', function() {
            _this._onHashChange.apply(_this, []);
          });
  
          this._onHashChange();
        }
  
        this.update(null, true);
  
        this._ready();
      };
  
      Navigate.prototype._ready = function _ready() {
        this.$element
          .addClass('JS-Navigate-ready')
          .addClass(this.classReady);
      };
  
      Navigate.prototype._onHashChange = function _onHashChange() {
        var hash = window.location.hash.replace('#', ''),
          $switcher = this.$switchers.filter('[data-navigate-target="' + hash + '"]');
  
        if (!$switcher.length) {
          return;
        }
  
        $switcher.trigger('jsnavigate');
      };
  
      Navigate.prototype.navigate = function navigate(elem, isSelect, isInitial) {
        var $elem = jQuery(elem),
          scope = $elem.data('navigate-scope'),
          target,
          $activeContent,
          _this = this;
  
        if (!isInitial && !isSelect && $elem.hasClass('JS-Navigate-Switcher-active')) {
          return;
        }
  
        if (isSelect) {
          if ($elem.is(':radio')) {
            target = $elem.data('navigate-target');
          } else {
            target = $elem.find('option:selected').data('navigate-target');
          }
        } else {
          target = $elem.data('navigate-target');
        }
  
        $activeContent = this.$contents
          .filter(function() { return _this.scopeFilter.apply(this, [scope]); })
          .filter('[data-navigate-source~="' + target + '"]');
  
        this.clear(scope);
  
        $elem
          .addClass('JS-Navigate-Switcher-active')
          .addClass(this.classSwitcherActive);
  
        $activeContent
          .removeClass('JS-Navigate-Content-inactive')
          .removeClass(this.classContentInActive);
  
        if (jQuery.isFunction(this.onNavigate)) {
          this.onNavigate();
        }
  
        if ($activeContent.length) {
          this.update($activeContent);
        }
      };
  
      Navigate.prototype.clear = function clear(scope) {
        var _this = this;
  
        this.$switchers
          .filter(function() { return _this.scopeFilter.apply(this, [scope]); })
          .removeClass('JS-Navigate-Switcher-active')
          .removeClass(this.classSwitcherActive);
  
        this.$contents
          .filter(function() { return _this.scopeFilter.apply(this, [scope]); })
          .addClass('JS-Navigate-Content-inactive')
          .addClass(this.classContentInActive);
      };
  
      Navigate.prototype.scopeFilter = function scopeFilter(scope) {
        if (scope) {
          return jQuery(this).is('[data-navigate-scope~="' + scope + '"]');
        }
  
        return true;
      };
  
      Navigate.prototype.nameFilter = function nameFilter(name) {
        if (name) {
          return jQuery(this).closest('[data-navigate-name~="' + name + '"]').length;
        }
  
        return !jQuery(this).closest('[data-navigate-name]').length;
      };
  
      Navigate.prototype.update = function update($context, isInitial) {
        var $switchers = ($context && $context.length) ? $context.find(this.$switchers) : this.$switchers,
          $active = $switchers.filter('select, .JS-Navigate-Switcher-active'),
          _this = this;
  
        $active.each(function() {
          var $elem = jQuery(this);
  
          _this.navigate.apply(_this, [$elem, $elem.is('select, :radio'), isInitial]);
        });
      };
  
      namespace.Navigate = Navigate;
    }(this);
  
  
  !function(namespace) {
    'use strict';
  
    function Slider(elem, params) {
      this.$element = jQuery(elem);
      this.params = params || {};
  
      this.autoplay = this.params.autoplay || false;
      this.duration = this.params.duration || 400;
      this.intervalTime = this.params.intervalTime || 2000;
      this.classItemActive = this.params.classItemActive || 'JS-Slider-active';
      this.classItemHidden = this.params.classItemHidden || 'JS-Slider-hidden';
      this.classDirectActive = this.params.classDirectActive || 'JS-Slider-active';
      this.classAnimating = this.params.classAnimating || 'JS-Slider-animating';
      this.classReady = this.params.classReady || 'JS-Slider-ready';
  
      this.__construct();
    }
  
      Slider.prototype.__construct = function __construct() {
        this.$list = this.$element.find('.JS-Slider-List');
        this.$items = this.$element.find('.JS-Slider-Item');
        this.$directs = this.$element.find('.JS-Slider-Direct');
        this.$next = this.$element.find('.JS-Slider-Next');
        this.$prev = this.$element.find('.JS-Slider-Prev');
  
        this._init();
  
        this.$element.data('JS-Slider', this);
      };
  
      Slider.prototype._init = function _init() {
        var _this = this;
  
        this.$element.trigger('jssliderinit', this);
  
        this.$directs.on('click.JS-Slider', function(e) {
          GLOBAL.stopEvent(e);
          _this._slide.apply(_this, [jQuery(this)]);
        });
  
        this.$next.on('click.JS-Slider', function(e) {
          _this.next.apply(_this, []);
        });
  
        this.$prev.on('click.JS-Slider', function(e) {
          _this.prev.apply(_this, []);
        });
  
        this._start();
  
        this._ready();
      };
  
      Slider.prototype._ready = function _ready() {
        this.$element
          .addClass('JS-Slider-ready')
          .addClass(this.classReady)
          .trigger('jssliderready', this);
      };
  
      Slider.prototype._start = function _start() {
        if (!this.autoplay) {
          return;
        }
  
        var _this = this;
  
        this.interval = setInterval(function(){
          _this._next.apply(_this, [true]);
        }, _this.intervalTime);
      };
  
      Slider.prototype._stop = function _stop() {
        clearInterval(this.interval);
      };
  
      Slider.prototype.next = function next() {
        if (this.$element.hasClass('JS-Slider-animating')) {
          return;
        }
  
        this._stop();
        this._next();
      };
  
      Slider.prototype.prev = function prev() {
        if (this.$element.hasClass('JS-Slider-animating')) {
          return;
        }
  
        this._stop();
        this._prev();
      };
  
      Slider.prototype._slide = function _slide($direct) {
        if ($direct.hasClass('JS-Slider-active') || this.$element.hasClass('JS-Slider-animating')) {
          return;
        }
  
        this._stop();
  
        var index = this.$directs.index($direct),
            $item = this.$items.eq(index),
            $active = this.$items.filter('.JS-Slider-active'),
            direction;
  
        if (index > this.$items.index($active)) {
          direction = 'right';
        } else {
          direction = 'left';
        }
  
        this._clear();
  
        $direct
          .addClass('JS-Slider-active')
          .addClass(this.classDirectActive);
  
        this._animate($item, $active, direction);
      };
  
      Slider.prototype._clear = function _clear() {
        this.$directs
          .removeClass('JS-Slider-active')
          .removeClass(this.classDirectActive);
  
        this.$items
          .removeClass('JS-Slider-active')
          .removeClass(this.classItemActive);
      };
  
      Slider.prototype._animate = function _animate($item, $active, direction, isAuto) {
        var _this = this,
            itemPos,
            activePos;
  
        if (direction == 'right') {
          itemPos = '100%';
          activePos = '-100%';
        } else {
          itemPos = '-100%';
          activePos = '100%';
        }
  
        this.$element
          .addClass('JS-Slider-animating')
          .addClass(this.classAnimating);
  
        $item
          .removeClass('JS-Slider-hidden')
          .removeClass(this.classItemHidden)
          .addClass('JS-Slider-active')
          .addClass(this.classItemActive)
          .css('left', itemPos)
          .animate({'left' : 0}, this.duration, function() {
            _this._complete.apply(_this, [$item, isAuto]);
          });
  
        $active.animate({'left' : activePos}, this.duration, function() {
          $active
            .addClass('JS-Slider-hidden')
            .addClass(_this.classItemHidden)
        });
      };
  
      Slider.prototype._next = function _next(isAuto) {
        var $direct = this.$directs.filter('.JS-Slider-active'),
            index = this.$directs.index($direct),
            nextIndex = (nextIndex = index + 1) > this.$directs.length - 1 ? 0 : nextIndex,
            $newActiveDirect = this.$directs.eq(nextIndex),
            $newActiveItem = this.$items.eq(nextIndex);
  
        this._clear();
  
        $newActiveDirect
          .addClass('JS-Slider-active')
          .addClass(this.classDirectActive);
  
        this._animate($newActiveItem, this.$items.eq(index), 'right', isAuto);
      };
  
      Slider.prototype._prev = function _prev(isAuto) {
        var $direct = this.$directs.filter('.JS-Slider-active'),
            index = this.$directs.index($direct),
            prevIndex = (prevIndex = index - 1) < 0 ? this.$directs.length - 1 : prevIndex,
            $newActiveDirect = this.$directs.eq(prevIndex),
            $newActiveItem = this.$items.eq(prevIndex);
  
        this._clear();
  
        $newActiveDirect
          .addClass('JS-Slider-active')
          .addClass(this.classDirectActive);
  
        this._animate($newActiveItem, this.$items.eq(index), 'left', isAuto);
      };
  
      Slider.prototype._complete = function _complete($item, isAuto) {
        this.$element
          .removeClass('JS-Slider-animating')
          .removeClass(this.classAnimating);
  
        if (!isAuto) {
          this._start();
        }
      };
  
    namespace.Slider = Slider;
  }(this);
  
    /*--------*/
  
  function initSlider(context){
    if (typeof(Slider) === 'undefined' || !jQuery.isFunction(Slider)) {
      return false;
    }
  
    var common = {
      duration: 300,
      autoplay: true,
      intervalTime: 10000,
      classItemActive: 'promo-page-slider-list__item_active',
      classItemHidden: 'promo-page-hidden',
      classItemAnimating: 'promo-page-slider-list__item_animating',
      classDirectActive: 'promo-page-slider-directs__item_active'
    };
  
    jQuery('.JS-Slider', context || document).not('.JS-Slider-ready').each(function() {
      var local = GLOBAL.parseData(jQuery(this).data('slider-params'));
      new Slider(this, jQuery.extend({}, common, local));
    });
  }
  
  
    function initBannerWrapper(context) {
      if (!jQuery('.JS-BannerWrapper').length) {
        return false;
      }
      
      var common = {
        minWidth: 1000
      };
      
      jQuery('.JS-BannerWrapper', context || document).not('.JS-BannerWrapper-ready').each(function() {
        var $element = jQuery(this).addClass('JS-BannerWrapper-ready'),
            $window = jQuery(window),
            params = jQuery.extend({}, common, GLOBAL.parseData($element.data('bannerwrapper')));
            
        $element.css('width', $window.width());
        if (params.center) {
          $element.css('margin-left', -$element.width() / 2);
        }
        
        $window.on('resize', function() {
          if ($window.width() > params.minWidth) {
            $element.css('width', $window.width());
            if (params.center) {
              $element.css('margin-left', -$element.width() / 2);
            }
          }
        });
      });
    }
  
    function initPopup(context) {
      if (typeof(Popup) === 'undefined' || !jQuery.isFunction(Popup)) {
        return false;
      }
  
      var common = {};
  
      jQuery('.JS-Popup', context || document).not('.JS-Popup-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('popup-params'));
        new Popup(this, jQuery.extend({}, common, local));
      });
    }
  
    function initPopupLinks() {
      jQuery('.JS-PopupLink').on('click', function(e) {
        e.preventDefault();
  
        var name = jQuery(this).attr('href').substr(1);
  
        jQuery('[data-popup-name="' + name + '"]').trigger('jsshow');
      });
    }
  
  function initAjaxSender(context) {
    if (typeof(AjaxSender) === 'undefined' || !jQuery.isFunction(AjaxSender)) {
      return false;
    }
  
    var common = {
      cssErrorInput: 'promo-page-feedback__input_error',
      cssActiveSuccess: 'promo-page-contacts__item_success',
      cssActiveCommonError: 'promo-page-feedback__common-error_active',
      eventClear: 'jspopuphide'
    };
  
    jQuery('.JS-AjaxSender', context || document).not('.JS-AjaxSender-ready').each(function() {
      var local = GLOBAL.parseData(jQuery(this).data('ajaxsender-params'));
      new AjaxSender(this, jQuery.extend({}, common, local));
    });
  }
  
  function initNavigate(context) {
      if (typeof Navigate === 'undefined' || !jQuery.isFunction(Navigate)) {
        return false;
      }
  
      var common = {
        classContentInActive: 'promo-page-hidden'
      };
  
      jQuery('.JS-Navigate', context || document).not('.JS-Navigate-ready').each(function() {
        var $elem = jQuery(this);
  
        new Navigate(this, jQuery.extend({}, common, GLOBAL.parseData($elem.data('navigate-params'))));
      });
    }
  
  function initBackSizing() {
    var $backs = jQuery('.JS-BackSizing'),
        $window = jQuery(window);
  
    function resize() {
      $backs.css('width', $window.width() + 'px');
    }
  
    $window.on('resize.JS-BackSizing', function() {
      resize();
    });
  
    resize();
  };
  
    function initInputMask() {
      jQuery('.JS-InputMask').each(function() {
        var $elem = jQuery(this);
  
        $elem.mask($elem.data('mask'));
      });
    }
  
    jQuery(function() {
      initBackSizing();
      initBannerWrapper();
      initPopup();
      initPopupLinks();
      initAjaxSender();
      initNavigate();
      initSlider();
    });
  ;
  /*----*/
    function Nav( elem, params ){
      this.$element = jQuery(elem);
      this.params = params || {};
  
      this.classReady = this.params.classReady || 'JS-Nav-ready';
      this.cssItemActive = this.params.cssItemActive || 'JS-Nav-Item-active';
      this.classElementOpen = this.params.classElementOpen || 'JS-Nav-open';
      this.easing = this.params.easing || 'linear';
      this.filterItemActive = this.params.filterItemActive || false;
      this.filterGroupActive = this.params.filterGroupActive || 'selection';
      this.duration = parseInt(this.params.duration) || 300;
      this.height = parseInt(this.params.height) || 30;
  
      this.__construct();
    }
  
      Nav.prototype.__construct = function __construct() {
        this.$window = jQuery(window);
        this.$items = this.$element.find('.JS-Nav-Item');
        this.$toggle = this.$element.find('.JS-Nav-Toggle');
        this.$body = this.$element.find('.JS-Nav-body');
  
        this._init();
      };
  
      Nav.prototype._init = function _init() {
        var _this = this;
  
        this.$toggle.on('click' + '.JS-Nav', function(e) {
          e.preventDefault();
          _this._toggle.apply(_this, []);
        });
        this.$window.on('resize' + '.JS-Nav', function(e) { _this._checkToggle.apply(_this, []); });
  
        this._setGroupActive();
        this._setItemActive();
        this._checkToggle();
  
        this._checkActiveVisible();
  
        this._ready();
      };
  
      Nav.prototype._ready = function _ready() {
        this.$element
          .addClass('JS-Nav-ready')
          .addClass(this.classReady);
      };
  
      Nav.prototype._checkActiveVisible= function _checkActiveVisible() {
        var $activeItem = this.$items.filter('.JS-Nav-Item-active');
  
        if ($activeItem.length && $activeItem.position().top != 0) {
           this._collapse(true);
        }
      };
  
     Nav.prototype._setGroupActive = function _setGroupActive () {
          if (!this.filterGroupActive) {
              return false;
          }
  
          this.$items.not('[data-group="' + this.filterGroupActive+ '"]').hide();
      };
  
      Nav.prototype._setItemActive = function _setItemActive() {
          if (!this.filterItemActive) {
              return false;
          }
  
          var $itemActive = this.$items.filter('[data-filter="' + this.filterItemActive + '"]'),
                $childActive = jQuery('<span  class="' + $itemActive.children('a').attr('class') + '">' + $itemActive.text() + '</span>');
  
          $itemActive
              .addClass(this.cssItemActive)
              .addClass('JS-Nav-Item-active')
              .empty()
              .append($childActive);
  
          //this._setFirstActive();
      };
  
      Nav.prototype._setFirstActive = function _setFirstActive() {
          var $active = this.$items.filter('.' + this.cssItemActive).clone();
          
          this.$items.filter('.' + this.cssItemActive).remove();
          this.$body.prepend($active);
      };
  
      Nav.prototype._checkToggle = function _checkToggle() {
          if (this.$body[0].offsetHeight != this.$body[0].scrollHeight || this.$body[0].scrollHeight != this.height) {
              this.$toggle.show();
          } else {
              this.$toggle.hide();
          }
      };
  
      Nav.prototype._toggle = function _toggle() {
          if (this.$element.hasClass(this.classElementOpen)) {
              this._collapse();
          } else {
              this._collapse(true);
          }
      };
  
      Nav.prototype._collapse = function _collapse(isOpen) {
          var _this = this;
          
          if (isOpen) {
              this.$element
                  .addClass(this.classElementOpen)
                  .addClass('JS-Nav-open');
              
              this._animate(this.$body[0].scrollHeight);
              
              setTimeout(function() {
                  _this.$body.height('auto');
              }, this.duration);
          } else {
              this.$element
                  .removeClass(this.classElementOpen)
                  .removeClass('JS-Nav-open');
              
              this._animate(this.height);
          }
      };
  
      Nav.prototype._animate = function _animate(height) {
          this.$body.stop().animate({
              height: height
          }, this.duration, this.easing);
      };
    /*--/Nav--*/
  ;
    function initNav(context) {
      if (typeof(Nav) === 'undefined' || !jQuery.isFunction(Nav)) {
        return false;
      }
  
      var common = {};
  
      jQuery('.JS-Nav', context || document).not('.JS-Nav-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('nav-params'));
        new Nav(this, jQuery.extend({}, common, local));
      });
    }
  
    jQuery(function() {
      initNav();
    });
  } catch (e) {console.error(e);}});