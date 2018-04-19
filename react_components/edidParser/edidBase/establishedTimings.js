var _ = require('lodash'),
    establisheds = require('./establishedTimingsData');

var genEstablishedMode = function (edidData, data) {
    var establishedModes = [];

    _.forEach(data.timings, (establishedtiming) => {
        var checked = false;
        if (edidData[data.offset] & (1 << establishedtiming.bit)) {
            checked = true;
        }

        establishedModes.push({
            timing: establishedtiming,
            checked: checked
        });
    });

    establishedModes.description = data.description;

    return establishedModes;
};

/**
 * Gets the established timings
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {array} Array of supported established timings.
 */
module.exports.getEstablishedModes = edidData => _.map(establisheds, data => genEstablishedMode(edidData, data));
