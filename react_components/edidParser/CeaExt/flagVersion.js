/**
 * Gets the flag and version of the CEA block.
 * @param {array} extData Byte array filled with the extension content.
 * @returns {struct} Structure with flag and version of the CEA block.
 */
module.exports.getVersion = function (extData) {
    const CEA_FLAG = 0x00;
    const CEA_VERSION = 0x01;
    const CEA_DATA_SIZE = 0x02;

    return {
        flag: extData[CEA_FLAG],
        version: extData[CEA_VERSION],
        dataSize: extData[CEA_DATA_SIZE]
    };
};
