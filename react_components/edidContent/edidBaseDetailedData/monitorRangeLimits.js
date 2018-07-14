var React = require('react');

module.exports = React.createClass({
    render: function () {
        const range = this.props.data;
        return React.DOM.div(
            null,
            React.DOM.div(null, `Min V Rate : ${range.minVRate} Hz`),
            React.DOM.div(null, `Max V Rate : ${range.maxVRate} Hz`),
            React.DOM.div(null, `Min H Rate : ${range.minHRate} kHz`),
            React.DOM.div(null, `Max H Rate : ${range.maxHRate} kHz`),
            React.DOM.div(null, `Max Pixelclock : ${range.maxPixelClockMHz} MHz`),
            React.DOM.div(null, `Video Timing Support : ${range.videoTimingSupport}`)
        );
    }
});
