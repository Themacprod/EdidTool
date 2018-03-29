var React = require('react'),
    _ = require('lodash');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            byteselected: -1
        };
    },
    handleClick: function(byte) {
        this.setState({
            byteselected: byte
        });
    },
    toHex: function(byte) {
        var hexValue = byte.toString(16).toUpperCase();
        if (hexValue.length < 2) {
            hexValue = '0' + hexValue;
        }
        return hexValue;
    },
    render: function() {
        var byteindex = 0;
        var defaultChunk = 16;
        var gridheader = [];

        gridheader.push(React.DOM.input({
            key: 0,
            className: 'input-grid-selected text-center',
            type: 'text',
            value: '',
            readOnly: 'readOnly'
        }));

        for (var i = 0; i < (this.props.chunk || defaultChunk); i += 1) {
            gridheader.push(React.DOM.input({
                key: i + 1,
                className: 'input-grid-selected',
                type: 'text',
                value: this.toHex(i),
                readOnly: 'readOnly'
            }));
        }

        return React.DOM.div(
            {
                className: 'edid-raw'
            },
            React.DOM.div({
                key: 0,
                className: 'input-grid-line text-center'
            }, gridheader),
            _.map(_.chunk(this.props.edid, this.props.chunk || defaultChunk), _.bind(function(line, idx) {
                return React.DOM.div(
                    {
                        key: idx,
                        className: 'input-grid-line text-center'
                    },
                    React.DOM.input({
                        key: 0,
                        className: 'input-grid-selected',
                        type: 'text',
                        value: this.toHex(byteindex),
                        readOnly: 'readOnly'
                    }),
                    _.map(line, _.bind(function(byte, key) {
                        byteindex += 1;
                        return React.DOM.input({
                            key: key,
                            className: byteindex === this.state.byteselected ? 'input-grid-selected' : 'input-grid',
                            type: 'text',
                            value: this.toHex(byte),
                            readOnly: 'readOnly',
                            onClick: this.handleClick.bind(this, this.toHex(byte))
                        });
                    }, this))
                );
            }, this))
        );
    }
});
