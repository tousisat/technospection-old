Fx.Elements = new Class({
    Extends: Fx.CSS,
    initialize: function(t, e) {
        this.elements = this.subject = $$(t), this.parent(e)
    },
    compute: function(t, e, r) {
        var i = {};
        for (var n in t) {
            var s = t[n],
                a = e[n],
                h = i[n] = {};
            for (var o in s) h[o] = this.parent(s[o], a[o], r)
        }
        return i
    },
    set: function(t) {
        for (var e in t)
            if (this.elements[e]) {
                var r = t[e];
                for (var i in r) this.render(this.elements[e], i, r[i], this.options.unit)
            }
        return this
    },
    start: function(t) {
        if (!this.check(t)) return this;
        var e = {},
            r = {};
        for (var i in t)
            if (this.elements[i]) {
                var n = t[i],
                    s = e[i] = {},
                    a = r[i] = {};
                for (var h in n) {
                    var o = this.prepare(this.elements[i], h, n[h]);
                    s[h] = o.from, a[h] = o.to
                }
            }
        return this.parent(e, r)
    }
});
Fx.Slide = new Class({
    Extends: Fx,
    options: {
        mode: "vertical",
        wrapper: !1,
        hideOverflow: !0,
        resetHeight: !1
    },
    initialize: function(t, e) {
        t = this.element = this.subject = document.id(t), this.parent(e), e = this.options;
        var i = t.retrieve("wrapper"),
            s = t.getStyles("margin", "position", "overflow");
        e.hideOverflow && (s = Object.append(s, {
            overflow: "hidden"
        })), e.wrapper && (i = document.id(e.wrapper).setStyles(s)), i || (i = new Element("div", {
            styles: s
        }).wraps(t)), t.store("wrapper", i).setStyle("margin", 0), "visible" == t.getStyle("overflow") && t.setStyle("overflow", "hidden"), this.now = [], this.open = !0, this.wrapper = i, this.addEvent("complete", function() {
            this.open = 0 != i["offset" + this.layout.capitalize()], this.open && this.options.resetHeight && i.setStyle("height", "")
        }, !0)
    },
    vertical: function() {
        this.margin = "margin-top", this.layout = "height", this.offset = this.element.offsetHeight
    },
    horizontal: function() {
        this.margin = "margin-left", this.layout = "width", this.offset = this.element.offsetWidth
    },
    set: function(t) {
        return this.element.setStyle(this.margin, t[0]), this.wrapper.setStyle(this.layout, t[1]), this
    },
    compute: function(t, e, i) {
        return [0, 1].map(function(s) {
            return Fx.compute(t[s], e[s], i)
        })
    },
    start: function(t, e) {
        if (!this.check(t, e)) return this;
        this[e || this.options.mode]();
        var i, s = this.element.getStyle(this.margin).toInt(),
            n = this.wrapper.getStyle(this.layout).toInt(),
            o = [
                [s, n],
                [0, this.offset]
            ],
            r = [
                [s, n],
                [-this.offset, 0]
            ];
        switch (t) {
            case "in":
                i = o;
                break;
            case "out":
                i = r;
                break;
            case "toggle":
                i = 0 == n ? o : r
        }
        return this.parent(i[0], i[1])
    },
    slideIn: function(t) {
        return this.start("in", t)
    },
    slideOut: function(t) {
        return this.start("out", t)
    },
    hide: function(t) {
        return this[t || this.options.mode](), this.open = !1, this.set([-this.offset, 0])
    },
    show: function(t) {
        return this[t || this.options.mode](), this.open = !0, this.set([0, this.offset])
    },
    toggle: function(t) {
        return this.start("toggle", t)
    }
}), Element.Properties.slide = {
    set: function(t) {
        return this.get("slide").cancel().setOptions(t), this
    },
    get: function() {
        var t = this.retrieve("slide");
        return t || (t = new Fx.Slide(this, {
            link: "cancel"
        }), this.store("slide", t)), t
    }
}, Element.implement({
    slide: function(t, e) {
        t = t || "toggle";
        var i, s = this.get("slide");
        switch (t) {
            case "hide":
                s.hide(e);
                break;
            case "show":
                s.show(e);
                break;
            case "toggle":
                var n = this.retrieve("slide:flag", s.open);
                s[n ? "slideOut" : "slideIn"](e), this.store("slide:flag", !n), i = !0;
                break;
            default:
                s.start(t, e)
        }
        return i || this.eliminate("slide:flag"), this
    }
});
Fx.Accordion = new Class({
    Extends: Fx.Elements,
    options: {
        fixedHeight: !1,
        fixedWidth: !1,
        display: 0,
        show: !1,
        height: !0,
        width: !1,
        opacity: !0,
        alwaysHide: !1,
        trigger: "click",
        initialDisplayFx: !0,
        resetHeight: !0,
        keepOpen: !1
    },
    initialize: function() {
        var i = function(i) {
                return null != i
            },
            t = Array.link(arguments, {
                container: Type.isElement,
                options: Type.isObject,
                togglers: i,
                elements: i
            });
        this.parent(t.elements, t.options);
        var e = this.options,
            n = this.togglers = $$(t.togglers);
        this.previous = -1, this.internalChain = new Chain, e.alwaysHide && (this.options.link = "chain"), (e.show || 0 === this.options.show) && (e.display = !1, this.previous = e.show), e.start && (e.display = !1, e.show = !1);
        var s = this.effects = {};
        e.opacity && (s.opacity = "fullOpacity"), e.width && (s.width = e.fixedWidth ? "fullWidth" : "offsetWidth"), e.height && (s.height = e.fixedHeight ? "fullHeight" : "scrollHeight");
        for (var h = 0, r = n.length; h < r; h++) this.addSection(n[h], this.elements[h]);
        this.elements.each(function(i, t) {
            if (e.show === t) this.fireEvent("active", [n[t], i]);
            else
                for (var h in s) i.setStyle(h, 0)
        }, this), (e.display || 0 === e.display || !1 === e.initialDisplayFx) && this.display(e.display, e.initialDisplayFx), !1 !== e.fixedHeight && (e.resetHeight = !1), this.addEvent("complete", this.internalChain.callChain.bind(this.internalChain))
    },
    addSection: function(i, t) {
        i = document.id(i), t = document.id(t), this.togglers.include(i), this.elements.include(t);
        var e = this.togglers,
            n = this.options,
            s = e.contains(i),
            h = e.indexOf(i),
            r = this.display.pass(h, this);
        if (i.store("accordion:display", r).addEvent(n.trigger, r), n.height && t.setStyles({
                "padding-top": 0,
                "border-top": "none",
                "padding-bottom": 0,
                "border-bottom": "none"
            }), n.width && t.setStyles({
                "padding-left": 0,
                "border-left": "none",
                "padding-right": 0,
                "border-right": "none"
            }), t.fullOpacity = 1, n.fixedWidth && (t.fullWidth = n.fixedWidth), n.fixedHeight && (t.fullHeight = n.fixedHeight), t.setStyle("overflow", "hidden"), !s)
            for (var a in this.effects) t.setStyle(a, 0);
        return this
    },
    removeSection: function(i, t) {
        var e = this.togglers,
            n = e.indexOf(i),
            s = this.elements[n],
            h = function() {
                e.erase(i), this.elements.erase(s), this.detach(i)
            }.bind(this);
        return this.now == n || null != t ? this.display(null != t ? t : n - 1 >= 0 ? n - 1 : 0).chain(h) : h(), this
    },
    detach: function(i) {
        var t = function(i) {
            i.removeEvent(this.options.trigger, i.retrieve("accordion:display"))
        }.bind(this);
        return i ? t(i) : this.togglers.each(t), this
    },
    display: function(i, t) {
        if (!this.check(i, t)) return this;
        var e = {},
            n = this.elements,
            s = this.options,
            h = this.effects,
            r = s.keepOpen,
            a = s.alwaysHide;
        if (null == t && (t = !0), "element" == typeOf(i) && (i = n.indexOf(i)), i == this.current && !a && !r) return this;
        if (s.resetHeight) {
            var o = n[this.current];
            if (o && !this.selfHidden)
                for (var l in h) o.setStyle(l, o[h[l]])
        }
        return this.timer && "chain" == s.link ? this : (null != this.current && (this.previous = this.current), this.current = i, this.selfHidden = !1, n.each(function(n, o) {
            var l, d;
            if (e[o] = {}, !r || o == i) {
                for (var c in o == i && (d = n.offsetHeight > 0 && s.height || n.offsetWidth > 0 && s.width), o != i ? l = !0 : (a || r) && d && (l = !0, this.selfHidden = !0), this.fireEvent(l ? "background" : "active", [this.togglers[o], n]), h) e[o][c] = l ? 0 : n[h[c]];
                t || l || !s.resetHeight || (e[o].height = "auto")
            }
        }, this), this.internalChain.clearChain(), this.internalChain.chain(function() {
            if (s.resetHeight && !this.selfHidden) {
                var t = n[i];
                t && t.setStyle("height", "auto")
            }
        }.bind(this)), t ? this.start(e) : this.set(e).internalChain.callChain())
    }
});
var Accordion = new Class({
    Extends: Fx.Accordion,
    initialize: function() {
        this.parent.apply(this, arguments);
        var i = Array.link(arguments, {
            container: Type.isElement
        });
        this.container = i.container
    },
    addSection: function(i, t, e) {
        i = document.id(i), t = document.id(t);
        var n = this.togglers.contains(i),
            s = this.togglers.length;
        return !s || n && !e ? this.container && !n && (i.inject(this.container), t.inject(this.container)) : (e = null != e ? e : s - 1, i.inject(this.togglers[e], "before"), t.inject(i, "after")), this.parent.apply(this, arguments)
    }
});
Element.Properties.csstext = {
    set: function(t) {
        if ("style" == this.get("tag")) {
            this.erase("csstext");
            var e = document.createTextNode(t);
            this.sheet && this.appendChild(e)
        }
        return this
    },
    get: function() {
        if ("style" == this.get("tag")) {
            var t = "";
            return this.sheet && (t = this.innerHTML), t
        }
    },
    erase: function() {
        if ("style" == this.get("tag") && this.sheet && this.firstChild)
            for (; this.firstChild;) this.removeChild(this.firstChild);
        return this
    }
};
! function() {
    var t = {};
    DOMEvent.implement({
        getProperty: function(n) {
            if (t.hasOwnProperty(n)) return t[n]
        },
        setProperty: function(n, e) {
            return setTimeout(function() {
                t[n] = null
            }, 0), t[n] = e
        }
    })
}();
Element.implement({
    isDisplayed: function() {
        return "none" != this.getStyle("display")
    },
    toggle: function() {
        return this[this.isDisplayed() ? "hide" : "show"]()
    },
    hide: function() {
        var t;
        try {
            t = this.getStyle("display")
        } catch (t) {}
        return this.store("originalDisplay", t || "block").setStyle("display", "none")
    },
    show: function(t) {
        return this.setStyle("display", t || this.retrieve("originalDisplay") || "block")
    }
});
Element.implement({
    getElementsOneLevelDeep: function(e) {
        for (var n = new Elements, t = [this]; t.length > 0;) {
            var l = t.shift(),
                r = l.getChildren(e);
            0 == r.length && (t = t.concat(Array.flatten(l.getChildren()))), n.append(r)
        }
        return n
    }
});
Element.implement({
    getParentLimited: function(e, t) {
        t = "number" == typeOf(t) ? t : 10;
        var n = this;
        do {
            n = n.getParent()
        } while (n && !n.match(e) && --t > 0);
        return t ? n : null
    }
});
! function() {
    var t = this.Drag = new Class({
        Implements: [Events, Options],
        options: {
            snap: 6,
            unit: "px",
            grid: !1,
            style: !0,
            limit: !1,
            handle: !1,
            invert: !1,
            unDraggableTags: ["button", "input", "a", "textarea", "select", "option"],
            preventDefault: !1,
            stopPropagation: !1,
            compensateScroll: !1,
            modifiers: {
                x: "left",
                y: "top"
            }
        },
        initialize: function() {
            var e = Array.link(arguments, {
                options: Type.isObject,
                element: function(t) {
                    return null != t
                }
            });
            this.element = document.id(e.element), this.document = this.element.getDocument(), this.setOptions(e.options || {});
            var s, i, n = typeOf(this.options.handle);
            this.handles = ("array" == n || "collection" == n ? $$(this.options.handle) : document.id(this.options.handle)) || this.element, this.mouse = {
                now: {},
                pos: {}
            }, this.value = {
                start: {},
                now: {}
            }, this.offsetParent = (s = this.element, !(i = s.getOffsetParent()) || /^(?:body|html)$/i.test(i.tagName) ? window : document.id(i)), this.selection = "selectstart" in document ? "selectstart" : "mousedown", this.compensateScroll = {
                start: {},
                diff: {},
                last: {}
            }, !("ondragstart" in document) || "FileReader" in window || t.ondragstartFixed || (document.ondragstart = Function.convert(!1), t.ondragstartFixed = !0), this.bound = {
                start: this.start.bind(this),
                check: this.check.bind(this),
                drag: this.drag.bind(this),
                stop: this.stop.bind(this),
                cancel: this.cancel.bind(this),
                eventStop: Function.convert(!1),
                scrollListener: this.scrollListener.bind(this)
            }, this.attach()
        },
        attach: function() {
            return this.handles.addEvent("mousedown", this.bound.start), this.handles.addEvent("touchstart", this.bound.start), this.options.compensateScroll && this.offsetParent.addEvent("scroll", this.bound.scrollListener), this
        },
        detach: function() {
            return this.handles.removeEvent("mousedown", this.bound.start), this.handles.removeEvent("touchstart", this.bound.start), this.options.compensateScroll && this.offsetParent.removeEvent("scroll", this.bound.scrollListener), this
        },
        scrollListener: function() {
            if (this.mouse.start) {
                var t = this.offsetParent.getScroll();
                if ("absolute" == this.element.getStyle("position")) {
                    var e = this.sumValues(t, this.compensateScroll.last, -1);
                    this.mouse.now = this.sumValues(this.mouse.now, e, 1)
                } else this.compensateScroll.diff = this.sumValues(t, this.compensateScroll.start, -1);
                this.offsetParent != window && (this.compensateScroll.diff = this.sumValues(this.compensateScroll.start, t, -1)), this.compensateScroll.last = t, this.render(this.options)
            }
        },
        sumValues: function(t, e, s) {
            var i = {},
                n = this.options;
            for (var o in n.modifiers) n.modifiers[o] && (i[o] = t[o] + e[o] * s);
            return i
        },
        start: function(t) {
            if (!this.options.unDraggableTags.contains(t.target.get("tag"))) {
                var e = this.options;
                if (!t.rightClick) {
                    e.preventDefault && t.preventDefault(), e.stopPropagation && t.stopPropagation(), this.compensateScroll.start = this.compensateScroll.last = this.offsetParent.getScroll(), this.compensateScroll.diff = {
                        x: 0,
                        y: 0
                    }, this.mouse.start = t.page, this.fireEvent("beforeStart", this.element);
                    var s = e.limit;
                    this.limit = {
                        x: [],
                        y: []
                    };
                    var i, n, o = this.offsetParent == window ? null : this.offsetParent;
                    for (i in e.modifiers)
                        if (e.modifiers[i]) {
                            var h = this.element.getStyle(e.modifiers[i]);
                            if (h && !h.match(/px$/) && (n || (n = this.element.getCoordinates(o)), h = n[e.modifiers[i]]), e.style ? this.value.now[i] = (h || 0).toInt() : this.value.now[i] = this.element[e.modifiers[i]], e.invert && (this.value.now[i] *= -1), this.mouse.pos[i] = t.page[i] - this.value.now[i], s && s[i])
                                for (var a = 2; a--;) {
                                    var r = s[i][a];
                                    (r || 0 === r) && (this.limit[i][a] = "function" == typeof r ? r() : r)
                                }
                        }
                    "number" == typeOf(this.options.grid) && (this.options.grid = {
                        x: this.options.grid,
                        y: this.options.grid
                    });
                    var l = {
                        mousemove: this.bound.check,
                        mouseup: this.bound.cancel,
                        touchmove: this.bound.check,
                        touchend: this.bound.cancel
                    };
                    l[this.selection] = this.bound.eventStop, this.document.addEvents(l)
                }
            }
        },
        check: function(t) {
            this.options.preventDefault && t.preventDefault(), Math.round(Math.sqrt(Math.pow(t.page.x - this.mouse.start.x, 2) + Math.pow(t.page.y - this.mouse.start.y, 2))) > this.options.snap && (this.cancel(), this.document.addEvents({
                mousemove: this.bound.drag,
                mouseup: this.bound.stop,
                touchmove: this.bound.drag,
                touchend: this.bound.stop
            }), this.fireEvent("start", [this.element, t]).fireEvent("snap", this.element))
        },
        drag: function(t) {
            var e = this.options;
            e.preventDefault && t.preventDefault(), this.mouse.now = this.sumValues(t.page, this.compensateScroll.diff, -1), this.render(e), this.fireEvent("drag", [this.element, t])
        },
        render: function(t) {
            for (var e in t.modifiers) t.modifiers[e] && (this.value.now[e] = this.mouse.now[e] - this.mouse.pos[e], t.invert && (this.value.now[e] *= -1), t.limit && this.limit[e] && ((this.limit[e][1] || 0 === this.limit[e][1]) && this.value.now[e] > this.limit[e][1] ? this.value.now[e] = this.limit[e][1] : (this.limit[e][0] || 0 === this.limit[e][0]) && this.value.now[e] < this.limit[e][0] && (this.value.now[e] = this.limit[e][0])), t.grid[e] && (this.value.now[e] -= (this.value.now[e] - (this.limit[e][0] || 0)) % t.grid[e]), t.style ? this.element.setStyle(t.modifiers[e], this.value.now[e] + t.unit) : this.element[t.modifiers[e]] = this.value.now[e])
        },
        cancel: function(t) {
            this.document.removeEvents({
                mousemove: this.bound.check,
                mouseup: this.bound.cancel,
                touchmove: this.bound.check,
                touchend: this.bound.cancel
            }), t && (this.document.removeEvent(this.selection, this.bound.eventStop), this.fireEvent("cancel", this.element))
        },
        stop: function(t) {
            var e = {
                mousemove: this.bound.drag,
                mouseup: this.bound.stop,
                touchmove: this.bound.drag,
                touchend: this.bound.stop
            };
            e[this.selection] = this.bound.eventStop, this.document.removeEvents(e), this.mouse.start = null, t && this.fireEvent("complete", [this.element, t])
        }
    })
}(), Element.implement({
    makeResizable: function(t) {
        var e = new Drag(this, Object.merge({
            modifiers: {
                x: "width",
                y: "height"
            }
        }, t));
        return this.store("resizer", e), e.addEvent("drag", function() {
            this.fireEvent("resize", e)
        }.bind(this))
    }
});
! function() {
    Object.extend({
        isEqual: function(t, e) {
            if (t === e) return !0;
            var n = typeOf(t);
            if (n != typeOf(e)) return !1;
            if (t == e) return !0;
            if (!t && e || t && !e) return !1;
            if (t.isEqual) return t.isEqual(e);
            if (e.isEqual) return e.isEqual(t);
            if (t != t && e != e) return !1;
            if ("date" == n) return t.getTime() === e.getTime();
            if ("function" == n) return !0;
            if ("regexp" == n) return t.source === e.source && t.global === e.global && t.ignoreCase === e.ignoreCase && t.multiline === e.multiline;
            if ("object" !== n && "array" !== n) return !1;
            if (t.length && t.length !== e.length) return !1;
            var i = Object.keys(t),
                s = Object.keys(e);
            if (i.length != s.length) return !1;
            for (var r in t)
                if (!(r in e && Object.isEqual(t[r], e[r]))) return !1;
            return !0
        }
    });
    var t, e = !!(t = function() {
        for (var t = ["ms", "O", "Moz", "webkit"], e = document.documentElement.style, n = t.length; n--;) {
            var i = t[n];
            if (void 0 !== e[i + "Transition"]) return i
        }
        return !1
    }()) && {
        transition: t + "Transition",
        transitionProperty: t + "TransitionProperty",
        transitionDuration: t + "TransitionDuration",
        transitionTimingFunction: t + "TransitionTimingFunction",
        transitionend: "Moz" == t ? "transitionend" : ("ms" == t ? "MS" : t) + "TransitionEnd"
    };
    Element.NativeEvents[e.transitionend] = 2, (window.DOMEvent || window.Event).implement({
        getPropertyName: function() {
            return this.event.propertyName
        },
        getElapsedTime: function(t) {
            return t ? this.event.elapsedTime : (1e3 * this.event.elapsedTime).toInt()
        }
    }), Array.implement({
        containsArray: function(t) {
            return t.every(function(t) {
                return this.contains(t)
            }, this)
        }
    });
    var n = {
        linear: "0,0,1,1",
        "expo:in": "0.71,0.01,0.83,0",
        "expo:out": "0.14,1,0.32,0.99",
        "expo:in:out": "0.85,0,0.15,1",
        "circ:in": "0.34,0,0.96,0.23",
        "circ:out": "0,0.5,0.37,0.98",
        "circ:in:out": "0.88,0.1,0.12,0.9",
        "sine:in": "0.22,0.04,0.36,0",
        "sine:out": "0.04,0,0.5,1",
        "sine:in:out": "0.37,0.01,0.63,1",
        "quad:in": "0.14,0.01,0.49,0",
        "quad:out": "0.01,0,0.43,1",
        "quad:in:out": "0.47,0.04,0.53,0.96",
        "cubic:in": "0.35,0,0.65,0",
        "cubic:out": "0.09,0.25,0.24,1",
        "cubic:in:out": "0.66,0,0.34,1",
        "quart:in": "0.69,0,0.76,0.17",
        "quart:out": "0.26,0.96,0.44,1",
        "quart:in:out": "0.76,0,0.24,1",
        "quint:in": "0.64,0,0.78,0",
        "quint:out": "0.22,1,0.35,1",
        "quint:in:out": "0.9,0,0.1,1"
    };
    Fx.CSS3Funcs = {
        initialize: function(t, i) {
            e && ((i = i || {}).transition && n[i.transition] || (i.transition = "sine:in:out"), this.initializeCSS3 && this.initializeCSS3(t, i)), this.parent(t, i)
        },
        startCSS3: function(t, e, n) {
            if (Object.isEqual(e, n)) this.fireEvent("start", this.subject), this.fireEvent("complete", this.subject);
            else {
                this.preTransStyles = this.element.getStyles(Fx.CSS3Funcs.css3Features.transitionProperty, Fx.CSS3Funcs.css3Features.transitionDuration, Fx.CSS3Funcs.css3Features.transitionTimingFunction);
                var i = {};
                t.each(function(t) {
                    i[t] = !1
                }), this.animatingProperties = t, this.boundComplete = function(t) {
                    i[t.getPropertyName()] = !0, Object.every(i, function(t) {
                        return t
                    }) && (this.element.removeEvent(Fx.CSS3Funcs.css3Features.transitionend, this.boundComplete), this.element.setStyles(this.preTransStyles), this.boundComplete = null, this.fireEvent("complete", this.subject), this.callChain() || this.fireEvent("chainComplete", this.subject))
                }.bind(this), this.element.addEvent(Fx.CSS3Funcs.css3Features.transitionend, this.boundComplete);
                var s = function() {
                    var i = {};
                    i[Fx.CSS3Funcs.css3Features.transitionProperty] = t.reduce(function(t, e) {
                        return t + ", " + e
                    }), i[Fx.CSS3Funcs.css3Features.transitionDuration] = (Fx.Durations[this.options.duration] || this.options.duration.toInt() || 500) + "ms", i[Fx.CSS3Funcs.css3Features.transitionTimingFunction] = "cubic-bezier(" + Fx.CSS3Funcs.transitionTimings[this.options.transition] + ")", this.element.setStyles(i), this.set(this.compute(e, n, 1))
                }.bind(this);
                this.element.setStyle(Fx.CSS3Funcs.css3Features.transitionProperty, "none"), this.set(this.compute(e, n, 0)), s.delay(.1), this.fireEvent("start", this.subject)
            }
            return this
        },
        pause: function() {
            return this.css3Supported ? this : this.parent()
        },
        resume: function() {
            return this.css3Supported ? this : this.parent()
        },
        isRunning: function() {
            return this.css3Supported ? !!this.boundComplete : this.parent()
        }
    }, Fx.CSS3Funcs.css3Features = e, Fx.CSS3Funcs.transitionTimings = n, Fx.CSS3Funcs.animatable = ["background-color", "border-bottom-width", "border-left-width", "border-right-width", "border-spacing", "border-top-width", "border-width", "bottom", "color", "font-size", "font-weight", "height", "left", "letter-spacing", "line-height", "margin-bottom", "margin-left", "margin-right", "margin-top", "max-height", "max-width", "min-height", "min-width", "opacity", "outline-color", "outline-offset", "outline-width", "padding-bottom", "padding-left", "padding-right", "padding-top", "right", "text-indent", "top", "vertical-align", "visibility", "width", "word-spacing", "z-index"], Fx.CSS3Stop = {
        cancel: function() {
            return this.css3Supported ? (this.isRunning() && (this.element.removeEvent(Fx.CSS3Funcs.css3Features.transitionend, this.boundComplete), this.element.setStyles(this.preTransStyles), this.boundComplete = null, this.fireEvent("cancel", this.subject), this.clearChain()), this) : this.parent()
        },
        stop: function() {
            return this.css3Supported ? (this.isRunning() && (this.element.removeEvent(Fx.CSS3Funcs.css3Features.transitionend, this.boundComplete), this.element.setStyles(this.preTransStyles), this.boundComplete = null, this.fireEvent("complete", this.subject), this.callChain() || this.fireEvent("chainComplete", this.subject)), this) : this.parent()
        }
    }
}(),
function() {
    var t, e = Fx.Tween;
    (t = new Class({
        Extends: e,
        checkCSS3: function(t) {
            return Fx.CSS3Funcs.css3Features && Fx.CSS3Funcs.animatable.contains(t)
        },
        start: function(t, e, n) {
            var i = Array.flatten(arguments);
            if (this.property = this.options.property || i.shift(), this.css3Supported = this.checkCSS3(this.property)) {
                if (!this.check(t, e, n)) return this;
                var s = this.prepare(this.element, this.property, i);
                return this.startCSS3([this.property], s.from, s.to)
            }
            return this.parent(t, e, n)
        }
    })).implement(Fx.CSS3Funcs), t.implement(Fx.CSS3Stop), Fx.Tween.CSS2 = e, Fx.Tween.CSS3 = t
}(),
function() {
    var t, e = Fx.Morph;
    (t = new Class({
        Extends: e,
        checkCSS3: function(t) {
            return Fx.CSS3Funcs.css3Features && Fx.CSS3Funcs.animatable.containsArray(Object.keys(t))
        },
        start: function(t) {
            if (this.css3Supported = this.checkCSS3(t)) {
                if (!this.check(t)) return this;
                "string" == typeof t && (t = this.search(t));
                var e = {},
                    n = {},
                    i = [];
                for (var s in t) {
                    var r = this.prepare(this.element, s, t[s]);
                    Object.isEqual(r.from, r.to) || (e[s] = r.from, n[s] = r.to, i.push(s))
                }
                return this.startCSS3(i, e, n)
            }
            return this.parent(t)
        }
    })).implement(Fx.CSS3Funcs), t.implement(Fx.CSS3Stop), Fx.Morph.CSS2 = e, Fx.Morph.CSS3 = t
}(),
function() {
    if (Fx.Elements) {
        var t, e = Fx.Elements;
        (t = new Class({
            Extends: e,
            initializeCSS3: function(t, e) {
                this.morphers = t.map(function(t) {
                    return new Fx.Morph(t, Object.merge({}, e, {
                        onComplete: this._complete.bind(this),
                        onCancel: this._cancel.bind(this)
                    }))
                }.bind(this))
            },
            _complete: function() {
                0 == --this.count && (this.fireEvent("complete", this.subject), this.callChain() || this.fireEvent("chainComplete", this.subject))
            },
            _cancel: function() {
                0 == --this.count && (this.fireEvent("cancel", this.subject), this.clearChain())
            },
            checkCSS3: function(t) {
                return Fx.CSS3Funcs.css3Features && Object.every(t, function(t, e) {
                    return !t || !this.elements[e] || Fx.CSS3Funcs.animatable.containsArray(Object.keys(t))
                }, this)
            },
            count: 0,
            start: function(t) {
                return (this.css3Supported = this.checkCSS3(t)) ? this.check(t) ? (this.count = 0, Object.each(t, function(t, e) {
                    t && this.elements[e] && (this.count++, this.morphers[e].start(t))
                }, this), this.fireEvent("start", this), this) : this : this.parent(t)
            },
            stop: function() {
                return this.css3Supported ? (Object.each(this.morphers, function(t) {
                    t.stop()
                }), this) : this.parent()
            },
            cancel: function() {
                return this.css3Supported ? (Object.each(this.morphers, function(t) {
                    t.cancel()
                }), this) : this.parent()
            },
            isRunning: function() {
                return this.css3Supported ? 0 != this.count : this.parent()
            }
        })).implement(Fx.CSS3Funcs), Fx.Elements.CSS2 = e, Fx.Elements.CSS3 = t
    }
}(), Element.Properties.tweenCSS3 = {
    set: function(t) {
        return this.get("tweenCSS3").cancel().setOptions(t), this
    },
    get: function() {
        var t = this.retrieve("tweenCSS3");
        return t || (t = new Fx.Tween.CSS3(this, {
            link: "cancel"
        }), this.store("tweenCSS3", t)), t
    }
}, Element.Properties.morphCSS3 = {
    set: function(t) {
        return this.get("morphCSS3").cancel().setOptions(t), this
    },
    get: function() {
        var t = this.retrieve("morphCSS3");
        return t || (t = new Fx.Morph.CSS3(this, {
            link: "cancel"
        }), this.store("morphCSS3", t)), t
    }
}, Element.implement({
    tweenCSS3: function(t, e, n) {
        return this.get("tweenCSS3").start(t, e, n), this
    },
    morphCSS3: function(t) {
        return this.get("morphCSS3").start(t), this
    }
});
SK.Singletons = SK.Singletons || {}, SK.Singletons.tooltips_registry = {
    active: [],
    markAsVisible: function(i) {
        this.active.include(i)
    },
    markAsInvisible: function(i) {
        this.active.erase(i)
    },
    hideAll: function() {
        Array.each(this.active, function(i) {
            i.hide(0)
        }, this), this.active.empty()
    },
    getAll: function() {
        return this.active.slice()
    }
};
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Tooltip = new Class({
    Implements: [Options, Events],
    options: {
        orientation: "vertical",
        text: null,
        class_name: null,
        show_delay: 666,
        hide_delay: 300,
        close_delay: 2400,
        fade_duration: 300,
        scroll_containers: [window],
        events: {
            show: "mouseenter",
            hide: "mouseleave"
        },
        on_cursor_move: !1,
        cursor_offset: 10,
        show_on_init: !1,
        position: "after",
        hide_on_click: !0
    },
    font_url: "//fonts.googleapis.com/css?family=Lato:300&subset=latin,latin-ext",
    link_element: null,
    element: null,
    element_title: null,
    tooltip: null,
    tooltip_class: "sk-tooltips",
    tooltip_tail: null,
    events_fn: {},
    fx: null,
    interval: null,
    is_created: !1,
    is_shown: !1,
    is_disabled: !1,
    is_hide_disabled: !1,
    initialize: function(t, i) {
        this.element = t, this.setOptions(i), this.removeTitle(), this.setupEvents()
    },
    init: function(t) {
        SK.Singletons.tooltips_registry.hideAll(), this.is_created || (this.create(), this.createFx()), SK.Singletons.tooltips_registry.markAsVisible(this), clearTimeout(this.interval), this.interval = this.show.delay(this.options.show_delay, this, t)
    },
    setupEvents: function() {
        null == this.element_title && null == this.options.text || (1 == this.options.on_cursor_move && "mousemove" == this.options.events.show ? this.events_fn[this.options.events.show] = function(t) {
            if (this.is_shown) {
                var i = _$(this.tooltip).getCoordinates(),
                    e = t.page;
                e.y >= i.top - 75 && e.x <= i.right + 75 && e.y <= i.bottom + 75 && e.x >= i.left - 75 || this.hide()
            } else this.init(t.page)
        }.bind(this) : this.events_fn[this.options.events.show] = this.init.pass([], this), this.events_fn[this.options.events.hide] = function() {
            clearTimeout(this.interval), this.interval = this.hide.delay(this.options.hide_delay, this)
        }.bind(this), this.element.addEvent(this.options.events.show, this.events_fn[this.options.events.show]), this.element.addEvent(this.options.events.hide, this.events_fn[this.options.events.hide]), this.options.hide_on_click ? this.element.addEvent("click", function() {
            clearTimeout(this.interval), this.hide()
        }.bind(this)) : (this.element.addEvent("click", function() {
            this.is_hide_disabled = !0
        }.bind(this)), document.body.addEvent("click", function(t) {
            this.is_hide_disabled && !this.element.contains(t.target) && (clearTimeout(this.interval), this.is_hide_disabled = !1, this.hide())
        }.bind(this))), this.options.show_on_init && this.init())
    },
    create: function() {
        SK.RequestCSS(this.font_url), this.tooltip = new Element("div", {
            class: this.tooltip_class,
            role: "tooltip"
        }).inject(document.body, "bottom"), this.options.class_name && this.tooltip.addClass(this.options.class_name), this.tooltip_content = new Element("p", {
            html: this.options.text || this.element_title
        }).inject(this.tooltip, "bottom"), this.tooltip_tail = new Element("span", {
            class: this.tooltip_class + "-tail"
        }).inject(this.tooltip, "bottom"), this.tooltip.addEvent(this.options.events.show, function() {
            clearTimeout(this.interval), this.interval = this.hide.delay(this.options.close_delay, this)
        }.bind(this)), this.tooltip.addEvent(this.options.events.hide, function() {
            clearTimeout(this.interval), this.interval = this.hide.delay(this.options.hide_delay, this)
        }.bind(this)), !this.options.on_cursor_move && Array.each(this.options.scroll_containers, function(t) {
            _$(t) && _$(t).addEvent("scroll", function() {
                var i = _$(t).getCoordinates(),
                    e = this.element.getCoordinates();
                this.is_shown && this.calculatePosition(), (e.bottom < i.top || e.top > e.bottom) && this.hide()
            }.bind(this))
        }, this), this.is_created = !0
    },
    createFx: function() {
        this.fx = new Fx.Tween.CSS3(this.tooltip, {
            duration: this.options.fade_duration,
            property: "opacity"
        })
    },
    calculatePosition: function(t) {
        this.options.on_cursor_move ? this.drawByCursor(t) : this.drawByElement()
    },
    drawByCursor: function(t) {
        var i = window.getCoordinates(),
            e = this.tooltip.getSize(),
            s = {
                left: t.x + this.options.cursor_offset,
                top: t.y + this.options.cursor_offset
            };
        s.left + e.x > i.right ? this.tooltip.setStyles({
            top: s.top,
            left: s.left - e.x
        }) : s.top + e.y > i.height ? this.tooltip.setStyles({
            top: s.top - e.y,
            left: s.left
        }) : this.tooltip.setStyles(s)
    },
    drawByElement: function() {
        var t = window.getCoordinates(),
            i = this.element.getCoordinates(),
            e = this.element.getBoundingClientRect(),
            s = this.tooltip.getSize();
        if (!i.height) {
            var o = this.element.style.cssText;
            this.element.setStyles({
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }), i = this.element.getCoordinates(), e = this.element.getBoundingClientRect(), this.element.style.cssText = o
        }
        "fixed" === this.element.getStyle("position") && this.tooltip.setStyle("position", "fixed"), "vertical" == this.options.orientation ? (e.bottom + s.y > t.height || "before" == this.options.position ? (this.tooltip.removeClass("bottom ").addClass("top"), this.tooltip.setStyle("top", i.top - s.y)) : (this.tooltip.removeClass("top").addClass("bottom"), this.tooltip.setStyle("top", i.bottom)), e.left - s.x / 2 < t.left ? (this.tooltip.setStyles({
            left: i.left,
            right: "auto"
        }), i.width <= s.x && this.tooltip_tail.setStyles({
            left: i.width / 2,
            right: "auto"
        })) : e.right + s.x / 2 > t.right && i.width <= s.x ? (this.tooltip.setStyles({
            left: "auto",
            right: t.right - i.right
        }), this.tooltip_tail.setStyles({
            left: "auto",
            right: i.width / 2
        })) : this.tooltip.setStyles({
            left: i.left - s.x / 2 + i.width / 2,
            right: "auto"
        })) : (e.right + s.x > t.width ? (this.tooltip.removeClass("left").addClass("right"), this.tooltip.setStyle("right", t.right - e.right + i.width)) : (this.tooltip.removeClass("right").addClass("left"), this.tooltip.setStyle("left", i.right)), e.top + s.y / 2 > t.height ? (this.tooltip.setStyle("top", i.bottom - s.y), this.tooltip_tail.setStyles({
            top: "auto",
            bottom: i.height / 2
        })) : (this.tooltip.setStyle("top", i.top - s.y / 2 + i.height / 2), this.tooltip_tail.setStyles({
            top: "50%",
            bottom: "auto"
        })))
    },
    show: function(t) {
        this.is_shown || this.is_disabled || (this.tooltip.setStyles({
            left: "auto",
            right: "auto",
            display: "block"
        }), this.calculatePosition(t), this.fx.cancel(), this.fx.removeEvents(), this.fx.start(1), this.is_shown = !0, this.fireEvent("show"))
    },
    hide: function(t) {
        this.is_hide_disabled || (clearTimeout(this.interval), this.is_shown && (t = "null" == typeOf(t) ? this.options.fade_duration : t, SK.Singletons.tooltips_registry.markAsInvisible(this), this.fx.cancel(), this.fx.setOptions({
            duration: t
        }), this.fx.removeEvents(), this.fx.addEvent("complete", function() {
            this.setStyle("display", "none")
        }.bind(this.tooltip)), this.fx.start(0), this.is_shown = !1, this.fireEvent("hide")))
    },
    destroy: function() {
        this.is_created && (this.is_created && this.tooltip.dispose(), _$(this.element).removeEvent(this.options.events.show, this.events_fn[this.options.events.show]), _$(this.element).removeEvent(this.options.events.hide, this.events_fn[this.options.events.hide]), this.restoreTitle(), this.is_created = !1)
    },
    enable: function() {
        this.removeTitle(), this.is_disabled = !1
    },
    disable: function() {
        this.restoreTitle(), this.is_disabled = !0
    },
    removeTitle: function() {
        this.element.get("title") && (this.element_title = this.element.get("title"), this.element.removeProperty("title"))
    },
    restoreTitle: function() {
        this.element_title && this.element.set("title", this.element_title)
    },
    updateContent: function(t) {
        this.tooltip_content.innerHTML = t
    },
    setText: function(t) {
        this.tooltip_content && (this.tooltip_content.set("text", t), this.removeTitle())
    }
});
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Tooltips = new Class({
    Implements: [Options, Events],
    elements: null,
    options: null,
    tooltips: [],
    initialize: function(t, i) {
        this.setOptions(i), "string" == typeOf(t) ? this.elements = $$(t) : this.elements = t, this.initTooltips()
    },
    initTooltips: function() {
        if ("object" == typeOf(this.options)) Array.each(this.elements, function(t, i) {
            this.tooltips.include(new SK.UI.Tooltip(t, this.options))
        }, this);
        else
            for (var t = 0; t < this.elements.length; t++) this.tooltips.include(new SK.UI.Tooltip(this.elements[t], this.options[t]))
    },
    hide: function() {
        Array.each(this.tooltips, function(t) {
            t.hide()
        })
    },
    enable: function() {
        Array.each(this.tooltips, function(t) {
            t.enable()
        })
    },
    disable: function() {
        Array.each(this.tooltips, function(t) {
            t.disable()
        })
    },
    destroy: function() {
        Array.each(this.tooltips, function(t) {
            t.destroy()
        })
    }
});
SK = "undefined" == typeof SK ? {} : SK, SK.Singletons = SK.Singletons || {},
    function() {
        if (void 0 === this.Promise || /electron/i.test((this.navigator || {}).userAgent)) {
            var e = this.Promise = function(e) {
                this.complete = !1, this.success = !1, this.value = void 0, this.callbacks = [], e(this.onSuccess.bind(this), this.onComplete.bind(this))
            };
            e.prototype = {
                constructor: e,
                onComplete: function(e) {
                    this.complete = !0, this.value = e, this.executeCallbacks()
                },
                onSuccess: function() {
                    this.success = !0, this.onComplete.apply(this, arguments)
                },
                then: function(e, s) {
                    return this.callbacks.push({
                        success: e,
                        failure: s
                    }), this.executeCallbacks(), this
                },
                executeCallbacks: function() {
                    if (this.complete)
                        for (var e, s = this.success ? "success" : "failure"; e = this.callbacks.shift();) this.executeCallback(e[s], this.value)
                },
                executeCallback: function(e, s) {
                    setTimeout(function() {
                        e(s)
                    }, 0)
                }
            }
        }
    }(), SK.Singletons.domreadypromise = SK.Singletons.domreadypromise || new Promise(function(e, s) {
        window && window.addEvent("domready", e)
    }), SK.Singletons.loadpromise = SK.Singletons.loadpromise || new Promise(function(e, s) {
        window && window.addEvent("load", e)
    });
var THE_PAGE_IS_LOADED = !1,
    ONLOAD_FUNCTIONS = new Array;

function Goto(form_name, tmpl, pairs_to_set) {
    var form = document.forms[form_name];
    if (form.template.value = tmpl, void 0 !== form.news_id && (form.news_id.value = ""), void 0 !== pairs_to_set)
        for (var array = pairs_to_set.split("&"), i = 0; i < array.length; i++) {
            var pair = array[i].split("="),
                obj = eval("form." + pair[0]);
            void 0 !== obj && (obj.value = pair[1])
        } - 1 != form.action.indexOf("javascript:Goto") && (form.action = tmpl), form.submit()
}

function GotoEx(e, o, t) {
    e.Goto(o, t)
}

function Trim(e) {
    return e = (e = e.replace(/^\s*/, "")).replace(/\s*$/, "")
}

function IsValidInteger(e) {
    return (e = Trim(e)).length > 0 && IsValid(e, "0123456789-")
}

function IsValidNatural(e) {
    return (e = Trim(e)).length > 0 && 0 != e.indexOf("0") && IsValid(e, "1234567890")
}

function IsValidReal(e) {
    return (e = Trim(e)).length > 0 && IsValid(e, "0123456789.-")
}

function IsValid(e, o) {
    for (var t = 0; t < e.length; t++)
        if (-1 == o.indexOf(e.charAt(t))) return !1;
    return !0
}

function IsValidIdentifier(e) {
    return IsValid(e = Trim(e), "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890-_")
}

function IsValidEmail(e) {
    return /^[a-z0-9]([a-z0-9_\-\.]*)@([a-z0-9_\-\.]+)(\.[a-z]{2,6}(\.[a-z]{2,6}){0,2})$/i.test(e)
}

function IsValidSQLDate(e) {
    var o = (e = Trim(e)).split(" "),
        t = o.length > 1 ? o[1] : "",
        a = o.length > 0 ? o[0] : "";
    if ("" == a) return !1;
    if ("" != t) {
        var i = t.split(/:/);
        if (3 != i.length) return !1;
        if (!("" != i[0] && i[0] >= 0 && i[0] <= 23 && "" != i[1] && i[1] >= 0 && i[1] <= 59 && "" != i[2] && i[2] >= 0 && i[2] <= 59)) return !1
    }
    var n = a.split(/-/);
    if (3 != n.length) return !1;
    var r = new Date(n[0], n[1] - 1, n[2]);
    return n[0] == r.getFullYear() && n[1] == r.getMonth() + 1 && n[2] == r.getDate()
}

function SKPopup(e, o, t, a) {
    SKPopupHandle(e, o, t, a)
}

function SKPopupHandle(e, o, t, a) {
    var i = screen.width / 2 - o / 2,
        n = screen.height / 2 - t / 2,
        r = "OpenedPopupWindow" + o + t,
        l = "yes",
        s = "yes",
        d = "no",
        c = "no",
        u = "no",
        p = "no",
        m = "no";
    void 0 !== a && (void 0 !== a.resizable && (l = a.resizable), void 0 !== a.scrollbars && (s = a.scrollbars), void 0 !== a.left && (i = a.left), void 0 !== a.top && (n = a.top), void 0 !== a.name && (r = a.name), void 0 !== a.status && (d = a.status), void 0 !== a.toolbar && (c = a.toolbar), void 0 !== a.modal && (p = a.modal), void 0 !== a.menubar && (u = a.menubar), void 0 !== a.location && (m = a.location));
    a = "left=" + i + ",top=" + n + ",width=" + o + ",height=" + t + ",resizable=" + l + ",scrollbars=" + s + ",toolbar=" + c + ",menubar=" + u + ",location=" + m + ",modal=" + p + ",status=" + d;
    try {
        document.body.style.cursor = "wait";
        var f = window.open(e, r, a);
        return f ? f.focus() : AlertSystemMessage('<h2>Veuillez activer les fenêtres contextuelles</h2>\n<font class="plain">Votre navigateur est configuré pour bloquer les fenêtres en incrustation ou une application de blocage de fenêtres en incrustation tierce est installée. Pour pouvoir administrer votre site, veuillez activer les fenêtres en incrustation.<br><div class="popupBlockerImage">&nbsp;</div></font>'), document.body.style.cursor = "default", f
    } catch (e) {
        return document.body.style.cursor = "default", null
    }
}

function AreCookiesEnabled() {
    var e = "TestingIfCookiesAreEnabled=TestValue";
    return document.cookie = e, -1 != document.cookie.indexOf(e) && (document.cookie = e + "Expires: ; expires=Thu, 01-Jan-70 00:00:01 GMT", !0)
}

function AlertNotEnabledCookiesMessage() {
    AlertSystemMessage('<h2>Vos témoins sont désactivés</h2>\n<font class="plain">Les témoins temporaires ne sont pas autorisés avec les paramètres de votre navigateur. Pour permettre d\u0027administrer votre site Web, veuillez autoriser les témoins.</font>')
}

function AlertSystemMessage(e) {
    var o = document.createElement("div");
    o.setAttribute("class", "SystemAlertPlaceholder"), o.className = "SystemAlertPlaceholder", o.id = "SystemAlertPlaceholderID", o.setAttribute("id", "SystemAlertPlaceholderID"), o.innerHTML = '<div class="content"><div class="text">' + e + '<div class="break"></div><a href="javascript:{}" class="plain" onclick="document.body.removeChild(document.getElementById(\'SystemAlertPlaceholderID\'));">Masquer ce message</a><br></div></div><div class="bl"></div><div class="bm"></div><div class="br"></div>', document.body.appendChild(o)
}

function RefreshCachedImages() {}

function LoginToEdit(e, o, t) {
    var a = new Array;
    a.resizable = "no", a.scrollbars = "no", void 0 !== t && "" != t || (t = document.location.pathname), SKPopup(o + "?template_path=" + escape(t) + "&domain=" + document.location.host + "&target_window=top.opener&login=" + e, 300, 200, a)
}

function ExecuteOnLoadFunctions() {
    THE_PAGE_IS_LOADED = !0;
    for (var i = 0; i < ONLOAD_FUNCTIONS.length; i++) "function" == typeof ONLOAD_FUNCTIONS[i] ? ONLOAD_FUNCTIONS[i]() : eval(ONLOAD_FUNCTIONS[i])
}

function IsPageLoaded() {
    return THE_PAGE_IS_LOADED
}

function FixURL(e) {
    return -1 == (e = (e = (e = (e = Trim(e)).replace(/\"/g, escape('"'))).replace(/\'/g, escape("'"))).replace(/ /g, escape(" "))).toLowerCase().indexOf("://") && 0 != e.toLowerCase().indexOf("mailto:") ? -1 != e.indexOf("@") && -1 != e.indexOf(".") ? "mailto:" + e : "http://" + e : e
}

function ScrollTop() {
    window.scrollTo(0, 0)
}

function GetCurrentLocationFileName() {
    var e = document.location.pathname;
    return e.substring(e.lastIndexOf("/") + 1, e.length)
}
var NN_4 = document.layers ? 1 : 0,
    IE = document.all ? 1 : 0,
    NN_6 = !document.all && document.getElementById ? 1 : 0,
    VISIBLE = NN_4 ? "show" : "visible",
    HIDDEN = NN_4 ? "hide" : "hidden",
    DISPLAY_ON = "block",
    DISPLAY_OFF = "none",
    LAYER__IS_NETSCAPE = -1 == navigator.appName.indexOf("Explorer"),
    LAYER__NETSCAPE_TIME_PATCH_COEFFICIENT = 0,
    inited_mouse_actions = !1,
    LAYERS_HASH = {},
    old_mouse_pos = new Object;
old_mouse_pos.left = 0, old_mouse_pos.top = 0;
var allow_default_dragging = !1,
    default_mousedown = null,
    default_mousemove = null,
    default_mouseup = null;

function Layer(e) {
    return NN_4 = document.layers ? 1 : 0, IE = document.all ? 1 : 0, NN_6 = !document.all && document.getElementById ? 1 : 0, void 0 === LAYERS_HASH && (LAYERS_HASH = new Array), this.LayerName = e, this.Layer = Layer__GetLayerObj(e), this.LayerStyle = Layer__GetLayerObjStyle(e), this.Draggable = !1, void 0 === this.Layer || void 0 === this.LayerStyle ? (this.Success = !1, null) : (this.SetPosition = Layer__SetLayerPosition, this.GetPosition = Layer__GetLayerPosition, this.SetVisible = Layer__SetLayerVisible, this.IsVisible = Layer__IsLayerVisible, this.SetDisplay = Layer__SetLayerDisplay, this.Move = Layer__Move, this.GetDimentions = IE || NN_6 ? Layer__GetLayerDimentions : Layer__GetLayerDimentions_NN, this.SetDimentions = IE || NN_6 ? Layer__SetLayerDimentions : Layer__SetLayerDimentions_NN, this.HTML = IE || NN_6 ? Layer__HTML : Layer__HTML_NN, this.DocumentMargins = IE || NN_6 ? Layer__GetDocumentMargins : Layer__GetDocumentMargins_NN, this.Document = IE ? document : NN_6 ? document : this.Layer.document, this.InitDrag = Layer__InitDrag, this.ReleaseDrag = Layer__ReleaseDrag, this.Maximize = Layer__Maximize, this.Center = Layer__Center, this.DocumentMargins(), LAYERS_HASH[this.LayerName] = this, this.Success = !0, this)
}

function Layer__DefaultDragging(e, t, i) {
    default_mousedown = e, default_mousemove = t, default_mouseup = i, allow_default_dragging = !0
}

function Layer__AllowDefaultDragging() {
    allow_default_dragging = !0
}

function Layer__ForbidDefaultDragging() {
    allow_default_dragging = !1
}

function Layer__GetLayerObj(e, t) {
    var i;
    if (NN_6 || IE) i = document.getElementById(e);
    else if (NN_4) {
        i = (void 0 !== t ? document.layers[t].document : document).layers[e]
    }
    return i
}

function Layer__GetLayerObjStyle(e, t) {
    var i = Layer__GetLayerObj(e, t);
    if (i) return NN_6 ? i = i.style : IE && (i = i.style), i
}

function Layer__SetLayerPosition(e, t) {
    this.LayerStyle.left = e + (-1 == (e + "").indexOf("px") ? "px" : ""), this.LayerStyle.top = t + (-1 == (t + "").indexOf("px") ? "px" : "")
}

function Layer__GetLayerPosition() {
    var e = new Object;
    return e.left = parseInt(this.LayerStyle.left), e.top = parseInt(this.LayerStyle.top), e
}

function Layer__SetLayerDimentions(e, t) {
    this.LayerStyle.width = e + (-1 == (e + "").indexOf("px") ? "px" : ""), this.LayerStyle.height = t + (-1 == (t + "").indexOf("px") ? "px" : "")
}

function Layer__SetLayerDimentions_NN(e, t) {
    this.LayerStyle.clip.width = e + (-1 == (e + "").indexOf("px") ? "px" : ""), this.LayerStyle.clip.height = t + (-1 == (t + "").indexOf("px") ? "px" : "")
}

function Layer__GetLayerDimentions() {
    var e = this.GetPosition();
    return e.width = parseInt(this.LayerStyle.width), e.height = parseInt(this.LayerStyle.height), e
}

function Layer__GetLayerDimentions_NN() {
    var e = this.GetPosition();
    return e.width = parseInt(this.LayerStyle.clip.width), e.height = parseInt(this.LayerStyle.clip.height), e
}

function Layer__Move(e, t, i, n, o, a, r) {
    var _ = void 0 === r ? this : new Layer(r);
    if (e != i || t != n) {
        void 0 === a && (a = 1);
        var s = __Layer__Sign(e, i),
            l = __Layer__Sign(t, n),
            y = __Layer__Distance(e, i),
            L = __Layer__Distance(t, n),
            u = 1,
            h = 1;
        y > L ? 0 == L ? (h = 0, u = 1) : (h = 1, u = Math.floor(y / L)) : 0 == y ? (h = 1, u = 0) : (h = Math.floor(L / y), u = 1), e != i && (e += a * s * u + LAYER__NETSCAPE_TIME_PATCH_COEFFICIENT), t != n && (t += a * l * h), _.SetPosition(e, t);
        var d = __Layer__Sign(e, i),
            S = __Layer__Sign(t, n);
        if (!(s * d <= 0 && l * S <= 0)) {
            var c = void 0 === r ? this.LayerName : r;
            o > 0 ? window.setTimeout("Layer__Move(" + e + ", " + t + ", " + i + ", " + n + ", " + o + ", " + a + ', "' + c + '")', o) : Layer__Move(e, t, i, n, 0, a, c)
        }
    } else _.SetPosition(e, t)
}

function __Layer__Distance(e, t) {
    return e > 0 && t > 0 ? Math.abs(t - e) : Math.abs(e) + Math.abs(t)
}

function __Layer__Sign(e, t) {
    return e < t ? 1 : e == t ? 0 : -1
}

function Layer__SetLayerVisible(e) {
    this.LayerStyle.visibility = e ? VISIBLE : HIDDEN
}

function Layer__IsLayerVisible() {
    return this.LayerStyle.visibility == VISIBLE
}

function Layer__SetLayerDisplay(e) {
    this.LayerStyle.display = e ? DISPLAY_ON : DISPLAY_OFF
}

function Layer__HTML(e) {
    this.Layer.innerHTML = e
}

function Layer__HTML_NN(e) {
    this.Document.open(), this.Document.write(e), this.Document.close()
}

function Layer__GetDocumentMargins() {
    var e = document.body;
    document.documentElement && "BackCompat" != document.compatMode && (e = document.documentElement), this.ScrollLeft = parseInt(e.scrollLeft), this.ScrollTop = parseInt(e.scrollTop), -1 != navigator.userAgent.toLowerCase().indexOf("safari") && (this.ScrollLeft = parseInt(document.body.scrollLeft), this.ScrollTop = parseInt(document.body.scrollTop)), this.WindowWidth = parseInt(e.clientWidth), this.WindowHeight = parseInt(e.clientHeight), this.DocumentWidth = parseInt(e.clientWidth) + parseInt(this.ScrollLeft), this.DocumentHeight = parseInt(e.clientHeight) + parseInt(this.ScrollTop), this.FullDocumentWidth = parseInt(e.scrollWidth), this.FullDocumentHeight = parseInt(e.scrollHeight)
}

function Layer__GetDocumentMargins_NN() {
    this.DocumentWidth = window.innerWidth + window.pageXOffset, this.DocumentHeight = window.innerHeight + window.pageYOffset, this.FullDocumentWidth = this.DocumentWidth, this.FullDocumentHeight = this.DocumentHeight, this.ScrollLeft = window.pageXOffset, this.ScrollTop = window.pageYOffset, this.WindowWidth = window.innerWidth, this.WindowHeight = window.innerHeight
}

function Layer__Maximize() {
    this.DocumentMargins(), this.SetDimentions(this.WindowWidth, this.WindowHeight)
}

function Layer__Center(e, t) {
    var i = this.GetPosition(),
        n = this.GetDimentions();
    this.DocumentMargins(), e && (i.left = this.WindowWidth / 2 - n.width / 2), t && (i.top = this.WindowHeight / 2 - n.height / 2), this.SetPosition(i.left, i.top)
}

function Layer__InitDrag() {
    inited_mouse_actions || (IE ? (document.onmousedown = Layer__System__MOUSEDOWN, document.onclick = Layer__System__MOUSEUP, document.onmousemove = Layer__System__MOUSEMOVE) : (document.onmousedown = Layer__System__MOUSEDOWN, document.captureEvents(Event.MOUSEDOWN), document.onmouseup = Layer__System__MOUSEUP, document.captureEvents(Event.MOUSEUP), document.onmousemove = Layer__System__MOUSEMOVE, document.captureEvents(Event.MOUSEMOVE)), inited_mouse_actions = !0), LAYERS_HASH[this.LayerName].Draggable = !0
}

function Layer__ReleaseDrag() {
    LAYERS_HASH[this.LayerName].Dragging = !1
}

function Layer__System__MOUSEDOWN(e) {
    var t = !1;
    for (var i in LAYERS_HASH) LAYERS_HASH[i].Draggable && Layer__System__ClickedOverLayer(LAYERS_HASH[i], e) && (LAYERS_HASH[i].Dragging = !!IE || !LAYERS_HASH[i].Dragging, t = !0);
    if (!t && allow_default_dragging) {
        var n = Layer__System__CurrentMousePosition(e);
        default_mousedown(n)
    }
}

function Layer__System__MOUSEMOVE(e) {
    var t = old_mouse_pos,
        i = Layer__System__CurrentMousePosition(e),
        n = !1;
    for (var o in LAYERS_HASH) LAYERS_HASH[o].Draggable && LAYERS_HASH[o].Dragging && (LAYERS_HASH[o].LayerStyle.left = parseInt(LAYERS_HASH[o].LayerStyle.left) + (i.left - t.left), LAYERS_HASH[o].LayerStyle.top = parseInt(LAYERS_HASH[o].LayerStyle.top) + (i.top - t.top), n = !0);
    !n && allow_default_dragging && default_mousemove(t, i)
}

function Layer__System__MOUSEUP(e) {
    var t = !1;
    for (var i in LAYERS_HASH) LAYERS_HASH[i].Draggable && LAYERS_HASH[i].Dragging && (IE && (LAYERS_HASH[i].Dragging = !1), t = !0);
    if (!t && allow_default_dragging) {
        var n = Layer__System__CurrentMousePosition(e);
        default_mouseup(n)
    }
}

function Layer__System__ClickedOverLayer(e, t) {
    var i = Layer__System__CurrentMousePosition(t),
        n = e.GetDimentions();
    return n.right = n.left + n.width, n.bottom = n.top + n.height, i.left >= n.left && i.left <= n.right && i.top >= n.top && i.top <= n.bottom
}

function Layer__System__CurrentMousePosition(e) {
    var t = new Object;
    return IE ? (t.left = event.clientX + document.body.scrollLeft, t.top = event.clientY + document.body.scrollTop) : (t.left = e.pageX + window.pageXOffset, t.top = e.pageY + window.pageYOffset), old_mouse_pos = t, t
}
var CVI_PENDING = [],
    CVI_LOADED = !1,
    CVI_LOADER = null,
    CVI_EFFECTS = {
        reflex: function(e, i) {
            cvi_reflex.add(e, i)
        },
        instant: function(e, i) {
            cvi_instant.add(e, i)
        }
    };

function ApplyImageEffect(image) {
    image && _$(image).getParentLimited(".sk-mode-editing") || SK.Singletons.domreadypromise.then(function() {
        CVI_LOADER = SK.RequestTranslatedJS(CVI_LIBRARY_URL, SK.Singletons.env.get("site_language"), function() {
            if (image) {
                var config = null;
                try {
                    eval("config = " + image.getAttribute("options"))
                } catch (e) {}
                CVI_PENDING.push([image, config])
            }
            for (var i = 0, l = CVI_PENDING.length; i < l; i += 1) {
                var curr = CVI_PENDING[i];
                image = _$(curr[0]);
                var config = curr[1];
                if (config && config.name in CVI_EFFECTS) {
                    var parent = image.getParent();
                    CVI_EFFECTS[config.name](image, config), parent && image.setStyle("display", "none").inject(parent)
                }
            }
        })
    })
}
SK.EventTracker = new Class({
    et_params: {
        category: "",
        action: "",
        label: ""
    },
    trackEvent: function() {
        this.trackEvent = !SK.Singletons.env.get("user_id") && this.hasGA() ? this._trackEvent : function() {}, this.trackEvent.apply(this, arguments)
    },
    _trackEvent: function(t) {
        t = t || {}, (t = Object.append(Object.append({}, this.et_params), t)).category && t.action && (_gaq.push(["_trackEvent", t.category, t.action, t.label, t.value, t.nointeraction]), t = null)
    },
    hasGA: function() {
        return !!window._gaq
    }
});
"undefined" == typeof SK && (SK = {}), void 0 === SK.Utils && (SK.Utils = {}), SK.Utils.SiteReferrer = new Class({
    COOKIE_NAME: "site_referrer",
    initialize: function() {},
    store: function() {
        var e = document.referrer,
            i = document.location.host;
        "" != e && (i != e.split("/")[2] && Cookie.write(this.COOKIE_NAME, e, {
            duration: 30,
            path: "/"
        }))
    },
    retrieve: function() {
        return Cookie.read(this.COOKIE_NAME)
    }
});
"undefined" == typeof SK && (SK = {}), void 0 === SK.Util && (SK.Util = {}), SK.Util.serializeAny = function(e, i) {
    return i ? 0 == (i = i.toString()).indexOf("{SK_" + e) ? i : "{SK_" + e + "__" + i + "__SK}" : ""
}, SK.Util.serializeDBId = function(e) {
    return SK.Util.serializeAny("DBID", e)
}, SK.Util.serializeColId = function(e) {
    return SK.Util.serializeAny("COLID", e)
}, SK.Util.serializeNodeId = function(e) {
    return SK.Util.serializeAny("NODEID", e)
}, SK.Util.serializeToken = function(e) {
    return SK.Util.serializeAny("TOKEN", e)
}, SK.Util.deserializeAny = function(e, i) {
    if (!i) return "";
    var n = "{SK_" + e + "__";
    return 0 != (i = i.toString()).indexOf(n) ? i : i.indexOf("__SK}") != i.length - "__SK}".length ? i : i.substring(n.length, i.length - "__SK}".length)
}, SK.Util.deserializeDBId = function(e) {
    return SK.Util.deserializeAny("DBID", e)
}, SK.Util.deserializeColId = function(e) {
    return SK.Util.deserializeAny("COLID", e)
}, SK.Util.deserializeNodeId = function(e) {
    return SK.Util.deserializeAny("NODEID", e)
}, SK.Util.deserializeToken = function(e) {
    return SK.Util.deserializeAny("TOKEN", e)
}, SK.Util.deserializeMulti = function(e) {
    return e ? e.replace(/\{SK_([A-Z]+)__[\da-zA-Z\.]+__SK\}/g, function(e, i) {
        return SK.Util.deserializeAny(i, e)
    }) : ""
}, SK.Util.deserializeJSON = function(e) {
    return e = SK.Util.deserializeMulti(JSON.encode(e)), JSON.decode(e)
};
"undefined" == typeof SK && (SK = {}), void 0 === SK.Util && (SK.Util = {}), SK.Util.Deserializer = new Class({
    dbId: SK.Util.deserializeDBId,
    colId: SK.Util.deserializeColId,
    nodeId: SK.Util.deserializeNodeId,
    token: SK.Util.deserializeToken,
    multi: SK.Util.deserializeMulti
}), SK.Util.Serializer = new Class({
    dbId: SK.Util.serializeDBId,
    colId: SK.Util.serializeColId,
    nodeId: SK.Util.serializeNodeId,
    token: SK.Util.serializeToken,
    multi: function() {
        return arguments[0]
    }
});
! function() {
    var getter = function(locals) {
        with(locals) return SK.Sync = function(t, n, o) {
            this.functions = t.slice(), this.callback_ok = n, this.callback_failure = o;
            var i = this;
            if ("undefined" == typeof setTimeout) return i;
            this.run_warn_timeout = setTimeout(function() {
                "undefined" != typeof console && console.warn && console.warn.call(console, "Did you forget to execute the `run` method of your `SK.Sync` instance?", i)
            }, 1e4)
        }, SK.Sync.prototype.run = function() {
            "undefined" != typeof clearTimeout && clearTimeout(this.run_warn_timeout), this.runNextFunction()
        }, SK.Sync.prototype.runFunction = function(t) {
            t(this)
        }, SK.Sync.prototype.runNextFunction = function() {
            if (0 != this.functions.length) {
                var t = this.functions[0];
                this.functions = this.functions.splice(1, this.functions.length - 1), this.runFunction(t)
            } else this.callback_ok()
        }, SK.Sync.prototype.ready = function() {
            this.runNextFunction()
        }, SK.Sync.prototype.failure = function(t) {
            this.callback_failure(t)
        }, SK.Async = function(t, n, o) {
            this.functions = t.slice(), this.num_functions = this.functions.length, this.callback_ok = n, this.callback_failure = o;
            var i = this;
            if ("undefined" == typeof setTimeout) return i;
            this.run_warn_timeout = setTimeout(function() {
                "undefined" != typeof console && console.warn && console.warn.call(console, "Did you forget to execute the `run` method of your `SK.Async` instance?", i)
            }, 1e4)
        }, SK.Async.prototype.run = function() {
            "undefined" != typeof clearTimeout && clearTimeout(this.run_warn_timeout);
            for (var t = 0; t < this.functions.length; t++) {
                var n = this.functions[t];
                this.runFunction(n)
            }
        }, SK.Async.prototype.runFunction = function(t) {
            t(this)
        }, SK.Async.prototype.ready = function() {
            if (this.num_functions <= 0) return this;
            this.num_functions--, 0 != this.num_functions || this.callback_ok()
        }, SK.Async.prototype.failure = function(t) {
            this.callback_failure(t)
        }, SK
    };
    "undefined" != typeof module ? module.exports = getter : this.SK = getter(this)
}();
SK = function(t) {
    var e = {
        file_types: {
            css: "createCSS",
            js: "createScript"
        },
        options: {
            do_inject: !0,
            tests: null
        },
        files: {},
        testMethods: {
            namespace: function(t) {
                return t.every(function(t) {
                    return t.split(".").reduce(function(t, e) {
                        return t ? t[e] : t
                    }, window)
                })
            }
        },
        clearProtocol: function(t) {
            return t.replace(/^http(s)?\:/, "")
        },
        resolvePath: function(i) {
            return /^(http|\/\/)/.test(i) ? e.clearProtocol(i) : (t.Singletons || {}).env ? [t.Singletons.env.get("static_image_server"), i, /\?/.test(i) ? "&" : "?", "V=", t.Singletons.env.get("revision")].join("") : i
        },
        formatID: function(t) {
            return e.clearProtocol(t).replace(/([^a-z0-9\_\-])/gi, "")
        },
        getFileData: function(t) {
            t = e.formatID(t);
            return e.files[t] || {}
        },
        executeCallback: function(t) {
            t = e.formatID(t);
            e.files[t].loaded = !0;
            for (var i = e.files[t].callbacks, n = {}, s = 0, c = i.length; s < c; s++) "function" != typeof i[s] ? n[s] = setTimeout(function(t, e) {
                n[s] = clearTimeout(n[t]), e()
            }.bind(null, s, i[s]), 100) : i[s]();
            e.files[t].callbacks = []
        },
        createScript: function(t) {
            return new Element("script", {
                id: e.formatID(t),
                src: e.resolvePath(t),
                type: "text/javascript",
                events: {
                    load: e.executeCallback.bind(e, t)
                }
            })
        },
        createCSS: function(t) {
            return new Element("link", {
                id: e.formatID(t),
                href: e.resolvePath(t),
                type: "text/css",
                rel: "stylesheet",
                events: {
                    load: e.executeCallback.bind(e, t)
                }
            })
        },
        getFileObject: function(t) {
            var i = e.getFileID(t);
            return _$(i) || e.getFileData(t).file
        },
        setFile: function(t, i) {
            var n = e.formatID(t);
            i = e.file_types[i] || "createScript";
            e.files[n] = Object.append({
                id: n,
                loaded: !1,
                file: e.getFileObject(t) || e[i](t),
                callbacks: [],
                tests: {}
            }, e.getFileData(t))
        },
        getFileID: function(t) {
            t = this.formatID(t);
            return (e.files[t] || {}).id
        },
        setFileID: function(t, i) {
            t = e.formatID(t);
            var n = e.formatID(i);
            e.files[t].id = n, e.files[t].file.set("id", n), this.replaceExisting(t)
        },
        replaceExisting: function(t) {
            e.files[t].file != e.getFileObject(t) && (e.files[t].file.destroy(), e.files[t].loaded = !0, e.files[t].file = e.getFileObject(t), e.executeCallback(t))
        },
        getTest: function(t) {
            return e.testMethods[t] || Function.from(!0)
        },
        testScript: function(t) {
            var i = e.getFileData(t);
            return Object.every(i.tests, function(t, i) {
                return !e.getTest(i)(t)
            })
        }
    };
    return t.RequestJS = function(t, i) {
        return i = Object.merge({}, e.options, "object" == typeOf(i) ? i : {
            callback: Function.from(i)
        }), this.path = e.clearProtocol(t), this.id = i.id || e.formatID(t), Object.append(this, {
            setID: function(t) {
                return t ? (e.setFileID(this.path, t), this) : this
            },
            getID: function() {
                return e.getFileID(this.path)
            },
            setTests: function(t, i) {
                i = i || "namespace";
                return t ? (e.files[this.id].tests[i] = (e.files[this.id].tests[i] || []).concat(t), this) : this
            },
            getTest: function(t) {
                return e.files[this.id].tests[t] || e.files[this.id].tests
            },
            getFileObject: function() {
                return e.getFileObject(this.path)
            },
            then: function(t) {
                var i = e.getFileData(this.path);
                return t = t || function() {}, i.callbacks.push(t), i.loaded && e.executeCallback(this.path), this
            },
            inject: function(t) {
                return e.testScript(this.path) ? e.getFileData(this.path).loaded ? this : (this.container = t || document.head || document.getElementsByTagName("head")[0], this.getFileObject().inject(this.container), this) : (e.executeCallback(this.path), this)
            }
        }), e.setFile(t, "js"), this.then(i.callback), i.id && this.setID(i.id), Object.each(i.tests || {}, this.setTests.bind(this)), i.do_inject && setTimeout(this.inject.bind(Object.clone(this), i.container), 0), this
    }.bind({}), t.RequestCSS = function(t, i) {
        return i = Object.merge({}, e.options, "object" == typeOf(i) ? i : {
            callback: Function.from(i)
        }), this.path = e.clearProtocol(t), this.id = i.id || e.formatID(t), Object.append(this, {
            setID: function(t) {
                return t ? (e.setFileID(this.path, t), this) : this
            },
            getID: function() {
                return e.getFileID(this.path)
            },
            getFileObject: function() {
                return e.getFileObject(this.path)
            },
            then: function(t) {
                var i = e.getFileData(this.path);
                return t = t || function() {}, i.callbacks.push(t), i.loaded && e.executeCallback(this.path), this
            },
            inject: function(t) {
                return e.getFileData(this.path).loaded ? this : (this.container = t || document.head || document.getElementsByTagName("head")[0], this.getFileObject().inject(this.container), this)
            }
        }), e.setFile(t, "css"), this.then(i.callback), i.id && this.setID(i.id), i.do_inject && setTimeout(this.inject.bind(Object.clone(this), i.container), 0), this
    }.bind({}), t.RequestJS.addTest = function(t, i) {
        e.testMethods[t] = i
    }, t.RequestJS.getTest = function(t) {
        return e.testMethods[t] || e.testMethods
    }, t.RequestTranslatedJS = function(e, i, n) {
        return i = t.Util.getLanguage(i) || "EN", /\.([A-Z]{2})\.js/.test(e) || (e = e.replace(/\.LANG\.js/, "." + i + ".js")), t.RequestJS(e, n)
    }, t
}(window.SK || {});
if (void 0 === SK) var SK = {};
void 0 === SK.Util && (SK.Util = {}), SK.Util.URL = {
    parseQueryString: function(e) {
        var i = e || document.location.href,
            n = i.indexOf("?");
        if (-1 == n) return {};
        var r = i.indexOf("#", n); - 1 == r && (r = i.length);
        for (var t = i.substring(n + 1, r).split("&"), a = {}, l = 0; l < t.length; l++) {
            var u = t[l].split("=");
            2 == u.length && (a[unescape(u[0])] = unescape(u[1]))
        }
        return a
    }
};
! function() {
    var getter = function(locals) {
        with(locals) {
            "undefined" == typeof SK && (SK = {}), void 0 === SK.Util && (SK.Util = {}), void 0 === SK.Util.DateTime && (SK.Util.DateTime = {}), void 0 === SK.LocationFormats && (SK.LocationFormats = {}), SK.LocationFormats.DateTime = function() {
                this.months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"], this.days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"], this.months_short = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Jul", "Août", "Sep", "Oct", "Nov", "Déc"], this.days_short = ["Dim", "Lun", "Mar", "Mer", "Jeu", "VEN", "Sam"], this.env = null, this.default_format = "$YEAR$-$0M$-$0D$", this.regexp_subs = null, this.cache = {}, this.createRegExpSubs()
            }, SK.LocationFormats.DateTime.prototype.getEnv = function() {
                if (this.env) return this.env;
                if (this.env = SK.Singletons && SK.Singletons.env ? SK.Singletons.env : null, !this.env || !this.env.get("locale")) {
                    var t = window;
                    try {
                        do {
                            (t = t.opener || t.parent).SK.Singletons && t.SK.Singletons.env && t.SK.Singletons.env.get("locale") && (this.env ? this.env.set("locale", t.SK.Singletons.env.get("locale")) : this.env = Object.append({}, t.SK.Singletons.env))
                        } while (t.opener && t !== t.opener || t !== t.parent)
                    } catch (t) {}
                }
                return this.env
            }, SK.LocationFormats.DateTime.prototype.createRegExpSubs = function() {
                this.regexp_subs = {
                    $WEEKDAY$: "(" + this.days.join("|") + ")",
                    $WD$: "(" + this.days_short.join("|") + ")",
                    $YEAR$: "\\d{4}",
                    $YR$: "\\d{2}",
                    $MONTH$: "(" + this.months.join("|") + ")",
                    $MNT$: "(" + this.months_short.join("|") + ")",
                    $MN$: "(0\\d|1[0-2]|[1-9])",
                    $0M$: "(0\\d|1[0-2])",
                    $D$: "([0-2]\\d|3[0-1]|[1-9])",
                    $0D$: "([0-2]\\d|3[0-1])",
                    $H$: "(1[0-2]|[0-9])",
                    $H24$: "([1-2]\\d|[0-9])",
                    $M$: "[0-5]\\d",
                    $S$: "[0-5]\\d",
                    $AMPM$: "(AM|PM)",
                    "$AM.PM$": "(P\\.M\\.|A\\.M\\.)",
                    $TZ$: null,
                    $TIMEZONE$: null,
                    $UTC$: null
                }, this.regexp_subs.$H12$ = this.regexp_subs.$H$
            }, SK.LocationFormats.DateTime.prototype.getFormat = function(t) {
                return (t = t || "").indexOf("$") >= 0 ? t : (t = this.env ? this.env.get("locale")[t] : this.default_format) || this.default_format
            }, SK.LocationFormats.DateTime.prototype.addZero = function(t) {
                return t < 10 ? "0" + t : t
            }, SK.LocationFormats.DateTime.prototype.parseDate = function(t) {
                var e;
                if (t) {
                    if ("date" == typeOf(t)) return "Invalid Date" !== t.toString() ? t : null;
                    if (/^[a-zA-Z]{3}, \d{2} [a-zA-Z]{3} \d{4} \d{2}:\d{2}:\d{2} (\+|\-)\d{4}$/.test(t)) return new Date(Date.parse(t));
                    (t = t.replace(/\-|\./g, "/")).match(/^\d{1,2}:\d{2}/) && (t = "01/01/1970 " + t), e = new Date(t)
                } else e = new Date;
                return "Invalid Date" == e.toString() ? null : e
            }, SK.LocationFormats.DateTime.prototype.parseDateUTC = function(t) {
                var e = this.parseDate(t);
                return e ? new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds())) : null
            }, SK.LocationFormats.DateTime.prototype.format = function(t, e) {
                this.getEnv(), e = this.getFormat(e);
                var n = this.parseDate(t);
                if (!n) return t;
                var i = n.getDay(),
                    a = n.getDate(),
                    o = n.getMonth(),
                    r = n.getFullYear(),
                    s = n.getHours(),
                    $ = n.getMinutes(),
                    u = n.getSeconds(),
                    h = this.getOffset(n),
                    m = (n.toString().match(/(?!GMT|UTC)[A-Z]{3,4}|(?:UTC|GMT)[+-]\d{4}/) || [])[0] || "inconnu",
                    d = {
                        $WEEKDAY$: this.days[i],
                        $WD$: this.days_short[i],
                        $YEAR$: r,
                        $YR$: String(r).substr(2),
                        $MONTH$: this.months[o],
                        $MNT$: this.months_short[o],
                        $MN$: o + 1,
                        $0M$: this.addZero(o + 1),
                        $D$: a,
                        $0D$: this.addZero(a),
                        $H$: s > 12 ? s - 12 : s,
                        $H24$: s,
                        $M$: this.addZero($),
                        $S$: this.addZero(u),
                        $AMPM$: s >= 12 ? "PM" : "AM",
                        "$AM.PM$": s >= 12 ? "P.M." : "A.M.",
                        $TZ$: m,
                        $UTC$: h < 0 ? h : "+" + h
                    };
                return d.$H12$ = d.$H$, d.$TIMEZONE$ = d.$TZ$, e.replace(/\$[A-Z0-9\.]+\$/g, function(t) {
                    return void 0 !== this.subs[t] ? this.subs[t] : ""
                }.bind({
                    subs: d
                }))
            }, SK.LocationFormats.DateTime.prototype.formatUTC = function(t, e) {
                return this.getEnv(), this.format(this.parseDateUTC(t), e)
            }, SK.LocationFormats.DateTime.prototype.validate = function(t, e) {
                var n;
                return this.getEnv(), e = this.getFormat(e), this.cache[e] ? n = this.cache[e] : (e = e.replace(/[\(\)\|\-\.\?\!\:\/\\]/g, function(t) {
                    return "\\" + t
                }), n = new RegExp("^" + e.replace(/\$[A-Z0-9\.]+\$/g, function(t) {
                    return this.regexp_subs[t]
                }.bind(this)) + "$", "i"), this.cache[e] = n), n.test(t)
            }, SK.LocationFormats.DateTime.prototype.setDefaultFormat = function(t) {
                this.default_format = t
            }, SK.LocationFormats.DateTime.prototype.parseInput = function(t, e) {
                this.getEnv();
                var n = (e = this.getFormat(e)).indexOf("$YEAR$"),
                    i = e.indexOf("$MN$");
                i = i < 0 ? e.indexOf("$0M$") : i;
                var a = e.indexOf("$D$");
                return a = a < 0 ? e.indexOf("$0D$") : a, n > i && a < i && (t = t.replace(/^(\d{1,2})(.{1})(\d{1,2})/, function(t, e, n, i) {
                    return i + n + e
                })), this.parseDate(t) || new Date(t)
            }, SK.LocationFormats.DateTime.prototype.nowUTC = function() {
                this.getEnv();
                var t = new Date,
                    e = this.getOffset(t);
                return t.setHours(t.getHours() - e), t
            }, SK.LocationFormats.DateTime.prototype.getOffset = function(t) {
                return -t.getTimezoneOffset() / 60
            };
            var mgr = new SK.LocationFormats.DateTime;
            return SK.Util.DateTime.format = mgr.format.bind(mgr), SK.Util.DateTime.formatUTC = mgr.formatUTC.bind(mgr), SK.Util.DateTime.validate = mgr.validate.bind(mgr), SK.Util.DateTime.parseInput = mgr.parseInput.bind(mgr), SK.Util.DateTime.setDefaultFormat = mgr.setDefaultFormat.bind(mgr), SK.Util.DateTime.nowUTC = mgr.nowUTC.bind(mgr), SK
        }
    };
    "undefined" != typeof module ? module.exports = getter : this.SK = getter(this)
}();
SK.UI.Lightbox = new Class({
    win: {},
    defaults: {
        width: 800,
        height: 600
    },
    fx: {},
    initialize: function() {
        _$("sk-lightbox-wrapper") && this.init()
    },
    init: function(i) {
        this.initWindow(), this.initEvents(), this.initEffects()
    },
    initEvents: function() {
        document.body.addEvent("click", this.delegateClickEvent.bind(this)), window.addEvent("load", function() {
            SK.StopPropagationRegistry.getElements().addEvent("click", this.delegateClickEvent.bind(this))
        }.bind(this)), window.addEvent("keydown", function(i) {
            "esc" == i.key && this.hideWindow()
        }.bind(this)), this.win.close.addEvent("click", function(i) {
            i.preventDefault(), this.hideWindow()
        }.bind(this))
    },
    initEffects: function() {
        this.fx.show = new Fx.Tween(this.win.wrapper, {
            property: "opacity",
            duration: 300
        }), this.fx.hide = new Fx.Tween(this.win.wrapper, {
            property: "opacity",
            duration: 300,
            onComplete: this.resetWindow.bind(this)
        }), this.fx.resizeHeight = new Fx.Tween(this.win.wrapper, {
            property: "height",
            duration: 1500
        }), this.fx.resizeWidth = new Fx.Tween(this.win.wrapper, {
            property: "width",
            duration: 1500
        })
    },
    delegateClickEvent: function(i) {
        var t = this.getLinkElement(i.target);
        !t || !this.isChildOfContentEditable(_$(t)) || (t.getProperty("target") || "").indexOf("sk_lightbox") < 0 || i.getProperty("representative_clicked") || (i.preventDefault(), this.displayLightbox(t))
    },
    getLinkElement: function(i) {
        return i && "A" !== i.tagName && (i = _$(i).getParentLimited("A", 10)), i
    },
    isChildOfContentEditable: function(i) {
        return i && !_$(i).getParentLimited(".sk-mode-editing", 40)
    },
    initWindow: function() {
        this.win = {
            wrapper: _$("sk-lightbox-wrapper"),
            close: _$("sk-lightbox-close"),
            iframe: _$("sk-lightbox-iframe"),
            inner: _$("sk-lightbox-ui"),
            dom: _$("sk-lightbox-dom"),
            image_wrap: _$("sk-lightbox-image-wrapper"),
            image: _$("sk-lightbox-image")
        }, "ios" === Browser.platform && (this.win.iframeWrap = new Element("div", {
            styles: {
                overflow: "auto",
                "-webkit-overflow-scrolling": "touch"
            }
        }).wraps(this.win.iframe)), this.win.wrapper.setStyles({
            opacity: "0",
            visibility: "hidden",
            display: "none"
        })
    },
    resizeWindow: function(i, t) {
        var e = window,
            n = parseInt(this.win.inner.getStyle("padding-top"), 10),
            s = parseInt(this.win.inner.getStyle("top"), 10),
            h = e.getWidth() - 20,
            o = e.getHeight() - 20,
            r = 2 * (s + n);
        i = Number(i) + r, t = Number(t) + r, i = i > h ? h : i, t = t > o ? o : t, this.win.wrapper.setStyles({
            width: i,
            height: t
        })
    },
    resetWindow: function() {
        this.win.wrapper.setStyles({
            width: "",
            height: "",
            marginLeft: "",
            marginTop: "",
            visibility: "hidden",
            display: "none"
        }), this.win.iframe.src = "about:blank"
    },
    displayLightbox: function(i) {
        var t = this.parseProperties(i.getProperty("target")),
            e = i.getProperty("href"),
            n = t.width || this.defaults.width,
            s = t.height || this.defaults.height;
        if ("javascript:void(null)" == e) {
            var h = i.getElement("img:not(.sk-image-lightbox)");
            h && (e = h.getProperty("src"))
        }
        this.showWindow(e, n, s)
    },
    showWindow: function(i, t, e) {
        this.win.iframeWrap && this.win.iframeWrap.setStyles({
            width: "100%",
            height: "100%",
            display: "none"
        }), this.resizeWindow(t, e), this.loadContent(i), this.win.wrapper.setStyles({
            visibility: "visible",
            display: "block"
        }), this.fx.show.start(1)
    },
    hideWindow: function() {
        this.fx.hide.start(0)
    },
    loadContent: function(i) {
        switch (this.getContentType(i)) {
            case "image":
                this.loadImage(i);
                break;
            case "dom":
                this.loadDOM(i);
                break;
            case "html":
            default:
                this.loadHtml(i)
        }
    },
    loadImage: function(i) {
        this.win.image.set("html", ""), this.hideFrame(), this.hideDOM(), this.showImage();
        var t = new Element("img", {
            src: i
        }).inject(this.win.image);
        t.addEvent("load", function(i) {
            this.fixImageDimensions(i), this.resizeWindow(i.getWidth(), i.getHeight())
        }.bind(this, t))
    },
    loadDOM: function(i) {
        this.hideFrame(), this.hideImage();
        var t = this.win.dom.getElement("*");
        t && t.dispose(), i.inject(this.win.dom), this.showDOM()
    },
    loadHtml: function(i) {
        this.win.iframeWrap && this.win.iframeWrap.setStyle("display", "block"), this.showFrame(), this.hideImage(), this.hideDOM(), SK.Singletons.env.get("admin_mode") && "/" == i.charAt(0) && (i = i.replace(".html", ".html/sk_aa_preview")), this.win.iframe.src != i && (this.win.iframe.src = i)
    },
    showImage: function() {
        this.win.image_wrap.setStyle("display", "")
    },
    showDOM: function() {
        this.win.dom.setStyle("display", "")
    },
    showFrame: function() {
        this.win.iframe.setStyle("display", "")
    },
    hideImage: function() {
        this.win.image_wrap.setStyle("display", "none")
    },
    hideDOM: function() {
        this.win.dom.setStyle("display", "none")
    },
    hideFrame: function() {
        this.win.iframe.setStyle("display", "none")
    },
    parseProperties: function(i) {
        return JSON.decode(i.replace("sk_lightbox", ""))
    },
    getContentType: function(i) {
        return "element" == typeOf(i) ? "dom" : /\.(?:jpe?g|gif|png)$/.test(i) ? "image" : "html"
    },
    fixImageDimensions: function(i) {
        var t = this.win.inner.getHeight() - 2 * parseInt(this.win.inner.getStyle("padding-top"), 10);
        i.getHeight() > t && i.setStyle("height", t);
        var e = this.win.inner.getWidth() - 2 * parseInt(this.win.inner.getStyle("padding-left"), 10);
        i.getWidth() > e && i.setStyle("width", e)
    },
    setHeightFx: function(i) {
        var t = parseInt(this.win.inner.getStyle("padding-top"), 10),
            e = 2 * (parseInt(this.win.inner.getStyle("top"), 10) + t),
            n = parseInt(i, 10) + e;
        this.fx.resizeHeight.start(n)
    }
}), SK.UI.Lightbox.Open = function() {}, SK.UI.Lightbox.Close = function() {}, SK.UI.Lightbox.IsLightboxTarget = function() {}, window.addEvent("domready", function() {
    var i = new SK.UI.Lightbox;
    SK.UI.Lightbox.Open = function() {
        var i = Array.prototype.link.apply(arguments, [{
            url: function(i) {
                return Type.isString(i) || Type.isElement(i)
            },
            width: function(i) {
                return Type.isNumber(Number(i))
            },
            height: function(i) {
                return Type.isNumber(Number(i))
            },
            target: function(i) {
                return Type.isString(i) && i.indexOf("sk_lightbox") > -1
            }
        }]);
        if (i.target) {
            var t = JSON.decode(i.target.replace("sk_lightbox", ""));
            Object.append(i, t)
        }
        this.showWindow(i.url, i.width, i.height)
    }.bind(i), SK.UI.Lightbox.Close = i.hideWindow.bind(i), SK.UI.Lightbox.IsLightboxTarget = function(i) {
        return 0 === i.indexOf("sk_lightbox")
    }, SK.UI.Lightbox.SetHeightFx = i.setHeightFx.bind(i)
});
SK.Util = SK.Util || {}, SK.Util.toPercent = function(t, o) {
    return (100 * t.toFloat()).toFixed(o >= 0 ? o : 2) + "%"
}, SK.Util.fromPercent = function(t, o) {
    return (t.toFloat() / 100).toFixed(o >= 0 ? o : 5).toFloat()
};
SK = window.SK || {}, SK.RolloverImage = function() {}, SK.RolloverImageLoader = {
    initiated: 0,
    checkForRolloverImages: function(e) {
        for (var o = [], t = 0; t < e.length; t++) this.HasRollover(e[t]) && o.push(e[t]);
        o.length && this.loadFatFile(this.initRollover.bind(this, o))
    },
    HasRollover: function(e) {
        return e && "IMG" == e.tagName && e.onmouseover && e.getAttribute("onmouseover").toString().indexOf("SK.RolloverImage") >= 0
    },
    loadFatFile: function(e) {
        if (this.initiated) return e();
        this.initiated = 1, SK.RequestTranslatedJS("/Shared/Scripts/RolloverImage/fat_rollover_image.LANG.js", SK.Singletons.env.get("site_language"), e)
    },
    initRollover: function(e) {
        for (var o = 0; o < e.length; o++) SK.RolloverImage.Init(e[o])
    }
}, SK.Singletons.loadpromise.then(SK.RolloverImageLoader.checkForRolloverImages.bind(SK.RolloverImageLoader, document.getElementsByTagName("img")));
SK.StopPropagationRegistry = [".subNav"], SK.StopPropagationRegistry.getElements = function() {
    var t = new Elements([]);
    return this.each(function(t) {
        for (var e = $$(t), n = 0, s = e.length; n < s; n += 1) this.elements.contains(e[n]) || this.elements.push(e[n])
    }, {
        array: this,
        elements: t
    }), t
};
! function() {
    var getter = function(locals) {
        with(locals) {
            SK.LinkBuilder = SK.LinkBuilder || function() {
                this.ext_links_regex = new RegExp("^(?:https?|mailto|tel|ftp)\\:", ""), this.buildLink = function(i) {
                    if (this.isExternalLink(i)) return i;
                    var e = SK.Singletons.env.get("user_name");
                    return 0 !== (i = i.replace("/Admin", "").replace("/" + e, "")).indexOf("/") && (i = "/" + i), SK.Singletons.env.get("admin_mode") ? "/" + e + "/Admin" + i : location.href.indexOf(location.host + "/" + e + "/") < 0 ? i : "/" + e + i
                }, this.isExternalLink = function(i) {
                    return this.ext_links_regex.test(i)
                }
            };
            var link_builder = new SK.LinkBuilder;
            return SK.Util.buildLink = SK.Util.buildLink || link_builder.buildLink.bind(link_builder), SK
        }
    };
    "undefined" != typeof module ? module.exports = getter : this.SK = getter(this)
}();
! function(t) {
    var e = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(e) && e.indexOf("AppleWebKit") > -1) {
        var i = t.document;
        if (i.querySelector) {
            var n, a, o, r, c = i.querySelector("meta[name=viewport]"),
                s = c && c.getAttribute("content"),
                u = s + ",maximum-scale=1",
                m = s + ",maximum-scale=10",
                d = !0;
            c && (t.addEventListener("orientationchange", v, !1), t.addEventListener("devicemotion", function(e) {
                r = e.accelerationIncludingGravity, n = Math.abs(r.x), a = Math.abs(r.y), o = Math.abs(r.z), t.orientation && 180 !== t.orientation || !(n > 7 || (o > 6 && a < 8 || o < 8 && a > 6) && n > 5) ? d || v() : d && (c.setAttribute("content", u), d = !1)
            }, !1))
        }
    }

    function v() {
        c.setAttribute("content", m), d = !0
    }
}(this);
SK = this.SK || {}, SK.BackgroundTranslator = SK.BackgroundTranslator || new Class({
    element: null,
    isImageSmallerThanContainer: function(t, e) {
        e = e || this.getContainerSize();
        return t.natural_width < (e.width || e.x) || t.natural_height < (e.height || e.y)
    },
    translateBackgroundSizeToFit: function(t, e, n, i) {
        var a = n.getWidth(),
            r = e.natural_height / e.natural_width * a,
            h = n.getHeight() <= r;
        return "1" == t && this.isImageSmallerThanContainer(e, i) ? h ? "100% auto" : "auto 100%" : this.translateBackgroundSize(e, h)
    },
    translateBackgroundPosition: function(t, e) {
        var n = t[{
            x: "size_x",
            y: "size_y"
        }[e]] - this.getContainerSize()[e];
        if (!n) return 0;
        var i = 1 - (t[e] + n / 2) / n;
        return SK.Util.toPercent(i > 1 ? 1 : i < 0 ? 0 : i)
    },
    translateBackgroundSize: function(t, e) {
        var n = this.getContainerSize(),
            i = t.size_x / n.x,
            a = t.size_y / n.y,
            r = i / a;
        return i < 1 && (a = (i = Math.min(1, t.natural_width / n.x)) / r), a < 1 && (i = (a = Math.min(1, t.natural_height / n.y)) * r), e ? SK.Util.toPercent(i) + " auto" : "auto " + SK.Util.toPercent(a)
    },
    getContainerSize: function() {
        return this.container_size
    },
    setContainerSize: function(t) {
        return this.container_size = t, this
    },
    getElement: function() {
        return this.element
    },
    setElement: function(t) {
        return this.element = t, this
    }
}), SK.BackgroundTranslator.translateZoomProperties = function(t, e, n, i) {
    if (!Object.getLength(n)) return {
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    };
    var a = (new SK.BackgroundTranslator).setContainerSize(e);
    n.size_y = Math.round(n.natural_height * n.height), n.size_x = Math.round(n.natural_width * n.width);
    var r = n.size_x / t.width,
        h = n.size_y / t.height,
        o = a.translateBackgroundPosition(n, "x"),
        s = (n.y - (n.size_y - t.height) / 2) / t.height,
        u = r / h;
    return i || (r < 1 && (h = (r = Math.min(1, Math.max(n.natural_width / t.width, 1))) / u), h < 1 && (r = u * (h = Math.min(1, Math.max(n.natural_height / t.height, 1))))), h >= 1 && (s = s > 0 ? 0 : h + s < 1 ? 1 - h : s), h < 1 && (s = s < 0 ? 0 : 1 - h < s ? 1 - h : s), {
        width: SK.Util.toPercent(r),
        height: SK.Util.toPercent(h),
        left: o,
        transform: "translateX(-" + o + ")",
        top: SK.Util.toPercent(s)
    }
};
void 0 === SK.Util && (SK.Util = {}), SK.Util.isClient = function() {
    return SK.Singletons && SK.Singletons.env && SK.Singletons.env.get("client")
}, SK.Util.isES6Class = function(e) {
    return "function" == typeof e && /^class\s?/.test(Function.prototype.toString.call(e))
}, SK.Util.getType = function(e) {
    switch (!0) {
        case null === e:
            return "null";
        case NaN === e:
            return "NaN";
        case e instanceof Date:
            return "date";
        case SK.Util.isClient() && e instanceof HTMLElement:
            return "element";
        case Array.isArray(e):
            return "array";
        default:
            return typeof e
    }
}, SK.Util.deepAssign = function(e, t) {
    var r = SK.Util.getType(e);
    if ("object" != r && "array" != r) return e;
    for (var n = "array" == r, i = 1, a = arguments.length; i < a; i++) {
        var l = arguments[i];
        if (null != l && r == SK.Util.getType(l))
            for (var s = Object.keys(l), c = 0, o = s.length; c < o; c++) {
                var u = s[c],
                    S = SK.Util.getType(l[u]),
                    f = u;
                n && -1 == e.indexOf(e[u]) && (f = e.length), "object" == S || "array" == S ? (e[f] = e[f] ? e[f] : "object" == S ? {} : [], SK.Util.deepAssign(e[f], l[u])) : e[f] = l[u]
            }
    }
    return e
}, SK.Util.compare = function(e, t) {
    if (e === t) return !0;
    var r = SK.Util.getType(e);
    if (r != SK.Util.getType(t)) return !1;
    switch (r) {
        case "NaN":
        case "null":
        case "string":
        case "number":
        case "boolean":
        case "element":
        case "undefined":
            return !1;
        case "date":
            return e.getTime() == t.getTime();
        case "array":
            return e.length == t.length && e.every(function(e, t, r) {
                return SK.Util.compare(r[t], this[t])
            }, t);
        case "object":
        case "hash":
        default:
            return function(e, t) {
                var r = SK.Util.compare(Object.keys(e).sort(), Object.keys(t).sort());
                for (var n in e) {
                    if (!r) return !1;
                    r = e.hasOwnProperty(n) && t.hasOwnProperty(n) && SK.Util.compare(e[n], t[n])
                }
                return r
            }(e, t)
    }
    return !1
}, SK.Util.extractStockImageURL = function(e, t) {
    return t = t || "original", e.sizes[t] + "#STOCKIMGID" + e.collection_id + "___" + e.id + "___" + t
};
SK.Singletons.element_instances = {
    data: {},
    get: function(t) {
        return this.data[t]
    },
    set: function(t, e) {
        this.data[t] = e
    },
    remove: function(t) {
        delete this.data[t]
    }
};
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.PropertiesHelpers = new Class({
    getProperty: function(e) {
        return "function" == typeof this.env.properties[e] ? this.env.properties[e]() : this.env.properties[e]
    },
    setProperty: function(e, t) {
        "function" == typeof this.env.properties[e] && this.env.properties[e](t) || (this.env.properties[e] = t)
    },
    getProperties: function() {
        var e = {};
        return Object.each(this.env.properties, function(t, n) {
            e[n] = "function" == typeof t ? t() : t
        }), e
    },
    setProperties: function(e) {
        Object.each(e || {}, function(e, t) {
            this.setProperty(t, e)
        }, this)
    }
});
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.Object = SK.Object || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.Display = new Class({
    Extends: SK.Object.Properties || function() {},
    Implements: [Options, Events, SK.UI.Element.ZeroFootprint || function() {}, SK.UI.Element.PropertiesHelpers || function() {}],
    options: {
        timeout: 2e3
    },
    env: null,
    properties: null,
    update_interval: null,
    callbacks: {},
    is_admin: SK.Singletons.env.get("admin_mode"),
    default_property_values: {},
    content_validation_message: "",
    initialize: function(e, t) {
        this.has_save_method = "function" == typeof this.save, this.has_zero_footprint_method = this.isZeroFootprintEnabled(), this.env = e, this.env.addRecursivelyKOObservables = SK.addRecursivelyKOObservables, this.env.editing_activated = !1, this.placeholder = _$(this.env.placeholder), this.placeholder.removeClass("sk-mode-editing"), e.properties = this.setDefaults(e.properties), this.setOptions(t), this.isKnockoutUsageSafe() && (this.createObservables(), this.createComputed(), this.env.placeholder = this.placeholder, e.ko.applyBindings(this.env, this.env.placeholder)), this.has_save_method && (this.parent(), this.callbacks.save = function() {
            this.executeSave(this.env.node_id), this.update_interval = null
        }.bind(this)), this.has_zero_footprint_method && this.printZeroFootprint(this.env.zero_footprint_text, this.zeroFootprintContainer(), "[contenteditable]"), SK.UI && SK.UI.Preview && SK.UI.Preview.addEvents({
            onEnable: function() {
                this.placeholder.getElements("[contenteditable]").set("contenteditable", !1)
            }.bind(this),
            onDisable: function() {
                this.placeholder.getElements("[contenteditable=false]").set("contenteditable", !0)
            }.bind(this)
        }).isEnabled && this.placeholder.getElements("[contenteditable]").set("contenteditable", !1), SK.Singletons.env.get("sk_aa_preview") && this.placeholder.getElements("[contenteditable]").set("contenteditable", !1)
    },
    saveProperty: function(e) {
        this.onChange(e)
    },
    isZeroFootprintEnabled: function() {
        return "function" == typeof this.printZeroFootprint
    },
    isKnockoutUsageSafe: function() {
        return this.is_admin || "nodejs" == Browser.name
    },
    zeroFootprintContainer: function() {
        return this.getPlaceholder()
    },
    executeSave: function(e) {
        this.isSavePrevented() || this.save(e, this.getProperties())
    },
    isSavePrevented: function() {
        return this.prevent_save
    },
    preventSave: function(e) {
        this.prevent_save = e
    },
    isInEditMode: function() {
        return this.env.editing_activated()
    },
    createObservables: function() {
        Object.each(this.env.properties, function(e, t) {
            this.env.properties[t] = this.env.ko.observable(e), this.has_save_method && this.env.properties[t].subscribe(this.onChange.bind(this, t))
        }, this), this.env.children && (this.env.children = ko.observableArray(this.env.children)) && this.env.children.subscribe(this.updateChildrenZeroFootprint.delay.bind(this.updateChildrenZeroFootprint, 0, this)), this.env.editing_activated = this.env.ko.observable(!1)
    },
    updateChildrenZeroFootprint: function() {
        this.has_zero_footprint_method && (this.env.children().length && this.hideZeroFootprint() || this.showZeroFootprint())
    },
    createComputed: function() {},
    setDefaults: function(e) {
        return Object.append({}, this.default_property_values, Object.cleanValues(e))
    },
    onChange: function(e) {
        if (!this.env.editing_activated()) return clearTimeout(this.update_interval);
        if (window.onbeforeunload = null, clearTimeout(this.update_interval), this.isSavePrevented()) return !1;
        window.onbeforeunload = this.preventRefresh, this.update_interval = setTimeout(this.callbacks.save, this.options.timeout), this.fireEvent("change", [e]);
        try {
            SK.Singletons.uimenu && SK.Singletons.uimenu.repositionElement()
        } catch (e) {}
    },
    preventRefresh: function() {
        return !1
    },
    forceSave: function() {
        return !(!this.has_save_method || !this.update_interval) && (clearTimeout(this.update_interval), this.callbacks.save(), !0)
    },
    getData: function() {
        return Object.append({
            display_instance: this
        }, this.env)
    },
    getChildren: function() {
        var e = this.getData();
        return "function" == typeof e.children ? e.children() : e.children
    },
    getChildrenKOObject: function() {
        return this.getData().children
    },
    backupProperties: function() {
        var e = {};
        Object.each(this.env.properties, function(t, i) {
            t && (e[i] = this.env.ko.unwrap(t))
        }, this), this.properties = e
    },
    beforeStartEdit: function() {
        this.backupProperties()
    },
    startEdit: function(e) {
        SK.Singletons.uimenu.getRepresentativeByNodeID(this.representative_id || this.env.node_id).activateState("active"), this.env.editing_activated(!0), this.placeholder.addClass("sk-mode-editing"), this.fireEvent("startEdit", [e])
    },
    cancelEdit: function(e) {
        this.env.editing_activated(!1), this.placeholder.removeClass("sk-mode-editing"), this.fireEvent("cancelEdit", [e]), this.onEditorClose()
    },
    finishEdit: function(e) {
        return this.fireEvent("finishEdit", [e]), this.isSavePrevented() ? (this.displayStatusMessage(), !1) : (this.onEditorClose(), this.env.editing_activated(!1), this.placeholder.removeClass("sk-mode-editing"), !0)
    },
    onEditorClose: function() {
        this.has_zero_footprint_method && this.showZeroFootprint(), SK.Singletons.uimenu && SK.Singletons.uimenu.getCurrentRepresentative().isStandardMode() && SK.Singletons.uimenu.getCurrentRepresentative().positionBorder()
    },
    closeEditor: function() {
        SK.Actions.cancelEdit(this.env.node_id)
    },
    getEnvironment: function() {
        return this.env
    },
    getPlaceholder: function() {
        return _$((this.env || {}).placeholder)
    },
    isValid: function() {
        return !this.content_validation_message
    },
    setContentErrorMessage: function(e) {
        this.content_validation_message = e
    },
    getContentErrorMessage: function() {
        return this.content_validation_message
    },
    displayStatusMessage: function() {
        SKMessage(this.getContentErrorMessage())
    },
    loseFocus: function() {
        var e = new Element("input", {
            class: "sk-catchfocus"
        }).inject(document.body);
        e.focus(), e.destroy()
    }
});
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.Application = SK.UI.Element.Application || {}, SK.UI.Element.Application.Settings = SK.UI.Element.Application.Settings || new Class({
    is_admin: SK.Singletons.env.get("admin_mode"),
    default_settings_values: {},
    initialize: function(t) {
        this.env = t, this.isKnockoutUsageSafe() && (this.setDefaultSettings(this.default_settings_values), this.createObservableSettings(), t.ko.applyBindings(t, _$(t.placeholder)))
    }
}), SK.UI.Element.Application.Settings.Base = SK.UI.Element.Application.Settings.Base || new Class({
    Implements: [Options],
    options: {
        timeout: 2e3
    },
    callbacks: {},
    update_interval: null,
    setDefaultSettings: function(t) {
        !this.env.settings && this.is_admin && this.setSettings(t)
    },
    createObservableSettings: function() {
        this.env.settings && Object.each(this.env.settings, function(t, e) {
            this.env.settings[e] = this.env.ko.observable(t), this.env.settings[e].subscribe(this.onChangeSettings, this)
        }, this)
    },
    isKnockoutUsageSafe: function() {
        return this.is_admin || "nodejs" == Browser.name
    },
    onChangeSettings: function() {
        this.callbacks.onChangeSettings = this.callbacks.onChangeSettings || this.saveSettings.bind(this), clearTimeout(this.update_interval), this.update_interval = setTimeout(this.callbacks.onChangeSettings, this.options.timeout)
    },
    getSettings: function() {
        var t = {};
        return this.env.settings && Object.each(this.env.settings, function(e, n) {
            t[n] = "function" == typeof e ? e() : e
        }), t
    },
    setSettings: function(t) {
        var e = Object.clone(t);
        Object.getLength(e) && (this.env.settings = e, this.saveSettings(this.env.settings))
    },
    initAppSettingsInstance: function() {
        this.app_settings = new SK.Applications.Settings(this.env)
    },
    saveSettings: function(t, e, n) {
        !this.app_settings && this.initAppSettingsInstance(), t = t || this.getSettings(), e = Function.from(e), n = n || void 0, this.app_settings.set(t, e, n)
    }
}), SK.UI.Element.Application.Settings.implement(SK.UI.Element.Application.Settings.Base.prototype);
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.Application = SK.UI.Element.Application || {}, SK.UI.Element.Application.Display = new Class({
    Extends: SK.UI.Element.Display,
    Implements: SK.UI.Element.Application.Settings.Base,
    default_settings_values: {},
    initialize: function(e) {
        this.env = e, this.setDefaultSettings(this.default_settings_values), this.parent(e)
    },
    createObservables: function() {
        this.parent(), this.createObservableSettings()
    }
});
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.Application = SK.UI.Element.Application || {}, SK.UI.Element.Application.Header = SK.UI.Element.Application.Footer = new Class({
    Extends: SK.UI.Element.Application.Settings
});
if (void 0 === SK) var SK = {};
void 0 === SK.CallToActionButton && (SK.CallToActionButton = {}), void 0 === SK.CallToActionButton.Animations && (SK.CallToActionButton.Animations = {});
SK.CallToActionButton.Animations.Registry = {
    registry: {
        transitions: {},
        highlights: {}
    },
    register: function(t, i, r) {
        this.registry[t][i] = r
    },
    get: function(t, i) {
        return this.registry[t][i]
    }
};
SK.CallToActionButton.Animations.Queue = {
    resources: {
        transitions: "/Shared/UIComponents/Internal/CallToActionButtons/Scripts/Animations/fat_transitions.js",
        highlights: "/Shared/UIComponents/Internal/CallToActionButtons/Scripts/Animations/fat_highlights.js"
    },
    addTransition: function(t, n) {
        this.loadResource("transitions", this.initQueue.bind(this, t, n))
    },
    addHighlight: function(t, n) {
        this.loadResource("highlights", this.initQueue.bind(this, t, n))
    },
    loadResource: function(t, n) {
        SK.RequestTranslatedJS(this.resources[t], SK.Singletons.env.get("site_language"), n.bind(this, t))
    },
    initQueue: function(t, n, i) {
        SK.Singletons.loadpromise.then(function() {
            return new(SK.CallToActionButton.Animations.Registry.get(i, n))(_$(t))
        })
    }
};
SK.CallToActionButton.Animations.Utils = new Class({
    constants: {
        CSS_CLASS_PREFIX: "cta-",
        CSS_SELECTOR_PREFIX: ".cta-"
    },
    elements: {},
    fx: {},
    setElements: function(t) {
        Object.append(this.elements, t || {})
    },
    createElements: function() {},
    getElement: function(t) {
        return t = t || "button", this.elements[t] || (this.elements[t] = this.getElement("button").getElement(this.constants.CSS_SELECTOR_PREFIX + t.split(".").join(this.constants.CSS_SELECTOR_PREFIX)))
    },
    getElements: function() {
        for (var t = new Elements([]), e = 0, n = arguments.length; e < n; e += 1) {
            var i = this.getElement(arguments[e]);
            i && t.push(i)
        }
        return t
    },
    setStyles: function() {},
    initFx: function() {},
    init: function() {},
    onRollOver: function() {},
    onRollOut: function() {},
    initEvents: function() {
        SK.Util.isTouchDevice() || this.getElement("button").addEvents({
            mouseenter: this.onRollOver.bind(this),
            mouseleave: this.onRollOut.bind(this)
        })
    },
    getElementWidth: function(t) {
        var e = t.getWidth() - parseInt(t.getStyle("padding-left"), 10) - parseInt(t.getStyle("padding-right"), 10) - parseInt(t.getStyle("border-left-width"), 10) - parseInt(t.getStyle("border-right-width"), 10);
        return e > 0 ? e : 0
    },
    getElementHeight: function(t) {
        var e = t.getHeight() - parseInt(t.getStyle("padding-top"), 10) - parseInt(t.getStyle("padding-bottom"), 10) - parseInt(t.getStyle("border-top-width"), 10) - parseInt(t.getStyle("border-bottom-width"), 10);
        return e > 0 ? e : 0
    },
    isElementEmpty: function(t) {
        return "string" == typeOf(t) && (t = this.getElement(t)), !(t.get("text") || t.getElement("img"))
    }
});
SK.CallToActionButton.GetColorTheme = function(t, e) {
    if (t = t || 0, e = e || document, this.themes[e] || (this.themes[e] = new Array(3)), !this.themes[e][t]) {
        var a = new Element("span", {
                class: "cta-button cta-custom-color-" + t,
                html: '<span class="cta-wrap cta-body"><span class="cta-body cta-normal"></span></span>',
                style: "display: none"
            }).inject(document.body),
            n = a.getElement(".cta-normal"),
            o = n.getStyle("background-color").trim().replace("transparent", "") || a.getStyle("background-color").trim().replace("transparent", ""),
            s = n.getStyle("background-image").trim().replace("none", "") || a.getStyle("background-image").trim().replace("none", ""),
            r = [];
        o && r.push(o), s && r.push(s), this.themes[e][t] = r.join(" "), a.destroy()
    }
    return this.themes[e][t]
}.bind({
    themes: {}
});
"undefined" == typeof SK && (SK = {}), void 0 === SK.Effects && (SK.Effects = {}), SK.Effects.init = function(e) {
    _$(e).setStyle("display", "block");
    var t = _$(e).getProperty("effect"),
        f = _$(e).getProperty("effect-params");
    SK.Effects.Registry.get(t) && SK.RequestTranslatedJS(SK.Effects.Registry.get(t).url, SK.Singletons.env.get("site_language"), function() {
        new(SK.Effects.Registry.get(t).getConstructor())(e, f)
    })
}, window.addEvent("load", function() {
    $$(".sk-effects").each(function(e) {
        SK.Effects.init(e)
    })
});
"undefined" == typeof SK && (SK = {}), void 0 === SK.Effects && (SK.Effects = {}), SK.Effects.Registry = {
    effects: {
        MovingObjects: {
            url: "/Core/Effects/moving_objects.js",
            getConstructor: function() {
                return SK.Effects.MovingObjects
            }
        },
        MouseTrack: {
            url: "/Core/Effects/mouse_track.js",
            getConstructor: function() {
                return SK.Effects.MouseTrack
            }
        }
    },
    get: function(t) {
        var e = this.effects[t];
        return e && (e.class = e.getConstructor()), e
    }
};
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.Menu = SK.UI.Element.Menu || {}, SK.UI.Element.Menu.Mobile = new Class({
    Implements: [Options],
    options: {
        body_click_close: !0,
        menu_toggler_id: "fm_mobile_menu_toggler",
        menu_id: "fm_menu",
        menu_expanded_class: "fmMenuSelected",
        toggler_expanded_class: "fmMMSelected"
    },
    elements: {
        menu: null,
        toggler: null
    },
    initialize: function(e) {
        this.setOptions(e), this.elements.menu = _$(this.options.menu_id), this.elements.toggler = _$(this.options.menu_toggler_id), this.elements.toggler && this.initEvents()
    },
    initEvents: function() {
        this.elements.toggler.addEvent("click", function(e) {
            this.isShown() ? this.hide() : this.show()
        }.bind(this)), this.options.body_click_close && document.body.addEvent("click", function(e) {
            this.elements.toggler.contains(e.target) || this.elements.menu.contains(e.target) || this.hide()
        }.bind(this))
    },
    isShown: function() {
        return !!this.elements.toggler.hasClass(this.options.toggler_expanded_class)
    },
    show: function() {
        this.elements.toggler.addClass(this.options.toggler_expanded_class), this.elements.menu.addClass(this.options.menu_expanded_class)
    },
    hide: function() {
        this.elements.toggler.removeClass(this.options.toggler_expanded_class), this.elements.menu.removeClass(this.options.menu_expanded_class)
    }
});
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.Menu = SK.UI.Element.Menu || {}, SK.UI.Element.Menu.Animations = new Class({
    animations_available: !0,
    animation_options: {
        duration: 400
    },
    is_animation_disabled: !1,
    clicked_submenu: null,
    drag_from_parent: null,
    menu: null,
    options: {
        orientation: 0,
        animation: 0,
        layout: 0,
        hide_delay: 200
    },
    initAnimations: function(t, e) {
        this.options = Object.append({}, this.options, e), this.menu = t, this.menu.addEvents({
            "mouseenter:relay(div.sk-main-menu-item)": this.onMouseEnter.bind(this),
            "mouseleave:relay(div.sk-main-menu-item)": this.onMouseLeave.bind(this),
            "mouseup:relay(div.sk-main-menu-item)": this.onMouseUp.bind(this),
            "mouseup:relay(.sk-sub-menu div.sk-menu-item-holder)": this.onSubMenuItemClicked.bind(this)
        }), SK.Singletons.env.get("admin_mode") && this.initDrageEventsFromArrangement(), this.setAnimationsEvents(), this.displayActiveSubMenu()
    },
    initDrageEventsFromArrangement: function() {
        SK.Singletons.loadpromise.then(function() {
            SK.Singletons.arrangement && SK.Singletons.arrangement.addEvents({
                startdrag: function(t) {
                    if (this.menu.contains(t)) return this.drag_from_parent = t.getParentLimited(".sk-main-menu-item"), this.disableAnimation(t), t.getElement(".sk-main-menu-item") ? (this.drag_from_parent = null, t.getElement(".sk-sub-menu").addClass("sk-menu-hide")) : void 0
                }.bind(this),
                canceldrag: function() {
                    this.drag_from_parent = null, this.enableAnimation(), this.displayActiveSubMenu()
                }.bind(this),
                dragover: function(t, e) {
                    (e.hasClass("sk-main-menu-item") || this.drag_from_parent) && "show" != this.getAnimationAction(e) && (this.hideAllMenus(), this.showMenu(e))
                }.bind(this)
            })
        }.bind(this))
    },
    setAnimationsEvents: function() {
        this.animation_options = Object.append({}, this.animation_options, {
            onComplete: function(t) {
                "hide" == t.retrieve("animation_action") ? t.getParentLimited(".sk-sub-menu").addClass("sk-menu-hide") : t.getParentLimited(".sk-sub-menu").removeClass("sk-menu-overlap-em")
            }.bind(this)
        })
    },
    displayActiveSubMenu: function() {
        this.is_animation_disabled || (this.menu.getElements(".sk-sub-menu").addClass("sk-menu-hide").addClass("sk-menu-overlap-em"), this.menu.getElements(".sk-sub-menu-holder").removeProperty("style"), this.isLayoutHavingAnimation() && (this.menu.getElements("li.sk-menu-active .sk-menu-item-linked .sk-sub-menu").removeClass("sk-menu-hide"), this.menu.getElements(".sk-sub-menu-holder").removeProperty("style"), this.menu.getElements(".sk-sub-menu").removeClass("sk-menu-overlap-em")))
    },
    setLayoutType: function(t) {
        this.options.layout = (t || 0).toInt(), this.displayActiveSubMenu()
    },
    setAnimationType: function(t) {
        this.options.animation = (t || 0).toInt(), this.displayActiveSubMenu()
    },
    getAnimationType: function() {
        return this.is_animation_disabled ? 2 : this.options.animation
    },
    isTooltips: function(t) {
        return !(!(t = _$(t)) || !t.getParentLimited(".sk-tooltips") && !t.hasClass(".sk-tooltips"))
    },
    isLayoutHavingAnimation: function() {
        return 1 == this.options.orientation && 2 == this.options.layout
    },
    enableAnimation: function(t) {
        this.clicked_submenu && t && !t.contains(this.clicked_submenu) || (this.is_animation_disabled = !1, !this.isLayoutHavingAnimation() && this.hideAllMenus())
    },
    disableAnimation: function(t) {
        if (this.is_animation_disabled = !0, this.clicked_submenu = null, !this.isLayoutHavingAnimation()) {
            var e = t && t.getParentLimited(".sk-main-menu-item");
            e ? this.showMenu.delay(0, this, [e]) : this.hideAllMenus()
        }
    },
    getAnimationAction: function(t) {
        return t.getElement(".sk-sub-menu-holder").retrieve("animation_action") || "hide"
    },
    onMouseEnter: function(t, e) {
        if (!(this.isTooltips((t || {}).relatedTarget) || this.is_animation_disabled || this.isLayoutHavingAnimation())) {
            var i = e.retrieve("hide_animation_timeout");
            e.store("hide_animation_timeout", clearTimeout(i)), this.showMenu(e)
        }
    },
    onMouseLeave: function(t, e) {
        if (!(this.isTooltips((t || {}).relatedTarget) || this.is_animation_disabled || this.isLayoutHavingAnimation())) {
            var i = this.hideMenu.delay(this.options.hide_delay, this, [e]);
            e.store("hide_animation_timeout", i)
        }
    },
    onMouseUp: function(t, e) {
        this.isLayoutHavingAnimation() && !e.hasClass("sk-menu-item-linked") && ("hide" == this.getAnimationAction(e) ? this.showMenu(e) : this.hideMenu(e))
    },
    onSubMenuItemClicked: function(t, e) {
        if (this.clicked_submenu != e) {
            var i = this.is_animation_disabled = SK.Singletons.env.get("admin_mode") && "disabled" == SK.Singletons.env.get("preview_mode");
            this.clicked_submenu = i ? e : null
        }
    },
    getElementFx: function(t) {
        return t.retrieve("fx") || t.store("fx", new Fx.Tween.CSS3(t, this.animation_options)) && t.retrieve("fx")
    },
    getAnimationOffset: function(t, e) {
        return e = (["height", "width"].contains(e) ? e : "height").capitalize(), -2 * t.getElement(".sk-sub-menu-holder")["get" + e]().toInt()
    },
    updateSubMenuPositions: function(t, e) {
        if (1 != this.options.orientation) {
            var i = e.getCoordinates(),
                n = window.getWidth();
            i.width > n ? e.setStyle("left", -(i.left - 40)) : i.left + i.width > n && e.setStyle("left", -(i.left + i.width - n))
        }
    },
    showMenu: function(t) {
        var e = t.getElement(".sk-sub-menu-holder"),
            i = this.getAnimationType();
        if (t.getElement(".sk-sub-menu").removeClass("sk-menu-hide"), "show" != this.getAnimationAction(t)) {
            var n = t.getElement(".sk-sub-menu").removeProperty("style").addClass("sk-menu-overlap-em");
            if (this.updateSubMenuPositions(t, n), e.store("animation_action", "show"), this.drag_from_parent) return e.removeProperty("style"), void e.getParentLimited(".sk-sub-menu").removeClass("sk-menu-overlap-em");
            if (2 != i) {
                var s = this.getElementFx(e);
                s.cancel(), 0 == i && 0 == this.options.orientation && s.start("margin-top", this.getAnimationOffset(t, "height"), 0), 0 == i && 1 == this.options.orientation && s.start("left", this.getAnimationOffset(t, "width"), 0), 1 == i && s.start("opacity", 0, 1)
            } else e.getParentLimited(".sk-sub-menu").removeClass("sk-menu-overlap-em")
        }
    },
    hideMenu: function(t) {
        t.getElement(".sk-sub-menu").removeClass("sk-menu-overlap-em");
        var e = this.getAnimationType(),
            i = t.getElement(".sk-sub-menu-holder");
        if (i.getParentLimited(".sk-sub-menu").addClass("sk-menu-overlap-em"), "hide" != this.getAnimationAction(t))
            if (i.store("animation_action", "hide"), this.drag_from_parent) {
                if (this.drag_from_parent == t && this.isLayoutHavingAnimation()) return;
                0 == this.options.orientation ? i.setStyle("margin-top", this.getAnimationOffset(t, "height")) : i.setStyle("left", this.getAnimationOffset(t, "width"))
            } else if (2 != e) {
            var n = this.getElementFx(i);
            n.cancel(), 0 == e && 0 == this.options.orientation && n.start("margin-top", this.getAnimationOffset(t, "height")), 0 == e && 1 == this.options.orientation && n.start("left", this.getAnimationOffset(t, "width")), 1 == e && n.start("opacity", 0)
        } else t.getElement(".sk-sub-menu").addClass("sk-menu-hide")
    },
    hideAllMenus: function() {
        this.menu && this.menu.getElements(".sk-main-menu-item").each(this.hideMenu.bind(this))
    }
});
var SK = void 0 !== SK ? SK : {};
SK.LoadCustomFonts = function(t, e) {
    if (t && t.length) {
        document.documentElement.classList.add("sk-fonts-loading");
        switch (e) {
            case "FOIT":
            default:
                document.documentElement.classList.add("sk-invisible-text");
                for (var n = function() {
                        t.shift(), t.length || (document.documentElement.classList.remove("sk-invisible-text"), document.documentElement.classList.remove("sk-fonts-loading"))
                    }, s = 0, o = t.length; s < o; s++) SK.LoadCustomFont(t[s], n)
        }
    }
}, SK.LoadCustomFont = function(t, e) {
    var n = document.head.appendChild(document.createElement("link"));
    n.onload = e, n.setAttribute("type", "text/css"), n.setAttribute("rel", "stylesheet"), n.setAttribute("href", t)
};
SK = "undefined" == typeof SK ? {} : SK, SK.BuildSnapshotLinks = function() {
    setTimeout(function() {
        Array.from(document.body.getElementsByTagName("a")).filter(e => e.getAttribute("href") && e.getAttribute("href").startsWith(`/${SK.Singletons.env.get("user_name")}/`)).forEach(e => {
            var t = e.getAttribute("href");
            if ("sk-logo-manager-link" == e.id) {
                var n = new URL(window.location.protocol + SK.Singletons.env.get("home_page_url").replace(/^http(s)?/, ""));
                t = [n.pathname, location.search, n.hash].join("")
            } else {
                var r = "",
                    a = t.match(/(#.*)$/);
                a && (r = a[0], t = t.replace(r, "")), t = `${t=t.substring(0,t.indexOf("?"))||t}${location.search}${r}`
            }
            e.setAttribute("href", t)
        })
    }, 300)
};
SK.LinkSerializer = SK.LinkSerializer || {
    serialize: function(e, i) {
        return ["{SK__LINK__", SK.Util.deserializeNodeId(e), "__", i, "__SK}"].join("")
    },
    deserialize: function(e, i) {
        return ((e || "").match(SK.LinkSerializer.generateRegEx()) || [])[i || 2]
    },
    generateRegEx: function(e) {
        return new RegExp("\\{SK__LINK__((?:anchor_)?\\d+_?\\d*)__(.+)__SK\\}", e ? "g" : "")
    }
};
SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.Binding = class extends React.Component {
    constructor(e) {
        super(e), this.properties_obj = {}, this.state = {}, this.state = this.objectivizeProperties(e.properties), this.properties_obj = Object.assign({}, e)
    }
    objectivizeProperties(e) {
        for (var t in e)
            if (e.hasOwnProperty(t) && "string" == typeof e[t] && /^\s*(?:\{(?:.|\n)*\}|\[(?:.|\n)*\])\s*$/.test(e[t])) try {
                e[t] = JSON.parse(e[t])
            } catch (e) {}
        return e
    }
    lockServer() {
        SK.Singletons.lifecycle && SK.Singletons.lifecycle.lock()
    }
    unlockServer() {
        SK.Singletons.lifecycle && SK.Singletons.lifecycle.unlock(this.properties_obj)
    }
    getPropertiesObj() {
        return this.properties_obj.properties = Object.assign({}, this.properties_obj.properties, this.state), this.properties_obj
    }
    executeObjectSet(e, t) {}
};
SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.API || (SK.React.Component.API = (t => (class extends t {}))), SK.React.Component.ZeroFootprint || (SK.React.Component.ZeroFootprint = function() {
    return null
}), SK.React.Component.Display = class extends(SK.React.Component.API(SK.React.Component.Binding)) {
    constructor(...t) {
        var e;
        return e = super(...t), this.version = 4, this.placeholder = null, this.properties_callbacks = {
            update: function() {}
        }, this.validation_status = {}, this.has_validation_errors = !1, e
    }
    getData() {
        return this.props
    }
    getChildren() {
        return [].concat((this.state || {}).__elements || [])
    }
    getUpdateCallback() {
        return this.properties_callbacks.update || function() {}
    }
    setCallbacks(t) {
        this.properties_callbacks = t
    }
    setState(t, e) {
        var a = this.getUpdateCallback();
        super.setState(t, e), a(t)
    }
    setBaseState(t) {
        super.setState(t)
    }
    getDOMNode() {
        return ReactDOM.findDOMNode(this)
    }
    getPlaceholder() {
        return this.placeholder || (this.placeholder = document.getElementById(this.props.placeholder))
    }
    setValidationStatus(t) {
        this.validation_status = t, this.allowPropertiesSave(t.is_valid)
    }
    setValidationErrors(t) {
        this.has_validation_errors = t
    }
    hasValidationErrors() {
        return this.has_validation_errors
    }
    displayStatusMessage(t) {
        SKMessage(t || this.validation_status.message)
    }
    isInEditMode() {
        return this.edit_mode
    }
    activateMenuRepresentative() {
        SK.Singletons.uimenu.getRepresentativeByNodeID(this.props.representative_id || this.props.node_id).activateState("active")
    }
    beforeStartEdit() {}
    startEdit(t) {}
    beforeFinishEdit() {}
    finishEdit(t) {}
    shouldComponentUpdate(t, e) {
        return !0
    }
    render() {
        return React.createElement("div", null)
    }
    componentDidUpdate(t, e) {}
    componentDidMount() {}
    componentWillUnmount() {}
};