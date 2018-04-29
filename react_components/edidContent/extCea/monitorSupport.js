var React = require('react'),
    Title = require('../edidContentTitle');

module.exports = React.createClass({
    genCheckBox: function (checked, description) {
        return React.DOM.div(
            {
                className: 'edid-content-subgroup'
            }, React.DOM.div({
                className: 'subgroup-checkbox'
            }, React.DOM.input({
                type: 'checkbox',
                readOnly: 'readOnly',
                checked: checked
            })),
            React.DOM.div({
                className: 'subgroup-detail-radio'
            }, description)
        );
    },
    render: function () {
        const monitorSupport = this.props.edidParsed.getExtMonitorSupport(this.props.extIndex);

        return React.DOM.div(
            {
                className: 'edid-content-group cea-monitor-support'
            },
            React.createElement(Title, {
                title: 'Monitor Support'
            }),
            this.genCheckBox(monitorSupport.underscan, 'Underscan'),
            this.genCheckBox(monitorSupport.basicAudio, 'Basic audio'),
            this.genCheckBox(monitorSupport.yCbCr444, 'YCbCr 4:4:4'),
            this.genCheckBox(monitorSupport.yCbCr422, 'YCbCr 4:2:2')
        );
    }
});
