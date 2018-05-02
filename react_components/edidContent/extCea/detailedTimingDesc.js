var React = require('react'),
    Title = require('../edidContentTitle');

module.exports = React.createClass({
    render: function () {
        const numberDtds = this.props.edidParsed.getNumberExtDtds(this.props.extIndex);

        return React.DOM.div(
            {
                className: 'edid-content-group cea-detailed-timing'
            },
            React.createElement(Title, {
                title: 'Detailed Timings Descriptor'
            }),
            React.DOM.div(
                null,
                `DTD count :${numberDtds}`
            )
        );
    }
});
