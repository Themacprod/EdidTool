var React = require('react'),
    Title = require('../edidContentTitle'),
    DetailedTiming = require('./detailedTiming'),
    MonitorRangeLimits = require('./monitorRangeLimits'),
    DisplayProductSerial = require('./displayProductSerial'),
    MonitorName = require('./monitorName');

module.exports = React.createClass({
    generateSection: function (dtdType, data) {
        if (data) {
            if (dtdType === 'Detailed Timing') {
                return React.createElement(DetailedTiming, {
                    data: data
                });
            }
            if (dtdType === 'Monitor Range Limits') {
                return React.createElement(MonitorRangeLimits, {
                    data: data
                });
            }
            if (dtdType === 'Monitor Name') {
                return React.createElement(MonitorName, {
                    data: data
                });
            }
            if (dtdType === 'Monitor Serial Number') {
                return React.createElement(DisplayProductSerial, {
                    data: data
                });
            }

            return null;
        }

        return null;
    },
    render: function () {
        return React.DOM.div(
            {
                className: 'width-25 inline-block vertical-top',
                key: this.props.key
            },
            React.createElement(Title, {
                title: this.props.title
            }),
            React.DOM.div(null, this.props.string),
            this.generateSection(
                this.props.string,
                this.props.data
            )
        );
    }
});
