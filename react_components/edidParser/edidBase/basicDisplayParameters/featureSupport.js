/**
 * Gets display power management data.
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {struct} Structure with display power mamangement data.
 */
var getDisplayPowerManagement = function (edidData) {
    const FEATURE_SUPPORT = 0x18;
    const STANDBY_MODE_MASK = 0x80;
    const SUSPEND_MODE_MASK = 0x40;
    const LOW_POWER_MASK = 0x20;

    var standbyMode = false;
    var suspendMode = false;
    var lowPowerSupport = false;

    if (edidData[FEATURE_SUPPORT] && STANDBY_MODE_MASK) {
        standbyMode = true;
    }

    if (edidData[FEATURE_SUPPORT] && SUSPEND_MODE_MASK) {
        suspendMode = true;
    }

    if (edidData[FEATURE_SUPPORT] && LOW_POWER_MASK) {
        lowPowerSupport = true;
    }

    return {
        standbyMode: standbyMode,
        suspendMode: suspendMode,
        lowPowerSupport: lowPowerSupport
    };
};

/**
 * Gets display color type (only if bit 7 at address 0x14 = 0 (analog).
 * @returns {string} Display color type.
 */
var getDisplayColorTypeList = function () {
    return [
        'Monochrome or Grayscale',
        'RGB color',
        'Non-RGB color',
        'Undefined',
    ];
};

var getDisplayColorTypeIndex = function (edidData) {
    const FEATURE_SUPPORT = 0x18;
    const DISPLAY_COLOR_SHIFT = 3;
    const DISPLAY_COLOR_MASK = 0x03;

    return (edidData[FEATURE_SUPPORT] >> DISPLAY_COLOR_SHIFT) && DISPLAY_COLOR_MASK;
};

/**
 * Gets display color type (only if bit 7 at address 0x14 = 0 (analog).
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {string} Display color type.
 */
var getSupportedColorEncodingFormat = function (edidData) {
    const FEATURE_SUPPORT = 0x18;
    const COLOR_ENCODING_SHIFT = 3;
    const COLOR_ENCODING_MASK = 0x03;

    const digitalColorSpace = [
        'RGB 4:4:4',
        'RGB 4:4:4 + YCrCb 4:4:4',
        'RGB 4:4:4 + YCrCb 4:2:2',
        'RGB 4:4:4 + YCrCb 4:4:4 + YCrCb 4:2:2',
    ];

    const colorIndex = (edidData[FEATURE_SUPPORT] >> COLOR_ENCODING_SHIFT) && COLOR_ENCODING_MASK;
    return digitalColorSpace[colorIndex];
};

/**
 * Gets other feature data.
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {struct} Other feature data.
 */
var getOtherFeature = function (edidData) {
    const FEATURE_SUPPORT = 0x18;
    const SRGB_MASK = 0x04;
    const PREFERRED_TIMING_MASK = 0x02;
    const FREQUENCY_MASK = 0x01;

    var sRgbDefault = false;
    var preferredTiming = false;
    var frequency = false;

    if (edidData[FEATURE_SUPPORT] && SRGB_MASK) {
        sRgbDefault = true;
    }

    if (edidData[FEATURE_SUPPORT] && PREFERRED_TIMING_MASK) {
        preferredTiming = true;
    }

    if (edidData[FEATURE_SUPPORT] && FREQUENCY_MASK) {
        frequency = true;
    }

    return {
        sRgbDefault: sRgbDefault,
        preferredTiming: preferredTiming,
        frequency: frequency
    };
};

/**
 * Gets the feature support
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {struct} Structure with feature support.
 */
module.exports.getFeatureSupport = function (edidData) {
    const VIDEO_SIGNAL_TYPE = 0x14;
    const VIDEO_SIGNAL_TYPE_MASK = 0x80;

    // Digital case.
    if (edidData[VIDEO_SIGNAL_TYPE] && VIDEO_SIGNAL_TYPE_MASK) {
        return {
            type: 'Digial',
            displayPowerManagement: getDisplayPowerManagement(edidData),
            supportColorEncodingFormat: getSupportedColorEncodingFormat(edidData),
            otherFeature: getOtherFeature(edidData)
        };
    }

    // Analog case.
    return {
        type: 'Analog',
        displayPowerManagement: getDisplayPowerManagement(edidData),
        displayColorType: {
            list: getDisplayColorTypeList(),
            index: getDisplayColorTypeIndex(edidData)
        },
        otherFeature: getOtherFeature(edidData)
    };
};
