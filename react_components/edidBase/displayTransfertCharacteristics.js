/* global module:true */

"use strict";

var React = require("react"),
    Func = require("../edidcontent-func"),
    Title = require("../edidContentTitle");

module.exports = React.createClass({
    render: function() {
        return React.DOM.div({
                className: "edid-content-group"
            },
            React.createElement(Title, {
                title: "Display Transfert Characteristics"
            }),
            Func.contentSubGroup("Gamma:", this.props.dbp.displayGamma.toFixed(2))
        );
    }
});
