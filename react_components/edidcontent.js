/* global module:true */

"use strict";

var React = require("react"),
    EdidParser = require("./edidparser"),
    Func = require("./edidcontent-func"),
    _ = require("lodash");

module.exports = React.createClass({
    componentWillMount: function() {
        this.edidParser = new EdidParser();
    },
    generateEstablished: function(data, key) {
        return Func.contentSubGroupCheckboxKey(
            data.hactive + "x" + data.vactive + " @ " + data.refresh + " Hz [" + data.description + "]",
            data.checked,
            key);
    },
    manufacturerInfo: function() {
        return React.DOM.div({
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, "Manufacturer & Product ID"),
            Func.contentSubGroup("Manufacturer ID (PnPID):", this.edidParser.getManufacturerId()),
            Func.contentSubGroup("Manufacturer name:", this.edidParser.getManufacturerName()),
            Func.contentSubGroup("Product ID:", this.edidParser.getProductCode()),
            Func.contentSubGroup("Serial Number:", this.edidParser.getSerialNumber()),
            Func.contentSubGroup("Week:", this.edidParser.getManufactureWeek()),
            Func.contentSubGroup("Year:", this.edidParser.getManufactureYear())
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
            Func.contentSubGroupRadio(" Analog", dbp.digitalInput === false),
            Func.contentSubGroupCheckbox(" Blank Setup Expected", (dbp.digitalInput === false) ? (dbp.whiteSyncLevels === true) : false),
            Func.contentSubGroupCheckbox(" Separate Sync", (dbp.digitalInput === false) ? (dbp.separateSyncSupported === true) : false),
            Func.contentSubGroupCheckbox(" Composite Sync", (dbp.digitalInput === false) ? (dbp.compositeSyncSupported === true) : false),
            Func.contentSubGroupCheckbox(" Sync On Green", (dbp.digitalInput === false) ? (dbp.synOnGreen === true) : false),
            Func.contentSubGroupCheckbox(" Serration", (dbp.digitalInput === false) ? (dbp.vsyncSerrated === true) : false),
            Func.contentSubGroupRadio(" Digital", dbp.digitalInput)
        );
    },
    establishedTimings: function() {
        return React.DOM.div({
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, "Established timings"),
            React.DOM.div(null, "Established Timings I"),
            React.DOM.div({
                    className: "edid-content-established"
                },
                _.map(this.edidParser.getEstablishedModes1(), _.bind(function(establishedMode, key) {
                    return this.generateEstablished(establishedMode, key);
                }, this))
            ),
            React.DOM.div(null, "Established Timings II"),
            React.DOM.div({
                    className: "edid-content-established"
                },
                _.map(this.edidParser.getEstablishedModes2(), _.bind(function(establishedMode, key) {
                    return this.generateEstablished(establishedMode, key);
                }, this))
            ),
            React.DOM.div(null, "Manufacturer's Timings"),
            React.DOM.div({
                    className: "edid-content-established"
                },
                _.map(this.edidParser.getEstablishedModes3(), _.bind(function(establishedMode, key) {
                    return this.generateEstablished(establishedMode, key);
                }, this))
            )
        );
    },
    render: function() {
        this.edidParser.setEdidData(this.props.edid);
        this.edidParser.parse();

        return React.DOM.div({
                className: "edid-content"
            },
            React.DOM.div(null, this.manufacturerInfo()),
            React.DOM.div(null, this.videoInputDefinition()),
            React.DOM.div(null, this.establishedTimings())
        );
    }
});
