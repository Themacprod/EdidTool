/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash"),
    edidExtractor = require("./edidextractor"),
    edidDisplay = require("./edidraw"),
    edidContent = require("./edidcontent");

// https://www.html5rocks.com/en/tutorials/file/dndfiles/

module.exports = React.createClass({
    getInitialState: function() {
        return {
            edidcontent: _.fill(Array(128), 0)
        };
    },
    getFileExtension: function(filename) {
        return (/[.]/.exec(filename)) ? (/[^.]+$/).exec(filename) : undefined;
    },
    handleChange: function() {
        console.log("Extension = " + this.getFileExtension(document.getElementById("files").value));
        this.extractEdid(document.getElementById("files").files[0]);
    },
    extractEdid: function(file) {
        var reader = new FileReader();

        reader.onloadend = function(evt) {
            // If we use onloadend, we need to check the readyState.
            if (evt.target.readyState === 2) {
                this.setState({
                    edidcontent: edidExtractor.extractEdid(evt.target.result)
                });
            }
        }.bind(this);

        reader.readAsText(file);
    },
    render: function() {
        return React.DOM.div(null,
            React.DOM.input({
                type: "file",
                accept: ".dat",
                id: "files",
                name: "file",
                onChange: this.handleChange
            }), React.DOM.div({
                    className: "edid-container"
                }, React.createElement(edidDisplay, {
                    edid: this.state.edidcontent
                }),
                React.createElement(edidContent, {
                    edid: this.state.edidcontent
                }))
        );
    }
});
