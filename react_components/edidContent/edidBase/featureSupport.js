var React = require('react'),
    Func = require('../edidcontent-func'),
    Title = require('../edidContentTitle');

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            {
                className: 'edid-content-group feature-support'
            },
            React.createElement(Title, {
                title: 'Feature Support'
            }),
            Func.contentSubGroupCheckbox(
                'Standby Mode',
                this.props.featureSupport.standbyMode
            )
        );
    }
});
