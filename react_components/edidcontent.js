/* global module:true */

"use strict";

var React = require("react"),
    EdidParser = require("./edidparser");

module.exports = React.createClass({
    componentWillMount: function() {
        this.edidParser = new EdidParser();
    },
    contentSubGroup: function(detail, data) {
        return React.DOM.div({
                className: "edid-content-subgroup"
            }, React.DOM.div({
                className: "subgroup-detail"
            }, detail),
            React.DOM.div({
                className: "subgroup-data"
            }, data)
        );
    },
    manufacturerInfo: function() {
        return React.DOM.div({
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, "Manufacturer & Product ID"),
            this.contentSubGroup("Manufacturer ID (PnPID):", this.edidParser.getManufacturerId()),
            this.contentSubGroup("Manufacturer name:", this.edidParser.getManufacturerName()),
            this.contentSubGroup("Product ID:", this.edidParser.getProductCode()),
            this.contentSubGroup("Serial Number:", this.edidParser.getSerialNumber()),
            this.contentSubGroup("Week:", this.edidParser.getManufactureWeek()),
            this.contentSubGroup("Year:", this.edidParser.getManufactureYear())
        );
    },
    render: function() {
        this.edidParser.setEdidData(this.props.edid);
        this.edidParser.parse();

        return React.DOM.div({
                className: "edid-content"
            },
            React.DOM.div(null, this.manufacturerInfo())
        );
    }
});
