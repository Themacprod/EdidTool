var React = require('react'),
    revision = require('./extCea/revision'),
    monitorSupport = require('./extCea/monitorSupport'),
    detailedTimingDesc = require('./extCea/detailedTimingDesc'),
    dropDown = require('../dropdown');

module.exports = React.createClass({
    render: function () {
        return React.DOM.div(
            null,
            React.createElement(revision, {
                edidParsed: this.props.edidParsed,
                extIndex: this.props.extIndex
            }),
            React.createElement(monitorSupport, {
                edidParsed: this.props.edidParsed,
                extIndex: this.props.extIndex
            }),
            React.createElement(dropDown, {
                id: 'offsetDropdown',
                values: this.props.edidParsed.getExtBlockType(this.props.extIndex)
            }),
            React.createElement(detailedTimingDesc, {
                edidParsed: this.props.edidParsed,
                extIndex: this.props.extIndex
            })
        );
    }
});
