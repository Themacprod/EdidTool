var React = require('react'),
    _ = require('lodash'),
    Func = require('../edidcontent-func'),
    Title = require('../edidContentTitle');

module.exports = React.createClass({
    render: function() {
        const power = this.props.featureSupport.displayPowerManagement;
        const colorTypes = this.props.featureSupport.displayColorType;
        return React.DOM.div(
            {
                className: 'edid-content-group feature-support'
            },
            React.createElement(Title, {
                title: 'Feature Support'
            }),
            React.DOM.div(
                null,
                React.DOM.strong(
                    null,
                    'Display Power Management'
                )
            ),
            Func.contentSubGroupCheckbox('Standby Mode', power.standbyMode),
            Func.contentSubGroupCheckbox('Suspend Mode', power.suspendMode),
            Func.contentSubGroupCheckbox('Very Low Power', power.lowPowerSupport),
            React.DOM.div(
                null,
                React.DOM.strong(
                    null,
                    'Color Type'
                )
            ),
            _.map(colorTypes.list, function(colorType, key) {
                return React.DOM.div(
                    {
                        className: 'edid-content-subgroup',
                        key: key
                    }, React.DOM.div({
                        className: 'subgroup-radio'
                    }, React.DOM.input({
                        type: 'radio',
                        readOnly: 'readOnly',
                        checked: (colorTypes.index === key)
                    })),
                    React.DOM.div({
                        className: 'subgroup-data'
                    }, colorType)
                );
            })
        );
    }
});
