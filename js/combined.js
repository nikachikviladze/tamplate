"use strict";
var _slicedToArray = function() {
        return function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
                var n = [],
                    i = !0,
                    o = !1,
                    s = void 0;
                try {
                    for (var a, r = e[Symbol.iterator](); !(i = (a = r.next()).done) && (n.push(a.value), !t || n.length !== t); i = !0);
                } catch (e) {
                    o = !0, s = e
                } finally {
                    try {
                        !i && r.return && r.return()
                    } finally {
                        if (o) throw s
                    }
                }
                return n
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }(),
    _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n
    }
    return Array.from(e)
}
define("bloko/blocks/dropdown/dropdown.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.b('<div class="dropdown">'), i.b("\n" + n), i.b('    <div class="dropdown__content" data-attach="dropdown-content"></div>'), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/common/constants/commonCssClasses", [], function() {
    return {
        NOTRANSITION: "g-notransition",
        ANIM_FADE: "g-anim-fade",
        ANIM_FADE_IN: "g-anim-fade_in",
        HIDDEN: "g-hidden",
        SCROLL_MEASURE: "scroll-measure"
    }
}), define("bloko/common/metrics", ["bloko/common/constants/commonCssClasses"], function(e) {
    var t = function(e) {
        var t = void 0;
        return window.Node && e instanceof window.Node ? t = e : e && "function" == typeof e.get && e.get(0) && (t = e.get(0)), t
    };
    return {
        getBoundingClientRect: function(e) {
            var t = void 0;
            try {
                t = e.getBoundingClientRect()
            } catch (e) {
                t = {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                    right: 0,
                    bottom: 0
                }
            }
            return t
        },
        getMetrics: function(e) {
            var n = {},
                i = t(e),
                o = this.getBoundingClientRect(i);
            return n.width = o.width, n.height = o.height, n.left = o.left + window.pageXOffset, n.top = o.top + window.pageYOffset, n.right = n.left + n.width, n.bottom = n.top + n.height, n
        },
        getRelativeMetrics: function(e) {
            var n = t(e),
                i = {
                    top: n.offsetTop || 0,
                    left: n.offsetLeft || 0
                },
                o = this.getBoundingClientRect(n);
            return window.SVGElement && n instanceof window.SVGElement && (i = {
                left: n.getBBox().x,
                top: n.getBBox().y
            }), i.width = o.width, i.height = o.height, i.right = i.left + i.width, i.bottom = i.top + i.height, i
        },
        getDocumentMetrics: function() {
            var e = {
                width: document.body.scrollWidth,
                height: document.body.scrollHeight,
                left: 0,
                top: 0
            };
            return e.right = e.width, e.bottom = e.height, e
        },
        getViewportMetrics: function() {
            var e = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            return e.left = window.pageXOffset, e.top = window.pageYOffset, e.right = e.left + e.width, e.bottom = e.top + e.height, e
        },
        isPointInRectangle: function(e, t, n) {
            return e >= n.left && e <= n.right && t >= n.top && t <= n.bottom
        },
        isRectangleInRectangle: function(e, t) {
            return this.isPointInRectangle(e.left, e.top, t) && this.isPointInRectangle(e.right, e.bottom, t)
        },
        getScrollbarWidth: function() {
            if (document.body.innerWidth > window.innerWidth) return 0;
            var t = document.createElement("div");
            t.classList.add(e.SCROLL_MEASURE), document.body.appendChild(t);
            var n = t.offsetWidth - t.clientWidth;
            return document.body.removeChild(t), n
        }
    }
}), define("bloko/common/requestAnimationFrame", [], function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
        window.setTimeout(e, 1e3 / 60)
    }
}), define("bloko/common/requestAnimation", ["bloko/common/requestAnimationFrame"], function(e) {
    return function(t) {
        var n = !1;
        return function() {
            for (var i = arguments.length, o = Array(i), s = 0; s < i; s++) o[s] = arguments[s];
            n || e(function() {
                n = !1, t.apply(void 0, o)
            }), n = !0
        }
    }
});
var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
    }
    return e
};
define("bloko/common/dropdownModule", ["bloko/common/metrics", "bloko/common/constants/commonCssClasses", "bloko/common/requestAnimation"], function(e, t, n) {
    var i = {
            top: "top",
            bottom: "bottom",
            left: "left",
            right: "right",
            aboveTrigger: "above-trigger"
        },
        o = {
            left: "left",
            right: "right",
            center: "center"
        },
        s = "full-width",
        a = {
            top: "top",
            bottom: "bottom",
            middle: "middle"
        },
        r = {
            top: "align",
            bottom: "align",
            right: "valign",
            left: "valign"
        },
        l = {
            align: Object.keys(o).map(function(e) {
                return e
            }),
            valign: Object.keys(a).map(function(e) {
                return e
            })
        },
        c = {
            arrow: "dropdown_with-arrow",
            noPaddings: "dropdown__content_no-paddings",
            width: {
                minimal: "dropdown__content_width-minimal",
                low: "dropdown__content_width-low",
                middle: "dropdown__content_width-middle",
                maximum: "dropdown__content_width-maximum",
                orange: "dropdown__content_width-orange",
                fullWidth: "dropdown_full-width"
            },
            layer: {
                floating: "dropdown_layer-floating",
                overlay: "dropdown_layer-overlay",
                topmost: "dropdown_layer-topmost",
                "above-content": "dropdown_layer-above-content",
                "overlay-content": "dropdown_layer-overlay-content",
                "above-overlay-content": "dropdown_layer-above-overlay-content"
            },
            placement: {
                top: "dropdown_placement-top",
                right: "dropdown_placement-right",
                bottom: "dropdown_placement-bottom",
                left: "dropdown_placement-left"
            }
        },
        d = Object.keys(c.placement).map(function(e) {
            return c.placement[e]
        }),
        h = function(t, i, o) {
            var s = this;
            this.element = t, this.elementMetrics = e.getMetrics(t), this.dropdown = i, this.dropdownClassList = i.classList, this.params = o, this.visible = !1, this.startCheckingElementMetrics = n(function() {
                if (s.visible) {
                    var t = e.getMetrics(s.element);
                    s.elementMetrics.left === t.left && s.elementMetrics.top === t.top && s.elementMetrics.width === t.width && s.elementMetrics.height === t.height || s.updatePosition(), s.startCheckingElementMetrics()
                }
            })
        };
    return h.prototype = {
        calcPosition: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.params,
                n = {},
                r = e.getMetrics(this.element),
                l = e.getMetrics(this.dropdown);
            switch (t.placement) {
                case i.top:
                    n.top = r.top - l.height - 14;
                    break;
                case i.bottom:
                    n.top = r.bottom + 14;
                    break;
                case i.left:
                    n.left = r.left - l.width - 14;
                    break;
                case i.right:
                    n.left = r.right + 14;
                    break;
                case i.aboveTrigger:
                    var c = this.getContentPaddings();
                    t.align === o.right ? n.left = r.left + r.width - l.width + c.left : n.left = r.left - c.left, n.top = r.top - c.top
            }
            if (t.placement === i.top || t.placement === i.bottom) switch (t.align) {
                case o.left:
                    n.left = r.left;
                    break;
                case o.right:
                    n.left = r.right - l.width;
                    break;
                case s:
                    n.left = 0;
                    break;
                default:
                    n.left = r.left + r.width / 2 - l.width / 2
            }
            if (t.placement === i.left || t.placement === i.right) switch (t.valign) {
                case a.top:
                    n.top = r.top;
                    break;
                case a.bottom:
                    n.top = r.top + r.height - l.height;
                    break;
                default:
                    n.top = r.top + r.height / 2 - l.height / 2
            }
            return n.width = l.width, n.height = l.height, n.right = n.left + n.width, n.bottom = n.top + n.height, n
        },
        getContentPaddings: function() {
            var e = this.dropdown.querySelector('[data-attach="dropdown-content"]'),
                t = getComputedStyle(e);
            return {
                left: parseFloat(t.paddingLeft),
                top: parseFloat(t.paddingTop)
            }
        },
        getOptimalPlacementInRectangle: function(t, n) {
            var o = this,
                s = this.calcPosition(),
                a = {};
            return e.isRectangleInRectangle(s, n) ? t : [i.top, i.right, i.bottom, i.left].some(function(t) {
                var i = r[t];
                return a.placement = t, l[i].some(function(t) {
                    return a[i] = t, e.isRectangleInRectangle(o.calcPosition(a), n)
                }, null)
            }, null) ? a : null
        },
        getOptimalPlacement: function(t) {
            this.dropdownClassList.add("g-hidden");
            var n = e.getViewportMetrics(),
                o = e.getDocumentMetrics();
            this.dropdownClassList.remove("g-hidden");
            var a = this.getOptimalPlacementInRectangle(t, n) || this.getOptimalPlacementInRectangle(t, o);
            return a || (a = {
                placement: i.bottom,
                align: s
            }), _extends({}, t, a)
        },
        updatePosition: function() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.params,
                i = {
                    placement: n.placement,
                    align: n.align,
                    valign: n.valign,
                    layer: n.layer
                };
            this.dropdownClassList.remove(c.width.fullWidth);
            var o = this.getOptimalPlacement(i);
            if (i = _extends({}, i, o), o.align === s) this.dropdownClassList.add(c.width.fullWidth);
            else if (n.arrow) {
                var a;
                (a = this.dropdownClassList).remove.apply(a, d), this.dropdownClassList.add(c.placement[o.placement])
            }
            var r = this.calcPosition(i);
            this.dropdown.style.top = r.top + "px", this.dropdown.style.left = r.left + "px", this.dropdownClassList.add(t.ANIM_FADE_IN), this.elementMetrics = e.getMetrics(this.element)
        },
        checkElementMetricsChange: function(e) {
            this.visible = e, e && this.startCheckingElementMetrics()
        }
    }, {
        DropdownModule: h,
        PLACEMENTS: i,
        ALIGNS: o,
        ALIGN_FULL_WIDTH: s,
        VALIGNS: a,
        WIDTHS: {
            minimal: "minimal",
            low: "low",
            middle: "middle",
            maximum: "maximum",
            orange: "orange"
        },
        LAYERS: {
            aboveContent: "above-content",
            floating: "floating",
            overlay: "overlay",
            overlayContent: "overlay-content",
            aboveOverlayContent: "above-overlay-content",
            topmost: "topmost"
        },
        cssClasses: c
    }
}), define("bloko/common/constants/mouse", [], function() {
    return {
        BUTTON_LEFT: 0,
        BUTTON_RIGHT: 2
    }
}), define("bloko/common/transitionEventName", [], function() {
    var e = document.createElement("fakeElement"),
        t = void 0,
        n = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend"
        };
    for (var i in n)
        if (void 0 !== e.style[i]) {
            t = n[i];
            break
        }
    return window.bloko && window.bloko.isTest && (t = !1), t
}), define("bloko/common/Cookies", [], function() {
    return {
        set: function(e, t, n) {
            if (void 0 !== e) {
                var i = e + "=" + (t || "") + ";path=/";
                if (void 0 !== n) {
                    var o = new Date;
                    o.setTime(o.getTime() + 36e5 * n), i += ";expires=" + o.toGMTString()
                }
                document.cookie = i
            }
        },
        get: function(e) {
            var t = null;
            return this.getAll().reverse().some(function(n) {
                return n.name === e && (t = n.value, !0)
            }), t
        },
        getAll: function() {
            return (document.cookie ? document.cookie.split("; ") : []).map(function(e) {
                var t = e.split("="),
                    n = void 0;
                try {
                    n = decodeURIComponent(t[1])
                } catch (e) {
                    n = t[1]
                }
                return {
                    name: t[0],
                    value: n
                }
            })
        },
        remove: function(e) {
            this.set(e, "", -1)
        }
    }
}), define("bloko/common/core/Debug", ["bloko/common/Cookies"], function(e) {
    var t = "bloko_debug",
        n = {
            viewMode: 1,
            timestamp: (new Date).getTime()
        },
        i = {
            log: [],
            push: function(e, t) {
                i.log.push({
                    types: e,
                    args: t,
                    timestamp: (new Date).getTime() - n.timestamp
                })
            }
        },
        o = {},
        s = {};
    return {
        init: function() {
            var n = function(e) {
                for (var t, n = arguments.length, i = Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) i[o - 1] = arguments[o];
                (t = console)[e].apply(t, i)
            };
            void 0 === o.error && this.registerLog("error", this.viewMods.TEST, n.bind(this, "error")), void 0 === o.warn && this.registerLog("warn", this.viewMods.TEST, n.bind(this, "warn")), void 0 === o.info && this.registerLog("info", this.viewMods.DEVELOP, n.bind(this, "log")), this.setMod(parseInt(e.get(t), 10)), window.jsDebug = this
        },
        log: function(e) {
            for (var t = arguments.length, s = Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) s[a - 1] = arguments[a];
            e.split(" ").forEach(function(e) {
                var t = o[e];
                t && t.viewMode <= n.viewMode && t.handler.apply(t, s)
            }), i.push(e, s)
        },
        registerLog: function(e, t, n) {
            o[e] = {
                viewMode: t,
                handler: n
            }
        },
        registerUtility: function(e, t) {
            s[e] = t
        },
        utility: s,
        viewMods: {
            PRODUCTION: 0,
            TEST: 1,
            DEVELOP: 2
        },
        setMod: function(i) {
            var o = parseInt(i, 10);
            isNaN(o) || o < this.viewMods.PRODUCTION || o > this.viewMods.DEVELOP || (n.viewMode = o, e.set(t, o))
        },
        dump: function() {
            console.groupCollapsed("%s:%d", "Debug dump", i.log.length), i.log.forEach(function(e) {
                var t;
                (t = console).log.apply(t, ["%d ms: [%s]", e.timestamp, e.types].concat(e.args))
            }), console.groupEnd()
        }
    }
}), define("bloko/common/core/Components", ["jquery", "bloko/common/core/Debug"], function(e, t) {
    return {
        build: function(n) {
            return function(i, o, s) {
                if (!0 !== s && t.log("out error", new Error("Direct call is prohibited (use Components.make)")), !(i && "nodeName" in i)) throw new TypeError("First argument is not of type Element");
                var a = e.extend(!0, {}, n.defaults || {}, o);
                return n.create.call(null, i, a)
            }
        },
        init: function(n, i) {
            if (!(n && "nodeName" in n)) throw new TypeError("First argument is not of type Element");
            i || (i = function(t) {
                var n = e.Deferred();
                return requirejs([t], n.resolve, n.reject), n.promise()
            });
            var o = this,
                s = [];
            return e("script[data-name]", n).each(function(n, a) {
                var r = e(a),
                    l = r.data("name"),
                    c = r.attr("data-params"),
                    d = void 0;
                d = "prev" === r.data("for") ? r.prev().get(0) : a.parentNode;
                var h = {};
                if (c && c.length) {
                    c = c.trim().replace(/(\n|\r)/g, "");
                    try {
                        h = JSON.parse(c)
                    } catch (e) {
                        return void t.log("out error", e, {
                            paramsString: c,
                            explain: "Syntax Error in JSON params in component " + l
                        })
                    }
                }
                var u = e.Deferred();
                i(l).then(function(e) {
                    var n = void 0;
                    try {
                        n = o.make(e, d, h, l)
                    } catch (e) {
                        t.log("out error", e, {
                            explain: "Error while creating " + l
                        }), u.reject()
                    }
                    u.resolve(n)
                }, function(e) {
                    t.log("out error", e, {
                        explain: "Error while loading " + l
                    }), u.reject()
                }), s.push(u.promise())
            }), e.when.apply(e, s)
        },
        make: function(e, t, n) {
            return e(t, n, !0)
        }
    }
}), define("bloko/blocks/dropdown/dropdown", ["jquery", "underscore", "bloko/blocks/dropdown/dropdown.mustache", "bloko/common/dropdownModule", "bloko/common/metrics", "bloko/common/constants/commonCssClasses", "bloko/common/constants/mouse", "bloko/common/requestAnimation", "bloko/common/transitionEventName", "bloko/common/core/Components"], function(e, t, n, i, o, s, a, r, l, c) {
    var d = i.DropdownModule,
        h = i.PLACEMENTS,
        u = i.ALIGNS,
        p = i.cssClasses,
        m = i.VALIGNS,
        f = i.LAYERS,
        g = "dropdown",
        b = void 0,
        v = void 0;
    e(document).on("click." + g, function(e) {
        e.button && e.button !== a.BUTTON_LEFT || (b && !v && b.hideOnOutsideClick(e), v = !1)
    });
    var k = e(window);
    return c.build({
        defaults: {
            content: '[data-attach="' + g + '-content-placeholder"]',
            usercontent: !1,
            placement: h.bottom,
            align: u.center,
            valign: m.middle,
            action: "click",
            hideonclick: !0,
            nopaddings: !1,
            animation: !0,
            layer: f.overlayContent,
            arrow: !1
        },
        create: function(i, o) {
            var a = e(i),
                c = e(n.render()),
                h = new d(i, c[0], {
                    placement: o.placement,
                    align: o.align,
                    valign: o.valign,
                    arrow: o.arrow
                }),
                u = void 0,
                m = void 0,
                f = void 0,
                y = void 0,
                w = void 0;
            function H() {
                return f
            }
            function S() {
                H() ? _() : E()
            }
            function C() {
                return o.usercontent ? m || (m = e(o.usercontent)) : m || (m = a.find(o.content))
            }
            function T(e) {
                u.hasClass(p.width[e]) || (u.removeClass(t.values(p.width).join(" ")), u.addClass(p.width[e]))
            }
            function E() {
                var e, t;
                C() && (b !== w ? (b && b.hide(!0), b = w, c.remove().addClass(o.animation ? s.ANIM_FADE : "").css({
                    left: -1e4,
                    top: -1e4,
                    display: "block"
                }).appendTo(document.body), u = c.find('[data-attach="dropdown-content"]'), e = C(), t = o.width, u.empty(), u.append(e), e.removeClass(s.HIDDEN), o.nopaddings && u.addClass(p.noPaddings), t && T(t), h.updatePosition(), f = !0, h.checkElementMetricsChange(f), c.on("click." + g, function() {
                    v = !0
                }).on("click." + g, '[data-attach="' + g + '-hide"]', _), k.on("resize." + g, r(function() {
                    h.updatePosition()
                })), a.trigger("showed." + g)) : h.updatePosition())
            }
            function _(e) {
                if (f = !1, h.checkElementMetricsChange(f), b === w) {
                    c.removeClass(s.ANIM_FADE_IN), e && c.removeClass(s.ANIM_FADE);
                    var t = function() {
                        var e = C();
                        e.addClass(s.HIDDEN), document.body.insertBefore(e[0], null), c.remove(), a.trigger("hid." + g)
                    };
                    l && c.hasClass(s.ANIM_FADE) ? c.one(l, t) : t(), k.off("resize." + g), b = void 0
                }
            }
            if (c.addClass(p.layer[o.layer]), o.arrow && c.addClass(p.arrow), w = {
                    hide: _,
                    hideOnOutsideClick: function(e) {
                        var t = void 0 !== y,
                            n = t && y !== e.originalEvent;
                        o.hideonclick && (t && !n || _(), y = void 0)
                    }
                }, "click" === o.action) {
                var $ = e('[data-attach="' + g + '-trigger"]', a);
                $.length || ($ = a), $.on("click." + g, function(e) {
                    o.hideonclick && (y = e.originalEvent), e.preventDefault(), S(), e.stopPropagation()
                })
            }
            return f = !1, {
                show: E,
                hide: _,
                toggle: S,
                setWidth: T,
                isVisible: H,
                updatePosition: function() {
                    h.updatePosition()
                }
            }
        }
    })
}), define("bloko/blocks/popup/popup.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.b("<div>"), i.b("\n" + n), i.b('    <div class="bloko-modal-header bloko-modal-header_outlined" data-attach="popup-header">'), i.b("\n" + n), i.b('        <h2 class="bloko-modal-title" data-attach="popup-header-text" data-qa="bloko-popup__title"></h2>'), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b('    <div class="popup" data-attach="popup-content" data-qa="bloko-popup__content"></div>'), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/blocks/modal/modal.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.b('<div class="bloko-modal-container" data-attach="modal-container" data-qa="bloko-modal">'), i.b("\n" + n), i.b('    <div class="bloko-modal" data-attach="modal"></div>'), i.b("\n" + n), i.b('    <div class="bloko-modal-close-button Bloko-Modal-CloseButton" data-qa="bloko-modal-close"></div>'), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/blocks/modal/modalOverlay.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            return this.b(n = n || ""), this.b('<div class="bloko-modal-overlay"></div>'), this.b("\n"), this.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/common/constants/keyboard", [], function() {
    var e = {
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            COMMA: 44,
            PERIOD: 46,
            ENTER: 13,
            ESC: 27,
            TAB: 9,
            SHIFT: 16,
            SPACE: 32,
            SPECIAL_CHAR: 32,
            DELETE: 46,
            BACKSPACE: 8
        },
        t = {
            188: e.COMMA,
            190: e.PERIOD
        };
    return {
        getChar: function(n) {
            return n.which ? n.which < e.SPECIAL_CHAR ? null : String.fromCharCode(t[n.which] || n.which) : null
        },
        KEY_CODES: e
    }
}), define("bloko/common/transition", ["jquery", "bloko/common/transitionEventName"], function(e, t) {
    var n = function(e) {
        return Math.max.apply(null, e.split(",").map(function(e) {
            var t = -1 !== e.indexOf("ms") ? 1 : 1e3;
            return parseFloat(e.trim()) * t
        }))
    };
    return function(i, o, s) {
        var a = e(i);
        if (a.toggleClass(o), t) {
            var r = void 0,
                l = function() {
                    window.clearTimeout(r), a.off(t), s()
                };
            a.on(t, function(e) {
                e.target === i && l()
            });
            var c = window.getComputedStyle(i),
                d = n(c.getPropertyValue("transition-duration")),
                h = n(c.getPropertyValue("transition-delay"));
            r = window.setTimeout(l, 1.5 * (h + d))
        } else s()
    }
}), define("bloko/common/supports", [], function() {
    var e = function(e) {
            var t = void 0;
            return function() {
                return void 0 === t && (t = e()), t
            }
        },
        t = function(e, t) {
            return function() {
                try {
                    return window[e].setItem(t, t), window[e].removeItem(t), !0
                } catch (e) {
                    return !1
                }
            }
        },
        n = navigator.userAgent.toLowerCase();
    return {
        localStorage: e(t("localStorage", "_bloko_hh_test_local_storage")),
        sessionStorage: e(t("sessionStorage", "_bloko_hh_test_session_storage")),
        historyApi: e(function() {
            return !(!window.history || !window.history.pushState)
        }),
        android: e(function() {
            return /android/i.test(n) && !/IEMobile/i.test(n) && !/(ipad|ipod|iphone)/i.test(n)
        }),
        IEMobile: e(function() {
            return /IEMobile/i.test(n)
        }),
        IE: e(function() {
            return /MSIE/i.test(n) || /trident/.test(n) && /rv:11/.test(n) || /edge/.test(n)
        }),
        mobile: e(function() {
            return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(n)
        }),
        ios: e(function() {
            return /(ipad|ipod|iphone)/i.test(n)
        }),
        webkit: e(function() {
            return /webkit/i.test(n)
        }),
        touch: e(function() {
            return "ontouchstart" in window
        })
    }
}), define("bloko/common/events", ["underscore", "backbone"], function(e, t) {
    var n = {
        _trigger: function() {
            for (var e, n = arguments.length, i = Array(n), o = 0; o < n; o++) i[o] = arguments[o];
            (e = t.Events.trigger).call.apply(e, [this].concat(i))
        },
        on: t.Events.on,
        off: t.Events.off,
        once: t.Events.once
    };
    return {
        extend: function(t) {
            return e.extend(t, n)
        }
    }
}), define("bloko/common/modalHelper", ["bloko/common/metrics", "bloko/common/supports"], function(e, t) {
    var n = {
            general: "bloko-modal-no-scroll",
            ios: "bloko-modal-no-scroll_ios"
        },
        i = 0;
    return {
        enableScroll: function() {
            document.body.style.paddingRight = "", document.body.classList.remove(n.general), document.body.classList.remove(n.ios), document.documentElement.classList.remove(n.general), document.documentElement.classList.remove(n.ios), window.scrollTo(0, i)
        },
        disableScroll: function() {
            i = window.pageYOffset;
            var o = parseInt(document.body.style.paddingRight || 0, 10);
            document.body.style.paddingRight = o + e.getScrollbarWidth() + "px", document.body.classList.add(n.general), t.ios() && (document.body.classList.add(n.ios), document.documentElement.classList.add(n.general), document.documentElement.classList.add(n.ios))
        }
    }
}), define("bloko/blocks/modal/modal", ["jquery", "bloko/blocks/modal/modal.mustache", "bloko/blocks/modal/modalOverlay.mustache", "bloko/common/metrics", "bloko/common/core/Components", "bloko/common/constants/keyboard", "bloko/common/transition", "bloko/common/supports", "bloko/common/events", "bloko/common/modalHelper"], function(e, t, n, i, o, s, a, r, l, c) {
    var d = "modal",
        h = {
            overlay: {
                visible: "bloko-modal-overlay_visible"
            },
            container: {
                visible: "bloko-modal-container_visible"
            },
            closeButton: {
                hidden: "bloko-modal-close-button_hidden"
            }
        },
        u = e(document),
        p = e("body");
    return o.build({
        defaults: {
            closeBy: {
                closeButtonClick: !0,
                backgroundClick: !0,
                escapePress: !0
            }
        },
        create: function(i, o) {
            var r = e(i),
                m = r.contents(),
                f = void 0,
                g = void 0,
                b = void 0,
                v = void 0,
                k = l.extend({
                    show: function() {
                        y() || ((g = e(n.render())).appendTo(p), f = e(t.render()), v = e(".Bloko-Modal-CloseButton", f), o.closeBy.closeButtonClick || v.addClass(h.closeButton.hidden), b = f.find('[data-attach="modal"]'), f.on("click." + d, w), o.closeBy.escapePress && u.on("keydown." + d, H), b.on("touchmove." + d, function(e) {
                            e.stopPropagation()
                        }), c.disableScroll(), b.empty().append(m), g.addClass(h.overlay.visible), f.appendTo(p), a(f.get(0), h.container.visible, function() {
                            k._trigger("showed")
                        }))
                    },
                    hide: S
                });
            function y() {
                return f && f.is(":visible")
            }
            function w(t) {
                var n = t.target,
                    i = u.find(n).length > 0,
                    s = b.find(n).length > 0,
                    a = b.is(n),
                    r = v.is(n),
                    l = e(n).is('[data-attach="' + d + '-hide"]');
                i && (o.closeBy.closeButtonClick && r ? S() : !o.closeBy.backgroundClick || s || a ? l && S() : S())
            }
            function H(e) {
                e.which === s.KEY_CODES.ESC && S()
            }
            function S() {
                y() && (c.enableScroll(), b.off("touchmove." + d), m.off("touchmove." + d), u.off("keydown." + d), b.off("touchmove." + d), g.removeClass(h.overlay.visible), a(f.get(0), h.container.visible, function() {
                    g.detach(), f.detach(), r.append(m), k._trigger("hid")
                }))
            }
            return k
        }
    })
}), define("bloko/blocks/popup/popup", ["jquery", "underscore", "bloko/blocks/popup/popup.mustache", "bloko/blocks/modal/modal", "bloko/common/metrics", "bloko/common/core/Components"], function(e, t, n, i, o, s) {
    var a = "popup",
        r = {
            size: {
                min: "popup_min",
                mid: "popup_mid",
                big: "popup_big",
                max: "popup_max",
                full: "popup_full",
                "by-content": "popup_size-by-content"
            }
        };
    function l(o, l) {
        var c = e(o),
            d = l.classnames || [],
            h = void 0,
            u = {};
        l.closebutton || (u = {
            closeButtonClick: !1,
            backgroundClick: !1,
            escapePress: !1
        });
        var p = e(n.render()),
            m = e('[data-attach="popup-content"]', p),
            f = p.find('[data-attach="popup-header"]'),
            g = p.find('[data-attach="popup-header-text"]'),
            b = s.make(i, p.get(0), {
                closeBy: u
            });
        function v() {
            return h || (h = c.contents())
        }
        function k() {
            var e, n;
            m.empty().append(v()), v().removeClass("g-hidden"), e = l.size, n = c.data("title"), m.removeClass(t.values(r.size).join(" ")), e && m.addClass(r.size[e]), w(n)
        }
        function y() {
            b.hide()
        }
        function w(e) {
            var t = e && e.length > 0;
            t && g.text(e), f.toggleClass("g-hidden", !t)
        }
        return m.on("click." + a, '[data-attach="' + a + '-hide"]', y), b.on("hid", function() {
            v().addClass("g-hidden"), p.detach(), c.append(v(), null), c.trigger("hid." + a)
        }), b.on("showed", function() {
            c.trigger("showed." + a)
        }), "string" == typeof d && (d = d.trim().split(/\s+/)), c.addClass(d.join(" ")), {
            show: function() {
                v().length > 0 && (m && m.is(":visible") || (k(), b.show()))
            },
            hide: y,
            setTitle: function(e) {
                c.data("title", e), w(e)
            }
        }
    }
    return s.build({
        defaults: {
            closebutton: !0,
            size: "mid"
        },
        create: function(e, t) {
            return new l(e, t)
        }
    })
}), define("bloko/blocks/stateChanger/stateChanger", ["jquery", "bloko/common/constants/commonCssClasses", "bloko/common/core/Components"], function(e, t, n) {
    var i = "stateChanger",
        o = "Bloko-StateChanger-Action." + i,
        s = "Bloko-StateChanger-Reset." + i,
        a = "Bloko-StateChanger-StateChange";
    return n.build({
        defaults: {
            initial: null,
            className: "",
            selectorToHide: "[data-state-changer-hide]",
            selectorToDisable: "[data-state-changer-disable]"
        },
        create: function(n, i) {
            var r = e(n);
            function l() {
                r.trigger(o, i.initial)
            }
            function c(e, t) {
                var n = e.filter(t);
                return n.length ? n : e
            }
            function d(e, t) {
                var n = c(e, i.selectorToDisable),
                    o = n.filter(":input");
                n.filter(":not(:input)").toggleClass(i.className, t), o.prop("disabled", t), n.trigger(a, {
                    action: t ? "disable" : "enable"
                })
            }
            function h(e, n) {
                c(e, i.selectorToHide).toggleClass(t.HIDDEN, n).trigger(a, {
                    action: n ? "hide" : "show"
                })
            }
            function u(e, t) {
                h(e, !t)
            }
            var p = {
                show: u,
                hide: h,
                enable: function(e, t) {
                    d(e, !t)
                },
                disable: d,
                swap: function(t, n) {
                    u(t, n), h(e("[data-change-group]", r).not(t), n)
                }
            };
            return r.on(o, function(e, t) {
                [].concat(t.action).forEach(function(e) {
                    p[e](r.find("[data-change-group~=" + t.target + "]"), void 0 === t.state || t.state)
                }, null)
            }), i.initial && (l(), r.on(s, l)), p
        }
    })
}), define("bloko/blocks/suggest/suggest.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.b('<ul class="suggest__items suggest__items_hover_disabled Bloko-Suggest-List">'), i.b("\n" + n), i.s(i.f("items", e, t, 1), e, t, 0, 87, 260, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.b('    <li class="suggest__item'), i.s(i.f("delimiter", e, t, 1), e, t, 0, 130, 159, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b(" suggest__item_delimiter_line")
                }), e.pop()), i.b(' Bloko-Suggest-Item"'), i.b("\n" + n), i.b('        data-datum-id="'), i.b(i.v(i.f("datumId", e, t, 0))), i.b('">'), i.b("\n" + n), i.b(i.rp("<item0", e, t, "        ")), i.b("    </li>"), i.b("\n" + n)
            }), e.pop()), i.b("</ul>"), i.b("\n"), i.fl()
        },
        partials: {
            "<item0": {
                name: "item",
                partials: {},
                subs: {}
            }
        },
        subs: {}
    })
}), define("bloko/blocks/suggest/suggest-item.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.b(i.v(i.f("text", e, t, 0))), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/blocks/suggest/suggest-dropdown.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            return this.b(n = n || ""), this.b('<div class="suggest"></div>'), this.b("\n"), this.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/common/fuzzySearch", [], function() {
    var e = "qwertyuiopasdfghjkl;'zxcvbnm,QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>`~[].".split(""),
        t = "йцукенгшщзфывапролджэячсмитьбЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮёЁхъю".split("");
    function n(e, t) {
        return e.reduce(function(e, n, i) {
            return e[n] = t[i], e
        }, {})
    }
    var i = {
        russian: n(e, t),
        english: n(t, e)
    };
    return {
        match: function(e, t) {
            var n = e.trim().toLowerCase(),
                o = void 0,
                s = a(n);
            function a(e) {
                return -1 !== t.toLowerCase().indexOf(e.toLowerCase())
            }
            return s || (s = a((o = function(e) {
                function t(t) {
                    var n = "english" === t ? i.russian : i.english;
                    return e.split("").map(function(e) {
                        return n[e] ? n[e] : e
                    }).join("")
                }
                return {
                    english: t("english"),
                    russian: t("russian")
                }
            }(n)).russian)) || (s = a(o.english)), s
        }
    }
}), define("bloko/blocks/suggest/createStaticDataProvider", ["jquery", "bloko/common/fuzzySearch"], function(e, t) {
    return function(n) {
        return function(i) {
            return e.when({
                items: n.filter(function(e) {
                    return t.match(i, e.text)
                })
            }).promise()
        }
    }
}), define("bloko/blocks/suggest/createRemoteDataProvider", ["jquery"], function(e) {
    return function(t, n) {
        return function(i) {
            var o = t.replace(n, encodeURIComponent(i));
            return e.getJSON(o)
        }
    }
}), define("bloko/common/media", [], function() {
    var e, t = {
            XS: "xs",
            S: "s",
            M: "m",
            L: "l"
        },
        n = t.M,
        i = ((e = document.createElement("div")).className = "bloko-media-marker", document.body.appendChild(e), e),
        o = function() {
            return "getComputedStyle" in window ? function(e) {
                if (!e) return n;
                var i = e.getPropertyValue("font-family").replace(/['"]/g, "");
                if (!i) return n;
                for (var o in t)
                    if (i === t[o]) return t[o];
                return n
            }(window.getComputedStyle(i)) : n
        },
        s = o();
    return window.addEventListener("resize", function() {
        s = o()
    }), {
        breakpoint: t,
        getBreakpoint: function() {
            return s
        }
    }
}), define("bloko/common/valuechange", ["jquery"], function(e) {
    var t = "_valueChangeLastValue";
    function n(t) {
        return e(t).is(":input, [contenteditable]")
    }
    var i = function(t) {
            return "true" === t.contentEditable ? e(t).html() : e(t).val()
        },
        o = function(n, i) {
            e(n).data(t, i)
        },
        s = function(n) {
            return e(n).data(t)
        },
        a = function(t) {
            var n = e(t),
                a = s(t),
                r = i(t);
            r !== a && (o(t, r), n.trigger("valuechange", [a]))
        };
    e.event.special.valuechange = {
        setup: function() {
            e(this).on("input.valuechange change.valuechange", function(e) {
                a(e.target)
            }), e(this).on("cut.valuechange paste.valuechange", function(e) {
                window.setTimeout(function() {
                    a(e.target)
                }, 0)
            })
        },
        add: function(t) {
            var a, r = e(this);
            if (r.on("drop.valuechange focusin.valuechange", t.selector, function(e) {
                    n(e.target) && void 0 === s(e.target) && o(e.target, i(e.target))
                }), r.on("fixValue.valuechange", t.selector, function(e) {
                    o(e.target, i(e.target))
                }), n(this)) o(this, i(this));
            else {
                var l = (a = this, document.activeElement && e.contains(a, document.activeElement) ? document.activeElement : null);
                l && e(l).trigger("fixValue.valuechange")
            }
        },
        remove: function(t) {
            e(this).off("drop.valuechange focusin.valuechange", t.selector)
        },
        teardown: function() {
            e(this).off(".valuechange")
        }
    }
});
var _typeof = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : _typeof2(e)
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e)
};
define("bloko/blocks/suggest/suggest", ["jquery", "underscore", "bloko/blocks/suggest/suggest.mustache", "bloko/blocks/suggest/suggest-item.mustache", "bloko/blocks/suggest/suggest-dropdown.mustache", "bloko/blocks/suggest/createStaticDataProvider", "bloko/blocks/suggest/createRemoteDataProvider", "bloko/common/metrics", "bloko/common/core/Components", "bloko/common/core/Debug", "bloko/common/constants/commonCssClasses", "bloko/common/media", "bloko/common/requestAnimation", "bloko/common/constants/keyboard", "bloko/common/transitionEventName", "bloko/common/valuechange"], function(e, t, n, i, o, s, a, r, l, c, d, h, u, p, m) {
    var f = window.bloko && window.bloko.isTest,
        g = "suggest",
        b = f ? 0 : 120,
        v = {
            state: {
                highlighted: "suggest__item_state_highlighted",
                animated: "suggest_state_animated"
            },
            hover: {
                disable: "suggest__items_hover_disabled",
                enable: "suggest__items_hover_enabled"
            },
            layer: {
                floating: "suggest_layer-floating",
                overlay: "suggest_layer-overlay",
                topmost: "suggest_layer-topmost",
                "above-content": "suggest_layer-above-content",
                "overlay-content": "suggest_layer-overlay-content",
                "above-overlay-content": "suggest_layer-above-overlay-content"
            },
            highlightSelector: "Bloko-Suggest-Highlight"
        },
        k = {
            item: ".Bloko-Suggest-Item",
            list: ".Bloko-Suggest-List",
            highlight: ".Bloko-Suggest-Highlight"
        },
        y = e(window),
        w = function(i, l) {
            var c = e(i),
                f = c,
                w = l.hidden,
                H = !0,
                S = void 0,
                C = void 0,
                T = void 0,
                E = void 0,
                _ = [],
                $ = void 0,
                M = void 0,
                I = void 0,
                x = void 0,
                B = void 0,
                O = null,
                D = !1,
                A = l.suggestStartInputLength;
            function L() {
                var e = W().find(k.list);
                e.hasClass(v.hover.enable) || (e.removeClass(v.hover.disable).addClass(v.hover.enable), e.find(k.item).removeClass(t.values(v.state).join(" ")))
            }
            function P() {
                if (!H) {
                    H = !0;
                    var e = function() {
                        W().detach(), c.trigger("hid." + g), S = void 0
                    };
                    m && W().hasClass(d.ANIM_FADE) ? W().one(m, e) : window.setTimeout(e, 0), W().removeClass(d.ANIM_FADE_IN), y.off("resize." + g)
                }
            }
            function N(t) {
                clearTimeout($), window.setTimeout(P, b), e.isPlainObject(t) && (T = null, B && B.val(t.id), ee(t))
            }
            function V(e) {
                return e.trim().toUpperCase()
            }
            function R(e) {
                S = !0, N(e);
                var t = e[l.field];
                f.val(t), t && (C = V(t)), f.trigger("input"), c.trigger("selected." + g, [e])
            }
            function F(t) {
                return _[e(t).data("datum-id")]
            }
            function j() {
                return f.val().trim()
            }
            function q() {
                return V(j()) !== C
            }
            function U(e) {
                R(F(e.currentTarget))
            }
            function W() {
                return x || ((t = e(o.render())).on("mousedown." + g + " touchstart." + g, function() {
                    D = !0
                }).on("mousemove." + g, L).on("click." + g, k.item, U), x = t);
                var t
            }
            function z() {
                var e = r.getMetrics(f),
                    n = l.rightpadding,
                    i = l.layer,
                    o = {
                        left: e.left,
                        top: e.top + e.height,
                        width: e.width + n
                    };
                h.getBreakpoint() === h.breakpoint.XS && (o.left = 0, o.width = "auto", o.right = 0);
                var s = W().css(o);
                s.removeClass(t.values(v.layer).join(" ")), s.addClass(v.layer[i])
            }
            function Y() {
                H && I && (!T || j().length < A || (H = !1, W().detach().addClass(m ? d.ANIM_FADE : "").appendTo(document.body), z(), m && W().addClass(d.ANIM_FADE_IN), y.on("resize." + g, u(z)), c.trigger("showed." + g)))
            }
            function J() {
                _ = [], T = null, C = null, W().html("")
            }
            function X(e) {
                var n = W().find(k.item);
                if (n.removeClass(t.values(v.state).join(" ")), n.removeClass(v.highlightSelector), -1 !== e) {
                    var i = void 0;
                    i = "number" == typeof e && e < n.length ? e : 0, i = e < 0 ? -1 : e, n.eq(i).addClass(v.highlightSelector).addClass(v.state.highlighted)
                }
            }
            function G(t, i) {
                if (j() === t) {
                    if (!e.isPlainObject(i) || !e.isArray(i.items) || !i.items.length) return H || c.one("hid." + g, J), c.trigger("Bloko-Suggest-NotFound." + g), void P();
                    var o, s = e.extend({}, i, {
                        items: i.items.slice(0, l.limit).map(function(t, n) {
                            return e.extend({}, t, {
                                datumId: n,
                                id: String(t.id)
                            })
                        }),
                        delimiter: l.delimiter
                    });
                    if (l.autoselect && 1 === s.items.length && s.items[0][l.field].toUpperCase() === t.toUpperCase()) return N(o = s.items[0]), void c.trigger("autoselected." + g, [o]);
                    if (JSON.stringify(s) !== T) {
                        T = JSON.stringify(s), _ = s.items;
                        var a, r, d = W();
                        d.html((a = s, r = {
                            item: l.template
                        }, n.render(a, r))), d.find(k.item).hover(function(t) {
                            e(t.currentTarget).addClass(v.state.highlighted).addClass(v.highlightSelector)
                        }, function(t) {
                            e(t.currentTarget).removeClass(v.state.highlighted).removeClass(v.highlightSelector)
                        }), l.autoselectfirstsuggest && X(0), Y()
                    } else Y()
                }
            }
            function K() {
                var e = j();
                if (e.length < A) return c.trigger("Bloko-Suggest-MinQueryLength." + g), void P();
                E(e).then(G.bind(null, e), function(e) {
                    j() === e && (c.trigger("Bloko-Suggest-NotFound." + g), J())
                }.bind(null, e))
            }
            function Q() {
                clearTimeout(M), C = V(j()), B && B.val(""), O = null, c.trigger("unselected." + g), clearTimeout($), $ = window.setTimeout(K, l.throttle)
            }
            function Z(e) {
                if (H) e.keyCode === p.KEY_CODES.ARROW_DOWN && (e.preventDefault(), Y());
                else {
                    var t = W().find(k.item).filter(k.highlight),
                        n = t.index();
                    switch (W().find(k.list).removeClass(v.hover.enable).addClass(v.hover.disable), e.keyCode) {
                        case p.KEY_CODES.ESC:
                            return e.preventDefault(), void P();
                        case p.KEY_CODES.ARROW_UP:
                            e.preventDefault(), n -= 1;
                            break;
                        case p.KEY_CODES.ARROW_DOWN:
                            e.preventDefault(), n += 1;
                            break;
                        case p.KEY_CODES.ENTER:
                            if (-1 === n) return;
                            return e.preventDefault(), void R(F(t));
                        default:
                            return
                    }
                    X(n)
                }
            }
            function ee(e) {
                (O = {
                    id: e.id
                })[l.field] = e[l.field]
            }
            function te(e) {
                var n = t.unescape(e);
                ne(a(n, l.wildcard))
            }
            function ne(e) {
                E = e
            }
            f.prop("autocomplete", "off"), I = document.activeElement === f[0];
            var ie = j();
            return ie && (C = V(ie)), w && ((B = f.next().attr("name") === w ? f.next() : e("<input>", {
                    type: "hidden",
                    name: w,
                    value: ""
                }).insertAfter(f)).val(l.hiddenValue), B.addClass(l.hiddenClasses)), l.dataProvider ? ne(l.dataProvider) : l.remote ? te(l.remote) : ne(s(l.data.items)),
                function() {
                    var n = this;
                    f.on("focus." + g, function() {
                        I = !0, q() ? Q() : (clearTimeout(M), M = window.setTimeout(Y, l.throttle))
                    }).on("blur." + g, function() {
                        document.activeElement !== n && (I = !1, D || function() {
                            if (!S && !H) {
                                if (l.selectExactMatchOnBlur) {
                                    var e = V(j()),
                                        n = t.find(_, function(t) {
                                            return V(t[l.field]) === e
                                        });
                                    n && R(n)
                                }
                                if (l.selectonblur) {
                                    var i = W().find(k.item);
                                    i.length && R(F(i.first()))
                                }
                                P()
                            }
                        }())
                    }).on("valuechange." + g, function() {
                        q() && Q()
                    }).on("keydown." + g, Z), e(document).on("mouseup." + g + " touchend." + g, function() {
                        D = !1
                    })
                }(), {
                    selectItem: N,
                    selectItemByData: function(t) {
                        if (clearTimeout($), window.setTimeout(P, b), e.isPlainObject(t)) {
                            T = null;
                            var n = t[l.field];
                            n && (f.val(n), C = V(n), f.trigger("input"), B && B.val(t.id), ee(t), c.trigger("selected." + g, [t]))
                        }
                    },
                    getSelected: function() {
                        return O
                    },
                    clear: function() {
                        f.val("").trigger("change"), P()
                    },
                    changeRemote: function(e) {
                        l.dataProvider || te(e)
                    }
                }
        };
    return l.build({
        defaults: {
            limit: 10,
            wildcard: "%QUERY%",
            throttle: f ? 0 : 300,
            autoselect: !1,
            selectonblur: !0,
            selectExactMatchOnBlur: !1,
            autoselectfirstsuggest: !0,
            delimiter: !1,
            rightpadding: 0,
            layer: "above-content",
            field: "text",
            template: i,
            suggestStartInputLength: 2
        },
        create: function(e, t) {
            if (!t || "function" != typeof t.dataProvider && "string" != typeof t.remote && "object" !== _typeof(t.data)) throw new Error(g + ": should be passed one of the following params: {Function} dataProvider | {String} remote | {Object} data");
            return new w(e, t)
        }
    })
}), define("bloko/blocks/tabs/bindings", {
    tab: ".Bloko-Tabs-Tab",
    tabBody: ".Bloko-Tabs-Body",
    container: ".Bloko-Tabs-Container",
    dropdownData: ".Bloko-Tabs-Dropdown-Data",
    dropdownItem: ".Bloko-Tabs-Dropdown-Item",
    moreButton: ".Bloko-Tabs-More-Button"
}), define("bloko/blocks/tabs/tabs", ["jquery", "underscore", "bloko/common/core/Components", "bloko/blocks/tabs/bindings"], function(e, t, n, i) {
    var o = window.bloko && window.bloko.isTest ? 1 : 100;
    return n.build({
        defaults: {
            cssClasses: {
                activeTab: "bloko-tabs__item_active"
            }
        },
        create: function(n, s) {
            var a = e(n),
                r = e(i.container, a),
                l = r.find(i.tab),
                c = a.find(i.tabBody),
                d = void 0;
            function h(e) {
                return "number" == typeof e && e !== d && e >= 0 && e < l.length
            }
            function u() {
                l.each(function(t, n) {
                    e(n).toggleClass(s.cssClasses.activeTab, t === d)
                }), c.addClass("g-hidden"), c.eq(d).removeClass("g-hidden")
            }
            function p(e) {
                d = e, u(), a.trigger("Bloko-Tabs-Changed", {
                    index: d
                })
            }
            function m() {
                l.each(function(t, n) {
                    var i = e(n);
                    i.data({
                        offset: -n.offsetLeft,
                        width: i.outerWidth(!0)
                    }), void 0 === d && i.hasClass(s.cssClasses.activeTab) && (d = t)
                }), d = d || 0, a.trigger("Bloko-Tabs-Init", {
                    index: d
                }), u()
            }
            if (r.on("click", i.tab, function(t) {
                    ! function(t) {
                        var n = l.index(t);
                        if (h(n)) {
                            var i = e.Event("Bloko-Tabs-Will-Change");
                            r.trigger(i, {
                                index: n
                            }), i.isDefaultPrevented() || p(n)
                        }
                    }(e(t.currentTarget))
                }), h(s.activeTabIndex) && (d = s.activeTabIndex), r.is(":visible")) m();
            else {
                var f = t.debounce(function() {
                    r.is(":visible") && (m(), e(window).off("resize", f))
                }, o);
                e(window).on("resize", f)
            }
            return {
                setActiveTab: function(e) {
                    h(e) && (void 0 !== d && l.eq(d).blur(), p(e))
                }
            }
        }
    })
}), define("HHC/Debug", ["bloko/common/core/Debug"], function(e) {
    return e
}), define("HHC/Components", ["jquery", "HHC/Debug", "bloko/common/core/Components"], function(e, t, n) {
    var i = Object.create(n);
    return i.make = function(e, i, o, s) {
        if (t.log("components:make", {
                name: s,
                element: i,
                params: o
            }), "function" == typeof e) return n.make.apply(this, Array.from(arguments));
        t.log("error", "PORTFOLIO-2272 findout", {
            componentName: s,
            params: o,
            typeof: void 0 === e ? "undefined" : _typeof2(e)
        })
    }, i
}), define("bloko/blocks/swipe/swipe", ["backbone", "underscore", "bloko/common/core/Components", "bloko/common/events"], function(e, t, n, i) {
    var o = null,
        s = "TOUCH",
        a = "MOUSE",
        r = e.View.extend({
            events: {
                "touchstart .Bloko-Swipe": "swipeStartTouch",
                "touchmove .Bloko-Swipe": "swipeMoveTouch",
                "touchend .Bloko-Swipe": "swipeEndTouch",
                "touchleave .Bloko-Swipe": "swipeEndTouch",
                "mousedown .Bloko-Swipe": "swipeStartMouse",
                "mousemove .Bloko-Swipe": "swipeMoveMouse",
                "mouseup .Bloko-Swipe": "swipeEndMouse",
                "mouseleave .Bloko-Swipe": "swipeEndMouse",
                "MSPointerDown .Bloko-Swipe": "swipeStartMouse",
                "MSPointerMove .Bloko-Swipe": "swipeMoveMouse",
                "MSPointerUp .Bloko-Swipe": "swipeEndMouse"
            },
            initialize: function(e) {
                this.$container = this.$(".Bloko-Swipe"), this.quickSwipePercent = e.quickSwipePercent, this.minSwipePercent = e.minSwipePercent, this.maxBorderOffsetPercent = e.maxBorderOffsetPercent
            },
            swipeStartTouch: function(e) {
                this.type = s;
                var t = e.originalEvent.changedTouches[0];
                this.moveStart(t.pageX, t.pageY)
            },
            swipeMoveTouch: function(e) {
                if (this.type !== s) e.preventDefault();
                else {
                    var t = e.originalEvent.changedTouches[0];
                    this.swipeMove(e, t.pageX, t.pageY)
                }
            },
            swipeEndTouch: function() {
                this.type === s && (this.swipeEnd(), this.type = o)
            },
            swipeStartMouse: function(e) {
                this.type !== s && (this.type = a, this.moveStart(e.pageX, e.pageY))
            },
            swipeMoveMouse: function(e) {
                this.type === a && this.swipeMove(e, e.pageX, e.pageY)
            },
            swipeEndMouse: function() {
                this.type === a && (this.swipeEnd(), this.type = o)
            },
            moveStart: function(e, t) {
                this.moveStarted = !0, this.isSwipingHorizontally = !1, this.clientX = e, this.clientY = t, this.swipeDistance = 0
            },
            swipeMove: function(e, t, n) {
                var i = this;
                if (this.moveStarted && !this.isScrolling) {
                    var o = t - this.clientX,
                        a = n - this.clientY;
                    if (this.swipeDistance += o, this.clientX = t, this.clientY = n, !this.isSwipingHorizontally) {
                        if (180 * Math.atan2(Math.abs(a), Math.abs(o)) / Math.PI > 45) return void(this.isScrolling = !0);
                        this.isSwipingHorizontally = !0, this.trigger("bloko-swipe-start", {
                            type: this.type
                        }), this.isQuickSwipe = !0, this.quickSwipeTimeout = window.setTimeout(function() {
                            i.isQuickSwipe = !1
                        }, 500)
                    }
                    this.type === s && e.preventDefault(), this.trigger("bloko-swipe-move", {
                        type: this.type,
                        clientX: this.clientX,
                        distance: this.swipeDistance
                    })
                }
            },
            swipeEndTrigger: function(e) {
                this.trigger("bloko-swipe-end", {
                    type: this.type,
                    clientX: this.clientX,
                    distance: this.swipeDistance,
                    isQuickSwipe: this.isQuickSwipe,
                    direction: e
                })
            },
            swipeEnd: function() {
                if (this.moveStarted) {
                    this.moveStarted = !1, this.isScrolling = !1;
                    var e = this.$container.width(),
                        t = this.$container.offset().left;
                    if (this.isQuickSwipe && Math.abs(this.swipeDistance) < 10) {
                        if (this.clientX >= t && this.clientX < t + e * this.maxBorderOffsetPercent / 100) return this.swipeEndTrigger(-1), void clearTimeout(this.quickSwipeTimeout);
                        if (this.clientX <= t + e && this.clientX > t + e * (1 - this.maxBorderOffsetPercent / 100)) return this.swipeEndTrigger(1), void clearTimeout(this.quickSwipeTimeout)
                    }
                    if (this.isQuickSwipe && Math.abs(this.swipeDistance) > e * this.quickSwipePercent / 100) return this.swipeEndTrigger(this.swipeDistance > 0 ? -1 : 1), void clearTimeout(this.quickSwipeTimeout);
                    Math.abs(this.swipeDistance) > e * this.minSwipePercent / 100 ? this.swipeEndTrigger(this.swipeDistance > 0 ? -1 : 1) : this.trigger("bloko-swipe-prevent", {
                        type: this.type,
                        distance: this.swipeDistance
                    })
                }
            }
        });
    return n.build({
        defaults: {
            quickSwipePercent: 6,
            minSwipePercent: 20,
            maxBorderOffsetPercent: 20
        },
        create: function(e, n) {
            var o = new r(t.extend({
                    el: e
                }, n)),
                s = i.extend({});
            return o.on("bloko-swipe-prevent", function(e) {
                s._trigger("bloko-swipe-prevent", e)
            }).on("bloko-swipe-start", function(e) {
                s._trigger("bloko-swipe-start", e)
            }).on("bloko-swipe-end", function(e) {
                s._trigger("bloko-swipe-end", e)
            }).on("bloko-swipe-move", function(e) {
                s._trigger("bloko-swipe-move", e)
            }), s
        }
    })
}), define("HH/AdvicesSlider", ["jquery", "HHC/Components", "bloko/blocks/swipe/swipe"], function(e, t, n) {
    return t.build({
        create: function(i, o) {
            var s = e(i),
                a = e(".HH-AdvicesSlider-Slides", s),
                r = e(".HH-AdvicesSlider-Buttons", s),
                l = e(".HH-AdvicesSlider-Slide", a),
                c = e(".HH-AdvicesSlider-Button", r),
                d = 0,
                h = !1;
            function u() {
                a.css("margin-left", 100 * -d + "%"), c.removeClass(o.cssClasses.selectedButton).eq(d).addClass(o.cssClasses.selectedButton)
            }
            var p, m = t.make(n, s.get(0), {
                preventingDefault: !0
            });
            m.on("bloko-swipe-move", function(e) {
                l.eq(d).css("transform", "translate3d(" + e.distance + "px, 0, 0)")
            }), m.on("bloko-swipe-prevent", function() {
                l.eq(d).css("transition", "all 0.2s"), l.eq(d).css("transform", "translate3d(0, 0, 0)"), window.setTimeout(function() {
                    l.eq(d).css("transition", "")
                }, 200)
            }), r.on("click", ".HH-AdvicesSlider-Button", function(e) {
                d = c.index(e.target), u()
            }), a.on({
                click: function(e) {
                    h && e.preventDefault()
                },
                dragstart: !1
            }), m.on("bloko-swipe-end", function(e) {
                h = !0, (d += e.direction) < 0 && (d = 0), d >= l.length && (d = l.length - 1), l.eq(d).css("transform", "translate3d(0, 0, 0)"), u()
            }), m.on("bloko-swipe-end", function() {
                h = !1
            }), c.eq(d).addClass(o.cssClasses.selectedButton), p = l.length, a.css("width", 100 * p + "%"), l.width(100 / p + "%"), s.removeClass(o.cssClasses.initModificator)
        }
    })
}), define("bloko/common/ready", ["jquery"], function(e) {
    var t = function(t, n) {
        var i = e(t).first(),
            o = "bloko-ready-" + n,
            s = i.data(o);
        return s || (s = e.Deferred(), i.data(o, s)), s
    };
    return {
        resolve: function(e, n, i) {
            return t(e, n).resolve(i)
        },
        getPromise: function(e, n) {
            return t(e, n).promise()
        }
    }
}), define("HH/AjaxContentLoader", ["jquery", "HHC/Components", "bloko/common/ready"], function(e, t, n) {
    return t.build({
        defaults: {
            loadOnInit: !0,
            loadOnClick: !1
        },
        create: function(i, o) {
            return new function(i, o) {
                this.$element = e(i), this.params = o, this.load = function() {
                    var n = this;
                    this.loaded || (this.$element.trigger("startLoading"), this.loaded = !0, e.ajax(this.params.loadFrom).done(function(e) {
                        e && (n.$content.removeClass("g-hidden").html(e), t.init(n.$content.get(0)), n.$element.removeClass("g-hidden"))
                    }).always(function() {
                        n.$element.trigger("stopLoading")
                    }))
                }, this.init = function() {
                    this.loaded = !1, this.$content = e(".HH-AjaxContentLoader-Content", this.$element), this.params.loadOnInit && this.load(), this.params.loadOnClick && this.$element.on("click", this.load.bind(this)), this.$element.on("HH-AjaxContentLoader-Load", this.load.bind(this)), n.resolve(this.$element, "HH-AjaxContentLoader")
                }, this.init(i, o)
            }(i, o)
        }
    })
}), define("bloko/common/storage/Polyfill", [], function() {
    return function() {
        var e = {};
        this.length = 0, this.key = function(t) {
            var n = Object.keys(e);
            return t < n.length ? n[t] : null
        }, this.setItem = function(t, n) {
            e.hasOwnProperty(t) || (this.length += 1), e[t] = String(n)
        }, this.getItem = function(t) {
            return e.hasOwnProperty(t) ? e[t] : null
        }, this.removeItem = function(t) {
            this.length -= 1, delete e[t]
        }, this.clear = function() {
            this.length = 0, e = {}
        }, this.getLength = function() {
            return this.length
        }
    }
}), define("bloko/common/storage/Wrapper", [], function() {
    return function(e) {
        return {
            key: function(t) {
                try {
                    return e.key(t)
                } catch (e) {
                    return null
                }
            },
            getItem: function(t) {
                try {
                    return e.getItem(t)
                } catch (e) {
                    return null
                }
            },
            setItem: function(t, n) {
                try {
                    e.setItem(t, n)
                } catch (i) {
                    try {
                        e.removeItem(t), e.setItem(t, n)
                    } catch (e) {}
                }
            },
            removeItem: function(t) {
                try {
                    e.removeItem(t)
                } catch (e) {}
            },
            clear: function() {
                try {
                    e.clear()
                } catch (e) {}
            },
            getLength: function() {
                try {
                    return e.length
                } catch (e) {
                    return 0
                }
            }
        }
    }
}), define("bloko/common/storage/LocalStorageWrapper", ["bloko/common/supports", "bloko/common/storage/Polyfill", "bloko/common/storage/Wrapper"], function(e, t, n) {
    return e.localStorage() ? n(window.localStorage) : new t
}), define("HHC/Analytics", ["jquery", "HHC/Debug", "bloko/common/storage/LocalStorageWrapper"], function(e, t, n) {
    var i = "googleEvents",
        o = [],
        s = function() {
            try {
                return JSON.parse(n.getItem(i) || {})
            } catch (e) {
                return {}
            }
        },
        a = {
            googleEventToStorage: function(e, o, a, r) {
                if (!window.globalVars.features.disable_counters) {
                    var l = s();
                    l[[e, o, a, r].join("*")] = {
                        category: e,
                        event: o,
                        label: a,
                        value: r
                    }, n.setItem(i, JSON.stringify(l)), t.log("info", "Analytics event storaged:", e, o, a, r)
                }
            },
            setConversionGoal: function(e) {
                void 0 !== window.ga && (window.ga("main.send", "pageview", e), window.ga("reg.send", "pageview", e)), t.log("info", "Analytics conversion goal set:", e)
            },
            trackAnalyticsEvent: function(e, n, i, o) {
                if (!window.globalVars.features.disable_counters && (i = i || "", o = parseInt(o, 10) || void 0, t.log("info", "Analytics event sent:", e, n, i, o), void 0 !== window.ga && (window.ga("main.send", "event", e, n, i, o), window.ga("reg.send", "event", e, n, i, o)), a.sendYandexEvent({
                        category: e,
                        event: n,
                        label: i
                    }), void 0 !== window.fbq)) {
                    var s = [e, n, i].filter(Boolean).join("_");
                    window.fbq("track", s)
                }
            },
            sendYandexEvent: function(e) {
                var t = function(e) {
                    var t = "";
                    e.label && (t = "_" + e.label), window.yaMetrikaInstance.reachGoal(e.category + "_" + e.event + t)
                };
                window.yaMetrikaInstance ? t(e) : (o.push(e), window.yaMetrikaLoadedCallback = window.yaMetrikaLoadedCallback || function() {
                    o.forEach(t), a.sendYandexEvent = t
                })
            }
        };
    return e(function() {
        var e = s();
        for (var t in e) a.trackAnalyticsEvent(e[t].category, e[t].event, e[t].label, parseInt(e[t].value, 10));
        n.removeItem(i)
    }), a
}), define("Utils/ShortCuts", ["jquery"], function(e) {
    var t = function(e, t, n, i, o) {
        this.masks = e, this.object = n, this.listener = t, this.checkTarget = i, this.lastResult = !1, this.timerId = null, this.generateEventWhenPressed = o, this.start()
    };
    t.prototype = {
        start: function() {
            this.enable(!0)
        },
        stop: function() {
            this.enable(!1), this.timerId && clearInterval(this.timerId)
        },
        isEnable: function() {
            return this.enabled
        },
        enable: function(e) {
            this.enabled = e
        },
        _check: function(e, t, n, i) {
            if (!this.isEnable()) return !1;
            if (this.checkTarget && t) return !1;
            if (this.object !== document && this.object !== n) return !1;
            if (this._checkMask(e, i)) {
                this.lastResult = !0;
                var o = this;
                window.setTimeout(function() {
                    o.listener(i)
                }, 0), this.timerId && window.clearInterval(this.timerId), this.generateEventWhenPressed && (this.timerId = window.setInterval(function() {
                    o.listener(i)
                }, 200))
            } else this.lastResult = !1;
            return this.lastResult
        },
        _checkMask: function(e, t) {
            for (var n = 0, i = this.masks.length; n < i; n++) {
                var o = this.masks[n];
                if (o === e) return !0;
                if (0 === o) return t.keyCode > 48 && t.keyCode < 112 && !t.ctrlKey && !t.altKey && void 0 !== t.metaKey && !t.metaKey
            }
            return !1
        },
        _keyUp: function() {
            this.timerId && clearInterval(this.timerId)
        }
    };
    var n = new function() {
        this.BACKSPACE = 8, this.TAB = 9, this.ENTER = 13, this.SHIFT = 16, this.CTRL = 17, this.ALT = 18, this.PAUSE = 19, this.CAPS_LOCK = 20, this.ESC = 27, this.SPACE = 32, this.PAGE_UP = 33, this.PAGE_DOWN = 34, this.END = 35, this.HOME = 36, this.LEFT_ARROW = 37, this.UP_ARROW = 38, this.RIGHT_ARROW = 39, this.DOWN_ARROW = 40, this.INSERT = 45, this.DELETE = 46, this.PLUS = 61, this.LEFT_WINDOW = 91, this.RIGHT_WINDOW = 92, this.SELECT = 93, this.PLUS_NUM = 107, this.MINUS = 109, this.MINUS_NUM = 109, this.NUM_1 = 49, this.F1 = 112, this.F2 = 113, this.F3 = 114, this.F4 = 115, this.F5 = 116, this.F6 = 117, this.F7 = 118, this.F8 = 119, this.F9 = 120, this.F10 = 121, this.F11 = 122, this.F12 = 123, this.NUM_LOCK = 144, this.SCROLL_LOCK = 145, this.SLASH = 191, this.ASTERISK = 106, this.KEY_B = 66, this.KEY_U = 85, this.KEY_I = 73, this.KEY_O = 79, this.typeDown = 1, this.typePress = 2, this.listDown = [], this.listPress = [], this._blocker = null, this._getMask = function(e, t) {
            var n = 0,
                i = void 0;
            if (e.key) n = e.key;
            else if (e.ch) {
                switch (t) {
                    case this.typeDown:
                        n = e.ch.toUpperCase();
                        break;
                    case this.typePress:
                        n = e.ch.toLowerCase()
                }
                n = n.charCodeAt(0)
            }
            return i = 65535 & n, e.ctrl && (i ^= 65536), e.alt && (i ^= 131072), e.shift && (i ^= 262144), i
        }, this._getMasks = function(e, t) {
            for (var n = e.length, i = [], o = 0; o < n; o++) i[o] = this._getMask(e[o], t);
            return i
        }, this._getMaskEvent = function(e, t) {
            var n = void 0;
            switch (t) {
                case this.typeDown:
                    return this._getMask(this._getSet(e.keyCode, e));
                case this.typePress:
                    return n = e.charCode ? e.charCode : e.keyCode, this._getMask(this._getSet(n, e))
            }
            return 0
        }, this._getSet = function(e, t) {
            return {
                key: e,
                ctrl: t.ctrlKey,
                alt: t.altKey,
                shift: t.shiftKey
            }
        }, this._isInputTarget = function(e) {
            if (!e.tagName) return !1;
            switch (e.tagName.toLowerCase()) {
                case "input":
                    switch (e.type) {
                        case "text":
                        case "password":
                        case "file":
                        case "search":
                        case "email":
                        case "tel":
                        case "number":
                            return !0
                    }
                    break;
                case "textarea":
                    return !0
            }
            return !1
        }, this._keyUpListener = function(e) {
            for (var t = 0, n = e.length; t < n; t++) e[t]._keyUp()
        }, this._keyListener = function(e, t, n) {
            for (var i = e.target, o = this._getMaskEvent(e, t), s = this._isInputTarget(i), a = !1, r = 0, l = n.length; r < l; r++) a = n[r]._check(o, s, i, e) || a;
            return a
        }, this.keyUpListener = function() {
            return this._keyUpListener(this.listDown)
        }, this.keyDownListener = function(e) {
            return this._keyListener(e, this.typeDown, this.listDown)
        }, this.keyPressListener = function(e) {
            return this._keyListener(e, this.typePress, this.listPress)
        }, this._action = function(e, n, i, o, s, a, r) {
            return void 0 === a && (a = !0), n.push(new t(this._getMasks(i, e), o, s || document, a, r)), n[n.length - 1]
        };
        var n = this,
            i = !1,
            o = void 0;
        this.init = function(t) {
            o = t,
                function t() {
                    e(o).on("keydown.jsxShortCuts", function(s) {
                        (i = n.keyDownListener(s)) && (s.preventDefault(), s.stopPropagation(), e(o).off("keydown.jsxShortCuts"), e(o).on("keyup.jsxShortCuts", function() {
                            n.keyUpListener(), e(o).off("keyup.jsxShortCuts"), t(), i = !1
                        }))
                    })
                }(), e(t).on("keypress", function(e) {
                    n.keyPressListener(e), i && (e.preventDefault(), e.stopPropagation())
                })
        }, this.down = function(e, t, n, i, o) {
            return this._action(this.typeDown, this.listDown, e, t, n, i, o)
        }, this.press = function(e, t, n, i) {
            return this._action(this.typePress, this.listPress, e, t, n, i)
        }, this.block = function() {
            this._blocker.start()
        }, this.unblock = function() {
            this._blocker.stop()
        }, this._blocker = this.down([{}], function() {})
    };
    return n.init(document), n
}), define("HH/MobilePayment", ["jquery", "HHC/Components"], function(e, t) {
    return t.build({
        defaults: {
            timeout: 5e3,
            urls: {
                initPayment: "/shards/mobile_payment/init_payment",
                paymentStatus: "/shards/mobile_payment/payment_status"
            }
        },
        create: function(t, n) {
            return new function(t, n) {
                this.params = n, this.init = function(t) {
                    this.$price = e(".HH-MobilePayment-Price", t), this.$priceValue = e(".HH-MobilePayment-Price-Value", t), this.$priceCurrency = e(".HH-MobilePayment-Price-Currency", t), this.$priceDefault = e(".HH-MobilePayment-Price-Default", t), this.$process = e(".HH-MobilePayment-Process", t), this.$error = e(".HH-MobilePayment-Error", t), this.$success = e(".HH-MobilePayment-Success", t), this.$errorTexts = e(".HH-MobilePayment-Error-Text", t), this.$errorUnknown = e(".HH-MobilePayment-Error-Unknown", t), this.$errorTryAnotherServiceLink = e(".HH-MobilePayment-Error-Try-Another-Service", t), this.$errorTryRepeatLink = e(".HH-MobilePayment-Error-Try-Repeat", t), this.$element = e(t), this.$element.on("checkNumber", this.checkNumber.bind(this)), this.initPaymentErrors = {
                        18: e(".HH-MobilePayment-Error-Number-Incorrect", t),
                        UNKNOWN_PHONE: e(".HH-MobilePayment-Error-Number-Incorrect", t),
                        INCORRECT_PHONE_COUNTRY: e(".HH-MobilePayment-Error-Number-Incorrect", t),
                        CANT_BILL: e(".HH-MobilePayment-Error-Can-Not-Pay", t)
                    }, this.paymentStatusErrors = {
                        4: e(".HH-MobilePayment-Error-Not-Enough-Money", t),
                        6: e(".HH-MobilePayment-Error-You-Decline-Service", t),
                        12: e(".HH-MobilePayment-Error-Operator-Not-Responded", t),
                        18: e(".HH-MobilePayment-Error-Can-Not-Pay", t),
                        19: e(".HH-MobilePayment-Error-Timeout", t)
                    }
                }, this.checkNumber = function(t, n, i) {
                    var o = this;
                    this.$success.addClass("g-hidden"), this.$error.addClass("g-hidden"), this.$process.removeClass("g-hidden"), this.$process.trigger("startLoading"), this.updatePrice(!1), i.phone = n, i.source = this.params.source, e.ajax({
                        url: this.params.urls.initPayment,
                        method: "get",
                        dataType: "json",
                        data: i,
                        cache: !1
                    }).done(function(s) {
                        o.$process.trigger("stopLoading"), s.error ? o.processError(o.initPaymentErrors, s) : (s.actualAmount && (o.$priceValue.text(s.actualAmount), o.$priceCurrency.addClass("g-hidden"), o.$priceCurrency.filter(function() {
                            return e(this).data("phone-info-code") === s.actualCurrency
                        }).removeClass("g-hidden"), o.updatePrice(!0)), i.paymentProviderOrderId = s.paymentProviderOrderId, o.$element.trigger("changeState", ["mobile-payment-body"]), o.$process.trigger("startLoading"), o.processPayment(t, n, i))
                    }).fail(this.processError.bind(this, this.initPaymentErrors))
                }, this.processPayment = function(t, n, i) {
                    var o = this;
                    e.ajax({
                        url: this.params.urls.paymentStatus,
                        method: "get",
                        dataType: "json",
                        data: i,
                        cache: !1
                    }).done(function(e) {
                        e.error ? o.processError(o.paymentStatusErrors, e) : (o.$error.addClass("g-hidden"), o.$process.toggleClass("g-hidden", !0 === e.success), o.$success.toggleClass("g-hidden", !0 !== e.success), !0 === e.success && (o.updatePrice(!1), o.$element.trigger("hideTitle"), o.$process.trigger("stopLoading")), e.loading && window.setTimeout(function() {
                            o.processPayment(t, n, i)
                        }, o.params.timeout))
                    }).fail(this.processError.bind(this, this.paymentStatusErrors))
                }, this.processError = function(e, t) {
                    this.$errorTryAnotherServiceLink.addClass("g-hidden"), this.$element.trigger("changeState", ["mobile-payment-body"]), this.$process.trigger("stopLoading"), this.$success.addClass("g-hidden"), this.$process.addClass("g-hidden"), this.$errorTexts.addClass("g-hidden"), t && e[t.error] ? (e[t.error].removeClass("g-hidden"), this.$errorTryAnotherServiceLink.removeClass("g-hidden")) : (this.$errorUnknown.removeClass("g-hidden"), this.$errorTryRepeatLink.removeClass("g-hidden")), this.$error.removeClass("g-hidden"), this.updatePrice(!1)
                }, this.updatePrice = function(e) {
                    this.$price.toggleClass("g-hidden", !e), this.$priceDefault.toggleClass("g-hidden", e)
                }, this.init(t, n)
            }(t, n)
        }
    })
}), define("Utils/SubmitPostData", ["jquery", "bloko/common/Cookies"], function(e, t) {
    var n = function(t, n) {
        return e('<input type="hidden">').attr({
            name: t,
            value: n
        })
    };
    return function(i, o, s, a) {
        var r = e("<form/>");
        r.attr({
            method: "post",
            action: i,
            style: "position: absolute; left: -9999px; top: -9999px"
        }), a && r.attr({
            target: a
        }), Object.keys(o).forEach(function(e) {
            Array.isArray(o[e]) ? o[e].forEach(function(t) {
                r.append(n(e, t))
            }) : r.append(n(e, o[e]))
        }), s || r.append(n("_xsrf", t.get("_xsrf"))), r.appendTo("body").submit()
    }
}), define("bloko/common/urlParser", [], function() {
    function e(e) {
        if (!e || "[object Object]" !== Object.prototype.toString.call(e)) throw new TypeError("GET параметры должны быть объектом.");
        var t = [],
            n = function(e, t) {
                try {
                    return encodeURIComponent(e) + "=" + encodeURIComponent(t)
                } catch (n) {
                    return e + "=" + t
                }
            };
        for (var i in e) {
            if (!(e[i] instanceof Array)) throw new TypeError("Значение параметра должно быть массивом");
            t.push(e[i].map(n.bind(null, i)).join("&"))
        }
        return t.join("&")
    }
    return function(t) {
        var n = document.createElement("a");
        n.href = t;
        var i, o, s = {
            params: a(n.search),
            protocol: n.protocol,
            hostname: n.hostname,
            host: n.host,
            port: n.port,
            pathname: n.pathname,
            search: n.search,
            hash: n.hash
        };
        return i = s, o = !0, Object.defineProperty(i, "href", {
            get: function() {
                return n.search = e(i.params), n.pathname = i.pathname, n.hash = i.hash, [n.protocol, "//", i.host, i.pathname, n.search, n.hash].join("")
            },
            set: function(e) {
                n.href = e, i.params = a(n.search)
            },
            enumerable: o
        }), Object.defineProperty(i, "search", {
            get: function() {
                n.search = e(i.params);
                try {
                    return decodeURIComponent(n.search)
                } catch (e) {
                    return n.search
                }
            },
            set: function(e) {
                n.search = e, i.params = a(n.search)
            },
            enumerable: o
        }), Object.defineProperty(i, "host", {
            get: function() {
                return n.hostname + ("" === i.port ? "" : ":" + i.port)
            },
            set: function(e) {
                var t = e.split(":");
                n.hostname = t[0], i.port = t[1] || "80"
            },
            enumerable: o
        }), Object.defineProperty(i, "hostname", {
            get: function() {
                return n.hostname
            },
            set: function(e) {
                n.hostname = e
            },
            enumerable: o
        }), Object.defineProperty(i, "port", {
            get: function() {
                return "0" === n.port || "80" === n.port ? "" : n.port
            },
            set: function(e) {
                if (isNaN(parseInt(e, 10))) throw new TypeError("Порт должен быть числом");
                n.port = e
            },
            enumerable: o
        }), Object.defineProperty(i, "protocol", {
            get: function() {
                return ":" === n.protocol ? window.location.protocol : n.protocol
            },
            set: function(e) {
                n.protocol = e || window.location.protocol
            }
        }), Object.defineProperty(i, "pathname", {
            get: function() {
                return 0 === n.pathname.indexOf("/") ? n.pathname : "/" + n.pathname
            },
            set: function(e) {
                n.pathname = e
            }
        }), s;
        function a(e) {
            return "?" !== e[0] ? {} : e.slice(1).split("&").reduce(function(e, t) {
                var n = t.split("="),
                    i = void 0,
                    o = void 0;
                try {
                    i = decodeURIComponent(n[0]), o = n[1] ? decodeURIComponent(n[1]) : ""
                } catch (e) {
                    i = n[0], o = n[1] || ""
                }
                return e[i] = [].concat(e[i] || [], o), e
            }, {})
        }
    }
}), define("Utils/AssistPayment", ["jquery", "Utils/SubmitPostData", "bloko/common/urlParser"], function(e, t, n) {
    function i(e) {
        return Object.keys(e.params).reduce(function(t, n) {
            if (0 === n.indexOf("utm_")) {
                var i = n + "=" + e.params[n];
                t = t ? t + "&" + i : i
            }
            return t
        }, "")
    }
    return function(o, s) {
        var a = n(location.href),
            r = i(a);
        if ("" !== r) o.utmParams = r;
        else {
            var l = n(document.referrer);
            "" !== (r = i(l)) ? o.utmParams = r: void 0 !== a.params.from && void 0 !== a.params.from[0] ? o.fromParam = a.params.from[0] : void 0 !== l.params.from && void 0 !== l.params.from[0] && (o.fromParam = l.params.from[0])
        }
        return e.ajax({
            type: "post",
            dataType: "json",
            url: s ? "/applicant/services/assist/init/multi" : "/applicantservice/assist/emoneyassistinitpayment",
            data: o,
            traditional: !0
        }).then(function(e) {
            t(e.action, e.fields)
        })
    }
}), define("bloko/common/validitySetter", ["jquery"], function(e) {
    var t = {
        "bloko-input": "bloko-input_invalid",
        "bloko-select": "bloko-select_invalid",
        "bloko-textarea": "bloko-textarea_invalid",
        "bloko-custom-select": "bloko-custom-select_invalid",
        "bloko-checkbox": "bloko-checkbox_invalid",
        "bloko-radio": "bloko-radio_invalid",
        "bloko-button": "bloko-button_invalid"
    };
    return function(n) {
        var i = e(n);
        if (!i.data("validity-setter")) {
            var o = !1,
                s = function() {
                    for (var e in t)
                        if (i.hasClass(e)) return t[e];
                    return null
                }();
            i.on("setInvalid", function() {
                o = !0, s && i.addClass(s)
            }.bind(null)), i.on("setValid", function() {
                o && (o = !1, s && i.removeClass(s))
            }.bind(null)), i.on("focusin", function() {
                s && i.removeClass(s)
            }), i.on("focusout", function() {
                o && s && i.addClass(s)
            }), i.data("validity-setter", !0)
        }
    }
}), define("bloko/common/tooltipHelper", ["bloko/common/metrics"], function(e) {
    var t, n = {
            top: "top",
            bottom: "bottom",
            right: "right",
            left: "left"
        },
        i = function(t, n) {
            return e.getMetrics(t || n.parentNode)
        };
    return {
        cssClasses: {
            arrowClasses: (t = {}, t[n.top] = "bloko-tooltip_top", t[n.left] = "bloko-tooltip_left", t[n.right] = "bloko-tooltip_right", t[n.bottom] = "bloko-tooltip_bottom", t),
            types: {
                error: "bloko-tooltip_error",
                custom: "bloko-tooltip_custom",
                info: "bloko-tooltip_info",
                infoTip: "bloko-tooltip_info-tip"
            },
            layers: {
                floating: "bloko-tooltip_layer-floating",
                overlay: "bloko-tooltip_layer-overlay",
                topmost: "bloko-tooltip_layer-topmost",
                aboveContent: "bloko-tooltip_layer-above-content",
                overlayContent: "bloko-tooltip_layer-overlay-content",
                aboveOverlayContent: "bloko-tooltip_layer-above-overlay-content"
            },
            hidden: "bloko-tooltip_hidden"
        },
        positions: n,
        DEBOUNCE_MS: 100,
        SHOW_TIMEOUT_MS: 100,
        getInitialCSSMetrics: function(t, n, o) {
            return {
                left: -9999,
                top: -9999,
                maxWidth: Math.min(360, o ? i(t, n).width : e.getViewportMetrics().width)
            }
        },
        getRenderParams: function(t) {
            var o = t.position,
                s = t.element,
                a = t.tooltip,
                r = t.insideHost,
                l = t.host,
                c = [o],
                d = l === document.body ? e.getMetrics(s) : e.getRelativeMetrics(s),
                h = e.getMetrics(a),
                u = e.getViewportMetrics(),
                p = i(l, s),
                m = e.getMetrics(s),
                f = void 0,
                g = void 0,
                b = void 0,
                v = {
                    left: m.left - d.left,
                    top: m.top - d.top
                };
            if (n[o]) {
                for (var k, y, w, H, S, C, T, E, _, $, M, I, x, B, O, D, A, L, P, N, V = Object.keys(n).map(function(e) {
                        return n[e]
                    }), R = 0; R < V.length; R++) V[R] !== o && c.push(V[R]);
                for (var F = 0; F < c.length; F++) {
                    if (S = {
                            position: c[F],
                            elementMetrics: d,
                            tooltipMetrics: h,
                            viewportMetrics: u,
                            hostMetrics: p,
                            insideHost: r,
                            elementOffset: v
                        }, C = void 0, T = void 0, E = void 0, _ = void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, L = void 0, void 0, void 0, $ = S.position, M = S.elementMetrics, I = S.tooltipMetrics, x = S.viewportMetrics, B = S.hostMetrics, O = S.insideHost, D = S.elementOffset, A = {
                            top: {
                                metrics: {
                                    top: M.top - I.height - 5 - 10
                                },
                                positionArg: n.left,
                                sizeArg: "width"
                            },
                            bottom: {
                                metrics: {
                                    top: M.top + M.height + 5 + 10
                                },
                                positionArg: n.left,
                                sizeArg: "width"
                            },
                            left: {
                                metrics: {
                                    left: M.left - I.width - 5 - 10
                                },
                                positionArg: n.top,
                                sizeArg: "height"
                            },
                            right: {
                                metrics: {
                                    left: M.left + M.width + 5 + 10
                                },
                                positionArg: n.top,
                                sizeArg: "height"
                            }
                        }, L = A[$].metrics, P = A[$].positionArg, N = A[$].sizeArg, L[P] = M[P] + (M[N] - I[N]) / 2, O && (L[P] < 0 ? L[P] = 0 : L[P] + I[N] > B[N] && (L[P] = B[N] - I[N])), g = {
                            metrics: L,
                            success: e.isRectangleInRectangle((T = I, E = D, (_ = {
                                left: (C = L).left + E.left,
                                top: C.top + E.top
                            }).bottom = _.top + T.height, _.right = _.left + T.width, _), O ? B : x)
                        }, r && (k = c[F], y = d, w = h, H = g.metrics, b = k === n.top || k === n.bottom ? {
                            left: Math.min(Math.max(y.left - H.left + y.width / 2, 10), w.width - 20)
                        } : {
                            top: Math.min(Math.max(y.top - H.top + y.height / 2, 10), w.height - 20)
                        }), g.success) return {
                        position: c[F],
                        metrics: g.metrics,
                        arrowPosition: b
                    };
                    0 === F && ((f = g).position = c[F], f.arrowPosition = b)
                }
                return f || void 0
            }
        }
    }
});
_extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
    }
    return e
};
define("bloko/common/tooltipModule", ["jquery", "underscore", "bloko/common/events", "bloko/common/metrics", "bloko/common/requestAnimation", "bloko/common/tooltipHelper"], function(e, t, n, i, o, s) {
    var a = s.cssClasses,
        r = _extends({}, a.layers, {
            "above-content": a.layers.aboveContent,
            "overlay-content": a.layers.overlayContent,
            "above-overlay-content": a.layers.aboveOverlayContent
        }),
        l = function(t, i, o) {
            this.$element = e(t), this.params = e.extend({}, this._defaults, o), this.$host = this.params.host ? this.$element.closest(this.params.host) : null, this.$tooltip = e(i), this.$content = e(".Bloko-Tooltip-Content", this.$tooltip), this.$arrow = e(".Bloko-Tooltip-Arrow", this.$tooltip), this.isVisible = !1, this.events = n.extend({}), this.$tooltip.css(s.getInitialCSSMetrics(this.$host && this.$host.get(0), this.$element.get(0)))
        };
    return l.prototype = {
        _defaults: {
            position: s.positions.top,
            message: "",
            host: null,
            showImmediate: !1,
            type: "info",
            layer: "above-content"
        },
        _applyOptions: function() {
            for (var e in this.params.template ? this.$tooltip.html(this.params.template.render(this.params.templateJSON)) : this.params.html ? this.$content.html(this.params.html) : this.$content.text(this.params.message), a.types) this.$tooltip.toggleClass(a.types[e], this.params.type === e);
            for (var t in r) this.$tooltip.toggleClass(r[t], this.params.layer === t);
            this.$host = this.params.host ? this.$element.closest(this.params.host) : null
        },
        setOptions: function(t) {
            this.params = e.extend({}, this._defaults, this.params, t), this._applyOptions(), this.isVisible && this._render()
        },
        _putTooltip: function() {
            this._applyOptions(), this.$host ? this.$host.append(this.$tooltip) : this.$tooltip.insertAfter(this.$element)
        },
        _resizeRender: function() {
            this.isVisible && (this.hide(), this._render())
        },
        _render: function() {
            this._putTooltip(), this.events._trigger("render");
            var n = function(n) {
                    var i = n.position,
                        r = n.metrics,
                        l = n.arrowPosition;
                    this.$tooltip.removeClass(t.values(a.arrowClasses).join(" ")), this.$tooltip.addClass(a.arrowClasses[i]).removeClass(a.hidden).css(r), this.isVisible = !0, l && this.$arrow.css(l), this.resizeHandlerAdded || (e(window).on("resize", t.debounce(o(this._resizeRender.bind(this)).bind(this), s.DEBOUNCE_MS)), this.resizeHandlerAdded = !0)
                }.bind(this),
                i = s.getRenderParams({
                    position: this.params.position,
                    element: this.$element.get(0),
                    tooltip: this.$tooltip.get(0),
                    insideHost: this.params.insideHost,
                    host: this.$host && this.$host.get(0)
                });
            i && n(i)
        },
        show: function() {
            this.isVisible || (this.params.showImmediate ? this._render() : this.handle = window.setTimeout(this._render.bind(this), 100))
        },
        hide: function() {
            this.handle && window.clearTimeout(this.handle), this.isVisible = !1, this.$tooltip.addClass(a.hidden).css("width", "").remove()
        }
    }, l
}), define("bloko/blocks/tooltip/tooltip.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.b('<div class="bloko-tooltip bloko-tooltip_hidden">'), i.b("\n" + n), i.b('    <div class="Bloko-Tooltip-Content"></div>'), i.b("\n" + n), i.b('    <div class="Bloko-Tooltip-Arrow bloko-tooltip__arrow"></div>'), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/blocks/tooltip/tooltip", ["jquery", "bloko/common/core/Components", "bloko/common/tooltipModule", "bloko/blocks/tooltip/tooltip.mustache"], function(e, t, n, i) {
    var o = void 0,
        s = [];
    var a = t.build({
        defaults: {
            closeByClick: !1
        },
        create: function(t, s) {
            return new function(t, s) {
                var a = e(t),
                    r = new n(t, i.render(), e.extend({}, s, l()));
                function l() {
                    return {
                        message: s.message || a.data("tooltip-message"),
                        position: a.data("tooltip-position") || s.position
                    }
                }
                function c(t) {
                    e(t.target).closest(a).length || r.hide()
                }
                function d() {
                    r.hide()
                }
                return s.closeByClick && e(document).on("click", c), {
                    show: function() {
                        r.isVisible || (o && o.hide(), o = this, r.show())
                    },
                    hide: d,
                    toggle: function(e) {
                        var t = e;
                        0 === arguments.length && (t = !r.isVisible), t ? this.show() : d()
                    },
                    changeOptions: function(t) {
                        r.setOptions(e.extend({}, l(), t)), t.closeByClick ? e(document).on("click", c) : e(document).off("click", c)
                    }
                }
            }(t, s)
        }
    });
    return {
        getInstance: function(n, i) {
            var o = i || {},
                r = e(n),
                l = r.data("tooltip-id");
            return s[l] ? s[l].changeOptions(o) : (l = s.push(t.make(a, r[0], o)) - 1, r.data("tooltip-id", l)), s[l]
        }
    }
}), define("HH/ApplicantServicesPayment", ["jquery", "HHC/Analytics", "HHC/Components", "Utils/AssistPayment", "bloko/common/validitySetter", "bloko/blocks/tooltip/tooltip"], function(e, t, n, i, o, s) {
    var a = {
            CAREER_GUIDANCE: "profor_test",
            COMPLETE_RESUME: "gotovoe_resume"
        },
        r = {
            CREDIT_CARD: {
                regular: "CARD",
                validCode: "_VALIDPROMOCODE",
                invalidCode: "_INVALIDPROMOCODE"
            },
            YANDEX_MONEY: "YM",
            WEBMONEY: "WM"
        };
    return n.build({
        create: function(n, l) {
            return new function(n, l) {
                this.$element = e(n), this.element = n, this.params = l, this.init = function(t, n) {
                    this.paysystemType = this.params.payVariant, this.services = [n.serviceType], this.originService = n.serviceType, this.numberOfUnits = this.params.numberOfUnits || 1, this.priceUrl = n.multiServices ? "/applicant/services/price" : "/applicant/services/prices", this.$price = e(".HH-ApplicantServices-Price", this.$element), this.$error = e(".HH-ApplicantServicesPayment-Error", this.$element), this.$showPromocode = e(".HH-ApplicantServices-Promocode", this.$element), this.$hidePromocode = e(".HH-ApplicantServices-Promocode-Hide", this.$element), this.$showPromocode.on("click", this.showPromocode.bind(this)), this.$hidePromocode.on("click", this.hidePromocode.bind(this)), this.$promocodeInput = e(".HH-Promocode-Value", this.$element), this.promocodeEnabled = 0 !== this.$promocodeInput.length, this.promocodeEnabled && (this.$promocodeInput.on("valuechange", this.recalculatePrice.bind(this)), o(this.$promocodeInput)), this.$promocodeInputValidity = e(".HH-Promocode-Validation", this.$element), this.$element.on("ApplicantServices-AssistPayment", this.initAssistPayment.bind(this)), this.$submit = e(".HH-ApplicantServicesPayment-Submit", this.$element), this.$submit.on("click", this.prepareParameters.bind(this)), this.validCode = !1, this.$promocodeErrorMessage = e(".HH-Promocode-Error", this.element), this.$reloadPromocode = e(".HH-Promocode-Reload", this.element), this.$reloadPromocode.on("click", this.recalculatePrice.bind(this))
                }, this.changeNumberOfUnits = function(e) {
                    this.numberOfUnits = e, this.recalculatePrice()
                }, this.changePaySystem = function(e) {
                    this.paysystemType = e
                }, this.changeServices = function(e) {
                    this.services = e, this.recalculatePrice()
                }, this.recalculatePrice = function() {
                    var e = this;
                    this.$promocodeErrorMessage.addClass("g-hidden"), this.tooltip && this.tooltip.hide();
                    var t = this.promocodeEnabled ? this.$promocodeInput.val().trim() : null;
                    window.clearTimeout(this.timeout), this.timeout = window.setTimeout(function() {
                        e.applyDiscount(t)
                    }, 400)
                }, this.applyDiscount = function(t) {
                    var n = this;
                    this.$price.trigger("startLoading"), this.tooltip && this.tooltip.hide();
                    var i = {
                        promocode: t,
                        services: this.services,
                        numberOfUnits: this.numberOfUnits
                    };
                    l.multiServices && (i.assistPaymentMeans = this.paysystemType), e.ajax({
                        type: "get",
                        dataType: "json",
                        url: this.priceUrl,
                        data: i,
                        traditional: !0
                    }).done(function(e) {
                        var t = e[n.paysystemType];
                        if (n.checkStateIntegrity(t)) {
                            void 0 !== t.promoCode && (n.validCode = t.promoCode.valid), void 0 === t.promoCode || n.validCode || n.promocodeEnabled && "" === n.$promocodeInput.val().trim() ? n.$promocodeInput.trigger("setValid") : n.promocodeEnabled && "" !== n.$promocodeInput.val().trim() && (n.$promocodeInput.trigger("setInvalid"), n.tooltip = s.getInstance(n.$promocodeInput, {
                                message: t.promoCode.message,
                                position: "top",
                                manual: !0,
                                closeByClick: !0
                            }), n.tooltip.show()), n.$price.html(t.amount), n.$price.trigger("stopLoading");
                            var i = void 0;
                            i = n.validCode ? "validCode" : "" === n.$promocodeInput.val().trim() ? null : "invalidCode", n.$promocodeInput.data("valid", i)
                        } else n.$price.trigger("stopLoading")
                    }).fail(function() {
                        n.$price.trigger("stopLoading"), n.services.length > 0 && n.$promocodeErrorMessage.removeClass("g-hidden")
                    })
                }, this.checkStateIntegrity = function(e) {
                    return void 0 === e.promoCode || !this.promocodeEnabled || e.promoCode.code === this.$promocodeInput.val().trim()
                }, this.showPromocode = function() {
                    this.$promocodeInputValidity.removeClass("g-hidden"), this.$showPromocode.addClass("g-hidden"), this.$promocodeInput.focus()
                }, this.hidePromocode = function() {
                    this.$promocodeInputValidity.addClass("g-hidden"), this.$showPromocode.removeClass("g-hidden")
                }, this.trackAnalytics = function() {
                    var e = this.params.analyticParams || this.getAnalyticParams();
                    e && t.trackAnalyticsEvent(e.category, e.action, e.label), this.promocodeEnabled && "" !== this.$promocodeInput.val().trim() || t.trackAnalyticsEvent("payment_applicantservices", "payment_selected", "all_payments")
                }, this.initAssistPayment = function(e, t) {
                    if (this.$error.addClass("g-hidden"), this.trackAnalytics(), this.promocodeEnabled) {
                        var n = this.$promocodeInput.val().trim();
                        "" !== n && (t.promoCode = n)
                    }
                    t.source = this.params.source, t.numberOfUnits = this.numberOfUnits, i(t, l.multiServices).fail(this.processSubmitError.bind(this))
                }, this.processSubmitError = function() {
                    this.$error.removeClass("g-hidden")
                }, this.prepareParameters = function() {
                    var e = {
                        emoneyType: this.paysystemType
                    };
                    e[this.services] = "", this.params.backUrl && (e.backUrl = this.params.backUrl), this.params.numberOfUnits && (e.coursesNumber = this.params.numberOfUnits), this.$element.trigger("ApplicantServices-AssistPayment", e)
                }, this.getAnalyticParams = function() {
                    var e = this.params.analyticsAction;
                    2 === this.services.length ? e += "_2" : 1 === this.services.length && this.originService !== this.services[0] && (e += "_1");
                    var t = {
                            category: this.params.analyticsCategory || a[this.services[0]],
                            action: e
                        },
                        n = void 0;
                    if ("CREDIT_CARD" === this.paysystemType) {
                        var i = this.$promocodeInput.data("valid"),
                            o = r[this.paysystemType];
                        n = o.regular, o[i] && (n += o[i])
                    } else n = r[this.paysystemType];
                    return t.label = n, t
                }, this.init(n, l)
            }(n, l)
        }
    })
}), define("HH/ApplicantServices", ["jquery", "HHC/Components", "HHC/Analytics", "Utils/ShortCuts", "HH/MobilePayment", "bloko/blocks/popup/popup", "HH/ApplicantServicesPayment", "bloko/blocks/tooltip/tooltip", "bloko/common/valuechange"], function(e, t, n, i, o, s, a, r) {
    return t.build({
        defaults: {
            employerId: "",
            resumeId: ""
        },
        create: function(l, c) {
            var d = e(l),
                h = c.pageType,
                u = d.find(".HH-ApplicantServices-Title"),
                p = e(".HH-ApplicantServices-Contract-Popup", d),
                m = e(".HH-ApplicantServices-ConfirmNumber-Input", d),
                f = e(".HH-ApplicantServices-Contract-Body", p),
                g = e(".HH-ApplicantServices-Resume", d),
                b = e(".HH-ApplicantServices-ResumeList", d),
                v = e(".HH-ApplicantServices-PaymentSystems", d),
                k = e(".HH-ApplicantServices-NumberOfUnits", d),
                y = e(".HH-ApplicantServices-ConfirmNumber-Button", d),
                w = d.find(".HH-ApplicantService-PaymentType"),
                H = d.find(".HH-ApplicantServices-AgreementLink"),
                S = d.find(".HH-ApplicantServices-Service"),
                C = S.length,
                T = d.find(".HH-ApplicantServices-PayVariant"),
                E = void 0,
                _ = 1,
                $ = void 0,
                M = void 0;
            function I() {
                m.length && y.prop("disabled", !m.val().length || 1 !== _)
            }
            function x() {
                return d.find(".HH-ApplicantServices-Service:checked").map(function() {
                    return e(this).attr("data-hh-applicant-services-service")
                }).get()
            }
            function B() {
                _ = d.find(".HH-ApplicantServices-Service:checked").length, I(), d.find(".HH-ApplicantServices-AssistPayment").prop("disabled", 0 === _), H.toggleClass("g-hidden", 0 === _), _ > 1 && "SMSONLINE" === w.val() && (w.val(w.find("option[value!='SMSONLINE']").val()).change(), $ || ($ = r.getInstance(w.get(0), {
                    message: c.trl.smsTooltip,
                    position: "top",
                    manual: !0,
                    closeByClick: !0
                })), window.setTimeout(function() {
                    $.show()
                }, 0)), w.find("option[value='SMSONLINE']").prop("disabled", _ > 1), M && M.changeServices(x())
            }
            function O(e) {
                d.removeClass("applicant-services_" + h).addClass("applicant-services_" + e), b.prop("disabled", -1 !== ["confirm", "mobile-payment-body"].indexOf(e)), h = e, d.trigger("stopLoading")
            }
            function D() {
                void 0 !== A() && O("payment")
            }
            function A() {
                return b.find(":radio:checked").val()
            }
            function L(t) {
                var i = t.target;
                d.trigger("startLoading");
                var o = P(c.type);
                o.type = c.type;
                var s = i.getAttribute("data-hh-applicant-services-analytics-category"),
                    a = i.getAttribute("data-hh-applicant-services-analytics-action");
                s && a && n.trackAnalyticsEvent(s, a), e(".HH-MobilePayment", d).trigger("checkNumber", [m.val(), o])
            }
            function P() {
                return e.extend({}, c.query, {
                    resumeId: A()
                })
            }
            T.length && (M = t.make(a, T.get(0), {
                payVariant: w.val(),
                serviceType: c.serviceType,
                analyticsCategory: c.analyticsCategory,
                analyticsAction: c.analyticsAction,
                source: c.source,
                multiServices: C
            }), w.change(function() {
                M.changePaySystem(w.val())
            }), k.change(function() {
                M.changeNumberOfUnits(k.val())
            })), C && (S.filter("[data-hh-applicant-services-service='" + c.serviceType + "']").prop("checked", "checked"), B(), S.on("click", B)), "login" !== h ? (function() {
                (function() {
                    y.on("click", L.bind(this)), e(".HH-ApplicantServices-Back", d).on("click", function(e) {
                        e.preventDefault(), u.removeClass("g-hidden"), O("payment")
                    }.bind(this)), v.on("click", ".HH-ApplicantServices-AssistPayment", function(t) {
                        var n = t.target,
                            i = P();
                        i.emoneyType = w.val(), "" !== c.successUrl && (i.backUrl = c.successUrl), C ? i.serviceName = x() : i[c.serviceType] = "", e(n).trigger("ApplicantServices-AssistPayment", i)
                    }.bind(this)), e(".HH-ApplicantServices-Contract-Switcher", d).on("click", function(n) {
                        n.preventDefault(), E || (E = t.make(s, p.get(0))), d.trigger("Bloko-Toggle-ConfigureClose", !1), p.on("hid.popup", function() {
                            d.trigger("Bloko-Toggle-ConfigureClose", !0)
                        });
                        var i = c.serviceType;
                        if (C) {
                            if (!(i = x()).length) return;
                            i = i.length > 1 ? "RESUME_MARK_RENEWAL" : i[0]
                        }
                        f.html(""), E.show(), e.ajax({
                            url: "/applicant/services/contract",
                            method: "GET",
                            dataType: "html",
                            data: {
                                serviceType: i,
                                type: "popup"
                            }
                        }).then(function(e) {
                            f.html(e)
                        })
                    }.bind(this)), e(".HH-ApplicantServices-Contract-Close", d).on("click", function(e) {
                        e.preventDefault(), e.stopPropagation(), E.hide()
                    }), e(".HH-ApplicantServices-MobilePayment-Tab", d).on("click", function() {
                        m.focus()
                    }), m.on("valuechange", I), m.on("keydown", function(e) {
                        e.which === i.ENTER && m.val().length && (e.preventDefault(), e.stopPropagation(), L())
                    }), I()
                })(), D(), b.on("change", D.bind(this)), 1 === g.length && e(".HH-ApplicantServices-Back-Success", d).addClass("g-hidden");
                var n = e(".HH-MobilePayment", d);
                n.length && t.make(o, n.get(0), {
                    source: c.source
                })
            }(), d.on("changeState", function(e, t) {
                O(t)
            })) : d.find(".HH-ApplicantServices-Title").removeClass("g-hidden")
        }
    })
}), define("HH/Message", ["jquery", "HHC/Components"], function(e, t) {
    return t.build({
        defaults: {
            className: {
                hidden: "g-hidden"
            }
        },
        create: function(t, n) {
            return new function(t, n) {
                this.$element = e(t), this.params = n, this.bindings = {
                    name: '[data-message-name="%s"]',
                    group: '[data-message-group="%s"]'
                }, this.init = function() {
                    this.$element.on({
                        showMessage: function(t, n) {
                            if (n && n.name) {
                                var i = this.selector("name", n.name),
                                    o = this.selector("group", n.group),
                                    s = this.$element.find(i),
                                    a = e();
                                n.group && (a = this.$element.find(o), s = s.filter(o)), n.content && s.html(n.content), this.toggle(a.not(s), !1), this.toggle(s, !0), t.stopPropagation()
                            }
                        }.bind(this),
                        hideMessage: function(e, t) {
                            if (t && (t.name || t.group)) {
                                var n = void 0;
                                t.name ? (n = this.$element.find(this.selector("name", t.name)), t.group && (n = n.filter(this.selector("group", t.group)))) : n = this.$element.find(this.selector("group", t.group)), this.toggle(n, !1), e.stopPropagation()
                            }
                        }.bind(this)
                    })
                }, this.selector = function(e, t) {
                    return this.bindings[e].replace("%s", t)
                }, this.toggle = function(e, t) {
                    e.toggleClass(this.params.className.hidden, !t)
                }, this.init(t, n)
            }(t, n)
        }
    })
}), define("HH/BlacklistStateChange", ["jquery", "HHC/Components", "HH/Message", "bloko/blocks/dropdown/dropdown"], function(e, t, n, i) {
    function o(n, o) {
        var s = e(n),
            a = t.make(i, n, {
                width: "low",
                placement: "bottom",
                align: "left"
            }),
            r = o.trl.common,
            l = null,
            c = e(".HH-BlacklistChangeState-RemoveEmployer", s),
            d = e(".HH-BlacklistChangeState-RemoveVacancy", s),
            h = e(".HH-BlacklistChangeState-AddToBlacklist", s),
            u = e(".HH-BlacklistChangeState-AddEmployer", s),
            p = e(".HH-BlacklistChangeState-AddVacancy", s),
            m = e(".HH-BlacklistChangeState-Vacancy", s),
            f = e(".HH-BlacklistChangeState-VacancyLimit", s),
            g = e(".HH-BlacklistChangeState-Employer", s),
            b = e(".HH-BlacklistChangeState-EmployerLimit", s),
            v = e(".HH-BlacklistState-HintForAddition", s);
        c.on("click", function() {
            w("/applicant/blacklist/employer/remove", {
                delId: o.employerId
            }).then(function() {
                a.hide(), y("vacancyAndEmployerIsBlacklisted" === l ? "vacancyIsBlacklisted" : "notInBlacklist")
            }, S("errorRemove"))
        }), d.on("click", function() {
            w("/applicant/blacklist/vacancy/remove", {
                delId: o.vacancyId
            }).then(function() {
                a.hide(), y("notInBlacklist")
            }, S("errorRemove"))
        }), u.on("click", function() {
            w("/applicant/blacklist/employer/add", {
                employerId: o.employerId
            }).then(function() {
                a.hide(), y("employerIsBlacklisted"), s.trigger("Bloko-Toggle-Click", "collapse")
            }, H(g, b))
        }), p.on("click", function() {
            w("/applicant/blacklist/vacancy/add", {
                vacancyId: o.vacancyId
            }).then(function() {
                a.hide(), y("vacancyIsBlacklisted"), s.trigger("Bloko-Toggle-Click", "collapse")
            }, H(m, f))
        });
        var k = {
            vacancyAndEmployerIsBlacklisted: d,
            employerIsBlacklisted: c,
            vacancyIsBlacklisted: d,
            notInBlacklist: h
        };
        function y(e) {
            l = e, Object.keys(k).forEach(function(e) {
                k[e].addClass("g-hidden")
            }), k[l].removeClass("g-hidden")
        }
        function w(t, n) {
            return C(), e.ajax({
                url: t,
                type: "post",
                data: n
            })
        }
        function H(e, t) {
            return function(n) {
                if (409 === n.status) return e.addClass("g-hidden"), void t.removeClass("g-hidden");
                a.hide(), S("errorAdd")()
            }
        }
        function S(e) {
            return function() {
                s.trigger("showMessage", {
                    name: e,
                    content: r
                })
            }
        }
        function C() {
            s.trigger("hideMessage", {
                group: "errors"
            })
        }
        return s.on("Bloko-Toggle-Switch", C), {
            setState: y,
            limitReached: function() {
                v.removeClass("g-hidden"), u.addClass("g-hidden")
            }
        }
    }
    return t.build({
        create: function(e, t) {
            return new o(e, t)
        }
    })
}), define("HH/BlacklistState", ["jquery", "HHC/Components", "HH/BlacklistStateChange"], function(e, t, n) {
    return t.build({
        create: function(i, o) {
            return new function(i, o) {
                var s = e(i),
                    a = t.make(n, s.get(0), o);
                e.ajax({
                    url: "/applicant/blacklist/state",
                    data: {
                        vacancyId: o.vacancyId,
                        employerId: o.employerId
                    },
                    type: "get",
                    dataType: "json"
                }).then(function(e) {
                    e.employerIsBlacklisted && e.vacancyIsBlacklisted ? a.setState("vacancyAndEmployerIsBlacklisted") : e.employerIsBlacklisted ? a.setState("employerIsBlacklisted") : e.vacancyIsBlacklisted ? a.setState("vacancyIsBlacklisted") : a.setState("notInBlacklist"), e.limitReached && a.limitReached()
                })
            }(i, o)
        }
    })
}), define("bloko/blocks/calendar/calendar.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.b('<div class="bloko-calendar">'), i.b("\n"), i.b("\n" + n), i.b('    <div class="bloko-calendar__switcher-wrapper">'), i.b("\n" + n), i.b('        <span class="bloko-calendar__switcher">'), i.b("\n" + n), i.b('            <span class="bloko-calendar__switcher-arrow'), i.b("\n" + n), i.b("                         bloko-calendar__switcher-arrow_back"), i.b("\n" + n), i.b('                         Bloko-Calendar-Previous"'), i.b("\n" + n), i.b('                  data-qa="bloko-calendar-prev-month">'), i.b("\n" + n), i.b("            </span>"), i.b("\n" + n), i.b("        </span>"), i.b("\n"), i.b("\n" + n), i.b('        <span class="bloko-calendar__name Bloko-Calendar-Month">'), i.b("\n" + n), i.b("            "), i.b(i.v(i.f("month", e, t, 0))), i.b(" "), i.b(i.v(i.f("year", e, t, 0))), i.b("\n" + n), i.b("        </span>"), i.b("\n"), i.b("\n" + n), i.b('        <span class="bloko-calendar__switcher">'), i.b("\n" + n), i.b('            <span class="bloko-calendar__switcher-arrow'), i.b("\n" + n), i.b("                         bloko-calendar__switcher-arrow_next"), i.b("\n" + n), i.b('                         Bloko-Calendar-Next"'), i.b("\n" + n), i.b('                  data-qa="bloko-calendar-next-month">'), i.b("\n" + n), i.b("            </span>"), i.b("\n" + n), i.b("        </span>"), i.b("\n" + n), i.b("    </div>"), i.b("\n"), i.b("\n" + n), i.b('    <ol class="bloko-calendar__days'), i.b("\n" + n), i.b('               bloko-calendar__days_lines">'), i.b("\n" + n), i.s(i.f("weekdays", e, t, 1), e, t, 0, 916, 1033, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.b('            <li class="bloko-calendar__day Bloko-Calendar-Weekday">'), i.b("\n" + n), i.b("                "), i.b(i.v(i.d(".", e, t, 0))), i.b("\n" + n), i.b("            </li>"), i.b("\n" + n)
            }), e.pop()), i.b("    </ol>"), i.b("\n"), i.b("\n" + n), i.b('    <ol class="bloko-calendar__days Bloko-Calendar-Dates">'), i.b("\n" + n), i.s(i.f("previous", e, t, 1), e, t, 0, 1138, 1327, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.b('            <li class="bloko-calendar__day'), i.b("\n" + n), i.b("                       bloko-calendar__day_disabled"), i.b("\n" + n), i.b('                       Bloko-Calendar-Date">'), i.b("\n" + n), i.b("                "), i.b(i.v(i.d(".", e, t, 0))), i.b("\n" + n), i.b("            </li>"), i.b("\n" + n)
            }), e.pop()), i.b("\n" + n), i.s(i.f("days", e, t, 1), e, t, 0, 1359, 1955, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.b('            <li class="bloko-calendar__day Bloko-Calendar-Date">'), i.b("\n" + n), i.b('                <span class="bloko-calendar__date-wrapper'), i.b("\n" + n), i.b('                             Bloko-Calendar-CurrentMonthDay"'), i.b("\n" + n), i.b('                      data-date="'), i.b(i.v(i.f("dayNumber", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('                      data-month="'), i.b(i.v(i.f("monthNumber", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('                      data-year="'), i.b(i.v(i.f("year", e, t, 0))), i.b('">'), i.b("\n" + n), i.b('                    <span class="bloko-calendar__date'), i.b("\n" + n), i.b("                                "), i.s(i.f("disabled", e, t, 1), e, t, 0, 1786, 1823, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b("bloko-calendar__date-wrapper_disabled")
                }), e.pop()), i.b('">'), i.b("\n" + n), i.b("                        "), i.b(i.v(i.f("dayNumber", e, t, 0))), i.b("\n" + n), i.b("                    </span>"), i.b("\n" + n), i.b("                </span>"), i.b("\n" + n), i.b("            </li>"), i.b("\n" + n)
            }), e.pop()), i.b("\n" + n), i.s(i.f("next", e, t, 1), e, t, 0, 1983, 2172, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.b('            <li class="bloko-calendar__day'), i.b("\n" + n), i.b("                       bloko-calendar__day_disabled"), i.b("\n" + n), i.b('                       Bloko-Calendar-Date">'), i.b("\n" + n), i.b("                "), i.b(i.v(i.d(".", e, t, 0))), i.b("\n" + n), i.b("            </li>"), i.b("\n" + n)
            }), e.pop()), i.b("    </ol>"), i.b("\n"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/blocks/calendar/calendarModel", ["backbone", "underscore"], function(e, t) {
    return e.Model.extend({
        constructor: function(t) {
            this.options = t;
            var n = this.getIntersectionPreviousMonth(t.initialDate),
                i = this.getCurrentOpenedDays(t.initialDate);
            e.Model.call(this, {
                currentOpenedDate: t.initialDate,
                selectedDate: null,
                disabledDates: t.disabledDates,
                month: this.options.translations.months[t.initialDate.getMonth()],
                monthNumber: t.initialDate.getMonth() + 1,
                year: t.initialDate.getFullYear(),
                weekdays: this.options.translations.weekdays,
                previous: n,
                days: i,
                next: this.getIntersectionNextMonth(n.concat(i)),
                canSwitchPreviousMonth: !0,
                canSwitchNextMonth: !0
            })
        },
        initialize: function() {
            this.on("change:currentOpenedDate", function(e, t) {
                var n = this.getIntersectionPreviousMonth(t),
                    i = this.getCurrentOpenedDays(t);
                this.set({
                    month: this.options.translations.months[t.getMonth()],
                    monthNumber: t.getMonth() + 1,
                    year: t.getFullYear(),
                    previous: n,
                    days: i,
                    next: this.getIntersectionNextMonth(n.concat(i))
                })
            })
        },
        getIntersectionPreviousMonth: function(e) {
            var n = this.getLastDate(this.getPreviousMonth(e));
            return t.range(n.getDate() - n.getDay() + 1, n.getDate() + 1)
        },
        getIntersectionNextMonth: function(e) {
            return t.range(1, 42 - e.length + 1)
        },
        getLastDate: function(e) {
            var t = this.getNextMonth(e);
            return t.setDate(0), t
        },
        getNextMonth: function(e) {
            return this._setMonth(e, function(e) {
                return e + 1
            })
        },
        getPreviousMonth: function(e) {
            return this._setMonth(e, function(e) {
                return e - 1
            })
        },
        getCurrentOpenedDays: function(e) {
            return t.map(t.range(1, this.getLastDate(e).getDate() + 1), function(e) {
                return {
                    dayNumber: e,
                    disabled: !1
                }
            })
        },
        isSameMonth: function(e, t) {
            return e && e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth()
        },
        _setMonth: function(e, t) {
            var n = new Date(e);
            return n.setDate(1), n.setMonth(t(n.getMonth())), n
        }
    })
}), define("bloko/blocks/calendar/calendar", ["backbone", "underscore", "jquery", "bloko/common/core/Components", "bloko/common/core/Debug", "bloko/blocks/calendar/calendar.mustache", "bloko/blocks/calendar/calendarModel", "bloko/common/supports", "bloko/common/events"], function(e, t, n, i, o, s, a, r, l) {
    var c = "bloko-calendar__date-wrapper_selected",
        d = "bloko-calendar__date-wrapper_disabled",
        h = "bloko-calendar__date-wrapper_today",
        u = "bloko-calendar__switcher-arrow_back-disabled",
        p = "bloko-calendar__switcher-arrow_next-disabled",
        m = ".Bloko-Calendar-Previous",
        f = ".Bloko-Calendar-Next",
        g = ".Bloko-Calendar-CurrentMonthDay",
        b = "Bloko-Calendar-DateSelected",
        v = e.View.extend({
            events: {
                "click .Bloko-Calendar-Previous": "previous",
                "click .Bloko-Calendar-Next": "next",
                "click .Bloko-Calendar-Dates": "select"
            },
            initialize: function() {
                this.listenTo(this.model, "change:disabledDates", this.disableDays), this.listenTo(this.model, "change:month", this.render), this.listenTo(this.model, "change:year", this.render), this.listenTo(this.model, "change:days", this.render), this.listenTo(this.model, "change:selectedDate", function() {
                    this.highlightSelectedDay(), this.trigger(b, this.model.get("selectedDate"))
                }), this.listenTo(this.model, "change:canSwitchPreviousMonth", this.disablePreviousMonthSwitcher), this.listenTo(this.model, "change:canSwitchNextMonth", this.disableNextMonthSwitcher), this.render(), this.model.options.selectedDate && this.selectDate(this.model.options.selectedDate)
            },
            render: function() {
                this.$calendar = n(this.template(this.model.toJSON())), this.disableDays(), this.highlightToday(), this.model.get("selectedDate") && this.highlightSelectedDay(), this.model.options.autoSelectFirstAvailableDate && !this.model.get("selectedDate") && this.autoSelectFirstAvailableDate(), this.model.options.range && this.setMonthSwitchers(), this.$el.html(this.$calendar)
            },
            setMonthSwitchers: function() {
                var e = new Date(this.model.get("currentOpenedDate").getFullYear(), this.model.get("currentOpenedDate").getMonth()).getTime();
                this.model.set("canSwitchPreviousMonth", new Date(this.model.options.range.from.getFullYear(), this.model.options.range.from.getMonth()).getTime() !== e), this.model.set("canSwitchNextMonth", new Date(this.model.options.range.to.getFullYear(), this.model.options.range.to.getMonth()).getTime() !== e)
            },
            template: function(e) {
                return s.render(e)
            },
            previous: function() {
                this.model.get("canSwitchPreviousMonth") && this.model.set("currentOpenedDate", this.model.getPreviousMonth(this.model.get("currentOpenedDate")))
            },
            next: function() {
                this.model.get("canSwitchNextMonth") && this.model.set("currentOpenedDate", this.model.getNextMonth(this.model.get("currentOpenedDate")))
            },
            disablePreviousMonthSwitcher: function() {
                n(m, this.$calendar).toggleClass(u, !this.model.get("canSwitchPreviousMonth"))
            },
            disableNextMonthSwitcher: function() {
                n(f, this.$calendar).toggleClass(p, !this.model.get("canSwitchNextMonth"))
            },
            select: function(e) {
                var t = n(e.target).closest(g),
                    i = t.data("date");
                if (i && !t.hasClass(d)) {
                    var o = new Date(this.model.get("currentOpenedDate"));
                    o.setDate(i), this.selectDate(o)
                }
            },
            selectDate: function(e) {
                this.model.isSameMonth(e, this.model.get("currentOpenedDate")) || this.model.set("currentOpenedDate", new Date(e.getFullYear(), e.getMonth())), this.model.set("selectedDate", e)
            },
            highlightSelectedDay: function() {
                this.model.isSameMonth(this.model.get("selectedDate"), this.model.get("currentOpenedDate")) && (n(g, this.$calendar).removeClass(c), n(g + "[data-date='" + this.model.get("selectedDate").getDate() + "']", this.$calendar).addClass(c))
            },
            getDisabledDays: function() {
                var e = this,
                    t = {},
                    n = this.model.get("year"),
                    i = this.model.get("monthNumber") - 1;
                return this.model.get("days").forEach(function(o) {
                    var s = new Date(n, i, o.dayNumber);
                    (e.isDisabledBeforeInitialDate(s) || e.isDisabledAfterInitialDate(s) || e.isDisabledWeekDay(s) || e.isDisabledInitialDay(s) || e.isDisabledDay(s)) && (t[o.dayNumber] = !0)
                }), t
            },
            isDisabledBeforeInitialDate: function(e) {
                return this.model.options.disableDaysBeforeInitialDate && e.getTime() < this.model.options.initialDate.getTime()
            },
            isDisabledAfterInitialDate: function(e) {
                return this.model.options.disableDaysAfterInitialDate && e.getTime() > this.model.options.initialDate.getTime()
            },
            isDisabledWeekDay: function(e) {
                return -1 !== this.model.options.disabledWeekDays.indexOf(e.getDay() || 7)
            },
            isDisabledInitialDay: function(e) {
                return this.model.options.disableInitialDate && this.model.options.disableInitialDate.getTime() === e.getTime()
            },
            isDisabledDay: function(e) {
                return this.model.get("disabledDates").some(function(t) {
                    return t.getTime() === e.getTime()
                })
            },
            highlightToday: function() {
                var e = new Date;
                this.model.isSameMonth(e, this.model.get("currentOpenedDate")) && n(g + '[data-date="' + e.getDate() + '"]', this.$calendar).addClass(h)
            },
            autoSelectFirstAvailableDate: function() {
                var e = this,
                    t = !1;
                n(g, this.$calendar).each(function(i, o) {
                    var s = n(o);
                    return !!s.hasClass(d) || (t = !0, e.selectDate(new Date(e.model.get("currentOpenedDate").getFullYear(), e.model.get("currentOpenedDate").getMonth(), s.data("date"))), !1)
                }), t || this.next()
            },
            disableDays: function() {
                var e = this.getDisabledDays();
                n(g, this.$calendar).each(function(t, i) {
                    n(i).toggleClass(d, n(i).data("date") in e)
                })
            },
            setDisabledDates: function(e) {
                this.model.set("disabledDates", e), this.model.options.autoSelectFirstAvailableDate && this.autoSelectFirstAvailableDate()
            },
            getSelectedDate: function() {
                return this.model.get("selectedDate")
            }
        });
    function k(e) {
        var t = e ? new Date(e) : new Date;
        return t.setHours(0, 0, 0, 0), t
    }
    return i.build({
        defaults: {
            range: null,
            initialDate: new Date,
            selectedDate: null,
            disabledDates: [],
            disabledWeekDays: [],
            autoSelectFirstAvailableDate: !1,
            disableDaysBeforeInitialDate: !1,
            disableDaysAfterInitialDate: !1,
            disableInitialDate: !1
        },
        create: function(e, t) {
            if (!t.translations || !Array.isArray(t.translations.weekdays) || !Array.isArray(t.translations.months)) throw new Error("Bloko/Calendar: No or incorrect required param: translations");
            t.range = t.range ? {
                from: k(t.range.from),
                to: k(t.range.to)
            } : t.range, t.disabledDates = t.disabledDates.map(function(e) {
                return k(e)
            }), t.initialDate = k(t.initialDate), t.selectedDate = t.selectedDate ? k(t.selectedDate) : null;
            var i = new v({
                model: new a(t),
                el: e
            });
            r.mobile() && n(e).addClass("bloko-calendar-reset-tap-highlighting");
            var o = l.extend({
                selectDate: function(e) {
                    i.selectDate(k(e))
                },
                setDisabledDates: function(e) {
                    i.setDisabledDates(e.map(function(e) {
                        return k(e)
                    }))
                },
                getSelectedDate: function() {
                    return i.getSelectedDate()
                }
            });
            return i.on(b, function(e) {
                o._trigger(b, e)
            }), o
        }
    })
});
_extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
    }
    return e
};
define("bloko/common/numberFormatter", [], function() {
    var e = {
        groupSeparator: " ",
        decimalMark: ",",
        groupSize: 3,
        decimalLength: 2
    };
    return {
        format: function(t, n) {
            var i = _extends({}, e, n),
                o = new RegExp("\\B(?=(\\d{" + i.groupSize + "})+(?!\\d))", "g"),
                s = (a = t, r = i, l = a.replace(/[^\d.,]+/g, "").replace(/[.,]/, "#").replace(/[.,]/g, "").split("#"), null === r.decimalLength ? l.join(".") : 0 === r.decimalLength || 1 === l.length ? l[0] : l[0] + "." + l[1].slice(0, r.decimalLength)).split(".");
            var a, r, l;
            return s[0] = s[0].replace(o, i.groupSeparator), "" === s[0] && 1 === s.length ? "" : "" === s[1] ? s[0] : ("" === s[0] && (s[0] = "0"), s.join(i.decimalMark))
        }
    }
}), define("Utils/Strings", ["bloko/common/numberFormatter"], function(e) {
    return {
        _trimRegexp: /(^[\s\xA0]+|[\s\xA0]+$)/g,
        _escapeRegexp: /([|![\]^$(){}+=?.*\\])/g,
        _textCases: [2, 0, 1, 1, 1, 2],
        printf: function(e, t) {
            var n = function(e, t) {
                if (t = "" + t, "%s" === e || "%d" === e) return t;
                if (/%\d{2,2}d/.test(e))
                    for (var n = e.substr(1, 1), i = e.substr(2, 1); t.length < i;) t = n + t;
                return t
            };
            "object" !== (void 0 === t ? "undefined" : _typeof2(t)) && (t = [t]);
            var i = e.match(/%(?:s|(?:\d{0,2}d))/g);
            if (i)
                for (var o = 0, s = i.length; o < s; o++) t[o] = void 0 === t[o] ? "" : t[o], e = e.replace(new RegExp(i[o], ""), n(i[o], t[o]));
            return e.replace(/%%/g, "%")
        },
        trim: function(e) {
            return e.replace(this._trimRegexp, "")
        },
        conversion: function(e, t, n) {
            var i = [t[0], t[2], t[1]];
            return t[3] || i.push(""), 0 === e ? n ? i[3] : this.printf("%s " + i[3], String(e)) : this.numConversion(e, i, n)
        },
        numConversion: function(e, t, n) {
            var i = e % 100 > 4 && e % 100 < 20 ? 2 : this._textCases[Math.min(e % 10, 5)];
            return n ? t[i] : this.printf("%s " + t[i], String(e))
        },
        escapeRegexp: function(e) {
            return e.replace(this._escapeRegexp, "\\$1")
        },
        cut: function(e, t, n) {
            return e.substr(0, t || 0) + e.substr(t + n || e.length)
        },
        linkify: function(e) {
            var t = e.replace(/(\b(https?|ftp):\/\/[-A-ZА-ЯЁ0-9+&@#/%?=~_|!:,.;]*[-A-ZА-ЯЁ0-9+&@#/%=~_|])/gim, '<a href="$1" rel="noopener noreferrer" target="_blank">$1</a>');
            return t = (t = t.replace(/(^|[^/])(www\.[-A-ZА-ЯЁ0-9+&@#/%?=~_|!:,.;]+(\b|$))/gim, '$1<a href="http://$2" target="_blank" rel="noopener noreferrer">$2</a>')).replace(/([A-ZА-ЯЁ0-9+_-]+@[A-ZА-ЯЁ0-9]+?\.[A-ZА-ЯЁ]{2,6})/gim, '<a href="mailto:$1">$1</a>')
        },
        applyTemplate: function(e, t) {
            return e.replace(/\{([\w.]*)}/g, function(e, n) {
                var i = n.split("."),
                    o = t[i.shift()];
                return i.forEach(function() {
                    o = o[this]
                }, this), null === o || void 0 === o ? "" : o
            })
        },
        capitalize: function(e) {
            return e.charAt(0).toUpperCase() + e.slice(1)
        },
        formatCost: function(t, n) {
            var i = Math.floor(t),
                o = String(i),
                s = {};
            if (t !== i) {
                var a = ((t - i) * Math.pow(10, 2)).toFixed(0);
                a.length > 2 ? (i += 1, o = String(i)) : Number(a) > 0 && (o += "." + (1 === a.length ? "0" + a : a))
            }
            return void 0 !== n && null !== n && (s.groupSeparator = n), e.format(o, s)
        }
    }
}), define("Utils/Dates", ["Utils/Strings", "text!datesTranslations"], function(e, t) {
    var n = {
        monthsGenitiveTrl: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        monthsTrl: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        daysOfTheWeekTrl: ["01", "02", "03", "04", "05", "06", "07"]
    };
    try {
        t = JSON.parse(t)
    } catch (e) {
        t = n
    }
    return new function() {
        this.days = {
            Sunday: 0,
            Monday: 1,
            Tuesday: 2,
            Wednesday: 3,
            Thursday: 4,
            Friday: 5,
            Saturday: 6
        }, this.firstDay = "Monday", this.getDay = function(e, t) {
            return t = t || this.firstDay, (e = e instanceof Date ? e.getDay() : e) < (t = this.days[t]) ? 7 - t + e : e - t
        }, this.toFormat = function(n, i) {
            for (var o = /%e[^%]*%B/.test(i) ? t.monthsGenitiveTrl : t.monthsTrl, s = [
                    [/%Y/g, "%04d", n.getFullYear()],
                    [/%y/g, "%02d", ("" + n.getFullYear()).substr(-2)],
                    [/%m/g, "%02d", n.getMonth() + 1],
                    [/%n/g, "%d", n.getMonth() + 1],
                    [/%d/g, "%02d", n.getDate()],
                    [/%e/g, "%d", n.getDate()],
                    [/%EEEE/g, "%d", t.daysOfTheWeekTrl[this.getDay(n.getDay(), "Monday")]],
                    [/%H/g, "%02d", n.getHours()],
                    [/%M/g, "%02d", n.getMinutes()],
                    [/%S/g, "%02d", n.getSeconds()],
                    [/%B/g, "%s", o[n.getMonth()]],
                    [/%z/g, "%s%02d:00", [n.getTimezoneOffset() > 0 ? "-" : "+", Math.floor(Math.abs(n.getTimezoneOffset()) / 60)]]
                ], a = 0, r = s.length, l = null; a < r; a++) l = s[a], i = i.replace(l[0], e.printf(l[1], l[2]));
            return s = null, i
        }, this.changeMonth = function(e, t) {
            var n = e.getMonth() + t;
            return n = -1 === (n = 12 === n ? 0 : n) ? 11 : n, e.setMonth(n), n !== e.getMonth() && e.setDate(0), e
        }, this.changeMonthAndYear = function(e, t) {
            var n = e.getMonth() + t;
            return e.setMonth(n), (n = -1 === (n = 12 === n ? 0 : n) ? 11 : n) !== e.getMonth() && e.setDate(0), e
        }, this.changeYear = function(e, t) {
            var n = e.getMonth();
            return e.setFullYear(e.getFullYear() + t), n !== e.getMonth() && e.setDate(0), e
        }, this.equal = function(e, t, n) {
            return n = n || "%Y%n%e", this.toFormat(e, n) === this.toFormat(t, n)
        }, this.getDays = function(e) {
            var t = new Date(e);
            return t.setMilliseconds(0), t.setSeconds(0), t.setMinutes(0), t.setHours(0), Math.round(t.getTime() / 864e5)
        }, this.diffInDays = function(e, t) {
            return Math.round((e.getTime() - t.getTime()) / 864e5)
        }, this.diffInYears = function(e, t) {
            var n = t.getFullYear() - e.getFullYear();
            return e.getMonth() < t.getMonth() ? n : e.getMonth() === t.getMonth() && e.getDate() <= t.getDate() ? n : n - 1
        }, this.isToday = function(e) {
            var t = new Date;
            return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
        }, this.isTomorrow = function(e) {
            var t = new Date;
            return t.setDate(t.getDate() + 1), e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
        }, this.isHoliday = function(e) {
            return -1 !== [5, 6].indexOf(this.getDay(e))
        }, this.getDaysInMonth = function(e) {
            var t = new Date(e);
            return t.setMonth(e.getMonth() + 1), t.setDate(1), t.setDate(t.getDate() - 1), t.getDate()
        }, this.convertTZ = function(e, t) {
            return new Date(e.valueOf() + 6e4 * (e.getTimezoneOffset() + 60 * t))
        }, this.convertISODateStringToDate = function(e) {
            var t = e.match(/([0-9]+)-([0-9]+)-([0-9]+)T([0-9]+):([0-9]+):([0-9]+)([+|-][0-9]+)?/),
                n = {
                    year: t[1],
                    month: t[2] - 1,
                    day: t[3],
                    hours: t[4],
                    minutes: t[5],
                    seconds: t[6]
                };
            return new Date(n.year, n.month, n.day, n.hours, n.minutes, n.seconds)
        }
    }
}), define("HH/Bloko/Calendar/Input", ["jquery", "HHC/Components", "bloko/blocks/calendar/calendar", "bloko/blocks/dropdown/dropdown", "Utils/Dates"], function(e, t, n, i, o) {
    return t.build({
        defaults: {
            format: {
                text: "%e %B %Y",
                input: "%d.%m.%Y"
            }
        },
        create: function(s, a) {
            return new function(s, a) {
                var r = e(s),
                    l = e(".HH-BlokoCalendar-Trigger", s),
                    c = e(".HH-BlokoCalendar-Input", s),
                    d = t.make(n, e(".HH-BlokoCalendar-Calendar", s).get(0), {
                        translations: a.translations
                    }),
                    h = t.make(i, s, {
                        align: "center",
                        placement: "bottom",
                        layer: "above-content",
                        width: "middle"
                    });
                d.on("Bloko-Calendar-DateSelected", function(e) {
                    l.text(o.toFormat(e, a.format.text)), c.val(o.toFormat(e, a.format.input)), r.trigger("HH-BlokoCalendar-DateSelected", [e]), h.hide()
                }), d.selectDate(isNaN(new Date(a.selectedDate).getTime()) ? new Date : a.selectedDate)
            }(s, a)
        }
    })
}), define("bloko/blocks/customSelect/customSelect.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.b('<div class="bloko-custom-select__select Bloko-CustomSelect" tabindex="0">'), i.b("\n" + n), i.b('    <span class="bloko-custom-select__placeholder Bloko-CustomSelect-Selected">'), i.b("\n" + n), i.s(i.f("placeholder", e, t, 1), e, t, 0, 180, 232, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                n.b(n.rp("<customSelectPlaceholder0", e, t, "            "))
            }), e.pop()), i.b("    </span>"), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b('<div class="bloko-custom-select__content g-hidden Bloko-CustomSelect-OptionsContainer" tabindex="0">'), i.b("\n" + n), i.s(i.f("search", e, t, 1), e, t, 0, 388, 790, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.b('        <div class="bloko-custom-select__search Bloko-CustomSelect-SearchContainer">'), i.b("\n" + n), i.b('            <label class="bloko-input-wrapper">'), i.b("\n" + n), i.b('                <input class="bloko-input Bloko-CustomSelect-Search"'), i.b("\n" + n), i.b('                       placeholder="'), i.b(i.v(i.f("searchPlaceholder", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('                       type="text"/>'), i.b("\n" + n), i.b('                <span class="bloko-icon bloko-icon_search"/>'), i.b("\n" + n), i.b("            </label>"), i.b("\n" + n), i.b("        </div>"), i.b("\n" + n)
            }), e.pop()), i.b('    <div class="bloko-custom-select__option-list Bloko-CustomSelect-Options">'), i.b("\n" + n), i.b(i.rp("<customSelectOptions1", e, t, "        ")), i.b("    </div>"), i.b("\n" + n), i.b(i.rp("<customSelectAfterOptions2", e, t, "    ")), i.b("</div>"), i.b("\n"), i.fl()
        },
        partials: {
            "<customSelectPlaceholder0": {
                name: "customSelectPlaceholder",
                partials: {},
                subs: {}
            },
            "<customSelectOptions1": {
                name: "customSelectOptions",
                partials: {},
                subs: {}
            },
            "<customSelectAfterOptions2": {
                name: "customSelectAfterOptions",
                partials: {},
                subs: {}
            }
        },
        subs: {}
    })
}), define("bloko/blocks/customSelect/customSelectPlaceholder.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.b(i.v(i.f("text", e, t, 0))), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/blocks/customSelect/customSelectOptions.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.s(i.f("options", e, t, 1), e, t, 0, 14, 531, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.s(i.f("data", e, t, 1), e, t, 0, 30, 519, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b('        <div class="bloko-select-dropdown-option'), i.b("\n" + n), i.b("                    Bloko-CustomSelect-OptionItem"), i.b("\n" + n), i.s(i.f("selected", e, t, 1), e, t, 0, 165, 248, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                        i.b("                        bloko-select-dropdown-option_selected"), i.b("\n" + n)
                    }), e.pop()), i.s(i.f("disabled", e, t, 1), e, t, 0, 299, 444, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                        i.b("                        bloko-select-dropdown-option_disabled"), i.b("\n" + n), i.b("                        Bloko-CustomSelect-OptionItemDisabled"), i.b("\n" + n), i.b("                    ")
                    }), e.pop()), i.b('">'), i.b("\n" + n), i.b(i.rp("<customSelectOption0", e, t, "             ")), i.b("        </div>"), i.b("\n" + n)
                }), e.pop())
            }), e.pop()), i.fl()
        },
        partials: {
            "<customSelectOption0": {
                name: "customSelectOption",
                partials: {},
                subs: {}
            }
        },
        subs: {}
    })
}), define("bloko/blocks/customSelect/customSelectOption.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.b(i.v(i.f("text", e, t, 0))), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/blocks/customSelect/customSelect", ["backbone", "underscore", "jquery", "bloko/common/core/Components", "bloko/common/valuechange", "bloko/common/metrics", "bloko/common/media", "bloko/common/constants/keyboard", "bloko/blocks/customSelect/customSelect.mustache", "bloko/blocks/customSelect/customSelectPlaceholder.mustache", "bloko/blocks/customSelect/customSelectOptions.mustache", "bloko/blocks/customSelect/customSelectOption.mustache", "bloko/common/fuzzySearch", "bloko/common/events"], function(e, t, n, i, o, s, a, r, l, c, d, h, u, p) {
    var m = {
            hidden: "g-hidden",
            focused: "bloko-custom-select__select_focus",
            selected: "bloko-select-dropdown-option_selected",
            optionFocused: "bloko-select-dropdown-option_focused",
            disabled: "bloko-custom-select_disabled",
            disabledOption: "bloko-select-dropdown-option_disabled",
            customOptions: "Bloko-CustomSelect-OptionItem",
            customSelect: "Bloko-CustomSelect",
            disabledOptionBindings: "Bloko-CustomSelect-OptionItemDisabled",
            layer: {
                floating: "bloko-custom-select__content_layer-floating",
                overlay: "bloko-custom-select__content_layer-overlay",
                topmost: "bloko-custom-select__content_layer-topmost",
                "above-content": "bloko-custom-select__content_layer-above-content",
                "overlay-content": "bloko-custom-select__content_layer-overlay-content",
                "above-overlay-content": "bloko-custom-select__content_layer-above-overlay-content"
            }
        },
        f = ".Bloko-CustomSelect-NativeSelect",
        g = ".Bloko-CustomSelect",
        b = ".Bloko-CustomSelect-OptionsContainer",
        v = ".Bloko-CustomSelect-Options",
        k = ".Bloko-CustomSelect-OptionItem",
        y = ".Bloko-CustomSelect-Selected",
        w = ".Bloko-CustomSelect-Search",
        H = !1,
        S = e.View.extend({
            events: {
                "click .Bloko-CustomSelect": "show",
                "click .Bloko-CustomSelect-OptionItem": "_change",
                "mousemove .Bloko-CustomSelect-OptionItem": "_mouseMove",
                "focus .Bloko-CustomSelect-OptionsContainer": "_focusList",
                "blur .Bloko-CustomSelect-OptionsContainer": "_blurList",
                "keydown .Bloko-CustomSelect": "_keyboardControlOnSelect",
                "keydown .Bloko-CustomSelect-OptionsContainer": "_keyboardControlOnOptions",
                "keypress .Bloko-CustomSelect-OptionsContainer": "_nativeSearch",
                "keypress .Bloko-CustomSelect": "_nativeSearch",
                "valuechange .Bloko-CustomSelect-Search": "_changeSearchInput"
            },
            initialize: function(e) {
                var t = this;
                this._customSelectOptionTemplate = e.optionTemplate, this._customPlaceholderTemplate = e.placeholderTemplate, this._selectIndex = 0, this._isOpen = !1, this._isDisabled = e.disabled, this._filterQuery = "", this._searchDateStart = new Date, this._isSearch = e.search, this._searchPlaceholder = e.searchPlaceholder, this._afterOptionsData = e.afterOptionsData, this._afterOptionsTemplate = e.afterOptionsTemplate, this.$select = this.$(f), this._dataJSON = e.templateJSON.map(function(e, n) {
                    return e.selected && (t._selectIndex = n), {
                        index: n,
                        data: e
                    }
                }), this.$customSelectContainer = n(this.template(this._getTemplateJSON())), this.$customSelect = this.$customSelectContainer.filter(g), this.$customOptionsContainer = this.$customSelectContainer.filter(b), this.$customOptionsContainer.addClass(m.layer[e.layer]), this.$customOptions = n(k, this.$customOptionsContainer), this.$customOptions.eq(this._selectIndex).addClass(m.selected), this.$customOptionsList = n(v, this.$customOptionsContainer), this.$customSelectPlaceholder = n(y, this.$customSelect), this.$searchInput = n(w, this.$customOptionsContainer), this._dataJSON = this._dataJSON.map(function(e, n) {
                    return e.searchText = t.$customOptions.eq(n).text().toLowerCase().trim(), e
                }), this._createNativeOptions(), this._checkDisabledAll(this._dataJSON), this.$el.append(this.$customSelectContainer), this.$select.addClass(m.hidden), this.$select.prop("disabled", !1), this._isDisabled && this.disable(), this._focusIndex = this._selectIndex
            },
            _getTemplateJSON: function() {
                return n.extend({
                    options: this._dataJSON,
                    placeholder: this._dataJSON[this._selectIndex].data,
                    search: this._isSearch,
                    searchPlaceholder: this._searchPlaceholder
                }, this._afterOptionsData)
            },
            _createNativeOptions: function() {
                this.$select.html(this._prepareNativeOptions(this._dataJSON))
            },
            _addToNativeSelect: function(e) {
                this.$select.append(this._prepareNativeOptions(e))
            },
            _prepareNativeOptions: function(e) {
                var t = this;
                return e.map(function(e, i) {
                    var o = n("<option>").text(e.data.text).val(e.data.value);
                    return e.data.selected && (t._selectIndex = i, o.prop("selected", !0)), e.data.disabled && o.prop("disabled", !0), o
                })
            },
            _keyboardControlOnSelect: function(e) {
                switch (e.keyCode) {
                    case r.KEY_CODES.ARROW_UP:
                    case r.KEY_CODES.ARROW_DOWN:
                        this.show(), e.preventDefault();
                        break;
                    case r.KEY_CODES.ESC:
                        this.hide();
                        break;
                    case r.KEY_CODES.ENTER:
                        n(this.$select.prop("form")).submit()
                }
            },
            _checkDisabledAll: function(e) {
                this._isDisabledOptions = !e.some(function(e) {
                    return !e.data.disabled
                })
            },
            _keyboardControlOnOptions: function(e) {
                switch (e.keyCode) {
                    case r.KEY_CODES.ARROW_UP:
                        if (e.preventDefault(), !this.$customOptions.length || this._isDisabledOptions) break;
                        this._keyUp(), this._focusItems(), this._scrollToFocus();
                        break;
                    case r.KEY_CODES.ARROW_DOWN:
                        if (e.preventDefault(), !this.$customOptions.length || this._isDisabledOptions) break;
                        this._keyDown(), this._focusItems(), this._scrollToFocus();
                        break;
                    case r.KEY_CODES.ENTER:
                        if (e.preventDefault(), !this.$customOptions.length) break;
                        this._change(e);
                        break;
                    case r.KEY_CODES.ESC:
                        this.hide();
                        break;
                    case r.KEY_CODES.TAB:
                        if (e.preventDefault(), this._isOpen) break;
                        this.hide()
                }
            },
            _keyUp: function() {
                do {
                    this._focusIndex = (this._focusIndex <= 0 ? this._dataJSON.length : this._focusIndex) - 1
                } while (this.$customOptions.eq(this._focusIndex).hasClass(m.disabledOptionBindings))
            },
            _keyDown: function() {
                do {
                    this._focusIndex = this._focusIndex === this._dataJSON.length - 1 ? 0 : this._focusIndex + 1
                } while (this.$customOptions.eq(this._focusIndex).hasClass(m.disabledOptionBindings))
            },
            _changeSearchInput: function() {
                var e = this;
                if (this._isOpen) {
                    this.$customOptions.removeClass(m.hidden).removeClass(m.disabledOptionBindings);
                    var t = this._dataJSON.filter(function(t) {
                        var n = u.match(e.$searchInput.val(), t.searchText);
                        return e._isSearch && !n && e.$customOptions.eq(t.index).addClass(m.hidden).addClass(m.disabledOptionBindings), t.disabled && e.$customOptions.eq(t.index).addClass(m.disabledOptionBindings), n
                    });
                    this._checkDisabledAll(t), t.length ? this.$customOptionsList.css("height", "auto") : this.$customOptionsList.css("height", 0), this._isDisabledOptions ? (this.$customOptions.removeClass(m.optionFocused), this._focusIndex = -1) : this._focusSearchItem(t)
                }
            },
            _nativeSearch: function(e) {
                var t = this;
                if (!this._isSearch || !this._isOpen) {
                    var n = r.getChar(e);
                    if (n) {
                        new Date - this._searchDateStart > 200 && (this._filterQuery = ""), this._searchDateStart = new Date, this._filterQuery += n;
                        var i = this._dataJSON.filter(function(e) {
                            return u.match(t._filterQuery, e.searchText)
                        });
                        this._isOpen ? this._focusSearchItem(i) : i.length && !i[0].disabled && (this._selectIndex = i[0].index, this._change())
                    }
                }
            },
            _focusSearchItem: function(e) {
                e.length && !e[0].disabled ? (this._focusIndex = e[0].index, this._focusItems(), this._scrollToFocus()) : (this.$customOptions.removeClass(m.optionFocused), this._focusIndex = -1)
            },
            _scrollToFocus: function() {
                if (this._isOpen) {
                    var e = s.getRelativeMetrics(this.$customOptions.eq(this._focusIndex)),
                        t = this._metricsOptionsList.height - e.top - e.height,
                        n = e.top + this.$customOptionsList.scrollTop();
                    t < 0 ? this.$customOptionsList.scrollTop(n) : e.top < 0 && (n = n + e.height - this._metricsOptionsList.height, this.$customOptionsList.scrollTop(n))
                }
            },
            _mouseMove: function(e) {
                if (this._mouseCoordsY !== e.clientY) {
                    var t = n(e.target);
                    for (this._mouseCoordsY = e.clientY; !t.hasClass(m.customOptions);) t = t.parent();
                    t.hasClass(m.disabledOptionBindings) || (this._focusIndex = this.$customOptions.index(t), this._focusItems())
                }
            },
            _focusItems: function() {
                this.$customOptions.removeClass(m.optionFocused), this.$customOptions.eq(this._focusIndex).addClass(m.optionFocused)
            },
            _blurList: function() {
                var e = this;
                H = !1, this._handlerBlur = window.setTimeout(function() {
                    e.hide(!0)
                }, 150)
            },
            _focusList: function() {
                clearTimeout(this._handlerBlur)
            },
            _change: function(e) {
                if (e && -1 === this._focusIndex) return this.hide(), null;
                e && (this._selectIndex = this._focusIndex);
                var t = this._dataJSON[this._selectIndex].data;
                return this.$customOptions.removeClass(m.selected), this.$select.val(t.value), this.$customOptions.eq(this._selectIndex).addClass(m.selected), this.$customSelectPlaceholder.html(this.templatePlaceholder(t)), this.$select.trigger("change"), this.trigger("Bloko-CustomSelect-Selected", t), this.hide(), t
            },
            show: function() {
                this._isDisabled || this._isOpen || (H = !0, this.$customOptionsContainer.removeClass(m.hidden), this._metricsOptionsList = s.getMetrics(this.$customOptionsList), this._isOpen = !0, this._selectIndex >= 0 && this._dataJSON[this._selectIndex] && !this._dataJSON[this._selectIndex].data.disabled && this.$customOptions.eq(this._selectIndex).addClass(m.optionFocused), this._isSearch && a.getBreakpoint() !== a.breakpoint.XS ? this.$searchInput.focus() : (this.$customSelect.addClass(m.focused), this.$customOptionsContainer.focus()))
            },
            hide: function(e) {
                this._isOpen && (this._isOpen = !1, this.$customOptionsContainer.addClass(m.hidden), H && e || this.$customSelect.focus(), this.$customSelect.removeClass(m.focused), this.$customOptions.removeClass(m.optionFocused), this._focusIndex = this._selectIndex)
            },
            change: function(e) {
                for (var t = 0; t < this._dataJSON.length; t++)
                    if (this._dataJSON[t].data.value === e) return this._selectIndex = t, this._change();
                return null
            },
            add: function(e) {
                var t = this,
                    i = n.extend(!0, [], e).map(function(e) {
                        return {
                            data: e
                        }
                    }),
                    o = {
                        options: i
                    },
                    s = n("<div>").append(this.templateOptions(o)).children();
                this._addToNativeSelect(i), i.forEach(function(e, n) {
                    t._dataJSON.push({
                        index: t._dataJSON.length,
                        searchText: s.eq(n).text().trim().toLowerCase(),
                        data: e.data
                    }), e.data.selected && (t._selectIndex = t._dataJSON.length - 1)
                }), this._checkDisabledAll(this._dataJSON), this.$customOptionsList.append(s), this.$customOptions = this.$(k), this._change()
            },
            disable: function() {
                this.$customSelect.removeAttr("tabindex"), this.$el.addClass(m.disabled), this._isDisabled = !0, this.hide(), this.$select.prop("disabled", !0)
            },
            enable: function() {
                this.$customSelect.attr("tabindex", "0"), this.$el.removeClass(m.disabled), this._isDisabled = !1, this.$select.prop("disabled", !1)
            },
            templatePlaceholder: function(e) {
                return this._customPlaceholderTemplate.render(e)
            },
            templateOptions: function(e) {
                return d.render(e, {
                    customSelectOption: this._customSelectOptionTemplate
                })
            },
            template: function(e) {
                var t = {
                    customSelectOptions: d,
                    customSelectOption: this._customSelectOptionTemplate,
                    customSelectPlaceholder: this._customPlaceholderTemplate
                };
                return this._afterOptionsTemplate && (t.customSelectAfterOptions = this._afterOptionsTemplate), l.render(e, t)
            }
        });
    return i.build({
        defaults: {
            disabled: !1,
            search: !1,
            templateJSON: [],
            layer: "above-content",
            optionTemplate: h,
            placeholderTemplate: c,
            afterOptionsTemplate: null,
            afterOptionsData: {}
        },
        create: function(e, i) {
            var o = new S(t.extend({
                    el: e
                }, i)),
                s = p.extend({
                    show: function() {
                        o.show()
                    },
                    hide: function() {
                        o.hide()
                    }
                });
            return s.change = function(e) {
                o.change(e)
            }, s.add = function(e) {
                o.add(e), this._trigger("Bloko-CustomSelect-Added", n.extend(!0, [], e))
            }, s.disable = function() {
                o.disable(), this._trigger("Bloko-CustomSelect-Disabled")
            }, s.enable = function() {
                o.enable(), this._trigger("Bloko-CustomSelect-Enabled")
            }, o.on("Bloko-CustomSelect-Selected", function(e) {
                s._trigger("Bloko-CustomSelect-Selected", e)
            }), s
        }
    })
}), define("HH/Bloko/CustomSelect", ["HHC/Components", "bloko/blocks/customSelect/customSelect"], function(e, t) {
    return e.build({
        create: function(n, i) {
            return e.make(t, n, i)
        }
    })
}), define("HH/Bloko/PopupSwitcher", ["jquery", "HHC/Components", "bloko/blocks/popup/popup"], function(e, t, n) {
    return t.build({
        defaults: {
            classname: "HH-Bloko-PopupSwitcher-Popup"
        },
        create: function(i, o) {
            return new function(i, o) {
                this.$element = e(i), this.params = o, this.bindings = {
                    switcher: ".HH-Bloko-PopupSwitcher-Switcher",
                    popup: "." + this.params.classname
                }, this.init = function() {
                    var i = t.make(n, e(this.bindings.popup, this.$element).get(0), o);
                    e(this.bindings.switcher, this.$element).on("click", function() {
                        i.show()
                    })
                }, this.init(i, o)
            }(i, o)
        }
    })
}), define("bloko/blocks/toggle/toggle", ["jquery", "bloko/common/core/Components", "bloko/common/ready"], function(e, t, n) {
    var i = "toggle";
    var o = t.build({
        defaults: {
            name: "",
            expandClass: "bloko-toggle_expand"
        },
        create: function(t, o) {
            var s = e(t);
            function a(t) {
                var n = e('[data-toggle-container="' + o.name + '"]'),
                    i = n.length > 0 ? n : s;
                e(t.target).closest(i).length > 0 || c(!1)
            }
            function r() {
                var e = void 0;
                return o.expandClass ? e = !s.hasClass(o.expandClass) : o.collapseClass && (e = s.hasClass(o.collapseClass)), e
            }
            function l(t) {
                t ? e(document).on("click." + i, a) : e(document).off("click." + i, a)
            }
            function c(e) {
                o.collapseClass && s.toggleClass(o.collapseClass, !e), o.expandClass && s.toggleClass(o.expandClass, e), o.closeByClick && l(e), s.trigger("Bloko-Toggle-Switch", r()), s.trigger("possible-resize")
            }
            function d(e, t) {
                e.preventDefault(), c("expand" === (t || (r() ? "expand" : "collapse")))
            }
            function h() {
                window.location.hash.substr(1) === o.showOnHash && c(!0)
            }
            return s.on("Bloko-Toggle-Click." + i, d), s.on("click." + i, '[data-toggle="' + o.name + '"]', d), o.closeByClick && (s.on("Bloko-Toggle-ConfigureClose." + i, function(e, t) {
                l(t)
            }), r() || l(!0)), o.active && c(!0), o.showOnHash && (h(), e(window).on("hashchange", h)), n.resolve(t, i, this), {
                expand: function() {
                    c(!0)
                },
                collapse: function() {
                    c(!1)
                },
                toggle: function() {
                    c(!r())
                },
                isClosed: function() {
                    return r()
                }
            }
        }
    });
    return {
        create: function(n, i) {
            return t.make(o, e(n).get(0), i)
        }
    }
}), define("HH/Bloko/Toggle", ["jquery", "HHC/Components", "bloko/blocks/toggle/toggle"], function(e, t, n) {
    return t.build({
        create: function(t, i) {
            return new function(t, i) {
                this.$element = e(t), this.params = i, n.create(this.$element, this.params)
            }(t, i)
        }
    })
}), define("HH/Collection/Common", [], function() {
    return {
        parse: function(e) {
            return e.data ? e.data : []
        },
        index: function(e) {
            var t = -1;
            return this.models.some(function(n, i) {
                return n.cid === e.cid && (t = i, !0)
            }), t
        },
        count: function(e) {
            if (e) {
                var t = 0;
                return this.each(function(n) {
                    e(n) && (t += 1)
                }), t
            }
            return this.length
        }
    }
}), define("HH/CookieSwitcher", ["jquery", "HHC/Components", "bloko/common/Cookies"], function(e, t, n) {
    return t.build({
        defaults: {
            reload: !0
        },
        create: function(t, i) {
            return new function(t, i) {
                var o = {
                    on: i.valueOn || "true",
                    off: i.valueOff || "false"
                };
                e(t).on("click", function() {
                    var e = n.get(i.cookieName) === o.on ? "off" : "on";
                    n.set(i.cookieName, o[e], i.expire), i.reload && window.location.reload()
                })
            }(t, i)
        }
    })
}), define("bloko/common/tree/model", ["underscore", "backbone"], function(e, t) {
    return t.Model.extend({
        defaults: {
            id: null,
            text: "",
            expanded: !1,
            children: [],
            parent: null,
            items: null,
            hiddenValue: null,
            animated: !0,
            selectable: !1,
            disabled: !1,
            editable: !1,
            edited: !1
        },
        initialize: function() {
            this.set("id", this.get("id").toString(), {
                silent: !0
            })
        },
        toJSON: function(t) {
            var n = this,
                i = e.clone(this.attributes);
            return i.items = [], i.removable = this.removable || !1, i.editable = this.editable || !1, i.selectable = this.selectable || !1, i.selected = this.get("selected") || !1, i.expanded = this.get("expanded") || !1, i.disabled = this.get("disabled") || !1, i.isNew = this.get("animated") && (this.hasChanged("children") || this.newTag), i.hiddenValue = this.get("hiddenValue") || this.get("text"), t && (this.newTag = !1), null === this.get("parent") && (this.newTag = !1, i.children && i.children.forEach(function(e) {
                n.collection.get(e) && i.items.push(n.collection.get(e).toJSON(!0))
            }), i.children = []), i
        }
    })
}), define("bloko/common/tree/countableModel", ["jquery", "backbone", "bloko/common/tree/model"], function(e, t, n) {
    return n.extend({
        defaults: e.extend({}, n.defaults, {
            changeable: !0,
            voted: !1,
            count: 0
        })
    })
}), define("bloko/common/tree/collection", ["underscore", "backbone"], function(e, t) {
    return t.Collection.extend({
        converter: function(e, t, n) {
            var i = this;
            this.sortFucntion && e.sort(this.sortFucntion.bind(this)), e.forEach(function(e) {
                var o = i.parseItem(e, t);
                i.setupParent(o), e.items && e.items.length > 0 && i.converter(e.items, o, n), n.push(o), t.children ? t.children.push(o.id) : t.children = [o.id]
            })
        },
        parseItem: function(e, t) {
            return {
                id: e.id,
                text: e.text,
                children: [],
                parent: t.id,
                removable: e.removable,
                editable: e.editable,
                selectable: e.selectable,
                disabled: e.disabled,
                hiddenValue: e.hiddenValue,
                additional: e.additional
            }
        },
        parse: function(e) {
            var t = this,
                n = [];
            return e.forEach(function(e) {
                e.id = e.id.toString(), e.parent && (e.parent = e.parent.toString()), e.items && t.converter(e.items, e, n), t.setupParent(e), e.items = null, n.push(e)
            }), n
        },
        setupParent: function(e) {
            var t = this.get(e.parent);
            if (t) {
                var n = t.get("children");
                return -1 === n.indexOf(e.id) && t.set("children", n.concat([e.id]), {
                    silent: !0
                }), !0
            }
            return !1
        },
        toJSON: function() {
            var e = [];
            return this.models.forEach(function(t) {
                t.has("parent") || e.push(t.toJSON())
            }), e
        }
    })
}), define("bloko/common/textSelection", [], function() {
    function e(e) {
        this.name = "TextSelectionError", this.message = e
    }
    function t(e) {
        this.name = "TextSelectionArgumentsError", this.message = e
    }
    e.prototype = Error.prototype, t.prototype = Error.prototype;
    var n = function() {
            throw new e("Selection is not supported")
        },
        i = n,
        o = n;
    return "selectionStart" in document.createElement("input") ? (i = function(e) {
        return {
            start: e.selectionStart,
            end: e.selectionEnd,
            direction: e.selectionDirection || "none"
        }
    }, o = function(e, t, n, i) {
        e.setSelectionRange(t, n, i)
    }) : document.selection && (i = function(e) {
        var t = document.selection.createRange(),
            n = e.createTextRange(),
            i = n.duplicate();
        return n.moveToBookmark(t.getBookmark()), i.setEndPoint("EndToStart", n), {
            start: i.text.length,
            end: i.text.length + t.text.length,
            direction: "none"
        }
    }, o = function(e, t, n) {
        var i = e.createTextRange();
        i.collapse(!0), i.moveStart("character", t), i.moveEnd("character", n - t), i.select()
    }), {
        get: function(e) {
            return i(e)
        },
        getCaretPosition: function(e) {
            var t = this.get(e);
            return "forward" === t.direction ? t.end : t.start
        },
        set: function(e, n, i, s) {
            if ("number" != typeof n) throw new t("First argument of textSelection.set() must be a number");
            "number" != typeof i && (i = n), -1 === ["forward", "backward", "none"].indexOf(s) && (s = "none"), e.focus(), o(e, n, i, s)
        },
        setCaretPosition: function(e, t) {
            this.set(e, t, t)
        }
    }
}), define("bloko/blocks/tagList/inline.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.s(i.f("items", e, t, 1), e, t, 0, 10, 783, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.b('<span class="bloko-tag'), i.b("\n" + n), i.b("             "), i.s(i.f("stretched", e, t, 1), e, t, 0, 61, 80, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b("bloko-tag_stretched")
                }), e.pop()), i.b("\n" + n), i.b("             "), i.s(i.f("stretched", e, t, 1), e, t, 1, 0, 0, "") || i.b("bloko-tag_inline"), i.b("\n" + n), i.b("             "), i.s(i.f("isNew", e, t, 1), e, t, 0, 176, 194, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b("bloko-tag_animated")
                }), e.pop()), i.b("\n" + n), i.b("             "), i.s(i.f("selected", e, t, 1), e, t, 0, 231, 249, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b("bloko-tag_selected")
                }), e.pop()), i.b("\n" + n), i.b("             "), i.s(i.f("selectable", e, t, 1), e, t, 0, 291, 311, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b("bloko-tag_selectable")
                }), e.pop()), i.b("\n" + n), i.b("             "), i.s(i.f("disabled", e, t, 1), e, t, 0, 353, 371, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b("bloko-tag_disabled")
                }), e.pop()), i.b("\n" + n), i.b('             Bloko-TagList-Tag"'), i.b("\n" + n), i.b('      data-tag-id="'), i.b(i.v(i.f("id", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('      data-qa="bloko-tag'), i.b("\n" + n), i.b("               bloko-tag_inline"), i.b("\n" + n), i.b("               "), i.s(i.f("selected", e, t, 1), e, t, 0, 529, 547, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b("bloko-tag_selected")
                }), e.pop()), i.b("\n" + n), i.b("               "), i.s(i.f("disabled", e, t, 1), e, t, 0, 589, 607, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b("bloko-tag_disabled")
                }), e.pop()), i.b('">'), i.b("\n" + n), i.s(i.f("hidden", e, t, 1), e, t, 0, 638, 670, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b(n.rp("<hiddenSection0", e, t, "        "))
                }), e.pop()), i.b(i.rp("<textSection1", e, t, "    ")), i.b(i.rp("<editableSection2", e, t, "    ")), i.b(i.rp("<editableAction3", e, t, "    ")), i.b(i.rp("<removeSection4", e, t, "    ")), i.b("</span>"), i.b("\n" + n)
            }), e.pop()), i.fl()
        },
        partials: {
            "<hiddenSection0": {
                name: "hiddenSection",
                partials: {},
                subs: {}
            },
            "<textSection1": {
                name: "textSection",
                partials: {},
                subs: {}
            },
            "<editableSection2": {
                name: "editableSection",
                partials: {},
                subs: {}
            },
            "<editableAction3": {
                name: "editableAction",
                partials: {},
                subs: {}
            },
            "<removeSection4": {
                name: "removeSection",
                partials: {},
                subs: {}
            }
        },
        subs: {}
    })
}), define("bloko/blocks/tagList/textSection.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.s(i.d("items.length", e, t, 1), e, t, 0, 17, 1009, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.s(i.f("edited", e, t, 1), e, t, 1, 0, 0, "") || (i.b('    <button class="bloko-tag__section'), i.b("\n" + n), i.b("                   bloko-tag__section_text"), i.b("\n" + n), i.s(i.f("disabled", e, t, 1), e, t, 1, 0, 0, "") || (i.b("                       bloko-tag__section_active"), i.b("\n" + n), i.b("                       Bloko-TagList-Expand"), i.b("\n" + n)), i.b('                   Bloko-TagList-SectionText"'), i.b("\n" + n), i.b("            "), i.s(i.f("disabled", e, t, 1), e, t, 0, 341, 360, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b('disabled="disabled"')
                }), e.pop()), i.b("\n" + n), i.b('            type="button">'), i.b("\n" + n), i.b('        <span class="Bloko-TagList-Text"'), i.b("\n" + n), i.b('              data-qa="bloko-tag__text'), i.s(i.f("selectable", e, t, 1), e, t, 0, 495, 517, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b(" bloko-tag__selectable")
                }), e.pop()), i.b('">'), i.b(i.v(i.f("text", e, t, 0))), i.b("</span>"), i.b("\n" + n), i.b('        <span class="bloko-icon'), i.b("\n" + n), i.s(i.f("expanded", e, t, 1), e, t, 0, 616, 684, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b("                        bloko-icon_chevron-up"), i.b("\n" + n)
                }), e.pop()), i.s(i.f("expanded", e, t, 1), e, t, 1, 0, 0, "") || (i.b("                        bloko-icon_chevron-down"), i.b("\n" + n)), i.b('                     bloko-icon_initial-impact"'), i.b("\n" + n), i.b('              data-qa="bloko-tag__'), i.s(i.f("expanded", e, t, 1), e, t, 0, 911, 919, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b("collapse")
                }), e.pop()), i.s(i.f("expanded", e, t, 1), e, t, 1, 0, 0, "") || i.b("expand"), i.b('">'), i.b("\n" + n), i.b("        </span>"), i.b("\n" + n), i.b("    </button>"), i.b("\n" + n))
            }), e.pop()), i.s(i.d("items.length", e, t, 1), e, t, 1, 0, 0, "") || i.s(i.f("edited", e, t, 1), e, t, 1, 0, 0, "") || (i.s(i.f("selectable", e, t, 1), e, t, 1, 0, 0, "") || (i.b('        <span class="bloko-tag__section'), i.b("\n" + n), i.b("                     bloko-tag__section_text"), i.b("\n" + n), i.b('                     Bloko-TagList-SectionText">'), i.b("\n" + n)), i.s(i.f("selectable", e, t, 1), e, t, 0, 1250, 1610, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.b('        <button class="bloko-tag__section'), i.b("\n" + n), i.b("                       bloko-tag__section_text"), i.b("\n" + n), i.b("                       "), i.s(i.f("disabled", e, t, 1), e, t, 1, 0, 0, "") || i.b("bloko-tag__section_active"), i.b("\n" + n), i.b("                       Bloko-TagList-Selectable"), i.b("\n" + n), i.b('                       Bloko-TagList-SectionText"'), i.b("\n" + n), i.b("                "), i.s(i.f("disabled", e, t, 1), e, t, 0, 1542, 1561, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b('disabled="disabled"')
                }), e.pop()), i.b("\n" + n), i.b('                type="button">'), i.b("\n" + n)
            }), e.pop()), i.b('        <span class="Bloko-TagList-Text"'), i.b("\n" + n), i.b('              data-qa="bloko-tag__text'), i.s(i.f("selectable", e, t, 1), e, t, 0, 1720, 1742, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                n.b(" bloko-tag__selectable")
            }), e.pop()), i.b('">'), i.b(i.rp("<textTemplate0", e, t, "")), i.b("</span>"), i.b("\n" + n), i.s(i.f("selectable", e, t, 1), e, t, 0, 1803, 1826, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.b("        </button>"), i.b("\n" + n)
            }), e.pop()), i.s(i.f("selectable", e, t, 1), e, t, 1, 0, 0, "") || (i.b("        </span>"), i.b("\n" + n))), i.fl()
        },
        partials: {
            "<textTemplate0": {
                name: "textTemplate",
                partials: {},
                subs: {}
            }
        },
        subs: {}
    })
}), define("bloko/blocks/tagList/textTemplate.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.b(i.v(i.f("text", e, t, 0))), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/blocks/tagList/hiddenSection.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.b('<input type="hidden"'), i.b("\n" + n), i.b('       class="Bloko-TagList-Value"'), i.b("\n" + n), i.b('       name="'), i.b(i.v(i.f("hidden", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('       value="'), i.b(i.v(i.f("hiddenValue", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('       data-tag="hidden-input"/>'), i.b("\n"), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/blocks/tagList/removeSection.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.s(i.f("removable", e, t, 1), e, t, 0, 14, 507, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.s(i.f("edited", e, t, 1), e, t, 1, 0, 0, "") || (i.b("<span"), i.s(i.f("disabled", e, t, 1), e, t, 1, 0, 0, "") || i.b(' class="bloko-icon-dynamic"'), i.b(">"), i.b("\n" + n), i.b('    <button class="bloko-tag-button Bloko-TagList-Remove"'), i.b("\n" + n), i.b('            data-qa="bloko-tag__cross"'), i.b("\n" + n), i.b("            "), i.s(i.f("disabled", e, t, 1), e, t, 0, 209, 228, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b('disabled="disabled"')
                }), e.pop()), i.b("\n" + n), i.b('            type="button">'), i.b("\n" + n), i.b('        <span class="bloko-icon'), i.b("\n" + n), i.b("                     bloko-icon_remove"), i.b("\n" + n), i.b("                     bloko-icon_initial-impact"), i.b("\n" + n), i.b("                     "), i.s(i.f("disabled", e, t, 1), e, t, 1, 0, 0, "") || i.b("bloko-icon_highlighted-action"), i.b('"></span>'), i.b("\n" + n), i.b("    </button>"), i.b("\n" + n), i.b("</span>"), i.b("\n" + n))
            }), e.pop()), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/blocks/tagList/editableSection.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.s(i.f("editable", e, t, 1), e, t, 0, 13, 272, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.s(i.f("edited", e, t, 1), e, t, 0, 25, 260, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b('<span class="bloko-tag__section bloko-tag__section_edit">'), i.b("\n" + n), i.b('    <input type="text"'), i.b("\n" + n), i.b('           class="bloko-input bloko-input_small Bloko-TagList-EditInput"'), i.b("\n" + n), i.b('           value="'), i.b(i.v(i.f("text", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('           data-qa="bloko-tag-edit-input"/>'), i.b("\n" + n), i.b("</span>"), i.b("\n" + n)
                }), e.pop())
            }), e.pop()), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/blocks/tagList/editableAction.mustache", ["hogan"], function(e) {
    return new e.Template({
        code: function(e, t, n) {
            var i = this;
            return i.b(n = n || ""), i.s(i.f("editable", e, t, 1), e, t, 0, 13, 1635, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                i.s(i.f("edited", e, t, 1), e, t, 0, 25, 1105, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b("<span"), i.s(i.f("disabled", e, t, 1), e, t, 1, 0, 0, "") || i.b(' class="bloko-icon-dynamic"'), i.b(">"), i.b("\n" + n), i.b('    <button class="bloko-tag-button'), i.b("\n" + n), i.b("                   Bloko-TagList-EditControl"), i.b("\n" + n), i.b('                   Bloko-TagList-EditCancel"'), i.b("\n" + n), i.b('            data-qa="bloko-tag-edit-cancel"'), i.b("\n" + n), i.b("            "), i.s(i.f("disabled", e, t, 1), e, t, 0, 281, 300, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                        n.b('disabled="disabled"')
                    }), e.pop()), i.b("\n" + n), i.b('            type="button">'), i.b("\n" + n), i.b('        <span class="bloko-icon'), i.b("\n" + n), i.b("                     bloko-icon_cancel"), i.b("\n" + n), i.b("                     bloko-icon_initial-impact"), i.b("\n" + n), i.b("                     "), i.s(i.f("disabled", e, t, 1), e, t, 1, 0, 0, "") || i.b("bloko-icon_highlighted-action"), i.b('"></span>'), i.b("\n" + n), i.b("    </button>"), i.b("\n" + n), i.b("</span>"), i.b("\n" + n), i.b("<span"), i.s(i.f("disabled", e, t, 1), e, t, 1, 0, 0, "") || i.b(' class="bloko-icon-dynamic"'), i.b(">"), i.b("\n" + n), i.b('    <button class="bloko-tag-button'), i.b("\n" + n), i.b("                   Bloko-TagList-EditControl"), i.b("\n" + n), i.b('                   Bloko-TagList-EditDone"'), i.b("\n" + n), i.b('            data-qa="bloko-tag-edit-done"'), i.b("\n" + n), i.b("            "), i.s(i.f("disabled", e, t, 1), e, t, 0, 818, 837, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                        n.b('disabled="disabled"')
                    }), e.pop()), i.b("\n" + n), i.b('            type="button">'), i.b("\n" + n), i.b('        <span class="bloko-icon'), i.b("\n" + n), i.b("                     bloko-icon_done"), i.b("\n" + n), i.b("                     bloko-icon_initial-secondary"), i.b("\n" + n), i.b("                     "), i.s(i.f("disabled", e, t, 1), e, t, 1, 0, 0, "") || i.b("bloko-icon_highlighted-action"), i.b('"></span>'), i.b("\n" + n), i.b("    </button>"), i.b("\n" + n), i.b("</span>"), i.b("\n" + n)
                }), e.pop()), i.s(i.f("edited", e, t, 1), e, t, 1, 0, 0, "") || (i.b("<span"), i.s(i.f("disabled", e, t, 1), e, t, 1, 0, 0, "") || i.b(' class="bloko-icon-dynamic"'), i.b(">"), i.b("\n" + n), i.b('    <button class="bloko-tag-button'), i.b("\n" + n), i.b('                   Bloko-TagList-EditAction"'), i.b("\n" + n), i.b('            data-qa="bloko-tag-edit-action"'), i.b("\n" + n), i.b("            "), i.s(i.f("disabled", e, t, 1), e, t, 0, 1339, 1358, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b('disabled="disabled"')
                }), e.pop()), i.b("\n" + n), i.b('            type="button">'), i.b("\n" + n), i.b('        <span class="bloko-icon'), i.b("\n" + n), i.b("                     bloko-icon_edit"), i.b("\n" + n), i.b("                     bloko-icon_initial-impact"), i.b("\n" + n), i.b("                     "), i.s(i.f("disabled", e, t, 1), e, t, 1, 0, 0, "") || i.b("bloko-icon_highlighted-action"), i.b('"></span>'), i.b("\n" + n), i.b("    </button>"), i.b("\n" + n), i.b("</span>"), i.b("\n" + n))
            }), e.pop()), i.fl()
        },
        partials: {},
        subs: {}
    })
}), define("bloko/blocks/tagList/inlineTagListView", ["underscore", "jquery", "backbone", "bloko/common/constants/keyboard", "bloko/common/textSelection", "bloko/blocks/tagList/inline.mustache", "bloko/blocks/tagList/textSection.mustache", "bloko/blocks/tagList/textTemplate.mustache", "bloko/blocks/tagList/hiddenSection.mustache", "bloko/blocks/tagList/removeSection.mustache", "bloko/blocks/tagList/editableSection.mustache", "bloko/blocks/tagList/editableAction.mustache"], function(e, t, n, i, o, s, a, r, l, c, d, h) {
    return n.View.extend({
        tagName: "span",
        className: "Bloko-TagList",
        _defaults: {
            hiddenFieldName: "",
            defaultSelected: !0,
            cssClasses: {
                animated: "bloko-tag_animated"
            },
            bindings: {
                tag: ".Bloko-TagList-Tag"
            }
        },
        template: function(e) {
            return s.render(e, {
                textSection: a,
                textTemplate: this.options.textTemplate || r,
                hiddenSection: l,
                removeSection: c,
                editableSection: d,
                editableAction: h
            }).trim()
        },
        makeTemplateData: function(e) {
            return {
                items: [].concat(e.toJSON()),
                hidden: this.options.hiddenFieldName,
                stretched: this.options.stretched
            }
        },
        events: {
            "click .Bloko-TagList-Remove": "removeTagOnClick",
            "click .Bloko-TagList-Selectable": "selectTag",
            "click .Bloko-TagList-EditCancel": "cancelEdit",
            "click .Bloko-TagList-EditAction": "editAction",
            "click .Bloko-TagList-EditDone": "editDone",
            "blur .Bloko-TagList-EditInput": "blurEditInput",
            "keydown .Bloko-TagList-EditInput": "keyDown"
        },
        initialize: function(e) {
            this.tags = this.collection, this.options = t.extend({}, this._defaults, e.options), this.listenTo(this.tags, "add", this.renderTagAdd), this.listenTo(this.tags, "change", this.renderTagChange), this.listenTo(this.tags, "remove", this.renderTagRemove)
        },
        initTags: function() {
            var e = [];
            t(".Bloko-TagList-Tag", this.$el).each(function(n, i) {
                var o = t(i),
                    s = o.attr("data-tag-id");
                e.push({
                    id: s,
                    text: o.text().trim(),
                    hiddenValue: s
                })
            }), this.setTags(e)
        },
        $nodeByTagId: function(e) {
            return this.$('[data-tag-id="' + this.escapeId(e) + '"]')
        },
        escapeId: function(e) {
            return e.toString().replace(/\\/g, "\\\\").replace(/"/g, '\\"')
        },
        renderTagAdd: function(e) {
            return 0 === this.$nodeByTagId(e.get("id")).length && this.$el.append(this.template(this.makeTemplateData(e))), this.trigger("Bloko-TagList-Added", e.toJSON()), this
        },
        renderTagChange: function(e) {
            return this.$nodeByTagId(e.get("id")).replaceWith(this.template(this.makeTemplateData(e))), this.trigger("Bloko-TagList-Changed", e.toJSON()), this
        },
        renderTagRemove: function(e) {
            return this.$nodeByTagId(e.get("id")).remove(), this.trigger("Bloko-TagList-Removed", e.toJSON()), this
        },
        selectTag: function(e) {
            var t = this.getTagFromEvent(e);
            return this.options.defaultSelected && this.toggleSelect(t.get("id"), !t.get("selected")), this.trigger("Bloko-TagList-ToggleSelected", t.toJSON()), this
        },
        setTags: function(e) {
            return e = [].concat(e), this.tags.set(e, {
                parse: !0
            }), this
        },
        getTag: function(e) {
            return this.tags.get(e).toJSON()
        },
        getTags: function() {
            return this.tags.toJSON()
        },
        addTag: function(e) {
            return e = [].concat(e), this.tags.add(e, {
                parse: !0
            }), this
        },
        removeTag: function(e) {
            return this.tags.remove(String(e)), this
        },
        setTagText: function(e, t) {
            var n = this.tags.get(e);
            if (n) {
                if (0 === t.length) return void this.removeTag(e);
                n.set({
                    edited: !1,
                    text: t
                })
            }
        },
        toggleSelect: function(e, t) {
            var n = this.tags.get(e);
            return n && n.set("selected", t), this
        },
        toggleDisabled: function(e, t) {
            var n = this.tags.get(e);
            return n && n.set("disabled", t), this
        },
        getTagId: function(e) {
            return t(e).attr("data-tag-id") || t(e).closest(".Bloko-TagList-Tag").attr("data-tag-id")
        },
        getTagFromEvent: function(e) {
            var t = this.getTagId(e.currentTarget);
            return this.tags.get(t)
        },
        removeTagOnClick: function(e) {
            var t = this.getTagId(e.currentTarget);
            this.removeTag(t)
        },
        cancelEdit: function(e) {
            clearTimeout(this.blurTimeout);
            var t = this.getTagFromEvent(e);
            t.get("edited") && this.setTagText(t, t.previous("text"))
        },
        keyDown: function(e) {
            e.keyCode === i.KEY_CODES.ENTER ? (e.preventDefault(), this.editDone(e)) : e.keyCode === i.KEY_CODES.ESC && (e.preventDefault(), t(e.currentTarget).blur(), this.cancelEdit(e))
        },
        blurEditInput: function(e) {
            var t = this;
            this.blurTimeout = setTimeout(function() {
                t.editDone(e)
            }, 250)
        },
        editAction: function(e) {
            var n = this.getTagFromEvent(e),
                i = t(e.currentTarget).closest(".Bloko-TagList-Tag"),
                s = t(".Bloko-TagList-SectionText", i).outerWidth();
            n.set("edited", !0);
            var a = this.$nodeByTagId(n.get("id")),
                r = t(".Bloko-TagList-EditInput", a),
                l = this.calculateInputWidth(a, s);
            r.outerWidth(l), o.setCaretPosition(r[0], r.val().length)
        },
        editDone: function(e) {
            clearTimeout(this.blurTimeout);
            var n = this.getTagFromEvent(e),
                i = t(e.currentTarget).closest(".Bloko-TagList-Tag"),
                o = t(".Bloko-TagList-EditInput", i);
            this.setTagText(n.id, o.val().trim())
        },
        calculateInputWidth: function(e, n) {
            var i = this.$el.width(),
                o = n;
            return t(".Bloko-TagList-EditControl", e).each(function(e, n) {
                o += t(n).outerWidth()
            }), o > i && (n -= o - i), n
        },
        setHiddenValue: function(e, n) {
            this.options.hiddenFieldName && t(".Bloko-TagList-Value", this.$nodeByTagId(e)).val(n)
        }
    })
}), define("bloko/blocks/tagList/tagList", ["underscore", "jquery", "backbone", "bloko/common/tree/model", "bloko/common/tree/countableModel", "bloko/common/tree/collection", "bloko/blocks/tagList/inlineTagListView"], function(e, t, n, i, o, s, a) {
    return {
        create: function(e, t) {
            var n = this.createView(e, t);
            return this.createPublicInterface(n)
        },
        createView: function(e, t) {
            return new a({
                collection: new s(null, {
                    model: this.createTagModel(t)
                }),
                el: e,
                options: t
            })
        },
        createTagModel: function(e) {
            return i.extend(this.getOptions(e))
        },
        getOptions: function(e) {
            return e ? {
                removable: !!e.removable,
                editable: !!e.editable,
                selectable: !!e.selectable,
                newTag: void 0 === e.animateNew || !!e.animateNew
            } : {
                editable: !1,
                removable: !1,
                selectable: !1,
                newTag: !0
            }
        },
        createPublicInterface: function(e) {
            var i = t.extend({
                get: e.getTag.bind(e),
                getAll: e.getTags.bind(e),
                set: e.setTags.bind(e),
                add: e.addTag.bind(e),
                remove: e.removeTag.bind(e),
                setTagText: e.setTagText.bind(e),
                getTagElement: e.$nodeByTagId.bind(e),
                toggleSelect: e.toggleSelect.bind(e),
                toggleDisabled: e.toggleDisabled.bind(e),
                setHiddenValue: e.setHiddenValue.bind(e),
                initTags: e.initTags.bind(e)
            }, n.Events);
            return e.on("Bloko-TagList-Added", function(e) {
                i.trigger("Bloko-TagList-Added", e)
            }), e.on("Bloko-TagList-Changed", function(e) {
                i.trigger("Bloko-TagList-Changed", e)
            }), e.on("Bloko-TagList-Removed", function(e) {
                i.trigger("Bloko-TagList-Removed", e)
            }), e.on("Bloko-TagList-ToggleSelected", function(e) {
                i.trigger("Bloko-TagList-ToggleSelected", e)
            }), i
        }
    }
}), define("bloko/blocks/treeSelector/treeSelectorHelper", [], function() {
    function e(t, n) {
        return t.forEach(function(t) {
            n(t), t.items && t.items.length && e(t.items, n)
        }), t
    }
    return {
        walker: e,
        getSelectedItemsWithoutSelectedParent: function(e) {
            var t = e.reduce(function(e, t) {
                return t.items && t.items.length && (e[t.id] = !0), e
            }, {});
            return e.filter(function(e) {
                return !t[e.parent]
            })
        },
        sort: function(t, n) {
            return t.sort(n), e(t, function(e) {
                e.items && e.items.length && e.items.sort(n)
            })
        }
    }
}), define("bloko/blocks/treeSelector/treeSelectorError", ["bloko/common/core/Debug"], function(e) {
    return {
        ID_IS_NULL: "BlokoTreeSelector: ID not passed",
        ITEM_NOT_FOUND: "BlokoTreeSelector: the selected item can not be found",
        WRONG_TYPE_RADIO: 'BlokoTreeSelector: add to selected items can not be, because type="radio"',
        METHOD_ARGUMENT_NOT_FUNCTION: "BlokoTreeSelector: method got no argument function",
        ELEMENT_NOT_SELECTABLE: "BlokoTreeSelector: element not selectable",
        error: function(t, n) {
            e.log("log error", new Error(t.replace("{{#message}}", n)))
        }
    }
});
_typeof = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : _typeof2(e)
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e)
};
define("bloko/blocks/treeSelector/treeSelectorModelsHandler", ["jquery", "backbone"], function(e, t) {
        return function() {
            var n = e.extend({
                set: function(e, t) {
                    if ("object" === (void 0 === t ? "undefined" : _typeof(t)))
                        for (var i in t) "expanded" === i && 0 === e.attributes.items.length || t[i] !== e.attributes[i] && (e.attributes[i] = t[i], "selected" === i && (e.attributes.changed = !0), n.trigger("change:" + i, e))
                },
                toJSON: function(t) {
                    var n = t.attributes;
                    return {
                        id: n.id,
                        text: n.text,
                        name: n.name,
                        parent: n.parent ? n.parent.attributes.id : null,
                        expanded: n.expanded,
                        selected: n.selected,
                        disabled: n.disabled,
                        items: n.items.map(function(e) {
                            return e.attributes.id
                        }),
                        additional: n.additional ? e.extend(!0, {}, n.additional) : null
                    }
                }
            }, t.Events);
            return n
        }
    }), define("bloko/blocks/treeSelector/treeSelectorCollection", ["jquery", "backbone"], function(e, t) {
        return function(n) {
            var i = {};
            return e.extend({
                get: function() {
                    return n
                },
                add: function(e) {
                    n.push(e), i[e.attributes.id] = e
                },
                getById: function(e) {
                    return i[e]
                },
                getByAttributes: function(e) {
                    return n.filter(function(t) {
                        var n = t.attributes,
                            i = !0;
                        for (var o in e) n[o] !== e[o] && (i = !1);
                        return i
                    })
                }
            }, t.Events)
        }
    }), define("bloko/blocks/treeSelector/treeSelectorView", ["jquery", "backbone", "underscore", "bloko/common/constants/keyboard", "bloko/common/supports"], function(e, t, n, i, o) {
        return t.View.extend({
            initialize: function(e) {
                this.treeSelectorInterface = e.treeSelectorInterface, this.modelsHandler = e.modelsHandler, this.collection = e.collection;
                var t = o.IE() || o.IEMobile();
                "checkbox" === e.type && t ? this.delegateEvents({
                    "click .Bloko-TreeSelector-Chevron": "toggleList",
                    "click .Bloko-TreeSelector-Expanded": "toggleList",
                    "click .Bloko-TreeSelector-Input": "changeByEvent",
                    "keydown .Bloko-TreeSelector-Input": "keyboardControlIE",
                    "keydown .Bloko-TreeSelector-Action": "keyboardControl"
                }) : this.delegateEvents({
                    "click .Bloko-TreeSelector-Chevron": "toggleList",
                    "click .Bloko-TreeSelector-Expanded": "toggleList",
                    "change .Bloko-TreeSelector-Action": "changeByEvent",
                    "keydown .Bloko-TreeSelector-Action": "keyboardControl"
                })
            },
            keyboardControl: function(e) {
                switch (e.keyCode) {
                    case i.KEY_CODES.ARROW_LEFT:
                        this.toggleList(e, !1), e.preventDefault();
                        break;
                    case i.KEY_CODES.ARROW_RIGHT:
                        this.toggleList(e, !0), e.preventDefault()
                }
            },
            keyboardControlIE: function(e) {
                switch (e.keyCode) {
                    case i.KEY_CODES.SPACE:
                        this.changeByEvent(e), e.preventDefault()
                }
            },
            toggleList: function(e, t) {
                var n = this._getCurrentIdByEvent(e),
                    i = this.collection.getById(n);
                return i.attributes.items && this.modelsHandler.set(i, {
                    expanded: t || !i.attributes.expanded
                }), !1
            },
            changeByEvent: function(e) {
                var t = this._getCurrentIdByEvent(e);
                this.treeSelectorInterface.change([t])
            },
            _getCurrentIdByEvent: function(t) {
                return e(t.target).closest(".Bloko-TreeSelector-Element").attr("data-id")
            }
        })
    }), define("bloko/blocks/treeSelector/treeSelectorIcons.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<span class="bloko-icon'), i.b("\n" + n), i.s(i.f("expanded", e, t, 1), e, t, 0, 50, 104, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b("                bloko-icon_chevron-down"), i.b("\n" + n)
                }), e.pop()), i.s(i.f("expanded", e, t, 1), e, t, 1, 0, 0, "") || (i.b("                bloko-icon_chevron-right"), i.b("\n" + n)), i.b("             bloko-icon_initial-action"), i.b("\n" + n), i.b('             bloko-icon_highlighted-impact"></span>'), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("bloko/blocks/treeSelector/treeSelectorViewItem", ["jquery", "bloko/blocks/treeSelector/treeSelectorIcons.mustache"], function(e, t) {
        return function(n) {
            function i(t) {
                t.view.$el || (t.view.$el = e(t.view.el))
            }
            n.on("change:selected", function(e) {
                e.view.input.checked = e.attributes.selected
            }), n.on("change:expanded", function(n) {
                n.view.$icon || (n.view.$icon = e(n.view.icon)), n.view.$list || (n.view.$list = e(n.view.list)), i(n),
                    function e(t) {
                        var n = t.attributes.items;
                        if (!t.attributes.expanded || !n || !n.length) return [];
                        var i = n.reduce(function(t, n) {
                            var i = e(n);
                            return i.length && Array.prototype.push.apply(t, i), t
                        }, []);
                        return n.concat(i)
                    }(n).forEach(function(e) {
                        e.view.input && (e.view.input.disabled = !!e.attributes.disabled)
                    }), n.view.$icon.html(t.render({
                        expanded: n.attributes.expanded
                    })), n.view.$list.toggleClass("g-hidden"), n.view.$el.attr("data-qa", n.attributes.expanded ? "bloko-tree-selector-item bloko-tree-selector-item-expanded" : "bloko-tree-selector-item")
            }), n.on("change:indeterminate", function(e) {
                e.view.input.indeterminate = e.attributes.indeterminate
            }), n.on("change:disabled", function(e) {
                e.view.input && function(e) {
                    var t = e.attributes.parent;
                    for (; t;) {
                        if (!t.attributes.expanded) return !1;
                        t = t.attributes.parent
                    }
                    return !0
                }(e) && (e.view.input.disabled = !!e.attributes.disabled)
            }), n.on("change:hidden", function(e) {
                i(e), e.view.$el.toggleClass("g-hidden", e.attributes.hidden)
            })
        }
    }), define("bloko/blocks/treeSelector/treeSelectorAfterLabel.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="bloko-tree-selector-after-label'), i.s(i.d("items.length", e, t, 1), e, t, 0, 60, 114, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b(" bloko-tree-selector-after-label_parent-without-action")
                }), e.pop()), i.b('">'), i.b("\n" + n), i.b(i.rp("<afterLabelTemplate0", e, t, "    ")), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {
                "<afterLabelTemplate0": {
                    name: "afterLabelTemplate",
                    partials: {},
                    subs: {}
                }
            },
            subs: {}
        })
    }), define("bloko/blocks/treeSelector/treeSelectorAfterLabelLeavesOnly.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="bloko-tree-selector-after-label'), i.s(i.d("items.length", e, t, 1), e, t, 0, 60, 111, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b(" bloko-tree-selector-after-label_parent-with-action")
                }), e.pop()), i.b('">'), i.b("\n" + n), i.b(i.rp("<afterLabelTemplate0", e, t, "    ")), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {
                "<afterLabelTemplate0": {
                    name: "afterLabelTemplate",
                    partials: {},
                    subs: {}
                }
            },
            subs: {}
        })
    }), define("bloko/blocks/treeSelector/treeSelectorElementTypeCheckbox.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="Bloko-TreeSelector-Element bloko-tree-selector-item" data-id="'), i.b(i.v(i.f("id", e, t, 0))), i.b('" data-qa="bloko-tree-selector-item">'), i.b("\n" + n), i.b('    <div class="Bloko-TreeSelector-SearchContent bloko-form-item">'), i.b("\n" + n), i.b('        <div class="bloko-tree-selector-content Bloko-TreeSelector-Action">'), i.b("\n" + n), i.b('            <label class="bloko-checkbox">'), i.b("\n" + n), i.b('                <input class="bloko-checkbox__input Bloko-TreeSelector-Input"'), i.b("\n" + n), i.b('                       name="'), i.b(i.v(i.f("name", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('                       value="'), i.b(i.v(i.f("id", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('                       data-qa="bloko-tree-selector-input"'), i.b("\n" + n), i.b('                       autocomplete="off"'), i.b("\n" + n), i.s(i.f("disabled", e, t, 1), e, t, 0, 596, 667, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b('                           disabled="disabled"'), i.b("\n" + n)
                }), e.pop()), i.s(i.f("selected", e, t, 1), e, t, 0, 717, 786, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b('                           checked="checked"'), i.b("\n" + n)
                }), e.pop()), i.b('                       type="checkbox"/>'), i.b("\n" + n), i.b('                <span class="bloko-checkbox__text"'), i.b("\n" + n), i.b('                      data-qa="bloko-tree-selector-item-text">'), i.b(i.rp("<labelTemplate0", e, t, "")), i.b("</span>"), i.b("\n" + n), i.b("            </label>"), i.b("\n" + n), i.b("        </div>"), i.b("\n" + n), i.b(i.rp("<afterLabelWrapperTemplate1", e, t, "        ")), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {
                "<labelTemplate0": {
                    name: "labelTemplate",
                    partials: {},
                    subs: {}
                },
                "<afterLabelWrapperTemplate1": {
                    name: "afterLabelWrapperTemplate",
                    partials: {},
                    subs: {}
                }
            },
            subs: {}
        })
    }), define("bloko/blocks/treeSelector/treeSelectorListTypeCheckbox.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="Bloko-TreeSelector-Element bloko-tree-selector-item'), i.s(i.f("parent", e, t, 1), e, t, 0, 74, 110, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b(" bloko-tree-selector-item_has-parent")
                }), e.pop()), i.b('"'), i.b("\n" + n), i.b('    data-id="'), i.b(i.v(i.f("id", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('    data-qa="bloko-tree-selector-item">'), i.b("\n" + n), i.b('    <div class="bloko-form-item Bloko-TreeSelector-SearchContent">'), i.b("\n" + n), i.b('        <div class="bloko-tree-selector-content Bloko-TreeSelector-Action">'), i.b("\n" + n), i.b('            <span class="bloko-tree-selector-item-spacer">'), i.b("\n" + n), i.b('                <span class="bloko-icon-dynamic Bloko-TreeSelector-Chevron" data-qa="bloko-tree-selector-toogle-node">'), i.b("\n" + n), i.b('                    <span class="bloko-icon-link Bloko-TreeSelector-Icon">'), i.b("\n" + n), i.b(i.rp("<iconsTemplate0", e, t, "                        ")), i.b("                    </span>"), i.b("</span>"), i.b("</span>"), i.b('<label class="bloko-checkbox">'), i.b("\n" + n), i.b('                <input class="bloko-checkbox__input Bloko-TreeSelector-Input"'), i.b("\n" + n), i.b('                       name="'), i.b(i.v(i.f("name", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('                       value="'), i.b(i.v(i.f("id", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('                       data-qa="bloko-tree-selector-input"'), i.b("\n" + n), i.b('                       autocomplete="off"'), i.b("\n" + n), i.b('                       type="checkbox"'), i.b("\n" + n), i.s(i.f("disabled", e, t, 1), e, t, 0, 1082, 1153, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b('                           disabled="disabled"'), i.b("\n" + n)
                }), e.pop()), i.s(i.f("selected", e, t, 1), e, t, 0, 1203, 1272, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b('                           checked="checked"'), i.b("\n" + n), i.b("                       ")
                }), e.pop()), i.b("/>"), i.b("\n" + n), i.b('                <span class="bloko-checkbox__text"'), i.b("\n" + n), i.b('                      data-qa="bloko-tree-selector-item-text">'), i.b("\n" + n), i.b(i.rp("<labelTemplate1", e, t, "                    ")), i.b("                </span>"), i.b("\n" + n), i.b("            </label>"), i.b("\n" + n), i.b("        </div>"), i.b("\n" + n), i.b(i.rp("<afterLabelWrapperTemplate2", e, t, "        ")), i.b("    </div>"), i.b("\n" + n), i.b('    <div class="Bloko-TreeSelector-List '), i.s(i.f("expanded", e, t, 1), e, t, 1, 0, 0, "") || i.b(" g-hidden"), i.b(' bloko-tree-selector__items"'), i.b("\n" + n), i.b('        data-qa="bloko-tree-selector-items">'), i.b(i.t(i.f("itemsTemplate", e, t, 0))), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {
                "<iconsTemplate0": {
                    name: "iconsTemplate",
                    partials: {},
                    subs: {}
                },
                "<labelTemplate1": {
                    name: "labelTemplate",
                    partials: {},
                    subs: {}
                },
                "<afterLabelWrapperTemplate2": {
                    name: "afterLabelWrapperTemplate",
                    partials: {},
                    subs: {}
                }
            },
            subs: {}
        })
    }), define("bloko/blocks/treeSelector/treeSelectorElementTypeRadio.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="Bloko-TreeSelector-Element bloko-tree-selector-item"'), i.b("\n" + n), i.b('    data-id="'), i.b(i.v(i.f("id", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('    data-qa="bloko-tree-selector-item">'), i.b("\n" + n), i.b('    <div class="bloko-form-item Bloko-TreeSelector-SearchContent">'), i.b("\n" + n), i.b('        <div class="bloko-tree-selector-content Bloko-TreeSelector-Action">'), i.b("\n" + n), i.b('            <label class="bloko-radio">'), i.b("\n" + n), i.b('                <input class="bloko-radio__input Bloko-TreeSelector-Input"'), i.b("\n" + n), i.b('                       name="'), i.b(i.v(i.f("name", e, t, 0))), i.b("-"), i.b(i.v(i.f("id", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('                       value="'), i.b(i.v(i.f("id", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('                       autocomplete="off"'), i.b("\n" + n), i.b('                       data-qa="bloko-tree-selector-input"'), i.b("\n" + n), i.b('                       type="radio"'), i.b("\n" + n), i.s(i.f("disabled", e, t, 1), e, t, 0, 641, 712, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b('                           disabled="disabled"'), i.b("\n" + n)
                }), e.pop()), i.s(i.f("selected", e, t, 1), e, t, 0, 762, 831, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b('                           checked="checked"'), i.b("\n" + n), i.b("                       ")
                }), e.pop()), i.b("/>"), i.b("\n" + n), i.b('                <span class="bloko-radio__text" data-qa="bloko-tree-selector-item-text">'), i.b(i.rp("<labelTemplate0", e, t, "")), i.b("</span>"), i.b("\n" + n), i.b("            </label>"), i.b("\n" + n), i.b("        </div>"), i.b("\n" + n), i.b(i.rp("<afterLabelWrapperTemplate1", e, t, "        ")), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {
                "<labelTemplate0": {
                    name: "labelTemplate",
                    partials: {},
                    subs: {}
                },
                "<afterLabelWrapperTemplate1": {
                    name: "afterLabelWrapperTemplate",
                    partials: {},
                    subs: {}
                }
            },
            subs: {}
        })
    }), define("bloko/blocks/treeSelector/treeSelectorListTypeRadio.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="Bloko-TreeSelector-Element bloko-tree-selector-item'), i.s(i.f("parent", e, t, 1), e, t, 0, 74, 110, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b(" bloko-tree-selector-item_has-parent")
                }), e.pop()), i.b('"'), i.b("\n" + n), i.b('    data-id="'), i.b(i.v(i.f("id", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('    data-qa="bloko-tree-selector-item">'), i.b("\n" + n), i.b('    <div class="bloko-form-item Bloko-TreeSelector-SearchContent">'), i.b("\n" + n), i.b('        <div class="bloko-tree-selector-content Bloko-TreeSelector-Action">'), i.b("\n" + n), i.b('            <span class="bloko-tree-selector-item-spacer">'), i.b("\n" + n), i.b('                <span class="bloko-icon-dynamic Bloko-TreeSelector-Chevron" data-qa="bloko-tree-selector-toogle-node">'), i.b("\n" + n), i.b('                    <span class="bloko-icon-link Bloko-TreeSelector-Icon">'), i.b("\n" + n), i.b(i.rp("<iconsTemplate0", e, t, "                        ")), i.b("                    </span>"), i.b("</span>"), i.b("</span>"), i.b('<label class="bloko-radio">'), i.b("\n" + n), i.b('                <input class="bloko-radio__input Bloko-TreeSelector-Input"'), i.b("\n" + n), i.b('                       name="'), i.b(i.v(i.f("name", e, t, 0))), i.b("-"), i.b(i.v(i.f("id", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('                       type="radio"'), i.b("\n" + n), i.b('                       value="'), i.b(i.v(i.f("id", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('                       autocomplete="off"'), i.b("\n" + n), i.b('                       data-qa="bloko-tree-selector-input"'), i.b("\n" + n), i.s(i.f("disabled", e, t, 1), e, t, 0, 1076, 1147, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b('                           disabled="disabled"'), i.b("\n" + n)
                }), e.pop()), i.s(i.f("selected", e, t, 1), e, t, 0, 1197, 1266, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b('                           checked="checked"'), i.b("\n" + n), i.b("                       ")
                }), e.pop()), i.b("/>"), i.b("\n" + n), i.b('                <span class="bloko-radio__text" data-qa="bloko-tree-selector-item-text">'), i.b("\n" + n), i.b(i.rp("<labelTemplate1", e, t, "                    ")), i.b("                </span>"), i.b("\n" + n), i.b("            </label>"), i.b("\n" + n), i.b("        </div>"), i.b("\n" + n), i.b(i.rp("<afterLabelWrapperTemplate2", e, t, "        ")), i.b("    </div>"), i.b("\n" + n), i.b('    <div class="Bloko-TreeSelector-List '), i.s(i.f("expanded", e, t, 1), e, t, 1, 0, 0, "") || i.b("g-hidden"), i.b(' bloko-tree-selector__items"'), i.b("\n" + n), i.b('        data-qa="bloko-tree-selector-items">'), i.b(i.t(i.f("itemsTemplate", e, t, 0))), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {
                "<iconsTemplate0": {
                    name: "iconsTemplate",
                    partials: {},
                    subs: {}
                },
                "<labelTemplate1": {
                    name: "labelTemplate",
                    partials: {},
                    subs: {}
                },
                "<afterLabelWrapperTemplate2": {
                    name: "afterLabelWrapperTemplate",
                    partials: {},
                    subs: {}
                }
            },
            subs: {}
        })
    }), define("bloko/blocks/treeSelector/treeSelectorListLeavesOnly.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="Bloko-TreeSelector-Element '), i.b("bloko-tree-selector-item "), i.b("bloko-tree-selector-item_without-action"), i.s(i.f("parent", e, t, 1), e, t, 0, 162, 213, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b(" bloko-tree-selector-item_without-action-has-parent")
                }), e.pop()), i.b('"'), i.b("\n" + n), i.b('     data-id="'), i.b(i.v(i.f("id", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('     data-qa="bloko-tree-selector-item">'), i.b("\n" + n), i.b('    <div class="bloko-form-item Bloko-TreeSelector-SearchContent Bloko-TreeSelector-Action">'), i.b("\n" + n), i.b('        <div class="bloko-tree-selector-content">'), i.b("\n" + n), i.b('            <span class="bloko-tree-selector-item-spacer">'), i.b("\n" + n), i.b('                <span class="bloko-icon-dynamic Bloko-TreeSelector-Chevron" data-qa="bloko-tree-selector-toogle-node">'), i.b("\n" + n), i.b('                    <span class="bloko-icon-link Bloko-TreeSelector-Icon" tabindex="0">'), i.b(i.rp("<iconsTemplate0", e, t, "")), i.b("</span>"), i.b("</span>"), i.b("</span>"), i.b('<div class="bloko-tree-selector-item__text Bloko-TreeSelector-Expanded"'), i.b("\n" + n), i.b('                 data-qa="bloko-tree-selector-item-text">'), i.b(i.rp("<labelTemplate1", e, t, "")), i.b("\n" + n), i.b("            </div>"), i.b("\n" + n), i.b(i.rp("<afterLabelWrapperTemplate2", e, t, "            ")), i.b("        </div>"), i.b("\n" + n), i.b("    </div>"), i.b("\n"), i.b("\n" + n), i.b('    <div class="Bloko-TreeSelector-List'), i.s(i.f("expanded", e, t, 1), e, t, 1, 0, 0, "") || i.b(" g-hidden"), i.b(' bloko-tree-selector__items"'), i.b("\n" + n), i.b('        data-qa="bloko-tree-selector-items">'), i.b(i.t(i.f("itemsTemplate", e, t, 0))), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {
                "<iconsTemplate0": {
                    name: "iconsTemplate",
                    partials: {},
                    subs: {}
                },
                "<labelTemplate1": {
                    name: "labelTemplate",
                    partials: {},
                    subs: {}
                },
                "<afterLabelWrapperTemplate2": {
                    name: "afterLabelWrapperTemplate",
                    partials: {},
                    subs: {}
                }
            },
            subs: {}
        })
    }), define("bloko/blocks/treeSelector/treeSelector.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                return this.b(n = n || ""), this.b("<div></div>"), this.b("\n"), this.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("bloko/blocks/treeSelector/treeSelectorLabel.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b(i.v(i.f("text", e, t, 0))), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("bloko/blocks/treeSelector/treeSelector", ["jquery", "backbone", "bloko/common/core/Components", "bloko/blocks/treeSelector/treeSelectorError", "bloko/blocks/treeSelector/treeSelectorModelsHandler", "bloko/blocks/treeSelector/treeSelectorCollection", "bloko/blocks/treeSelector/treeSelectorView", "bloko/blocks/treeSelector/treeSelectorViewItem", "bloko/blocks/treeSelector/treeSelectorIcons.mustache", "bloko/blocks/treeSelector/treeSelectorAfterLabel.mustache", "bloko/blocks/treeSelector/treeSelectorAfterLabelLeavesOnly.mustache", "bloko/blocks/treeSelector/treeSelectorElementTypeCheckbox.mustache", "bloko/blocks/treeSelector/treeSelectorListTypeCheckbox.mustache", "bloko/blocks/treeSelector/treeSelectorElementTypeRadio.mustache", "bloko/blocks/treeSelector/treeSelectorListTypeRadio.mustache", "bloko/blocks/treeSelector/treeSelectorListLeavesOnly.mustache", "bloko/blocks/treeSelector/treeSelector.mustache", "bloko/blocks/treeSelector/treeSelectorLabel.mustache", "bloko/common/fuzzySearch", "bloko/common/events"], function(e, t, n, i, o, s, a, r, l, c, d, h, u, p, m, f, g, b, v, k) {
        var y = function(t) {
            var n = e(t.el),
                o = t.collection,
                s = o.get(),
                a = t.modelsHandler;
            new r(a);
            var y = t.labelTemplate || b,
                w = i,
                H = void 0,
                S = void 0,
                C = void 0,
                T = void 0,
                E = "bloko-tree-selector-default-name-" + Math.random(),
                _ = k.extend({
                    setSelected: function(e) {
                        switch (t.type) {
                            case "checkbox":
                                D(e, !1);
                                break;
                            case "radio":
                                N(e, !0)
                        }
                    },
                    getSelected: function() {
                        return o.getByAttributes({
                            selected: !0,
                            disabled: !1
                        }).map(function(e) {
                            return a.toJSON(e)
                        })
                    },
                    addSelected: function(e) {
                        if ("radio" === t.type) return void w.error(w.WRONG_TYPE_RADIO);
                        D(e, !0)
                    },
                    toggleDisabled: function(e) {
                        "function" == typeof e ? V("disabled", e) : w.error(w.METHOD_ARGUMENT_NOT_FUNCTION)
                    },
                    filterByContent: function(e) {
                        o.get().forEach(function(t) {
                            var n = v.match(e, t.attributes.searchText);
                            n && t.attributes.parent && (! function e(t) {
                                a.set(t, {
                                    consistFilterQuery: !0,
                                    hidden: !1
                                });
                                t.attributes.parent && e(t.attributes.parent)
                            }(t.attributes.parent), R(t.attributes.parent, !!e)), a.set(t, {
                                consistFilterQuery: n
                            })
                        });
                        var t = o.getByAttributes({
                                consistFilterQuery: !0
                            }),
                            n = t.reduce(function(e, t) {
                                var n = t.attributes,
                                    i = t.attributes.parent;
                                for (n && n.items && n.items.length && (e[n.id] = !0); i;) e[i.attributes.id] = !1, i = i.attributes.parent;
                                return e
                            }, {});
                        t.filter(function(e) {
                            return n[e.attributes.id]
                        }).forEach(function(e) {
                            ! function e(t) {
                                t.forEach(function(t) {
                                    a.set(t, {
                                        consistFilterQuery: !0,
                                        hidden: !1
                                    }), t.attributes.items && e(t.attributes.items)
                                })
                            }(e.attributes.items), a.set(e, {
                                expanded: !1
                            }), e.attributes.items.length && function e(t, n) {
                                t.forEach(function(t) {
                                    var i = t.attributes.items;
                                    i.length && (a.set(t, {
                                        expanded: n
                                    }), e(i, n))
                                })
                            }(e.attributes.items, !1)
                        }), o.get().forEach(function(e) {
                            a.set(e, {
                                hidden: !e.attributes.consistFilterQuery
                            })
                        })
                    },
                    toggleExpanded: function(e) {
                        "function" == typeof e ? V("expanded", e) : w.error(w.METHOD_ARGUMENT_NOT_FUNCTION)
                    },
                    change: function(e) {
                        switch (t.type) {
                            case "checkbox":
                                e.forEach(function(e) {
                                    var t = o.getById(e);
                                    t ? L(t, !t.attributes.selected) : w.error(w.ITEM_NOT_FOUND)
                                }), P();
                                break;
                            case "radio":
                                N(e)
                        }
                    },
                    getItem: function(e) {
                        return a.toJSON(o.getById(e))
                    }
                });
            switch (t.type) {
                case "checkbox":
                    H = h, S = t.leavesOnly ? f : u, C = t.leavesOnly ? c : d;
                    break;
                case "radio":
                    H = p, S = t.leavesOnly ? f : m, C = t.leavesOnly ? c : d;
                    break;
                default:
                    throw new Error('BlokoTreeSelector: the wrong type: "' + t.type + '", can be "checkbox" or "radio"')
            }
            var $ = t.afterLabelTemplate ? C : null;
            if (t.dataJSON) {
                var M = function n(i, s) {
                        var a = "";
                        var r = [];
                        var c = !1;
                        var d = !1;
                        for (var h = 0, u = i.length; h < u; h++) {
                            var p = void 0,
                                m = {
                                    attributes: {
                                        id: i[h].id.toString() || null,
                                        text: i[h].text || "",
                                        name: E,
                                        parent: null,
                                        items: [],
                                        expanded: !!i[h].expanded || !1,
                                        selected: !!i[h].selected || !1,
                                        disabled: !!i[h].disabled || !1,
                                        changed: !1,
                                        indeterminate: !1,
                                        additional: i[h].additional ? e.extend(!0, {}, i[h].additional) : null
                                    },
                                    view: {}
                                };
                            null === m.id && w.error(w.ID_IS_NULL), s && (m.attributes.parent = s, t.leavesOnly || "checkbox" !== t.type || s.attributes.selected && (m.attributes.selected = !0), m.attributes.selected ? c = !0 : d = !0, r.push(m), h === u - 1 && (t.leavesOnly || "checkbox" !== t.type || (s.attributes.indeterminate = c && d, s.attributes.selected = !d), t.leavesOnly && (s.attributes.selected = !1), s.attributes.items = r)), o.add(m), i[h].items && i[h].items.length ? a += n(i[h].items, m) : (p = H.render(m.attributes, {
                                labelTemplate: y,
                                afterLabelWrapperTemplate: $,
                                afterLabelTemplate: t.afterLabelTemplate
                            }), a += p)
                        }
                        if (s) return S.render(e.extend({
                            itemsTemplate: a
                        }, s.attributes), {
                            labelTemplate: y,
                            elementTemplate: H,
                            afterLabelWrapperTemplate: $,
                            afterLabelTemplate: t.afterLabelTemplate,
                            iconsTemplate: l
                        });
                        return a
                    }(t.dataJSON),
                    I = e(g.render()).append(M);
                if (I.find(".Bloko-TreeSelector-Element").each(function(t, n) {
                        s[t].view.el = n, s[t].view.action = n.querySelector(".Bloko-TreeSelector-Action"), s[t].view.input = s[t].view.action.querySelector(".Bloko-TreeSelector-Input"), s[t].view.list = n.querySelector(".Bloko-TreeSelector-List"), s[t].view.icon = n.querySelector(".Bloko-TreeSelector-Icon"), s[t].attributes.searchText = e(n.querySelector(".Bloko-TreeSelector-SearchContent")).text()
                    }), t.leavesOnly || "checkbox" !== t.type || o.getByAttributes({
                        indeterminate: !0
                    }).forEach(function(e) {
                        a.set(e, {
                                indeterminate: !1
                            }),
                            function e(t) {
                                a.set(t, {
                                    indeterminate: !0
                                });
                                t.attributes.parent && e(t.attributes.parent)
                            }(e)
                    }), "radio" === t.type) {
                    for (var x = o.getByAttributes({
                            selected: !0
                        }), B = x.length, O = 0; O < B - 1; O++) x[O].attributes.selected = !1;
                    T = x[B - 1]
                }
                n.append(I), I = null
            }
            function D(e, t) {
                var n = t || !1;
                !e || e.length ? (e.forEach(function(e) {
                    var t = o.getById(e);
                    t ? (n || (A(), n = !0), L(t, !0)) : w.error(w.ITEM_NOT_FOUND)
                }), P()) : A()
            }
            function A() {
                o.get().forEach(function(e) {
                    a.set(e, {
                        selected: !1,
                        indeterminate: !1
                    })
                })
            }
            function L(e, n) {
                e.attributes.items.length && t.leavesOnly ? w.error(w.ELEMENT_NOT_SELECTABLE) : (a.set(e, {
                    selected: n,
                    indeterminate: !1
                }), e.attributes.items && !t.leavesOnly && function e(t, n) {
                    t.forEach(function(t) {
                        a.set(t, {
                            selected: n,
                            indeterminate: !1
                        }), t.attributes.items.length && e(t.attributes.items, n)
                    })
                }(e.attributes.items, e.attributes.selected), e.attributes.parent && !t.leavesOnly && function e(t, n) {
                    var i = !0;
                    var o = !1;
                    t.attributes.items.forEach(function(e) {
                        e.attributes.selected !== n && (i = !1), e.attributes.indeterminate && (o = !0)
                    });
                    (t.attributes.selected || i) && a.set(t, {
                        selected: n
                    });
                    a.set(t, {
                        indeterminate: !1
                    });
                    !i || o ? a.set(t, {
                        indeterminate: !0
                    }) : a.set(t, {
                        indeterminate: !1
                    });
                    t.attributes.parent && e(t.attributes.parent, n)
                }(e.attributes.parent, e.attributes.selected))
            }
            function P() {
                var e = [];
                o.getByAttributes({
                    changed: !0
                }).forEach(function(t) {
                    e.push(a.toJSON(t)), a.set(t, {
                        changed: !1
                    })
                }), e.length && _._trigger("Bloko-TreeSelector-Changed", e)
            }
            function N(e, n) {
                if (e.length) {
                    var i = e[e.length - 1],
                        s = o.getById(i);
                    T && a.set(T, {
                        selected: !1,
                        indeterminate: !1
                    }), T = s, s.attributes.items.length && t.leavesOnly ? w.error(w.ELEMENT_NOT_SELECTABLE) : (e.length && a.set(s, {
                        selected: void 0 !== n ? n : !s.attributes.selected
                    }), P())
                } else A()
            }
            function V(e, t) {
                o.get().forEach(function(n) {
                    var i = {};
                    i[e] = !!t(a.toJSON(n)), a.set(n, i)
                })
            }
            function R(e, t) {
                a.set(e, {
                    expanded: t
                }), e.attributes.parent && R(e.attributes.parent, t)
            }
            return _
        };
        return n.build({
            create: function(e, t) {
                var n = new o,
                    i = new s([]),
                    r = new y({
                        el: e,
                        modelsHandler: n,
                        collection: i,
                        type: t.type,
                        leavesOnly: t.leavesOnly,
                        labelTemplate: t.labelTemplate,
                        afterLabelTemplate: t.afterLabelTemplate,
                        dataJSON: t.dataJSON
                    });
                return new a({
                    el: e,
                    treeSelectorInterface: r,
                    modelsHandler: n,
                    collection: i,
                    type: t.type
                }), r
            }
        })
    }), define("bloko/blocks/modalError/modalError.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="bloko-modal-error Bloko-ModalError-Error bloko-modal-error_hidden">'), i.b(i.v(i.f("message", e, t, 0))), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("bloko/blocks/modalError/modalError", ["bloko/blocks/modalError/modalError.mustache", "bloko/common/core/Components"], function(e, t) {
        return t.build({
            create: function(t, n) {
                var i = void 0,
                    o = void 0;
                function s(n) {
                    i = e.render({
                        message: n
                    }), t.innerHTML = i, o = t.querySelector(".Bloko-ModalError-Error")
                }
                return s(n.message), {
                    show: function() {
                        o.classList.remove("bloko-modal-error_hidden")
                    },
                    hide: function() {
                        o.classList.add("bloko-modal-error_hidden")
                    },
                    setMessage: s
                }
            }
        })
    }), define("bloko/blocks/treeSelectorPopup/treeSelectorPopupTemplate.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="bloko-modal-header">'), i.b("\n" + n), i.b('    <h2 class="bloko-modal-title">'), i.b(i.v(i.f("title", e, t, 0))), i.b("</h2>"), i.b("\n" + n), i.b(i.rp("<search0", e, t, "    ")), i.b('    <div class="bloko-tree-selector-popup-hint Bloko-TreeSelectorPopup-Hint"></div>'), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b('<div class="bloko-tree-selector-popup">'), i.b("\n" + n), i.b('    <div class="Bloko-TreeSelectorPopup-NotFoundHint g-hidden">'), i.b(i.v(i.f("notFound", e, t, 0))), i.b("</div>"), i.b("\n" + n), i.b('    <div class="bloko-tree-selector-popup-content Bloko-TreeSelectorPopup"></div>'), i.b("\n" + n), i.b("</div>"), i.b("\n" + n), i.b('<div class="Bloko-TreeSelector-Error"></div>'), i.b("\n" + n), i.b('<div class="bloko-modal-footer">'), i.b("\n" + n), i.b('    <span class="bloko-form-spacer">'), i.b("\n" + n), i.b('        <button type="button"'), i.b("\n" + n), i.b('                class="bloko-button Bloko-TreeSelectorPopup-Cancel"'), i.b("\n" + n), i.b('                data-qa="bloko-tree-selector-popup-cancel">'), i.b("\n" + n), i.b("            "), i.b(i.v(i.f("cancel", e, t, 0))), i.b("\n" + n), i.b("        </button>"), i.b("\n" + n), i.b("    </span>"), i.b('<span class="bloko-form-spacer">'), i.b("\n" + n), i.b('        <button type="button"'), i.b("\n" + n), i.b('                class="bloko-button bloko-button_primary Bloko-TreeSelectorPopup-Submit"'), i.b("\n" + n), i.b('                data-qa="bloko-tree-selector-popup-submit">'), i.b("\n" + n), i.b('            <span class="bloko-button__content">'), i.b(i.v(i.f("submit", e, t, 0))), i.b("</span>"), i.b("\n" + n), i.b('            <span class="bloko-button__loading">'), i.b("\n" + n), i.b('                <span class="bloko-icon bloko-icon_loading bloko-icon_initial-inverted"></span>'), i.b("\n" + n), i.b("            </span>"), i.b("\n" + n), i.b("        </button>"), i.b("\n" + n), i.b("    </span>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {
                "<search0": {
                    name: "search",
                    partials: {},
                    subs: {}
                }
            },
            subs: {}
        })
    }), define("bloko/blocks/treeSelectorPopup/treeSelectorPopupSearchTemplate.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="bloko-tree-selector-popup-search">'), i.b("\n" + n), i.b('    <input type="search"'), i.b("\n" + n), i.b('           class="bloko-input Bloko-TreeSelectorPopup-Search"'), i.b("\n" + n), i.b('           placeholder="'), i.b(i.v(i.f("searchPlaceholder", e, t, 0))), i.b('"'), i.b("\n" + n), i.b('           data-qa="bloko-tree-selector-popup-search"/>'), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("bloko/common/loadingSetter", ["jquery", "bloko/common/core/Debug"], function(e, t) {
        var n = {
            "bloko-button": "bloko-button_loading",
            "bloko-loading": "bloko-loading_visible",
            "bloko-input-wrapper": "bloko-input-wrapper_loading"
        };
        return function(i) {
            var o = e(i);
            if (o.data("loading-setter")) t.log("out error", new Error("Повторная инициализация. На данном объекте уже создан LoadingSetter"));
            else {
                var s = function() {
                    for (var e in n)
                        if (o.hasClass(e)) return n[e];
                    return null
                }();
                this.start = function() {
                    s && o.addClass(s)
                }, this.stop = function() {
                    s && o.removeClass(s)
                }, o.data("loading-setter", !0)
            }
        }
    }), define("bloko/blocks/treeSelectorPopup/treeSelectorPopup", ["jquery", "underscore", "backbone", "bloko/common/valuechange", "bloko/common/core/Components", "bloko/blocks/treeSelector/treeSelector", "bloko/blocks/modal/modal", "bloko/blocks/modalError/modalError", "bloko/blocks/treeSelectorPopup/treeSelectorPopupTemplate.mustache", "bloko/blocks/treeSelectorPopup/treeSelectorPopupSearchTemplate.mustache", "bloko/common/loadingSetter", "bloko/blocks/treeSelector/treeSelectorHelper", "bloko/common/events"], function(e, t, n, i, o, s, a, r, l, c, d, h, u) {
        return o.build({
            create: function(n, i) {
                return new function(n) {
                    var i = e(n.el),
                        p = void 0 === n.search || !!n.search,
                        m = void 0 === n.autoHide || !!n.autoHide,
                        f = !1;
                    i.append(l.render(e.extend(n.trl, {
                        title: n.title
                    }), {
                        search: p ? c : null
                    }));
                    var g = e(".Bloko-TreeSelectorPopup", i),
                        b = e(".Bloko-TreeSelectorPopup-Submit", i);
                    e(".Bloko-TreeSelectorPopup-Cancel", i).on("click", function() {
                        v.hide()
                    });
                    var v = o.make(a, i.get(0)),
                        k = o.make(s, g.get(0), n.treeSelector),
                        y = new d(b),
                        w = u.extend({
                            treeSelector: k,
                            modal: v,
                            loadingSetter: y,
                            setErrorMessage: function(e) {
                                _.setMessage(e)
                            },
                            showError: function() {
                                _.show()
                            },
                            hideError: function() {
                                _.hide()
                            },
                            disableSubmit: function() {
                                b.prop("disabled", !0)
                            },
                            enableSubmit: function() {
                                b.prop("disabled", !1)
                            },
                            submitPopup: function(e) {
                                e && w._trigger("Bloko-TreeSelectorPopup-Changed", T), f = !0, v.hide()
                            },
                            setHintElement: function(t) {
                                e(".Bloko-TreeSelectorPopup-Hint", i).empty().append(t)
                            }
                        });
                    var H = e(".Bloko-TreeSelector-Element", g),
                        S = e(".Bloko-TreeSelectorPopup-NotFoundHint", i),
                        C = e(".Bloko-TreeSelector-Error", i),
                        T = [],
                        E = void 0,
                        _ = o.make(r, C.get(0), {
                            message: n.trl && n.trl.errorMessage ? n.trl.errorMessage : ""
                        });
                    return p && e(".Bloko-TreeSelectorPopup-Search", i).on("valuechange", t.throttle(function(e) {
                        k.filterByContent(e.target.value);
                        var t = H.not(".g-hidden").length;
                        S.toggleClass("g-hidden", !!t)
                    }, 150)), v.on("showed", function() {
                        f = !1, T = [], E = k.getSelected()
                    }), v.on("hid", function() {
                        f || (E = h.getSelectedItemsWithoutSelectedParent(E), k.setSelected(E.map(function(e) {
                            return e.id
                        })))
                    }), k.on("Bloko-TreeSelector-Changed", function(e) {
                        T = T.concat(e)
                    }), b.on("click", function() {
                        m && (f = !0, v.hide()), w._trigger("Bloko-TreeSelectorPopup-Changed", T)
                    }), w
                }({
                    el: n,
                    treeSelector: i.treeSelector,
                    autoHide: i.autoHide,
                    search: i.search,
                    trl: i.trl,
                    title: i.title
                })
            }
        })
    }), define("HH/CompositeSelection", ["jquery", "underscore", "HHC/Components", "bloko/common/events", "bloko/blocks/suggest/suggest", "bloko/blocks/tagList/tagList", "bloko/blocks/treeSelector/treeSelectorHelper", "bloko/blocks/treeSelectorPopup/treeSelectorPopup"], function(e, t, n, i, o, s, a, r) {
        return n.build({
            defaults: {
                passDataToSuggest: !1
            },
            create: function(l, c) {
                var d = e(l),
                    h = [],
                    u = i.extend({}),
                    p = e(".HH-CompositeSelection-Suggest", d),
                    m = e(".HH-CompositeSelection-Tags", d),
                    f = !1,
                    g = e(".HH-CompositeSelection-TreeSelector", d),
                    b = [];
                a.walker(c.data.items, function(e) {
                    b.push({
                        id: e.id,
                        hiddenValue: e.id,
                        text: e.text
                    })
                });
                var v = e.extend({}, c.suggestParams);
                c.passDataToSuggest && (v.data = {
                    items: b
                }), n.make(o, p.get(0), v);
                var k = s.create(m.get(0), e.extend({}, c.tagListParams)),
                    y = e('<div class="g-hidden">').appendTo(document.body),
                    w = n.make(r, y.get(0), e.extend(!0, {}, c.treeSelectorPopupParams, {
                        treeSelector: {
                            dataJSON: c.data.items
                        }
                    }));
                function H() {
                    u._trigger("change", h)
                }
                function S() {
                    return a.getSelectedItemsWithoutSelectedParent(w.treeSelector.getSelected())
                }
                function C() {
                    var e = S();
                    f = !0, k.set(e.map(function(e) {
                        return {
                            id: e.id,
                            hiddenValue: e.id,
                            text: e.text,
                            additional: e.additional
                        }
                    })), h = t.pluck(e, "id"), H(), f = !1
                }
                g.on("click", function() {
                    w.modal.show()
                }), p.on("selected.suggest autoselected.suggest", function(e, t) {
                    w.treeSelector.addSelected([t.id]), C(), p.val("")
                }), k.on("Bloko-TagList-Removed", function(e) {
                    f || w.treeSelector.getItem(e.id).selected && (w.treeSelector.change([e.id]), h = t.pluck(S(), "id"), H())
                }), w.on("Bloko-TreeSelectorPopup-Changed", C), k.initTags();
                var T = k.getAll();
                return T.length && (h = t.pluck(T, "id"), w.treeSelector.addSelected(h)), e.extend(u, {
                    getSelectedIds: function() {
                        return h.slice(0)
                    },
                    treeSelectorPopupInstance: w,
                    setSelected: function(e) {
                        w.treeSelector.setSelected(e), C()
                    }
                })
            }
        })
    }), define("Utils/Utils", [], function() {
        return {
            count: 0,
            generateId: function(e) {
                var t = (e || "uid") + this.count;
                return this.count += 1, t
            },
            getUniqueId: function(e) {
                return e.uniqueID || (e.uniqueID = this.generateId())
            },
            isEqual: function(e, t) {
                return this.getUniqueId(e) === this.getUniqueId(t)
            },
            clone: function(e) {
                return Array.isArray(e) ? e.slice() : this.extend({}, e)
            },
            hash2hash: function(e, t) {
                var n = void 0,
                    i = {},
                    o = void 0;
                for (n in e) Object.prototype.hasOwnProperty.call(e, n) && (i[(o = t(n, e[n]))[0]] = o[1]);
                return i
            },
            hash2array: function(e, t) {
                var n = void 0,
                    i = [];
                for (n in e) Object.prototype.hasOwnProperty.call(e, n) && i.push(t(n, e[n]));
                return i
            },
            forEach: function(e, t) {
                var n = void 0;
                for (n in e) Object.prototype.hasOwnProperty.call(e, n) && t(n, e[n])
            },
            keys: function(e) {
                var t = void 0,
                    n = [];
                for (t in e) Object.prototype.hasOwnProperty.call(e, t) && n.push(t);
                return n
            },
            values: function(e) {
                var t = void 0,
                    n = [];
                for (t in e) Object.prototype.hasOwnProperty.call(e, t) && n.push(e[t]);
                return n
            },
            contains: function(e, t) {
                return !("string" != typeof t && !Array.isArray(t)) && -1 !== t.indexOf(e)
            },
            extend: function(e) {
                for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
                return this.forEach(n, function(t, n) {
                    for (var i in n) void 0 !== n[i] && (e[i] = n[i])
                }), e
            },
            getParams: function(e) {
                var t = e.onclick ? e.onclick() : {};
                return e.removeAttribute("onclick"), e.onclick = {}, t || {}
            },
            _step: function(e, t) {
                return 3 === t.nodeType ? e += t.nodeValue.replace(/\n+/g, "") : 1 === t.nodeType && ("BR" === t.nodeName ? e += "\n" : e += this.br2nl(t)), e
            },
            br2nl: function(e) {
                return Array.from(e.childNodes).reduce(this._step.bind(this), "")
            }
        }
    }), define("HH/Employer/FoldersModule", ["underscore", "backbone", "jquery", "HH/Collection/Common"], function(e, t, n, i) {
        var o = n.Deferred(),
            s = {};
        return s.promise = o, s.Listener = new function() {
            this.init = function(e, t) {
                this.collectionReady = !1, this.element = e, this.params = t, s.promise.done(this.initCollection.bind(this))
            }, this.initCollection = function(e, t) {
                this.collectionReady || (this.ownCollection = e, this.sharedCollection = t, this.collectionReady = !0, this.ready())
            }, this.ready = function() {}
        }, s.Model = t.Model.extend({
            defaults: {
                id: null,
                type: "own",
                name: "",
                sortIdx: "",
                resumes: 0,
                shared: !1,
                selected: !1,
                selectedSearch: !1
            },
            changeResumes: function(e) {
                var t = this.get("resumes") + e;
                this.set({
                    resumes: t
                })
            },
            initialize: function() {
                this.get("sortIdx") || this.index(), this.bind("change:name", this.index, this)
            },
            index: function() {
                this.set({
                    sortIdx: this.get("name").toLowerCase()
                }, {
                    silent: !0
                })
            }
        }), s.Collection = t.Collection.extend(e.extend({}, i, {
            model: s.Model,
            comparator: function(e, t) {
                var n = e.get("sortIdx").localeCompare(t.get("sortIdx"));
                return 0 !== n ? n : e.get("id") > t.get("id") ? 1 : -1
            }
        })), s
    }), define("HH/Employer/Folders", ["HHC/Components", "Utils/Utils", "HH/Employer/FoldersModule"], function(e, t, n) {
        return e.build({
            create: function(e, i) {
                return new function(e, i) {
                    var o = this;
                    ["own", "shared"].forEach(function(e) {
                        var s = [];
                        t.forEach(i.data[e], function(n, i) {
                            s.push(t.extend(i, {
                                id: parseInt(n, 10),
                                type: e
                            }))
                        }), o[e + "Collection"] = new n.Collection(s)
                    }), this.ownCollection.bind("change:name", function() {
                        this.sort({
                            silent: !0
                        })
                    }, this.ownCollection), n.promise.resolve(this.ownCollection, this.sharedCollection)
                }(e, i)
            }
        })
    }), define("HH/Employer/ResumeFoldersModule", ["underscore", "backbone", "jquery", "HH/Collection/Common"], function(e, t, n, i) {
        var o = n.Deferred(),
            s = {};
        return s.promise = o, s.Model = t.Model.extend({
            defaults: {
                id: null,
                hash: null,
                folders: [],
                checked: !1
            }
        }), s.resumeFoldersCollection = new t.Collection(e.extend({}, i, {
            model: s.Model
        })), s.ListItemView = t.View.extend({
            $: function(e) {
                return n(e, this.el)[0]
            },
            events: {
                "change .HH-Employer-ResumeFolders-Input": "checked"
            },
            defaults: {
                cssClasses: {
                    iconInFavorites: "b-select-icon-star-on",
                    iconNotInFavorites: "b-select-icon-star-off"
                }
            },
            initialize: function(e) {
                this.element = e.element, this.currentFolder = e.currentFolder, this.options = n.extend(!0, {}, this.defaults, e), this.resumeElement = this.$(".HH-Employer-ResumeFolders-Data"), this.$button = n(this.$(".HH-Employer-ResumeFolders-Button")), this.$icon = n(this.$(".HH-Employer-ResumeFolders-Icon")), this.input = this.$(".HH-Employer-ResumeFolders-Input"), this.$button.on("click", this.open.bind(this)), this.model.bind("change:folders", this.render, this)
            },
            open: function() {
                n(this.element).trigger("HH-Employer-ResumeFolders-Open", {
                    resumeId: this.model.get("id"),
                    element: this.resumeElement
                })
            },
            checked: function() {
                this.model.set({
                    checked: this.input.checked
                })
            },
            render: function() {
                this.currentFolder && -1 === this.model.get("folders").indexOf(this.currentFolder) ? window.location.reload() : 0 === this.model.get("folders").length ? (this.$icon.removeClass(this.options.cssClasses.iconInFavorites), this.$icon.addClass(this.options.cssClasses.iconNotInFavorites), this.$icon.attr("data-qa", "favorite-icon-off"), this.$button.attr("data-qa", "resume-serp__resume-mark-favorite-false")) : (this.$icon.removeClass(this.options.cssClasses.iconNotInFavorites), this.$icon.addClass(this.options.cssClasses.iconInFavorites), this.$icon.attr("data-qa", "favorite-icon-on"), this.$button.attr("data-qa", "resume-serp__resume-mark-favorite-true"))
            }
        }), s
    }), define("HH/Employer/FoldersList", ["backbone", "jquery", "Utils/ShortCuts", "Utils/Strings", "Utils/Utils", "HH/Employer/FoldersModule", "HH/Employer/ResumeFoldersModule"], function(e, t, n, i, o, s, a) {
        var r = {};
        return r.ListItemView = e.View.extend({
            $: function(e) {
                return t(e, this.el)[0]
            },
            events: {
                "change .HH-Employer-FoldersList-Input": "checked"
            },
            initialize: function(e) {
                this.model.bind("change", this.render, this), this.componentName = e.componentName, this.model.views = this.model.views || {}, this.model.views[this.componentName] = this, this.input = this.$(".HH-Employer-FoldersList-Input")
            },
            render: function() {
                var e = this.$(".HH-Employer-FoldersList-Folder-Name"),
                    n = this.$(".HH-Employer-FoldersList-Input");
                t(e).text(this.model.get("name")), n.value = this.model.get("id"), this.input.checked = this.model.get("checked" + this.componentName)
            },
            checked: function() {
                this.model.trigger("checked" + this.componentName);
                var e = {};
                e["checked" + this.componentName] = this.input.checked, this.model.set(e)
            }
        }), r.ListView = e.View.extend({
            $: function(e) {
                return t(e, this.el)[0]
            },
            ownFolders: null,
            sharedFolders: null,
            events: {
                "keyup .HH-Employer-FoldersList-FolderNameInput": "inputChanged",
                "keydown .HH-Employer-FoldersList-FolderNameInput": "inputChanged"
            },
            initialize: function(e) {
                var n = this;
                this.ownFolders = e.ownFolders, this.sharedFolders = e.sharedFolders, this.componentName = e.componentName, this.type = e.type, this.ownFolders.bind("all", this.render, this), this.sharedFolders.bind("all", this.render, this), this.itemTemplate = this.$(".HH-Employer-FoldersList-Folder-Container-Template"), this.ownFoldersElement = this.$(".HH-Employer-FoldersList-Own"), this.sharedFoldersElement = this.$(".HH-Employer-FoldersList-Shared"), this.folderInput = this.$(".HH-Employer-FoldersList-NewFolderInput"), this.folderNameInput = this.$(".HH-Employer-FoldersList-FolderNameInput"), t("li[data-hh-folder-id]", this.el).toArray().forEach(function(e) {
                    var t = n.ownFolders.get(e.getAttribute("data-hh-folder-id"));
                    t || (t = n.sharedFolders.get(e.getAttribute("data-hh-folder-id"))), new r.ListItemView({
                        model: t,
                        el: e,
                        componentName: n.componentName,
                        type: n.type
                    })
                })
            },
            inputChanged: function() {
                this.folderInput.checked = "" !== i.trim(this.folderNameInput.value)
            },
            render: function(e, n, i) {
                if ("add" === e) {
                    var o = this.itemTemplate.cloneNode(!0),
                        s = i.indexOf(n) - 1;
                    s < 0 ? t(o).insertAfter(this.ownFoldersElement) : t(o).insertAfter(i.at(s).views[this.componentName].el), t(o).removeClass("g-hidden"), new r.ListItemView({
                        model: n,
                        el: o,
                        componentName: this.componentName,
                        type: this.type
                    }).render()
                }
                e === "checked" + this.componentName && "move" === this.type && this.unCheckAll({
                    silent: !0
                })
            },
            unCheckAll: function(e) {
                var t = {};
                t["checked" + this.componentName] = !1, this.ownFolders.each(function(n) {
                    n.set(t, e)
                }, this), this.sharedFolders.each(function(n) {
                    n.set(t, e)
                }, this)
            },
            checkFolders: function(e) {
                var t = {};
                t["checked" + this.componentName] = !0, e.forEach(function(e) {
                    var n = this.ownFolders.get(e);
                    n && n.set(t), (n = this.sharedFolders.get(e)) && n.set(t)
                }, this)
            }
        }), r.Base = new function() {
            this.init = function(e, i) {
                var r = this;
                this.element = e, this.params = i, this.componentName = o.generateId(), this.simhash = this.params.simhash, this.employerManagerId = this.params.employerManagerId, this.popup = t(".HH-Employer-FoldersList-Block", this.element)[0], this.container = t(".HH-Employer-FoldersList-Folder-Container", this.popup)[0], this.buttonSave = t(".HH-Employer-FoldersList-Save", this.popup)[0], this.folderInput = t(".HH-Employer-FoldersList-NewFolderInput", this.popup)[0], this.folderNameInput = t(".HH-Employer-FoldersList-FolderNameInput", this.popup)[0], this.spinner = t(".HH-Employer-FoldersList-Spinner", this.popup)[0], this.error = t(".HH-Employer-FoldersList-Error", this.popup)[0], this.resumeFoldersCollection = a.resumeFoldersCollection, t.when(s.promise).done(function(e, i) {
                    r.initFolders(e, i), n.down([{
                        key: n.ESC
                    }], r.close.bind(r), document, !1), r.ready(), t(r.buttonSave).on("click", r.saveFolders.bind(r))
                })
            }, this.initFolders = function(e, t) {
                this.ownFolderCollection = e, this.sharedFolderCollection = t
            }, this.getCheckedFolders = function() {
                var e = [],
                    t = "checked" + this.componentName;
                return this.ownFolderCollection.each(function(n) {
                    n.get(t) && e.push(n.get("id"))
                }, this), this.sharedFolderCollection.each(function(n) {
                    n.get(t) && e.push(n.get("id"))
                }, this), e
            }, this.saveFolders = function() {
                var e = this.getCheckedFolders();
                this.toggle(this.spinner, "show"), this.folderInput.checked ? this.createFolder(this.getfolderName(), e) : this._processFolders(e)
            }, this.getfolderName = function() {
                var e = this.folderNameInput.value.trim();
                if ("" === e) {
                    e = this.params.defaultFolderName;
                    for (var t = this.ownFolderCollection.pluck("name"), n = 1; - 1 !== t.indexOf(e);) n += 1, e = this.params.defaultFolderName + " " + n
                }
                return e
            }, this.createFolder = function(e, n) {
                var o = this,
                    s = {
                        name: e
                    };
                this.employerManagerId && (s.employerManagerId = this.employerManagerId), t.ajax({
                    url: "/employer/resumefolders/create",
                    method: "POST",
                    data: s
                }).done(function(t) {
                    var s = i.capitalize(e),
                        a = {
                            id: parseInt(t.folderId, 10),
                            name: s,
                            type: "own"
                        };
                    o.ownFolderCollection.add(a), n.push(a.id), o._processFolders(n)
                }).fail(function() {
                    o.toggle(o.spinner, "hide"), o.toggle(o.error, "show")
                })
            }, this.getFolderById = function(e) {
                return this.ownFolderCollection.get(e) ? this.ownFolderCollection.get(e) : this.sharedFolderCollection.get(e) ? this.sharedFolderCollection.get(e) : null
            }, this.toggle = function(e, n) {
                t(e).toggleClass("g-hidden", "show" !== n)
            }, this.ready = function() {}
        }, r
    }), define("HH/Employer/FoldersList/Select", ["jquery", "HHC/Debug", "HHC/Components", "HH/Employer/FoldersList", "bloko/common/urlParser"], function(e, t, n, i, o) {
        var s = function(n, s) {
            this.element = n, this.ready = function() {
                this.view = new i.ListView({
                    el: this.container,
                    ownFolders: this.ownFolderCollection,
                    sharedFolders: this.sharedFolderCollection,
                    componentName: this.componentName,
                    type: "select"
                }), e(this.element).on("HH-Employer-ResumeFolders-Open", this.open.bind(this))
            }, this.open = function(t, n) {
                if (this.close(), this.resumeId !== n.resumeId) {
                    this.resumeId = n.resumeId, n.element && e(n.element).data("sim-hash") && (this.simhash = e(n.element).data("sim-hash")), this.view.unCheckAll();
                    var i = this.getResumeFolder(this.resumeId);
                    i && this.view.checkFolders(i.get("folders")), this.ownFolderCollection.length + this.sharedFolderCollection.length === 0 && (this.folderInput.checked = !0)
                }
            }, this.close = function(e) {
                e && (e.preventDefault(), e.stopPropagation()), this.folderNameInput.value = "", this.folderInput.checked = !1, this.toggle(this.spinner, "hide"), this.toggle(this.error, "hide"), delete this.resumeId
            }, this._processFolders = function(n) {
                var i = this,
                    s = {
                        resumeId: this.resumeId,
                        folderId: n
                    };
                void 0 !== this.simhash && (s.simhash = this.simhash), this.employerManagerId && (s.employerManagerId = this.employerManagerId);
                var a = o("/employer/resumefolders/putinfolder");
                a.params.resumeId = [s.resumeId], e.ajax({
                    url: a.href,
                    method: "post",
                    data: e.param(s, !0)
                }).done(function() {
                    var e = i.getResumeFolder(i.resumeId);
                    if (!e) return t.log("warn", "FolderList/Select: Cannot find resume folder"), void i.toggle(i.error, "show");
                    var o = e.get("folders");
                    if (!o) return t.log("warn", "FolderList/Select: Cannot find resume folder folders"), void i.toggle(i.error, "show");
                    o.forEach(function(e) {
                        -1 === n.indexOf(e) && this.getFolderById(e) && this.getFolderById(e).changeResumes(-1)
                    }, i), n.forEach(function(e) {
                        -1 === o.indexOf(e) && this.getFolderById(e) && this.getFolderById(e).changeResumes(1)
                    }, i), e.set({
                        folders: n
                    }), i.close()
                }).fail(function() {
                    i.toggle(i.spinner, "hide"), i.toggle(i.error, "show")
                })
            }, this.getResumeFolder = function(e) {
                return this.resumeFoldersCollection.get(e)
            }, this.init(n, s)
        };
        return s.prototype = i.Base, n.build({
            create: function(e, t) {
                return new s(e, t)
            }
        })
    }), define("Utils/Callbacks", ["HHC/Debug", "Utils/Utils"], function(e, t) {
        var n = new function() {
            this.listeners = {}, this.eventHistory = {}, this.getId = function(e) {
                return "*" === e ? "*" : t.getUniqueId(e)
            }, this.add = function(e, t, i, o) {
                var s = this.getId(i || this),
                    a = s + e;
                this.listeners[a] || (this.listeners[a] = []);
                var r = new n.Listener(t, o, a);
                return this.listeners[a].push(r), this.execHistory(s, e), r
            }, this.dispatch = function(t, n, i, o) {
                e.log("info", "Type: ", t, ", object: ", n, ", event: ", i, ["Utils/Callbacks", t]);
                var s = this.getId(n || this),
                    a = o || 0;
                this.execListeners(s + t, i), this.execListeners("*" + t, i);
                var r = s + t;
                this.eventHistory[r] || (this.eventHistory[r] = []), this.eventHistory[r].push(i), this.eventHistory[r].length > a && this.eventHistory[r].shift()
            }, this.execHistory = function(e, t) {
                var n = e + t;
                if (this.eventHistory[n] && this.eventHistory[n].forEach(this.execListeners.bind(this, n)), "*" === e)
                    for (var i in this.eventHistory) t === i.substr(i.length - t.length) && this.eventHistory[i].forEach(this.execListeners.bind(this, n))
            }, this.execListeners = function(e, t) {
                this.listeners[e] && this.listeners[e].forEach(function(e) {
                    e.execute && this.execListener(e.listener, t)
                }, this)
            }, this.execListener = function(e, t) {
                e(t)
            }, this.remove = function(e) {
                var t = this.listeners[e.key],
                    n = t.indexOf(e); - 1 !== n && t.splice(n, 1)
            }
        };
        return n.Listener = function(e, t, n) {
            this.listener = e, this.key = n, this.execute = t || !0
        }, n.Listener.prototype = {
            start: function() {
                this.execute = !0
            },
            stop: function() {
                this.execute = !1
            },
            remove: function() {
                n.remove(this)
            }
        }, n
    }), define("HH/Employer/Tabs", ["jquery", "HHC/Components", "Utils/Callbacks", "Utils/Strings", "bloko/common/loadingSetter"], function(e, t, n, i, o) {
        var s = 300;
        return t.build({
            create: function(n, a) {
                var r = e(".HH-Employer-Tabs-Body", n).toArray(),
                    l = new o(n.querySelector(".HH-Employer-Tabs-Loader"));
                e(n).on("Bloko-Tabs-Changed", function(n, o) {
                    var c = e(r[o.index]),
                        d = c.attr("class"),
                        h = d ? d.match(/HH-Employer-Tabs-Context-(\w+)/i) : null;
                    if (null !== h) {
                        var u = h[1].toLowerCase(),
                            p = i.trim(c.html());
                        if ("" === p || "&nbsp;" === p) {
                            var m = window.setTimeout(function() {
                                l.start()
                            }, s);
                            e.ajax({
                                url: a.tabLink + u,
                                data: {
                                    ajax: !0
                                }
                            }).done(function(e) {
                                c.html(e), "address" === u && t.init(c.get(0))
                            }).always(function() {
                                window.clearTimeout(m), l.stop()
                            })
                        }
                    }
                })
            }
        })
    }), define("HH/Employer/VacanciesDashboard/FiltersModel", ["backbone"], function(e) {
        return e.Model.extend({
            defaults: {
                vacancyEmployerManagerId: null,
                employerManagerId: [],
                vacancyType: [],
                premoderateStatus: [],
                areaId: [],
                vacancyName: "",
                offset: ""
            }
        })
    }), define("HH/Sticky/Stack", ["jquery", "HHC/Debug"], function(e, t) {
        var n = [],
            i = 0,
            o = {};
        function s() {
            i = n.reduce(function(e, t) {
                var n = e + t.height;
                return "function" == typeof t.cb && t.cb(n), n
            }, 0)
        }
        return o.add = function(t, i) {
            n.push({
                $element: e(t),
                cb: i.callback,
                height: i.height
            }), s()
        }, o.addNavi = function(t, i) {
            n.unshift({
                $element: e(t),
                cb: i.callback,
                height: i.height
            }), s()
        }, o.remove = function(e) {
            var t = o.getElementIndex(e); - 1 !== t && (n.splice(t, 1), s())
        }, o.getElementIndex = function(e) {
            if (!e) return -1;
            for (var t = 0; t < n.length; t++)
                if (n[t].$element.is(e)) return t;
            return -1
        }, o.getElementOffset = function(e) {
            var t = o.getElementIndex(e);
            t = -1 === t ? n.length : t;
            for (var i = 0, s = 0; s < t; s++) i += n[s].height;
            return i
        }, o.getOverallOffset = function() {
            return i
        }, o.updateHeight = function(e, i) {
            var a = o.getElementIndex(e); - 1 !== a ? (n[a].height = i, s()) : t.log("warn", "Sticky: Cannot update element not in stack")
        }, o
    }), define("HH/Sticky/Navi", ["jquery", "backbone", "HH/Sticky/Stack"], function(e, t, n) {
        var i = {},
            o = e.extend({}, t.Events);
        function s() {
            o.trigger("NaviStateChange", {
                height: i.height,
                isStatic: i.isStatic
            })
        }
        return o.set = function(t, o) {
            var s = e(t);
            s.is(i.$element) || (i = {
                $element: s,
                height: o.height,
                isStatic: o.isStatic || !1
            }).isStatic || n.addNavi(t, {
                height: i.height
            })
        }, o.updateHeight = function(e) {
            i.height = e, n.updateHeight(i.$element, e), s()
        }, o.getHeight = function() {
            return i.height
        }, o.isStatic = function() {
            return i.isStatic
        }, o.makeStatic = function(e) {
            i.isStatic || (n.remove(i.$element), e && (i.height = e), i.isStatic = !0, s())
        }, o.makeSticky = function(e) {
            i.isStatic && (e && (i.height = e), n.addNavi(i.$element, {
                height: i.height
            }), i.isStatic = !1, s())
        }, o
    }), define("bloko/blocks/notificationManager/notification.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="bloko-notification'), i.s(i.f("fullSize", e, t, 1), e, t, 0, 43, 72, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b(" bloko-notification_full-size")
                }), e.pop()), i.s(i.f("type", e, t, 1), e, t, 0, 94, 122, "{{ }}") && (i.rs(e, t, function(e, t, n) {
                    n.b(" bloko-notification_"), n.b(n.v(n.f("type", e, t, 0)))
                }), e.pop()), i.b('"'), i.b("\n" + n), i.b('     data-qa="notification">'), i.b("\n" + n), i.b('    <span class="bloko-notification__content Bloko-Notification-Content"/>'), i.b("\n" + n), i.b('    <span class="Bloko-Notification-Close bloko-notification__close" data-qa="notification-close-button"/>'), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("bloko/common/animationEventName", [], function() {
        var e = document.createElement("fakeElement"),
            t = void 0,
            n = {
                WebkitAnimation: "webkitAnimationEnd",
                animation: "animationend",
                OAnimation: "oAnimationEnd",
                MsAnimation: "msAnimationEnd",
                MozAnimation: "animationend"
            };
        for (var i in n)
            if (void 0 !== e.style[i]) {
                t = n[i];
                break
            }
        return window.bloko && window.bloko.isTest && (t = !1), t
    }), define("bloko/blocks/notificationManager/notificationManager", ["jquery", "bloko/blocks/notificationManager/notification.mustache", "bloko/common/animationEventName"], function(e, t, n) {
        var i = {
                manager: "bloko-notification-manager",
                inactive: "bloko-notification_inactive"
            },
            o = {
                manager: ".Bloko-Notification-Manager",
                close: ".Bloko-Notification-Close",
                content: ".Bloko-Notification-Content"
            },
            s = {
                onClose: function() {}
            },
            a = 5e3;
        return window.bloko && window.bloko.isTest && (a = 10),
            function() {
                var r = e(o.manager);
                return 0 === r.length && (r = e("<div>", {
                    class: i.manager
                }).appendTo("body")), {
                    create: function(l) {
                        l = e.extend({}, s, l);
                        var c = void 0,
                            d = e(t.render({
                                fullSize: l.fullSize,
                                type: l.type
                            }));
                        function h() {
                            d.addClass(i.inactive), n ? d.one(n, function() {
                                d.remove(), l.onClose()
                            }) : (d.remove(), l.onClose())
                        }
                        return e(o.content, d).html(l.content), e(o.close, d).on("click", function() {
                            window.clearTimeout(c), h()
                        }), l.autoClose && (c = window.setTimeout(h, a)), r.prepend(d), {
                            close: h
                        }
                    }
                }
            }()
    }), define("HH/Bloko/Notification", ["jquery", "HHC/Components", "HH/Sticky/Navi", "bloko/blocks/notificationManager/notificationManager"], function(e, t, n, i) {
        var o = "notification-manager_not-sticky",
            s = e(".Bloko-Notification-Manager");
        return s.css({
            top: n.getHeight()
        }), n.isStatic() && s.addClass(o), n.on("NaviStateChange", function(e) {
            s.toggleClass(o, e.isStatic), s.css({
                top: e.height
            })
        }), t.build({
            create: function(t, n) {
                return n.content ? i.create(n) : i.create(e.extend(n, {
                    content: e(".HH-BlokoNotification-Content", t).get(0)
                }))
            }
        })
    }), define("Utils/ScrollToElement", ["jquery", "HH/Sticky/Stack"], function(e, t) {
        var n = {
            topOffset: 100,
            duration: 300,
            centered: !0
        };
        return function(i, o) {
            var s = e(i);
            if (0 !== s.length) {
                var a = e.extend({}, n, o),
                    r = s.offset().top,
                    l = t.getElementOffset(),
                    c = r - l - (a.centered ? e(window).height() / 2 : 0) + ("top" === a.placement ? -a.topOffset : a.topOffset);
                c !== window.scrollY ? e("body, html").stop(!0).animate({
                    scrollTop: c
                }, a.duration, function() {
                    var e = l - t.getElementOffset();
                    0 !== e && (document.documentElement.scrollTop = c + e), "function" == typeof a.callback && a.callback()
                }) : "function" == typeof a.callback && a.callback()
            }
        }
    }), define("HH/Employer/VacanciesDashboard/Filters", ["jquery", "backbone", "underscore", "HHC/Components", "bloko/common/loadingSetter", "HH/Bloko/Notification", "HH/CompositeSelection", "Utils/ScrollToElement", "bloko/common/valuechange"], function(e, t, n, i, o, s, a, r) {
        var l = t.View.extend({
            events: {
                "valuechange .HH-Employer-VacanciesDashboard-Filters-Search": "changeVacancyName",
                "click .HH-Employer-VacanciesDashboard-Filters-SearchButton": "showSearchBlock",
                "click .HH-Employer-VacanciesDashboard-Filters-Switcher": "toggleFilters",
                "click .HH-Employer-VacanciesDashboard-Filter-Submit": "applyFilters"
            },
            initialize: function(e) {
                this.options = e.options, this.filtersModel = this.options.filtersModel, this.$regions = this.$(".HH-Employer-VacanciesDashboard-Filters-Regions"), this.$statuses = this.$(".HH-Employer-VacanciesDashboard-Filters-PremoderationStatus"), this.$types = this.$(".HH-Employer-VacanciesDashboard-Filters-VacancyTypes"), this.$managersInput = this.$(".HH-Employer-VacanciesDashboard-Filters-ManagerInput"), this.$search = this.$(".HH-Employer-VacanciesDashboard-Filters-Search"), this.$managers = this.$(".HH-Employer-VacanciesDashboard-Filters-Managers"), this.$searchMobile = this.$(".HH-Employer-VacanciesDashboard-Filters-SearchMobile"), this.$searchButton = this.$(".HH-Employer-VacanciesDashboard-Filters-SearchButton"), this.$filtersSwitcher = this.$(".HH-Employer-VacanciesDashboard-Filters-Switcher"), this.$filters = this.$(".HH-Employer-VacanciesDashboard-Filters"), this.FILTERS_MAP = {
                    areaId: this.$regions,
                    employerManagerId: this.$managersInput,
                    vacancyType: this.$types,
                    premoderateStatus: this.$statuses
                }, this.loadingSetterSearch = new o(this.$(".HH-Employer-VacanciesDashboard-Filters-SearchWrapper").get(0)), this.loadingSetterApplyFilters = new o(this.$(".HH-Employer-VacanciesDashboard-Filter-Submit").get(0)), this.options.areaJSON && (this.areasFilter = i.make(a, this.$(".HH-Employer-VacanciesDashboard-Filters-AdditionalRegions").get(0), {
                    data: this.options.areaJSON,
                    passDataToSuggest: !0,
                    tagListParams: {
                        removable: !0
                    },
                    treeSelectorPopupParams: {
                        treeSelector: {
                            type: "checkbox"
                        },
                        trl: this.options.trl.treeSelector.trl
                    }
                })), this.options.managerJSON && (this.managersFilter = i.make(a, this.$(".HH-Employer-VacanciesDashboard-Filters-AdditionalManagers").get(0), {
                    data: this.options.managerJSON,
                    passDataToSuggest: !0,
                    tagListParams: {
                        removable: !0
                    },
                    treeSelectorPopupParams: {
                        treeSelector: {
                            type: "checkbox"
                        },
                        trl: this.options.trl.treeSelector.trl
                    },
                    trl: this.options.trl.treeSelector.trl
                })), this._initFiltersModel = this.filtersModel.toJSON(), this.listenTo(this.filtersModel, "change:vacancyName", this._changeVacancyName)
            },
            showSearchBlock: function() {
                var e = this.$searchMobile.hasClass("g-hidden");
                this.$searchMobile.toggleClass("g-hidden"), this.$searchButton.toggleClass(this.options.cssClasses.buttonPressed), e && (r(this.$searchMobile, {
                    placement: "top"
                }), this.$search.focus())
            },
            applyFilters: function() {
                this.filtersModel.set({
                    employerManagerId: this.getSelectedFilters("employerManagerId"),
                    areaId: this.getSelectedFilters("areaId"),
                    vacancyType: this.getSelectedFilters("vacancyType"),
                    premoderateStatus: this.getSelectedFilters("premoderateStatus")
                }), this.loadingSetterApplyFilters.start(), this._loadFilteredData(this.loadingSetterApplyFilters, this.toggleFilters.bind(this))
            },
            getSelectedFilters: function(e) {
                return "areaId" === e && this.areasFilter ? this.areasFilter.getSelectedIds() : "employerManagerId" === e && this.managersFilter ? this.managersFilter.getSelectedIds() : this.FILTERS_MAP[e].toArray().reduce(function(e, t) {
                    return t.checked && e.push(t.value), e
                }, [])
            },
            changeVacancyName: n.debounce(function(e) {
                this.filtersModel.set({
                    vacancyName: e.target.value
                })
            }, 300),
            toggleFilters: function() {
                this.$filtersSwitcher.toggleClass(this.options.cssClasses.buttonPressed), this.$managers.toggleClass("g-hidden"), this.$filters.toggleClass("g-hidden")
            },
            _changeVacancyName: function() {
                this.loadingSetterSearch.start(), this._loadFilteredData(this.loadingSetterSearch), this.$search.val(this.filtersModel.get("vacancyName"))
            },
            _loadFilteredData: function(t, n) {
                var o = this;
                e.ajax({
                    url: "/shards/employer/vacancies_dashboard/managers",
                    method: "POST",
                    data: decodeURIComponent(e.param(this.filtersModel.toJSON(), !0))
                }).then(function(e) {
                    o.$managers.html(e), o.filtersModel.set("filtered", !o.filtersModel.get("filtered"));
                    var t = Object.keys(o.filtersModel.changedAttributes(o._initFiltersModel));
                    1 === t.length && 0 === t.indexOf("vacancyName") ? o.$filtersSwitcher.removeClass(o.options.cssClasses.filterApply) : o.$filtersSwitcher.toggleClass(o.options.cssClasses.filterApply, 0 !== t.length), "" === e && i.make(s, o.el, {
                        autoClose: !0,
                        content: o.options.trl.searchResultIsEmpty
                    }), "function" == typeof n && "" !== e && n()
                }, function() {
                    i.make(s, o.el, {
                        type: "error",
                        content: o.options.trl.error
                    })
                }).always(function() {
                    t.stop()
                })
            }
        });
        return i.build({
            defaults: {
                cssClasses: {
                    buttonPressed: "bloko-button_pressed",
                    filterApply: "bloko-button_marked"
                }
            },
            create: function(e, t) {
                return new l({
                    el: e,
                    options: t
                })
            }
        })
    }), define("HH/Employer/VacanciesDashboard/ManagersView", ["jquery", "HHC/Components"], function(e, t) {
        return t.build({
            defaults: {
                cssClasses: {
                    openVacancies: "vacancies-dashboard-manager_open"
                }
            },
            create: function(t, n) {
                var i = e(t);
                function o(e, t) {
                    if (e.data("loaded")) {
                        var i = void 0 !== t ? t : !e.hasClass(n.cssClasses.openVacancies);
                        e.toggleClass(n.cssClasses.openVacancies, i).attr("data-qa", i ? "vacancies-dashboard-manager-open vacancies-dashboard-manager" : "vacancies-dashboard-manager")
                    } else n.filtersModel.set({
                        vacancyEmployerManagerId: e.data("employer-manager-id")
                    })
                }
                return i.on("click", ".HH-Employer-VacanciesDashboard-ManagersView-Switcher", function(t) {
                    o(e(t.target).closest(".HH-Employer-VacanciesDashboard-ManagersView-Manager", i))
                }), {
                    expandedVacancies: o
                }
            }
        })
    }), define("HH/Employer/VacanciesDashboard/VacanciesView", ["jquery", "backbone", "HHC/Components", "bloko/common/loadingSetter", "HH/Employer/VacanciesDashboard/FiltersModel", "HH/Employer/VacanciesDashboard/Filters", "HH/Employer/VacanciesDashboard/ManagersView", "HH/Bloko/Notification"], function(e, t, n, i, o, s, a, r) {
        var l = {
                BY_NAME_ASC: "BY_NAME_DESC",
                BY_NAME_DESC: "BY_NAME_ASC"
            },
            c = {
                BY_EXPIRE_TIME_ASC: "BY_EXPIRE_TIME_DESC",
                BY_EXPIRE_TIME_DESC: "BY_EXPIRE_TIME_ASC"
            },
            d = t.View.extend({
                events: {
                    click: "delegateEvent"
                },
                initialize: function(e) {
                    this.options = e.options, this.$actionsButtons = this.$(".HH-Employer-VacanciesDashboard-VacanciesView-ActionButton"), this.$actions = this.$(".HH-Employer-VacanciesDashboard-VacanciesView-Actions"), this.$actionsUpdate = this.$(".HH-Employer-VacanciesTopButtons-ButtonUpdate "), this.$managers = this.$(".HH-Employer-VacanciesDashboard-VacanciesView-Managers"), this.$loading = this.$(".HH-Employer-VacanciesDashboard-VacanciesView-Loading"), this.nodes = {}, this._cacheNodes(this.$(".HH-Employer-VacanciesDashboard-VacanciesView-Manager")), this._calcMoreCount(), this.filtersModel = new o(this.options.filtersParams.model), n.make(s, this.el, {
                        filtersModel: this.filtersModel,
                        areaJSON: this.options.filtersParams.areaJSON,
                        managerJSON: this.options.filtersParams.managerJSON,
                        trl: this.options.trl
                    }), this.managersInstance = n.make(a, this.el, {
                        filtersModel: this.filtersModel
                    }), this.loadingSetter = new i(this.$loading), this.loadingSetters = {}, this.listenTo(this.filtersModel, "change:vacancyEmployerManagerId", this._prepareLoad), this.listenTo(this.filtersModel, "change:offset", this._changeOffset), this.listenTo(this.filtersModel, "change:order", this._prepareLoad), this.listenTo(this.filtersModel, "change:filtered", this._changeFiltered)
                },
                delegateEvent: function(t) {
                    var n = void 0,
                        i = e(t.target),
                        o = i.closest(".HH-Employer-VacanciesDashboard-VacanciesView-Checkbox", this.$el);
                    if (0 === o.length) {
                        var s = i.closest(".HH-Employer-VacanciesDashboard-VacanciesView-CheckAll", this.$el);
                        if (0 === s.length)
                            if (0 === i.closest(".HH-Employer-VacanciesDashboard-VacanciesView-OrderByName", this.$el).length)
                                if (0 === i.closest(".HH-Employer-VacanciesDashboard-VacanciesView-OrderByExpire", this.$el).length) 0 !== i.closest(".HH-Employer-VacanciesDashboard-VacanciesView-ShowMore", this.$el).length && (n = i.closest(".HH-Employer-VacanciesDashboard-VacanciesView-Manager", this.$el).data("employer-manager-id"), this.filtersModel.set("vacancyEmployerManagerId", n, {
                                    silent: !0
                                }).set({
                                    offset: this.nodes[n].$vacancies.length
                                }));
                                else this.filtersModel.set("vacancyEmployerManagerId", i.closest(".HH-Employer-VacanciesDashboard-VacanciesView-Manager", this.$el).data("employer-manager-id"), {
                                    silent: !0
                                }).set({
                                    order: c[this.filtersModel.get("order")] || "BY_EXPIRE_TIME_ASC"
                                });
                        else this.filtersModel.set("vacancyEmployerManagerId", i.closest(".HH-Employer-VacanciesDashboard-VacanciesView-Manager", this.$el).data("employer-manager-id"), {
                            silent: !0
                        }).set({
                            order: l[this.filtersModel.get("order")] || "BY_NAME_ASC"
                        });
                        else this._toggleVacancies(i.closest(".HH-Employer-VacanciesDashboard-VacanciesView-Manager", this.$el), s.prop("checked"))
                    } else this._toggleVacancy(o, o.prop("checked"))
                },
                _changeFiltered: function() {
                    this._cacheNodes(e(".HH-Employer-VacanciesDashboard-VacanciesView-Manager", this.$managers)), this._toggleActionsButtons(!1), this._calcMoreCount()
                },
                _toggleVacancy: function(e, t) {
                    e.closest(".HH-Employer-VacanciesDashboard-VacanciesView-Vacancy", this.$el).toggleClass(this.options.cssClasses.vacancySelected, t), e.prop("checked", t);
                    var n = e.closest(".HH-Employer-VacanciesDashboard-VacanciesView-Manager", this.$el).data("employer-manager-id"),
                        i = this.nodes[n].$vacanciesCheckboxes.toArray().every(function(e) {
                            return e.checked
                        });
                    this.nodes[n].$vacanciesCheckAll.prop("checked", i), this.$actionsButtons.data("selected-vacancies", this._getSelectedVacancies()), this._toggleActionsButtons()
                },
                _toggleVacancies: function(e, t) {
                    var n = this,
                        i = e.data("employer-manager-id");
                    this.nodes[i].$vacanciesCheckboxes.each(function(e, o) {
                        n.nodes[i].$vacancies.has(o).toggleClass(n.options.cssClasses.vacancySelected, t)
                    }), this.nodes[i].$vacanciesCheckboxes.prop("checked", t);
                    var o = this._getSelectedVacancies();
                    this.$actionsButtons.data("selected-vacancies", o), this._toggleActionsButtons()
                },
                _toggleActionsButtons: function(e) {
                    var t = this.$checkboxes.toArray().some(function(e) {
                        return e.checked
                    });
                    this.$actionsButtons.toggleClass("g-hidden", void 0 !== e ? !e : !t), this.$actionsUpdate.toggleClass("g-hidden", void 0 !== e ? !e : !this._canUpdate()), this.$actions.toggleClass(this.options.cssClasses.actionsSticky, void 0 !== e ? e : t)
                },
                _getSelectedVacancies: function() {
                    return this.$checkboxes.toArray().reduce(function(e, t) {
                        return t.checked && e.push(t.value), e
                    }, [])
                },
                _changeOffset: function() {
                    var e = this.filtersModel.get("vacancyEmployerManagerId");
                    this.nodes[e].$showMore.data("loading-setter-loaded") || (this.nodes[e].$showMore.data("loading-setter-loaded", !0), this.loadingSetters[e] = new i(this.nodes[e].$showMore.get(0))), this.loadingSetters[e].start(), this._loadVacancies(this.loadingSetters[e])
                },
                _canUpdate: function() {
                    return this.$checkboxes.toArray().filter(function(e) {
                        return e.checked
                    }).some(function(e) {
                        return JSON.parse(e.getAttribute("data-suggest-update"))
                    })
                },
                _prepareLoad: function() {
                    var e = this.filtersModel.get("vacancyEmployerManagerId");
                    this.nodes[e].$loading.append(this.$loading), this.loadingSetter.start(), this._loadVacancies(this.loadingSetter)
                },
                _loadVacancies: function(t) {
                    var i = this;
                    e.ajax({
                        url: "/shards/employer/vacancies_dashboard/vacancies",
                        method: "POST",
                        data: decodeURIComponent(e.param({
                            employerManagerId: this.filtersModel.get("vacancyEmployerManagerId"),
                            order: this.filtersModel.get("order"),
                            areaId: this.filtersModel.get("areaId"),
                            vacancyName: this.filtersModel.get("vacancyName"),
                            vacancyType: this.filtersModel.get("vacancyType"),
                            premoderateStatus: this.filtersModel.get("premoderateStatus"),
                            offset: this.filtersModel.get("offset")
                        }, !0))
                    }).then(function(t) {
                        var n = i.filtersModel.get("vacancyEmployerManagerId"),
                            o = i.nodes[n].$manager;
                        if (i.filtersModel.get("offset")) {
                            var s = e.parseHTML(t);
                            i.nodes[n].$vacanciesTable.append(e(".HH-Employer-VacanciesDashboard-VacanciesView-Vacancy", s)), i.filtersModel.set("offset", 0, {
                                silent: !0
                            })
                        } else i.nodes[n].$vacanciesContainer.html(t), i.nodes[n].$showMoreWrapper.length && (i.nodes[n].$showMoreCount.text(o.data("vacancies-on-page")), i.nodes[n].$showMoreWrapper.removeClass("g-hidden")), i._toggleActionsButtons();
                        o.data("loaded", !0);
                        var a = i._getShowMoreCount(o);
                        a && i.nodes[n].$showMoreCount.length ? i.nodes[n].$showMoreCount.text(a) : i.nodes[n].$showMoreWrapper.length && i.nodes[n].$showMoreWrapper.addClass("g-hidden"), i.managersInstance.expandedVacancies(o, !0), i._cacheNodes(o)
                    }, function() {
                        n.make(r, i.el, {
                            type: "error",
                            content: i.options.trl.error
                        })
                    }).always(function() {
                        t && t.stop(), i.filtersModel.set("vacancyEmployerManagerId", i.filtersModel.defaults.vacancyEmployerManagerId, {
                            silent: !0
                        })
                    })
                },
                _calcMoreCount: function() {
                    for (var e in this.nodes)
                        if (this.nodes[e].$showMoreCount.length) {
                            var t = this._getShowMoreCount(this.nodes[e].$manager);
                            t && this.nodes[e].$showMoreCount.text(t)
                        }
                },
                _getShowMoreCount: function(t) {
                    var n = e(".HH-Employer-VacanciesDashboard-VacanciesView-Vacancy", t).length,
                        i = t.data("vacancies-on-page"),
                        o = t.data("vacancies-count") - n;
                    return o > i ? i : o > 0 ? o : 0
                },
                _cacheNodes: function(t) {
                    var n = this;
                    t.each(function(t, i) {
                        var o = e(i);
                        n.nodes[i.getAttribute("data-employer-manager-id")] = {
                            $manager: o,
                            $loading: e(".HH-Employer-VacanciesDashboard-VacanciesView-LoadingWrapper", o),
                            $vacanciesContainer: e(".HH-Employer-VacanciesDashboard-VacanciesView-ManagerVacancies", o),
                            $vacanciesCheckboxes: e(".HH-Employer-VacanciesDashboard-VacanciesView-Checkbox", o),
                            $vacancies: e(".HH-Employer-VacanciesDashboard-VacanciesView-Vacancy", o),
                            $vacanciesCheckAll: e(".HH-Employer-VacanciesDashboard-VacanciesView-CheckAll", o),
                            $showMoreWrapper: e(".HH-Employer-VacanciesDashboard-VacanciesView-ShowMoreWrapper", o),
                            $showMore: e(".HH-Employer-VacanciesDashboard-VacanciesView-ShowMore", o),
                            $showMoreCount: e(".HH-Employer-VacanciesDashboard-VacanciesView-ShowMoreCount", o),
                            $vacanciesTable: e(".HH-Employer-VacanciesDashboard-VacanciesView-VacanciesTable", o)
                        }
                    }), this.$checkboxes = this.$(".HH-Employer-VacanciesDashboard-VacanciesView-Checkbox")
                }
            });
        return n.build({
            defaults: {
                cssClasses: {
                    vacancySelected: "vacancies-dashboard-table-row-group_selected",
                    actionsSticky: "vacancies-dashboard-actions_show-only-group-actions"
                }
            },
            create: function(e, t) {
                return new d({
                    el: e,
                    options: t
                })
            }
        })
    }), define("HH/Employer/VacancyActions/Callback", ["jquery", "bloko/common/ready"], function(e, t) {
        return function(n, i) {
            e(n).on("HH-Employer-VacancyActions-DropdownInit", function(e) {
                i(e.target)
            }), [].concat(_toConsumableArray(n.querySelectorAll(".HH-Employer-VacancyActions-Dropdown"))).forEach(function(e) {
                t.getPromise(e, "HH-Employer-VacancyActions-DropdownInit").then(function() {
                    i(e)
                })
            })
        }
    }), define("HH/Employer/VacanciesDashboard/VacancyUpgrade", ["jquery", "HHC/Components", "bloko/blocks/popup/popup", "bloko/common/loadingSetter", "bloko/blocks/tooltip/tooltip", "HH/Employer/VacancyActions/Callback"], function(e, t, n, i, o, s) {
        var a = "/employer/vacancy/suitable_upgrades",
            r = ".HH-Employer-VacanciesDashboard-VacancyUpgrade-Switcher";
        function l(l, c) {
            var d = e(l),
                h = e(".HH-Employer-VacanciesDashboard-VacancyUpgrade-Popup", d),
                u = {},
                p = [],
                m = 0;
            function f(s) {
                var l = e(s.target).closest(r),
                    f = l.closest(".HH-Employer-VacanciesDashboard-VacancyUpgrade-Vacancy", d).data("vacancy-id");
                if (u[f]) u[f].show();
                else {
                    var g = e(".HH-Employer-VacanciesDashboard-VacancyUpgrade-Loading", l);
                    g.length || (g = l);
                    var b = g.data("loading-setter-id");
                    void 0 === b && (b = m, m += 1, p[b] = new i(g), g.data("loading-setter-id", b)), p[b].start();
                    var v = e(".HH-Employer-VacanciesDashboard-VacancyUpgrade-PopupContent", h);
                    e.ajax({
                        url: a,
                        data: {
                            vacancyId: f,
                            upgradeBackurl: window.location.pathname,
                            buyBackurl: "/vacancy/" + f + "#upgrade",
                            originalRequestId: c.originalRequestId
                        }
                    }).then(function(i) {
                        var o, s, a = e("<div>").html(i);
                        t.init(a.get(0)), v.append(a), (o = a.get(0), u[s = f] || (u[s] = t.make(n, o, {}), u[s].setTitle(c.title)), u[s]).show()
                    }, function() {
                        o.getInstance(l, {
                            closeByClick: !0,
                            host: "body"
                        }).show()
                    }).always(function() {
                        p[b].stop()
                    })
                }
            }
            d.on("click", r, f), s(l, function(t) {
                e(r, t).on("click", f)
            })
        }
        return t.build({
            create: function(e, t) {
                return new l(e, t)
            }
        })
    }), define("HH/Employer/VacancyCard/VacancyCardGraph", ["jquery", "raphael", "HHC/Components", "Utils/Dates", "bloko/common/media"], function(e, t, n, i, o) {
        function s(n, s) {
            var a = e(n),
                r = void 0,
                l = void 0,
                c = void 0,
                d = {
                    attr: {
                        "stroke-width": 2,
                        stroke: "#333"
                    }
                },
                h = s.data.map(function(e) {
                    return {
                        value: e.views
                    }
                }),
                u = Math.max(h.reduce(function(e, t) {
                    return t.value > e ? t.value : e
                }, 0), 1),
                p = void 0,
                m = void 0,
                f = void 0,
                g = {
                    attr: {
                        "stroke-width": 2,
                        stroke: "#8cb900"
                    }
                },
                b = s.data.map(function(e) {
                    return {
                        value: e.responses,
                        date: i.toFormat(new Date(e.date), "%d.%m")
                    }
                }),
                v = Math.max(b.reduce(function(e, t) {
                    return t.value > e ? t.value : e
                }, 0), 1),
                k = void 0,
                y = void 0,
                w = void 0,
                H = void 0,
                S = o.getBreakpoint();
            function C(e) {
                S !== o.breakpoint.XS && r.path(["M", e.x + H, e.y + c, "H", r.width]).attr(s.axis.attr), r.path(["M", e.x + H, e.y, "V", e.y + c]).attr(s.axis.attr)
            }
            function T(e, t) {
                return t.transform("t0," + ("top" === e ? "-" : "") + t.getBBox().height / 2), t
            }
            function E(e, t, n) {
                var i = r.text(e.x, e.y, t);
                return n ? i.transform("t0," + s.label.height) : T("bottom", i), i.attr(s.label.attr), i
            }
            function _(e) {
                T("top", r.text(e.x + H / 2, e.y + c, "0")).attr(s.label.attr)
            }
            function $(t, n) {
                T("bottom", r.text(r.width, t.y, n)).attr(e.extend({}, s.label.attr, {
                    "text-anchor": "end"
                }))
            }
            function M(e, t) {
                var n = c / t;
                return c - n * e[e.length - 1].value < s.label.height || c - n * e[e.length - 2].value < s.label.height
            }
            function I(e, t, n, i, o) {
                var s = o.graph.attr["stroke-width"] / 2,
                    a = c / n,
                    d = i ? (c - o.label.height) / c : 1,
                    h = t.map(function(t, n) {
                        return null === t.value ? null : {
                            x: e.x + H + l * n,
                            y: e.y + c - (0 === t.value ? s : a * d * t.value)
                        }
                    });
                r.path(h.filter(function(e) {
                    return null !== e
                }).map(function(e, t) {
                    return (0 === t ? "M" : "L") + [e.x, e.y]
                })).attr(o.graph.attr)
            }
            function x() {
                r && r.remove(), r = new t(n, a.width(), a.height());
                var i, o, T = {
                        x: 0,
                        y: 5
                    },
                    x = {
                        x: 0,
                        y: (c = s.graph.height[S in s.graph.height ? S : "default"]) + 25
                    };
                f = M(h, u), w = M(b, v), p = E(T, u, f), m = p.getBBox(), k = E(x, v, w), y = k.getBBox(), H = Math.max(m.width, y.width), p.transform("...t" + H / 2 + ",0"), k.transform("...t" + H / 2 + ",0"), H += 2, l = (r.width - H) / (s.data.length - 1), $(T, s.trl.views), C(T), _(T), I(T, h, u, f, e.extend(!0, {}, s, {
                    graph: d
                })), $(x, s.trl.responses), C(x), _(x), i = x, (o = b).forEach(function(t, n) {
                    if (n % 2 == 0) {
                        var a = e.extend({}, s.label.attr);
                        0 === n ? a["text-anchor"] = "start" : n === o.length - 1 && (a["text-anchor"] = "end");
                        var d = r.text(i.x + H + l * n, i.y + c, t.date).attr(a);
                        d.transform("t0," + d.getBBox().height)
                    }
                }), I(x, b, v, w, e.extend(!0, {}, s, {
                    graph: g
                }))
            }
            e(window).on("resize orientationchange", function() {
                var e = o.getBreakpoint();
                e !== o.breakpoint.XS && e === S || (S = e, x())
            }), x()
        }
        return n.build({
            defaults: {
                graph: {
                    height: {
                        default: 80,
                        xs: 60
                    },
                    attr: {
                        "stroke-width": 1,
                        stroke: "#000000"
                    }
                },
                axis: {
                    attr: {
                        "stroke-width": 1,
                        stroke: "#e7e7e7"
                    }
                },
                label: {
                    height: 15,
                    attr: {
                        "text-anchor": "middle",
                        fill: "#acb5ba",
                        "font-size": "11px"
                    }
                }
            },
            create: function(e, t) {
                return new s(e, t)
            }
        })
    }), define("HH/Employer/VacancyCard/VacancyCard", ["jquery", "HHC/Components", "HH/Employer/VacancyCard/VacancyCardGraph", "bloko/common/media", "bloko/common/loadingSetter"], function(e, t, n, i, o) {
        var s = {
            xs: "3",
            s: "7",
            m: "8",
            l: "8"
        };
        function a(n, a) {
            var r = e(n),
                l = {},
                c = {},
                d = {},
                h = {};
            r.on("click", ".HH-EmployerVacancyCard-Trigger", function(t) {
                ! function(t) {
                    var n = t.data("vacancy-id"),
                        i = e(".HH-EmployerVacancyCard-Content", t);
                    if (t.toggleClass(a.cssClasses.cardContainerOpen), e(".HH-EmployerVacancyCard-Chevron", t).toggleClass(a.cssClasses.chevron), i.toggleClass("g-hidden"), l[n]) {
                        if (i.length) return;
                        t.append(h[n]), p(t)
                    } else m(t)
                }(e(t.target).closest(".HH-EmployerVacancyCard-Container"))
            }), r.on("click", ".HH-EmployerVacancyCard-Retry", function(t) {
                m(e(t.target).closest(".HH-EmployerVacancyCard-Container"))
            });
            var u = i.getBreakpoint();
            function p(n) {
                e(".HH-EmployerVacancyCard-Wrapper", n).attr("colspan", s[u]), t.init(n.get(0))
            }
            function m(t) {
                e.ajax({
                    url: "/analytics",
                    data: {
                        goal: "vacancy_card_load"
                    }
                });
                var n = t.data("vacancy-id");
                if (!c[n]) {
                    l[n] = !0;
                    var i = e(".HH-EmployerVacancyCard-Chevron", t),
                        s = e(".HH-EmployerVacancyCard-Error", t);
                    i.addClass("g-hidden"), d[n] || (d[n] = new o(e(".HH-EmployerVacancyCard-Loading", t)), d[n].start()), e.ajax({
                        url: "/shards/employer/vacancy_card",
                        data: {
                            vacancyId: n
                        }
                    }).then(function(e) {
                        h[n] = e, t.append(e), p(t), s.addClass("g-hidden").removeClass("HH-EmployerVacancyCard-Content")
                    }, function() {
                        s.removeClass("g-hidden").addClass("HH-EmployerVacancyCard-Content")
                    }).always(function() {
                        d[n].stop(), l[n] = !0, c[n] = !1, i.removeClass("g-hidden")
                    })
                }
            }
            e(window).on("resize orientationchange", function() {
                var t = i.getBreakpoint();
                t !== u && (u = t, e(".HH-EmployerVacancyCard-Wrapper", r).attr("colspan", s[t]))
            })
        }
        return t.build({
            create: function(e, t) {
                return new a(e, t)
            }
        })
    }), define("HH/EmployersSearchRedirect", ["jquery", "HHC/Components"], function(e, t) {
        var n = {
            suggest: ".HH-EmployersSearchRedirect-Suggest"
        };
        return t.build({
            create: function(t, i) {
                return new function(t, i) {
                    var o = this;
                    this.$element = e(t), this.params = i, this.$element.find(n.suggest).on("selected.suggest autoselected.suggest", function(e, t) {
                        var n = t[o.params.field];
                        n && (window.location.href = "/employer/" + n)
                    })
                }(t, i)
            }
        })
    }), define("HH/Form/Module", ["jquery"], function(e) {
        return new function() {
            var t = e(document);
            this.PERIODICITY = 500, this.fields = [], this.validationsResults = {}, this.json = {}, this.deferred = e.Deferred(), this.add = function(e, t, n) {
                var i = {
                    callback: t,
                    get: e,
                    element: n.element,
                    collection: n,
                    namespace: n.namespace
                };
                return this.fields.push(i), {
                    freeze: this._freeze.bind(this, i),
                    unfreeze: this._unfreeze.bind(this, i)
                }
            }, this._freeze = function(e) {
                e.stop = !0
            }, this._unfreeze = function(e) {
                e.stop = !1
            }, this.validate = function(t) {
                var n = t.get(),
                    i = e(t.element).is(":visible");
                if (t.stop || n === t.value && i === t.visible) this.restartCheck();
                else {
                    t.value = n, t.visible = i;
                    var o = t.callback();
                    o && (this.validationsResults[o.name] = o), this.restartCheck()
                }
            }, this.check = function() {
                0 !== this.fields.length ? (this.fields.forEach(this.validate, this), this.json.dependantFields && this.validateDependantFields()) : this.restartCheck()
            }, this.restartCheck = function() {
                this.timer && window.clearTimeout(this.timer), this.timer = window.setTimeout(this.check.bind(this), this.PERIODICITY)
            }, this.getMessage = function(e, t) {
                var n = this.json.messages;
                return n[e] && n[e][t] ? n[e][t] : n._default[t]
            }, this.getConditions = function(e) {
                return this.json.conditions[e] || {}
            }, this.clearFields = function(e) {
                this.fields = this.fields.filter(function(n) {
                    var i = e.contains(n.element);
                    return i || t.trigger("HH-Form-RemoveField", {
                        field: n
                    }), i
                })
            }, this.getFields = function(e) {
                return e ? this.fields.filter(function(t) {
                    return t.namespace === e
                }) : this.fields
            }, this.getValidationResults = function() {
                return this.validationsResults
            }, this.clearCache = function() {
                var e = this.json.dependantFields,
                    t = [e.main, e.secondary];
                this.fields.filter(function(e) {
                    return -1 !== t.indexOf(e.collection.name)
                }).forEach(function(e) {
                    e.value = null, e.collection.resetRequiredConditions()
                })
            }, this.swapMinCount = function(e, t) {
                1 === e.mincount && 0 === t.mincount || (e.mincount = 1, t.mincount = 0, this.clearCache())
            }, this.validateDependantFields = function() {
                var e = this.json.dependantFields,
                    t = this.validationsResults[e.main],
                    n = this.validationsResults[e.secondary];
                if (t && n) {
                    var i = this.getConditions(e.main),
                        o = this.getConditions(e.secondary);
                    0 !== i.validCount || 0 !== o.validCount ? 0 === t.validCount && n.validCount > 0 ? this.swapMinCount(o, i) : this.swapMinCount(i, o) : 1 !== i.mincount && 1 !== o.mincount && (i.mincount = 1, o.mincount = 1, this.clearCache())
                }
            }, this.check()
        }
    }), define("HH/Form", ["HHC/Components", "HH/Form/Module"], function(e, t) {
        return e.build({
            defaults: {
                messages: {
                    _default: {}
                }
            },
            create: function(e, n) {
                return new function(e, n) {
                    t.json = n, t.deferred.resolve()
                }(e, n)
            }
        })
    }), define("HH/GAArticlesScrolling", ["jquery", "HHC/Components", "HHC/Analytics"], function(e, t, n) {
        return t.build({
            create: function(t, i) {
                return new function(t, i) {
                    this.percentsToSend = [100], this.init = function(t) {
                        var n = e(".HH-GAArticlesScrolling-columns:first", t);
                        n.length || (n = e(t)), this.height100 = n.height() + n.offset().top, this.lastPercent = 0, e(window).on("scroll.GAArticlesScrolling", this.setTimeoutOnScroll.bind(this)), this.checkScroll()
                    }, this.setTimeoutOnScroll = function() {
                        void 0 === this.checkScrollTimer && (this.checkScrollTimer = window.setTimeout(this.checkScroll.bind(this), 500))
                    }, this.checkScroll = function() {
                        var t = (e(window).height() + e(window).scrollTop()) / this.height100;
                        if (this.checkScrollTimer = void 0, !(t < this.lastPercent))
                            for (var n = 0, i = this.percentsToSend.length; n < i; n++)
                                if (t >= this.percentsToSend[n] / 100) return 0 === n ? e(window).off("scroll.GAArticlesScrolling") : this.lastPercent = this.percentsToSend[n - 1] / 100, void this.sendGAEvent(String(this.percentsToSend[n]))
                    }, this.sendGAEvent = function(e) {
                        var t = window.location.pathname.substr(1).replace(/\//g, "-");
                        n.trackAnalyticsEvent("Scroll", e, t)
                    }, this.init(t, i)
                }(t, i)
            }
        })
    }), define("HH/GAFormStatistic", ["jquery", "HHC/Analytics", "HHC/Components"], function(e, t, n) {
        return n.build({
            defaults: {
                categoryName: "form"
            },
            create: function(n, i) {
                return new function(n, i) {
                    this.params = i, this.init = function(t) {
                        this.sentInputs = {}, this.params.markedOnly ? e(t).on("blur", ".HH-GAFormStatistic-Input", this.handler.bind(this)) : e(t).on("blur", "input, textarea, select", this.handler.bind(this)), e(t).on("click", ".HH-GAFormStatistic-Click", this.handler.bind(this)), e(t).on("click", ".HH-GAFormStatistic-Delay", this.delayedHandler.bind(this))
                    }, this.handler = function(n) {
                        var i = e(n.target).attr("data-GAFormStatistic-name") || e(n.target).attr("name");
                        if (void 0 === this.sentInputs[i]) {
                            var o = this.params.formName || i,
                                s = this.params.formName ? i : "";
                            "select" === n.target.tagName.toLowerCase() && (s = e("option:selected", n.target).attr("data-GAFormStatistic-option")), t.trackAnalyticsEvent(this.params.categoryName, o, s), this.sentInputs[i] = !0
                        }
                    }, this.delayedHandler = function(n) {
                        var i = this.params.formName || e(n.target).attr("data-GAFormStatistic-name"),
                            o = this.params.formName ? e(n.target).attr("data-GAFormStatistic-name") : "";
                        t.googleEventToStorage(this.params.categoryName, i, o)
                    }, this.init(n, i)
                }(n, i)
            }
        })
    }), define("HH/HoverSwitcher", ["jquery", "HHC/Components", "bloko/common/supports"], function(e, t, n) {
        return t.build({
            defaults: {
                cssClasses: {
                    hover: "navi-dropdown-link_hover"
                }
            },
            create: function(t, i) {
                return new function(t, i) {
                    this.$element = e(t), this.params = i;
                    var o = ".HH-HoverSwitcher-SwitchingItem",
                        s = ".HH-HoverSwitcher-TriggeringItem";
                    this.init = function() {
                        var t = {},
                            i = null,
                            a = null,
                            r = this.params.cssClasses.hover,
                            l = function() {
                                e(a).addClass("g-hidden"), e(i).removeClass(r), a = null, i = null, n.touch() && e(document.body).off("click." + o)
                            },
                            c = function(t) {
                                if (i) {
                                    var n = e(t.target).data("hh-panel-id"),
                                        o = e(t.relatedTarget).closest(a);
                                    o.length ? n !== o.data("hh-panel-id") ? l() : o.one("mouseleave", l) : l()
                                }
                            },
                            d = function(s) {
                                var l = e(this);
                                i !== this && l.hasClass("HH-HoverSwitcher-Active") && (c(s), a = t[l.data("hh-panel-id")], e(a).removeClass("g-hidden"), e(i = this).addClass(r), n.touch() && e(document.body).on("click." + o, function(t) {
                                    var n = e(t.target);
                                    i && 0 === n.closest(i).length && 0 === n.closest(a).length && c(t)
                                }))
                            };
                        e(o, this.$element).each(function() {
                            t[e(this).data("hh-panel-id")] = this
                        }), this.$element.on("mouseenter", s, d).on("mouseleave", s, c), n.touch() && this.$element.on("click", s, d)
                    }, this.init(t, i)
                }(t, i)
            }
        })
    }), define("bloko/blocks/infoTip/infoTip.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="bloko-tooltip bloko-tooltip_with-close bloko-tooltip_hidden">'), i.b("\n" + n), i.b('    <div class="Bloko-Tooltip-Content"></div>'), i.b("\n" + n), i.b('    <div class="Bloko-Tooltip-Arrow bloko-tooltip__arrow"></div>'), i.b("\n" + n), i.b('    <div class="Bloko-Tooltip-Close bloko-tooltip__close">'), i.b("\n" + n), i.b('        <span class="bloko-icon bloko-icon_cancel bloko-icon_initial-inverted"></span>'), i.b("\n" + n), i.b("    </div>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("bloko/blocks/infoTip/infoTip", ["jquery", "bloko/common/tooltipModule", "bloko/blocks/infoTip/infoTip.mustache", "bloko/common/core/Components", "bloko/common/events"], function(e, t, n, i, o) {
        return i.build({
            defaults: {
                manualShow: !1
            },
            create: function(i, s) {
                var a = new t(i, n.render(), e.extend({}, s, {
                        type: "infoTip"
                    })),
                    r = o.extend({
                        show: function() {
                            a.show(), r._trigger("Bloko-InfoTip-Show")
                        },
                        hide: function() {
                            a.isVisible && (a.hide(), r._trigger("Bloko-InfoTip-Hide"))
                        }
                    });
                return a.events.on("render", function() {
                    e(".Bloko-Tooltip-Close", a.$tooltip).on("click", function() {
                        r.hide()
                    })
                }), s.manualShow || r.show(), r
            }
        })
    }), define("HH/VacancyMainSearchInfoTip", ["jquery", "HHC/Components", "bloko/blocks/infoTip/infoTip", "bloko/common/storage/LocalStorageWrapper"], function(e, t, n, i) {
        var o = "hh-notifications:viewed",
            s = "vacancy_main_search";
        return t.build({
            create: function(a) {
                var r = e(a),
                    l = r.find(".HH-VacancyMainSearchInfoTip-Input"),
                    c = JSON.parse(i.getItem(o)) || [];
                if (-1 === c.indexOf(s)) {
                    var d = t.make(n, l.get(0), {
                        html: r.find(".HH-VacancyMainSearchInfoTip-Content").html(),
                        showImmediate: !0,
                        position: "bottom",
                        layer: "above-overlay-content"
                    });
                    c.push(s), i.setItem(o, JSON.stringify(c)), e.ajax({
                        method: "post",
                        url: "/notifications/shown",
                        data: {
                            id: s
                        }
                    }), e("body").on("click", ".HH-VacancyMainSearchInfoTip-Hint", function(t) {
                        d.hide(), l.val(e(t.currentTarget).text()).prop("form").submit()
                    }), l.on("focus", function() {
                        d.hide()
                    }), e(".HH-VacancyMainSearchInfoTip-Navi").on("HH-Navi-StickyMenu-Block-Collapsed", function() {
                        d.hide()
                    })
                }
            }
        })
    }), define("HH/Linkify", ["HHC/Components", "Utils/Strings"], function(e, t) {
        return e.build({
            create: function(e) {
                e.innerHTML = t.linkify(e.innerHTML)
            }
        })
    }), define("HH/LinkModifierModule", ["bloko/common/urlParser"], function(e) {
        return function(t, n) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                o = new RegExp(n.searchRegExpString),
                s = e(t.replace(o, n.replaceString));
            return s.params = Object.assign({}, s.params, i, n.query), s.href
        }
    }), define("HH/LinkModifier", ["jquery", "HHC/Components", "HH/LinkModifierModule"], function(e, t, n) {
        return t.build({
            create: function(t, i) {
                e(t).on("click contextmenu mousedown", ".HH-LinkModifier", function(t) {
                    var o = e(t.currentTarget);
                    if (!o.data("clicked")) {
                        var s = {};
                        Array.isArray(i.additionalParams) && (s = i.additionalParams.reduce(function(e, t) {
                            return e[t] = [o.data(t.toLowerCase())], e
                        }, {})), o.attr({
                            href: n(o.attr("href"), i, s),
                            "data-clicked": !0
                        })
                    }
                })
            }
        })
    }), define("Utils/PostMessage", ["jquery"], function(e) {
        return {
            on: function(t) {
                var n = {
                        origin: window.location.origin
                    },
                    i = e.extend(!0, {}, n, t);
                e(window).on("message", function(e) {
                    if (e.originalEvent.origin === i.origin) {
                        var t = void 0;
                        try {
                            t = JSON.parse(e.originalEvent.data)
                        } catch (e) {
                            return
                        }
                        t && i.handlers[t.name] instanceof Function && i.handlers[t.name](t.data)
                    }
                })
            },
            trigger: function(e) {
                e.target.postMessage(JSON.stringify(e.message), e.origin || "*")
            }
        }
    }), define("HH/LiveTex", ["jquery", "HHC/Components", "Utils/PostMessage", "bloko/common/urlParser"], function(e, t, n, i) {
        var o = void 0,
            s = e.Deferred(),
            a = e.Deferred(),
            r = window.location.protocol + "//" + i(window.globalVars.livetex.src).host,
            l = e("<iframe/>").attr({
                class: "HH-LiveTex-Iframe livetex-iframe",
                src: window.globalVars.livetex.src
            });
        return l.on("load", a.resolve), e(document.body).append(l), n.on({
            origin: r,
            handlers: {
                "livetex.awaitingInit": function() {
                    o || a.done(function() {
                        o = l.get(0).contentWindow, n.trigger({
                            target: o,
                            origin: r,
                            message: {
                                name: "livetex.init",
                                data: window.globalVars.livetex.params
                            }
                        })
                    })
                },
                "livetex.ready": function() {
                    s.resolve()
                }
            }
        }), t.build({
            defaults: {
                activeClass: "livetex_active"
            },
            create: function(t, i) {
                s.done(function() {
                    e(t).removeClass(i.disabledClass).addClass(i.activeClass).on("click", function() {
                        n.trigger({
                            target: o,
                            origin: r,
                            message: {
                                name: "livetex.open"
                            }
                        })
                    })
                })
            }
        })
    }), define("HH/SupportChat", ["HHC/Components", "Utils/PostMessage", "bloko/common/media"], function(e, t, n) {
        return e.build({
            defaults: {
                activeClass: "",
                disabledClass: ""
            },
            create: function(e, i) {
                var o = void 0,
                    s = void 0,
                    a = "https://" + window.globalVars.supportChat.domain,
                    r = i.disabledClass.split(" "),
                    l = i.activeClass.split(" "),
                    c = new Promise(function(e) {
                        s = e
                    }),
                    d = document.createElement("iframe");
                d.setAttribute("class", i.iframeClasses), d.setAttribute("src", (h = "https://" + window.globalVars.supportChat.domain + "/iclient.php?small-screen=" + (n.getBreakpoint() === n.breakpoint.XS || n.getBreakpoint() === n.breakpoint.S ? "1" : "0"), h += "&location=" + window.globalVars.supportChat.location, h += "&start-page=" + encodeURIComponent(JSON.stringify({
                    url: document.location.href
                })), window.globalVars.supportChat.webim_visitor && (h += "&provided-visitor=" + encodeURIComponent(JSON.stringify(window.globalVars.supportChat.webim_visitor))), h)), d.onload = s, document.body.appendChild(d);
                var h;
                var u = {
                    onInit: function(e) {
                        var t = e.online;
                        o || c.then(function() {
                            t && g(), o = d.contentWindow
                        })
                    },
                    onOnlineOperatorsAppear: function() {
                        g()
                    },
                    onOnlineOperatorsLeave: function() {
                        r && m(r), l && f(l), e.removeEventListener("click", p)
                    },
                    onChatShownStateChanged: function(e) {
                        e.shown ? (d.classList.remove("g-hidden"), window.addEventListener("focus", b), window.addEventListener("blur", v)) : (d.classList.add("g-hidden"), window.removeEventListener("focus", b), window.removeEventListener("blur", v))
                    }
                };
                function p() {
                    t.trigger({
                        target: o,
                        origin: a,
                        message: {
                            cmd: "webim.api.chat.start"
                        }
                    })
                }
                function m(t) {
                    t.forEach(function(t) {
                        t && e.classList.add(t)
                    })
                }
                function f(t) {
                    t.forEach(function(t) {
                        t && e.classList.remove(t)
                    })
                }
                function g() {
                    r && f(r), l && m(l), e.addEventListener("click", p)
                }
                function b() {
                    o && t.trigger({
                        target: o,
                        origin: a,
                        message: {
                            cmd: "window.focus"
                        }
                    })
                }
                function v() {
                    o && t.trigger({
                        target: o,
                        origin: a,
                        message: {
                            cmd: "window.blur"
                        }
                    })
                }
                window.addEventListener("message", function(e) {
                    if (e.origin === "https://" + window.globalVars.supportChat.domain) {
                        var t = void 0;
                        try {
                            t = JSON.parse(e.data)
                        } catch (e) {
                            return
                        }
                        if ("handler" === t.cmd) {
                            var n = t.params;
                            n && u[n.handlerName] instanceof Function && u[n.handlerName](n.event)
                        }
                    }
                })
            }
        })
    }), define("HHC/Banners/clickme.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div class="clickme-banner '), i.b(i.v(i.f("additionalClass", e, t, 0))), i.b('">'), i.b("\n" + n), i.b('    <a href="'), i.b(i.v(i.f("click", e, t, 0))), i.b('" class="clickme-banner__link" rel="noopener" target="_blank">'), i.b("\n" + n), i.b('        <img src="'), i.b(i.v(i.f("src", e, t, 0))), i.b('" class="clickme-banner__image"/>'), i.b("\n" + n), i.b("        "), i.b(i.v(i.f("title", e, t, 0))), i.b("\n" + n), i.b('        <span class="clickme-banner__limit">16+</span>'), i.b("\n" + n), i.b('        <span class="clickme-banner__body">'), i.b("\n" + n), i.b("            "), i.b(i.v(i.f("body", e, t, 0))), i.b("\n" + n), i.b("        </span>"), i.b("\n" + n), i.b("    </a>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("bloko/common/template", [], function() {
        return {
            fromString: function(e) {
                return e.replace(/^\s*<!--|-->\s*$/g, "").replace(/^\s*\n|\n\s*$/g, "")
            },
            fromElement: function(e) {
                return e instanceof Element ? this.fromString(e.innerHTML) : ""
            }
        }
    }), define("Utils/ParseHTML", [], function() {
        return function(e) {
            var t = document.createDocumentFragment(),
                n = document.createElement("div");
            return n.innerHTML = e.trim(), Array.from(n.childNodes).forEach(function(e) {
                return t.appendChild(e)
            }), t
        }
    }), define("HHC/Banners", ["HHC/Banners/clickme.mustache", "bloko/common/template", "bloko/common/urlParser", "browser-jsonp", "Utils/ParseHTML"], function(e, t, n, i, o) {
        var s = new CustomEvent("HH-Banners-Init", {
                bubbles: !0
            }),
            a = function(e) {
                var t = window.open(e);
                if (t) try {
                    t.opener = null
                } catch (e) {}
            },
            r = {
                html: function(e, t, n) {
                    t.onclick = function() {
                        a(e.click)
                    }, t.innerHTML = e.body, n()
                },
                external: function(e, t, n) {
                    var i, o, s;
                    e.clickable && (i = e, o = t, (s = document.createElement("div")).style.width = i.width + "px", s.style.height = i.height + "px", s.className = "banner-place__clickable-area banner-place__clickable-area_" + i.place, s.onclick = function() {
                        a(i.click)
                    }, o.appendChild(s));
                    var r = document.createElement("iframe");
                    r.style.width = (e.width || 0) + "px", r.style.height = (e.height || 0) + "px", r.src = e.src, r.frameBorder = "no", r.scrolling = "no";
                    var l = t.dataset.bannerAdditionalClass;
                    r.className = l + " banner-place-iframe-" + e.place, t.appendChild(r), t.dataset.postMessage ? r.addEventListener("load", function() {
                        var t = document.createElement("a");
                        t.href = e.src, r.contentWindow.postMessage(e, t.protocol + "//" + t.host), n()
                    }) : r.addEventListener("load", function() {
                        n()
                    })
                },
                image: function(e, t, n) {
                    var i = document.createElement("a");
                    i.href = e.click, i.target = "_blank", i.rel = "noopener";
                    var o = document.createElement("img");
                    o.src = e.src, i.appendChild(o), t.appendChild(i), n()
                },
                clickme: function(t, n, i) {
                    n.appendChild(o(e.render(t))), i()
                }
            },
            l = {
                requestedBanners: [],
                init: function() {
                    c(Array.from(document.querySelectorAll(".HHC-Banners-Place")).map(function(e) {
                        return e.dataset.bannerId
                    }))
                },
                put: function(e, t) {
                    e.banners.forEach(function(e) {
                        Array.from(document.querySelectorAll(".HHC-Banner-" + e.place)).filter(function(e) {
                            return "true" !== e.dataset.loaded
                        }).forEach(function(n) {
                            var i = n.closest(".HHC-Banner-Wrapper");
                            n.classList.add(e.empty ? n.dataset.emptyClass : n.dataset.loadedClass), i && i.classList.add(e.empty ? i.dataset.emptyClass : i.dataset.loadedClass), e.empty || (e.additionalClass = n.dataset.bannerAdditionalClass || "", r[e.type](e, n, function() {
                                s.startTime = t, s.bannerPlace = e.place, s.bannerId = e.id, s.bannerType = e.type, n.dispatchEvent(s)
                            }), n.dataset.loaded = "true")
                        })
                    })
                },
                create: function(e, n, i) {
                    var s = t.fromElement(document.querySelector("." + (i || "HHC-Banners-Place-Template")));
                    n.forEach(function(t) {
                        e.appendChild(o(s.replace(/%id%/g, t)))
                    }), c(n)
                }
            };
        function c(e) {
            if (window.globalVars.bannersBatchUrl && e.length) {
                var t = e.filter(function(e) {
                    return "true" !== document.querySelector(".HHC-Banner-" + e).dataset.requested && (document.querySelector(".HHC-Banner-" + e).dataset.requested = "true", !0)
                });
                if (0 !== t.length) {
                    var o = n(window.globalVars.bannersBatchUrl);
                    o.params.format = ["json"], o.params.place = t;
                    var s = performance.now();
                    i({
                        url: o.href,
                        success: function(e) {
                            l.put(e, s)
                        }
                    })
                }
            }
        }
        return l
    }), define("Utils/VisibilityWatcher", [], function() {
        return {
            init: function(e) {
                var t = !1,
                    n = e.element,
                    i = function i() {
                        t || (n.offsetWidth || n.offsetHeight || n.getClientRects().length ? (t = !0, e.onVisible(), window.removeEventListener("resize", i), window.removeEventListener("element-displayed", i), n.dataset.listenersSetted = "false") : t = !1)
                    };
                "true" !== e.element.dataset.listenersSetted && (window.addEventListener("resize", i), window.addEventListener("element-displayed", i), e.element.dataset.listenersSetted = "true"), i()
            }
        }
    }), define("HH/LoadBannerOnVisibleModule", ["HHC/Banners", "Utils/VisibilityWatcher"], function(e, t) {
        return function(n, i) {
            window.requestIdleCallback(function() {
                t.init({
                    element: n,
                    onVisible: function() {
                        e.create(n, i.ids ? i.ids : [i.id], i.templateName)
                    }
                })
            })
        }
    }), define("HH/LoadBannerOnVisible", ["HHC/Components", "HH/LoadBannerOnVisibleModule"], function(e, t) {
        return e.build({
            create: t
        })
    }), define("HH/Loader", ["jquery", "HHC/Components"], function(e, t) {
        return t.build({
            create: function(t, n) {
                return new function(t, n) {
                    this.$element = e(t), this.params = n, this.bindings = {
                        spinner: ".HH-Loader-Spinner"
                    }, this.init = function() {
                        var t = this.params.className && this.params.className.hidden || "g-hidden",
                            n = "loading-processes";
                        this.$spinner = e(this.bindings.spinner, this.$element), this.$element.on({
                            startLoading: function(e) {
                                var i = (this.$element.data(n) || 0) + 1;
                                this.$spinner.removeClass(t), this.$element.data(n, i), e.stopPropagation()
                            }.bind(this),
                            stopLoading: function(e) {
                                var i = Math.max(0, (this.$element.data(n) || 0) - 1);
                                0 === i && this.$spinner.addClass(t), this.$element.data(n, i), e.stopPropagation()
                            }.bind(this)
                        })
                    }, this.init(t, n)
                }(t, n)
            }
        })
    }), define("HH/LoadShortVacancies", ["jquery", "HHC/Components"], function(e, t) {
        return t.build({
            create: function(n, i) {
                return new function(n, i) {
                    this.$element = e(n), this.init = function(t, n) {
                        var i = this;
                        this.ids = n.ids, this.$spinner = e(".HH-LoadShortVacancies-Spinner", t), this.$nextPage = e(".HH-LoadShortVacancies-NextPage", t), this.$error = e(".HH-LoadShortVacancies-Error", t), this.$systemControls = e(".HH-LoadShortVacancies-SystemControls", t), this.loaded = !1, this.vacanciesPerPage = 30, this.currentPage = 0, this.$nextPage.on("click", this.load.bind(this)), this.$element.on("Bloko-Toggle-Switch", function(e, t) {
                            i.initialLoad(t)
                        })
                    }, this.load = function() {
                        var n = this;
                        this.$spinner.removeClass("g-hidden");
                        var i = this.ids.slice(this.vacanciesPerPage * this.currentPage, this.vacanciesPerPage * (this.currentPage + 1));
                        e.ajax({
                            url: "/shards/short_vacancies",
                            type: "post",
                            data: e.param({
                                ids: i
                            }, !0)
                        }).then(function(i) {
                            n.$error.addClass("g-hidden");
                            var o = e(i);
                            n.$systemControls.before(o), t.init(o.get(0)), n.currentPage += 1, n.$nextPage.toggleClass("g-hidden", n.currentPage * n.vacanciesPerPage >= n.ids.length)
                        }, function() {
                            n.$error.removeClass("g-hidden")
                        }).always(function() {
                            n.$spinner.addClass("g-hidden")
                        })
                    }, this.initialLoad = function() {
                        this.loaded || (this.load(), this.loaded = !0)
                    }, this.init(n, i)
                }(n, i)
            }
        })
    }), define("bloko/common/getYmapsPromise", ["jquery"], function(e) {
        return function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = t.version,
                i = void 0 === n ? "2.1.59" : n,
                o = t.lang,
                s = void 0 === o ? "ru_RU" : o;
            if (window.blokoYmapsDeferred) return window.blokoYmapsDeferred.promise();
            var a = e.Deferred();
            return window.blokoYmapsDeferred = a, e.ajax({
                method: "GET",
                url: "https://api-maps.yandex.ru/" + i + "/",
                data: {
                    onload: "blokoYmapsDeferred.resolve",
                    onerror: "blokoYmapsDeferred.reject",
                    lang: s
                },
                cache: !0,
                dataType: "script"
            }).catch(a.reject).then(function() {
                return a.promise()
            })
        }
    }), define("HH/Maps/ymapsPromise", ["bloko/common/getYmapsPromise", "HHC/Debug"], function(e, t) {
        var n = window.globalVars.country,
            i = window.globalVars.locale;
        "2" === n && "en_RU" === i && (i = "uk_UA");
        var o = window.globalVars.features.debug_js;
        return e({
            lang: ["ru_RU", "en_US", "en_RU", "ru_UA", "uk_UA", "tr_TR"].indexOf(i) > -1 ? i : "ru_RU",
            mode: o ? "debug" : "release"
        }).catch(function() {
            t.log("error", "YMaps failed to load")
        })
    }), define("HH/Maps/AddressList", ["underscore", "backbone", "jquery", "HHC/Components", "HH/Maps/ymapsPromise", "HH/Collection/Common"], function(e, t, n, i, o, s) {
        var a = t.Model.extend({
                defaults: {
                    id: null,
                    visible: !0,
                    city: null,
                    street: null,
                    building: null,
                    description: "",
                    mapData: {},
                    metro: "",
                    rawAddress: null
                }
            }),
            r = t.Collection.extend(e.extend({}, s, {
                model: a
            })),
            l = t.View.extend({
                events: {
                    "click .HH-Maps-AddressView-Toggle": "toggle"
                },
                initialize: function(e) {
                    this.options = e, this.model.bind("change", this.render, this), this.model.view = this, this.mapEl = this.$(".HH-Maps-AddressView-Map"), this.toggleEl = this.$(".HH-Maps-AddressView-Toggle"), e.showMap && o.then(this.displayMap.bind(this))
                },
                toggle: function() {
                    var e = this,
                        t = this.model.get("visible") ? "hide" : "show";
                    n.ajax({
                        url: "/employer/edit_page?a=address_state",
                        method: "POST",
                        data: {
                            id: this.model.get("id"),
                            tab_id: this.options.tabId,
                            state: t
                        }
                    }).done(function() {
                        e.model.set({
                            visible: !e.model.get("visible")
                        })
                    })
                },
                formatAddress: function() {
                    var e = this.model.toJSON(),
                        t = [];
                    return ["city", "metro", "street", "building"].forEach(function(n) {
                        e[n] && t.push(e[n])
                    }), t.length > 0 ? t.join(", ") : e.rawAddress
                },
                displayMap: function(e) {
                    var t = this.model.get("mapData"),
                        n = void 0,
                        i = 10;
                    if (t.points && t.points.center ? (n = [t.points.center.lat, t.points.center.lng], i = t.points.center.zoom || i) : n = [55.76, 37.64], this.map = new e.Map(this.mapEl[0], {
                            center: n,
                            zoom: i
                        }, {
                            maxZoom: 17
                        }), this.map.controls.add("zoomControl"), t.points && t.points.marker) {
                        var o = [t.points.marker.lat, t.points.marker.lng];
                        this.marker ? this.marker.geometry.setCoordinates(o) : (this.marker = new e.Placemark(o, {}, {
                            draggable: !1
                        }), this.map.geoObjects.add(this.marker)), this.marker.properties.set("balloonContent", this.formatAddress())
                    }
                },
                render: function() {
                    this.toggleEl && this.toggleEl.html(this.model.get("visible") ? this.options.trl.hide : this.options.trl.show)
                }
            }),
            c = t.View.extend({
                addrs: null,
                initialize: function(e) {
                    this.options = e;
                    var t = this.options.params;
                    this.addrs = new r(this.options.data), this.addrs.bind("all", this.render, this), this.visibleNode = this.$(".HH-Maps-AddressListView-Visible"), this.hiddenNode = this.$(".HH-Maps-AddressListView-Hidden"), this.hiddenTitleNode = this.$(".HH-Maps-AddressListView-Hidden-Title");
                    var n = {
                        show: this.$(".HMaps-AddressListView-Template-Show").html(),
                        hide: this.$(".HMaps-AddressListView-Template-Hide").html()
                    };
                    this.addrs.each(function(e) {
                        new l({
                            model: e,
                            el: this.$(".HH-Maps-AddressView-" + e.get("id")),
                            tabId: t.tabId,
                            showMap: t.showMap,
                            trl: n
                        })
                    }, this)
                },
                render: function(e, t) {
                    "change:visible" === e && (!0 === t.get("visible") ? this.visibleNode.append(t.view.$el) : this.hiddenNode.append(t.view.$el), 0 === this.addrs.count(function(e) {
                        return e.get("visible")
                    }) ? this.visibleNode.addClass("g-hidden") : this.visibleNode.removeClass("g-hidden"), 0 === this.addrs.count(function(e) {
                        return !e.get("visible")
                    }) ? (this.hiddenNode.addClass("g-hidden"), this.hiddenTitleNode.addClass("g-hidden")) : (this.hiddenNode.removeClass("g-hidden"), this.hiddenTitleNode.removeClass("g-hidden")))
                }
            });
        return i.build({
            create: function(e, t) {
                return new function(e, t) {
                    this.view = new c({
                        el: e,
                        data: t.data,
                        params: t
                    })
                }(e, t)
            }
        })
    }), define("HH/Maps/ShowAddress", ["jquery", "HHC/Components", "HH/Maps/ymapsPromise"], function(e, t, n) {
        return t.build({
            defaults: {
                mapZoom: 16,
                placemarkIcon: window.globalVars.staticHost + "/i/Components/VacancyMap/hh-placemark.svg",
                placemarkIconSize: [37, 53]
            },
            create: function(t, i) {
                return new function(t, i) {
                    var o = e(t),
                        s = e(".HH-Maps-ShowAddress-Address", o),
                        a = e.Deferred();
                    s.length && i.pretty && s.text(h(i.address));
                    var r = e(".HH-Maps-ShowAddress-Description", o);
                    r.length && i.pretty && r.text(i.address.description);
                    var l = e(".HH-Maps-ShowAddress-Map", o),
                        c = e(".HH-Maps-ShowAddress-Map-View", o),
                        d = e(".HH-Maps-ShowAddress-ShowOnMap", o);
                    function h(e) {
                        var t = [];
                        return e.city && t.push(e.city), e.street && t.push(e.street), e.building && t.push(e.building), e.metro && t.push(e.metro), e.city || e.street || t.push(e.rawAddress), t.join(", ")
                    }
                    return this.showMap = function() {
                        d.addClass("g-hidden");
                        var e = void 0,
                            t = void 0;
                        n.then(function(n) {
                            var s, r, d;
                            s = c[0], r = i.address.mapData.points.center, e = new(d = n).Map(s, {
                                center: [r.lat, r.lng],
                                zoom: r.zoom,
                                controls: i.zoomControlPosition ? [] : ["zoomControl"]
                            }, {
                                maxZoom: 17
                            }), i.zoomControlPosition && e.controls.add(new d.control.ZoomControl({
                                options: {
                                    position: i.zoomControlPosition
                                }
                            })), i.disableScrollZoom && e.behaviors.disable("scrollZoom"), l.removeClass("g-hidden"), o.trigger("HH-Maps-ShowAddress-MapReady");
                            var u, p, m, f = i.address.mapData.points.marker;
                            f && (u = [f.lat, f.lng], p = h(i.address), m = n, t ? t.geometry.setCoordinates(u) : (t = new m.Placemark(u, {}, {
                                iconLayout: "default#image",
                                iconImageHref: i.placemarkIcon,
                                iconImageSize: i.placemarkIconSize,
                                zIndex: i.placemarkZIndex
                            }), e.geoObjects.add(t)), t.properties.set("balloonContent", p), e.setCenter(u, i.mapZoom)), e.container.fitToViewport(), a.resolve(e)
                        })
                    }, i.address.showMap ? this.showMap() : d.on("click", this.showMap.bind(this)), a.promise()
                }(t, i)
            }
        })
    }), define("HH/MetroSelection/MetroSelectionTagTemplate.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                return this.b(n = n || ""), this.s(this.d("additional.metroColor", e, t, 1), e, t, 0, 26, 115, "{{ }}") && (this.rs(e, t, function(e, t, i) {
                    i.b('    <span class="bloko-metro-pin" style="background: '), i.b(i.v(i.d("additional.metroColor", e, t, 0))), i.b('"></span>'), i.b("\n" + n)
                }), e.pop()), this.b(this.v(this.f("text", e, t, 0))), this.b("\n"), this.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("HH/MetroSelection/metroSuggest.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b("<div>"), i.b("\n" + n), i.b('    <span class="bloko-metro-pin" style="background: '), i.b(i.v(i.f("color", e, t, 0))), i.b('"></span>'), i.b("\n" + n), i.b('    <span data-qa="address-edit-metro-suggest-item">'), i.b(i.v(i.f("text", e, t, 0))), i.b("</span>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("HH/MetroSelection/metroStationSuggest.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div data-qa="address-edit-metro-suggest-item">'), i.b("\n" + n), i.b('    <span class="bloko-metro-pin" style="background: '), i.b(i.v(i.d("line.color", e, t, 0))), i.b('"></span>'), i.b("\n" + n), i.b('    <span data-qa="address-edit-metro-suggest-item">'), i.b(i.v(i.f("name", e, t, 0))), i.b("</span>"), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("Utils/QA", [], function() {
        return {
            replaceDataQa: function(e, t, n) {
                var i = e.getAttribute("data-qa"),
                    o = i ? i.split(/\s+/) : [];
                o.length && (o = o.filter(function(e) {
                    return e !== t
                })), -1 === o.indexOf(n) && o.push(n), e.setAttribute("data-qa", o.join(" "))
            },
            addDataQa: function(e, t) {
                var n = e.getAttribute("data-qa"),
                    i = n ? n.split(/\s+/) : []; - 1 === i.indexOf(t) && (i.push(t), e.setAttribute("data-qa", i.join(" ")))
            },
            removeDataQa: function(e, t) {
                var n = e.getAttribute("data-qa"),
                    i = n ? n.split(/\s+/) : [];
                i.length && e.setAttribute("data-qa", i.filter(function(e) {
                    return e !== t
                }).join(" "))
            },
            toggleDataQa: function(e, t, n) {
                n ? this.addDataQa(e, t) : this.removeDataQa(e, t)
            }
        }
    }), define("HH/MetroMap/Line", ["jquery", "Utils/Callbacks"], function(e, t) {
        function n(e) {
            this.id = e, this.selected = !1, this.stations = []
        }
        return e.extend(n.prototype, {
            addStation: function(e) {
                this.stations.push(e), t.add("HH-MetroMap-Station-Selected", this.updateState.bind(this), e), t.add("HH-MetroMap-Station-Unselected", this.updateState.bind(this), e)
            },
            getStation: function(e) {
                for (var t = 0, n = this.stations.length; t < n; t++)
                    if (this.stations[t].id === e) return this.stations[t];
                return null
            },
            startHover: function() {
                this.stations.forEach(function(e) {
                    e.startHover()
                })
            },
            endHover: function() {
                this.stations.forEach(function(e) {
                    e.endHover()
                })
            },
            selectAllStations: function() {
                this.stations.forEach(function(e) {
                    e.select()
                })
            },
            unselectAllStations: function() {
                this.stations.forEach(function(e) {
                    e.unselect()
                })
            },
            updateState: function() {
                this.stations.every(function(e) {
                    return e.isSelected()
                }) ? this.select() : this.unselect()
            },
            select: function() {
                this.isSelected() || (this.selected = !0, t.dispatch("HH-MetroMap-Line-Selected", this, this))
            },
            unselect: function() {
                this.isSelected() && (this.selected = !1, t.dispatch("HH-MetroMap-Line-Unselected", this, this))
            },
            isSelected: function() {
                return this.selected
            },
            isAllStationsSelected: function() {
                return this.stations.every(function(e) {
                    return e.isSelected()
                })
            }
        }), n
    }), define("HH/MetroMap/Station", ["require", "jquery", "Utils/QA", "Utils/Callbacks"], function(e, t, n, i) {
        var o = 12,
            s = 12,
            a = {
                item: "label-item",
                itemSelected: "label-item_selected"
            };
        function r(e) {
            t.extend(this, e), this.selected = !1, this.pinElements = [], this.selector = t(this.element).find("." + e.cssClasses.stationSelector + "." + e.bindings.station + "-" + this.lineId + "_" + this.id)[0], n.addDataQa(this.selector, a.item), this.startHover = function() {
                var e = this.element.getAttribute("class");
                e.match(this.cssClasses.stationHovering) || this.element.setAttribute("class", e + " " + this.cssClasses.stationHovering)
            }, this.endHover = function() {
                var e = this,
                    t = this.element.getAttribute("class").split(" ").filter(function(t) {
                        return t !== e.cssClasses.stationHovering
                    });
                this.element.setAttribute("class", t.join(" "))
            }
        }
        return t.extend(r.prototype, {
            select: function() {
                this.isSelected() || (this.selected = !0, i.dispatch("HH-MetroMap-Station-Selected", this, this), this.render())
            },
            unselect: function() {
                this.isSelected() && (this.selected = !1, i.dispatch("HH-MetroMap-Station-Unselected", this, this), this.render())
            },
            isSelected: function() {
                return this.selected
            },
            getPinElement: function() {
                var e = document.createElementNS("http://www.w3.org/2000/svg", "image");
                return e.setAttributeNS("http://www.w3.org/1999/xlink", "href", window.globalVars.staticHost + "/i/Components/MetroMap/pin.svg"), e.setAttribute("width", o), e.setAttribute("height", s), e.setAttribute("class", "g-hidden"), e
            },
            render: function() {
                var e = this,
                    t = this.element.getAttribute("class").split(" ").filter(function(t) {
                        return t !== e.cssClasses.stationSelected
                    });
                this.pins.forEach(function(t, n) {
                    if (!e.pinElements[n]) {
                        var i = void 0,
                            a = void 0,
                            r = void 0;
                        t.hasAttribute("data-stations") ? (i = (r = t.getAttribute("data-stations")).split(","), a = e.element.querySelectorAll('image[data-stations="' + r + '"]')[0]) : (i = [], (a = e.getPinElement()).setAttribute("x", t.getAttribute("cx") - o / 2), a.setAttribute("y", t.getAttribute("cy") - s / 2), e.element.prepend(a)), i.push(e.id), r = i.join(","), a.setAttribute("data-stations", r), t.setAttribute("data-stations", r), e.pinElements[n] = a
                    }
                }), this.isSelected() ? (t.push(this.cssClasses.stationSelected), this.pinElements.forEach(function(t) {
                    t.setAttribute("class", e.cssClasses.stationPin)
                }), n.addDataQa(this.selector, a.itemSelected)) : (this.pinElements.forEach(function(e) {
                    e.setAttribute("class", "g-hidden")
                }), n.removeDataQa(this.selector, a.itemSelected)), this.element.setAttribute("class", t.join(" "))
            }
        }), r
    }), define("HH/MetroMap/Cluster", ["Utils/Callbacks"], function(e) {
        var t = {
            cluster1Top: ["1.54", "1.60", "1.134", "1.117", "1.155", "1.148"],
            cluster1Bottom: ["1.103", "1.152", "1.135", "1.165", "1.149", "1.118", "1.162", "1.505", "1.513", "1.514"],
            cluster2Top: ["2.34", "2.12", "2.133", "2.30", "2.29", "2.125", "2.19", "2.558"],
            cluster2Bottom: ["2.42", "2.153", "2.96", "2.38", "2.57", "2.257", "2.53", "2.2", "2.101", "2.45", "2.512"],
            cluster3Top: ["3.17", "3.161", "3.130", "3.105", "3.40", "3.106", "3.159", "3.70"],
            cluster3Bottom: ["3.174", "3.181", "3.182", "3.84", "3.69", "3.173", "3.176", "3.65", "3.183", "3.463", "3.47"],
            cluster4All: ["4.172", "4.179", "4.136", "4.132", "4.6", "4.11", "4.151", "4.14", "4.150", "4.110", "4.471", "4.48", "4.73"],
            cluster5All: ["5.119", "5.93", "5.71", "5.82", "5.58", "5.49", "5.36", "5.102", "5.55", "5.104", "5.76", "5.20"],
            cluster6Top: ["6.126", "6.8", "6.27", "6.24", "6.129", "6.13", "6.81", "6.120"],
            cluster6Bottom: ["6.157", "6.74", "6.3", "6.121", "6.92", "6.41", "6.21", "6.56", "6.140", "6.164", "6.23", "6.94"],
            cluster7Top: ["7.16", "7.146", "7.18", "7.114", "7.95", "7.160", "7.507", "7.145", "7.138", "7.111"],
            cluster7Bottom: ["7.465", "7.508", "7.464", "7.33", "7.127", "7.68", "7.139", "7.62", "7.77", "7.31"],
            cluster8Top: ["8.470", "8.555", "8.556", "8.557", "8.592", "8.593", "8.594", "8.595", "97.599", "97.600", "97.601", "97.602"],
            cluster8Bottom: ["8.78", "8.112", "8.1", "8.158", "8.107", "8.88", "8.189", "8.91"],
            cluster9Top: ["9.9", "9.22", "9.97", "9.28", "9.108", "9.141", "9.35", "9.128", "9.83"],
            cluster9Bottom: ["9.37", "9.142", "9.85", "9.86", "9.87", "9.156", "9.163", "9.116", "9.147", "9.10", "9.170", "9.43"],
            cluster10Top: ["10.184", "10.185", "10.546", "10.547", "10.548", "10.596", "10.597", "10.598"],
            cluster10Bottom: ["10.72", "10.113", "10.63", "10.39", "10.52", "10.109", "10.32", "10.75", "10.25", "10.79", "10.187", "10.188", "10.186"],
            cluster11All: ["11.44", "11.46", "11.26"],
            cluster12All: ["12.171", "12.466", "12.166", "12.169", "12.168", "12.167", "12.467"],
            cluster0All: ["6.137", "6.144", "6.90", "6.50", "9.154", "9.123", "9.7", "9.115", "8.91", "4.132", "4.6", "4.11", "3.131", "3.5", "3.100", "10.177", "10.175", "2.99", "2.122", "2.80", "2.89", "1.61", "1.143", "1.66", "1.98", "1.4", "1.64", "7.51", "7.67", "7.124", "6.120", "6.94", "4.48", "3.70", "3.47", "2.19", "2.101", "5.119", "5.93", "5.71", "5.82", "5.58", "5.49", "5.36", "5.102", "5.55", "5.104", "5.76", "1.54", "1.103", "7.77", "5.20", "9.83", "9.37", "8.78", "10.72", "7.16"],
            cluster95All: ["95.530", "95.521", "95.535", "95.543", "95.544", "95.545", "95.515", "95.542", "95.541", "95.540", "95.539", "95.538", "95.528", "95.534", "95.518", "95.519", "95.531", "95.533", "95.532", "95.525", "95.526", "95.527", "95.537", "95.522", "95.523", "95.536", "95.516", "95.517", "95.520", "95.524", "95.529"],
            cluster96All: ["96.549", "96.550", "96.551", "96.552", "96.553", "96.554"],
            cluster97All: ["8.592", "8.593", "8.594", "8.595", "97.599", "97.600", "97.601", "97.602", "97.603"]
        };
        return function(n, i, o, s, a) {
            var r = this;
            this.stationsIds = t["cluster" + o + s] || [], this.id = o, this.direction = s, this.stations = [];
            var l = n.find(".HH-MetroMap-Cluster-PinPlace");
            n.on("mouseenter", function() {
                r.stations.forEach(function(e) {
                    e.startHover()
                })
            }).on("mouseleave", function() {
                r.stations.forEach(function(e) {
                    e.endHover()
                })
            }), this.isSelected = function() {
                return this.selected
            }, this.updateState = function() {
                this.stations.every(function(e) {
                    return e.isSelected()
                }) ? this.select() : this.unselect()
            }, this.selectAll = function() {
                this.stations.forEach(function(e) {
                    e.select()
                })
            }, this.unselectAll = function() {
                this.stations.forEach(function(e) {
                    e.unselect()
                })
            }, this.select = function() {
                this.isSelected() || (this.selectAll(), this.selected = !0, i.trigger("HH-MetroMap-Cluster-Change-State", this), l.removeClass("g-hidden"))
            }, this.unselect = function(e) {
                this.isSelected() && (e && this.unselectAll(), this.selected = !1, i.trigger("HH-MetroMap-Cluster-Change-State", this), l.addClass("g-hidden"))
            }, this.stationsIds.forEach(function(t) {
                var n = t.slice(0, t.indexOf(".")),
                    i = t.slice(t.indexOf(".") + 1),
                    o = a.getLine(n).getStation(i);
                this.stations.push(o), e.add("HH-MetroMap-Station-Selected", this.updateState.bind(this), o), e.add("HH-MetroMap-Station-Unselected", this.updateState.bind(this), o)
            }, this), n.on("click", function() {
                r.isSelected() ? r.unselect(!0) : r.select()
            })
        }
    }), define("HH/MetroMap/Map", ["jquery", "Utils/Callbacks", "HH/MetroMap/Line", "HH/MetroMap/Station", "HH/MetroMap/Cluster"], function(e, t, n, i, o) {
        return function(s) {
            var a = (s = e.extend({}, {
                    bindings: {
                        station: "HH-MetroMap-Station",
                        pin: "HH-MetroMap-Pin",
                        cluster: "HH-MetroMap-Cluster"
                    },
                    cssClasses: {
                        map: "metro-map",
                        interactive: "metro-map-interactive",
                        station: "metro-map-station",
                        stationPin: "metro-map-station__pin",
                        stationSelector: "metro-map-station__selector",
                        stationHovering: "metro-map-station_hovering",
                        stationSelected: "metro-map-station_selected"
                    }
                }, s)).$container,
                r = [];
            function l(e) {
                var t = e.split(-1 !== e.indexOf(".") ? "." : "_");
                return {
                    lineId: t[0],
                    stationId: t[1]
                }
            }
            function c(t) {
                var n = [],
                    i = e(t).parent(),
                    o = i.data("stations") || [];
                t.id.split("-")[1].split(",").forEach(function(e) {
                    var t = e.split(".").join("_"); - 1 === o.indexOf(t) && o.push(t), n.push(s.bindings.station + "-" + t)
                }), e(t).addClass(n.join(" ")), i.addClass(s.bindings.station + " " + s.cssClasses.station + " " + n.join(" ")).data("stations", o)
            }
            this.init = function() {
                var t, n;
                t = s.mapURL.replace(/^https?:/, window.location.protocol), n = this.initMap.bind(this), e.ajax({
                    url: t,
                    method: "get",
                    dataType: "text"
                }).then(n)
            }, this.onHoverStart = function(t) {
                e(t.target).parent().addClass(s.cssClasses.stationHovering)
            }, this.onHoverEnd = function(t) {
                e(t.target).parent().removeClass(s.cssClasses.stationHovering)
            }, this.initMap = function(e) {
                a.html(e), this.initMapObjects(), a.on("click", "." + s.cssClasses.interactive, this.onClick.bind(this)), a.on("mouseenter", "." + s.cssClasses.interactive, this.onHoverStart.bind(this)), a.on("mouseleave", "." + s.cssClasses.interactive, this.onHoverEnd.bind(this)), t.dispatch("HH-MetroMap-Inited", this)
            }, this.initMapObjects = function() {
                var t = this;
                a.find("#metro-map").addClass(s.cssClasses.map);
                var n = a.find('[id^="pin-"]'),
                    r = a.find('[id^="selector-"]'),
                    d = a.find('[id^="cluster-"]');
                n.each(function(t, n) {
                    e(n).addClass(s.cssClasses.interactive + " " + s.bindings.pin), c(n)
                }), r.each(function(t, n) {
                    e(n).addClass(s.cssClasses.interactive + " " + s.cssClasses.stationSelector), c(n)
                }), d.each(function() {
                    var t = this.id.split("-");
                    e(this).addClass(s.cssClasses.interactive + " " + s.bindings.cluster).data("cluster", t[1]).data("cluster-direction", t[2])
                }), a.find("." + s.cssClasses.interactive).removeAttr("fill").removeAttr("fill-rule"), a.find("." + s.bindings.station).each(function(n, o) {
                    (e(o).data("stations") || []).forEach(function(n) {
                        var a = e(o).find("." + s.bindings.pin + "." + s.bindings.station + "-" + n),
                            r = l(n);
                        (t.getLine(r.lineId) || t.createLine(r.lineId)).addStation(new i({
                            element: o,
                            pins: a.get(),
                            id: r.stationId,
                            lineId: r.lineId,
                            bindings: s.bindings,
                            cssClasses: s.cssClasses
                        }))
                    })
                }), this.clusters = [], s.$popup.find("." + s.bindings.cluster).each(function(n, i) {
                    var s = e(i);
                    t.clusters.push(new o(s, a, s.data("cluster"), s.data("cluster-direction"), t))
                })
            }, this.onClick = function(t) {
                var n = this,
                    i = t.currentTarget;
                if (!e(i).is("." + s.bindings.cluster)) {
                    var o = !0,
                        a = [];
                    e(i).parent().data("stations").forEach(function(e) {
                        var t = n.getStation(e);
                        a.push(t), t.isSelected() || (o = !1)
                    }), a.forEach(function(e) {
                        e[o ? "unselect" : "select"]()
                    })
                }
            }, this.unselectAll = function() {
                r.forEach(function(e) {
                    e.unselectAllStations()
                })
            }, this.getStation = function(e) {
                var t = l(e);
                return this.getLine(t.lineId).getStation(t.stationId)
            }, this.createLine = function(e) {
                var i = this,
                    o = new n(e);
                return r.push(o), t.add("HH-MetroMap-Line-Selected", function(e) {
                    t.dispatch("HH-MetroMap-Line-Selected", i, e)
                }, o), t.add("HH-MetroMap-Line-Unselected", function(e) {
                    t.dispatch("HH-MetroMap-Line-Unselected", i, e)
                }, o), o
            }, this.getLine = function(e) {
                for (var t = 0, n = r.length; t < n; t++)
                    if (r[t].id === e) return r[t];
                return null
            }, this.getSelected = function() {
                var e = [];
                return r.forEach(function(t) {
                    t.isSelected() ? e.push({
                        value: t.id
                    }) : t.stations.forEach(function(t) {
                        t.isSelected() && e.push({
                            value: t.lineId + s.delimiter + t.id
                        })
                    })
                }), e
            }, this.init()
        }
    }), define("HH/MetroMap", ["require", "jquery", "HHC/Components", "Utils/QA", "Utils/Callbacks", "Utils/ShortCuts", "HH/MetroMap/Map", "bloko/common/supports", "bloko/common/events"], function(e, t, n, i, o, s, a, r, l) {
        return n.build({
            defaults: {
                mapURL: window.globalVars.staticHost + "/i/Components/MetroMap/moscow.svg?v=3",
                minSchemeWidth: 1e3,
                minSchemeHeight: 1180,
                maxSchemeWidth: 2e3,
                maxSchemeHeight: 2360,
                centerX: .49,
                centerY: .55,
                cssClasses: {
                    hidden: "g-hidden",
                    invisible: "g-invisible",
                    noscroll: "no-scroll",
                    selectedLine: "metro-lines__list-item_selected",
                    pin: "metro-pin"
                }
            },
            create: function(e, n) {
                return l.extend(new function(e, n) {
                    this.$element = t(e), this.element = e, this.params = n, this.selectedItems = [], this.lineDataQa = {
                        selected: "line-item_selected"
                    }, this.bindings = {
                        switcher: ".HH-MetroMap-Switcher",
                        map: ".HH-MetroMap",
                        dragBox: ".HH-MetroMap-DragBox",
                        scaleBox: ".HH-MetroMap-ScaleBox",
                        zoomIn: ".HH-MetroMap-Zoom-In",
                        zoomOut: ".HH-MetroMap-Zoom-Out",
                        select: ".HH-MetroMap-Select",
                        cancel: ".HH-MetroMap-Cancel",
                        lineSwitcher: ".HH-MetroMap-LineSwitcher",
                        lineMarker: ".HH-MetroMap-LineMarker",
                        linePin: ".HH-MetroMap-LinePin",
                        lineName: ".HH-MetroMap-LineName"
                    }, this.init = function() {
                        var e = this;
                        r.mobile() || this.params.url && "string" == typeof this.params.url && (this.$switcher = this.$element.find(this.bindings.switcher).removeClass(this.params.cssClasses.hidden), this.lastMousePosition = {
                            x: 0,
                            y: 0
                        }, this.zoom = {
                            default: 1,
                            values: [0, .3, .6, 1],
                            getNext: function() {
                                return this.current += 1, this.values[this.current]
                            },
                            getPrev: function() {
                                return this.current -= 1, this.values[this.current]
                            },
                            isNextAvailable: function() {
                                return this.current < this.values.length - 1
                            },
                            isPrevAvailable: function() {
                                return this.current > 0
                            },
                            reset: function() {
                                return this.current = this.default, this.values[this.current]
                            }
                        }, this.zoom.reset(), this.opened = !1, this.delim = ".", o.add("HH-Metro-CityChanged", function(t) {
                            e.$switcher.toggleClass(e.params.cssClasses.hidden, 1 !== t.cityId)
                        }, this.element), s.down([{
                            key: s.ESC
                        }], this.close.bind(this), document, !1), this.$switcher.on("click", this.open.bind(this)))
                    }, this.open = function() {
                        this.$container ? (this.opened = !0, this.show()) : this.loadPopup()
                    }, this.loadPopup = function() {
                        return t.get(this.params.url, this.onLoadPopup.bind(this))
                    }, this.onLoadPopup = function(e) {
                        var n = this;
                        this.$container = t(e).appendTo(document.body), this.$popup = this.$container.find(this.bindings.map), this.$linesSwitchers = this.$popup.find(this.bindings.lineSwitcher), this.$zoomInButton = this.$popup.find(this.bindings.zoomIn), this.$zoomOutButton = this.$popup.find(this.bindings.zoomOut), this.$zoomInButton.add(this.$zoomOutButton).prop("disabled", !1), this.$popupContainer = this.$popup.find(this.bindings.scaleBox), this.metro = this.metro || new a({
                            $container: this.$popupContainer,
                            $popup: this.$popup,
                            mapURL: this.params.mapURL,
                            delimiter: this.delim
                        }), o.add("HH-MetroMap-Inited", function() {
                            n.reset(), n.open(), n.$popup.removeClass(n.params.cssClasses.invisible)
                        }, this.metro), this.$popup.on("click", this.bindings.select, this.dispatchAndClose.bind(this)).on("click", this.bindings.cancel, this.close.bind(this)).on("click", this.bindings.zoomIn, this.zoomIn.bind(this)).on("click", this.bindings.zoomOut, this.zoomOut.bind(this)).on("click", this.bindings.lineSwitcher, this.onLineSwitcherClick.bind(this)).on("mouseenter", this.bindings.lineSwitcher, this.onLineSwitcherHoverStart.bind(this)).on("mouseleave", this.bindings.lineSwitcher, this.onLineSwitcherHoverEnd.bind(this)), this.$popupContainer.on("HH-MetroMap-Cluster-Change-State", this.renderCluster.bind(this)), o.add("HH-MetroMap-Line-Selected", this.renderLine.bind(this), this.metro), o.add("HH-MetroMap-Line-Unselected", this.renderLine.bind(this), this.metro), this.$dragBox = this.$popup.find(this.bindings.dragBox).css({
                            position: "relative",
                            width: this.params.maxSchemeWidth
                        }).on("mousedown", this.dragStart.bind(this)), this.$scaleBox = this.$popup.find(this.bindings.scaleBox)
                    }, this.dragStart = function(e) {
                        this.ticking = !1, this.initBoxPosition = {
                            x: parseInt(this.$dragBox.css("left"), 10),
                            y: parseInt(this.$dragBox.css("top"), 10)
                        }, this.startMousePosition = {
                            x: e.clientX,
                            y: e.clientY
                        }, this.$dragBox.on("mousemove.metro", this.drag.bind(this)).on("mouseup.metro mouseleave.metro", this.dragEnd.bind(this))
                    }, this.dragEnd = function() {
                        this.$dragBox.off(".metro")
                    }, this.drag = function(e) {
                        this.lastMousePosition.x = e.clientX, this.lastMousePosition.y = e.clientY, this.ticking || window.requestAnimationFrame(this.updateMapPosition.bind(this)), this.ticking = !0
                    }, this.updateMapPosition = function() {
                        var e = this.lastMousePosition.x - this.startMousePosition.x,
                            t = this.lastMousePosition.y - this.startMousePosition.y;
                        this.$dragBox.css({
                            left: this.initBoxPosition.x + e,
                            top: this.initBoxPosition.y + t
                        }), this.ticking = !1
                    }, this.onLineSwitcherClick = function(e) {
                        var t = e.currentTarget.getAttribute("data-line-id"),
                            n = this.metro.getLine(t);
                        n[n.isSelected() ? "unselectAllStations" : "selectAllStations"]()
                    }, this.onLineSwitcherHoverStart = function(e) {
                        var t = e.currentTarget.getAttribute("data-line-id");
                        this.metro.getLine(t).startHover()
                    }, this.onLineSwitcherHoverEnd = function(e) {
                        var t = e.currentTarget.getAttribute("data-line-id");
                        this.metro.getLine(t).endHover()
                    }, this.renderCluster = function(e, t) {
                        var n = this.$container.find("[data-cluster=" + t.id + '][data-cluster-direction="' + t.direction + '"]'),
                            i = t.isSelected();
                        n.toggleClass(this.params.cssClasses.selectedLine, i), n.find(this.bindings.lineMarker).toggleClass(this.params.cssClasses.hidden, i).end().find(this.bindings.linePin).toggleClass(this.params.cssClasses.hidden, !i)
                    }, this.renderLine = function(e) {
                        var t = this.$container.find("[data-line-id=" + e.id + "]"),
                            n = e.isSelected();
                        t.toggleClass(this.params.cssClasses.selectedLine, n), i.toggleDataQa(t.find(this.bindings.lineName)[0], this.lineDataQa.selected, n), t.find(this.bindings.lineMarker).toggleClass(this.params.cssClasses.hidden, n).end().find(this.bindings.linePin).toggleClass(this.params.cssClasses.hidden, !n)
                    }, this.scale = function(e) {
                        var t = Math.min(Math.max(e, 0), 1),
                            n = this.params.minSchemeWidth + Math.round((this.params.maxSchemeWidth - this.params.minSchemeWidth) * t),
                            i = this.params.minSchemeHeight + Math.round((this.params.maxSchemeHeight - this.params.minSchemeHeight) * t),
                            o = this.$popup.height() * (1 - this.params.centerY),
                            s = this.$popup.width() * (1 - this.params.centerX),
                            a = (this.$scaleBox.outerWidth(!0) - this.$scaleBox.outerWidth()) / 2,
                            r = (this.params.maxSchemeWidth - n) / 2,
                            l = o - this.$dragBox.position().top,
                            c = s - (this.$dragBox.position().left + a),
                            d = o - l * (i / this.$scaleBox.height()),
                            h = s - c * (n / this.$scaleBox.width()) - r;
                        this.$scaleBox.css({
                            width: n,
                            height: i
                        }), this.$dragBox.css({
                            top: d,
                            left: h
                        })
                    }, this.zoomIn = function() {
                        this.scale(this.zoom.getNext()), this.$zoomInButton.prop("disabled", !this.zoom.isNextAvailable()), this.$zoomOutButton.prop("disabled", !1)
                    }, this.zoomOut = function() {
                        this.scale(this.zoom.getPrev()), this.$zoomOutButton.prop("disabled", !this.zoom.isPrevAvailable()), this.$zoomInButton.prop("disabled", !1)
                    }, this.reset = function() {
                        this.$scaleBox.css({
                            width: this.params.minSchemeWidth,
                            height: this.params.minSchemeHeight
                        }), this.scale(this.zoom.reset()), this.$zoomOutButton.prop("disabled", !this.zoom.isPrevAvailable()), this.$zoomInButton.prop("disabled", !this.zoom.isNextAvailable()), this.$dragBox.css({
                            left: this.$popup.outerWidth() / 2 - this.params.maxSchemeWidth * this.params.centerX,
                            top: this.$popup.outerHeight() / 2 - this.params.minSchemeHeight * this.params.centerY
                        })
                    }, this.show = function() {
                        this.syncTags(), t("body").addClass(this.params.cssClasses.noscroll), this.$container.removeClass(this.params.cssClasses.hidden)
                    }, this.syncTags = function(e) {
                        e && (this.selectedItems = e), this.opened && this.setStatus(this.selectedItems)
                    }, this.setStatus = function(e) {
                        this.metro.unselectAll(), this.$linesSwitchers.removeClass(this.params.cssClasses.selectedLine), e.forEach(function(e) {
                            var t = e.value,
                                n = -1 !== t.indexOf(this.delim),
                                i = this.metro[n ? "getStation" : "getLine"](t);
                            i && i[n ? "select" : "selectAllStations"]()
                        }, this)
                    }, this.close = function() {
                        this.opened && (this.opened = !1, t("body").removeClass(this.params.cssClasses.noscroll), this.$popup.addClass(this.params.cssClasses.invisible), this.reset(), this.$popup.removeClass(this.params.cssClasses.invisible), this.$container.addClass(this.params.cssClasses.hidden))
                    }, this.dispatchAndClose = function() {
                        this.close(), this._trigger("HH-Metro-Map-Selected", this.metro.getSelected())
                    }, this.init(e, n)
                }(e, n))
            }
        })
    }), define("HH/MetroSelection/MetroSelection", ["jquery", "HHC/Components", "bloko/blocks/tagList/tagList", "bloko/blocks/suggest/suggest", "HH/MetroSelection/MetroSelectionTagTemplate.mustache", "HH/MetroSelection/metroSuggest.mustache", "HH/MetroSelection/metroStationSuggest.mustache", "HH/MetroMap", "HH/Bloko/Notification"], function(e, t, n, i, o, s, a, r, l) {
        return t.build({
            create: function(c, d) {
                var h = c.querySelector(".HH-MetroSelection-Input"),
                    u = t.make(i, h, e.extend({
                        template: "station" === d.suggestTemplate ? a : s
                    }, d.suggestParams)),
                    p = void 0,
                    m = !1,
                    f = {
                        setRegion: function(e) {
                            u.changeRemote(d.suggestParams.remote.replace("{cityId}", e)), d.tagListParams && m && p.set([]), m = !0
                        }
                    };
                if (!d.tagListParams || !d.metroMapParams) return f;
                p = n.create(c.querySelector(".HH-MetroSelection-Tags"), e.extend(d.tagListParams, {
                    textTemplate: o
                }));
                var g = t.make(r, c, d.metroMapParams);
                function b() {
                    g.syncTags(p.getAll().map(function(e) {
                        return {
                            text: e.text,
                            value: e.id
                        }
                    }))
                }
                return p.initTags(), b(), e(h).on("selected.suggest autoselected.suggest", function(e, t) {
                    !t.line && p.getAll().forEach(function(e) {
                        -1 !== e.id.indexOf(t.id + ".") && p.remove(e.id)
                    }), p.getAll().some(function(e) {
                        return -1 === e.id.indexOf(".") && -1 !== t.id.indexOf(e.id + ".")
                    }) || p.add({
                        id: t.id,
                        text: t.text,
                        hiddenValue: t.id,
                        additional: {
                            metroColor: t.color
                        }
                    }), h.value = ""
                }), p.on("Bloko-TagList-Added", b), p.on("Bloko-TagList-Removed", b), g.on("HH-Metro-Map-Selected", function(n) {
                    e.ajax(d.rendererUrl, {
                        data: {
                            metros: n.map(function(e) {
                                return e.value
                            })
                        },
                        traditional: !0
                    }).then(function(e) {
                        var t = e.metroLine || [],
                            n = e.metroStation || [],
                            i = t.map(function(e) {
                                return {
                                    id: e.id,
                                    text: e.name,
                                    hiddenValue: e.id,
                                    additional: {
                                        metroColor: e.color
                                    }
                                }
                            }),
                            o = n.map(function(e) {
                                return {
                                    id: e.line.id + "." + e.id,
                                    text: e.name,
                                    hiddenValue: e.line.id + "." + e.id,
                                    additional: {
                                        metroColor: e.line.color
                                    }
                                }
                            });
                        p.set(i.concat(o))
                    }, function() {
                        t.make(l, c, {
                            content: d.ajaxError,
                            type: "error",
                            autoClose: !0
                        })
                    })
                }), f
            }
        })
    }), define("HH/Metro", ["jquery", "HHC/Components", "Utils/Callbacks", "HH/MetroSelection/MetroSelection"], function(e, t, n, i) {
        return t.build({
            create: function(o, s) {
                var a = e(o),
                    r = e(".HH-Metro-Input", a),
                    l = !1,
                    c = s.regions || [parseInt(s.region, 10)],
                    d = s.region ? parseInt(s.region, 10) : null,
                    h = t.make(i, o, s.metroSelectionParams);
                return {
                    toggleVisibility: function(e) {
                        var t = void 0;
                        e && 1 === e.length ? (t = parseInt(e[0], 10), l = -1 !== c.indexOf(t)) : l = !1, n.dispatch("HH-Metro-CityChanged", o, {
                            cityId: t,
                            withMetro: l
                        }, 1), l && d !== t && (d = t, h.setRegion(t)), a.toggleClass("g-hidden", !l), r.prop("disabled", !l)
                    }
                }
            }
        })
    }), define("Utils/Media", ["bloko/common/media"], function(e) {
        var t = -1 !== document.body.className.indexOf("xs-friendly");
        return {
            isXs: function() {
                return t && e.getBreakpoint() === e.breakpoint.XS
            }
        }
    }), define("HH/Navi/MenuItem", ["backbone", "jquery", "HHC/Components", "bloko/common/supports", "bloko/common/metrics", "bloko/common/ready", "Utils/Media", "bloko/common/requestAnimation"], function(e, t, n, i, o, s, a, r) {
        var l = {};
        return l.Model = e.Model.extend({
            defaults: {
                state: "notSelected"
            },
            initialize: function(e) {
                this.on("change:state", function() {
                    clearTimeout(this.timer);
                    var t = this.get("state");
                    "unSelecting" === t ? this.timer = window.setTimeout(this.set.bind(this, "state", "notSelected"), e.unSelectingTime) : "selecting" === t && (1 === this.get("level") ? this.timer = window.setTimeout(this.set.bind(this, "state", "selected"), e.selectingTime) : this.set("state", "selected"))
                })
            }
        }), l.View = e.View.extend({
            initialize: function(e) {
                var n = this;
                this.tapping = !1, this.firstEventType = "", this.focusing = !1, this.staticSelectingTime = e.staticSelectingTime;
                var i = a.isXs();
                this.model.on("change:state", this.onChangeState.bind(this)), this.model.on("change:level", this.onChangeLevel.bind(this)), this.$switcher = this.$(".HH-Navi-MenuItem-Switcher:first"), this.$dropdown = this.$(".HH-Navi-MenuItem-Dropdown:first"), this.hasDropdown = !!this.$dropdown.length, this.isDropdownStatic = this.$dropdown.hasClass("HH-Navi-MenuItem-StaticDropdown"), this.$columns = t(".HH-Navi-MenuItem-Column", this.$dropdown), this.hasDropdown && this.$switcher.attr("aria-haspopup", "true"), this.cssClasses = e.cssClasses, this.menuView = e.menuView, this.$ajaxPanel = this.$dropdown.find(".HH-Navi-MenuItem-AjaxPanel"), this.$ajaxPanel.length && s.getPromise(this.$ajaxPanel, "HH-AjaxContentLoader").then(this.loadAjaxPanel.bind(this)), this.model.set("level", this.$el.parents(".HH-Navi-MenuItem-Item").length + 1), this.setupHandlers(), t(window).on("resize.menuitem", r(function() {
                    i !== a.isXs() && (i = a.isXs(), n.teardownHandlers(), n.setupHandlers())
                })), this.$dropdown.on({
                    focusin: this.onFocusChange.bind(this, !0),
                    focusout: this.onFocusChange.bind(this, !1)
                }), this.$el.on("HH-Navi-MenuResizer-MovingItem-Move", function(e, t) {
                    var i = n.model.get("level");
                    i && ("up" === t.moveDirection ? n.model.set("level", i - 1) : n.model.set("level", i + 1), e.stopPropagation())
                })
            },
            setupHandlers: function() {
                a.isXs() ? this.$switcher.on("click.menuitem", this.onClick.bind(this)) : (this.$el.on("mouseenter.menuitem", this.onMouseEnter.bind(this)), this.$el.on("mouseleave.menuitem", this.onMouseLeave.bind(this)), this.$el.on("mouseup.menuitem", this.onMouseUp.bind(this)), t(document.body).on("click.menuitem", this.onClickOut.bind(this)), 1 === this.model.get("level") && this.$switcher.on("mousemove.menuitem", this.onMouseMove.bind(this)), i.touch() && (this.$switcher.on("touchstart.menuitem", this.onTouchStart.bind(this)), this.$switcher.on("touchmove.menuitem touchcancel.menuitem", this.endTapping.bind(this)), this.$switcher.on("touchend.menuitem", this.onTouchEnd.bind(this))))
            },
            teardownHandlers: function() {
                this.$el.off("mouseenter.menuitem mouseleave.menuitem mouseup.menuitem"), t(document.body).off("click.menuitem"), this.$switcher.off("mousemove.menuitem"), this.$switcher.off("click.menuitem"), i.touch() && this.$switcher.off("touchstart.menuitem touchmove.menuitem touchcancel.menuitem touchend.menuitem")
            },
            onClick: function() {
                var e = this.model.get("state");
                this.model.set("state", "selected" === e ? "notSelected" : "selected")
            },
            onChangeState: function() {
                var e = this.model.get("state");
                "selected" === e ? (this.$dropdown.removeClass("g-hidden"), this.checkDropdownPosition(), this.$el.addClass(this.cssClasses.hover), this.model.trigger("dropdownMetricsChange", o.getMetrics(this.$dropdown.get(0)))) : "notSelected" === e && (this.$el.removeClass(this.cssClasses.hover), this.$dropdown.addClass("g-hidden"), this.isDropdownStatic || this.$dropdown.removeClass(this.cssClasses.rightDropdown))
            },
            onChangeLevel: function(e, t) {
                var n = e.previous("level");
                n && this.$el.removeClass(this.cssClasses.level + n), this.$el.addClass(this.cssClasses.level + t)
            },
            select: function() {
                var e = this.model.get("state");
                "notSelected" === e ? this.model.set("state", "selecting") : "unSelecting" === e && this.model.set("state", "selected")
            },
            onMouseEnter: function() {
                "touch" !== this.firstEventType && (this.firstEventType = "mouse", this.menuView.checkIfCanSwitchItems(this.firstEventType) && this.select())
            },
            onMouseMove: function() {
                window.clearTimeout(this.timer), this.menuView.checkIfCanSwitchItems(this.firstEventType) ? this.select() : this.timer = window.setTimeout(this.select.bind(this), this.staticSelectingTime)
            },
            deselect: function() {
                var e = this.model.get("state");
                "selected" === e ? this.model.set("state", "unSelecting") : "selecting" === e && this.model.set("state", "notSelected")
            },
            onMouseLeave: function() {
                window.clearTimeout(this.timer), this.focusing || this.menuView.checkIfCanSwitchItems(this.firstEventType) && this.deselect()
            },
            onMouseUp: function() {
                this.firstEventType = ""
            },
            onTouchStart: function() {
                this.firstEventType || (this.firstEventType = "touch"), "selecting" === this.model.get("state") ? this.model.set("state", "selected") : "mouse" !== this.firstEventType && (this.tapping = !0)
            },
            endTapping: function() {
                this.tapping = !1
            },
            onTouchEnd: function(e) {
                var t = this.model.get("state");
                this.tapping && (this.model.set("state", "selected" === t ? "notSelected" : "selected"), this.tapping = !1), this.hasDropdown && (e.preventDefault(), this.$switcher.trigger("click"))
            },
            onClickOut: function(e) {
                0 === t(e.target).closest(this.el).length && this.model.set("state", "notSelected")
            },
            onFocusChange: function(e) {
                this.focusing = e
            },
            checkDropdownPosition: function() {
                if (this.hasDropdown && !this.isDropdownStatic) {
                    this.$el.addClass(this.cssClasses.calculating), this.$columns.removeClass(this.cssClasses.listNoColumns);
                    var e = this.$dropdown.offset().left;
                    e + this.$dropdown.outerWidth() > t(document).width() && this.$dropdown.addClass(this.cssClasses.rightDropdown), this.$columns.toggleClass(this.cssClasses.listNoColumns, e <= 0), this.$el.removeClass(this.cssClasses.calculating)
                }
            },
            loadAjaxPanel: function() {
                "selected" === this.model.get("state") ? this.$ajaxPanel.trigger("HH-AjaxContentLoader-Load") : this.model.once("change:state", this.loadAjaxPanel, this)
            }
        }), l
    }), define("HH/Navi/MenuResizer", ["jquery", "HHC/Components", "bloko/common/requestAnimation", "bloko/common/transitionEventName", "Utils/Media"], function(e, t, n, i, o) {
        return t.build({
            defaults: {
                minWidthRatio: .93,
                checkingIntervalTime: 30,
                cssClasses: {
                    shownItem: "navi-item_shown",
                    menuCalculation: "navi-row_calculating"
                }
            },
            create: function(t, s) {
                return new function(t, s) {
                    this.$element = e(t), this.element = t, this.params = s, this.bindings = {
                        menu: ".HH-Navi-MenuResizer-Menu",
                        staticItem: ".HH-Navi-MenuResizer-StaticItem",
                        searchItem: ".HH-Navi-MenuResizer-SearchItem",
                        transitionItem: ".HH-Navi-MenuResizer-TransitionItem",
                        movingItem: ".HH-Navi-MenuResizer-MovingItem",
                        containerItem: ".HH-Navi-MenuResizer-ContainerItem",
                        containerList: ".HH-Navi-MenuResizer-ContainerList"
                    }, this.init = function() {
                        var t = this;
                        this.$menu = e(this.bindings.menu, this.element), this.$staticItems = e(this.bindings.staticItem, this.$menu), this.$searchItem = e(this.bindings.searchItem, this.$menu), this.$transitionItem = e(this.bindings.transitionItem, this.$menu), this.movingItems = e(this.bindings.movingItem, this.$menu).toArray(), this.$containerItem = e(this.bindings.containerItem, this.$menu), this.$containerList = e(this.bindings.containerList, this.$menu), this.containerListItems = [], e(this.movingItems[this.movingItems.length - 1]).after(this.$containerItem), this.checkMenuCapacity(), this.$menu.removeClass(this.params.cssClasses.menuCalculation), this.$element.on({
                            "HH-Navi-StickyMenu-Block-Collapsed": n(this.handleMenuCollapsing.bind(this)),
                            "HH-Navi-StickyMenu-Block-Expanded": n(this.handleMenuExpanding.bind(this))
                        }), e(window).on("resize", this.handleWindowResizing.bind(this)), i && this.$transitionItem.on(i, n(function(e) {
                            e.target === t.$transitionItem.get(0) && (clearInterval(t.checkingInterval), t.checkMenuCapacity(!0))
                        })), this.requestCheckMenuCapacity = n(this.checkMenuCapacity.bind(this))
                    }, this.handleMenuCollapsing = function() {
                        clearInterval(this.checkingInterval), this.state = "collapsing", this.$searchItem.removeClass("g-hidden"), this.checkMenuCapacity(), i && this.$element.is(":visible") ? this.checkingInterval = setInterval(this.requestCheckMenuCapacity, this.params.checkingIntervalTime) : this.$searchItem.addClass(this.params.cssClasses.shownItem)
                    }, this.handleMenuExpanding = function() {
                        clearInterval(this.checkingInterval), this.state = "expanding", this.$searchItem.removeClass(this.params.cssClasses.shownItem), i && !this.$element.is(":hidden") || (this.checkMenuCapacity(), this.$searchItem.addClass("g-hidden"))
                    }, this.handleWindowResizing = function() {
                        var e = this.getContainerWidth();
                        e !== this.lastContainerWidth && (this.checkMenuCapacity(), this.lastContainerWidth = e, this.$element.trigger("HH-Navi-MenuResizer-Resize"))
                    }, this.checkMenuCapacity = function(e) {
                        e && "expanding" === this.state && this.$searchItem.addClass("g-hidden"), this.contentWidth = this.getContentWidth(), this.requiredContentWidth = this.getContainerWidth() * this.params.minWidthRatio, this.movingItems.length && this.contentWidth > this.requiredContentWidth ? this.pushItemsToContainerItem() : this.containerListItems.length && this.contentWidth < this.requiredContentWidth && this.pullItemsFromContainerItem(), e && "collapsing" === this.state && this.$searchItem.addClass(this.params.cssClasses.shownItem)
                    }, this.getContentWidth = function() {
                        var t = 0;
                        return this.$staticItems.each(function() {
                            t += e(this).outerWidth(!0)
                        }), this.movingItems.forEach(function(n) {
                            t += e(n).outerWidth(!0)
                        }), t += this.$containerItem.outerWidth(!0)
                    }, this.getContainerWidth = function() {
                        return o.isXs() ? 1 / 0 : this.$menu.width()
                    }, this.pushItemsToContainerItem = function() {
                        for (; this.movingItems.length && this.contentWidth > this.requiredContentWidth;) {
                            var t = this.movingItems.pop(),
                                n = e(t);
                            t.fullWidth = n.outerWidth(!0), this.$containerList.prepend(t), this.containerListItems.push(t), 1 === this.containerListItems.length && (this.$containerItem.removeClass("g-hidden"), this.contentWidth += this.$containerItem.outerWidth(!0)), this.contentWidth -= t.fullWidth, n.trigger("HH-Navi-MenuResizer-MovingItem-Move", {
                                moveDirection: "down"
                            })
                        }
                    }, this.pullItemsFromContainerItem = function() {
                        for (var t = this.containerListItems.length; t;) {
                            var n = this.containerListItems[t - 1],
                                i = 1 === t ? this.$containerItem.outerWidth(!0) : 0;
                            if (this.contentWidth + n.fullWidth - i > this.requiredContentWidth) return;
                            1 === t && this.$containerItem.addClass("g-hidden"), e(this.movingItems[this.movingItems.length - 1]).after(n), this.movingItems.push(n), this.containerListItems.pop(), t -= 1, this.contentWidth += n.fullWidth, e(n).trigger("HH-Navi-MenuResizer-MovingItem-Move", {
                                moveDirection: "up"
                            })
                        }
                    }, this.init(t, s)
                }(t, s)
            }
        })
    }), define("HH/Navi/StickyMenu", ["underscore", "jquery", "HHC/Debug", "HHC/Components", "bloko/common/supports", "bloko/common/requestAnimation", "Utils/Media", "HH/Sticky/Navi", "Utils/ScrollToElement", "HH/Navi/MenuResizer"], function(e, t, n, i, o, s, a, r, l, c) {
        return i.build({
            create: function(l, d) {
                return new function(l, d) {
                    i.make(c, l), this.$element = t(l), this.element = l, this.params = d, this.bindings = {
                        search: ".HH-Navi-StickyMenu-Search",
                        mainSearch: ".HH-Navi-StickyMenu-MainSearch",
                        topBlock: ".HH-Navi-StickyMenu-TopBlock"
                    }, this.init = function() {
                        var e = this;
                        if (this.initialTop = this.$element.offset().top, this.$topBlock = t(this.bindings.topBlock, this.$element), this.updateHeight(), o.mobile()) return r.set(this.$element, {
                            height: this.initialTop + this.height,
                            isStatic: !0
                        }), void t(window).on("resize", function() {
                            r.updateHeight(e.$element.height())
                        });
                        this.$element.css("top", this.initialTop), r.set(this.$element, {
                            height: this.height
                        }), t(this.bindings.search, this.element).on("click", function() {
                            e.changeState("fixedTransition"), e.$element.css("left", -Math.max(window.pageXOffset, 0)), e.$element.trigger("HH-Navi-StickyMenu-Block-Expanded"), e.$element.animate({
                                top: 0
                            }, {
                                duration: 200,
                                step: function(e) {
                                    r.updateHeight(this.height + e)
                                }.bind(e),
                                done: function() {
                                    this.changeState("fixed"), this.$element.trigger("HH-Navi-StickyMenu-Block-TransitionEnd")
                                }.bind(e)
                            })
                        }), t(window).on("resize scroll", s(this.redrawStickyElements.bind(this))), this.$element.on("HH-Navi-MenuResizer-Resize", s(function() {
                            e.updateHeight() && e.resetState()
                        })), this.states = {
                            expandedAbsolute: this.params.className.expandedAbsolute,
                            expandedAbsoluteTransition: this.params.className.expandedAbsoluteTransition,
                            collapsed: this.params.className.collapsed,
                            collapsedReset: this.params.className.collapsedReset,
                            fixed: this.params.className.fixed,
                            fixedTransition: this.params.className.fixedTransition,
                            mobile: this.params.className.mobile
                        }, this.resetState(), t(document).trigger("HH-Sticky-Update")
                    }, this.updateHeight = function() {
                        var e = this.$element.height();
                        return e !== this.height && (this.topBlockHeight = this.$topBlock.height(), this.blackBlockHeight = e - this.topBlockHeight, this.height = e, !0)
                    }, this.resetState = function() {
                        this.lastScroll = {
                            top: 0,
                            left: 0
                        }, this.changeState("expandedAbsolute"), this.redrawStickyElements()
                    }, this.changeState = function(t) {
                        void 0 === e.values && n.log("out info", "HH-57468 error", {
                            type: void 0 === e ? "undefined" : _typeof2(e),
                            underscore: Object.keys(e),
                            version: e.VERSION
                        }), this.$element.width(), this.state = t, this.$element.removeClass(e.values(this.states).join(" ")), this.$element.addClass(this.states[t])
                    }, this.redrawStickyElements = function() {
                        if (a.isXs()) "mobile" !== this.state && (this.changeState("mobile"), this.$element.css({
                            top: 0,
                            left: 0
                        }), r.makeStatic(this.$element.height()));
                        else {
                            "mobile" === this.state && (this.changeState("expandedAbsolute"), this.$element.css({
                                top: this.initialTop,
                                left: 0
                            }), r.makeSticky(this.$element.height()));
                            var e = Math.max(window.pageYOffset || document.documentElement.scrollTop, 0),
                                t = Math.max(window.pageXOffset || document.documentElement.scrollLeft, 0);
                            if ("fixedTransition" !== this.state && "collapsedReset" !== this.state) {
                                var n = parseInt(this.$element.css("top"), 10) + this.height - e;
                                if (this.lastScroll.top < e) {
                                    if ("expandedAbsolute" === this.state) n - this.blackBlockHeight < 0 ? (this.changeState("collapsedReset"), this.changeState("collapsed"), this.$element.trigger("HH-Navi-StickyMenu-Block-Collapsed"), this.$element.css({
                                        top: -this.topBlockHeight,
                                        left: -t
                                    }), r.updateHeight(this.blackBlockHeight)) : r.updateHeight(n);
                                    else if ("fixed" === this.state) {
                                        var i = this.$element.offset().top;
                                        this.changeState("expandedAbsolute"), this.$element.css({
                                            top: i - e + this.lastScroll.top,
                                            left: 0
                                        }), r.updateHeight(this.height), this.redrawStickyElements()
                                    }
                                } else "collapsed" === this.state && this.topBlockHeight + this.initialTop - e >= 0 ? (this.changeState("expandedAbsoluteTransition"), this.changeState("expandedAbsolute"), this.$element.trigger("HH-Navi-StickyMenu-Block-Expanded"), this.$element.css({
                                    top: this.initialTop,
                                    left: 0
                                }), r.updateHeight(Math.max(this.blackBlockHeight, this.height - e))) : "expandedAbsolute" === this.state ? n >= this.height && e > this.initialTop ? (this.changeState("fixed"), this.$element.css({
                                    top: 0,
                                    left: -t
                                }), r.updateHeight(this.height)) : r.updateHeight(n) : "fixed" === this.state && e < this.initialTop && (this.changeState("expandedAbsolute"), this.$element.css({
                                    top: this.initialTop,
                                    left: 0
                                }));
                                this.lastScroll.left === t || "fixed" !== this.state && "collapsed" !== this.state || this.$element.css("left", -t), this.lastScroll = {
                                    top: e,
                                    left: t
                                }
                            } else this.lastScroll = {
                                top: e,
                                left: t
                            }
                        }
                    }, this.init(l, d)
                }(l, d)
            }
        })
    }), define("HH/Navi/RegionDropdown", ["jquery", "HHC/Components", "bloko/blocks/dropdown/dropdown"], function(e, t, n) {
        return t.build({
            defaults: {
                dropdownParams: {
                    action: "manual",
                    hideonclick: !1,
                    arrow: !0
                }
            },
            create: function(i, o) {
                var s = e(i),
                    a = e(".HH-Navi-RegionDropdown-Container", s),
                    r = void 0;
                function l(t) {
                    e.ajax({
                        url: "/shards/region_clarified",
                        method: "POST",
                        data: {
                            host: t
                        }
                    }).then(function() {
                        r.hide(), r = null
                    })
                }
                a.is(":visible") && (s.on({
                    "HH-Navi-StickyMenu-Block-Collapsed": function() {
                        r && r.hide()
                    },
                    "HH-Navi-StickyMenu-Block-Expanded": function() {
                        r && r.show()
                    }
                }), e(".HH-Navi-RegionDropdown-Closer", s).on("click", l.bind(null, "NOT_SET")), e(".HH-Navi-RegionDropdown-Confirm", s).on("click", l.bind(null, o.host)), (r = t.make(n, a.get(0), o.dropdownParams)).show())
            }
        })
    }), define("HH/Navi/Menu", ["backbone", "jquery", "HHC/Components", "HH/Navi/MenuItem", "Utils/Media", "HH/Navi/StickyMenu", "HH/Navi/RegionDropdown"], function(e, t, n, i, o, s, a) {
        var r = t(window),
            l = {};
        return l.Model = e.Model.extend({
            defaults: {
                mouseCoords: null
            },
            initialize: function() {
                var t = this;
                this.menuItemsCollection = new e.Collection, this.menuItemsCollection.on("change:state", this.onChangeState.bind(this)), this.menuItemsCollection.on("dropdownMetricsChange", this.setActiveDropdownMetrics.bind(this)), this.on("change:mouseCoords", function(e, n) {
                    t.isMouseMovingToDropdown = t.checkIfMouseIsMovingToDropdown(n, e.previous("mouseCoords"))
                }), this.selectedModels = {}
            },
            onChangeState: function(e, t) {
                var n = e.get("level"),
                    i = this.selectedModels[n];
                "notSelected" === t ? this.selectedModels[n] = null : "selecting" === t ? i && i !== e && e.set("state", "selected") : "selected" === t && (!o.isXs() && i && i !== e && i.set("state", "notSelected"), this.selectedModels[n] = e)
            },
            sign: function(e, t, n) {
                return (t.x - n.x) * (e.y - n.y) >= (e.x - n.x) * (t.y - n.y)
            },
            isPointInsideTriangle: function(e, t, n, i) {
                return this.sign(e, t, n) && this.sign(e, n, i) && this.sign(e, i, t)
            },
            checkIfMouseIsMovingToDropdown: function(e, t) {
                return !!e && !!t && !!this.activeDropdownMetrics && this.isPointInsideTriangle({
                    x: e.x,
                    y: e.y
                }, {
                    x: t.x,
                    y: t.y - 1
                }, {
                    x: this.activeDropdownMetrics.left,
                    y: this.activeDropdownMetrics.top
                }, {
                    x: this.activeDropdownMetrics.right,
                    y: this.activeDropdownMetrics.top
                })
            },
            setActiveDropdownMetrics: function(e) {
                this.activeDropdownMetrics = e
            },
            setMouseCoords: function(e) {
                this.set("mouseCoords", {
                    x: e.clientX + r.scrollLeft(),
                    y: e.clientY + r.scrollTop()
                })
            }
        }), l.View = e.View.extend({
            initialize: function() {
                var e = this;
                this.$el.on("mousemove", this.model.setMouseCoords.bind(this.model)), t(".HH-Navi-MenuItem-Leaf", this.$el).on("click", this.deselectAll.bind(this)), t(".HH-Navi-MenuItem-FakeItem", this.$el).on("mousemove", function() {
                    o.isXs() || e.model.isMouseMovingToDropdown || e.deselectAll()
                })
            },
            deselectAll: function() {
                for (var e in this.model.selectedModels) this.model.selectedModels[e] && this.model.selectedModels[e].set("state", "notSelected")
            },
            checkIfCanSwitchItems: function(e) {
                return o.isXs() || "mouse" !== e || !this.model.isMouseMovingToDropdown
            }
        }), n.build({
            defaults: {
                selectingTime: 100,
                unSelectingTime: 300,
                staticSelectingTime: 100,
                cssClasses: {
                    hover: "navi-item_hover",
                    calculating: "navi-item_calculating",
                    level: "navi-item_level-",
                    rightDropdown: "navi-item__dropdown_right",
                    listNoColumns: "navi-dropdown__list_no-columns"
                }
            },
            create: function(e, o) {
                var r = t(e),
                    c = new l.Model,
                    d = new l.View({
                        model: c,
                        el: t(".HH-Navi-Menu-Menu", r).get(0)
                    });
                t(".HH-Navi-Menu-Item", r).each(function(e, t) {
                    var n = new i.Model({
                        selectingTime: o.selectingTime,
                        unSelectingTime: o.unSelectingTime
                    });
                    c.menuItemsCollection.add(n), new i.View({
                        cssClasses: o.cssClasses,
                        model: n,
                        el: t,
                        menuView: d,
                        staticSelectingTime: o.staticSelectingTime
                    })
                }), o.regionDropdownParams && n.make(a, e, o.regionDropdownParams), o.stickyMenuParams && n.make(s, e, o.stickyMenuParams)
            }
        })
    }), define("HH/Navi/SearchSelector", ["jquery", "HHC/Analytics", "HHC/Components"], function(e, t, n) {
        return n.build({
            create: function(n, i) {
                return new function(n, i) {
                    this.$element = e(n), this.bindings = {
                        textInput: ".HH-Navi-SearchSelector-Tab-TextInput",
                        selectWrapper: ".HH-Navi-SearchSelector-SelectWrapper",
                        select: ".HH-Navi-SearchSelector-Select",
                        tab: ".HH-Navi-SearchSelector-Tab",
                        link: ".HH-Navi-SearchSelector-Link",
                        classForm: "HH-Navi-SearchSelector-Form",
                        dataTabId: "hh-tab-id"
                    }, this.init = function() {
                        var n = this,
                            i = {
                                searchVacancy: "vacancy",
                                resumeSearch: "resume"
                            };
                        this.$tabs = e(this.bindings.tab, this.$element), this.$links = e(this.bindings.link, this.$element), this.$tabs.each(function(t, i) {
                            var o = e(i);
                            o.hasClass(n.bindings.classForm) && o.prop("isForm", !0)
                        }), this.$select = e(this.bindings.select, this.$element), this.$textInputs = e(this.bindings.textInput, this.$element), this.$selectedInput = e(this.bindings.textInput + ":visible", this.$element), this.$select.on("change", function() {
                            n.selectTab(), n.$selectedInput.focus()
                        }), this.selectTab(), this.$element.on("HH-Navi-StickyMenu-Block-Collapsed", function() {
                            n.$selectedInput.blur()
                        }), this.$element.on("HH-Navi-StickyMenu-Block-TransitionEnd", function() {
                            n.$selectedInput.focus()
                        }), this.$links.each(function(o, s) {
                            e(s).on("click", function() {
                                var e = window.globalVars.userType,
                                    o = n.$select.val();
                                if ("back_office_user" !== e && i[o]) {
                                    var s = "custom_search_click_" + i[o];
                                    t.googleEventToStorage(e, "custom_search", s)
                                }
                            })
                        })
                    }, this.selectTab = function() {
                        var t = this,
                            n = this.$select.val();
                        this.$textInputs.val(this.$selectedInput.val()), this.$tabs.each(function(i, o) {
                            var s = e(o),
                                a = s.data(t.bindings.dataTabId);
                            if (s.toggleClass("g-hidden", n !== a), s.prop("isForm") && n === a) {
                                var r = e(t.bindings.textInput, s),
                                    l = e(t.bindings.selectWrapper, s);
                                r.length > 0 && (t.$selectedInput = r), l.append(t.$select)
                            }
                        })
                    }, this.init(n, i)
                }(n, i)
            }
        })
    }), define("HH/Negotiations/Responses", ["jquery", "HHC/Components"], function(e, t) {
        return t.build({
            create: function(t, n) {
                var i = e(t),
                    o = e(".HH-Negotiations-Responses-BulkDelete", i),
                    s = e(".HH-Negotiations-Responses-Checkbox", i),
                    a = e(".HH-Negotiations-Responses-TopicIds", i);
                function r(t) {
                    o.toggleClass("g-hidden", 0 === t.length), t.length > 0 && a.val(t.toArray().map(function(t) {
                        return e(t).closest(".HH-Negotiations-Responses-Response").attr("data-topic-id")
                    }).join())
                }
                e(".HH-Negotiations-Responses-Response", i).on("click", function(t) {
                    var i = e(t.currentTarget),
                        o = i.attr("data-topic-id");
                    o && (window.open("/applicant/negotiations/item?topicId=" + o, "_blank"), i.removeClass(n.cssClasses.unread), e(".HH-Responses-NotificationIcon", i).remove())
                }), s.on("change", function(t) {
                    var o = e(t.currentTarget);
                    o.closest(".HH-Negotiations-Responses-Response").toggleClass(n.cssClasses.selected, o.prop("checked")), r(e(".HH-Negotiations-Responses-Checkbox:checked", i))
                }), e(".HH-Negotiations-Responses-BulkCheckbox", i).on("change", function(t) {
                    s.prop("checked", e(t.currentTarget).prop("checked")), r(e(t.currentTarget).prop("checked") ? s : [])
                }), e(".HH-Negotiations-Responses-StateFilter", i).on("change", function() {
                    e(".HH-Negotiations-Responses-StateForm", i).submit()
                }), e(".HH-Negotiations-Responses-Control", i).on("click", function(e) {
                    e.stopPropagation()
                })
            }
        })
    }), define("HH/Negotiations/EmployerReadStatisticsModule", [], function() {
        return {
            getPath: function(e) {
                var t, n, i = e > 50 ? 1 : 0,
                    o = (t = e, n = 2 * Math.PI * (t / 100), [Math.cos(n), Math.sin(n)].map(function(e) {
                        return Math.round(100 * e) / 100
                    })),
                    s = _slicedToArray(o, 2);
                return "M 1 0 A 1 1 0 " + i + " 1 " + s[0] + " " + (s[1] || -.001) + " L 0 0"
            }
        }
    }), define("HH/Negotiations/EmployerReadStatistics", ["jquery", "HHC/Components", "HH/Negotiations/EmployerReadStatisticsModule"], function(e, t, n) {
        return t.build({
            create: function(t) {
                var i = e(t),
                    o = e(".HH-Negotiations-Stats-Path", i),
                    s = e(".HH-Negotiations-Stats-Value", i),
                    a = parseInt(s.text(), 10);
                o.attr("d", n.getPath(a))
            }
        })
    }), define("HH/Pager", ["jquery", "HHC/Components"], function(e, t) {
        return t.build({
            create: function(t, n) {
                return new function(t, n) {
                    this.$element = e(t), this.params = n;
                    var i = void 0,
                        o = ".HH-Pager-Control";
                    this.init = function(t) {
                        var n = this;
                        this.element = t, this.params.isAjax && (this.$controls = e(o, this.$element), this.$controls.on("click", function(t) {
                            var i = parseInt(e(t.target).data("page"), 10);
                            t.preventDefault(), n.$element.trigger("HH-Pager-Changed", i)
                        }));
                        var s = -1 !== navigator.platform.indexOf("Mac");
                        i = {
                            code: s ? "altKey" : "ctrlKey",
                            name: s ? "Alt" : "Ctrl"
                        }, e(document).on("keydown", this.shortcut.bind(this))
                    }, this.shortcut = function(t) {
                        e(t.target).is("input, textarea") || this.processShortcut(t)
                    }, this.processShortcut = function(t) {
                        var n = void 0,
                            o = void 0,
                            s = e(".HH-Pager-Controls-Prev", this.element),
                            a = e(".HH-Pager-Controls-Next", this.element);
                        if (t[i.code]) switch (t.keyCode) {
                            case 37:
                                n = s.prop("href"), o = parseInt(s.data("page"), 10);
                                break;
                            case 39:
                                n = a.prop("href"), o = parseInt(a.data("page"), 10)
                        }!this.params.isAjax && n ? document.location = n : this.params.isAjax && o >= 0 && this.$element.trigger("HH-Pager-Changed", o)
                    }, this.init(t, n)
                }(t, n)
            }
        })
    }), define("HH/QueryLength", ["jquery", "HHC/Components", "bloko/blocks/tooltip/tooltip", "bloko/common/valuechange"], function(e, t, n) {
        return t.build({
            defaults: {
                messagePosition: "top"
            },
            create: function(t, i) {
                return new function(t, i) {
                    this.$element = e(t), this.params = i, this.bindings = {
                        observedElement: ".HH-QueryLength-Observed"
                    }, this.init = function() {
                        this.lastInputText = [], this.sum = 0, this.observe()
                    }, this.observe = function() {
                        var t = this;
                        this.$element.on("valuechange", this.bindings.observedElement, function(i) {
                            for (var o = n.getInstance(i.currentTarget, {
                                    message: t.params.message,
                                    position: t.params.messagePosition
                                }), s = e(t.bindings.observedElement, t.$element), a = e(i.currentTarget), r = s.index(a); t.lastInputText.length <= r;) t.lastInputText.push("");
                            var l = a.val(),
                                c = l.length - t.lastInputText[r].length;
                            t.sum + c >= t.params.maxLength ? (o.show(), window.setTimeout(function() {
                                o.hide()
                            }, 2e3), a.val(t.lastInputText[r])) : (t.lastInputText[r] = l, t.sum += c)
                        })
                    }, this.init(t, i)
                }(t, i)
            }
        })
    }), define("HH/RelatedVacancies", ["jquery", "underscore", "HHC/Components", "bloko/common/metrics"], function(e, t, n, i) {
        var o = 3,
            s = 200,
            a = 500;
        return n.build({
            create: function(r, l) {
                var c = e(r),
                    d = e(".HH-RelatedVacancies-VacanciesWrapper", c),
                    h = e(".HH-RelatedVacancies-LoadMore", c),
                    u = e(".HH-RelatedVacancies-LoadingIndicator", c),
                    p = l.totalPages,
                    m = l.itemsOnPage,
                    f = 1,
                    g = !1;
                function b() {
                    g = !0, h.addClass("g-hidden"), u.removeClass("g-hidden"), e.ajax({
                        url: "/vacancy/related_vacancies",
                        method: "GET",
                        data: {
                            id: l.currentVacancyId,
                            page: f,
                            count: m
                        }
                    }).then(function(t) {
                        var i = e(t);
                        d.append(i), i.each(function(e, t) {
                            return n.init(t)
                        }), f += 1
                    }).always(function() {
                        u.addClass("g-hidden"), f === p ? h.addClass("g-hidden") : f >= o && h.removeClass("g-hidden"), g = !1
                    })
                }
                e(window).on("scroll", t.throttle(function() {
                    var e, t;
                    g || (e = i.getViewportMetrics().bottom, t = i.getRelativeMetrics(d).bottom, e + a >= t && f < p && f < o && b())
                }, s)), h.on("click", b)
            }
        })
    }), define("HH/RespondCheck", ["jquery", "HHC/Components", "bloko/blocks/popup/popup"], function(e, t, n) {
        return t.build({
            create: function(i) {
                return new function(i) {
                    var o = e(".HH-RespondCheck-Popup");
                    if (o.length) {
                        var s = e(i),
                            a = t.make(n, o.get(0));
                        s.on("responseCheckTrigger", function() {
                            a.show(), e(".HH-RespondCheck-Approve").on("click", function() {
                                a.hide(), s.trigger("responseCheckBypass")
                            })
                        })
                    }
                }(i)
            }
        })
    }), define("HH/Resume/ExperienceDescriptionLoader", ["jquery", "HHC/Components"], function(e, t) {
        return t.build({
            create: function(t, n) {
                return new function(t, n) {
                    this.init = function(t, n) {
                        this.$element = e(t), this.params = n, this.states = {
                            INITIAL: 0,
                            ERROR: 1,
                            LOADING: 2,
                            LOADED: 3,
                            needLoad: function(e) {
                                return e === this.INITIAL || e === this.ERROR
                            }
                        }, this.resumeHash = this.$element.attr("data-hh-resume-hash"), this.lastExperienceId = this.$element.data("hh-last-experience-id"), this.loadState = this.states.INITIAL, this.$spinner = e(".HH-ExperienceDescriptionLoader-Spinner", this.$element), this.$error = e(".HH-ExperienceDescriptionLoader-Error", this.$element), this.$retry = e(".HH-ExperienceDescriptionLoader-Retry", this.$element), this.$output = e(".HH-ExperienceDescriptionLoader-Output", this.$element), this.$retry.on("click", this.load.bind(this)), this.$element.on("Bloko-Toggle-Switch", this.load.bind(this))
                    }, this.load = function() {
                        var t = this;
                        this.states.needLoad(this.loadState) && (this.loadState = this.states.LOADING, this.$error.toggleClass("g-hidden", !0), this.$spinner.toggleClass("g-hidden", !1), e.ajax({
                            url: "/shards/resume_experience",
                            method: "get",
                            dataType: "json",
                            data: {
                                hash: this.resumeHash
                            }
                        }).then(function(e) {
                            t.loadState = t.states.LOADED;
                            var n = null;
                            e.experience.some(function(e) {
                                return parseInt(e.id, 10) === t.lastExperienceId && (n = e), n
                            }), null !== n ? (t.$output.text(n.description), t.$error.toggleClass("g-hidden", !0), t.$output.toggleClass("g-hidden", !1)) : (t.$error.text(t.params.trl.resumeChanged), t.$error.toggleClass("g-hidden", !1)), t.$spinner.toggleClass("g-hidden", !0), t.$element.trigger("experienceLoaded")
                        }, function(e) {
                            403 === e.status ? (t.loadState = t.states.LOADED, t.$error.text(t.params.trl.resumeChanged)) : t.loadState = t.states.ERROR, t.$error.toggleClass("g-hidden", !1), t.$spinner.toggleClass("g-hidden", !0)
                        }))
                    }, this.init(t, n)
                }(t, n)
            }
        })
    }), define("HH/Resume/ImageLoader", ["jquery", "HHC/Components", "bloko/blocks/popup/popup"], function(e, t, n) {
        return t.build({
            create: function(i, o) {
                return new function(i, o) {
                    var s = this;
                    this.$element = e(i), this.$popup = e(".HH-Resume-ImagePopup", this.$element), this.$imageContainer = e(".HH-Resume-ImageLoader-ImageContainer", this.$element), this.popup = t.make(n, this.$popup.get(0), {
                        size: "by-content"
                    }), e(".HH-Resume-ImageLoader-Link", this.$element).on("click", function(t) {
                        s.$target = e(t.currentTarget), s.$image = e("<img>"), s.$image.attr("src", s.$target.data("hh-resume-image-loader-src")), s.$imageContainer.html(s.$image[0]), s.popup.setTitle(s.$target.data("hh-resume-image-loader-title")), s.$image.on("load", s.popup.show.bind(s.popup)), s.$image.on("error", function() {
                            s.$popup.html('<span class="error-text">' + o.error + "</span>"), s.popup.show()
                        })
                    })
                }(i, o)
            }
        })
    }), define("HH/Resume/Delete", ["jquery", "HHC/Components", "bloko/blocks/modal/modal"], function(e, t, n) {
        return t.build({
            create: function(i) {
                var o = e(i),
                    s = e(".HH-Resume-Delete-Button", o),
                    a = e(".HH-Resume-Delete-Modal", o),
                    r = void 0;
                e(".HH-Resume-Delete-Cancel", a).on("click", function() {
                    r && r.hide()
                }), s.on("click", function() {
                    r || (r = t.make(n, a.get(0))), r.show()
                })
            }
        })
    }), define("HH/Tooltip/Hover", ["jquery", "HHC/Components", "bloko/blocks/tooltip/tooltip"], function(e, t, n) {
        return t.build({
            create: function(t, i) {
                return new function(t, i) {
                    this.$element = e(t), this.params = i, this.init = function() {
                        this.tooltip = n.getInstance(this.$element, this.params), this.$element.on({
                            touchstart: this._handleTouchStart,
                            touchcancel: this._handleTouchCancel,
                            touchmove: this._handleTouchCancel,
                            touchend: this._handleTouchEnd,
                            mouseenter: this._handleMouseEnter,
                            mouseleave: this._handleMouseLeave,
                            mouseup: this._handleMouseUp
                        })
                    }, this._handleTouchStart = function() {
                        this.hoverHandled || (this.hoverHandled = !0, this.tapping = !0)
                    }.bind(this), this._handleTouchCancel = function() {
                        this.tapping = !1, this.firstEventType = !1
                    }.bind(this), this._handleTouchEnd = function() {
                        this.tapping && (this.tooltip.show(), this.tapping = !1)
                    }.bind(this), this._handleMouseEnter = function() {
                        this.hoverHandled || (this.hoverHandled = !0, this.tooltip.show())
                    }.bind(this), this._handleMouseLeave = function() {
                        this.tooltip.hide(), this.hoverHandled = !1
                    }.bind(this), this._handleMouseUp = function() {
                        this.hoverHandled = !1
                    }.bind(this), this.init(t, i)
                }(t, i)
            }
        })
    }), define("HH/ResumeButton", ["jquery", "HHC/Components", "bloko/common/supports", "HH/Tooltip/Hover"], function(e, t, n, i) {
        return t.build({
            create: function(e) {
                n.touch() || t.make(i, e, {
                    host: "body",
                    layer: "overlay"
                })
            }
        })
    }), define("HH/SubmitOnSelect", ["jquery", "HHC/Components"], function(e, t) {
        return t.build({
            create: function(t) {
                var n = e(t);
                e(".HH-SubmitOnSelect-Value", n).on("change", function() {
                    n.submit()
                })
            }
        })
    }), define("Utils/RaphaelLineChart", ["raphael", "jquery", "bloko/blocks/tooltip/tooltip", "bloko/common/media", "bloko/common/metrics"], function(e, t, n, i, o) {
        var s = {
            linesColor: "#e6e6e6",
            axisColor: "#333",
            yLabelsStep: 5,
            labels: {
                attr: {
                    fill: "#666",
                    stroke: "none",
                    "stroke-width": 1,
                    "text-anchor": "start",
                    "font-size": "10px"
                },
                textHeight: 25
            },
            tooltip: {
                label: {
                    attr: {
                        fill: "#000",
                        stroke: "none",
                        "text-anchor": "start",
                        "font-size": "14px"
                    }
                },
                attr: {
                    fill: "#fff",
                    stroke: "#f3f3f3",
                    "stroke-width": 1
                }
            },
            graph: {
                attr: {
                    stroke: "#000",
                    "stroke-width": 3
                },
                maxY: 10
            },
            circle: {
                attr: {
                    fill: "#000",
                    stroke: "#fff",
                    "stroke-width": 2
                },
                hover: {
                    fill: "#e90001"
                },
                radius: 5
            },
            paper: {
                margin: 25,
                marginTop: 25,
                marginBottom: 15,
                height: 250
            }
        };
        return function(a, r, l) {
            var c = new function() {
                this.destroy = function() {
                    this.paper && this.paper.remove()
                }, this.init = function(n, i, a) {
                    var r = this;
                    this.$element = t(n), this.data = a, this.selectedItemIndex = null, this.circles = [], this.params = t.extend(!0, {}, s, i, {
                        paper: {
                            width: this.$element.width()
                        }
                    });
                    var l = 0,
                        c = this.params.labels.textHeight;
                    a.forEach(function(e) {
                        e.yValue && (l = Math.max(e.yValue.length * c, l))
                    });
                    var d = Math.max.apply(Math, _toConsumableArray(a.map(function(e) {
                            return e.value || 0
                        }))) || this.params.graph.maxY,
                        h = this.params.paper.marginBottom + l;
                    this.paper = new e(n, this.params.paper.width, this.params.paper.height + h);
                    var u = Math.ceil(d / 2),
                        p = (this.params.paper.width - 2 * this.params.paper.margin) / (a.length - 1),
                        m = (this.params.paper.height - this.params.paper.marginTop) / d,
                        f = this.params.paper.width - this.params.paper.margin,
                        g = this.params.paper.height;
                    this.paper.path("M" + [this.params.paper.margin, g] + "H" + f).attr({
                        stroke: this.params.axisColor,
                        "stroke-width": 1.5
                    }).transform("t0.5,0.5"), this.paper.path("M" + [this.params.paper.margin, g - m * u] + "H" + f).attr({
                        stroke: this.params.linesColor
                    }).transform("t0.5,0.5"), this.paper.path("M" + [this.params.paper.margin, this.params.paper.marginTop] + "H" + f).attr({
                        stroke: this.params.linesColor
                    }).transform("t0.5,0.5"), this.addYAxisLabel(g, 0), this.addYAxisLabel(g - m * u, u), this.addYAxisLabel(this.params.paper.marginTop, d), this.verticalLine = this.paper.path("M" + [0, 0] + "V" + g).attr({
                        stroke: "#000",
                        "stroke-width": 2
                    }).hide(), this.points = a.map(function(e, t) {
                        var n = null === e.value ? null : g - m * e.value;
                        return [r.params.paper.margin + p * t, n]
                    });
                    var b = [];
                    this.points.forEach(function(e, t) {
                        null !== e[1] && b.push((0 === t ? "M" : "L") + e)
                    }), this.paper.path(b).attr(this.params.graph.attr);
                    var v = Math.min(a.length, this.params.yLabelsStep);
                    a.forEach(function(e, n) {
                        var i = r.points[n];
                        if ((n % v == 0 || n === r.points.length - 1) && e.yValue) {
                            var o = null;
                            e.yValue.forEach(function(e, n) {
                                var s = t.extend({}, r.params.labels.attr, e.attrs || {});
                                0 === n && (s["text-anchor"] = "middle");
                                var a = r.paper.text(i[0], g + c * (n + 1), e.text).attr(s);
                                0 !== n && a.transform("t-" + o / 2 + ",0"), o = a.getBBox().width
                            })
                        }
                        null !== e.value && r.circles.push(r.paper.circle(i[0], i[1], r.params.circle.radius).attr(r.params.circle.attr))
                    });
                    var k = this.paper.rect(0, 0, this.paper.width, this.paper.height).attr({
                        opacity: 0,
                        fill: "#555"
                    });
                    t(k.node).on("mousemove", function(e) {
                        var t = window.pageXOffset + e.clientX - o.getMetrics(e.target).left,
                            n = Math.max(0, Math.floor((t - r.params.paper.margin + p / 2) / p));
                        r.selectedItemIndex !== n && (null !== r.selectedItemIndex && r.blur(), r.circles[n] && (r.showCircle(n), r.showTooltip(n), r.$element.trigger("HH-RaphaelLineChart-ItemHover", n)))
                    }), t(k.node).on("mouseleave", function(e) {
                        var t = window.pageXOffset + e.clientX - o.getMetrics(e.target).left,
                            n = e.clientY - o.getMetrics(e.target).top;
                        (t < 0 || t > r.paper.width || n < 0 || n > r.paper.height) && r.blur()
                    })
                }, this.blur = function() {
                    var e = this.circles[this.selectedItemIndex];
                    e && e.tooltip && e.tooltip.hide(), this.hideCircle(), this.$element.trigger("HH-RaphaelLineChart-ItemBlur")
                }, this.showTooltip = function(e) {
                    var t = this.circles[e];
                    t.tooltip || (t.tooltip = n.getInstance(t[0], {
                        message: this.data[e].tooltipText,
                        host: "body",
                        showImmediate: !0
                    })), t.tooltip.show()
                }, this.hideCircle = function() {
                    var e = this.circles[this.selectedItemIndex];
                    e && (e.attr(this.params.circle.attr), this.verticalLine.hide(), this.selectedItemIndex = null)
                }, this.showCircle = function(e) {
                    this.circles[e].attr(this.params.circle.hover), this.verticalLine.transform("T" + this.points[e][0] + ", 0").show(), this.selectedItemIndex = e
                }, this.addYAxisLabel = function(e, t) {
                    this.paper.text(0, e, t).attr(this.params.labels.attr)
                }
            };
            if (!e) return c;
            c.init(a, r, l);
            var d = i.getBreakpoint();
            return t(window).resize(function() {
                var e = i.getBreakpoint();
                e !== d && (d = e, c.destroy(), c.init(a, r, l))
            }), c
        }
    }), define("HH/ResumeViewHistory", ["HHC/Components", "Utils/RaphaelLineChart", "Utils/Strings"], function(e, t, n) {
        return e.build({
            create: function(e, i) {
                var o = i.views.map(function(e) {
                    var t = n.numConversion(e.total, i.trl.views),
                        o = i.trl.months[e.month - 1];
                    return {
                        value: e.total,
                        yValue: [{
                            text: e.day + " " + o.substr(0, 3)
                        }],
                        tooltipText: e.day + " " + o + ", " + t
                    }
                });
                new t(e, {}, o)
            }
        })
    }), define("HH/Search/AjaxForm", ["jquery", "HHC/Components"], function(e, t) {
        return t.build({
            create: function(t, n) {
                return new function(t, n) {
                    this.$element = e(t), this.params = n, this.bindings = {
                        form: ".HH-Search-AjaxForm-Form",
                        submit: ".HH-Search-AjaxForm-Submit"
                    }, this.init = function() {
                        var t = this,
                            n = !!this.params.noReload,
                            i = this.$element.find(this.bindings.form);
                        this.$element.find(this.bindings.submit).on("click", function() {
                            e.ajax({
                                url: "/resumesearch/settings",
                                type: "POST",
                                data: i.find(":input").serialize(),
                                traditional: !0
                            }).then(function() {
                                n ? t.$element.trigger("HH-Search-AjaxForm-Form-Submitted") : window.location.reload()
                            })
                        })
                    }, this.init(t, n)
                }(t, n)
            }
        })
    }), define("HH/Search/Money", [], function() {
        var e = function(e, t) {
                this.currency = e, this.value = t
            },
            t = function(e) {
                this.rates = e || {}
            };
        return t.prototype = new function() {
            this.convert = function(t, n) {
                var i = Math.round(t.value * this.rates[n] / this.rates[t.currency]) || 0;
                return new e(n, i)
            }, this.setRate = function(e, t) {
                this.rates[e] = t
            }
        }, {
            Money: e,
            MoneyRates: t
        }
    }), define("HH/Search/MoneyInput", ["jquery", "HHC/Components", "Utils/Callbacks", "Utils/Strings", "Utils/Utils", "bloko/blocks/tooltip/tooltip", "HH/Search/Money"], function(e, t, n, i, o, s, a) {
        var r = {};
        return r.MoneySelect = function(e, t) {
            this.element = e, this.names = t.name, this.changeName = t.changeName || "", this.init()
        }, r.MoneySelect.prototype = new function() {
            this.init = function() {
                e(this.element).on("change", this.changeValue.bind(this)), n.add("HH-Search-MoneyInput-ChangeCurrency" + this.changeName, this.change.bind(this), window)
            }, this.change = function(e) {
                for (var t = 0, n = this.element.options.length; t < n; t++)
                    if (this.element.options[t].value === e.abbr) {
                        this.element.selectedIndex = t;
                        break
                    }
                this.changeValue()
            }, this.changeValue = function() {
                n.dispatch("HH-Resume-MoneyInput-ChangeCurrency", window, {
                    rate: this.getCurrency().rate,
                    name: this.getCurrency().sign
                });
                for (var e = this.getCurrency(), t = 0, i = this.names.length; t < i; t++) n.dispatch("HH-Search-MoneyInput-ChangeCurrency" + this.names[t], window, e)
            }, this.getCurrencies = function() {
                return e("option", this.element).toArray().map(this.getCurrencyAttr, this)
            }, this.getCurrency = function() {
                return this.getCurrencyAttr(this.element.options[this.element.selectedIndex]) || null
            }, this.getCurrencyAttr = function(e) {
                return e.value ? {
                    sign: e.innerHTML,
                    abbr: e.value,
                    rate: parseFloat(e.className.replace(/HH-Search-MoneyInput-Currency-Rate-/, "")),
                    element: e,
                    template: e.getAttribute("data-hh-template")
                } : null
            }
        }, r.MoneyResult = function(e, t) {
            this.element = e, this.name = t.name, this.currencies = t.currencies, this.init()
        }, r.MoneyResult.prototype = new function() {
            this.init = function() {
                this.rates = new a.MoneyRates, this.currencies.map(this.addCurrency, this), n.add("HH-Search-MoneyInput-ChangeResult" + this.name, this.change.bind(this), window)
            }, this.addCurrency = function(e) {
                e && this.rates.setRate(e.abbr, e.rate)
            }, this.change = function(t) {
                if (t.currency.rate) {
                    var n = e(".HH-Search-MoneyInput-Currency-" + t.currency.abbr, this.element).toArray()[0],
                        o = 10 * Math.round(this.rates.convert(t.money, t.currency.abbr).value / 10);
                    if (t.currency.abbr === t.money.currency || !o) return void e(n).addClass("g-hidden");
                    e(n).removeClass("g-hidden"), o = i.formatCost(o), o = t.currency.template ? i.printf(t.currency.template, o) : o + " " + t.currency.abbr, e("span", n).toArray()[0].innerHTML = o
                } else t.currency.element.remove()
            }
        }, r.MoneyField = function(e, t) {
            this.element = e, this.currency = t.currency, this.name = t.name, t.params.tooltip && (this.tooltip = s.getInstance(e, {
                manual: !0
            })), this.init()
        }, r.MoneyField.prototype = new function() {
            this.init = function() {
                e(this.element).on("keyup", this.changeInputValue.bind(this)), e(this.element).on("change", this.changeInputValue.bind(this)), e(this.element).on("valuechange", this.changeInputValue.bind(this)), e(this.element).on("blur", this.onBlur.bind(this)), n.add("HH-Search-MoneyInput-ChangeCurrency" + this.name, this.changeValue.bind(this), window), this.prevValue = "", this.element.value > 0 && this.changeInputValue()
            }, this.toggleTooltip = function(e) {
                this.tooltip && this.tooltip.toggle(e)
            }, this.changeInputValue = function() {
                this.prevValue !== this.element.value && (/^\d+$/.test(this.element.value) || "" === this.element.value ? (this.toggleTooltip(!1), this.changeValue(this.currency.getCurrency()), this.prevValue = this.element.value) : (this.toggleTooltip(!0), this.element.value = this.prevValue))
            }, this.changeValue = function(e) {
                e && this.setAllCurrencies(new a.Money(e.abbr, this.element.value || ""))
            }, this.onBlur = function() {
                this.toggleTooltip(!1)
            }, this.setAllCurrencies = function(e) {
                e && this.currency.getCurrencies().map(this.setCurrency.bind(this, e))
            }, this.setCurrency = function(e, t) {
                t.rate ? (n.dispatch("HH-Search-MoneyInput-ChangeResult" + this.name, window, {
                    money: e,
                    currency: t
                }), this.element.disabled = !1) : t.element.remove()
            }
        }, r.AnySalaryInfo = function(e, t) {
            this.element = e, this.names = t.name, this.init()
        }, r.AnySalaryInfo.prototype = new function() {
            this.init = function() {
                this.values = [], this.names.forEach(function(e, t) {
                    n.add("HH-Search-MoneyInput-ChangeResult" + e, this.changeValue.bind(this, t), window)
                }, this)
            }, this.changeValue = function(e, t) {
                this.values[e] = t.money.value, this.check()
            }, this.check = function() {
                var t = !0;
                this.values.forEach(function(e) {
                    e > 0 && (t = !1)
                }), t ? e(this.element).removeClass("g-hidden") : e(this.element).addClass("g-hidden")
            }
        }, t.build({
            create: function(t, n) {
                return new function(t, n) {
                    this.init = function(e, t) {
                        this.element = e, this.selects = [], this.initAnySalaryInfo(), this.initSelects(), this.initResults(), this.initInputs(t)
                    }, this.initSelects = function() {
                        e(".HH-Search-MoneyInput-Currency", this.element).toArray().map(this.initSelect, this)
                    }, this.initSelect = function(e) {
                        var t = o.getParams(e);
                        "string" == typeof t.name && (t.name = [t.name]);
                        for (var n = new r.MoneySelect(e, t), i = 0, s = t.name.length; i < s; i++) this.selects[t.name[i]] = n
                    }, this.initInputs = function(t) {
                        e(".HH-Search-MoneyInput-Input", this.element).toArray().map(this.initInput.bind(this, t))
                    }, this.initInput = function(e, t) {
                        var n = o.getParams(t).name;
                        new r.MoneyField(t, {
                            name: n,
                            currency: this.selects[n],
                            params: e
                        })
                    }, this.initResults = function() {
                        e(".HH-Search-MoneyInput-Result", this.element).toArray().map(this.initResult, this)
                    }, this.initResult = function(e) {
                        var t = o.getParams(e).name;
                        new r.MoneyResult(e, {
                            name: t,
                            currencies: this.selects[t].getCurrencies()
                        })
                    }, this.initAnySalaryInfo = function() {
                        var t = e(".HH-Search-MoneyInput-AnySalary", this.element)[0];
                        if (t) {
                            var n = o.getParams(t);
                            "string" == typeof n.name && (n.name = [n.name]), new r.AnySalaryInfo(t, n)
                        }
                    }, this.returnRate = function() {
                        return {
                            rate: this.selects.Compensation.getCurrency().rate,
                            name: this.selects.Compensation.getCurrency().sign
                        }
                    }, this.init(t, n)
                }(t, n)
            }
        })
    }), define("HH/Search/SaveSearch", ["jquery", "HHC/Components", "HHC/Analytics", "HH/Bloko/Notification", "bloko/common/valuechange", "HH/Message"], function(e, t, n, i) {
        return t.build({
            create: function(o, s) {
                return new function(o, s) {
                    this.$element = e(o), this.params = s, this.init = function() {
                        var t = this;
                        this.params.emailRequired = this.params.emailRequired || !1, this.$messagesContainer = this.$element;
                        var n = e(".HH-Search-SaveSearch-MessagesContainer", this.$element);
                        0 !== n.length && (this.$messagesContainer = n.first()), this.$error = e(".HH-Search-SaveSearch-Error", this.$element), this.$save = e(".HH-Search-SaveSearch-Save", this.$element), this.$save.prop("disabled", !1), this.$email = e(".HH-Search-SaveSearch-Email", this.$element), this.$wrongEmail = e(".HH-Search-SaveSearch-WrongEmail", this.$element), this.$mainLink = e(".HH-Search-SaveSearch-MainLink"), this.$authButton = e(".HH-Search-SaveSearch-AuthButton", this.$element), this.$okButton = e(".HH-Search-SaveSearch-OkButton", this.$element), this.$popupSaveFom = e(".HH-Search-SaveSearch-Form", this.$element), this.emailOnlyText = e(".HH-Search-SaveSearch-Success-ViewedEmailOnly", this.$element).html(), this.createLink(), this.$save.on("click", function(e) {
                            t.doSave(e)
                        }), this.$element.on("HH-Search-SaveSearch", function(e) {
                            t.isMap = !0, t.doSave(e)
                        }), this.$element.on("HH-Search-ChangeQuery", function(e, n) {
                            t.params.queryString = n, t.createLink()
                        }), this.$popup = e(".HH-Bloko-PopupSwitcher-Popup", this.$element), this.$popup.on("showed.popup", function() {
                            t.$messagesContainer.trigger("showMessage", {
                                name: "saveSearch-before",
                                group: "saveSearch"
                            }), window.setTimeout(function() {
                                t.$email.focus()
                            }, 1)
                        }), this.$popup.on("hid.popup", function() {
                            t.$email.off("valuechange")
                        })
                    }, this.createLink = function() {
                        this.href = this.params.href || this.params.baseUrl + this.params.queryString
                    }, this.isEmailCorrect = function() {
                        return -1 !== this.$email.val().search(/^[^\s]+@[^\s]+\.[^\s]+$/)
                    }, this.wrongEmailShow = function() {
                        this.$wrongEmail.removeClass("g-hidden"), this.$save.prop("disabled", !0)
                    }, this.checkEmail = function() {
                        var e = this.$email.val();
                        e !== this.lastEmail && (this.lastEmail = e, this.isEmailCorrect() ? (this.$save.prop("disabled", !1), this.$wrongEmail.addClass("g-hidden")) : this.wrongEmailShow())
                    }, this.doSave = function(t) {
                        t.preventDefault(), this.$error.addClass("g-hidden");
                        var n = this.href,
                            i = {};
                        if (this.params.autosearchName && (i = {
                                autosearchName: this.params.autosearchName
                            }), this.params.emailRequired) {
                            if (!this.isEmailCorrect()) return this.$email.on("valuechange", this.checkEmail.bind(this)), void this.wrongEmailShow();
                            this.$save.prop("disabled", !0), n += "&email=" + this.$email.val()
                        } else this.$messagesContainer.trigger("showMessage", {
                            name: "saveSearch-loading",
                            group: "saveSearch"
                        });
                        e.ajax({
                            url: n,
                            data: i,
                            type: "POST",
                            success: this.saveSuccess.bind(this),
                            error: this.saveFailed.bind(this),
                            cache: !1
                        })
                    }, this.saveSuccess = function(e) {
                        switch (window.globalVars.userType) {
                            case "applicant":
                                this.params.autosearchName && n.trackAnalyticsEvent("applicant", "watch_for_vacancies", "subscribe_employer_vacancies");
                                break;
                            case "employer":
                                n.trackAnalyticsEvent("employer", "watch_for_resumes", "subscribe_search_results")
                        }
                        "Success" === e.state ? (this.$messagesContainer.trigger("showMessage", {
                            name: "saveSearch-success",
                            group: "saveSearch"
                        }), this.isMap || this.$mainLink.hide(), this.$okButton.focus()) : this.$messagesContainer.trigger("showMessage", {
                            name: "saveSearch-successEmailOnly",
                            group: "saveSearch",
                            content: this.emailOnlyText + e.email
                        })
                    }, this.saveFailed = function(e) {
                        409 === e.status ? (this.$messagesContainer.trigger("showMessage", {
                            name: "saveSearch-authRequired",
                            group: "saveSearch"
                        }), this.$authButton.focus(), this.$save.prop("disabled", !1)) : e.responseJSON && "WrongEmail" === e.responseJSON.state ? (this.$email.on("valuechange", this.checkEmail.bind(this)), this.wrongEmailShow()) : (this.$messagesContainer.trigger("showMessage", {
                            name: "saveSearch-before",
                            group: "saveSearch"
                        }), 0 === this.$popupSaveFom.length && t.make(i, o, {
                            content: s.errorText,
                            type: "error"
                        }), this.$error.removeClass("g-hidden"), this.$save.prop("disabled", !1))
                    }, this.init(o, s)
                }(o, s)
            }
        })
    }), define("HH/Search/ShowToggleSelect", ["jquery", "HHC/Components", "Utils/Callbacks"], function(e, t, n) {
        return t.build({
            create: function(t, i) {
                return new function(t, i) {
                    this.$element = e(t), this.element = t;
                    var o = e("#search-form").find('input[name="no_magic"]');
                    function s(t) {
                        n.add("render", this.render.bind(this), this), this.update(e.extend({}, this.defaults, t))
                    }
                    function a(e) {
                        this.options = {
                            multiselect: e || !1
                        }, this.items = [], this.length = 0, n.add("change", this.render.bind(this), this), this.options.multiselect ? (this.onSelectItem = function(e) {
                            e.parent && (e.parent.child.every(function(e) {
                                return e.isSelected()
                            }) ? e.parent.select() : e.parent.undetermine()), e.child && e.child.forEach(function(e) {
                                e.select()
                            }), this.enableMagic(), e.isMaster() ? (this.unselectAll(e), this.disableMagic()) : this.isEverySelected() ? (this.unselectAll(this.masterOption), this.masterOption.select()) : this.masterOption.unselect(), a.prototype.onSelectItem.call(this)
                        }, this.onUnselectItem = function(e) {
                            e.parent && (e.parent.child.every(function(e) {
                                return !e.isSelected()
                            }) ? e.parent.unselect() : e.parent.undetermine()), e.child && e.child.forEach(function(e) {
                                e.unselect()
                            }), this.masterOption && this.isEveryUnselected() && this.masterOption.select(), a.prototype.onUnselectItem.call(this)
                        }, this.onUndetermineItem = function() {
                            this.masterOption && this.masterOption.unselect(), a.prototype.onUndetermineItem.call(this)
                        }, this.enableMagic = function() {
                            o.val("false")
                        }, this.disableMagic = function() {
                            o.val("true")
                        }) : this.onSelectItem = function(e) {
                            a.prototype.onSelectItem.call(this), this.items.forEach(function(t) {
                                t !== e && t.unselect()
                            })
                        }
                    }
                    e.extend(s.prototype, {
                        defaults: {
                            selected: !1,
                            master: !1
                        },
                        update: function(t) {
                            return e.extend(this, t), n.dispatch("render", this, this), this
                        },
                        select: function() {
                            return this.update({
                                selected: !0
                            })
                        },
                        unselect: function() {
                            return this.update({
                                selected: !1
                            })
                        },
                        undetermine: function() {
                            return this.update({
                                selected: "indeterminated"
                            })
                        },
                        change: function(e) {
                            n.dispatch(e, this, this[e]())
                        },
                        isSelected: function() {
                            return !0 === this.selected
                        },
                        isIndeterminated: function() {
                            return "indeterminated" === this.selected
                        },
                        isMaster: function() {
                            return !0 === this.master
                        },
                        render: e.noop()
                    }), e.extend(a.prototype, {
                        add: function(e) {
                            this.items.push(e), this.length += 1, this.options.multiselect && e.isMaster() && (this.masterOption = e), n.add("select", this.onSelectItem.bind(this), e), n.add("unselect", this.onUnselectItem.bind(this), e), n.add("undetermine", this.onUndetermineItem.bind(this), e)
                        },
                        isEverySelected: function() {
                            return this.items.every(function(e) {
                                return !!e.isMaster() || e.isSelected()
                            })
                        },
                        isEveryUnselected: function() {
                            return this.items.every(function(e) {
                                return !!e.isMaster() || !e.isSelected()
                            })
                        },
                        getSelected: function() {
                            return this.items.filter(function(e) {
                                return e.isSelected()
                            })
                        },
                        selectAll: function(e) {
                            this.items.forEach(function(t) {
                                t !== e && t.select()
                            })
                        },
                        unselectAll: function(e) {
                            this.items.forEach(function(t) {
                                t !== e && t.unselect()
                            })
                        },
                        onSelectItem: function() {
                            n.dispatch("change", this, this)
                        },
                        onUnselectItem: function() {
                            n.dispatch("change", this, this)
                        },
                        onUndetermineItem: function() {
                            n.dispatch("change", this, this)
                        },
                        render: e.noop()
                    }), this.init = function(t) {
                        this.$valueContainer = e(".HH-Search-ShowToggleSelect-Value", t), this.$switcher = e(".HH-Search-ShowToggleSelect-Switcher", t), this.multiselect = e(".HH-Search-ShowToggleSelect-Input", t).is("[type=checkbox]"), this.$dropdown = e(".HH-Search-ShowToggleSelect-Dropdown", t), s.prototype.render = this.renderOption.bind(this), a.prototype.render = this.renderVariants.bind(this), this.initOptions(), this.multiselect ? this.initMultiSelect() : this.initSingleSelect(), this.$dropdown.on("click", ".HH-Search-ShowToggleSelect-Label", this.updateModel.bind(this))
                    }, this.initMultiSelect = function() {
                        this.$submit = e(".HH-Search-ShowToggleSelect-Submit", this.element).removeClass("g-hidden").on("click", this.hideOptions.bind(this))
                    }, this.initSingleSelect = function() {
                        this.$element.on("click", ".HH-Search-ShowToggleSelect-Label", this.hideOptions.bind(this))
                    }, this.renderOption = function(e) {
                        e.$input.prop("checked", e.isSelected()).prop("indeterminate", e.isIndeterminated())
                    }, this.renderVariants = function() {
                        clearTimeout(this.renderTimout), this.renderTimout = window.setTimeout(this.render.bind(this), 0)
                    }, this.render = function() {
                        var e = this.getSelected(),
                            t = e.map(function(e) {
                                return e.text
                            }).join(", "),
                            i = e.map(function(e) {
                                return e.value
                            }).join(",");
                        this.$switcher.html(t), this.$valueContainer.val(i), n.dispatch("HH-Search-ShowToggleSelect-ValueChange", this.element, e)
                    }, this.createOptionFrom = function(e) {
                        var t, n = e.children(".HH-Search-ShowToggleSelect-Label"),
                            i = n.find(".HH-Search-ShowToggleSelect-Input");
                        return i.data("resumeSearchOption", t = new s({
                            text: n.text(),
                            value: i.val(),
                            selected: i.is(":checked"),
                            master: e.hasClass("HH-Search-ShowToggleSelect-MasterItem"),
                            $input: i
                        })), t
                    }, this.createOptionsCollectionFrom = function(t, n) {
                        var i = this,
                            o = [],
                            s = 0,
                            a = t.children(".HH-Search-ShowToggleSelect-ListItem");
                        return t.length ? (a.each(function(t, a) {
                            var r = i.createOptionFrom(e(a));
                            o.push(r), i.variants.add(r), r.update({
                                child: i.createOptionsCollectionFrom(e(a).children(".HH-Search-ShowToggleSelect-List").first(), r),
                                parent: n
                            }), s += r.isSelected()
                        }), n && s !== o.length && 0 !== s && n.undetermine(), o) : o
                    }, this.initOptions = function() {
                        this.variants = new a(this.multiselect), this.createOptionsCollectionFrom(this.$element.find(".HH-Search-ShowToggleSelect-ListBox").children(".HH-Search-ShowToggleSelect-List"))
                    }, this.hideOptions = function() {
                        this.$element.trigger("Bloko-Toggle-Click", "collapse")
                    }, this.updateModel = function(t) {
                        var n = e(t.currentTarget).find(".HH-Search-ShowToggleSelect-Input");
                        window.setTimeout(function() {
                            n.data("resumeSearchOption").change(n.prop("checked") ? "select" : "unselect")
                        }, 0)
                    }, this.getSelected = function() {
                        return this.variants.getSelected().filter(function(e) {
                            return e.parent ? !e.parent.isSelected() : e
                        })
                    }, this.init(t, i)
                }(t, i)
            }
        })
    }), define("HH/Search/WizardNew", ["jquery", "HHC/Components", "Utils/Callbacks", "bloko/blocks/toggle/toggle", "HH/Search/ShowToggleSelect"], function(e, t, n, i, o) {
        return t.build({
            create: function(s, a) {
                return new function(s, a) {
                    this.init = function(t) {
                        var n = this;
                        this.$list = e(".HH-Search-Wizard-List", t), this.$form = e("form", t), this.$template = e(".HH-Search-Wizard-Template", t).detach().addClass("HH-Search-Wizard-Item").removeClass("g-hidden HH-Search-Wizard-Template"), e(".HH-Search-Wizard-Item", this.$list).each(function(e, t) {
                            n.initItem(t)
                        }), e(".HH-Search-Wizard-Add", t).on("click", this.addItem.bind(this))
                    }, this.initItem = function(s) {
                        var a = e(".HH-Search-Wizard-Component-ToggleBlock", s).get(),
                            r = e(".HH-Search-WizardNew-Input-Position", s),
                            l = e(".HH-Search-WizardNew-Input-Experience-Period", s),
                            c = e(".HH-Search-Wizard-Remove", s),
                            d = ["workplaces", "workplace_organization", "workplace_position", "workplace_description"];
                        a.forEach(function(e) {
                            i.create(e, {
                                closeByClick: !0
                            }), t.make(o, e)
                        }), n.add("HH-Search-ShowToggleSelect-ValueChange", function(e) {
                            var t = e.some(function(e) {
                                return -1 !== d.indexOf(e.value)
                            });
                            l.toggleClass("g-hidden", !t)
                        }, r.get(0)), c.on("click", this.removeField.bind(this, s)).removeClass("g-hidden")
                    }, this.addItem = function() {
                        var e = this.$template.clone().appendTo(this.$list);
                        this.initItem(e), t.init(e.get(0))
                    }, this.removeField = function(t) {
                        e(t).remove()
                    }, this.init(s, a)
                }(s, a)
            }
        })
    }), define("HH/SearchFromSuggest/SearchFromSuggestInputTemplate.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<input type="hidden" name="'), i.b(i.v(i.f("name", e, t, 0))), i.b('" value="'), i.b(i.v(i.f("value", e, t, 0))), i.b('"/>'), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("HH/SearchFromSuggest/SearchFromSuggest", ["jquery", "HHC/Components", "HH/SearchFromSuggest/SearchFromSuggestInputTemplate.mustache"], function(e, t, n) {
        return t.build({
            create: function(t, i) {
                var o = e(t);
                e(".HH-SearchFromSuggest-Suggest", o).on("selected.suggest", function() {
                    var e = n.render({
                        name: i.name,
                        value: i.value
                    });
                    o.append(e), i.submitOnSuggestChanged && o.submit()
                })
            }
        })
    }), define("HH/SendAnalytics", ["jquery", "HHC/Analytics", "HHC/Components"], function(e, t, n) {
        return n.build({
            defaults: {
                toStorage: !1,
                category: "",
                action: "",
                label: "",
                value: ""
            },
            create: function(n, i) {
                return new function(n, i) {
                    this.$element = e(n), this.params = i;
                    var o = function() {
                        t[this.params.toStorage ? "googleEventToStorage" : "trackAnalyticsEvent"](this.params.category, this.params.action, this.params.label, this.params.value)
                    }.bind(this);
                    "ready" === this.params.onEvent ? e(o) : this.$element.on(this.params.onEvent, o)
                }(n, i)
            }
        })
    }), define("HH/SetConversionGoal", ["jquery", "HHC/Components", "HHC/Analytics"], function(e, t, n) {
        var i = {
                hh: function(t) {
                    e.ajax({
                        url: "/analytics",
                        data: t.data ? e.param(t.data, !0) : {
                            goal: t.goal
                        }
                    })
                },
                gaq: function(e) {
                    n.setConversionGoal(e.goal)
                },
                kardinal: function(t) {
                    e.ajax({
                        url: "/tracking/" + t.goal,
                        data: e.param(t.data, !0)
                    })
                }
            },
            o = {
                once: "one",
                always: "on"
            };
        return t.build({
            defaults: {
                toStorage: "gaq",
                attachType: "always",
                onEvent: "click",
                goal: window.location.pathname
            },
            create: function(t, n) {
                "load" !== n.onEvent ? e(t)[o[n.attachType]](n.onEvent, i[n.toStorage].bind(null, n)) : i[n.toStorage](n)
            }
        })
    }), define("HH/ShareButtons", ["jquery", "HHC/Components"], function(e, t) {
        return t.build({
            create: function(t, n) {
                return new function(t, n) {
                    var i = function(t) {
                            return e.ajax({
                                url: t,
                                cache: !0,
                                dataType: "script"
                            })
                        },
                        o = {
                            vk: function(e) {
                                i("https://vk.com/js/api/openapi.js?100").done(function() {
                                    void 0 !== window.VK && (window.VK.init({
                                        apiId: e.apiId,
                                        onlyWidgets: !0
                                    }), window.VK.Widgets.Like("share_buttons_vk_like", {
                                        type: "button",
                                        verb: e.verb,
                                        pageUrl: e.pageUrl
                                    }))
                                })
                            },
                            fb: function(e) {
                                var t = document.createElement("script");
                                t.src = "https://connect.facebook.net/" + e.lang + "/all.js#xfbml=1";
                                var n = document.getElementsByTagName("script")[0];
                                n.parentNode.insertBefore(t, n)
                            },
                            tw: function() {
                                i("https://platform.twitter.com/widgets.js")
                            },
                            serf: function() {
                                i("https://surfingbird.ru/share/share.min.js")
                            },
                            ok: function() {
                                i("https://connect.ok.ru/connect.js").done(function() {
                                    window.setTimeout(function() {
                                        void 0 !== window.OK && window.OK.CONNECT.insertShareWidget("share_buttons_ok_shareWidget", location.protocol + "//" + location.host + location.pathname, '{width:170,height:30,st:"rounded",sz:20,ck:3}')
                                    }, 0)
                                })
                            }
                        };
                    this.init = function(t) {
                        e(".HH-ShareButtons-Button", t).each(function(t, n) {
                            var i = JSON.parse(e(n).attr("data-hh-sharebuttons"));
                            o[i.key](i.params)
                        })
                    }, this.init(t, n)
                }(t, n)
            }
        })
    }), define("HH/Sticky", ["jquery", "HHC/Components", "bloko/common/requestAnimation", "HH/Sticky/Stack"], function(e, t, n, i) {
        return t.build({
            defaults: {
                absolute: !1,
                elementScroll: !1,
                appendToStack: !1,
                hasExternalBound: !1
            },
            create: function(t, o) {
                return new function(t, o) {
                    var s, a, r, l;
                    this.$element = e(t), this.element = t, this.params = o, this.bindings = {
                        stickyBlock: ".HH-Sticky-Block",
                        externalBound: ".HH-Sticky-ExternalBound"
                    }, this.init = function() {
                        var t = this;
                        this.$window = e(window), this.$scrollContainer = this.params.elementScroll ? this.$element : this.$window, this.$stickyBlock = e(this.params.stickyBlock || this.bindings.stickyBlock, this.element), this.$parent = this.$stickyBlock.parent(), this.initialLeftMargin = parseInt(this.$stickyBlock.css("margin-left"), 10) || 0, this.state = "static", this.enabled = !0;
                        var n = function() {
                            this.$externalBound = e(this.bindings.externalBound, this.$element), this.hasExternalBound = this.params.hasExternalBound && this.$externalBound.length
                        }.bind(this);
                        if (n(), this.params.saveWidth && this.$stickyBlock.width(this.$stickyBlock.width()), this.$stickyBlock.length) {
                            this.$stickyDummy = e("<div/>").hide().insertBefore(this.$stickyBlock), this.updateDummyElementMetrics();
                            var i = this.params.absolute ? this.redrawAbsoluteSticky.bind(this) : this.redrawFixedSticky.bind(this);
                            this.redraw = function() {
                                i(), this.checkLeftScroll()
                            }, this.redraw(), e(document).on("HH-Sticky-Update", function() {
                                t.enabled && (n(), t.updateDummyElementMetrics(), t.redraw())
                            }), this.turnOnEventListeners()
                        }
                    }, this.updateDummyElementMetrics = function() {
                        var e = this._calculateMetrics();
                        this.$stickyDummy.css({
                            visibility: "hidden",
                            height: e.stickyBlockHeight,
                            width: this.$stickyBlock.outerWidth(),
                            "margin-top": this.$stickyBlock.css("margin-top"),
                            "margin-right": this.$stickyBlock.css("margin-right"),
                            "margin-bottom": this.$stickyBlock.css("margin-bottom"),
                            "margin-left": this.$stickyBlock.css("margin-left")
                        })
                    }, this.turnOnEventListeners = function() {
                        this.$scrollContainer.on("scroll.sticky", n(this.redraw.bind(this))), this.$scrollContainer.on("resize.sticky", n(this.checkLeftScroll.bind(this))), this.$scrollContainer.on("resize.sticky", n(this.recalculateWidth.bind(this)))
                    }, this.disable = function() {
                        !0 === this.enabled && (this.redrawStaticSticky(), this.enabled = !1, this.$scrollContainer.off("scroll.sticky"), this.$scrollContainer.off("resize.sticky"), this.params.flexible && this.$scrollContainer.off("resize.sticky"))
                    }, this.enable = function() {
                        !1 === this.enabled && (this.turnOnEventListeners(), this.enabled = !0)
                    }, this._calculateMetrics = (s = void 0, a = void 0, r = void 0, l = void 0, function() {
                        var t = 0,
                            n = 0;
                        e.contains(document.documentElement, this.$element.get(0)) && (t = this.$element.offset().top), e.contains(document.documentElement, this.$stickyBlock.get(0)) && (n = this.$stickyBlock.offset().top);
                        var o = this.$scrollContainer.scrollTop(),
                            c = this.$element.height(),
                            d = this.$scrollContainer.height(),
                            h = this.$stickyBlock.outerHeight(),
                            u = this.params.appendToStack ? i.getElementOffset(this.$element) : i.getOverallOffset(),
                            p = o < s || o === s && a;
                        if (l = n, this.$stickyDummy && this.$stickyDummy.length && "block" === this.$stickyDummy.css("display")) {
                            var m = this.$stickyDummy.offset().top;
                            m !== n && (l = m || l)
                        }
                        var f = {
                            scrollTop: o,
                            oldScrollTop: s,
                            containerHeight: d,
                            stickyBlockPositionTop: n,
                            scrollDirectionUp: p,
                            oldScrollDirectionUp: a,
                            stickyBlockHeight: h,
                            oldStickyBlockHeight: r,
                            topBound: l,
                            bottomBound: t + c,
                            globalOffset: u
                        };
                        return this.hasExternalBound && (f.externalBoundTop = this.$externalBound.offset().top), s = o, r = h, a = p, f
                    }), this.recalculateWidth = function() {
                        var e = this.$parent.width();
                        this.$stickyBlock.width() !== e && this.params.flexible && this.$stickyBlock.width(e), this.$stickyDummy.width() !== e && this.$stickyDummy.width(e)
                    }, this.switchState = function(e, t) {
                        this.state !== e && (this.$stickyBlock.removeClass(this.params[this.state + "PositionClass"]).addClass(this.params[e + "PositionClass"]).trigger(t), this.state = e)
                    }, this.isStickTopBound = function(e) {
                        return e.scrollTop < e.topBound - e.globalOffset
                    }, this.isStickBottomBound = function(e) {
                        var t = "static" === this.state && e.scrollTop + e.stickyBlockHeight >= e.bottomBound && e.stickyBlockPositionTop === e.topBound;
                        return t = e.stickyBlockHeight > e.containerHeight ? t || e.scrollTop + e.containerHeight > e.bottomBound : t || e.scrollTop + e.stickyBlockHeight + e.globalOffset >= e.bottomBound && e.scrollTop + e.globalOffset > e.topBound
                    }, this.isStickScroll = function(e) {
                        return e.scrollDirectionUp !== e.oldScrollDirectionUp || e.oldStickyBlockHeight !== e.stickyBlockHeight
                    }, this.isSimpleStickTop = function(e) {
                        return e.stickyBlockHeight < e.containerHeight && e.scrollTop >= e.topBound - e.globalOffset && e.scrollTop + e.stickyBlockHeight <= e.bottomBound
                    }, this.isStickTop = function(e) {
                        return e.scrollDirectionUp && e.scrollTop >= e.topBound - e.globalOffset && e.scrollTop <= e.stickyBlockPositionTop - e.globalOffset
                    }, this.isStickBottom = function(e) {
                        return !e.scrollDirectionUp && e.stickyBlockHeight >= e.containerHeight && e.scrollTop + e.containerHeight >= e.stickyBlockPositionTop + e.stickyBlockHeight
                    }, this.isStickBottomExternalBound = function(e) {
                        return this.hasExternalBound && e.externalBoundTop - e.scrollTop - e.globalOffset <= e.stickyBlockHeight
                    }, this.checkLeftScroll = function() {
                        "fixed" === this.$stickyBlock.css("position") ? this.$stickyBlock.css("margin-left", this.initialLeftMargin - this.$window.scrollLeft()) : this.$stickyBlock.css("margin-left", this.initialLeftMargin)
                    }, this.switchBottomExternalBoundState = function(e) {
                        "bottomExternalBound" !== this.state && "topBound" !== this.state && (this.$stickyDummy.show(), this.$stickyBlock.css({
                            position: "absolute"
                        }).offset({
                            top: e.externalBoundTop - e.stickyBlockHeight
                        }), this.switchState("bottomExternalBound", "sticky-external-bound-bottom"))
                    }, this.redrawStaticSticky = function() {
                        this.$stickyDummy.hide(), this.$stickyBlock.css({
                            position: "static"
                        }), this.switchState("topBound", "sticky-top-bound")
                    }, this.redrawAbsoluteSticky = function() {
                        var e = this._calculateMetrics();
                        if (this.isStickBottomExternalBound(e)) this.switchBottomExternalBoundState(e);
                        else {
                            if (!this.isStickTopBound(e)) return this.isStickBottomBound(e) ? (this.$stickyDummy.show(), this.$stickyBlock.css({
                                position: "absolute"
                            }).offset({
                                top: e.bottomBound - e.stickyBlockHeight
                            }), void this.switchState("bottomBound", "sticky-bottom-bound")) : this.isSimpleStickTop(e) || this.isStickTop(e) ? (this.$stickyDummy.show(), this.$stickyBlock.css({
                                position: "absolute"
                            }).offset({
                                top: e.scrollTop + e.globalOffset
                            }), void this.switchState("top", "sticky-top-window")) : this.isStickBottom(e) ? (this.$stickyDummy.show(), this.$stickyBlock.css({
                                position: "absolute",
                                top: e.scrollTop - e.topBound + e.containerHeight - e.stickyBlockHeight
                            }), void this.switchState("bottom", "sticky-bottom-window")) : void(this.isStickScroll(e) && "scroll" !== this.state && (this.$stickyDummy.show(), this.$stickyBlock.css({
                                position: "absolute",
                                left: ""
                            }).offset({
                                top: e.stickyBlockPositionTop
                            }), this.switchState("scroll", "sticky-scroll")));
                            this.redrawStaticSticky()
                        }
                    }, this.redrawFixedSticky = function() {
                        var e = this._calculateMetrics();
                        if (this.isStickBottomExternalBound(e)) this.switchBottomExternalBoundState(e);
                        else {
                            if (this.isStickTopBound(e)) return this.redrawStaticSticky(), void(this.params.appendToStack && i.remove(this.$element));
                            if (this.isStickBottomBound(e)) return this.$stickyDummy.show(), this.$stickyBlock.css({
                                position: "absolute",
                                left: ""
                            }).offset({
                                top: e.bottomBound - e.stickyBlockHeight
                            }), this.switchState("bottomBound", "sticky-bottom-bound"), void(this.params.appendToStack && i.remove(this.$element));
                            var t = this.isSimpleStickTop(e);
                            if (t || this.isStickTop(e)) return this.$stickyDummy.show(), this.$stickyBlock.css({
                                top: e.globalOffset
                            }), void("top" !== this.state && (this.$stickyBlock.css({
                                position: "fixed"
                            }), this.switchState("top", "sticky-top-window"), this.params.appendToStack && i.add(this.$element, {
                                height: e.stickyBlockHeight,
                                callback: this.redraw.bind(this)
                            })));
                            t || (this.isStickBottom(e) ? "bottom" !== this.state && (this.$stickyDummy.show(), this.$stickyBlock.css({
                                position: "fixed",
                                top: e.containerHeight - e.stickyBlockHeight
                            }), this.switchState("bottom", "sticky-bottom-window")) : this.isStickScroll(e) && "scroll" !== this.state && (this.$stickyDummy.show(), this.$stickyBlock.css({
                                position: "absolute",
                                left: ""
                            }).offset({
                                top: e.stickyBlockPositionTop
                            }), this.switchState("scroll", "sticky-scroll"), this.params.appendToStack && i.remove(this.$element)))
                        }
                    }, this.init(t, o)
                }(t, o)
            }
        })
    }), define("HH/Sticky/StickyBasedOnScreenSize", ["jquery", "underscore", "HH/Sticky", "bloko/common/media", "HHC/Components"], function(e, t, n, i, o) {
        var s = 200;
        return o.build({
            create: function(a, r) {
                var l = o.make(n, a, r.stickyParams),
                    c = [];
                function d() {
                    0 !== c.length && -1 !== c.indexOf(i.getBreakpoint()) ? l.disable() : (l.enable(), e(document).trigger("HH-Sticky-Update"))
                }
                return !1 === r.XS && c.push(i.breakpoint.XS), !1 === r.S && c.push(i.breakpoint.S), !1 === r.M && c.push(i.breakpoint.M), !1 === r.L && c.push(i.breakpoint.L), d(), e(window).resize(t.debounce(d, s)), {
                    disable: l.disable,
                    enable: d
                }
            }
        })
    }), define("HH/Sticky/ParentAreaResizer", ["jquery", "HHC/Components", "bloko/common/supports", "HH/Sticky/StickyBasedOnScreenSize"], function(e, t, n, i) {
        return t.build({
            defaults: {
                screenParams: {
                    XS: !0,
                    S: !0,
                    M: !0,
                    L: !0
                },
                saveWidth: !0
            },
            create: function(o, s) {
                return new function(o, s) {
                    this.$element = e(o), this.bindings = {
                        resizerBlock: ".HH-StickyParentAreaResizer-Area",
                        content: ".HH-StickyParentAreaResizer-Content"
                    }, this.init = function() {
                        this.$resizerBlock = e(this.bindings.resizerBlock, this.$element), this.$resizerBlock && this.$resizerBlock.length && (this.$content = e(this.bindings.content, this.$element), n.mobile() || t.make(i, this.$element.get(0), e.extend({
                            stickyParams: {
                                saveWidth: s.saveWidth,
                                absolute: n.mobile(),
                                stickyBlock: this.bindings.resizerBlock
                            }
                        }, s.screenParams)), this.$resizerBlock.on(["possible-resize", "sticky-bottom-window", "sticky-top-window", "sticky-top-bound", "sticky-bottom-bound", "sticky-scroll"].join(" "), this.changeParentHeight.bind(this)))
                    }, this.changeParentHeight = function() {
                        var e = this._calculateMetrics(),
                            t = e.stickyBlockHeight + e.stickyBlockPositionTop;
                        t > e.parentElementTop + e.parentElementHeight && this.$element.css("height", t - e.parentElementTop), e.contentHeight < e.parentElementHeight && e.contentHeight > t && this.resetParentHeight()
                    }, this.resetParentHeight = function() {
                        this.$element.css("height", "auto")
                    }, this._calculateMetrics = function() {
                        return {
                            stickyBlockHeight: this.$resizerBlock.outerHeight(),
                            stickyBlockPositionTop: this.$resizerBlock.offset().top,
                            parentElementHeight: this.$element.height(),
                            parentElementTop: this.$element.offset().top,
                            contentHeight: this.$content.height()
                        }
                    }, this.init(o, s)
                }(o, s)
            }
        })
    }), define("HH/ToggleMetroSelector/regionSuggest.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b('<div data-qa="suggester__keywords-item">'), i.b("\n" + n), i.b("    "), i.b(i.v(i.f("text", e, t, 0))), i.b("\n" + n), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("HH/ToggleMetroSelector/ToggleMetroSelector", ["jquery", "underscore", "HHC/Components", "Utils/Callbacks", "HH/CompositeSelection", "HH/Metro", "HH/ToggleMetroSelector/regionSuggest.mustache"], function(e, t, n, i, o, s, a) {
        var r = {
            compositeSelectionElement: ".HH-ToggleMetroSelector-CompositeSelectionElement",
            metroElement: ".HH-ToggleMetroSelector-MetroElement",
            city: ".HH-ToggleMetroSelector-City"
        };
        return n.build({
            defaults: {
                compositeSelectionParams: {
                    suggestParams: {
                        template: a
                    }
                }
            },
            create: function(t, i) {
                return new function(t, i) {
                    var a = e(t),
                        l = n.make(s, e(r.metroElement, a).get(0), i.metroParams);
                    function c(e) {
                        l.toggleVisibility(e)
                    }
                    var d = e(r.compositeSelectionElement, a).get(0);
                    if (d) {
                        var h = n.make(o, d, i.compositeSelectionParams);
                        h.on("change", function(e) {
                            c(e)
                        });
                        var u = h.getSelectedIds();
                        u.length && c(u)
                    }
                    var p = e(r.city, a);
                    p.length && p.on("selected.suggest autoselected.suggest", function(e, t) {
                        c([t.id])
                    }), i.selectedRegions && c(i.selectedRegions)
                }(t, i)
            }
        })
    }), define("HH/UserNotifications", ["jquery", "HHC/Components", "bloko/common/loadingSetter", "bloko/common/urlParser"], function(e, t, n, i) {
        return t.build({
            create: function(t) {
                var o = e(t),
                    s = e(".HH-UserNotifications-Menu", o),
                    a = e(".HH-UserNotifications-Switcher", o);
                o.on("click", ".HH-UserNotifications-Link", function(t) {
                    t.preventDefault();
                    var n = e(t.target).closest(".HH-UserNotifications-Notification").data("notification-id");
                    e.ajax({
                        url: "/shards/notifications/mark_as_read",
                        method: "POST",
                        data: {
                            id: n
                        }
                    }).done(function() {
                        i(window.location.href).href === i(t.target.getAttribute("href")).href ? window.location.reload() : window.location.href = t.target.getAttribute("href")
                    })
                }), o.on("click", ".HH-UserNotifications-Closer", function(t) {
                    t.stopPropagation();
                    var i = e(t.target).closest(".HH-UserNotifications-Notification"),
                        r = i.data("notification-id"),
                        l = new n(e(".HH-UserNotifications-Spinner", i).get(0));
                    e(".HH-UserNotifications-Closer", i).addClass("g-hidden"), l.start(), e.ajax({
                        url: "/shards/notifications?" + e.param({
                            id: r
                        }),
                        method: "DELETE"
                    }).done(function() {
                        e.ajax({
                            url: "/shards/notifications",
                            method: "GET"
                        }).done(function(t) {
                            e(".HH-UserNotifications-Content", o).html(t), 0 === e(".HH-UserNotifications-Notification", o).length && (a.trigger("click.toggle"), s.remove())
                        })
                    }).always(function() {
                        l.stop()
                    })
                })
            }
        })
    }), define("HH/VacancyResponseLetter", ["jquery", "HHC/Components", "Utils/Callbacks", "bloko/blocks/modal/modal", "bloko/common/loadingSetter", "bloko/blocks/modalError/modalError"], function(e, t, n, i, o, s) {
        return t.build({
            create: function(a, r) {
                var l = e(a),
                    c = r.topicId || null,
                    d = e(".HH-VacancyResponseLetterPopup-Open", l),
                    h = e(".HH-VacancyResponseLetterPopup-Posted", l),
                    u = e(".HH-VacancyResponseLetterPopup-Popup", l),
                    p = e(".HH-VacancyResponseLetterPopup-Submit", u),
                    m = e(".HH-VacancyResponseLetterPopup-Cancel", u),
                    f = e(".HH-VacancyResponseLetterPopup-Letter", u),
                    g = e(".HH-VacancyResponseLetterPopup-Error", u),
                    b = void 0,
                    v = void 0,
                    k = void 0;
                u.length && (b = t.make(s, g.get(0)), v = t.make(i, u.get(0)), k = new o(p.get(0)), m.on("click", v.hide)), n.add("HH-VacancyResponsePopup-Letter", function(e) {
                    c = e, d.toggleClass("g-hidden", null === c), h.addClass("g-hidden")
                }, l.get(0)), d.on("click", function() {
                    if (c) {
                        v.show();
                        var t = function(e) {
                                e ? k.start() : k.stop(), p.prop("disabled", e)
                            },
                            n = function(e) {
                                p.toggleClass("g-hidden", !e), m.toggleClass("g-hidden", !e)
                            },
                            i = function(e) {
                                b.setMessage(r.trlErrors[e] ? r.trlErrors[e] : r.trlErrors.unknown), b.show(), "notEditable" === e && n(!1)
                            };
                        p.on("click", function() {
                            b.hide(), "" !== f.val() ? (t(!0), e.ajax({
                                url: "/applicant/vacancy_response/edit_ajax",
                                method: "POST",
                                data: {
                                    topicId: c,
                                    text: f.val()
                                }
                            }).then(function(e) {
                                e && "true" === e.success ? (d.addClass("g-hidden"), h.removeClass("g-hidden"), v.hide(), f.val("")) : i(e && e.error ? e.error : "unknown")
                            }, function() {
                                i("unknown")
                            }).always(function() {
                                t(!1)
                            })) : i("letterRequired")
                        }), n(!0)
                    }
                })
            }
        })
    }), define("HH/VacancyResponsePopup/VacancyResponsePopupNotify.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b(i.v(i.f("responseTrl", e, t, 0))), i.b("\n" + n), i.b('<a href="/applicant/negotiations/item?topicId='), i.b(i.v(i.f("topicId", e, t, 0))), i.b('" class="bloko-notification__link">'), i.b("\n" + n), i.b("    "), i.b(i.v(i.f("viewResponseTrl", e, t, 0))), i.b("\n" + n), i.b("</a>"), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("HH/VacancyResponsePopup/VacancyResponsePopup", ["jquery", "HHC/Components", "HHC/Analytics", "Utils/ScrollToElement", "Utils/Callbacks", "bloko/blocks/toggle/toggle", "bloko/blocks/modal/modal", "bloko/common/loadingSetter", "bloko/common/storage/LocalStorageWrapper", "HH/Bloko/Notification", "HH/VacancyResponsePopup/VacancyResponsePopupNotify.mustache", "HH/SetConversionGoal"], function(e, t, n, i, o, s, a, r, l, c, d, h) {
        var u = e(document.createElement("div")),
            p = e(document.createElement("div")).addClass("vacancy-response-popup-wrapper").appendTo(u),
            m = void 0,
            f = "vacancy-response-letter",
            g = new CustomEvent("element-displayed");
        return t.build({
            defaults: {
                cssClasses: {
                    attention: "signup-wrapper_attention",
                    selectedResume: "vacancy-response-popup-resume_selected"
                }
            },
            create: function(b, v) {
                return new function(b, v) {
                    this.$element = e(b), this.params = v, this.init = function() {
                        this.clicked = !1, this.stayOnPage = this.params.stayOnPage || !1, this.$mainResponseButton = e(".HH-VacancyResponsePopup-MainButton", this.$element), this.$scrollToSignUp = e(".HH-VacancyResponsePopup-TopLinkScrollToSignUp", this.$element), this.$responseBlock = e(".HH-VacancyResponsePopup-ResponseBlock", this.$element), this.$response = e(".HH-VacancyResponsePopup-Response", this.$element), this.$responded = e(".HH-VacancyResponsePopup-Responded", this.$element), this.$modalLoadError = e(".HH-VacancyResponsePopup-LoadingError", this.$element), this.$responseAction = e(".HH-VacancyResponsePopup-Link", this.$element), this.savedLetterValue = JSON.parse(l.getItem(f)) || {}, this.letterValue = this.savedLetterValue[this.params.vacancyId] || "", this.modalLoadingSetter = new r(this.$mainResponseButton.get(0)), this.$responseAction.on("click", this.show.bind(this)), this.params.isAutoOpen && (this.show(), this.params.isAutoOpen = !1), this.$element.on("responseCheckBypass", this.checkForm.bind(this));
                        var t = e(".HH-VacancyResponsePopup-SignupForm", this.$element);
                        this.$scrollToSignUp.on("click", function(e) {
                            e.preventDefault(), i(t, {
                                duration: 200,
                                topOffset: 0,
                                centered: !1,
                                callback: function() {
                                    t.removeClass(v.cssClasses.attention), window.setTimeout(function() {
                                        t.addClass(v.cssClasses.attention)
                                    }, 0)
                                }
                            })
                        })
                    }, this.show = function(t) {
                        var n = this;
                        t && t.preventDefault(), this.clicked || (this.clicked = !0, t ? (this.withoutTest = "yes" === e(t.currentTarget).attr("data-without-test"), e(t.currentTarget).hasClass("HH-VacancyResponsePopup-MainButton") && this.loadPopupToggle(!0)) : this.params.isWithoutTest ? (this.withoutTest = !0, this.params.isWithoutTest = !1) : this.withoutTest = !1, this.$modalLoadError.addClass("g-hidden"), this.showed = !1, e.get("/applicant/vacancy_response/popup", {
                            vacancyId: this.params.vacancyId,
                            autoOpen: this.params.isAutoOpen ? "yes" : "no",
                            isTest: this.params.isTest ? "yes" : "no",
                            withoutTest: this.withoutTest ? "yes" : "no",
                            selectedResume: this.params.selectedResume
                        }, this.processInfo.bind(this)).fail(function() {
                            n.$modalLoadError.removeClass("g-hidden"), n.loadPopupToggle(!1), n.clicked = !1, i(n.$responseBlock, {
                                duration: 500,
                                topOffset: -30,
                                centered: !1
                            })
                        }))
                    }, this.processInfo = function(i) {
                        var o = this;
                        if ("need-login" !== i.response && "no-resumes" !== i.response) {
                            if (p.html(i), this.$form = e(".HH-VacancyResponsePopup-Form", p), this.$letter = e(".HH-VacancyResponsePopup-Letter", this.$form), this.$cancel = e(".HH-VacancyResponsePopup-Cancel", this.$form), this.$submit = e(".HH-VacancyResponsePopup-Submit", this.$form), this.$companyUrl = e(".HH-VacancyResponsePopup-CompanyUrl", p), 0 !== this.$companyUrl.length) t.make(h, this.$companyUrl.get(0), {
                                toStorage: "hh",
                                goal: "vacancy-response-company-url"
                            }), this.$companyUrl.on("click", function() {
                                n.trackAnalyticsEvent("applicant", "responseSent", "ad-vacancy-" + o.params.vacancyId)
                            });
                            else {
                                var a = "view-nonreq-letter";
                                0 !== e(".HH-VacancyResponsePopup-LetterRequired", u).length && (a = "view-req-letter"), n.trackAnalyticsEvent("applicant", "responded", a)
                            }
                            if (this.submitLoadingSetter = new r(this.$submit.get(0)), 0 !== this.$form.length) {
                                var l = s.create(e(".HH-VacancyResponse-Popup-ToggleBlock", this.$form).get(0));
                                this.letterValue && l.expand()
                            }
                            this.$letter.val(this.letterValue), this.setCancelEvent(), this.$errors = e(".HH-VacancyResponsePopup-Error", this.$form), this.$form.on("submit", this.save.bind(this)), this.$form.on("change", ".HH-VacancyResponsePopup-Resume-Radio", function(e) {
                                o.updateDisabledState(e.target)
                            });
                            var c = this.$form.find(".HH-VacancyResponsePopup-Resume-Radio:checked");
                            c.length || (c = this.$form.find(".HH-VacancyResponsePopup-Resume-Hidden")), this.updateDisabledState(c.get(0)), this.loadPopupToggle(!1), this.$form.data("hhVacancyResponsePopupCheck") && !this.params.ignoreResponseCheck ? this.$element.trigger("responseCheckTrigger", this.$element) : this.checkForm(), this.clicked = !1
                        } else window.location = i.redirect_uri
                    }, this.updateDisabledState = function(t) {
                        if (t) {
                            var n = e(t);
                            e(".HH-VacancyResponsePopup-Resume", this.$form).removeClass(this.params.cssClasses.selectedResume), n.closest(".HH-VacancyResponsePopup-Resume").addClass(this.params.cssClasses.selectedResume), this.incompleteResumeSelected = "true" === n.attr("data-incomplete");
                            var i = n.data("response-disabled");
                            void 0 !== i && this.$submit.prop("disabled", i)
                        }
                    }, this.checkForm = function() {
                        this.$form.data("hhVacancyResponsePopupTestRequired") ? window.location = "/applicant/vacancy_response?vacancyId=" + this.params.vacancyId : this.showPopup()
                    }, this.setCancelEvent = function() {
                        this.$cancel.on("click.responseCancel", function() {
                            m && m.hide()
                        })
                    }, this.showPopup = function() {
                        var e = this;
                        this.showed || (m || (m = t.make(a, u.get(0))), m.once("hid", function() {
                            e.letterValue = e.$letter.val()
                        }), m.show(), this.showed = !0)
                    }, this.save = function(s) {
                        var a = this;
                        if (s && s.preventDefault(), this.$errors.addClass("g-hidden"), e(".HH-VacancyResponsePopup-LetterRequired", u).length && "" === this.$letter.val().trim()) this.showError("letter-required");
                        else {
                            var r = [this.$form.serialize()];
                            this.params.isTest && !this.withoutTest && (r.push("guid=" + this.params.testGuid), r.push("uidPk=" + this.params.testUidPk), r.push(e(".HH-VacancyResponsePopup-TestForm").serialize())), this.stayOnPage && r.push("ignore_postponed=true"), this.incompleteResumeSelected && r.push("incomplete=true"), r = r.join("&"), this.loadToggle(!0), this.$cancel.off("click.responseCancel"), e.ajax({
                                url: this.$form.attr("action"),
                                data: r,
                                method: "POST"
                            }).then(function(e) {
                                if (a.stayOnPage) {
                                    var s = "" === a.$letter.val() ? e.topic_id : null;
                                    a.$response.addClass("g-hidden"), a.$responded.removeClass("g-hidden"), window.dispatchEvent(g), a.params.isSendAgain = !0, o.dispatch("HH-VacancyResponsePopup-Letter", b, s), a.$element.trigger("HH-VacancyResponsePopup-Send", e.topic_id), i(a.$responseBlock, {
                                        duration: 500,
                                        topOffset: -30,
                                        centered: !1
                                    }), a.params.isVacancyPage && (a.$responseAction.attr("disabled", !0), a.clicked = !0, a.$responseAction.hasClass("HH-VacancyResponsePopup-LinkAgain") && a.$responseAction.remove(), t.make(c, b, {
                                        content: d.render({
                                            topicId: e.topic_id,
                                            responseTrl: a.params.trl.response,
                                            viewResponseTrl: a.params.trl.viewResponse
                                        }),
                                        type: "ok"
                                    })), m && m.hide(), a.letterValue = "", a.$letter.val(""), e.response_label && n.trackAnalyticsEvent("applicant", "responseSent", e.response_label), delete a.savedLetterValue[a.params.vacancyId], l.setItem(f, JSON.stringify(a.savedLetterValue))
                                } else window.location = "/vacancy/" + a.params.vacancyId
                            }, function(e) {
                                var t = "unknown";
                                e.responseJSON && e.responseJSON.error && (t = e.responseJSON.error), "resume-incomplete" === t && "redirectUrl" in e.responseJSON ? (a.savedLetterValue[a.params.vacancyId] = a.$letter.val(), l.setItem(f, JSON.stringify(a.savedLetterValue)), window.location = e.responseJSON.redirectUrl) : a.showError(t)
                            }).always(function() {
                                a.loadToggle(!1), a.loadPopupToggle(!1)
                            })
                        }
                    }, this.loadToggle = function(e) {
                        e ? this.submitLoadingSetter.start() : this.submitLoadingSetter.stop(), this.$cancel.toggleClass(this.params.cancelDisabledClass || "", e), this.$submit.prop("disabled", e)
                    }, this.loadPopupToggle = function(e) {
                        this.$mainResponseButton.attr("disabled", e), e ? this.modalLoadingSetter.start() : this.modalLoadingSetter.stop()
                    }, this.showError = function(e) {
                        var t = this.$errors.filter('[data-hh-vacancy-response-popup-error="' + e + '"]');
                        t.length || (t = this.$errors.filter('[data-hh-vacancy-response-popup-error="unknown"]')), t.removeClass("g-hidden"), this.setCancelEvent()
                    }, this.init(b, v)
                }(b, v)
            }
        })
    }), define("HH/VacancySearchForm", ["jquery", "HHC/Components"], function(e, t) {
        return t.build({
            create: function(t, n) {
                return new function(t, n) {
                    this.$element = e(t), this.params = n, this.init = function() {
                        this.analysePreviousSalary = void 0 === this.params.analysePreviousSalary || this.params.analysePreviousSalary, this.$element.on("submit", this.onFormSubmit.bind(this))
                    }, this.onFormSubmit = function() {
                        var e = this.$element.find(".HH-VacancySearchForm-OnlyWithSalary"),
                            t = this.$element.find(".HH-VacancySearchForm-Salary"),
                            n = t.val(),
                            i = t.prop("defaultValue");
                        "" !== n || this.analysePreviousSalary && "" === i ? "" === n || this.analysePreviousSalary && "" !== i || e.val("true") : e.remove()
                    }, this.init(t, n)
                }(t, n)
            }
        })
    }), define("HH/VacancyToFavoriteNotificationTemplate.mustache", ["hogan"], function(e) {
        return new e.Template({
            code: function(e, t, n) {
                var i = this;
                return i.b(n = n || ""), i.b("<div>"), i.b("\n" + n), i.s(i.f("message", e, t, 1), e, t, 0, 22, 68, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b("    <span>"), i.b("\n" + n), i.b("    "), i.b(i.v(i.f("message", e, t, 0))), i.b("\n" + n), i.b("    </span>"), i.b("\n" + n)
                }), e.pop()), i.s(i.f("forceRetry", e, t, 1), e, t, 0, 100, 250, "{{ }}") && (i.rs(e, t, function(e, t, i) {
                    i.b("    &nbsp;"), i.b("\n" + n), i.b('    <span class="bloko-link-switch bloko-link-switch_inherited HH-VacancyToFavorite-ForceRetry">'), i.b("\n" + n), i.b("        "), i.b(i.v(i.f("forceRetry", e, t, 0))), i.b("\n" + n), i.b("    </span>"), i.b("\n" + n)
                }), e.pop()), i.b("</div>"), i.b("\n"), i.fl()
            },
            partials: {},
            subs: {}
        })
    }), define("HH/VacancyToFavorite", ["jquery", "HHC/Components", "Utils/QA", "bloko/blocks/popup/popup", "HH/Bloko/Notification", "HH/VacancyToFavoriteNotificationTemplate.mustache"], function(e, t, n, i, o, s) {
        var a = {
            "LIMIT EXCEEDED": "limitExceededError",
            vacancynotfound: "vacancyNotFoundError",
            vacancynotavailable: "vacancyNotAvailableError",
            vacancynotvisible: "vacancyNotVisibleError",
            vacancyarchived: "vacancyArchivedError",
            vacancyalreadyinfavoritelist: "vacancyAlreadyInFavoriteList",
            vacancynotfoundinfavoritelist: "vacancyNotFoundInFavoriteList",
            genericError: "genericError"
        };
        s.render();
        var r = {
                OK: "OK",
                ERROR: "ERROR"
            },
            l = "/applicant/favorite_vacancies/postpone",
            c = "/account/login?postponed",
            d = "/applicant/favorite_vacancies/add",
            h = "/applicant/favorite_vacancies/remove";
        return t.build({
            create: function(i, u) {
                var p = {},
                    m = !1;
                function f(t) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    m || (m = !0, e.ajax({
                        url: t.inFavorites ? h : d,
                        data: {
                            vacancyId: t.id,
                            cleanup: i
                        },
                        dataType: "json",
                        type: "POST"
                    }).then(function(e, t) {
                        var i = u.cssClasses,
                            o = i.inFavorites,
                            s = i.notInFavorites,
                            a = e.$element;
                        t.status === r.OK ? (a.toggleClass([o, s].join(" ")), e.inFavorites ? n.replaceDataQa(a.get(0), "vacancy-serp__vacancy-mark-favorite_true", "vacancy-serp__vacancy-mark-favorite_false") : (n.replaceDataQa(a.get(0), "vacancy-serp__vacancy-mark-favorite_false", "vacancy-serp__vacancy-mark-favorite_true"), g(e, "vacancyAddedToFavorite", "ok")), e.inFavorites = !e.inFavorites) : t.status === r.ERROR && g(e, t.error_code)
                    }.bind(void 0, t), function() {
                        g(t, "genericError")
                    }).then(function() {
                        m = !1
                    }))
                }
                function g(n, r) {
                    var l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "error";
                    if (!u.disableNotifications) {
                        var c = "limitExceededError" === a[r],
                            d = c && u.trl.allowReplacement,
                            h = a[r] || r,
                            p = e(s.render({
                                message: u.trl[h] || u.trl.genericError,
                                forceRetry: d
                            })),
                            m = t.make(o, i, {
                                content: p,
                                autoClose: !c,
                                type: l
                            });
                        p.on("click", ".HH-VacancyToFavorite-ForceRetry", function() {
                            f(n, !0), m.close()
                        })
                    }
                }
                e(i).on("click", ".HH-VacancyToFavorite", function(t) {
                    var n, i = t.currentTarget,
                        o = e(i),
                        s = o.data(),
                        a = s.id,
                        d = s.inFavorites;
                    if (p[a] || (p[a] = {
                            $element: o,
                            id: a,
                            inFavorites: d
                        }), u.isAnonymous) return n = p[a], void e.ajax({
                        url: l,
                        data: {
                            vacancyId: n.id
                        },
                        type: "post",
                        dataType: "json"
                    }).then(function(e) {
                        e && e.status === r.OK && (window.location.href = c)
                    });
                    f(p[a])
                })
            }
        })
    }), define("HH/Vishnu", ["jquery", "HHC/Components", "Utils/PostMessage", "bloko/common/urlParser"], function(e, t, n, i) {
        return t.build({
            defaults: {
                iframeClass: "vishnu-frame"
            },
            create: function(t, o) {
                var s = e(t),
                    a = "new" === window.globalVars.employerState.toLowerCase(),
                    r = void 0,
                    l = window.location.protocol + "//" + i(window.globalVars.vishnuIframeSrc).host,
                    c = void 0,
                    d = e.Deferred(),
                    h = e("<iframe/>").attr({
                        class: o.iframeClass + " g-hidden",
                        src: window.globalVars.vishnuIframeSrc,
                        id: "ivishnu",
                        "data-qa": "vishnu-iframe",
                        onmousewheel: ""
                    });
                function u(e) {
                    a && r && n.trigger({
                        target: r,
                        origin: l,
                        message: {
                            name: "vishnu.setEntry",
                            data: {
                                entry: e
                            }
                        }
                    })
                }
                h.on("load", d.resolve), n.on({
                    origin: l,
                    handlers: {
                        "vishnu.awaitingInit": function() {
                            d.done(function() {
                                r = h.get(0).contentWindow;
                                var e = {
                                    userId: window.globalVars.cryptedUserId,
                                    userType: window.globalVars.userType,
                                    isUserNew: a,
                                    host: window.location.host,
                                    link: window.location.href
                                };
                                !1 !== o.employerId && (e.employerId = o.employerId), !1 !== o.employerManagerId && (e.employerManagerId = o.employerManagerId), n.trigger({
                                    target: r,
                                    origin: l,
                                    message: {
                                        name: "vishnu.init",
                                        data: e
                                    }
                                })
                            })
                        },
                        "vishnu.ready": function(e) {
                            s.removeClass("g-hidden"), s.on("click", function() {
                                r && (h.removeClass("g-hidden"), n.trigger({
                                    target: r,
                                    origin: l,
                                    message: {
                                        name: "vishnu.open"
                                    }
                                }))
                            }), e.isOpen && h.removeClass("g-hidden")
                        },
                        "vishnu.close": function() {
                            h.addClass("g-hidden")
                        },
                        "vishnu.onShow": function() {
                            a && !c && e.ajax({
                                url: "/shards/employer/approved_field_state",
                                dataType: "json",
                                data: {
                                    employerId: o.employerId
                                }
                            }).then(function(e) {
                                c = !0, u(e)
                            })
                        }
                    }
                }), e(document).on("HH-LogoUpload-LogoSet HH-EmployerDocuments-DocumentUploaded", function(e, t) {
                    u(t)
                }), e(document.body).append(h)
            }
        })
    }), define("HH/VisitedResume", ["jquery", "HHC/Components"], function(e, t) {
        return t.build({
            create: function(t, n) {
                return new function(t, n) {
                    var i = e(document),
                        o = void 0,
                        s = void 0;
                    "new" === n.type ? (o = function() {
                        return !0 === e(this).data("is-new") && !0 === e(this).data("is-mark")
                    }, s = function(t) {
                        if (t.filter(o).length) {
                            var s = e(".HH-VisitedResume-MarkTopicReadTrigger", t);
                            t.removeClass(n.cssClass), t.data("is-new", !1), i.trigger("HH-VisitedResume-ResumeView", {
                                counterName: t.data("counter-name"),
                                additionalCounterName: t.data("additional-counter-name")
                            }), s.length && s.remove()
                        }
                    }) : (o = function() {
                        return !0 !== e(this).data("is-visited")
                    }, s = function(e) {
                        e.filter(o).length && (e.addClass(n.cssClass), e.data("is-visited", !0))
                    });
                    var a = e(".HH-VisitedResume-Item", t).filter(o);
                    function r(e) {
                        a = a.not(e), e.off("click", l)
                    }
                    function l(t) {
                        var n = e(t.delegateTarget);
                        s(n), r(n)
                    }
                    a.on("click", ".HH-VisitedResume-Href", l), e(window).on("storage", function(t) {
                        if ("LastOpenedResume" === t.originalEvent.key && t.originalEvent.newValue !== t.originalEvent.oldValue) {
                            var n = a.filter(function() {
                                return e(this).data("hh-resume-hash") === t.originalEvent.newValue
                            });
                            s(n), r(n)
                        }
                    })
                }(t, n)
            }
        })
    }), define("HH/VisitedResumeStorage", ["jquery", "HHC/Components", "bloko/common/storage/LocalStorageWrapper"], function(e, t, n) {
        return t.build({
            create: function(t, i) {
                return new function(t) {
                    var i = e(t).data("hh-resume-hash");
                    i && n.setItem("LastOpenedResume", i)
                }(t, i)
            }
        })
    }), define("HH/Fingerprint", ["jquery", "fingerprint2", "bloko/common/storage/LocalStorageWrapper"], function(e, t, n) {
        var i = {
            excludeScreenResolution: !0,
            excludeHasLiedResolution: !0
        };
        function o(e, t) {
            var n = [];
            n.push(e), void 0 !== t && n.push("camera=" + t), n.push("userType=" + window.globalVars.userType), n.push("requestId=" + window.globalVars.requestId), n.push("hhid=" + window.globalVars.hhid), (new Image).src = window.location.protocol + "//" + window.location.hostname + "/analytics?" + n.join("&")
        }
        return {
            init: function() {
                var s = e.Deferred(),
                    a = window.globalVars.hhid + "_cameraChecked";
                if ("employer" !== window.globalVars.userType || n.getItem(a)) s.resolve("doNotSend");
                else try {
                    s = navigator.mediaDevices.enumerateDevices()
                } catch (e) {
                    s.resolve("error")
                }
                
            },
            sendFingerprint: o
        }
    }), define("HH/IntruderDetection", ["bloko/common/storage/LocalStorageWrapper", "HHC/Debug"], function(e, t) {
        var n = null !== e.getItem("__gclprv"),
            i = void 0;
        try {
            i = JSON.parse(window.globalVars.features.employer_extensions_to_detect)
        } catch (e) {
            t.log("out error", new Error("Настройка employer_extensions_to_detect не является JSONом"))
        }
        var o = !1;
        for (var s in i)
            if (document.getElementById(i[s]) || document.getElementsByClassName(i[s]).length > 0) {
                o = s;
                break
            }
        function a() {
            var e = [];
            e.push("userType=" + window.globalVars.userType), e.push("requestId=" + window.globalVars.requestId), e.push("hhid=" + window.globalVars.hhid), e.push("storageDetected=" + n), e.push("domElementsDetected=" + o), (new Image).src = "/analytics?" + e.join("&")
        }
        var r = void 0;
        function l(e) {
            var t = !0,
                n = !1,
                s = void 0;
            try {
                for (var l, c = e[Symbol.iterator](); !(t = (l = c.next()).done); t = !0)
                    for (var d = l.value, h = 0; h < d.addedNodes.length; ++h) {
                        var u = d.addedNodes[h];
                        if (u.nodeType === Node.ELEMENT_NODE)
                            for (var p in i)
                                if (u.id === i[p] || u.classList.contains(i[p])) return o = p, a(), void r.disconnect()
                    }
            } catch (e) {
                n = !0, s = e
            } finally {
                try {
                    !t && c.return && c.return()
                } finally {
                    if (n) throw s
                }
            }
        }
        return function() {
            i && (n || o ? a() : (r = new MutationObserver(l)).observe(document.body, {
                childList: !0
            }))
        }
    }), define("HH/SecureAnalytics", ["jquery", "HH/Fingerprint", "HH/IntruderDetection"], function(e, t, n) {
        "employer" === window.globalVars.userType && n();
        var i = e.Deferred(),
            o = e.Deferred(),
            s = window.globalVars.features;
        return !0 === s.fingerprinting_enable && (i = t.init()), !0 === s.secure_portal_enabled && window.requestIdleCallback(function() {
            window.onSecurePortalStarted = function(e) {
                e.setLogin(window.globalVars.login), e.setUserId(window.globalVars.userId), i.then(function(t) {
                    e.setAdditionalParams({
                        fingerprint: t
                    })
                })
            }, window.onSecurePortalFingerprintDone = function(e) {
                t.sendFingerprint("fingerprintSP=" + e), o.resolve(e)
            }, require([window.globalVars.staticHost + "/js/CustomLibs/secureportal.v5.js"])
        }), {
            getFingerprintPromise: function() {
                return i
            },
            getSecurePortalFingerprintPromise: function() {
                return o
            }
        }
    }),
    function() {
        if (window.globalVars.features.sentry_logging) {
            var e = {
                isSupported: !1
            };
            window.bloko && window.bloko.getUserAgentDetails && (e = window.bloko.getUserAgentDetails(window.navigator.userAgent));
            var t, n, i = (t = window.navigator.userAgent.match(/test_host=(\w+)/), n = void 0, t && t[1] && (n = t[1]), {
                isAutotests: !!t,
                standName: n
            });
            if (e.isSupported || i.isAutotests) {
                var o = function(e) {
                        return new RegExp("https?://" + e.replace(/\./g, "\\.") + "/")
                    },
                    s = function() {
                        var e = "__jsErrorsCache",
                            t = void 0;
                        try {
                            t = JSON.parse(window.localStorage.getItem(e))
                        } catch (e) {
                            t = []
                        }
                        return Array.isArray(t) || (t = []), {
                            exists: function(n) {
                                var i = Date.now(),
                                    o = !1;
                                t = t.filter(function(e) {
                                    return !(e.date + 864e5 < i) && (e.message === n && (o = !0), !0)
                                }), o || t.push({
                                    date: i,
                                    message: n
                                });
                                try {
                                    window.localStorage.setItem(e, JSON.stringify(t))
                                } catch (e) {}
                                return o
                            }
                        }
                    }();
                window.Raven.setUserContext({
                    userType: window.globalVars.userType
                }), window.Raven.setExtraContext({
                    requestId: window.globalVars.requestId
                }), window.Raven.config(window.globalVars.sentryDSN, {
                    release: window.globalVars.build,
                    tags: {
                        fromStatic: !0,
                        fromDebug: !1,
                        standName: i.standName
                    },
                    autoBreadcrumbs: !1,
                    instrument: !1,
                    ignoreUrls: [/[\da-f]+\/[\da-f-]+\/main\.js/, /.*akamaihd\.net.+$/, /\/inj_js\/common\.js/],
                    whitelistUrls: [window.globalVars.staticHost, window.location.host, "webpack-internal"],
                    includePaths: [o(window.globalVars.staticHost), o(window.location.host)],
                    ignoreErrors: [/^undefined$/, /^Syntax error$/, /^Неопределенная ошибка\.$/, /^Недопустимый знак$/, /^\[object Event\]$/, /^Script error for/, "'e.data.indexOf' is not a function", "Load timeout for modules:", "__gCrWeb.autofill.extractForms", "HTML Parsing Error: Unable to modify the parent container element before the child element is closed", "Uncaught exception: TypeError: Cannot convert 'd.body' to object", /\bgST\b/, "Node cannot be inserted at the specified point in the hierarchy", "TypeError: 'undefined' is not an object (evaluating 'doc.forms')", "Uncaught exception: TypeError: Cannot convert 'a.mini' to object", "window.zAdv", "backbone in Function.e.Router [as extend]", "Mismatched anonymous define() module", "this._doc.documentElement", "Can't find variable: inf", "SkypeClick2Call", "Синтаксическая ошибка", /Недостаточно памяти для завершения операции[\s\S]+?fingerprint2/],
                    shouldSendCallback: function(e) {
                        if (window.globalVars.blockNextErrorSend) return window.globalVars.blockNextErrorSend = !1, !1;
                        var t = e.exception.values[0],
                            n = t.value,
                            i = e.culprit,
                            o = 0;
                        if (t.stacktrace) {
                            var r = t.stacktrace.frames[t.stacktrace.frames.length - 1];
                            i = r.filename, o = r.lineno
                        }
                        if (s.exists(n + "|" + i + "|" + o)) return !1;
                        if (e.extra) {
                            var l = a(e.extra).length;
                            l > 204800 && (e.extra = {
                                __removed: "Extra data is removed due to exceeding maximum stringified length (" + l + "/204800)"
                            })
                        }
                        return !0
                    },
                    dataCallback: function(e) {
                        return e.culprit === window.location.href && (e.tags.fromStatic = !1), e
                    }
                }).install()
            }
        }
        function a(e, t, n, i) {
            return JSON.stringify(e, function(e, t) {
                var n = [],
                    i = [];
                null == t && (t = function(e, t) {
                    return n[0] === t ? "[Circular ~]" : "[Circular ~." + i.slice(0, n.indexOf(t)).join(".") + "]"
                });
                return function(o, s) {
                    if (n.length > 0) {
                        var a = n.indexOf(this);
                        ~a ? n.splice(a + 1) : n.push(this), ~a ? i.splice(a, 1 / 0, o) : i.push(o), ~n.indexOf(s) && (s = t.call(this, o, s))
                    } else n.push(s);
                    return null == e ? s : e.call(this, o, s)
                }
            }(t, i), n)
        }
    }(), define("HHC/Inline/raven.init", function() {}), define("HHC/Common/xsrf", ["jquery", "bloko/common/Cookies"], function(e, t) {
        var n = ["GET", "HEAD", "OPTIONS", "TRACE"];
        return function() {
            e.ajaxPrefilter(function(e) {
                var i;
                i = e.type, -1 === n.indexOf(i.toUpperCase()) && (e.headers = e.headers || {}, e.headers["X-Xsrftoken"] = t.get("_xsrf"))
            })
        }
    }), define("HHC/Performance", ["jquery"], function(e) {
        var t = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "secureConnectionStart", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"],
            n = {
                url: window.location.pathname,
                report: "timings"
            },
            i = function() {
                window.setTimeout(function() {
                    var i;
                }, 0)
            };
        return {
            add: function(t) {
                return n = e.extend(n, t), this
            },
            send: function() {
                "complete" === document.readyState ? i() : e(window).on("load", i)
            }
        }
    }), define("HHC/Debug/Components", ["jquery", "HHC/Debug"], function(e, t) {
        var n = function() {},
            i = [],
            o = e(),
            s = e(),
            a = "debug-components",
            r = "debug-components__label";
        t.registerLog("components:make", t.viewMods.PRODUCTION, function(e) {
            i.push(e), n(e)
        }), t.registerUtility("components", {
            open: function() {
                var t = function(t) {
                    var n = e("<div>").addClass(r).text(t.name);
                    o = o.add(n);
                    var i = e(t.element);
                    s = s.add(i), i.addClass(a), i.append(n), n.on("click", function() {
                        console.log(t.name, t.params, t.element)
                    })
                };
                i.forEach(t), n = t
            },
            close: function() {
                o.remove(), s.removeClass(a)
            }
        })
    }), define("HHC/Debug/Error", ["HHC/Debug", "bloko/common/supports"], function(e, t) {
        e.registerLog("error", e.viewMods.PRODUCTION, function() {
            for (var e, n = arguments.length, i = Array(n), o = 0; o < n; o++) i[o] = arguments[o];
            i.forEach(function(e, n) {
                e instanceof Error && (t.webkit() && e.stack ? console.error(e.stack) : window.setTimeout(function() {
                    throw window.globalVars.blockNextErrorSend = !0, e
                }, 0), i.splice(n, 1))
            }), 0 !== i.length && (e = console).error.apply(e, i)
        })
    }), define("HHC/Debug/Grid", ["jquery", "HHC/Debug"], function(e, t) {
        var n = e(".HHC-Debug-Grid");
        e(document).on("keyup.grid", function(e) {
            e.ctrlKey && 192 === e.keyCode && n.toggleClass("g-hidden")
        }), t.registerUtility("grid", {
            open: function() {
                n.removeClass("g-hidden")
            },
            close: function() {
                n.addClass("g-hidden")
            }
        })
    }), define("HHC/Debug/Outer", ["require", "HHC/Debug"], function(e, t) {
        t.registerLog("out", t.viewMods.PRODUCTION, function(e, t) {
            window.globalVars.features.sentry_logging && window.Raven.captureException(e instanceof Error ? e : new Error(e), {
                tags: {
                    fromDebug: !0
                },
                extra: t instanceof Object ? t : {}
            })
        })
    }), define("HHC/Debug/Setup", ["HHC/Debug", "HHC/Debug/Components", "HHC/Debug/Error", "HHC/Debug/Grid", "HHC/Debug/Outer"], function(e) {
        return {
            install: e.init.bind(e)
        }
    }), define("HHC/AnchorScroll", ["jquery", "Utils/ScrollToElement"], function(e, t) {
        function n() {
            var n = function() {
                var t = void 0;
                try {
                    t = e(window.location.hash)
                } catch (e) {
                    return null
                }
                if (0 !== t.length) return t;
                return e('a[name="' + window.location.hash.slice(1) + '"]')
            }();
            n && t(n, {
                duration: 0,
                topOffset: 0,
                centered: !1
            })
        }
        return function() {
            e(window).on("hashchange", n), "" !== window.location.hash && (n(), "complete" !== document.readyState && (window.onload = function() {
                window.setTimeout(function() {
                    n()
                }, 0)
            }))
        }
    }), define("HHC/PerformanceObserver", ["axios", "bloko/common/urlParser"], function(e, t) {
        return {
            init: function() {
                var n = ["longtask", "paint"];
                window.globalVars.performanceObserverEnabled && "PerformanceObserver" in window && ("PerformanceLongTaskTiming" in window || "PerformancePaintTiming" in window) && new window.PerformanceObserver(function(i) {
                    i.getEntries().filter(function(e) {
                        return -1 !== n.indexOf(e.entryType) && e.attribution.every(function(e) {
                            return !("taskattribution" === e.entryType && "script" === e.name && "" === e.containerSrc && "" === e.containerId && "" === e.containerName)
                        })
                    }).forEach(function(n) {
                        var i, o = {
                            goal: "PerformanceObserverObject",
                            entryType: n.entryType,
                            duration: n.duration,
                            requestId: window.globalVars.requestId,
                            userId: window.globalVars.userId,
                            containerSrc: (i = t(n.attribution[0].containerSrc), ["hhcdn.ru"].includes(i.hostname) ? i.hostname + i.pathname : i.hostname)
                        };
                        e.post("/performance_stat", JSON.stringify(n.toJSON()), {
                            params: o,
                            headers: {
                                "content-type": "application/json"
                            }
                        })
                    })
                }).observe({
                    entryTypes: n
                })
            }
        }
    }),
    function() {
        var e, t, n;
        if (document.cookie = "GMT=" + (new Date).getTimezoneOffset() / 60 * -1 + ";path=/", window.jsxComponents = window.jsxComponents || {}, e = window.console = window.console || {}, t = function() {}, ["assert", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "time", "timeEnd", "trace", "warn"].forEach(function(n) {
                e[n] = e[n] || t
            }), Array.from || (Array.from = function(e) {
                for (var t = [], n = 0, i = e.length; n < i; n++) t.push(e[n]);
                return t
            }), !("autofocus" in document.createElement("input"))) {
            n = function() {
                window.setTimeout(function() {
                    var e = document.querySelectorAll("[autofocus]");
                    e.length && !window.location.hash && e[e.length - 1].focus()
                }, 10)
            }, document.addEventListener ? document.addEventListener("DOMContentLoaded", n, !1) : document.attachEvent && document.attachEvent("onreadystatechange", function() {
                "complete" === document.readyState && n()
            })
        }
        if (window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || function(e) {
                window.setTimeout(e, 1e3 / 60)
            }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), !Element.prototype.closest) {
            Element.prototype.closest = function(e) {
                if (!document.documentElement.contains(this)) return null;
                if (this.matches(e)) return this;
                for (var t = this.parentElement || this.parentNode; null !== t && 1 === t.nodeType;) {
                    if (t.matches(e)) return t;
                    t = t.parentElement || t.parentNode
                }
                return null
            }
        }
        if ("function" != typeof window.CustomEvent) {
            var i = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = t.bubbles,
                    i = void 0 !== n && n,
                    o = t.cancelable,
                    s = void 0 !== o && o,
                    a = t.detail,
                    r = void 0 === a ? void 0 : a,
                    l = document.createEvent("CustomEvent");
                return l.initCustomEvent(e, i, s, r), l
            };
            i.prototype = window.Event.prototype, window.CustomEvent = i
        }
    }(), define("HHC/Inline/common", function() {}),
    function() {
        var e = window.open;
        window.open = function(t) {
            return (new Image).src = window.location.protocol + "//" + window.location.hostname + "/analytics?windowOpen=" + encodeURI(t), e.apply(this, arguments)
        }
    }(), define("HHC/Inline/windowOpenLogging", function() {}), define("HHC/Common/require.init", ["requireLib"], function(e) {
        var t = e.createNode;
        e.createNode = function(n, i) {
            var o = t.apply(e, arguments);
            return -1 === i.search(/^http/) && -1 === i.search(/^\/\//) && (o.crossOrigin = "anonymous"), o
        }
    }), define("HHC/Init", ["raven.patched", "HHC/Inline/raven.init", "jquery", "HHC/Common/xsrf", "HHC/Components", "HHC/Performance", "HHC/Debug/Setup", "HHC/AnchorScroll", "HHC/Banners", "HHC/PerformanceObserver", "HH/SecureAnalytics", "HHC/Inline/common", "HHC/Inline/windowOpenLogging", "HHC/Common/require.init"], function(e, t, n, i, o, s, a, r, l, c) {
        i(), a.install(), n(function() {
            c.init();
            var e = +new Date;
            window.requestIdleCallback(l.init), o.init(document).always(function() {
                s.add({
                    componentsInitStart: e,
                    componentsInitEnd: +new Date
                }).send(), window.globalVars.autotestsComponentsInitEnd = !0, r()
            })
        })
    }), define("jsxComponents/Hint", ["jquery", "HHC/Components"], function(e, t) {
        return t.build({
            defaults: {
                concatText: !1,
                focusOnFill: !0,
                textFromDataAttr: !1,
                dataAttrName: "hint-body"
            },
            create: function(t, n) {
                return new function(t, n) {
                    this.$element = e(t), this.params = n, this.bindings = {
                        input: "jsxComponents-Hint-Input",
                        item: "jsxComponents-Hint-List-Item"
                    }, this.init = function() {
                        var t = this,
                            n = this.$element.find("." + this.bindings.input);
                        0 === n.length && (n = this.$element.find("input")), this.$element.find("." + this.bindings.item).on("click", function(i) {
                            var o = void 0,
                                s = e(i.currentTarget);
                            o = t.params.textFromDataAttr ? s.data(t.params.dataAttrName) : s.text(), t.params.concatText ? n.val(n.val() + o + "\n") : n.val(o), t.params.focusOnFill && n.focus(), n.trigger("input")
                        })
                    }, this.init(t, n)
                }(t, n)
            }
        })
    }), define("HH/ApplicantRegistration", ["jquery", "HHC/Components", "bloko/common/loadingSetter", "HH/Bloko/Notification"], function(e, t, n, i) {
        var o = void 0;
        return t.build({
            create: function(s, a) {
                var r = s.querySelector(".HH-ApplicantRegistration-Form"),
                    l = e(r),
                    c = new n(s.querySelector(".HH-ApplicantRegistration-FormSubmit")),
                    d = document.createElement("input");
                function h() {
                    t.make(i, s, {
                        content: a.trl.error,
                        autoClose: !0,
                        type: "error"
                    })
                }
                d.type = "hidden", d.name = "ajax", r.appendChild(d), r.addEventListener("submit", function(n) {
                    n.preventDefault(), c.start();
                    var i = l.serialize();
                    e.post({
                        url: r.action,
                        data: i
                    }).then(function(e) {
                        r.classList.contains("HH-ApplicantRegistration-FormSignup") && (o = i), e.redirectURL ? window.location = e.redirectURL : (s.innerHTML = e, t.init(s))
                    }, function() {
                        c.stop(), h()
                    })
                });
                var u = s.querySelector(".HH-ApplicantRegistration-FormCancel");
                function p(t) {
                    t.preventDefault(), e.ajax({
                        url: a.postponedUrl,
                        data: {
                            vacancyId: a.vacancyId
                        },
                        method: "put"
                    }).then(function() {
                        location.href = t.target.href + "&postponed="
                    }, function() {
                        h()
                    })
                }
                u && u.addEventListener("click", function() {
                    e.get({
                        url: a.signUpURL,
                        data: o
                    }).then(function(e) {
                        s.innerHTML = e, t.init(s)
                    }, function() {
                        h()
                    })
                });
                var m = s.querySelector(".HH-ApplicantRegistration-Login");
                m && a.vacancyId && m.addEventListener("click", p);
                var f = s.querySelector(".HH-ApplicantRegistration-SocialIcons");
                f && a.vacancyId && f.addEventListener("click", function(e) {
                    e.target.classList.contains("HH-ApplicantRegistration-Social") && p(e)
                })
            }
        })
    }), require(["HHC/Init"]);
//# sourceMappingURL=501e50de-combined.js.map