if (void 0 === deconcept) var deconcept = new Object;
void 0 === deconcept.util && (deconcept.util = new Object), void 0 === deconcept.SWFObjectUtil && (deconcept.SWFObjectUtil = new Object), deconcept.SWFObject = function(t, e, i, r, a, s, n, o, c, l, h) {
    if (document.createElement && document.getElementById) {
        this.DETECT_KEY = h || "detectflash", this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY), this.params = new Object, this.variables = new Object, this.attributes = new Array, t && this.setAttribute("swf", t), e && this.setAttribute("id", e), i && this.setAttribute("width", i), r && this.setAttribute("height", r), a && this.setAttribute("version", new deconcept.PlayerVersion(a.toString().split("."))), this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion(this.getAttribute("version"), n), s && this.addParam("bgcolor", s);
        var d = o || "high";
        this.addParam("quality", d), this.addParam("allowscriptaccess", "always"), this.addParam("allownetworking", "external"), this.setAttribute("useExpressInstall", n), this.setAttribute("doExpressInstall", !1);
        var u = c || window.location;
        this.setAttribute("xiRedirectUrl", u), this.setAttribute("redirectUrl", ""), l && this.setAttribute("redirectUrl", l)
    }
}, deconcept.SWFObject.prototype = {
    setAttribute: function(t, e) {
        this.attributes[t] = e
    },
    getAttribute: function(t) {
        return this.attributes[t]
    },
    addParam: function(t, e) {
        this.params[t] = e
    },
    getParams: function() {
        return this.params
    },
    addVariable: function(t, e) {
        this.variables[t] = e
    },
    getVariable: function(t) {
        return this.variables[t]
    },
    getVariables: function() {
        return this.variables
    },
    getVariablePairs: function() {
        var t, e = new Array,
            i = this.getVariables();
        for (t in i) e.push(t + "=" + i[t]);
        return e
    },
    getSWFHTML: function() {
        var t = "";
        if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
            this.getAttribute("doExpressInstall") && this.addVariable("MMplayerType", "PlugIn"), t = '<embed type="application/x-shockwave-flash" src="' + this.getAttribute("swf") + '" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '"', t += ' id="' + this.getAttribute("id") + '" name="' + this.getAttribute("id") + '" ';
            var e = this.getParams();
            for (var i in e) t += [i] + '="' + e[i] + '" ';
            var r = this.getVariablePairs().join("&");
            r.length > 0 && (t += 'flashvars="' + r + '"'), t += "/>"
        } else {
            this.getAttribute("doExpressInstall") && this.addVariable("MMplayerType", "ActiveX"), t = '<object id="' + this.getAttribute("id") + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '">', t += '<param name="movie" value="' + this.getAttribute("swf") + '" />';
            var a = this.getParams();
            for (var i in a) t += '<param name="' + i + '" value="' + a[i] + '" />';
            var s = this.getVariablePairs().join("&");
            s.length > 0 && (t += '<param name="flashvars" value="' + s + '" />'), t += "</object>"
        }
        return t
    },
    write: function(t) {
        if (this.getAttribute("useExpressInstall")) {
            var e = new deconcept.PlayerVersion([6, 0, 65]);
            this.installedVer.versionIsValid(e) && !this.installedVer.versionIsValid(this.getAttribute("version")) && (this.setAttribute("doExpressInstall", !0), this.addVariable("MMredirectURL", escape(this.getAttribute("xiRedirectUrl"))), document.title = document.title.slice(0, 47) + " - Flash Player Installation", this.addVariable("MMdoctitle", document.title))
        }
        return this.skipDetect || this.getAttribute("doExpressInstall") || this.installedVer.versionIsValid(this.getAttribute("version")) ? (("string" == typeof t ? document.getElementById(t) : t).innerHTML = this.getSWFHTML(), !0) : ("" != this.getAttribute("redirectUrl") && document.location.replace(this.getAttribute("redirectUrl")), !1)
    }
}, deconcept.SWFObjectUtil.getPlayerVersion = function(t, e) {
    var i = new deconcept.PlayerVersion([0, 0, 0]);
    if (navigator.plugins && navigator.mimeTypes.length) {
        var r = navigator.plugins["Shockwave Flash"];
        r && r.description && (i = new deconcept.PlayerVersion(r.description.replace(/([a-z]|[A-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split(".")))
    } else {
        try {
            for (var a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), s = 15; s > 6; s--) try {
                a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + s), i = new deconcept.PlayerVersion([s, 0, 0]);
                break
            } catch (t) {}
        } catch (t) {}
        if (t && i.major > t.major) return i;
        if (!t || (0 != t.minor || 0 != t.rev) && i.major == t.major || 6 != i.major || e) try {
            i = new deconcept.PlayerVersion(a.GetVariable("$version").split(" ")[1].split(","))
        } catch (t) {}
    }
    return i
}, deconcept.PlayerVersion = function(t) {
    this.major = null != parseInt(t[0]) ? parseInt(t[0]) : 0, this.minor = parseInt(t[1]) || 0, this.rev = parseInt(t[2]) || 0
}, deconcept.PlayerVersion.prototype.versionIsValid = function(t) {
    return !(this.major < t.major) && (this.major > t.major || !(this.minor < t.minor) && (this.minor > t.minor || !(this.rev < t.rev)))
}, deconcept.util = {
    getRequestParameter: function(t) {
        var e = document.location.search || document.location.hash;
        if (e) {
            var i = e.indexOf(t + "="),
                r = e.indexOf("&", i) > -1 ? e.indexOf("&", i) : e.length;
            if (e.length > 1 && i > -1) return e.substring(e.indexOf("=", i) + 1, r)
        }
        return ""
    }
}, null == Array.prototype.push && (Array.prototype.push = function(t) {
    return this[this.length] = t, this.length
});
var getQueryParamValue = deconcept.util.getRequestParameter,
    FlashObject = deconcept.SWFObject,
    SWFObject = deconcept.SWFObject;
SK = "undefined" == typeof SK ? {} : SK, SK.UI = SK.UI || {}, SK.UI.Element = SK.UI.Element || {}, SK.UI.Element.RTE = SK.UI.Element.RTE || {}, SK.UI.Element.RTE.Display = new Class({
    Extends: SK.UI.Element.Display,
    external_widgets_wrapper: null,
    content_styles: null,
    default_property_values: {
        HtmlText: "",
        Style: ""
    },
    initialize: function() {
        this.parent.apply(this, arguments), this.env.revision_id = 1
    },
    createComputed: function() {
        this.env.rte_image_old_daids = this.env.ko.observable(""), this.env.rte_media_old_daids = this.env.ko.observable(""), this.env.rte_anchor_old_ids = this.env.ko.observable(""), this.env.editable_html = this.env.ko.observable(""), this.env.rendered_html = this.env.ko.observable(this.env.properties.HtmlText())
    },
    initEffects: function() {
        ApplyImageEffect(), this.getPlaceholder().querySelectorAll("img").forEach(e => {
            e.addEventListener("load", () => {
                SK.RolloverImageLoader && SK.RolloverImageLoader.checkForRolloverImages([e])
            })
        })
    },
    addEditContentStyles: function() {
        var e = Function.from(this.getProperties().Style)();
        e ? this.content_styles = new Element("style", {
            type: "text/css",
            csstext: e
        }).inject(this.getPlaceholder()) : this.removeEditContentStyles()
    },
    removeEditContentStyles: function() {
        this.content_styles && this.content_styles.destroy()
    },
    addExternalWidgetsWrapper: function() {
        this.external_widgets_wrapper = new Element("div", {
            styles: {
                width: 0,
                height: 0
            },
            events: {
                mousedown: function(e) {
                    e.stopPropagation()
                }
            }
        }).inject(document.body)
    },
    removeExternalWidgetsWrapper: function() {
        this.external_widgets_wrapper && this.external_widgets_wrapper.destroy()
    },
    getExternalWidgetsWrapper: function() {
        return this.external_widgets_wrapper
    },
    getRTEConfigs: function() {
        return {
            error_callback: SKMessage,
            editor_document: document,
            editor_window: window
        }
    },
    getExceededStorageMessage: function() {
        return SK.Singletons.env.get("storage_exceeded_message")
    },
    handleResponse: function(e, t, i, n) {
        e ? (this.env.revision_id = i.meta.revision_id, this.env.rendered_html(i.properties.HtmlText), !this.env.editing_activated() && this.updateRenderedHtml(this.env.rendered_html()), i.properties.rte_image_old_daids != this.env.rte_image_old_daids() && this.updateRTEObjectDAIDs(this.env.rte_image_old_daids, i.properties.rte_image_old_daids, "img:not([type]):not([stock_image_id]):not([rel=default_image])"), i.properties.rte_media_old_daids != this.env.rte_media_old_daids() && this.updateRTEObjectDAIDs(this.env.rte_media_old_daids, i.properties.rte_media_old_daids, "img[type=media]"), i.properties.rte_anchor_old_ids != this.env.rte_anchor_old_ids() && this.updateRTEObjectDAIDs(this.env.rte_anchor_old_ids, i.properties.rte_anchor_old_ids, "img[type=anchor]", "anchid")) : SKMessage(t)
    },
    updateRTEObjectDAIDs: function(e, t, i, n) {
        n = n || "daid", e(t);
        var s = t.split(",");
        this.getPlaceholder().getElements(i).each(function(e) {
            var t = s.shift();
            e.getAttribute(n) || e.setAttribute(n, t)
        })
    },
    doUndoRedo: function(e, t) {
        var i = SK.Actions.getEditableElements()[0].frame_instance.getContentFrame().contentWindow.RTE_GetById("rte_1").getPluginById("Undo");
        i && i.execCommand(e)
    },
    beforeStartEdit: function() {
        this.parent(), this.placeholder.getElements("[contenteditable]").set("contenteditable", "false")
    },
    startEdit: function() {
        this.addExternalWidgetsWrapper(), this.addEditContentStyles(), this.parent.apply(this, arguments), this.has_zero_footprint_method && this.hideZeroFootprint(), (new SK.UndoRedo).showButtons().disableButtons()
    },
    exitEditing: function() {
        (new SK.UndoRedo).hideButtons().disableButton("redo"), this.removeEditContentStyles(), this.removeExternalWidgetsWrapper()
    },
    finishEdit: function() {
        return !!this.parent.apply(this, arguments) && (this.exitEditing(), !0)
    },
    updateRenderedHtml: function(e) {
        (e || "").test(/document\.write|SK\.Widget/gi) ? SK.Actions.Common.reloadPage(void 0, ["#coordinates", this.getPlaceholder().getCoordinates().top].join("=")) : (this.getPlaceholder().getElement(".rte-content-holder").set("html", (e || "").stripScripts(function(e, t, i, n) {
            (n || function() {}).delay(0)
        })), this.initEffects())
    }
});