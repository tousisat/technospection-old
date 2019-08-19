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
! function() {
    var getter = function(locals) {
        with(locals) return SK.Applications.Settings = function(t) {
            this.options = t
        }, SK.Applications.Settings.prototype = {
            constructor: SK.Applications.Settings,
            set: function(t, i, s) {
                new SK.API(this.options.session_id).execute("app.user.set_settings", {
                    user_id: this.options.user_id,
                    app_id: this.options.app_id,
                    settings: JSON.encode(t)
                }, function(t, i, s) {
                    t ? this.callback_ok(s) : this.callback_failure(i)
                }.bind({
                    callback_ok: i,
                    callback_failure: s
                }))
            },
            get: function(t, i) {
                new SK.API(this.options.session_id).execute("app.user.get_settings", {
                    user_id: this.options.user_id,
                    app_id: this.options.app_id
                }, function(t, i, s) {
                    t ? this.callback_ok(s) : this.callback_failure(i)
                }.bind({
                    callback_ok: t,
                    callback_failure: i
                }))
            }
        }, SK
    };
    "undefined" != typeof module ? module.exports = getter : this.SK = getter(this)
}();
SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.Application = SK.React.Component.Application || {},
    function() {
        var t;
        SK.Singletons.env.get("is_app_settings") && (t = ((((("undefined" == typeof parent ? {} : parent).SK || {}).React || {}).Component || {}).Application || {}).GlobalData), SK.React.Component.Application.GlobalData = SK.React.Component.Application.GlobalData || t || {
            data: {},
            callbacks: [],
            is_admin: SK.Singletons.env.get("admin_mode"),
            update_interval: null,
            timeout: 2e3,
            initAppData(t, a, i) {
                this.data[t] = this.data[t] || {
                    options: i || {},
                    properties: a
                }
            },
            getAppData(t) {
                return (this.data[t] || {}).options
            },
            setAppData(t, a, i) {
                if (this.data[t].options = SK.Util.deepAssign({}, this.data[t].options, a), Object.keys(a).length) {
                    for (var e in this.callbacks) this.callbacks.hasOwnProperty(e) && (this.callbacks[e] || function() {})(t);
                    if (i) {
                        var n = SK.Util.deepAssign({}, this.data[t].options);
                        clearTimeout(this.update_interval), this.update_interval = setTimeout(this.saveSettings.bind(this, t, n), this.timeout)
                    }
                }
            },
            saveSettings(t, a) {
                this.is_admin && (this.data[t].app_settings = this.data[t].app_settings || new SK.Applications.Settings(this.data[t].properties), this.data[t].app_settings.set(a, function() {}, void 0))
            },
            addChangeListener(t) {
                this.callbacks.push(t)
            },
            removeChangeListener(t) {
                this.callbacks.splice(this.callbacks.indexOf(t), 1)
            }
        }
    }();
SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.Application = SK.React.Component.Application || {}, SK.React.Component.Application.Settings = SK.React.Component.Application.Settings || class extends React.Component {
    constructor(t) {
        super(t), this.is_properties_save_allowed = !0, this.state = t.settings || {}, SK.React.Component.Application.GlobalData.initAppData(this.props.app_id, t, t.settings), this.updateSettings = this.updateSettings.bind(this), SK.React.Component.Application.GlobalData.addChangeListener(this.updateSettings)
    }
    updateSettings() {
        super.setState(SK.React.Component.Application.GlobalData.getAppData(this.props.app_id))
    }
    setState(t, e) {
        e = e || function() {}, super.setState(t, (...t) => {
            SK.React.Component.Application.GlobalData.setAppData(this.props.app_id, this.state, SK.Singletons.env.get("is_app_settings") && this.isPropertiesSaveAllowed()), e(...t)
        })
    }
    isPropertiesSaveAllowed() {
        return this.is_properties_save_allowed
    }
    allowPropertiesSave(t) {
        this.is_properties_save_allowed = t
    }
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
SK.React.Component.Application = SK.React.Component.Application || {}, SK.React.Component.Application.Display = class extends SK.React.Component.Display {
    constructor(t) {
        super(t), this.state.__settings = SK.React.Component.Application.GlobalData.getAppData(this.props.app_id) || t.settings || {}, SK.React.Component.Application.GlobalData.initAppData(this.props.app_id, t, t.settings), this.updateSettings = this.updateSettings.bind(this), SK.React.Component.Application.GlobalData.addChangeListener(this.updateSettings)
    }
    updateSettings() {
        (this.getBaseSetState ? this.getBaseSetState() : this.setState)({
            __settings: SK.React.Component.Application.GlobalData.getAppData(this.props.app_id)
        })
    }
    updateStateValues(t, e) {
        return e.__settings && (e.__settings = SK.Util.deepAssign({}, t.__settings, e.__settings)), e
    }
    executeObjectSet(t, e) {
        super.executeObjectSet(t, e), e.__settings && SK.React.Component.Application.GlobalData.setAppData(this.props.app_id, t.__settings, this.edit_mode && this.isPropertiesSaveAllowed())
    }
};
SK.React.Component.Application = SK.React.Component.Application || {}, SK.React.Component.Application.Header = SK.React.Component.Application.Footer = class extends SK.React.Component.Application.Settings {};