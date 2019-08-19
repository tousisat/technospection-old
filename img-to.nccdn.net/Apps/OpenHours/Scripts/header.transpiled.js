SK = "undefined" == typeof SK ? {} : SK, SK.Applications = SK.Applications || {}, SK.Applications.OpenHours = SK.Applications.OpenHours || {}, SK.Applications.OpenHours.Header = class {
    constructor(t) {
        this.props = t, this.setData = this.setData.bind(this), SK.Applications.OpenHours.Shared = this.props.settings || {}, SK.React.Component.Application.GlobalData.initAppData(this.props.app_id, this.props, this.props.settings), SK.Singletons.env.get("admin_mode") && SK.React.Component.Application.GlobalData.addChangeListener(this.setData)
    }
    setData() {
        SK.Applications.OpenHours.Shared = SK.React.Component.Application.GlobalData.getAppData(this.props.app_id)
    }
};