var React = require('react'),
    revision = require('./extCea/revision'),
    monitorSupport = require('./extCea/monitorSupport');

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
            })
        );
    }
});
