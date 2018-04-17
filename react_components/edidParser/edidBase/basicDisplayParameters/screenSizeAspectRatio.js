/**
 * Gets horizontal and vertical screen size or aspect ratio
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {int} Gamma value.
 */
module.exports.getScreenSizeAspectRatio = function (edidData) {
    const OFFSET_DATA_1 = 0x15;
    const OFFSET_DATA_2 = 0x16;
    var type = '';
    var screenSize = {};
    var aspectRatio = {};

    if ((edidData[OFFSET_DATA_1] !== 0) && (edidData[OFFSET_DATA_2] !== 0)) {
        type = 'ScreenSize';
        screenSize.horizontalSize = edidData[OFFSET_DATA_1];
        screenSize.verticalSize = edidData[OFFSET_DATA_2];
    } else {
        type = 'AspectRatio';

        if ((edidData[OFFSET_DATA_1] === 0) && (edidData[OFFSET_DATA_2] === 0)) {
            console.log('Invalid screen orientation');
        }

        if (edidData[OFFSET_DATA_1] !== 0) {
            aspectRatio.portrait = false;
        }

        if (edidData[OFFSET_DATA_2] !== 0) {
            aspectRatio.portrait = true;
        }
    }

    return {
        type: type,
        screenSize: screenSize,
        aspectRatio: aspectRatio
    };
};
