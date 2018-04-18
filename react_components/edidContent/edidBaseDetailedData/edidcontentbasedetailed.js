var React = require('react'),
    _ = require('lodash'),
    DetailedDataBlock = require('./detailedDataBlock');

module.exports = React.createClass({
    render: function () {
        return React.DOM.div(
            null,
            _.map(this.props.edidParsed.getDtds().dtdType, (detailedType, key) => {
                React.createElement(DetailedDataBlock, {
                    key: key,
                    title: `Block ${Number(key + 1)}`,
                    string: detailedType.string,
                    data: detailedType.data
                });
            })
        );
    }
});
