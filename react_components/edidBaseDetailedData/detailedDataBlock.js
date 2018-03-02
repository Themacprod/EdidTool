/* global module:true */

"use strict";

var React = require("react");

module.exports = React.createClass({
    render: function() {
        return React.DOM.div({
                className: "width-25 inline-block",
                key: this.props.key
            },
            React.DOM.strong(null, this.props.title),
            React.DOM.div(null, this.props.type)
        );
    }
});
