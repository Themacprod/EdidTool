var React = require('react'),
    _ = require('lodash');

module.exports = React.createClass({
    handleItemClick: function (index, value) {
        this.setState({
            selectedIdx: index
        });

        if (this.props.callback) {
            this.props.callback(value);
        }
    },
    getInitialState: function () {
        return {
            selectedIdx: 0
        };
    },
    render: function () {
        return React.DOM.div(
            {
                className: 'dropdown'
            },
            React.DOM.button(
                {
                    className: 'btn btn-secondary dropdown-toggle',
                    type: 'button',
                    id: this.props.id,
                    'data-toggle': 'dropdown',
                    'aria-haspopup': 'true',
                    onClick: this.handleButtonClick
                },
                this.props.values[this.state.selectedIdx]
            ),
            React.DOM.div(
                {
                    className: 'dropdown-menu',
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
