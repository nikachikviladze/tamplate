require([], function() {try {;
                     // jQuery Mask Plugin v1.13.4
                     // github.com/igorescobar/jQuery-Mask-Plugin
                     !function(b){var y=function(a,c,d){a=b(a);var g=this,k=a.val(),l;c="function"===typeof c?c(a.val(),void 0,a,d):c;var e={invalid:[],getCaret:function(){try{var q,b=0,e=a.get(0),f=document.selection,c=e.selectionStart;if(f&&-1===navigator.appVersion.indexOf("MSIE 10"))q=f.createRange(),q.moveStart("character",a.is("input")?-a.val().length:-a.text().length),
                     b=q.text.length;else if(c||"0"===c)b=c;return b}catch(d){}},setCaret:function(q){try{if(a.is(":focus")){var b,c=a.get(0);c.setSelectionRange?c.setSelectionRange(q,q):c.createTextRange&&(b=c.createTextRange(),b.collapse(!0),b.moveEnd("character",q),b.moveStart("character",q),b.select())}}catch(f){}},events:function(){a.on("input.mask keyup.mask",e.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){a.keydown().keyup()},100)}).on("change.mask",function(){a.data("changed",!0)}).on("blur.mask",
                     function(){k===a.val()||a.data("changed")||a.triggerHandler("change");a.data("changed",!1)}).on("blur.mask",function(){k=a.val()}).on("focus.mask",function(a){!0===d.selectOnFocus&&b(a.target).select()}).on("focusout.mask",function(){d.clearIfNotMatch&&!l.test(e.val())&&e.val("")})},getRegexMask:function(){for(var a=[],b,e,f,d,h=0;h<c.length;h++)(b=g.translation[c.charAt(h)])?(e=b.pattern.toString().replace(/.{1}$|^.{1}/g,""),f=b.optional,(b=b.recursive)?(a.push(c.charAt(h)),d={digit:c.charAt(h),
                     pattern:e}):a.push(f||b?e+"?":e)):a.push(c.charAt(h).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");d&&(a=a.replace(new RegExp("("+d.digit+"(.*"+d.digit+")?)"),"($1)?").replace(new RegExp(d.digit,"g"),d.pattern));return new RegExp(a)},destroyEvents:function(){a.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(b){var c=a.is("input")?"val":"text";if(0<arguments.length){if(a[c]()!==b)a[c](b);c=a}else c=a[c]();return c},getMCharsBeforeCount:function(a,
                     b){for(var e=0,f=0,d=c.length;f<d&&f<a;f++)g.translation[c.charAt(f)]||(a=b?a+1:a,e++);return e},caretPos:function(a,b,d,f){return g.translation[c.charAt(Math.min(a-1,c.length-1))]?Math.min(a+d-b-f,d):e.caretPos(a+1,b,d,f)},behaviour:function(a){a=a||window.event;e.invalid=[];var c=a.keyCode||a.which;if(-1===b.inArray(c,g.byPassKeys)){var d=e.getCaret(),f=e.val().length,n=d<f,h=e.getMasked(),k=h.length,m=e.getMCharsBeforeCount(k-1)-e.getMCharsBeforeCount(f-1);e.val(h);!n||65===c&&a.ctrlKey||(8!==
                     c&&46!==c&&(d=e.caretPos(d,f,k,m)),e.setCaret(d));return e.callbacks(a)}},getMasked:function(a){var b=[],k=e.val(),f=0,n=c.length,h=0,l=k.length,m=1,p="push",u=-1,t,w;d.reverse?(p="unshift",m=-1,t=0,f=n-1,h=l-1,w=function(){return-1<f&&-1<h}):(t=n-1,w=function(){return f<n&&h<l});for(;w();){var x=c.charAt(f),v=k.charAt(h),r=g.translation[x];if(r)v.match(r.pattern)?(b[p](v),r.recursive&&(-1===u?u=f:f===t&&(f=u-m),t===u&&(f-=m)),f+=m):r.optional?(f+=m,h-=m):r.fallback?(b[p](r.fallback),f+=m,h-=m):e.invalid.push({p:h,
                     v:v,e:r.pattern}),h+=m;else{if(!a)b[p](x);v===x&&(h+=m);f+=m}}a=c.charAt(t);n!==l+1||g.translation[a]||b.push(a);return b.join("")},callbacks:function(b){var g=e.val(),l=g!==k,f=[g,b,a,d],n=function(a,b,c){"function"===typeof d[a]&&b&&d[a].apply(this,c)};n("onChange",!0===l,f);n("onKeyPress",!0===l,f);n("onComplete",g.length===c.length,f);n("onInvalid",0<e.invalid.length,[g,b,a,e.invalid,d])}};g.mask=c;g.options=d;g.remove=function(){var b=e.getCaret();e.destroyEvents();e.val(g.getCleanVal());e.setCaret(b-
                     e.getMCharsBeforeCount(b));return a};g.getCleanVal=function(){return e.getMasked(!0)};g.init=function(c){c=c||!1;d=d||{};g.byPassKeys=b.jMaskGlobals.byPassKeys;g.translation=b.jMaskGlobals.translation;g.translation=b.extend({},g.translation,d.translation);g=b.extend(!0,{},g,d);l=e.getRegexMask();!1===c?(d.placeholder&&a.attr("placeholder",d.placeholder),b("input").length&&!1==="oninput"in b("input")[0]&&"on"===a.attr("autocomplete")&&a.attr("autocomplete","off"),e.destroyEvents(),e.events(),c=e.getCaret(),
                     e.val(e.getMasked()),e.setCaret(c+e.getMCharsBeforeCount(c,!0))):(e.events(),e.val(e.getMasked()))};g.init(!a.is("input"))};b.maskWatchers={};var A=function(){var a=b(this),c={},d=a.attr("data-mask");a.attr("data-mask-reverse")&&(c.reverse=!0);a.attr("data-mask-clearifnotmatch")&&(c.clearIfNotMatch=!0);"true"===a.attr("data-mask-selectonfocus")&&(c.selectOnFocus=!0);if(z(a,d,c))return a.data("mask",new y(this,d,c))},z=function(a,c,d){d=d||{};var g=b(a).data("mask"),k=JSON.stringify;a=b(a).val()||
                     b(a).text();try{return"function"===typeof c&&(c=c(a)),"object"!==typeof g||k(g.options)!==k(d)||g.mask!==c}catch(l){}};b.fn.mask=function(a,c){c=c||{};var d=this.selector,g=b.jMaskGlobals,k=b.jMaskGlobals.watchInterval,l=function(){if(z(this,a,c))return b(this).data("mask",new y(this,a,c))};b(this).each(l);d&&""!==d&&g.watchInputs&&(clearInterval(b.maskWatchers[d]),b.maskWatchers[d]=setInterval(function(){b(document).find(d).each(l)},k));return this};b.fn.unmask=function(){clearInterval(b.maskWatchers[this.selector]);
                     delete b.maskWatchers[this.selector];return this.each(function(){var a=b(this).data("mask");a&&a.remove().removeData("mask")})};b.fn.cleanVal=function(){return this.data("mask").getCleanVal()};b.applyDataMask=function(a){a=a||b.jMaskGlobals.maskElements;(a instanceof b?a:b(a)).filter(b.jMaskGlobals.dataMaskAttr).each(A)};var p={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},
                     9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};b.jMaskGlobals=b.jMaskGlobals||{};p=b.jMaskGlobals=b.extend(!0,{},p,b.jMaskGlobals);p.dataMask&&b.applyDataMask();setInterval(function(){b.jMaskGlobals.watchDataMask&&b.applyDataMask()},p.watchInterval)}(jQuery);
                     ;
                       var GLOBAL = GLOBAL || {};
                       
                     GLOBAL.stopEvent = function stopEvent(event, mode) {
                       if ((arguments.length == 1 || (''+mode).toLowerCase().search(/(^|\|)propagation($|\|)/) != -1 ) && jQuery.isFunction(event.stopPropagation)) {
                         event.stopPropagation();
                       }
                       if ((arguments.length == 1 || (''+mode).toLowerCase().search(/(^|\|)default($|\|)/) != -1) && jQuery.isFunction(event.preventDefault)) {
                         event.preventDefault();
                       }
                       if ((arguments.length == 2 && (''+mode).toLowerCase().search(/(^|\|)immediate($|\|)/) != -1) && jQuery.isFunction(event.stopImmediatePropagation)) {
                         event.stopImmediatePropagation();
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
                     
                     /*--Regions--*/
                       function Regions( elem, params ){
                         this.$element = jQuery(elem);
                         this.params = params || {};
                     
                         this.classReady = this.params.classReady || 'JS-Regions-ready';
                         this.classElementOpen = this.params.classElementOpen || 'JS-Regions-open';
                         this.response = this.params.response || false;
                         this.duration = parseInt(this.params.duration) || 600;
                         this.easing = this.params.easing || 'linear';
                         this.height = parseInt(this.params.height) || 100;
                         this.toggleText = this.params.toggleText || 'Скрыть';
                     
                         this.__construct();
                       }
                     
                         Regions.prototype.__construct = function __construct() {
                           this.$window = jQuery(window);
                           this.$body = this.$element.find('.JS-Regions-Body');
                           this.$toggle = this.$element.find('.JS-Regions-Toggle');
                           this.$colls = this.$element.find('.JS-Regions-Coll');
                           this.$blocks = this.$element.find('.JS-Regions-Block');
                     
                           this._data = {};
                           this._currentGrid = 0; 
                     
                           this._init();
                         };
                     
                         Regions.prototype._init = function _init() {
                           var _this = this;
                     
                           this._prepareData();
                     
                           this.$toggle.on('click' + '.JS-Regions', function(e) {
                             e.preventDefault();
                             _this._toggle.apply(_this, []);
                           });
                           
                           this.$window.on('resize' + '.JS-Regions', function(e) { _this._resize.apply(_this, []); });
                     
                           this._resize();
                     
                           this._ready();
                         };
                     
                         Regions.prototype._ready = function _ready() {
                           this.$element
                             .addClass('JS-Popup-ready')
                             .addClass(this.classReady);
                         };
                     
                         Regions.prototype._toggle = function _toggle() {
                             if (this.$element.hasClass(this.classElementOpen)) {
                                 this._collapse();
                             } else {
                                 this._collapse(true);
                             }
                         };
                     
                         Regions.prototype._collapse = function _collapse(isOpen) {
                             var _this = this,
                                 toggleText = this.$toggle.text();
                             
                             if (isOpen) {
                                 this.$element
                                     .addClass(this.classElementOpen)
                                     .addClass('JS-Regions-open');
                                 
                                 this._animate(this.$body[0].scrollHeight);
                                 
                                 setTimeout(function() {
                                     _this.$body.height('auto');
                                 }, this.duration);
                             } else {
                                 this.$element
                                     .removeClass(this.classElementOpen)
                                     .removeClass('JS-Regions-open');
                                 
                                 this._animate(this.height);
                             }
                     
                             this.$toggle.text(this.toggleText);
                             this.toggleText = toggleText;
                         };
                     
                         Regions.prototype._animate = function _animate(height) {
                             this.$body.stop().animate({
                                 height: height
                             }, this.duration, this.easing);
                         };
                     
                         Regions.prototype._prepareData = function _prepareData() {
                             var filter = '';
                             
                             for (var i = 0; i < this.$blocks.length; i++) {
                                 filter = this.$blocks.eq(i).data('filter');
                                 if (filter) {
                                     this._data[filter] = this.$blocks.eq(i).clone();
                                 }
                             }
                         };
                     
                         Regions.prototype._clearColl = function _clearColl() {
                             this.$colls
                                 .hide()
                                 .empty();
                         };
                     
                         Regions.prototype._resize = function _resize() {
                             if (!this.response) {
                                 return false;
                             }
                             
                             var wWindow = this.$window.width(),
                                 currentGrid = null,
                                 filters = [],
                                 $coll = jQuery('');
                         
                              for (var key in this.response) {
                                  if (parseInt(key) < wWindow) {
                                      currentGrid = parseInt(key);
                                  }
                              }
                     
                              if (currentGrid === this._currentGrid) {
                                  return false;
                              }
                              
                              this._clearColl();
                              this._currentGrid = currentGrid;
                     
                              for (var key in this.response[currentGrid]) {
                                  filters = this.response[currentGrid][key].split(',');
                                  $coll = this.$colls.eq(parseInt(key) - 1).show();
                                  
                                  for (var i = 0; i < filters.length; i++) {
                                      $coll.append(this._data[filters[i]]);
                                  }
                              }
                         };
                     /*--/Redions--*/
                     
                     function Popup( elem, params ){
                         this.$element = jQuery(elem);
                         this.params = params || {};
                     
                         this.onShow = this.params.onShow || null;
                         this.onHide = this.params.onHide || null;
                         this.classLock = this.params.classLock || 'JS-Popup-lock';
                         this.classReady = this.params.classReady || 'JS-Popup-ready';
                     
                         this.__construct();
                       }
                     
                       /*--Popup--*/
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
                     
                     /*--AjaxSender--*/
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
                     
                     function initRegions(context) {
                       if (typeof(Regions) === 'undefined' || !jQuery.isFunction(Regions)) {
                         return false;
                       }
                     
                       var common = {};
                     
                       jQuery('.JS-Regions', context || document).not('.JS-Regions-ready').each(function() {
                         var local = GLOBAL.parseData(jQuery(this).data('regions-params'));
                         new Regions(this, jQuery.extend({}, common, local));
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
                     
                       function initInputMask() {
                         jQuery('.JS-InputMask').each(function() {
                           var $elem = jQuery(this);
                     
                           $elem.mask($elem.data('custom-mask'));
                         });
                       }
                     
                       function initPopupLinks() {
                         jQuery('.JS-PopupLink').on('click', function(e) {
                           e.preventDefault();
                     
                           var name = jQuery(this).attr('href').substr(1);
                     
                           jQuery('[data-popup-name="' + name + '"]').trigger('jsshow');
                         });
                       }
                     
                       jQuery(function() {
                         jQuery('body').addClass('fully-adaptive s-friendly');
                         
                         initBannerWrapper();
                         initRegions();
                         initPopup();
                         initPopupLinks();
                         initAjaxSender();
                         initInputMask();
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
                                   $childActive = jQuery('<span xmlns:hha="http://hh.ru/articles" class="' + $itemActive.children('a').attr('class') + '">' + $itemActive.text() + '</span>');
                     
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