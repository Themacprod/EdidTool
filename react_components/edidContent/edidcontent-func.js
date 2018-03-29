var React = require('react');

var contentSubGroup = function(detail, data) {
    return React.DOM.div(
        {
            className: 'edid-content-subgroup'
        }, React.DOM.div({
            className: 'subgroup-detail'
        }, detail),
        React.DOM.div({
            className: 'subgroup-data'
        }, data)
    );
};

var contentSubGroupRadio = function(detail, checked) {
    return React.DOM.div(
        {
            className: 'edid-content-subgroup'
        }, React.DOM.div({
            className: 'subgroup-radio'
        }, React.DOM.input({
            type: 'radio',
            readOnly: 'readOnly',
            checked: checked
        })),
        React.DOM.div({
            className: 'subgroup-data'
        }, detail)
    );
};

var contentSubGroupCheckbox = function(detail, checked) {
    return React.DOM.div(
        {
            className: 'edid-content-subgroup'
        }, React.DOM.div({
            className: 'subgroup-checkbox'
        }, React.DOM.input({
            type: 'checkbox',
            readOnly: 'readOnly',
            checked: checked
        })),
        React.DOM.div({
            className: 'subgroup-detail-radio'
        }, detail)
    );
};

var contentSubGroupCheckboxKey = function(detail, checked, key) {
    return React.DOM.div(
        {
            className: 'edid-content-subgroup',
            key: key
        }, React.DOM.div({
            className: 'subgroup-checkbox'
        }, React.DOM.input({
            type: 'checkbox',
            readOnly: 'readOnly',
            checked: checked
        })),
        React.DOM.div({
            className: 'subgroup-detail-radio'
        }, detail)
    );
};

module.exports = {
    contentSubGroup: contentSubGroup,
    contentSubGroupRadio: contentSubGroupRadio,
    contentSubGroupCheckbox: contentSubGroupCheckbox,
    contentSubGroupCheckboxKey: contentSubGroupCheckboxKey
};
