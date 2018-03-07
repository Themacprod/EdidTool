/* global module:true */

"use strict";

var React = require("react"),
    Title = require("../edidContentTitle"),
    MonitorName = require("./monitorName");

module.exports = React.createClass({
    generateSection: function(dtdType, data) {
        if (data) {
            if (dtdType === "Monitor Name") {
                return React.createElement(MonitorName, {
                    data: data
                })
            }

            return null;
        }

        return null;
    },
    render: function() {
        return React.DOM.div({
                className: "width-25 inline-block",
                key: this.props.key
            },
            React.createElement(Title, {
                title: this.props.title
            }),
            React.DOM.div(null, this.props.string),
            this.generateSection(
                this.props.string,
                this.props.data
            )
        );
    }
});
