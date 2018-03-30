var React = require('react');

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            {
                className: 'edid-content-subgroup'
            }, React.DOM.div({
                className: 'subgroup-detail'
            }, this.props.detail),
            React.DOM.div({
                className: 'subgroup-data'
            }, this.props.data)
        );
    }
});
