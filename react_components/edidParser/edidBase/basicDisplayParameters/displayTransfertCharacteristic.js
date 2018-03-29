/**
 * Gets gamma
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {int} Gamma value.
 */
module.exports.getGamma = function(edidData) {
    const DISPLAY_GAMMA = 0x17;
    return ((edidData[DISPLAY_GAMMA] * (2.54 / 255)) + 1);
};
