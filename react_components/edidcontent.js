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
    contentSubGroupRadio: function(detail, checked) {
        return React.DOM.div({
                className: "edid-content-subgroup"
            }, React.DOM.div({
                className: "subgroup-radio"
            }, React.DOM.input({
                type: "radio",
                readOnly: "readOnly",
                checked: checked
            })),
            React.DOM.div({
                className: "subgroup-data"
            }, detail));
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
    videoInputDefinition: function() {
        var dbp = this.edidParser.getBasicDisplayParams();

        return React.DOM.div({
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, "Video Input Definition"),
            this.contentSubGroupRadio(" Analog", dbp.digitalInput === false),
            this.contentSubGroupRadio(" Digital", dbp.digitalInput === true)
        );
    },
    render: function() {
        this.edidParser.setEdidData(this.props.edid);
        this.edidParser.parse();

        return React.DOM.div({
                className: "edid-content"
            },
            React.DOM.div(null, this.manufacturerInfo()),
            React.DOM.div(null, this.videoInputDefinition())
        );
    }
});
