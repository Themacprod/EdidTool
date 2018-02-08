/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash");

module.exports = React.createClass({
    getInitialState: function() {
        return {
            selected: 0
        };
    },
    handleClick: function(key) {
        this.setState({
            selected: key
        });
    },
    render: function() {
        return React.DOM.ul({
                className: "nav nav-tabs"
            },
            _.map(this.props.tabs, _.bind(function(data, key) {

                var baseState = (this.state.selected === key) ? " active" : " disabled"

                return React.DOM.li({
                        key: key,
                        className: "nav-item",
                        onClick: this.handleClick.bind(this, key)
                    },
                    React.DOM.a({
                        className: "nav-link" + baseState,
                        href: data.href
                    }, data.name));
            }, this))
        );
    }
});
