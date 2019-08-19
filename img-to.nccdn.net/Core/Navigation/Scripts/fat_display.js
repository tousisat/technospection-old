SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.Menu = SK.UI.Element.Menu || {}, SK.UI.Element.Menu.UpdateChildren = new Class({
    getChildElements: function() {
        return this.getPlaceholder().getElements(".sk-menu-item-holder")
    },
    updateFirstLastClass: function() {
        var e = this.getChildElements();
        e.removeClass("fmBtnFst").removeClass("fmBtnLst"), e[0] && e[0].addClass("fmBtnFst"), e.getLast() && e.getLast().addClass("fmBtnLst")
    }
});
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.Menu = SK.UI.Element.Menu || {}, SK.UI.Element.Menu.Display = new Class({
    Extends: SK.UI.Element.Display,
    Implements: [SK.UI.Element.Menu.UpdateChildren],
    default_property_values: {
        Type: ""
    },
    reload_page_on_exit: !1,
    initialize: function() {
        this.parent.apply(this, arguments), SK.Singletons.env.get("admin_mode") && this.placeholder.addClass("sk-menu-admin"), this.updateFirstLastClass(), this.fixTopBottomMenuWrapperID()
    },
    setDefaults: function() {
        var e = this.parent.apply(this, arguments);
        return 1 != this.env.menu_properties.orientation || [2, 3].contains((e.SubmenuLayout || 0).toInt()) || (e.SubmenuLayout = 3), 0 != this.env.menu_properties.orientation || [0, 1].contains((e.SubmenuLayout || 2).toInt()) || (e.SubmenuLayout = 1), Object.append({}, this.env.menu_properties.properties, Object.cleanValues(e, function(e) {
            return "" !== e
        }))
    },
    fixTopBottomMenuWrapperID: function() {
        if ("nodejs" == Browser.name) {
            var e = {
                15: "top_menu_wrapper",
                16: "bottom_menu_wrapper"
            }[this.env.obj_id];
            e && new Element("div", {
                id: e
            }).wraps(this.getPlaceholder())
        }
    },
    createComputed: function() {
        this.env.children.subscribe(this.updateFirstLastClass.delay.bind(this.updateFirstLastClass, 0, this)), this.env.orientation = this.env.ko.observable((this.env.menu_properties || {}).orientation || 0), this.env.wrapper_class = this.env.ko.computed(this.getWrapperClass.bind(this)), this.env.wrapper_id = 17 == this.env.obj_id ? "fm_sec_menu" : "", this.env.list_id = {
            14: "sk-main-menu-list",
            17: "sk-secondary-menu-list"
        }[this.env.obj_id] || ""
    },
    getWrapperClass: function() {
        return 1 == this.env.orientation() ? "sk-menu-vertical" : "sk-menu-horizontal"
    },
    handleResponse: function(e, t, n) {
        this.reload_page_on_exit && SK.Actions.Common.reloadPage()
    },
    setReloadPage: function() {
        this.reload_page_on_exit = !0
    }
});
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.Menu = SK.UI.Element.Menu || {}, SK.UI.Element.Menu.Display = SK.UI.Element.Menu.Display || {}, SK.UI.Element.Menu.Display.Main = new Class({
    Extends: SK.UI.Element.Menu.Display,
    Implements: [SK.UI.Element.Menu.Animations || function() {}],
    initialize: function() {
        this.parent.apply(this, arguments), this.animations_available && (this.initAnimations(this.getPlaceholder(), {
            animation: this.getProperty("SubmenuAnimation"),
            layout: this.getProperty("SubmenuLayout"),
            orientation: this.env.menu_properties.orientation
        }), this.removeMenuForceHiding()), SK.UI.Element.Menu.Mobile && new SK.UI.Element.Menu.Mobile
    },
    createComputed: function() {
        this.parent(), this.env.properties.SubmenuAnimation.subscribe(function(e) {
            this.animations_available && this.setAnimationType(e)
        }.bind(this)), this.env.properties.SubmenuLayout.subscribe(function(e) {
            this.animations_available && this.setLayoutType(e)
        }.bind(this)), this.env.wrapper_id = "fm_menu"
    },
    getWrapperClass: function() {
        var e = this.getProperty("MenuAlignment"),
            n = this.getProperty("SubmenuLayout");
        return [this.parent(), 0 == e || 1 == this.env.orientation() ? "sk-menu-left" : "", 1 == e && 0 == this.env.orientation() ? "sk-menu-center" : "", 2 == e && 0 == this.env.orientation() ? "sk-menu-right" : "", 0 == n ? "sk-sub-menu-horizontal" : "", 1 == n ? "sk-sub-menu-vertical" : "", 2 == n ? "sk-sub-menu-vertical-inside" : "", 3 == n ? "sk-sub-menu-vertical-beside" : ""].join(" ")
    },
    removeMenuForceHiding: function() {
        this.getPlaceholder().getElements(".sk-menu-hide-sub-menu").removeClass("sk-menu-hide-sub-menu")
    },
    getChildElements: function() {
        return this.getPlaceholder().getElements(".sk-main-menu-item")
    },
    setActiveState: function() {
        this.animations_available && this.displayActiveSubMenu()
    },
    cancelEdit: function() {
        this.removeMenuForceHiding(), this.parent.apply(this, arguments)
    },
    finishEdit: function() {
        return this.removeMenuForceHiding(), this.parent.apply(this, arguments)
    }
});