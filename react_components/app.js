var React = require('react'),
    fileSelector = require('./fileselector');

module.exports = React.createClass({
    componentDidMount: function() {
        global.jQuery = require('jquery');
        require('../node_modules/react-bootstrap/lib');
    },
    render: function() {
        return React.DOM.div(
            {
                className: 'app',
                id: 'draggable',
                draggable: 'true'
            },
            React.createElement(fileSelector)
        );
    }
});
