var React = require('react'),
    ManufacturerInfo = require('./manufacturerInfo'),
    VideoInputDefinition = require('./videoInputDefinition'),
    DisplayTransfertCharacteristics = require('./displayTransfertCharacteristics'),
    ScreenSize = require('./screenSize'),
    FeatureSupport = require('./featureSupport'),
    EstablishedTimings = require('./establishedTimings'),
    StandardTimings = require('./standardTimings');

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            null,
            React.createElement(ManufacturerInfo, {
                vendorProductId: this.props.edidParsed.getVendorProductId()
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
            React.createElement(FeatureSupport, {
                featureSupport: this.props.edidParsed.getFeatureSupport()
            }),
            React.createElement(EstablishedTimings, {
                establishedTimingsGroups: this.props.edidParsed.getEstablishedModes()
            }),
            React.createElement(StandardTimings, {
                standardTimings: this.props.edidParsed.getStandardDisplayModes()
            })
        );
    }
});
