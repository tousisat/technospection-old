SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.Menu = SK.UI.Element.Menu || {}, SK.UI.Element.Menu.UpdateChildren = new Class({
    getChildElements: function() {
        return this.getPlaceholder().getElements(".sk-menu-item-holder")
    },
    updateFirstLastClass: function() {
        var e = this.getChildElements();
        e.removeClass("fmBtnFst").removeClass("fmBtnLst"), e[0] && e[0].addClass("fmBtnFst"), e.getLast() && e.getLast().addClass("fmBtnLst")
    }
});
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.MenuItem = SK.UI.Element.MenuItem || {}, SK.UI.Element.MenuItem.Display = new Class({
    Extends: SK.UI.Element.Display,
    Implements: [SK.UI.Element.StockImagesURLsResolver || function() {}],
    default_property_values: {
        Alt: "",
        Text: "",
        SubTitle: "",
        InternalLink: "",
        LinkOptions: "",
        LinkType: "",
        Link: "",
        MenuItemColor: "0",
        ImageSrcType: "none",
        ImageLocation: "left",
        ResizeImages: "1",
        NormalImageStock: "",
        RolloverImageStock: "",
        SelectedImageStock: "",
        NormalImageSrc: "",
        RolloverImageSrc: "",
        SelectedImageSrc: "",
        InternalLinkSelect: ""
    },
    mouse_events: {},
    icons_maping: ["NormalImage", "RolloverImage", "SelectedImage"],
    initialize: function(e, t) {
        e.admin_mode = SK.Singletons.env.get("admin_mode"), this.parent(e, t)
    },
    createComputed: function() {
        this.env.link_href = this.env.ko.observable(this.getPlaceholder().getElement("a").get("href") || "").extend({
            notify: "always"
        });
        var e = this.env.ko.computed(this.compileMenuLink.bind(this));
        this.env.link_href(e()), e.subscribe(this.env.link_href), this.env.onclick_action = this.env.ko.observable(this.env.admin_mode ? "return SK.Singletons.element_instances.get(" + this.env.node_id + ').env.link_href() != "#" && SK.Singletons.env.get("preview_mode") != "disabled";' : "#" == this.env.link_href() ? "return false;" : ""), this.env.icons = {
            NormalImage: this.env.ko.observable(""),
            RolloverImage: this.env.ko.observable(""),
            SelectedImage: this.env.ko.observable("")
        };
        this.env.ko.computed(this.compileIconsList.bind(this));
        this.env.link_options = {
            rel: this.env.ko.observable(""),
            target: this.env.ko.observable("")
        }, this.updateLinkOptions(this.getProperty("LinkOptions")), this.env.properties.LinkOptions.subscribe(this.updateLinkOptions.bind(this)), this.env.wrapper_class = this.env.ko.observable(this.getWrapperClass()), this.env.ko.computed(this.getWrapperClass.bind(this)).subscribe(this.env.wrapper_class), this.env.color_scheme_list = this.env.ko.observableArray([]), this.env.color_selected = this.env.ko.observable(this.env.properties.MenuItemColor()), this.env.properties.Text.subscribe(e => {
            SK.Singletons.env.get("advanced_options_enabled") || this.env.properties.Alt(e)
        })
    },
    getWrapperClass: function() {
        var e = this.getProperty("ImageSrcType"),
            t = "none" != e && !!this.env.icons.NormalImage(),
            n = this.getProperty("MenuItemColor") || "0",
            i = ["_NONE_", ""].contains(this.getProperty("InternalLink")) && "" == this.getProperty("Link");
        return [61 == this.env.obj_id ? "sk-main-menu-item" : "sk-menu-item-holder", 21 == this.env.obj_id ? "cs" : "", 61 == this.env.obj_id ? ["cs", n].join("") : "", t || "" != this.getProperty("SubTitle") || this.env.editing_activated() ? "wIcn" : "", t && "left" == this.getProperty("ImageLocation") ? "wIcnL" : "", t && "right" == this.getProperty("ImageLocation") ? "wIcnR" : "", !t || "stock" != e && "1" != this.getProperty("ResizeImages") ? "" : "imgResize", i ? "" : "sk-menu-item-linked"].join(" ")
    },
    compileMenuLink: function() {
        var e = this.env.link_href(),
            t = this.getProperty("Link"),
            n = this.getProperty("InternalLink");
        return "nodejs" != Browser.name || ["", "_NONE_", "_EXT_"].contains(n) ? t ? e = t : ["", "_NONE_"].contains(n) && (e = "#") : e = "page_node_id://" + SK.Singletons.env.get("user_id") + "_" + n, e
    },
    compileIconsList: function() {
        for (var e = {
                stock: "Stock",
                custom: "Src"
            }[this.getProperty("ImageSrcType")], t = this.getProperty("NormalImage" + e), n = 0, i = this.icons_maping.length; n < i; n++) {
            var s = this.getProperty(this.icons_maping[n] + e) || t;
            "Stock" == e && (s = JSON.decode(s) || {
                sizes: {}
            }, s = "nodejs" == Browser.name ? "stock_image_id://" + s.collection_id + "___" + s.id + "___small" : this.resolveStockImagesURLs(s)), this.env.icons[this.icons_maping[n]]([s, t].contains("__None__") ? "" : s)
        }
    },
    updateLinkOptions: function(e) {
        if ("string" != typeOf(e) || 0 !== (e || "").indexOf("HASH(")) {
            var t = {};
            try {
                t = JSON.decode(e) || {}
            } catch (e) {}
            this.env.link_options.rel(t.rel || ""), this.env.link_options.target(t.target || "")
        }
    }
});
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.MenuItem = SK.UI.Element.MenuItem || {}, SK.UI.Element.MenuItem.Display = SK.UI.Element.MenuItem.Display || {}, SK.UI.Element.MenuItem.Display.Client = SK.UI.Element.MenuItem.Display.Client || new Class({
    Extends: SK.UI.Element.MenuItem.Display,
    Implements: [SK.UI.Element.Menu.UpdateChildren],
    is_active_menu: !1,
    initialize: function(e, t) {
        if (this.parent(e, t), this.has_zero_footprint_method && 61 == this.env.obj_id) {
            var n = this.getPlaceholder();
            this.printZeroFootprint(this.env.zero_footprint_text, n.getElement(".sk-sub-menu li"), ["#e", this.env.node_id, " .sk-sub-menu .sk-sub-menu-holder [contenteditable]"].join(""))
        }
        this.initClient()
    },
    initClient: function() {
        this.initElementMenuForSubMenu(), this.initARIAAttributes(), this.initEventHandlers(), this.addBottomMenuClassToPlaceholder(), this.updateFirstLastClass(), SK.Singletons.loadpromise.then(this.setActiveState.bind(this, null)), !this.is_admin || "firefox" != Browser.name && "ie" != Browser.name || this.focusContentEditables()
    },
    getChildElements: function() {
        return 61 != this.env.obj_id ? $$([]) : this.getPlaceholder().getElement(".sk-sub-menu").getElements(".sk-menu-item-holder")
    },
    addBottomMenuClassToPlaceholder: function() {
        63 == this.env.obj_id && this.getPlaceholder().addClass("bottom_nav_item")
    },
    initARIAAttributes: function() {
        var e = this.getPlaceholder().getElement(".menu_contents");
        this.env.children && this.env.children.length && (this.toggleARIAExpanded = this.toggleARIAExpanded.bind(this, e), e.addEvents({
            mouseenter: this.toggleARIAExpanded,
            mouseleave: this.toggleARIAExpanded
        }), e.setAttribute("aria-haspopup", !0), e.setAttribute("aria-expanded", !1))
    },
    initEventHandlers: function() {
        var e = this.getPlaceholder().getElement(".sk-menu-item-wrapper");
        if (e && !SK.Util.isTouchDevice()) {
            var t = this.toggleSelectedState.bind(this, e);
            e.addEvents({
                mouseenter: t,
                mouseleave: t
            })
        }
    },
    toggleSelectedState: function(e) {
        this.is_active_menu || e.toggleClass("sel")
    },
    toggleARIAExpanded: function(e) {
        "true" == e.getAttribute("aria-expanded") ? e.setAttribute("aria-expanded", !1) : e.setAttribute("aria-expanded", !0)
    },
    setActiveState: function(e) {
        var t = SK.Singletons.element_instances.get(this.env.parent_id) || {},
            n = this.getPlaceholder(),
            i = "21" == this.env.obj_id ? "curSub" : "cur";
        e = SK.Util.deserializeNodeId(e || this.getProperty("InternalLink")), $$(n.getElement(".sk-menu-item-wrapper")).removeClass(i), $$(n.getParentLimited("li")).removeClass("sk-menu-active"), this.is_active_menu = !1, (SK.Singletons.env.get("page_node_id") == e || n.getElement(".sk-menu-active")) && ($$(n.getElement(".sk-menu-item-wrapper")).addClass(i), $$(n.getParentLimited("li")).addClass("sk-menu-active"), n.getElements(".sk-sub-menu-holder").removeProperty("style"), this.is_active_menu = !0), Function.from(t.setActiveState).apply(t, [this.getProperty("InternalLink")])
    },
    initElementMenuForSubMenu: function() {
        var e = this.getPlaceholder().getElement(".sk-sub-menu-holder");
        this.env.admin_mode && e && !SK.Singletons.env.get("sk_aa_preview") && SK.Singletons.loadpromise.then(function() {
            e.setProperty("meta", this.getPlaceholder().getProperty("meta"));
            var t = new SK.UI.Element.Representative.Menu(e, {
                node_id: this.env.node_id,
                parent_id: this.env.parent_id,
                obj_id: this.env.obj_id,
                obj_order: this.env.obj_order
            }, {
                id: "sub_menu_area_" + this.env.node_id,
                is_submenu: !0,
                btn_edit: !1,
                edit_inline: !1
            });
            e.store("representative", t), SK.Singletons.arrangement.registerAdditionalPlaceholderElements(this.env.obj_id, this.placeholder.getElement(".sk-main-menu-item")), SK.Singletons.arrangement.registerHiddenElements(this.placeholder.getElement(".subNav"))
        }.bind(this))
    },
    actionsForPageLinkType: function() {
        "[add_new_page]" == this.getProperty("InternalLinkSelect") && this.addNewPageLink()
    },
    addNewPageLink: function() {
        (new SK.API).execute("object.set", {
            node_id: this.env.node_id,
            properties: JSON.encode(Object.append({}, this.getProperties(), {
                LinkType: "[newpage]",
                InternalLink: "[newpage]",
                InternalLinkSelect: "[newpage]"
            }))
        }, this.updateNewPageProperties.bind(this))
    },
    updateNewPageProperties: function(e, t, n) {
        e && n.properties && (this.setProperties(n.properties), (new SK.API).execute("object.get", {
            node_id: n.properties.InternalLink
        }, function(e, t, n) {
            e && n.properties && this.env.link_href(n.properties.extra.admin_url)
        }.bind(this)))
    },
    createComputed: function() {
        this.parent(), this.env.children && this.env.children.subscribe(this.updateFirstLastClass.delay.bind(this.updateFirstLastClass, 0, this))
    },
    cancelEdit: function() {
        this.enableAnimation(21 == this.env.obj_id ? this.getPlaceholder() : null), this.parent.apply(this, arguments)
    },
    startEdit: function() {
        this.disableAnimation(21 == this.env.obj_id ? this.getPlaceholder() : null), this.parent.apply(this, arguments)
    },
    disableAnimation: function(e) {
        var t = SK.Singletons.element_instances.get(this.env.parent_id) || {};
        Function.from(t.disableAnimation).apply(t, arguments)
    },
    enableAnimation: function(e) {
        var t = SK.Singletons.element_instances.get(this.env.parent_id) || {};
        Function.from(t.enableAnimation).apply(t, arguments)
    },
    finishEdit: function() {
        return this.setActiveState(), this.actionsForPageLinkType(), this.enableAnimation(21 == this.env.obj_id ? this.getPlaceholder() : null), this.parent.apply(this, arguments)
    },
    focusContentEditables: function() {
        _$(this.placeholder).getElement(".menu_contents").addEvent("mousedown", function() {
            var e = this,
                t = e.getAttribute("href");
            e.removeAttribute("href"), setTimeout(function() {
                e.setAttribute("href", t)
            }, 0)
        })
    }
});