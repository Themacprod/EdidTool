/**
 * Checks if the passed in header is valid.
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {bool} true if the passed in header is valid.
 */
module.exports.isValidHeader = function(edidData) {
	return (edidData[0x00] === 0x00 &&
		edidData[0x01] === 0xFF &&
		edidData[0x02] === 0xFF &&
		edidData[0x03] === 0xFF &&
		edidData[0x04] === 0xFF &&
		edidData[0x05] === 0xFF &&
		edidData[0x06] === 0xFF &&
		edidData[0x07] === 0x00);
};

/**
 * Gets header data.
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {array} true if the passed in header is valid.
 */
module.exports.getHeader = function(edidData) {
    const HEADER_SIZE = 8;
    var header = [];

    for (var i = 0; i < HEADER_SIZE; i += 1) {
        header[i] = edidData[i];
    }

	return header;
};
