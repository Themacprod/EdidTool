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
    manufacturerInfo: function() {
        return React.DOM.div(
            {
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, React.DOM.strong(null, "Manufacturer & Product ID")),
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

        return React.DOM.div(
            {
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, React.DOM.strong(null, "Video Input Definition")),
            Func.contentSubGroupRadio(" Analog", dbp.digitalInput === false),
            Func.contentSubGroupCheckbox(" Blank Setup Expected", (dbp.digitalInput === false) ? (dbp.whiteSyncLevels === true) : false),
            Func.contentSubGroupCheckbox(" Separate Sync", (dbp.digitalInput === false) ? (dbp.separateSyncSupported === true) : false),
            Func.contentSubGroupCheckbox(" Composite Sync", (dbp.digitalInput === false) ? (dbp.compositeSyncSupported === true) : false),
            Func.contentSubGroupCheckbox(" Sync On Green", (dbp.digitalInput === false) ? (dbp.synOnGreen === true) : false),
            Func.contentSubGroupCheckbox(" Serration", (dbp.digitalInput === false) ? (dbp.vsyncSerrated === true) : false),
            Func.contentSubGroupRadio(" Digital", dbp.digitalInput)
        );
    },
    displayTransfertCharacteristics: function() {
        var dbp = this.edidParser.getBasicDisplayParams();

        return React.DOM.div(
            {
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, React.DOM.strong(null, "Display Transfert Characteristics")),
            Func.contentSubGroup("Gamma:", dbp.displayGamma.toFixed(2))
        );
    },
    screenSize: function() {
        var screenSize = this.edidParser.getScreenSize();

        return React.DOM.div(
            {
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, React.DOM.strong(null, "Screen size")),
            Func.contentSubGroupRadio(" Dimensions", screenSize.imageSizePresent === true),
            Func.contentSubGroup("Horizontal size (cm):", screenSize.horizontalSize),
            Func.contentSubGroup("Vertical size (cm):", screenSize.verticalSize),
            Func.contentSubGroupRadio(" Aspect Ratio (1.4)", screenSize.imageSizePresent === false),
            Func.contentSubGroupRadio(" Portrait", screenSize.portrait === true),
            Func.contentSubGroupRadio(" Landscape", screenSize.portrait === false)
        );
    },
    establishedTimings: function() {
        var establishedTimingsGroups = this.edidParser.getEstablishedModes();

        return React.DOM.div(
            {
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, React.DOM.strong(null, "Established timings")),
            _.map(establishedTimingsGroups, _.bind(function(establishedTimingsGroup, key) {
                return React.DOM.div(
                    {
                        className: "edid-content-established",
                        key: key
                    },
                    React.DOM.div(
                        null,
                        React.DOM.strong(
                            null,
                            establishedTimingsGroup.description
                        )
                    ),
                    React.DOM.div(
                        {
                            className: "edid-content-established"
                        },
                        _.map(establishedTimingsGroup, _.bind(function(establishedTimings, keygroup) {
                            return Func.contentSubGroupCheckboxKey(
                                establishedTimings.hactive + "x" + establishedTimings.vactive + " @ " + establishedTimings.refresh + " Hz [" + establishedTimings.description + "]",
                                establishedTimings.checked,
                                keygroup
                            );
                        }, this))
                    )
                );
            }, this))
        );
    },
    render: function() {
        this.edidParser.setEdidData(this.props.edid);
        this.edidParser.parse();

        return React.DOM.div(
            {
                className: "edid-content"
            },
            React.DOM.div(
                {
                    className: "edid-content-column"
                },
                React.DOM.div(null, this.manufacturerInfo()),
                React.DOM.div(null, this.videoInputDefinition()),
                React.DOM.div(null, this.displayTransfertCharacteristics())
            ),
            React.DOM.div(
                {
                    className: "edid-content-column"
                },
                React.DOM.div(null, this.screenSize())
            ),
            React.DOM.div(
                {
                    className: "edid-content-column"
                },
                React.DOM.div(null, this.establishedTimings())
            )
        );
    }
});
