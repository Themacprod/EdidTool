var React = require('react'),
    _ = require('lodash'),
    Title = require('../edidContentTitle'),
    DetailedTiming = require('../edidBaseDetailedData/detailedTiming');

module.exports = React.createClass({
    render: function () {
        const dtdCount = this.props.edidParsed.getNumberExtDtds(this.props.extIndex);
        const dtdTimings = this.props.edidParsed.getExtDtds(this.props.extIndex);


        return React.DOM.div(
            {
                className: 'edid-content-group cea-detailed-timing'
            },
            React.createElement(Title, {
                title: 'Detailed Timings Descriptor'
            }),
            React.DOM.div(
                null,
                `DTD count :${dtdCount}`
            ),
            React.DOM.div(
                null,
                _.map(dtdTimings, (dtdTiming, key) => (
                    React.createElement(DetailedTiming, {
                        key: key,
                        data: dtdTiming
                    })
                ))
            )
        );
    }
});
