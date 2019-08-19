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
var _class, _temp, _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
    }
    return t
};

function _objectWithoutProperties(t, e) {
    var n = {};
    for (var r in t) e.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
    return n
}
SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.Link = (_temp = _class = class extends React.Component {
    constructor(t) {
        super(t), this.state = this.constructor.getLinkOptionsState(this.props)
    }
    static getDerivedStateFromProps(t) {
        return SK.React.Component.Link.getLinkOptionsState(t)
    }
    static getLinkOptionsState(t) {
        let {
            internalLink: e,
            externalLink: n,
            default_value: r,
            href: a,
            options: i = {},
            link: o = null,
            data_attributes: s = !1,
            onClick: l = (() => {})
        } = t, c = _objectWithoutProperties(t, ["internalLink", "externalLink", "default_value", "href", "options", "link", "data_attributes", "onClick"]);
        a = SK.LinkSerializer.deserialize(e || o) || SK.Util.deserializeNodeId(e || o);
        var p = Number(a) || /^anchor_\d+_\d+/.test(a) ? "page_node_id://" + SK.Singletons.env.get("user_id") + "_" + a : SK.Util.buildLink(a),
            u = (a = (a ? p : n) || r) != SK.React.Component.Link.EMPTY_LINK;
        return _extends({}, c, {
            href: u ? a : "#",
            target: i.target,
            rel: i.rel || null,
            "data-target": s ? i.target : null,
            "data-href": s ? i.href : null,
            onClick: t => {
                u || t.preventDefault(), l(t)
            }
        })
    }
    render() {
        return React.createElement("a", this.state, this.props.children)
    }
}, _class.EMPTY_LINK = "javascript:void(0)", _temp);
var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
    }
    return t
};
SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.ContentEditable = SK.React.Component.ContentEditable || class extends React.Component {
    constructor(t) {
        super(t), this.render_properties = {}, this.emitChange = (() => {
            var t = this.getDOMNode()[this.content_property];
            this.props.onChange && t !== this.previous_html && this.props.onChange({
                target: {
                    value: t
                }
            }), this.previous_html = t
        }), this.state = {
            content_type: this.props.html ? "html" : "text",
            content_editable: !1,
            content: (this.props.html ? this.props.html : this.props.text) || " "
        }, this.render_properties = Object.assign({}, this.props, {
            html: void 0,
            text: void 0,
            custom_tag: void 0,
            onChange: void 0
        })
    }
    static getDerivedStateFromProps(t) {
        return {
            content: t.html || t.text
        }
    }
    render() {
        const t = this.props.custom_tag || "div";
        return "html" == this.state.content_type ? React.createElement(t, _extends({}, this.render_properties, {
            onInput: this.emitChange,
            onBlur: this.emitChange,
            contentEditable: this.state.content_editable,
            dangerouslySetInnerHTML: {
                __html: this.state.content
            }
        })) : React.createElement(t, _extends({}, this.render_properties, {
            onInput: this.emitChange,
            onBlur: this.emitChange,
            contentEditable: this.state.content_editable
        }), this.state.content)
    }
    componentDidMount() {
        this.setState({
            content_editable: !!SK.Singletons.env.get("admin_mode") && !SK.Singletons.env.get("sk_pro_preview")
        }), SK.UI && SK.UI.Preview && SK.UI.Preview.addEvents({
            onEnable: this.setState.bind(this, {
                content_editable: !1
            }),
            onDisable: this.setState.bind(this, {
                content_editable: !0
            })
        }), this.content_property = "html" == this.state.content_type ? "innerHTML" : "innerText" in this.getDOMNode() ? "innerText" : "textContent"
    }
    shouldComponentUpdate(t, e) {
        return t[this.state.content_type] !== this.getDOMNode()[this.content_property] || e.content_editable !== this.state.content_editable
    }
    getDOMNode() {
        return ReactDOM.findDOMNode(this)
    }
};
var _extends = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
    }
    return e
};

function _objectWithoutProperties(e, t) {
    var r = {};
    for (var n in e) t.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
    return r
}
SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.PlaceholderWrapper = SK.React.Component.PlaceholderWrapper || function(e) {
    var {
        html: t,
        className: r = "",
        children: n
    } = e, a = _objectWithoutProperties(e, ["html", "className", "children"]);
    return SK.Singletons.env.get("admin_mode") ? React.createElement("div", _extends({
        className: `sk-obj-placeholder-wrapper ${r}`,
        style: {
            display: "none"
        },
        dangerouslySetInnerHTML: {
            __html: t
        }
    }, a)) : ""
};
SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.SectionIcon = class extends React.Component {
    constructor(t) {
        super(t), this.element = null, this.state = {
            src: "",
            visible: !1
        }, this.state = {
            src: this.constructor.getIconState(t)
        }, this.setElement = this.setElement.bind(this)
    }
    render() {
        return React.createElement("img", {
            className: "fmIcn " + this.props.className,
            src: this.state.src,
            style: {
                display: this.state.src && this.state.visible ? "" : "none"
            },
            ref: this.setElement
        })
    }
    static getDerivedStateFromProps(t) {
        return {
            src: SK.React.Component.SectionIcon.getIconState(t)
        }
    }
    componentDidMount() {
        "stock" == this.props.type && (this.props.properties["__" + this.props.icon + "Stock"] = {
            sizes: {
                small: this.element.getAttribute("src")
            }
        }), this.setState({
            visible: !0
        })
    }
    static getIconState(t) {
        let e = SK.React.Component.SectionIcon,
            s = e.getStockImageValue(t.icon, t) || e.getStockImageValue(t.fallback, t),
            o = e.getCustomImageValue(t.icon, t) || e.getCustomImageValue(t.fallback, t);
        return "stock" == t.type ? s : o
    }
    static getStockImageValue(t, e) {
        var s = e.properties["__" + t + "Stock"];
        return s ? ((s || {}).sizes || {}).small : (s = e.properties[t + "Stock"]) ? ["stock_image_id://", s.collection_id, "___", s.id, "___small"].join("") : ""
    }
    static getCustomImageValue(t, e) {
        return (e.properties[t + "Src"] || "").replace("__None__", "")
    }
    setElement(t) {
        this.element = t
    }
};
SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.Section = SK.React.Component.Section || {}, SK.React.Component.Section.Display = SK.React.Component.Section.Display || class extends SK.React.Component.Display {
    get accessibilityRoles() {
        let e = `sk-sg-tab-${this.props.node_id}`,
            t = {};
        switch (this.state.__type) {
            case 2:
            case 6:
                t = {
                    head_id: e,
                    head_role: "tab",
                    body_role: "tabpanel",
                    body_aria: e
                };
                break;
            case 1:
            case 3:
            case 4:
            case 5:
                t = {
                    head_id: e,
                    wrapper_role: "region",
                    wrapper_aria: e
                }
        }
        return t
    }
    constructor(e) {
        super(e), this.section_element = null, this.is_container = "43" == e.obj_id, this.state.__elements = e.elements || [], this.state.__inactive = 1 == this.state.SectionDefaultState, this.state.__animation_completed = !0, this.handleCaptionChange = this.handleChange.bind(this, "SectionCaption"), this.handleSubTitleChange = this.handleChange.bind(this, "SectionSubTitle"), this.onTransitionEnd = this.onTransitionEnd.bind(this), this.onHeadClick = this.onHeadClick.bind(this), this.onHeadMouseDown = this.onHeadMouseDown.bind(this)
    }
    render() {
        var e = this.state.__edit_mode ? SK.Singletons.env.get("advanced_options_enabled") : !!this.state.SectionSubTitle,
            t = [],
            s = this.state.InternalLink,
            n = this.state.Link,
            a = this.state.__edit_mode ? null : SK.React.Component.Link.EMPTY_LINK;
        return ([4, 5].indexOf(this.state.__type) >= 0 || this.state.__edit_mode) && (s = n = null), this.state.__elements.forEach(e => {
            t.push(React.createElement("div", {
                key: `e_1_${e.node_id}`,
                className: this.getContentWrapperClass(e.node_id),
                dangerouslySetInnerHTML: {
                    __html: e.contents
                }
            })), SK.Singletons.env.get("admin_mode") && t.push(React.createElement(SK.React.Component.PlaceholderWrapper, {
                key: `e_2_${e.node_id}`,
                html: e.placeholder
            }))
        }), React.createElement("div", {
            id: this.is_container ? "" : `section_wrapper_${this.props.node_id}`,
            className: this.getCellClasses(),
            rel: 1 == this.state.SectionDefaultState ? "collapse" : "expand",
            ref: e => this.section_element = e,
            role: this.accessibilityRoles.wrapper_role,
            "aria-labelledby": this.accessibilityRoles.wrapper_aria
        }, !this.is_container && React.createElement("div", {
            id: this.accessibilityRoles.head_id,
            className: "secHead",
            onClick: this.onHeadClick,
            role: this.accessibilityRoles.head_role
        }, React.createElement("div", {
            className: "secTitle"
        }, React.createElement(SK.React.Component.Link, {
            internalLink: s,
            externalLink: n,
            options: this.state.LinkOptions,
            default_value: a,
            className: "secCptn",
            onMouseDown: this.onHeadMouseDown
        }, React.createElement("span", null, React.createElement("span", null, React.createElement("span", {
            className: "fmCptnWrap " + ("image_only" == this.state.ImageLocation ? "icon-only" : "")
        }, React.createElement(SK.React.Component.ContentEditable, {
            className: "fmCptnMain" + (this.state.__edit_mode ? " editable" : ""),
            custom_tag: "span",
            text: this.state.SectionCaption,
            onChange: this.handleCaptionChange
        }), e && React.createElement(SK.React.Component.ContentEditable, {
            className: "fmCptnSub" + (this.state.__edit_mode ? " editable" : ""),
            custom_tag: "span",
            text: this.state.SectionSubTitle,
            onChange: this.handleSubTitleChange
        })), "none" != this.state.ImageSrcType && React.createElement("span", {
            className: "fmIcnWrap"
        }, React.createElement(SK.React.Component.SectionIcon, {
            className: "fmIcnNor",
            type: this.state.ImageSrcType,
            properties: this.state,
            icon: "NormalHeaderImage"
        }), React.createElement(SK.React.Component.SectionIcon, {
            className: "fmIcnSel",
            type: this.state.ImageSrcType,
            properties: this.state,
            icon: "RolloverHeaderImage",
            fallback: "NormalHeaderImage"
        }), React.createElement(SK.React.Component.SectionIcon, {
            className: "fmIcnCur",
            type: this.state.ImageSrcType,
            properties: this.state,
            icon: "SelectedHeaderImage",
            fallback: "NormalHeaderImage"
        })))))), React.createElement("div", {
            className: this.getIconCellClasses()
        }, " ")), React.createElement("div", {
            className: this.getBodyClasses(),
            rel: this.props.node_id,
            onTransitionEnd: this.onTransitionEnd,
            role: this.accessibilityRoles.body_role,
            "aria-labelledby": this.accessibilityRoles.body_aria
        }, React.createElement("div", {
            className: this.is_container ? "" : "secBodyWrapper",
            onTransitionEnd: this.onTransitionEnd
        }, React.createElement("div", {
            className: this.is_container ? "" : "secBodyInnerWrapper"
        }, React.createElement(SK.React.Component.PlaceholderWrapper, {
            html: this.props.root_placeholder
        }), t, React.createElement(SK.React.Component.ZeroFootprint, {
            show: this.state.__elements.length,
            message: this.props.zero_footprint_text
        })))), !this.is_container && React.createElement("style", null, this.getFixedWidth()))
    }
    componentDidMount() {
        super.componentDidMount(), SK.Singletons.uimenu && this.is_container && SK.Singletons.loadpromise.then(() => {
            SK.Singletons.uimenu.getRepresentativeByNodeID(this.props.node_id).clearEvents()
        }), setTimeout(() => {
            (SK.Singletons.element_instances.get(this.props.parent_id) || {
                updateSectionsData() {}
            }).updateSectionsData(this.props.node_id)
        }, 0)
    }
    componentDidUpdate(e, t) {
        this.props.elements = this.state.__elements, setTimeout(() => {
            (SK.Singletons.element_instances.get(this.props.parent_id) || {
                moveSectionBody() {}
            }).moveSectionBody(this.props.node_id)
        }, 0)
    }
    onHeadClick() {
        var e = SK.Singletons.element_instances.get(this.props.parent_id);
        e && e.animateOnClick(this.props.node_id)
    }
    onHeadMouseDown(e) {
        SK.Singletons.env.get("admin_mode") && !e.target.getAttribute("contenteditable") && e.preventDefault()
    }
    handleChange(e, t) {
        this.setState({
            [e]: t.target.value.replace(/\n|\r/g, "")
        })
    }
    getActiveState() {
        return !1 === this.state.__inactive
    }
    onTransitionEnd() {
        this.setState({
            __animation_completed: !0
        });
        var e = SK.Singletons.element_instances.get(this.props.parent_id);
        e && e.updateChildrenAnimationState([this.props.node_id])
    }
    getContentWrapperClass(e) {
        return `plain sk-content-wrapper-${e}`
    }
    getCellClasses() {
        if (this.is_container) return "sk-container-inner";
        var e = ["sectionCell"];
        return (this.state.SectionSubTitle || this.state.__edit_mode) && e.push("wIcn"), ("stock" == this.state.ImageSrcType && this.state.__NormalHeaderImageStock || "custom" == this.state.ImageSrcType && this.state.NormalHeaderImageSrc) && (!this.state.SectionSubTitle && e.push("wIcn"), "left" == this.state.ImageLocation && e.push("wIcnL"), "right" == this.state.ImageLocation && e.push("wIcnR"), ("1" == this.state.ResizeImages && "custom" == this.state.ImageSrcType || this.state.NormalHeaderImageStock && "stock" == this.state.ImageSrcType) && e.push("imgResize")), this.state.__last && e.push("sectionLast"), this.state.__first && e.push("sectionFirst"), e.push(this.state.__inactive ? "noactive" : "active"), e.push(!this.state.Link && !this.state.InternalLink || [2, 6].indexOf(this.state.__type) >= 0 ? "nolink" : "haslink"), [4, 5].indexOf(this.state.__type) >= 0 && e.push(this.state.__inactive || 1 == this.state.SectionDefaultState ? "collapse" : "expand"), e.join(" ")
    }
    getBodyClasses() {
        return this.is_container ? "" : ["secBody", `sk-sg-body-${this.props.node_id}`, this.state.__inactive ? "noactive" : "active", this.state.__animation_completed ? "sk-animation-completed" : ""].join(" ")
    }
    getIconCellClasses() {
        return ["secIconColCell", this.state.__inactive ? "secIconCol" : "secIconExp"].join(" ")
    }
    getFixedWidth() {
        var e = "",
            t = "";
        if (this.state.SectionFixWidth && this.section_element && (t = this.state.WidthMetric || "px", e = parseInt(this.state.SectionFixWidth, 10), "px" == t && SK.Singletons.env.get("client"))) {
            var s = window.getComputedStyle(this.section_element);
            e = e + parseInt(s.borderRightWidth, 10) + parseInt(s.borderLeftWidth, 10) + parseInt(s.paddingRight, 10) + parseInt(s.paddingLeft, 10)
        }
        return e ? `\n      .sgHC0 .sk-sg-${this.props.node_id} {\n         width: ${e}${t};\n      }\n      .sgHC0.sg-equal-columns .sk-sg-${this.props.node_id} {\n         width: auto;\n      }\n      .sgHC0.sg-equal-columns #e${this.props.node_id} {\n         width: 100%;\n      }` : ""
    }
};