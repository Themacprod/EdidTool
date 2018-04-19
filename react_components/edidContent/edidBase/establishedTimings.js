var React = require('react'),
    Title = require('../edidContentTitle'),
    _ = require('lodash');

module.exports = React.createClass({
    genTiming: function (data, key) {
        return React.DOM.div(
            {
                className: 'edid-content-subgroup',
                key: key
            }, React.DOM.div({
                className: 'subgroup-checkbox'
            }, React.DOM.input({
                type: 'checkbox',
                readOnly: 'readOnly',
                checked: data.checked
            })),
            React.DOM.div({
                className: 'subgroup-detail-radio'
            }, `${data.timing.hactive}x${data.timing.vactive} @ ${data.timing.refresh} Hz [${data.timing.description}]`)
        );
    },
    genTimings: function (establishedTimingsGroup, key) {
        return React.DOM.div(
            {
                className: 'edid-content-column width-33',
                key: key
            },
            React.DOM.div(
                {
                    className: 'edid-content-established',
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
                        className: 'edid-content-established'
                    },
                    _.map(establishedTimingsGroup, (data, keygroup) => this.genTiming(data, keygroup))
                )
            )
        );
    },
    render: function () {
        console.log(this.props.establishedTimingsGroups);

        return React.DOM.div(
            {
                className: 'edid-content-group established-timings'
            },
            React.createElement(Title, {
                title: 'Established timings'
            }),
            _.map(this.props.establishedTimingsGroups, (establishedTimingsGroup, key) => this.genTimings(establishedTimingsGroup, key))
        );
    }
});
