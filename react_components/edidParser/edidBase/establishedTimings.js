var _ = require('lodash'),
    establishedTimingsData = require('./establishedTimingsData');

/**
 * Gets the established timings
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {array} Array of supported established timings.
 */
module.exports.getEstablishedModes = function(edidData) {
    return _.map(establishedTimingsData, function(establishedtimingsdata) {
        var establishedModes = [];

        _.forEach(establishedtimingsdata.timings, function(establishedtiming) {
            var checked = false;
            if (edidData[establishedtimingsdata.offset] & (1 << establishedtiming.bit)) {
                checked = true;
            }

            establishedModes.push({
                timing: establishedtiming,
                checked: checked
            });
        });

        establishedModes.description = establishedtimingsdata.description;

        return establishedModes;
    });
};
