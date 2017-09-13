/* global module:true */

"use strict";

var React = require("react"),
  EdidParser = require("./edidparser");

var contentSubGroup = function(detail, data) {
  return React.DOM.div({
      className: "edid-content-subgroup"
    }, React.DOM.div({
      className: "subgroup-detail"
    }, detail),
    React.DOM.div({
      className: "subgroup-data"
    }, data)
  );
};

var contentSubGroupRadio = function(detail, checked) {
  return React.DOM.div({
      className: "edid-content-subgroup"
    }, React.DOM.div({
      className: "subgroup-radio"
    }, React.DOM.input({
      type: "radio",
      readOnly: "readOnly",
      checked: checked
    })),
    React.DOM.div({
      className: "subgroup-data"
    }, detail));
};

var contentSubGroupCheckbox = function(detail, checked) {
  return React.DOM.div({
      className: "edid-content-subgroup"
    }, React.DOM.div({
      className: "subgroup-checkbox"
    }, React.DOM.input({
      type: "checkbox",
      readOnly: "readOnly",
      checked: checked
    })),
    React.DOM.div({
      className: "subgroup-data"
    }, detail));
};

module.exports = {
  contentSubGroup: contentSubGroup,
  contentSubGroupRadio: contentSubGroupRadio,
  contentSubGroupCheckbox: contentSubGroupCheckbox
};