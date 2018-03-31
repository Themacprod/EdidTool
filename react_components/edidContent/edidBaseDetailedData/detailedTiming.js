var React = require('react');

module.exports = React.createClass({
    generateTiming: function(detail, data) {
        return React.DOM.div(
            {
                className: 'timing'
            },
            React.DOM.div({
                className: 'detail width-80 inline-block'
            }, detail),
            React.DOM.div({
                className: 'data width-20 inline-block'
            }, data)
        );
    },
    render: function() {
        const horizontalParams = this.props.data.HorizontalParams;

        return React.DOM.div(
            null,
            this.generateTiming('Pix clock:', this.props.data.pixelClock),
            React.DOM.div(
                {
                    className: 'width-50 inline-block'
                },
                    React.DOM.div(
                        {
                            className: 'text-center'
                        },
                    'Horizontal'
                ),
                this.generateTiming('Active Pixels:', horizontalParams.ActivePixels),
                this.generateTiming('Blank:', horizontalParams.BlankPixels),
                this.generateTiming('Front Porch:', horizontalParams.SyncOff),
                this.generateTiming('Sync Width:', horizontalParams.SyncPulse),
                this.generateTiming('Image Size:', horizontalParams.DisplaySize),
                this.generateTiming('Border:', horizontalParams.BorderPixels)
            )
        );
    }
});
