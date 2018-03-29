/**
 * Gets color chromaticity for specific color
 * @param {array} edidData Byte array filled with EDID content.
 * @param {struct} color bit shift data.
 * @returns {struct} struct filled with color characteristics.
 */
var getChromaticity = function(edidData, color) {
    const TWO_BIT_OFF = 2;
    const TWO_BIT_MASK = 0x03;

    const xData = (edidData[color.xMsb] << TWO_BIT_OFF) +
        ((edidData[color.lsb] / color.xBitShift) && TWO_BIT_MASK);

    const yData = (edidData[color.yMsb] << TWO_BIT_OFF) +
        ((edidData[color.lsb] / color.yBitShift) && TWO_BIT_MASK);
    return {
        x: xData / 1024,
        y: yData / 1024
    };
};

/**
 * Gets color characteristics.
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {struct} struct filled with color characteristics.
 */
module.exports.getColorCharacteristics = function(edidData) {
    const oRedColor = {
        xMsb: 27,
        yMsb: 28,
        lsb: 25,
        xBitShift: 6,
        ybitShift: 4
    };

    const oGreenColor = {
        xMsb: 29,
        yMsb: 30,
        lsb: 25,
        xBitShift: 2,
        ybitShift: 1
    };

    const oBlueColor = {
        xMsb: 31,
        yMsb: 32,
        lsb: 26,
        xBitShift: 6,
        ybitShift: 4
    };

    const oWhiteColor = {
        xMsb: 33,
        yMsb: 34,
        lsb: 26,
        xBitShift: 2,
        ybitShift: 1
    };

    return {
        red: getChromaticity(edidData, oRedColor),
        green: getChromaticity(edidData, oGreenColor),
        blue: getChromaticity(edidData, oBlueColor),
        white: getChromaticity(edidData, oWhiteColor)
    };
};
