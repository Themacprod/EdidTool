/* global module:true */

"use strict";

var React = require("react"),
    EdidParser = require("./edidparser");

module.exports = React.createClass({
    componentWillMount: function() {
        this.edidParser = new EdidParser();
    },
    render: function() {
        this.edidParser.setEdidData(this.props.edid);
        this.edidParser.parse();

        return React.DOM.div({
                className: "edid-content"
            },
            React.DOM.div(
                null, "Product Code: " + this.edidParser.getProductCode()),
            React.DOM.div(
                null, "Serial Number: " + this.edidParser.getSerialNumber()),
            React.DOM.div(
                null, "Week Manufacture: " + this.edidParser.getManufactureWeek()),
            React.DOM.div(
                null, "Year Manufacture: " + this.edidParser.getManufactureYear()),
            React.DOM.div(
                null, "EDID Version Number: " + this.edidParser.getEdidVersion()),
            React.DOM.div(
                null, "EDID Revision Number: " + this.edidParser.getEdidRevision()));
    }
});
