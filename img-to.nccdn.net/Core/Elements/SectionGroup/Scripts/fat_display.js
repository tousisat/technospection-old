SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.SectionGroup = SK.React.Component.SectionGroup || {}, SK.React.Component.SectionGroup.Constants = SK.React.Component.SectionGroup.Constants || function() {
    var _ = {
        P_HORIZONTAL: "0",
        P_VERTICAL: "1",
        S_CLASSIC: "0",
        S_TABBED: "1",
        S_CLASSIC_COLLAPSIBLE: "2",
        S_ANIMATED_COLLAPSIBLE: "3",
        S_ACCORDION: "4",
        S_ANIMATED_TABBED: "5",
        L_COLUMNS: "1",
        L_TABS: "2",
        L_ROWS: "3",
        L_COLLAPSIBLE_ROWS: "4",
        L_ACCORDION: "5",
        L_VERTICAL_TABS: "6",
        SG_LAYOUT_MAP: {},
        SG_ELEMENT_VISIBILITY_MAP: {},
        SECTION_ELEMENT_VISIBILITY_MAP: {},
        SG_CLASS_TYPE_MAP: {}
    };
    return _.SG_LAYOUT_MAP[_.P_HORIZONTAL + _.S_CLASSIC] = _.L_COLUMNS, _.SG_LAYOUT_MAP[_.P_HORIZONTAL + _.S_TABBED] = _.L_TABS, _.SG_LAYOUT_MAP[_.P_HORIZONTAL + _.S_ANIMATED_TABBED] = _.L_TABS, _.SG_LAYOUT_MAP[_.P_VERTICAL + _.S_CLASSIC] = _.L_ROWS, _.SG_LAYOUT_MAP[_.P_VERTICAL + _.S_CLASSIC_COLLAPSIBLE] = _.L_COLLAPSIBLE_ROWS, _.SG_LAYOUT_MAP[_.P_VERTICAL + _.S_ANIMATED_COLLAPSIBLE] = _.L_COLLAPSIBLE_ROWS, _.SG_LAYOUT_MAP[_.P_VERTICAL + _.S_ACCORDION] = _.L_ACCORDION, _.SG_LAYOUT_MAP[_.P_VERTICAL + _.S_TABBED] = _.L_VERTICAL_TABS, _.SG_LAYOUT_MAP[_.P_VERTICAL + _.S_ANIMATED_TABBED] = _.L_VERTICAL_TABS, _.SG_CLASS_TYPE_MAP[_.L_COLUMNS] = "sgHC0", _.SG_CLASS_TYPE_MAP[_.L_TABS] = "sgHT0", _.SG_CLASS_TYPE_MAP[_.L_ROWS] = "sgVC0", _.SG_CLASS_TYPE_MAP[_.L_COLLAPSIBLE_ROWS] = "sgVCC0", _.SG_CLASS_TYPE_MAP[_.L_ACCORDION] = "sgVCC0 sgAccordion", _.SG_CLASS_TYPE_MAP[_.L_VERTICAL_TABS] = "sgVT0", _.SECTION_ELEMENT_VISIBILITY_MAP[_.L_COLUMNS] = {
        showLink: !0,
        showDefaultState: !1,
        showFixWidth: !0,
        showSelectedImage: !1
    }, _.SECTION_ELEMENT_VISIBILITY_MAP[_.L_TABS] = {
        showLink: !1,
        showDefaultState: !1,
        showFixWidth: !1,
        showSelectedImage: !0
    }, _.SECTION_ELEMENT_VISIBILITY_MAP[_.L_ROWS] = {
        showLink: !0,
        showDefaultState: !1,
        showFixWidth: !1,
        showSelectedImage: !1
    }, _.SECTION_ELEMENT_VISIBILITY_MAP[_.L_COLLAPSIBLE_ROWS] = {
        showLink: !1,
        showDefaultState: !0,
        showFixWidth: !1,
        showSelectedImage: !0
    }, _.SECTION_ELEMENT_VISIBILITY_MAP[_.L_ACCORDION] = {
        showLink: !1,
        showDefaultState: !1,
        showFixWidth: !1,
        showSelectedImage: !0
    }, _.SECTION_ELEMENT_VISIBILITY_MAP[_.L_VERTICAL_TABS] = {
        showLink: !1,
        showDefaultState: !1,
        showFixWidth: !1,
        showSelectedImage: !0
    }, _.SG_ELEMENT_VISIBILITY_MAP[_.L_COLUMNS] = {
        options: !0,
        headers: !0,
        delimiter: !0,
        height: !1,
        animation: !1,
        distribute_colums_width: !0,
        distribute_tabs_width: !1,
        equalize_columns_content_height: !0,
        equalize_tabs_content_height: !1
    }, _.SG_ELEMENT_VISIBILITY_MAP[_.L_TABS] = {
        options: !0,
        headers: !1,
        delimiter: !1,
        height: !0,
        animation: !0,
        distribute_colums_width: !1,
        distribute_tabs_width: !0,
        equalize_columns_content_height: !1,
        equalize_tabs_content_height: !0
    }, _.SG_ELEMENT_VISIBILITY_MAP[_.L_ROWS] = {
        options: !1,
        headers: !1,
        delimiter: !1,
        height: !1,
        animation: !1,
        distribute_colums_width: !1,
        distribute_tabs_width: !1,
        equalize_columns_content_height: !1,
        equalize_tabs_content_height: !1
    }, _.SG_ELEMENT_VISIBILITY_MAP[_.L_COLLAPSIBLE_ROWS] = {
        options: !0,
        headers: !1,
        delimiter: !1,
        height: !1,
        animation: !0,
        distribute_colums_width: !1,
        distribute_tabs_width: !1,
        equalize_columns_content_height: !1,
        equalize_tabs_content_height: !1
    }, _.SG_ELEMENT_VISIBILITY_MAP[_.L_ACCORDION] = {
        options: !0,
        headers: !1,
        delimiter: !1,
        height: !0,
        animation: !1,
        distribute_colums_width: !1,
        distribute_tabs_width: !1,
        equalize_columns_content_height: !1,
        equalize_tabs_content_height: !1
    }, _.SG_ELEMENT_VISIBILITY_MAP[_.L_VERTICAL_TABS] = {
        options: !0,
        headers: !1,
        delimiter: !1,
        height: !0,
        animation: !0,
        distribute_colums_width: !1,
        distribute_tabs_width: !1,
        equalize_columns_content_height: !1,
        equalize_tabs_content_height: !0
    }, _
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
SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.SectionGroup = SK.React.Component.SectionGroup || {}, SK.React.Component.SectionGroup.HorizontalTabsWrapper = SK.React.Component.SectionGroup.HorizontalTabsWrapper || class extends React.Component {
    constructor(t) {
        super(t), this.tabs_holder = React.createRef(), this.state = {
            scroll_position: 0
        }, this.animation_id = null, this.manual_scroll_step = 10, this.touch_scroll_step = 15, this.min_scroll_position = 0, this.max_scroll_position = 0, this.scrollToLeft = this.scrollToLeft.bind(this), this.scrollToRight = this.scrollToRight.bind(this), this.startScrollingToLeft = this.startScrolling.bind(this, "left"), this.startScrollingToRight = this.startScrolling.bind(this, "right"), this.stopScrolling = this.stopScrolling.bind(this)
    }
    render() {
        return React.createElement("div", {
            className: "sk-tabs-holder-wrapper"
        }, this.state.scroll_position != this.min_scroll_position && React.createElement("span", {
            className: "sk-tabs-arrow sk-tabs-arrow-prev",
            onMouseDown: this.startScrollingToLeft,
            onMouseUp: this.stopScrolling,
            onMouseOut: this.stopScrolling,
            onTouchStart: this.startScrollingToLeft,
            onTouchEnd: this.stopScrolling
        }), React.createElement("div", {
            className: "sk-tabs-holder",
            ref: this.tabs_holder
        }, this.props.children), this.state.scroll_position != this.max_scroll_position && React.createElement("span", {
            className: "sk-tabs-arrow sk-tabs-arrow-next",
            onMouseDown: this.startScrollingToRight,
            onMouseUp: this.stopScrolling,
            onMouseOut: this.stopScrolling,
            onTouchStart: this.startScrollingToRight,
            onTouchEnd: this.stopScrolling
        }))
    }
    componentDidMount() {
        this.setMaxScrollPosition(), this.forceUpdate()
    }
    componentDidUpdate(t, o) {
        if (this.setMaxScrollPosition(), o.scroll_position != this.state.scroll_position && (this.tabs_holder.current.scrollLeft = this.state.scroll_position), t.step != this.props.step) {
            this[this.props.step < 0 ? "scrollToRight" : "scrollToLeft"](this.touch_scroll_step)
        }
    }
    setMaxScrollPosition() {
        const t = this.props.getScrollWidth() - this.tabs_holder.current.offsetWidth;
        this.max_scroll_position = t > 0 ? t : 0, this.props.setWrapper(this.tabs_holder.current)
    }
    scrollToLeft(t) {
        this.setState(o => {
            const s = o.scroll_position - (t || this.manual_scroll_step);
            return s <= this.min_scroll_position && this.stopScrolling(), {
                scroll_position: s <= this.min_scroll_position ? this.min_scroll_position : s
            }
        })
    }
    scrollToRight(t) {
        this.setState(o => {
            const s = o.scroll_position + (t || this.manual_scroll_step);
            return s >= this.max_scroll_position && this.stopScrolling(), {
                scroll_position: s >= this.max_scroll_position ? this.max_scroll_position : s
            }
        })
    }
    startScrolling(t) {
        const o = () => {
            this.animation_id = window.requestAnimationFrame(o), this["left" == t ? "scrollToLeft" : "scrollToRight"]()
        };
        this.animation_id = window.requestAnimationFrame(o)
    }
    stopScrolling() {
        window.cancelAnimationFrame(this.animation_id)
    }
};
SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.SectionGroup = SK.React.Component.SectionGroup || {}, SK.React.Component.SectionGroup.Display = SK.React.Component.SectionGroup.Display || class extends SK.React.Component.Display {
    constructor(t) {
        super(t), this.section_element = null, this.content_wrapper = React.createRef(), this.styles_container = null, this.observer = null, this.mutation_timeout = null, this.tabs_state_timeout = null, this.child_elements = {}, this.boundaries_dimension = {}, this.sections_wrapper = React.createRef(), this.tabs_wrapper_element = null, this.is_container = "94" == t.obj_id, this.structure_map = SK.React.Component.SectionGroup.Constants(), this.type = this.getType(this.state), this.state.__initial_render = !0, this.state.__elements = t.elements || [], this.state.__htabs_x_scroll = {
            initial: 0,
            current: 0
        }, this.setSectionElement = this.setSectionElement.bind(this), this.setTabsWrapper = this.setTabsWrapper.bind(this), this.onHorizontalTabsTouchStart = this.onHorizontalTabsTouchStart.bind(this), this.onHorizontalTabsTouchMove = this.onHorizontalTabsTouchMove.bind(this)
    }
    render() {
        this.type = this.getType(this.state);
        var t = [];
        return this.state.__elements.forEach((e, i, s) => {
            t.push(React.createElement("div", {
                key: `e_1_${e.node_id}`,
                className: this.getContentWrapperClass(e.node_id),
                dangerouslySetInnerHTML: {
                    __html: e.contents
                }
            })), !this.is_container && t.push(React.createElement("span", {
                key: `e_2_${e.node_id}`,
                className: this.getDelimitersClass() + (i + 1 == s.length ? " sk-sg-last-delimiter" : ""),
                rel: e.node_id
            })), SK.Singletons.env.get("admin_mode") && !this.is_container && t.push(React.createElement(SK.React.Component.PlaceholderWrapper, {
                key: `e_3_${e.node_id}`,
                html: e.placeholder,
                className: i + 1 == s.length ? "sk-obj-placeholder-wrapper-last-item" : ""
            }))
        }), this.is_container ? this.getContainerTemplate(t) : React.createElement("div", {
            id: `sectionGroup${this.props.node_id}`,
            className: "sg " + this.getCSSClasses(),
            ref: t => this.section_element = t
        }, React.createElement("style", {
            ref: t => this.styles_container = t
        }), React.createElement("div", {
            className: this.getWrapperClass(),
            role: [2, 6].indexOf(this.type) >= 0 ? "tablist" : null,
            ref: this.sections_wrapper,
            onTouchStart: this.onHorizontalTabsTouchStart,
            onTouchMove: this.onHorizontalTabsTouchMove
        }, React.createElement(SK.React.Component.PlaceholderWrapper, {
            html: this.props.root_placeholder
        }), t, React.createElement(SK.React.Component.ZeroFootprint, {
            show: this.state.__elements.length,
            message: this.props.zero_footprint_text
        })), 2 == this.type && React.createElement(SK.React.Component.SectionGroup.HorizontalTabsWrapper, {
            setWrapper: this.setTabsWrapper,
            getScrollWidth: () => this.sections_wrapper.current.scrollWidth,
            step: this.state.__htabs_x_scroll.current
        }), React.createElement("div", {
            className: "content-wrapper sk-sg-content-wrapper-" + this.props.node_id,
            ref: this.content_wrapper
        }))
    }
    componentDidMount() {
        super.componentDidMount(), this.observer = new MutationObserver(t => {
            var e = !0;
            t.forEach(function(t) {
                var i = t.target.classList;
                e = e && "STYLE" != t.target.tagName && !i.contains("em_menu_visible") && !(i.contains("em_normal") && i.contains("drag-clone"))
            }), e && (clearTimeout(this.mutation_timeout), this.mutation_timeout = setTimeout(() => {
                this.styles_container && (this.styles_container.innerText = "", this.styles_container.innerText = this.getSectionStyles())
            }, 100))
        }), this.observer.observe(this.section_element, {
            attributes: !0,
            childList: !0,
            subtree: !0
        }), this.initSectionClientLayoutChanges(), this.initHorizontalTabs(), setTimeout(() => {
            this.setState({
                __initial_render: !1
            })
        }, 0)
    }
    getSnapshotBeforeUpdate(t, e) {
        return (e.__elements.length != this.state.__elements.length || this.getType(this.state) != this.getType(e) || this.state.__is_moving) && [].forEach.call(this.section_element.querySelectorAll(`.sk-sg-content-wrapper-${this.props.node_id} > .secBody`), t => {
            var e = t.getAttribute("rel"),
                i = this.section_element.querySelector(`#section_wrapper_${e} .secHead`);
            i ? i.parentNode.insertBefore(t, i.nextSibling) : t.parentNode.removeChild(t)
        }), null
    }
    componentDidUpdate(t, e) {
        if (super.componentDidUpdate(t, e), (e.__elements.length != this.state.__elements.length || this.getType(this.state) != this.getType(e) || e.__is_moving) && (this.initSectionClientLayoutChanges(), this.props.elements = this.state.__elements), this.styles_container && (this.getType(this.state) != this.getType(e) && (this.styles_container.innerText = ""), this.styles_container.innerText = this.getSectionStyles()), this.type != this.getType(e)) switch (this.type) {
            case 2:
                this.initHorizontalTabs();
                break;
            default:
                this.destroyHorizontalTabs()
        }
    }
    initHorizontalTabs() {
        2 == this.type && this.tabs_wrapper_element.appendChild(this.sections_wrapper.current)
    }
    destroyHorizontalTabs() {
        2 != this.type && this.styles_container && this.section_element.insertBefore(this.sections_wrapper.current, this.styles_container.nextSibling)
    }
    initSectionClientLayoutChanges() {
        this.state.__elements.forEach((t, e) => {
            this.updateSectionsData(t.node_id, e)
        })
    }
    updateSectionsData(t, e) {
        e = e || this.state.__elements.map(t => t.node_id + "").indexOf(t + "");
        var i = !!this.child_elements[t];
        this.child_elements[t] = SK.Singletons.element_instances.get(t), this.child_elements[t] && (this.child_elements[t].setState({
            __type: this.type,
            __first: 0 == e,
            __last: this.state.__elements.length - 1 == e,
            __inactive: i && [2, 5, 6].indexOf(this.type) < 0 ? this.child_elements[t].state.__inactive : 4 == this.type ? 1 == this.child_elements[t].state.SectionDefaultState : 0 != e,
            __animation_completed: !0
        }, () => {
            SK.Singletons.loadpromise.then(this.updateRepresentativeMode.bind(this, t))
        }), this.moveSectionBody(t))
    }
    updateRepresentativeMode(t) {
        SK.Singletons.uimenu && SK.Singletons.uimenu.getRepresentativeByNodeID(t).setMode(2 == this.type ? "standard" : "")
    }
    moveSectionBody(t) {
        if ([2, 6].indexOf(this.type) >= 0 && !this.state.__is_moving) {
            var e = this.section_element.querySelector(`#section_wrapper_${t} .sk-sg-body-${t}`);
            e && (e.setAttribute("meta", this.section_element.getElementById("e" + e.getAttribute("rel")).getAttribute("meta")), this.content_wrapper.current.appendChild(e))
        }
    }
    setSectionElement(t) {
        this.section_element = t
    }
    getContainerTemplate(t) {
        const e = !this.state.__initial_render && this.state.ContainerType && "fluid" == this.state.ContainerType ? "sk-container-fluid" : "";
        return React.createElement("div", {
            className: `sk-container-wrapper ${this.state.ContainerClassName||""}`,
            ref: this.setSectionElement
        }, React.createElement("style", null, this.getContainerCSS().join("")), React.createElement("div", {
            className: `sk-container ${e}`
        }, t))
    }
    getContainerCSS() {
        var t = this.state.ContainerBackgroundImageSrc && "__None__" != this.state.ContainerBackgroundImageSrc;
        return [`#e${this.props.node_id} .sk-container {`, t ? `background-image: url(${this.state.ContainerBackgroundImageSrc});` : "", this.state.ContainerBackgroundColor ? `background-color: ${this.state.ContainerBackgroundColor};` : "", t && this.state.ContainerBackgroundPosition ? `background-position: ${this.state.ContainerBackgroundPosition};` : "", t && this.state.ContainerBackgroundRepeat ? `background-repeat: ${this.state.ContainerBackgroundRepeat};` : "", t && this.state.ContainerBackgroundScroll ? `background-attachment: ${this.state.ContainerBackgroundScroll};` : "", "}"].concat(this.buildContainerMediaQueries())
    }
    buildContainerMediaQueries() {
        var t = this.state.ContainerBackgroundResizedImageJSON;
        return t && "object" == typeof t ? (t = Object.values(t).sort((t, e) => e.width - t.width)).map(t => ["@media only screen and (max-width: ", t.width, "px) {", `#e${this.props.node_id} .sk-container {`, "background-image: url(", t.src_url, ");", "}", "}", "@media only screen and (-webkit-min-device-pixel-ratio: 2) and (max-width: ", t.width / 2, "px),             only screen and (min-resolution: 192dpi) and (max-width: ", t.width / 2, "px) {", `#e${this.props.node_id} .sk-container-wrapper .sk-container {`, "background-image: url(", t.src_url, ");", "}", "}"].join("")) : ""
    }
    getSectionStyles() {
        var t = [],
            e = "auto",
            i = parseInt(this.state.SectionGroupHeight, 10),
            s = 1 == this.type ? this.state.SectionGroupEqualizeColumnsContentHeight : this.state.SectionGroupEqualizeTabsContentHeight,
            n = this.section_element ? this.section_element.querySelectorAll(`.sk-sg-content-wrapper-${this.props.node_id} > .secBody, .sk-sg-holder-${this.props.node_id} > .plain > div > .sectionCell > .secBody`) : [];
        if (!this.boundaries_dimension[this.type]) {
            var a = {
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginTop: 0,
                    marginBottom: 0
                },
                o = (n.length ? window.getComputedStyle(n[0]) : a) || a;
            this.boundaries_dimension[this.type] = {
                paddingTop: o.paddingTop,
                paddingBottom: o.paddingBottom,
                marginTop: o.marginTop,
                marginBottom: o.marginBottom,
                padding: o.padding || ["Top", "Right", "Bottom", "Left"].map(t => o[`padding${t}`]).join(" "),
                margin: o.margin || ["Top", "Right", "Bottom", "Left"].map(t => o[`margin${t}`]).join(" ")
            }
        }
        if ([2, 5, 6].indexOf(this.type) >= 0 && i > 0 ? e = i : 1 == s && [1, 2, 6].indexOf(this.type) >= 0 && (e = Math.max.apply(null, [].map.call(n, t => parseInt(t.querySelector(".secBodyWrapper").getBoundingClientRect().height, 10)))), 1 == s && 1 == this.type) {
            var r = this.section_element ? this.section_element.querySelectorAll(`.sk-sg-holder-${this.props.node_id} > .plain > div > .sectionCell > .secHead`) : [],
                h = Math.max.apply(null, [].map.call(r, t => parseInt(t.getBoundingClientRect().height, 10))) || 0;
            t.push("@media only screen and (min-width : 600px) {", `#sectionGroup${this.props.node_id}.sgHC0 .secHead {`, /^firefox/.test(SK.Singletons.env.get("client")) ? `height: ${h}px;` : "", `min-height: ${h}px;`, "}", "}")
        }
        return SK.Singletons.env.get("client") && [4, 5].indexOf(this.type) >= 0 && ([].forEach.call(n, i => {
            var s = i.getAttribute("rel"),
                n = parseInt(this.boundaries_dimension[this.type].marginTop, 10) + parseInt(this.boundaries_dimension[this.type].marginBottom, 10) + parseInt(this.boundaries_dimension[this.type].paddingTop, 10) + parseInt(this.boundaries_dimension[this.type].paddingBottom, 10),
                a = parseInt((i.querySelector(".secBodyWrapper").getBoundingClientRect() || {}).height, 10) + n,
                o = ("auto" == e ? 0 : e) + n;
            t.push(["#sectionGroup", this.props.node_id, ".sgVCC0.sg-animate-section #section_wrapper_", s, ".noactive .secBodyWrapper {", "margin-top: -", o < a ? a : o, "px;", "}"].join(""))
        }), t.push(["#sectionGroup", this.props.node_id, ".sgVCC0 .secBodyInnerWrapper {", "padding:", this.boundaries_dimension[this.type].padding, ";", "margin:", this.boundaries_dimension[this.type].margin, ";", "}", "#sectionGroup", this.props.node_id, ".sgVCC0 .sectionCell .secBody {", "padding: 0 !important;", "margin: 0 !important;", "}"].join(""))), e = [0, "0", "auto"].indexOf(e) >= 0 ? "auto" : e + "px", [`#sectionGroup${this.props.node_id} .secBody .secBodyInnerWrapper {`, `min-height: ${e};`, "}", "auto" == e ? "" : `#sectionGroup${this.props.node_id}.sg-animate-section .sectionCell.active .secBodyInnerWrapper {` + `min-height: ${e};` + "}", t.join("")].join("")
    }
    getCSSClasses() {
        return ["sg", this.structure_map.SG_CLASS_TYPE_MAP[this.state.__elements.length > 0 ? this.type : 3], this.state.__initial_render ? "sk-sg-initial-render" : "sk-sg-is-rendered", 0 == this.state.SectionGroupHeaders ? "sg-hide-headers" : "", 0 == this.state.SectionGroupDelimiter ? "sg-hide-delimiters" : "", 1 == this.state.SectionGroupDistributeColumsWidth && 1 == this.type ? "sg-equal-columns" : "", 1 == this.state.SectionGroupAnimation && [2, 4, 6].indexOf(this.type) >= 0 || 5 == this.type ? "sg-animate-section" : ""].join(" ")
    }
    getContentWrapperClass(t) {
        var e = [`plain sk-content-wrapper-${t}`];
        return this.is_container ? e : e.concat(`sk-sg-${t}`).join(" ")
    }
    getDelimitersClass() {
        var t = ["sg-delim-common"];
        return [1, 3, 4, 5].indexOf(this.type) >= 0 && t.push(1 == this.type ? "sgDelim1" : "sgDelim"), [2, 6].indexOf(this.type) >= 0 && t.push("tabSeparator"), t.join(" ")
    }
    getWrapperClass() {
        return ["sk-sg-holder-" + this.props.node_id, 2 == this.type || 6 == this.type ? "tabButtonContainerCell" : "", 2 == this.type && 1 == this.state.SectionGroupDistributeTabsWidth ? "sg-equal-tabs" : ""].join(" ")
    }
    getType(t) {
        return t = t || this.state, Number(this.structure_map.SG_LAYOUT_MAP[t.SectionGroupPosition + t.SectionGroupStyle])
    }
    updateChildrenAnimationState(t) {
        t = t || [], Object.keys(this.child_elements).forEach(e => {
            t.indexOf(e) < 0 && this.child_elements[e].setState({
                __animation_completed: !0
            })
        })
    }
    animateOnClick(t) {
        var e = this.child_elements[t];
        4 != this.type ? e.state.__inactive && (Object.keys(this.child_elements).forEach(t => {
            this.child_elements[t].setState({
                __inactive: !0,
                __animation_completed: !1
            })
        }), e.setState({
            __inactive: !1
        })) : e.setState({
            __inactive: !e.state.__inactive,
            __animation_completed: !1
        })
    }
    setTabsWrapper(t) {
        this.tabs_wrapper_element = t
    }
    onHorizontalTabsTouchStart(t) {
        2 == this.type && t.touches.length && this.setState({
            __htabs_x_scroll: {
                initial: t.touches[0].pageX,
                current: 0
            }
        })
    }
    onHorizontalTabsTouchMove(t) {
        if (2 == this.type && t.touches.length)
            for (let e = 0; e < t.touches.length; e++) this.setState({
                __htabs_x_scroll: {
                    initial: this.state.__htabs_x_scroll.initial,
                    current: t.touches[e].pageX - this.state.__htabs_x_scroll.initial
                }
            })
    }
};