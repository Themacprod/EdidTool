/* global module:true */

"use strict";

var React = require("react"),
    EdidParser = require("./edidparser");

module.exports = React.createClass({
    componentWillMount: function() {
        this.edidParser = new EdidParser();
    },
    render: function() {
        this.edidParser.setEdidData(this.props.edid);
        this.edidParser.parse();

        return React.DOM.div({
                className: "edid-content"
            },
            React.DOM.table(null,
                React.DOM.tbody(null,
                    React.DOM.tr(null,
                        React.DOM.th(null, "Manufacturer & Product ID"),
                        React.DOM.th(null, "")
                    ),
                    React.DOM.tr(null,
                        React.DOM.td(null, "Manufacturer ID (PnPID):"),
                        React.DOM.td({
                            className: "edid-content-data"
                        }, this.edidParser.getManufacturerId())
                    ),
                    React.DOM.tr(null,
                        React.DOM.td(null, "Manufacturer name:"),
                        React.DOM.td({
                            className: "edid-content-data"
                        }, this.edidParser.getManufacturerName())
                    ),
                    React.DOM.tr(null,
                        React.DOM.td(null, "Product ID:"),
                        React.DOM.td({
                            className: "edid-content-data"
                        }, this.edidParser.getProductCode())
                    ),
                    React.DOM.tr(null,
                        React.DOM.td(null, "Serial Number:"),
                        React.DOM.td({
                            className: "edid-content-data"
                        }, this.edidParser.getSerialNumber())
                    ),
                    React.DOM.tr(null,
                        React.DOM.td(null, "Week:"),
                        React.DOM.td({
                            className: "edid-content-data"
                        }, this.edidParser.getManufactureWeek())
                    ),
                    React.DOM.tr(null,
                        React.DOM.td(null, "Year:"),
                        React.DOM.td({
                            className: "edid-content-data"
                        }, this.edidParser.getManufactureYear())
                    )
                )
            )
        );
    }
});
