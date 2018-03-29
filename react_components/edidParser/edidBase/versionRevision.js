/**
 * Gets the EDID version
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {int} EDID version.
 */
module.exports.getVersion = function(edidData) {
	const EDID_VERSION = 0x12;
    return edidData[EDID_VERSION];
};

/**
 * Gets the EDID revision
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {int} EDID revision.
 */
module.exports.getRevision = function(edidData) {
	const EDID_REVISION = 0x13;
    return edidData[EDID_REVISION];
};
