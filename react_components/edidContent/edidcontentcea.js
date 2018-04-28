var React = require('react');

module.exports = React.createClass({
    render: function () {
        const revision = this.props.edidParsed.getRevisionNumber(this.props.extIndex);
        const description = this.props.edidParsed.getExtTagDesc(this.props.extIndex);

        return React.DOM.div(
            null,
            `${description} revision ${revision}`
        );
    }
});
