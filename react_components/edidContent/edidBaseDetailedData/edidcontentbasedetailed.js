var React = require('react'),
    _ = require('lodash'),
    DetailedDataBlock = require('./detailedDataBlock');

module.exports = React.createClass({
    genDataBlock: function (detailedType, key) {
        return React.createElement(DetailedDataBlock, {
            key: key,
            title: `Block ${Number(key + 1)}`,
            string: detailedType.string,
            data: detailedType.data
        });
    },
    render: function () {
        const dtds = this.props.edidParsed.getDtds();

        return React.DOM.div(
            null,
            _.map(dtds.dtdType, (detailedType, key) => this.genDataBlock(detailedType, key))
        );
    }
});
