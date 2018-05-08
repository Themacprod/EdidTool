var React = require('react');

module.exports = React.createClass({
    generateTiming: function (detail, data) {
        return React.DOM.div(
            {
                className: 'timing'
            },
            React.DOM.div({
                className: 'detail width-70 inline-block'
            }, detail),
            React.DOM.div({
                className: 'data width-30 inline-block'
            }, data)
        );
    },
    render: function () {
        const hParams = this.props.data.HorizontalParams;
        const vParams = this.props.data.VerticalParams;

        return React.DOM.div(
            {
                key: this.props.key
            },
            this.generateTiming('Pix clock:', this.props.data.pixelClock),
            React.DOM.div(
                {
                    className: 'width-50 inline-block border'
                },
                React.DOM.div(
                    {
                        className: 'text-center border'
                    },
                    'Horizontal'
                ),
                this.generateTiming('Active Pixels:', hParams.ActivePixels),
                this.generateTiming('Blank:', hParams.BlankPixels),
                this.generateTiming('Front Porch:', hParams.SyncOff),
                this.generateTiming('Sync Width:', hParams.SyncPulse),
                this.generateTiming('Image Size:', hParams.DisplaySize),
                this.generateTiming('Border:', hParams.BorderPixels)
            ),
            React.DOM.div(
                {
                    className: 'width-50 inline-block border'
                },
                React.DOM.div(
                    {
                        className: 'text-center border'
                    },
                    'Vertical'
                ),
                this.generateTiming('Active Lines:', vParams.ActiveLines),
                this.generateTiming('Blank:', vParams.BlankLines),
                this.generateTiming('Front Porch:', vParams.SyncOff),
                this.generateTiming('Sync Width:', vParams.SyncPulse),
                this.generateTiming('Image Size:', vParams.DisplaySize),
                this.generateTiming('Border:', vParams.BorderLines)
            )
        );
    }
});
