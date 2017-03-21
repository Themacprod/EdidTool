/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            byteselected: -1
        };
    },
    handleClick: function(byte) {
        this.setState({
            byteselected: byte
        });
    },
    render: function() {
        var byteindex = 0;
        var gridheader = [];

        gridheader.push(React.DOM.input({
            key: 0,
            className: "input-grid-selected",
            type: "text",
            value: "",
            readOnly: "readOnly"
        }));

        for (var i = 0; i < (this.props.chunk || 10); i += 1) {
            gridheader.push(React.DOM.input({
                key: i + 1,
                className: "input-grid-selected",
                type: "text",
                value: i,
                readOnly: "readOnly"
            }));
        }

        return React.DOM.div({
                className: "edid-raw"
            },
            React.DOM.div({
                key: 0,
                className: "input-grid-line"
            }, gridheader),
            _.map(_.chunk(this.props.edid, this.props.chunk || 10), _.bind(function(line, idx) {
                return React.DOM.div({
                        key: idx,
                        className: "input-grid-line"
                    },
                    React.DOM.input({
                        key: 0,
                        className: "input-grid-selected",
                        type: "text",
                        value: byteindex,
                        readOnly: "readOnly"
                    }),
                    _.map(line, _.bind(function(byte, key) {
                        var hexValue = byte.toString(16).toUpperCase();
                        if (hexValue.length < 2) {
                            hexValue = "0" + hexValue;
                        }

                        byteindex += 1;
                        return React.DOM.input({
                            key: key,
                            className: byteindex === this.state.byteselected ? "input-grid-selected" : "input-grid",
                            type: "text",
                            value: hexValue,
                            readOnly: "readOnly",
                            onClick: this.handleClick.bind(this, byteindex)
                        });
                    }, this))
                );
            }, this))
        );
    }
});
