/* global module:true */

"use strict";

var React = require("react"),
    Func = require("./edidcontent-func"),
    ManufacturerInfo = require("./edidBase/manufacturerInfo"),
    StandardTimings = require("./edidBase/standardTimings"),
    VideoInputDefinition = require("./edidBase/videoInputDefinition"),
    DisplayTransfertCharacteristics = require("./edidBase/displayTransfertCharacteristics"),
    _ = require("lodash");

module.exports = React.createClass({
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
            React.createElement(ManufacturerInfo, {
                edidParsed: this.props.edidParsed
            }),
            React.createElement(VideoInputDefinition, {
                dbp: this.props.edidParsed.getBasicDisplayParams()
            }),
            React.createElement(DisplayTransfertCharacteristics, {
                dbp: this.props.edidParsed.getBasicDisplayParams()
            }),
            React.DOM.div(null, this.screenSize()),
            React.DOM.div(null, this.featureSupport()),
            React.DOM.div(null, this.establishedTimings()),
            React.createElement(StandardTimings, {
                standardTimings: this.props.edidParsed.getStandardDisplayModes()
            })
        );
    }
});
