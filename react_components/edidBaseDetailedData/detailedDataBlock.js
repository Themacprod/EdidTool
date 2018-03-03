/* global module:true */

"use strict";

var React = require("react"),
    Title = require("../edidContentTitle");

module.exports = React.createClass({
    render: function() {
        return React.DOM.div({
                className: "width-25 inline-block",
                key: this.props.key
            },
            React.createElement(Title, {
                title: this.props.title
            }),
            React.DOM.div(null, this.props.type)
        );
    }
});
