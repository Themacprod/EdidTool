var React = require('react'),
    Func = require('../edidcontent-func'),
    Title = require('../edidContentTitle'),
    _ = require('lodash');

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            {
                className: 'edid-content-group'
            },
            React.createElement(Title, {
                title: 'Established timings'
            }),
            _.map(this.props.establishedTimingsGroups, _.bind(function(establishedTimingsGroup, key) {
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
                            _.map(establishedTimingsGroup, _.bind(function(establishedTimings, keygroup) {
                                return Func.contentSubGroupCheckboxKey(
                                    establishedTimings.hactive + 'x' + establishedTimings.vactive + ' @ ' + establishedTimings.refresh + ' Hz [' + establishedTimings.description + ']',
                                    establishedTimings.checked,
                                    keygroup
                                );
                            }, this))
                        )
                    )
                );
            }, this))
        );
    }
});
