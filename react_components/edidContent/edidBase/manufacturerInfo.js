/* global module:true */

"use strict";

var React = require("react"),
    SubGroup = require("./subGroup"),
    Title = require("../edidContentTitle");

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            {
                className: "edid-content-group"
            },
            React.createElement(Title, {
                title: "Manufacturer & Product ID"
            }),
            React.DOM.div(
                {
                    className: "edid-content-column width-50"
                },
                React.createElement(SubGroup, {
                    detail: "Manufacturer ID (PnPID):",
                    data: this.props.vendorProductId.manufacturerId
                }),
                React.createElement(SubGroup, {
                    detail: "Manufacturer name:",
                    data: this.props.vendorProductId.manufacturerName
                }),
                React.createElement(SubGroup, {
                    detail: "Product ID:",
                    data: this.props.vendorProductId.productCode
                })
            ),
            React.DOM.div(
                {
                    className: "edid-content-column width-50"
                },
                React.createElement(SubGroup, {
                    detail: "Serial Number:",
                    data: this.props.vendorProductId.serialNumber
                }),
                React.createElement(SubGroup, {
                    detail: "Week:",
                    data: this.props.vendorProductId.manufactureWeek
                }),
                React.createElement(SubGroup, {
                    detail: "Year:",
                    data: this.props.vendorProductId.manufactureYear
                })
            )
        );
    }
});
