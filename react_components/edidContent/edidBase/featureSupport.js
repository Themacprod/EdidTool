var React = require('react'),
    Title = require('../edidContentTitle');

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            {
                className: 'edid-content-group feature-support'
            },
            React.createElement(Title, {
                title: 'Feature Support'
            })
        );
    }
});
