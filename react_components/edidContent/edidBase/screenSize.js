var React = require('react'),
    Func = require('../edidcontent-func'),
    Title = require('../edidContentTitle');

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            {
                className: 'edid-content-group screen-size'
            },
            React.createElement(Title, {
                title: 'Screen size'
            }),
            React.DOM.div(
                {
                    className: 'edid-content-column width-50'
                },
                Func.contentSubGroupRadio(' Dimensions', this.props.screenSize.type === 'ScreenSize'),
                Func.contentSubGroup('Horizontal size (cm):', this.props.screenSize.screenSize.horizontalSize),
                Func.contentSubGroup('Vertical size (cm):', this.props.screenSize.screenSize.verticalSize)
            ),
            React.DOM.div(
                {
                    className: 'edid-content-column width-50'
                },
                Func.contentSubGroupRadio(' Aspect Ratio (1.4)', this.props.screenSize.type === 'AspectRatio'),
                Func.contentSubGroupRadio(' Portrait', this.props.screenSize.aspectRatio.portrait === true),
                Func.contentSubGroupRadio(' Landscape', this.props.screenSize.aspectRatio.portrait === false)
            )
        );
    }
});
