var React = require('react'),
    Title = require('../edidContentTitle');

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            {
                className: 'edid-content-group'
            },
            React.createElement(Title, {
                title: 'Feature Support'
            })
        );
    }
});
