SK.React = SK.React || {}, SK.React.Component = SK.React.Component || {}, SK.React.Component.Logo = SK.React.Component.Logo || {}, SK.React.Component.Logo.Display = class extends SK.React.Component.Display {
    constructor(t) {
        super(t), this.admin_mode = SK.Singletons.env.get("admin_mode"), this.default_logo_editor_properties = {
            captions: [{
                id: 1,
                caption: "",
                top: 58,
                left: 192,
                "font-family": "Helvetica, Arial, sans-serif",
                "font-size": 18,
                "font-style": "normal",
                "font-weight": "bold",
                "text-decoration": "none",
                shadow: "none",
                color: "#000000",
                rotation: 0,
                "z-index": 102,
                hidden: 0
            }, {
                id: 2,
                caption: "",
                top: 84,
                left: 192,
                "font-family": "Helvetica, Arial, sans-serif",
                "font-size": 12,
                "font-style": "normal",
                "font-weight": "normal",
                "text-decoration": "none",
                shadow: "none",
                color: "#000000",
                rotation: 0,
                "z-index": 103,
                hidden: 0
            }],
            icons: [{
                id: 1,
                iconId: "",
                collectionId: "",
                size: "large",
                top: 58,
                left: 138,
                width: 46,
                rotation: 0,
                "z-index": 104,
                hidden: 0
            }]
        }, this.property_panel_width = {
            __None__: 240,
            __Custom__: 240,
            __Handmade__: 515
        }, this.mobile_max_width = 300, this.onLogoClick = this.onLogoClick.bind(this);
        var e = (this.state.LogoSize || "200x100").split("x"),
            o = JSON.stringify(this.state.LogoEditor || this.default_logo_editor_properties);
        this.state = {
            CanvasStyle: this.state.CanvasStyle || "white",
            LogoCSS: this.state.LogoCSS || "",
            LogoEditor: o,
            LogoSize: this.state.LogoSize || "200x100",
            LogoSizeType: this.state.LogoSizeType || "custom",
            LogoSrc: this.state.LogoSrc || "",
            LogoType: this.state.LogoType || "__None__",
            SiteTitle: this.state.SiteTitle || "",
            LogoImageWidth: this.state.LogoImageWidth || "",
            LogoImageHeight: this.state.LogoImageHeight || "",
            PageTitleDelimiter: this.state.PageTitleDelimiter || "",
            __fonts_styles: "",
            __logo_src: this.getLogoSrc(),
            __link_title: this.admin_mode ? "" : "Aller à la page d\u0027accueil du site",
            __home_link: this.admin_mode ? "/" + SK.Singletons.env.get("user_name") + "/Admin" : "/#((#" + SK.Singletons.env.get("user_name") + "#))#/",
            __logo_area: {
                width: parseInt(e[0], 10),
                height: parseInt(e[1], 10)
            },
            __logo_editor: this.state.LogoEditor || this.default_logo_editor_properties
        }, this.processStockIconsSrc()
    }
    render() {
        return React.createElement("div", null, ("__Handmade__" == this.state.LogoType || "__Custom__" == this.state.LogoType && this.state.__logo_src) && React.createElement("style", {
            type: "text/css"
        }, "__Handmade__" == this.state.LogoType ? this.state.__fonts_styles : "", this.state.LogoCSS), React.createElement("div", {
            id: "siteTitleLink",
            className: "siteTitleLink " + ("__Custom__" == this.state.LogoType && this.state.LogoImageWidth >= this.mobile_max_width ? "sk-logo-custom" : "")
        }, React.createElement("a", {
            "data-link-title": "Aller à la page d\u0027accueil du site",
            id: "sk-logo-manager-link",
            title: this.state.__link_title,
            href: this.state.__home_link,
            onClick: this.onLogoClick
        }, "__None__" == this.state.LogoType && React.createElement("span", null, this.state.SiteTitle), "__Custom__" == this.state.LogoType && this.state.__logo_src && React.createElement("img", {
            src: this.state.__logo_src,
            className: this.state.LogoImageWidth >= this.mobile_max_width ? "sk-logo-custom-image" : "",
            width: this.state.LogoImageWidth || "",
            height: this.state.LogoImageHeight || "",
            title: this.state.__link_title,
            alt: this.state.SiteTitle
        }), "__Handmade__" == this.state.LogoType && this.state.__logo_editor.icons.map(t => !t.hidden && t.iconId ? React.createElement("img", {
            key: t.id,
            id: "sk-im-icon-" + t.id,
            src: t.src,
            width: t.width,
            height: t.width,
            alt: this.state.SiteTitle
        }) : ""), "__Handmade__" == this.state.LogoType && this.state.__logo_editor.captions.map(t => !t.hidden && t.caption ? React.createElement("div", {
            key: t.id,
            id: "sk-cm-caption-" + t.id
        }, t.caption) : ""))))
    }
    getSnapshotBeforeUpdate(t, e) {
        return e.LogoSrc != this.state.LogoSrc && this.handleChange("__logo_src", this.getLogoSrc(this.state.LogoSrc)), null
    }
    handleChange(t, e) {
        this.setState({
            [t]: e
        })
    }
    getData() {
        var t = super.getData();
        return t.display_options.width = this.getPropertyPanelWidth(), t
    }
    onLogoClick(t) {
        this.admin_mode && "disabled" == SK.Singletons.env.get("preview_mode") && t.preventDefault()
    }
    getLogoSrc(t) {
        var e = t || this.state.LogoSrc;
        return /^rdam:/.test(e) ? '<?rdam DAID="' + e.replace(/^rdam:/, "") + '"?>' : e
    }
    setSiteTitle(t) {
        document.title = t + this.state.PageTitleDelimiter + SK.Singletons.env.get("page_title"), this.handleChange("SiteTitle", t)
    }
    processStockIconsSrc() {
        for (var t = 0, e = this.state.__logo_editor.icons.length; t < e; t++)
            if (this.admin_mode && SK.Singletons.env.get("client") && this.getImageCollection(t, this.state.__logo_editor.icons[t]), SK.Singletons.env.get("server")) {
                var o = this.state.__logo_editor.icons[t];
                o.collectionId && o.iconId && o.size && (o.src = `stock_image_id://${o.collectionId}___${o.iconId}___${o.size}`, this.state.LogoEditor = this.getLogoEditorProps(this.state.__logo_editor))
            }
    }
    getImageCollection(t, e) {
        (new SK.API).execute("site.stock_images.get_images", {
            collection_id: e.collectionId
        }, function(o, i, s) {
            if (o) {
                var a = this.state.__logo_editor.icons.slice();
                a[t].src = (s.images.filter(t => t.id == e.iconId).pop() || {
                    sizes: {}
                }).sizes[e.size];
                var n = SK.Util.deepAssign({}, this.state.__logo_editor, {
                    icons: a
                });
                this.setState({
                    LogoEditor: this.getLogoEditorProps(n),
                    __logo_editor: n
                })
            }
        }.bind(this))
    }
    getLogoEditorProps(t) {
        return (t = SK.Util.deepAssign({}, t)).icons.forEach(t => {
            delete t.src, delete t.box
        }), t.captions.forEach(t => {
            delete t.box
        }), JSON.stringify(t)
    }
    getPropertyPanelWidth(t) {
        return t = t || this.state.LogoType, this.property_panel_width[t]
    }
};