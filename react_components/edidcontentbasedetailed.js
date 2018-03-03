/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash"),
    DetailedDataBlock = require("./edidBaseDetailedData/detailedDataBlock");

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            null,
            _.map(this.props.edidParsed.getDtds().dtdType, function(block, key) {
                return React.createElement(DetailedDataBlock, {
                    key: key,
                    title: "Block " + String(key + 1),
                    type: block
                });
            })
        );
    }
});
