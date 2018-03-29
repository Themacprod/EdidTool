/**
 * Gets the standard timing
 * @param {array} edidData Byte array filled with EDID content.
 * @param {int} stdIndex Standard timing index.
 * @returns {struct} Structure filled with standard timing data.
 */
var getStandardTiming = function(edidData, stdIndex) {
    const STD_DISPLAY_MODES_START = 38;
    const dataIndex = STD_DISPLAY_MODES_START + (stdIndex * 2);
    const stdHorizontalActive = edidData[dataIndex];

    // Is invalid standard mode.
    if ((stdHorizontalActive === 0) || (stdHorizontalActive === 1)) {
        return {
            valid: false,
            HActive: 0,
            RefreshRate: 0,
            AspectRatio: '0'
        };
    }

    const VERTICAL_FREQUENCY_MASK = 0x3F;
    const stdRefresh = edidData[dataIndex + 1] & VERTICAL_FREQUENCY_MASK;

    const RATIO_MASK = 0x03;
    const stdRatio = (edidData[dataIndex + 1] >> 6) & RATIO_MASK;

    const AspectRatioEnum = [
        {
            string: '16:10'
        },
        {
            string: '4:3'
        },
        {
            string: '5:4'
        },
        {
            string: '16:9'
        },
    ];

    return {
        valid: true,
        HActive: (stdHorizontalActive + 31) * 8,
        RefreshRate: stdRefresh + 60,
        AspectRatio: AspectRatioEnum[stdRatio].string
    };
};

/**
 * Gets the standard timings
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {array} Array of supported standard timings.
 */
module.exports.getStandardTimings = function(edidData) {
    var stdDispModesArray = [];

    for (var i = 0; i < 8; i += 1) {
        stdDispModesArray.push(getStandardTiming(edidData, i));
    }

    return stdDispModesArray;
};
