var React = require('react'),
    Func = require('../edidcontent-func'),
    Title = require('../edidContentTitle'),
    _ = require('lodash');

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            {
                className: 'edid-content-group established-timings'
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
                            _.map(establishedTimingsGroup, _.bind(function(data, keygroup) {
                                return Func.contentSubGroupCheckboxKey(
                                    data.timing.hactive + 'x' + data.timing.vactive + ' @ ' + data.timing.refresh + ' Hz [' + data.timing.description + ']',
                                    data.checked,
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
