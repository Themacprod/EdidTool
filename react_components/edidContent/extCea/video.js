const React = require('react');
const _ = require('lodash');
const title = require('../edidContentTitle');
const ceaTimings = require('./ceatimings');

module.exports = React.createClass({
    genVicTiming: function (data, key) {
        const ceaTimingFound = _.find(ceaTimings, ceaTiming => (ceaTiming.vic === data.vic));

        if (ceaTimingFound) {
            const index = `${parseInt(key, 10) + 1}. `;
            let desc = `${ceaTimingFound.format} `;
            desc += `${ceaTimingFound.fieldRate} `;
            desc += `${ceaTimingFound.pictureAspectRatio} `;

            return React.DOM.div(
                {
                    key: key
                },
                React.DOM.div(
                    {
                        className: 'inline-block'
                    },
                    index
                ),
                React.DOM.div(
                    {
                        className: 'inline-block'
                    },
                    desc
                )
            );
        }

        console.error(`No CEA timing found for VIC ${data.vic}`);
        return null;
    },
    render: function () {
        const videoBlock = this.props.edidParsed.getExtVideoBlock(this.props.extIndex);

        return React.DOM.div(
            {
                className: 'edid-content-group cea-detailed-timing'
            },
            React.createElement(title, {
                title: 'Video'
            }),
            _.map(videoBlock[0].shortVideoDescriptors, (vic, key) => this.genVicTiming(vic, key))
        );
    }
});
