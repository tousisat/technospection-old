SK.Actions.Freemona = SK.Actions.Freemona || {}, SK.Actions.Freemona.Page = SK.Actions.Freemona.Page || {}, SK.Actions.Freemona.Page.editTmplOptionsCallback = function(e, t, n) {
    return t && t.edit_tmpl && "$image_edit_tmpl" == t.edit_tmpl ? {
        window_options: {
            width: 1080,
            height: 720
        }
    } : {}
}, SK.Actions.Freemona.Page.initPageImageCM = function(e) {
    var t = _$(e),
        n = document.getElement(".pageImage");
    if (null != n) {
        if ("none" == n.getComputedStyle("display")) var i = t.getElement("div.sk-zero-footprint"),
            o = new Element("div").grab(i).wraps(n);
        else o = n;
        o.setProperties({
            meta: t.get("meta"),
            env: t.get("env")
        })
    }
    t.parentNode.removeChild(t)
};

function LoadStyles(e) {
    document.write('<style type="text/css">' + e + "</style>")
}
"undefined" == typeof SK && (SK = {}), void 0 === SK.Actions && (SK.Actions = {}), void 0 === SK.Actions.Freemona && (SK.Actions.Freemona = {}), SK.Actions.Freemona.showHideEmptySharedPanel = function(e) {
    var n = $$("#AREA__SHARED_PANEL_AREA .sharedElementContentWrapper");
    if (1 == n.length) {
        var o = n[0].getChildren();
        if (0 == o.length || 1 == o.length && o[0].hasClass("sk-obj-placeholder")) {
            var a = $$("#collapsiblePanel_cell", "#collapsiblePanel", "#fm_shared_panel_button_cell", "#fm_shared_panel_button", "#fm_collapsible_panel_button_expand", "#fm_collapsible_panel_button_collapse");
            "hide" == e ? a.hide() : a.show()
        }
    }
}, SK.Actions.Freemona.showHideEmptyTopNavigation = function(e) {
    if (0 == $$(".miTopLink").length) {
        var n = $$("#fm_header_menu_cell", "#fm_header_menu", "#AREA__TOP_NAV_AREA", "#top_menu_wrapper");
        "hide" == e ? n.hide() : n.show()
    }
}, SK.Actions.Freemona.hideEmptySharedPanel = function() {
    SK.Actions.Freemona.showHideEmptySharedPanel("hide")
}, SK.Actions.Freemona.hideEmptyTopNavigation = function() {
    SK.Actions.Freemona.showHideEmptyTopNavigation("hide")
}, void 0 === SK.UI && (SK.UI = {}), void 0 !== SK.UI.Preview && (SK.UI.Preview.addEvents({
    onEnable: SK.Actions.Freemona.showHideEmptySharedPanel.pass("hide"),
    onDisable: SK.Actions.Freemona.showHideEmptySharedPanel.pass("show")
}), SK.UI.Preview.addEvents({
    onEnable: SK.Actions.Freemona.showHideEmptyTopNavigation.pass("hide"),
    onDisable: SK.Actions.Freemona.showHideEmptyTopNavigation.pass("show")
}));

function ApplyBorderSideImages(e) {
    if (e) {
        var n = null,
            l = null,
            t = null,
            a = null,
            m = null,
            r = null,
            _ = null,
            i = null,
            d = null;
        e.object && (n = e.object), e.top_left_image && (l = e.top_left_image), e.top_image && (t = e.top_image), e.top_right_image && (a = e.top_right_image), e.left_image && (m = e.left_image), e.right_image && (r = e.right_image), e.bottom_left_image && (_ = e.bottom_left_image), e.bottom_image && (i = e.bottom_image), e.bottom_right_image && (d = e.bottom_right_image);
        var u = n.parentNode,
            g = document.createElement("DIV"),
            o = document.createElement("DIV"),
            p = document.createElement("DIV"),
            s = document.createElement("DIV"),
            c = document.createElement("DIV"),
            f = document.createElement("DIV"),
            h = document.createElement("DIV"),
            b = document.createElement("DIV");
        g.id = "wrapper_layer_0", o.id = "wrapper_layer_1", p.id = "wrapper_layer_2", s.id = "wrapper_layer_3", c.id = "wrapper_layer_4", f.id = "wrapper_layer_5", h.id = "wrapper_layer_6", b.id = "wrapper_layer_7", g.style.backgroundImage = 'url("' + l + '")', o.style.backgroundImage = 'url("' + t + '")', p.style.backgroundImage = 'url("' + a + '")', s.style.backgroundImage = 'url("' + m + '")', c.style.backgroundImage = 'url("' + r + '")', f.style.backgroundImage = 'url("' + _ + '")', h.style.backgroundImage = 'url("' + i + '")', b.style.backgroundImage = 'url("' + d + '")', u.appendChild(g), g.appendChild(o), o.appendChild(p), p.appendChild(s), s.appendChild(c), c.appendChild(f), f.appendChild(h), h.appendChild(b), b.appendChild(n)
    }
}

function RunDebugMode() {
    for (var e = document.location.href, n = new Object, l = e.substr(e.indexOf("?") + 1).split("&"), t = 0; t < l.length; t++) {
        var a = l[t].split("=");
        n[a[0]] = new String, n[a[0]] = a[1]
    }
    n.template_alignment && (1 == n.template_alignment ? _$("fm_browser_cell").align = "left" : 2 == n.template_alignment ? _$("fm_browser_cell").align = "right" : _$("fm_browser_cell").align = "center"), n.template_width && (_$("site_body_table").style.width = n.template_width);
    var m = _$("fm_menu").className.split(" ");
    if (n.menu_style) {
        for (t = 0; t < m.length; t++) - 1 != m[t].indexOf("menuStyle") && (m[t] = "menuStyle" + n.menu_style);
        _$("menu_stylesheet").href = "/Designs/Freemona/css/menu_type_" + n.menu_style + ".css"
    }
    if (n.menu_alignment)
        for (t = 0; t < m.length; t++) - 1 != m[t].indexOf("menuAlign") && (1 == n.menu_alignment ? (m[t] = "menuAlignCenter", _$("fm_menu").align = "center") : 2 == n.menu_alignment ? (m[t] = "menuAlignRight", _$("fm_menu").align = "right") : (m[t] = "menuAlignLeft", _$("fm_menu").align = "left"));
    var r = m.join(" ");
    _$("fm_menu_wrapper").className = _$("fm_menu").className = r, n.menu_padding && (-1 == n.menu_padding.indexOf("px") ? _$("fm_mnav_cell").style.padding = n.menu_padding + "px" : _$("fm_mnav_cell").style.padding = n.menu_padding), n.menu_bckg && 1 == n.menu_bckg && (_$("fm_mnav_cell").style.backgroundImage = 'url("/Tools/file_direct_link.html?node_id=266335")', _$("fm_mnav_cell").style.backgroundColor = "red"), n.open_submenu && 1 == n.open_submenu && (ONLOAD_FUNCTIONS[ONLOAD_FUNCTIONS.length] = "OpenFirstSubmenu();")
}

function GetDOMChildren(e) {
    var n = [e];
    if (e.childNodes.length > 0)
        for (var l = 0; l < e.childNodes.length; l++)
            for (var t = GetDOMChildren(e.childNodes[l]), a = 0; a < t.length; a++) n.push(t[a]);
    return n
}

function HasClass(e, n) {
    for (var l = e.split(" "), t = 0; t < l.length; t++)
        if (l[t] == n) return !0;
    return !1
}

function OpenFirstSubmenu() {
    for (var e = GetDOMChildren(_$("fm_menu")), n = 0; n < e.length; n++) void 0 !== e[n].className && HasClass(e[n].className, "effects_holder") && (e[n].style.display = "block", n = e.length)
}
"undefined" == typeof SK && (SK = {}), void 0 === SK.Actions && (SK.Actions = {}), void 0 === SK.Actions.Freemona && (SK.Actions.Freemona = {}), SK.Actions.Freemona.expandPanel = function(e) {
    var t = _$(e.panel),
        n = _$(e.content);
    if (t && n) {
        var o = n.getSize().y;
        t.retrieve("initial_height") || (t.store("initial_height", t.getSize().y), t.get("morph").addEvents({
            onComplete: SK.Actions.Freemona.onCollapseComplete
        })), t.set("morph", {
            duration: 1e3,
            transition: "quart:out"
        }), t.store("panel_status", "expand"), t.morph({
            height: o
        })
    }
}, SK.Actions.Freemona.collapsePanel = function(e) {
    var t = _$(e.panel),
        n = _$(e.content);
    t && n && (t.store("panel_status", "collapse"), t.setStyles({
        overflow: "hidden",
        height: `${t.firstElementChild.offsetHeight}px`
    }), t.set("morph", {
        duration: 1e3,
        transition: "quart:in"
    }), t.morph({
        height: t.retrieve("initial_height")
    }))
}, SK.Actions.Freemona.swapVisible = function(e, t) {
    [e, t].each(function(e) {
        (e = _$(e)) && ("none" == e.getStyle("display") ? e.setStyle("display", "block") : e.setStyle("display", "none"))
    })
}, SK.Actions.Freemona.onCollapseComplete = function(e) {
    "expand" == e.retrieve("panel_status") && e.setStyles({
        overflow: "visible",
        height: "auto"
    })
};