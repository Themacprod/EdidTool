var React = require('react');

module.exports = React.createClass({
    render: function () {
        return React.DOM.div({
            className: 'edid-content-title'
        }, React.DOM.strong(null, this.props.title));
    }
});
