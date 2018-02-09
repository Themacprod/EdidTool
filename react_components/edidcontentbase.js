/* global module:true */

"use strict";

var React = require("react"),
    Func = require("./edidcontent-func"),
    _ = require("lodash");

module.exports = React.createClass({
    manufacturerInfo: function() {
        return React.DOM.div({
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, React.DOM.strong(null, "Manufacturer & Product ID")),
            React.DOM.div({
                    className: "edid-content-column width-50"
                },
                Func.contentSubGroup("Manufacturer ID (PnPID):", this.props.edidParsed.getManufacturerId()),
                Func.contentSubGroup("Manufacturer name:", this.props.edidParsed.getManufacturerName()),
                Func.contentSubGroup("Product ID:", this.props.edidParsed.getProductCode())
            ),
            React.DOM.div({
                    className: "edid-content-column width-50"
                },
                Func.contentSubGroup("Serial Number:", this.props.edidParsed.getSerialNumber()),
                Func.contentSubGroup("Week:", this.props.edidParsed.getManufactureWeek()),
                Func.contentSubGroup("Year:", this.props.edidParsed.getManufactureYear())
            )
        );
    },
    videoInputDefinition: function() {
        var dbp = this.props.edidParsed.getBasicDisplayParams();

        return React.DOM.div({
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, React.DOM.strong(null, "Video Input Definition")),
            React.DOM.div({
                    className: "edid-content-column width-50"
                },
                Func.contentSubGroupRadio(" Analog", dbp.digitalInput === false),
                React.DOM.div({
                        className: (dbp.digitalInput === false) ? "collapse show" : "collapse",
                        id: "collapseExample"
                    },
                    Func.contentSubGroupCheckbox(" Blank Setup Expected", (dbp.digitalInput === false) ? (dbp.whiteSyncLevels === true) : false),
                    Func.contentSubGroupCheckbox(" Separate Sync", (dbp.digitalInput === false) ? (dbp.separateSyncSupported === true) : false),
                    Func.contentSubGroupCheckbox(" Composite Sync", (dbp.digitalInput === false) ? (dbp.compositeSyncSupported === true) : false),
                    Func.contentSubGroupCheckbox(" Sync On Green", (dbp.digitalInput === false) ? (dbp.synOnGreen === true) : false),
                    Func.contentSubGroupCheckbox(" Serration", (dbp.digitalInput === false) ? (dbp.vsyncSerrated === true) : false)
                )
            ),
            React.DOM.div({
                    className: "edid-content-column width-50"
                },
                Func.contentSubGroupRadio(" Digital", dbp.digitalInput)
            )
        );
    },
    displayTransfertCharacteristics: function() {
        var dbp = this.props.edidParsed.getBasicDisplayParams();

        return React.DOM.div({
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, React.DOM.strong(null, "Display Transfert Characteristics")),
            Func.contentSubGroup("Gamma:", dbp.displayGamma.toFixed(2))
        );
    },
    screenSize: function() {
        var screenSize = this.props.edidParsed.getScreenSize();

        return React.DOM.div({
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, React.DOM.strong(null, "Screen size")),
            React.DOM.div({
                    className: "edid-content-column width-50"
                },
                Func.contentSubGroupRadio(" Dimensions", screenSize.imageSizePresent === true),
                Func.contentSubGroup("Horizontal size (cm):", screenSize.horizontalSize),
                Func.contentSubGroup("Vertical size (cm):", screenSize.verticalSize)
            ),
            React.DOM.div({
                    className: "edid-content-column width-50"
                },
                Func.contentSubGroupRadio(" Aspect Ratio (1.4)", screenSize.imageSizePresent === false),
                Func.contentSubGroupRadio(" Portrait", screenSize.portrait === true),
                Func.contentSubGroupRadio(" Landscape", screenSize.portrait === false)
            )
        );
    },
    featureSupport: function() {
        var dbp = this.props.edidParsed.getBasicDisplayParams();

        return React.DOM.div({
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, React.DOM.strong(null, "Feature Support"))
        );
    },
    establishedTimings: function() {
        var establishedTimingsGroups = this.props.edidParsed.getEstablishedModes();

        return React.DOM.div({
                className: "edid-content-group"
            },
            React.DOM.div({
                className: "edid-content-title"
            }, React.DOM.strong(null, "Established timings")),
            _.map(establishedTimingsGroups, _.bind(function(establishedTimingsGroup, key) {
                return React.DOM.div({
                        className: "edid-content-column width-33",
                        key: key
                    },
                    React.DOM.div({
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
                        React.DOM.div({
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
                    )
                );
            }, this))
        );
    },
    render: function() {
        return React.DOM.div(
            null,
            React.DOM.div(null, this.manufacturerInfo()),
            React.DOM.div(null, this.videoInputDefinition()),
            React.DOM.div(null, this.displayTransfertCharacteristics()),
            React.DOM.div(null, this.screenSize()),
            React.DOM.div(null, this.featureSupport()),
            React.DOM.div(null, this.establishedTimings())
        );
    }
});
