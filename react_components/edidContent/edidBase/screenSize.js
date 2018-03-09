/* global module:true */

"use strict";

var React = require("react"),
    Func = require("../edidcontent-func"),
    Title = require("../edidContentTitle");

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            {
                className: "edid-content-group"
            },
            React.createElement(Title, {
                title: "Screen size"
            }),
            React.DOM.div(
                {
                    className: "edid-content-column width-50"
                },
                Func.contentSubGroupRadio(" Dimensions", this.props.screenSize.imageSizePresent === true),
                Func.contentSubGroup("Horizontal size (cm):", this.props.screenSize.horizontalSize),
                Func.contentSubGroup("Vertical size (cm):", this.props.screenSize.verticalSize)
            ),
            React.DOM.div(
                {
                    className: "edid-content-column width-50"
                },
                Func.contentSubGroupRadio(" Aspect Ratio (1.4)", this.props.screenSize.imageSizePresent === false),
                Func.contentSubGroupRadio(" Portrait", this.props.screenSize.portrait === true),
                Func.contentSubGroupRadio(" Landscape", this.props.screenSize.portrait === false)
            )
        );
    }
});
