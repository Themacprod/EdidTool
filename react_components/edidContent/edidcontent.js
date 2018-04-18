var React = require('react'),
    EdidParser = require('../edidparser'),
    _ = require('lodash'),
    EdidBase = require('./edidBase/edidcontentbase'),
    EdidBaseDetailedData = require('./edidBaseDetailedData/edidcontentbasedetailed'),
    EdidCea = require('./edidcontentcea');

module.exports = React.createClass({
    componentWillMount: function () {
        this.edidParser = new EdidParser();
    },
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
        var ext = [];

        ext.push('Standard data');
        ext.push('Detailed data');

        for (let i = 0; i < this.edidParser.getNumberExtensions(); i += 1) {
            const extcount = i + 1;
            ext.push(`CEA #${extcount}`);
        }

        return React.DOM.ul(
            {
                className: 'nav nav-tabs'
            },
            _.map(ext, _.bind(function (data, key) {
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
    generateExt: function () {
        if (this.state.selected === 0) {
            return React.createElement(EdidBase, {
                edidParsed: this.edidParser
            });
        } else if (this.state.selected === 1) {
            return React.createElement(EdidBaseDetailedData, {
                edidParsed: this.edidParser
            });
        }

        return React.createElement(EdidCea, {
            edidParsed: this.edidParser
        });
    },
    render: function () {
        this.edidParser.setEdidData(this.props.edid);
        this.edidParser.parse();

        return React.DOM.div(
            {
                className: 'edid-content'
            },
            this.generateTabs(),
            this.generateExt()
        );
    }
});
