var React = require("react"),
    Func = require("../edidcontent-func"),
    Title = require("../edidContentTitle"),
    _ = require("lodash");

module.exports = React.createClass({
    generateSection: function(name, data) {
        return React.DOM.div(
            null,
            React.DOM.div({
                className: "detail width-80 inline-block"
            }, name),
            React.DOM.div({
                className: "data width-20 inline-block"
            }, data)
        );
    },
    render: function() {
        return React.DOM.div(
            {
                className: "edid-content-group"
            },
            React.createElement(Title, {
                title: "Standard timings"
            }),
            _.map(this.props.standardTimings, _.bind(function(standardTiming, key) {
                return React.DOM.div(
                    {
                        key: key,
                        className: "edid-content-standard width-25 inline-block"
                    },
                    React.DOM.div(
                        {
                            className: "border margin"
                        },
                        Func.contentSubGroupCheckbox(
                            " Timing " + Number(key + 1),
                            standardTiming.valid
                        ),
                        this.generateSection(
                            "H. Active pixels",
                            standardTiming.HActive
                        ),
                        this.generateSection(
                            "Refresh rate",
                            standardTiming.RefreshRate
                        ),
                        this.generateSection(
                            "Ratio",
                            standardTiming.AspectRatio
                        )
                    )
                );
            }, this))
        );
    }
});
