var React = require('react'),
    _ = require('lodash'),
    DetailedDataBlock = require('./detailedDataBlock');

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            null,
            _.map(this.props.edidParsed.getDtds().dtdType, function(detailedType, key) {
                return React.createElement(DetailedDataBlock, {
                    key: key,
                    title: 'Block ' + String(key + 1),
                    string: detailedType.string,
                    data: detailedType.data
                });
            })
        );
    }
});
