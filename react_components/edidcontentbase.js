/* global module:true */

"use strict";

var React = require("react"),
    ManufacturerInfo = require("./edidBase/manufacturerInfo"),
    VideoInputDefinition = require("./edidBase/videoInputDefinition"),
    DisplayTransfertCharacteristics = require("./edidBase/displayTransfertCharacteristics"),
    ScreenSize = require("./edidBase/screenSize"),
    FeatureSupport = require("./edidBase/featureSupport"),
    EstablishedTimings = require("./edidBase/establishedTimings"),
    StandardTimings = require("./edidBase/standardTimings");

module.exports = React.createClass({
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
            React.createElement(ScreenSize, {
                screenSize: this.props.edidParsed.getScreenSize()
            }),
            React.createElement(FeatureSupport),
            React.createElement(EstablishedTimings, {
                establishedTimingsGroups: this.props.edidParsed.getEstablishedModes()
            }),
            React.createElement(StandardTimings, {
                standardTimings: this.props.edidParsed.getStandardDisplayModes()
            })
        );
    }
});
