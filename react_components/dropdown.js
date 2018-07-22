var React = require('react'),
    _ = require('lodash');

module.exports = React.createClass({
    handleButtonClick: function () {
        this.setState({
            showDropdown: !this.state.showDropdown
        });
    },
    handleItemClick: function (index) {
        this.setState({
            showDropdown: false,
            selectedIdx: index
        });
    },
    getInitialState: function () {
        return {
            showDropdown: false,
            selectedIdx: 0
        };
    },
    render: function () {
        var showDropdown = this.state.showDropdown ? ' show' : '';

        return React.DOM.div(
            {
                className: `dropdown ${showDropdown}`
            },
            React.DOM.button(
                {
                    className: 'btn btn-secondary dropdown-toggle',
                    type: 'button',
                    id: this.props.id,
                    'data-toggle': 'dropdown',
                    'aria-haspopup': 'true',
                    'aria-expanded': this.state.showDropdown,
                    onClick: this.handleButtonClick
                },
                this.props.values[this.state.selectedIdx]
            ),
            React.DOM.div(
                {
                    className: `dropdown-menu ${showDropdown}`,
                    'aria-labelledby': this.props.id
                },
                _.map(this.props.values, _.bind(function (value, index) {
                    return React.DOM.a(
                        {
                            className: 'dropdown-item',
                            key: index,
                            onClick: this.handleItemClick.bind(this, index, value)
                        },
                        value
                    );
                }, this))
            )
        );
    }
});
