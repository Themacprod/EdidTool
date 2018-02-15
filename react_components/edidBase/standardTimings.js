/* global module:true */

"use strict";

var React = require("react"),
    Func = require("../edidcontent-func"),
    _ = require("lodash");

module.exports = React.createClass({
    render: function() {
        return React.DOM.div({
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, React.DOM.strong(null, "Standard timings")),
            _.map(this.props.standardTimings, function(standardTiming, key) {
                return React.DOM.div({
                        key: key,
                        className: "edid-content-standard width-25"
                    },
                    Func.contentSubGroupCheckbox(" Timing " + Number(key + 1), standardTiming.valid),
                    Func.contentSubGroup("H. Acive pixels", standardTiming.HActive),
                    Func.contentSubGroup("Refresh rate", standardTiming.RefreshRate),
                    Func.contentSubGroup("Ratio", standardTiming.AspectRatio),
                );
            })
        );
    }
});
