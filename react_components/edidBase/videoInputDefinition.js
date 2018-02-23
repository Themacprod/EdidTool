/* global module:true */

"use strict";

var React = require("react"),
    Func = require("../edidcontent-func"),
    Title = require("./edidContentTitle");

module.exports = React.createClass({
    render: function() {
        return React.DOM.div({
                className: "edid-content-group"
            },
            React.createElement(Title, {
                title: "Video Input Definition"
            }),
            React.DOM.div({
                    className: "edid-content-column width-50"
                },
                Func.contentSubGroupRadio(" Analog", this.props.dbp.digitalInput === false),
                React.DOM.div({
                        className: (this.props.dbp.digitalInput === false) ? "collapse show" : "collapse",
                        id: "collapseExample"
                    },
                    Func.contentSubGroupCheckbox(" Blank Setup Expected", (this.props.dbp.digitalInput === false) ? (this.props.dbp.whiteSyncLevels === true) : false),
                    Func.contentSubGroupCheckbox(" Separate Sync", (this.props.dbp.digitalInput === false) ? (this.props.dbp.separateSyncSupported === true) : false),
                    Func.contentSubGroupCheckbox(" Composite Sync", (this.props.dbp.digitalInput === false) ? (this.props.dbp.compositeSyncSupported === true) : false),
                    Func.contentSubGroupCheckbox(" Sync On Green", (this.props.dbp.digitalInput === false) ? (this.props.dbp.synOnGreen === true) : false),
                    Func.contentSubGroupCheckbox(" Serration", (this.props.dbp.digitalInput === false) ? (this.props.dbp.vsyncSerrated === true) : false)
                )
            ),
            React.DOM.div({
                    className: "edid-content-column width-50"
                },
                Func.contentSubGroupRadio(" Digital", this.props.dbp.digitalInput)
            )
        );
    }
});
