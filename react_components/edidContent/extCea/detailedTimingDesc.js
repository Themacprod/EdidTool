var React = require('react'),
    _ = require('lodash'),
    Title = require('../edidContentTitle'),
    DetailedTiming = require('../edidBaseDetailedData/detailedTiming');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            selected: 0
        };
    },
    handleClick: function (key) {
        this.setState({
            selected: key
        });
    },
    generateTabs: function () {
        const dtdCount = this.props.edidParsed.getNumberExtDtds(this.props.extIndex);

        var dtdTab = [];

        for (let i = 0; i < dtdCount; i += 1) {
            const dtdIndex = i + 1;
            dtdTab.push(`DTD ${dtdIndex}`);
        }

        return React.DOM.ul(
            {
                className: 'nav nav-tabs'
            },
            _.map(dtdTab, _.bind(function (data, key) {
                var baseState = this.state.selected === key ? ' active' : ' disabled';

                return React.DOM.li(
                    {
                        key: key,
                        className: 'nav-item',
                        onClick: this.handleClick.bind(this, key)
                    },
                    React.DOM.a({
                        className: `nav-link ${baseState}`
                    }, data)
                );
            }, this))
        );
    },
    generateDtd: function () {
        const dtdTimings = this.props.edidParsed.getExtDtds(this.props.extIndex);

        return React.DOM.div(
            null,
            React.createElement(DetailedTiming, {
                data: dtdTimings[this.state.selected]
            })
        );
    },
    render: function () {
        return React.DOM.div(
            {
                className: 'edid-content-group cea-detailed-timing'
            },
            React.createElement(Title, {
                title: 'Detailed Timings Descriptor'
            }),
            this.generateTabs(),
            this.generateDtd()
        );
    }
});
