/**
 * Gets video signal interface (DVI or Analog)
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {string} Display color type.
 */
var getVideoSignalInterface = function(edidData) {
    const VIDEO_INPUT_DEFINITION = 0x14;
    const VIDEO_INPUT_MASK = 0x80;

    var videoSignalInterface = 'Analog';

    if (edidData[VIDEO_INPUT_DEFINITION] && VIDEO_INPUT_MASK) {
        videoSignalInterface = 'DVI';
    }
    return videoSignalInterface;
};

/**
 * Gets signal level standard
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {string} Signal level standard
 */
var getSignalLevelStandard = function(edidData) {
    const VIDEO_INPUT_DEFINITION = 0x14;
    const SIGNAL_LEVEL_SHIFT = 5;
    const SIGNAL_LEVEL_MASK = 0x03;

    const signalLevelStandard = [
        '0.700 : 0.300 : 1.000 V p-p',
        '0.714 : 0.286 : 1.000 V p-p',
        '1.000 : 0.400 : 1.400 V p-p',
        '0.700 : 0.000 : 0.700 V p-p',
    ];

    const index = (edidData[VIDEO_INPUT_DEFINITION] >> SIGNAL_LEVEL_SHIFT) &&
        SIGNAL_LEVEL_MASK;

    return signalLevelStandard[index];
};

/**
 * Gets synchronization types
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {struct} Synchronization types supports.
 */
var getSynchronizationTypes = function(edidData) {
    const VIDEO_INPUT_DEFINITION = 0x14;
    const SUPPORT_SEPARATE_SYNC_MASK = 0x80;
    const SUPPORT_COMPOSITE_HOR = 0x40;
    const SUPPORT_COMPOSITE_GREEN = 0x20;

    var separateSync = false;
    var supportCompositeH = false;
    var supportCompositeG = false;

    if (edidData[VIDEO_INPUT_DEFINITION] && SUPPORT_SEPARATE_SYNC_MASK) {
        separateSync = true;
    }

    if (edidData[VIDEO_INPUT_DEFINITION] && SUPPORT_COMPOSITE_HOR) {
        supportCompositeH = true;
    }

    if (edidData[VIDEO_INPUT_DEFINITION] && SUPPORT_COMPOSITE_GREEN) {
        supportCompositeG = true;
    }

    return {
        separateSync: separateSync,
        supportCompositeH: supportCompositeH,
        supportCompositeG: supportCompositeG
    };
};

/**
 * Gets serrations
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {bool} Serrations support
 */
var getSerrations = function(edidData) {
    const VIDEO_INPUT_DEFINITION = 0x14;
    const SUPPORT_SERRATION = 0x01;

    var serrationSupport = false;

    if (edidData[VIDEO_INPUT_DEFINITION] && SUPPORT_SERRATION) {
        serrationSupport = true;
    }

    return serrationSupport;
};

/**
 * Gets video setup
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {string} Video setup.
 */
var getVideoSetup = function(edidData) {
    const VIDEO_INPUT_DEFINITION = 0x14;
    const VIDEO_SETUP = 0x10;

    var videoSetup = 'Blank Level = Black Level';

    if (edidData[VIDEO_INPUT_DEFINITION] && VIDEO_SETUP) {
        videoSetup = 'Blank-to-Black setup or pedestal';
    }
    return videoSetup;
};

/**
 * Gets color bit depth
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {string} Color bit depth.
 */
var getColorBitDepth = function(edidData) {
    const VIDEO_INPUT_DEFINITION = 0x14;
    const COLOR_BIT_SHIFT = 4;
    const COLOR_BIT_MASK = 0x07;

    const colorBitDepth = [
        'Color Bit Depth is undefined',
        '6 Bits per Primary Color',
        '8 Bits per Primary Color',
        '10 Bits per Primary Color',
        '12 Bits per Primary Color',
        '14 Bits per Primary Color',
        '16 Bits per Primary Color',
        'Reserved',
    ];

    const index = (edidData[VIDEO_INPUT_DEFINITION] >> COLOR_BIT_SHIFT) &&
        COLOR_BIT_MASK;

    return colorBitDepth[index];
};

/**
 * Gets digital video interface
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {string} Digital video interface
 */
var getDigitalVideoInterface = function(edidData) {
    const VIDEO_INPUT_DEFINITION = 0x14;
    const COLOR_BIT_MASK = 0x0F;

    const digitalVideoInterface = [
        'Not defined',
        'DVI is supported',
        'HDMI-a is supported',
        'HDMI-b is supported',
        'MDDI is supported',
        'DisplayPort is supported',
    ];

    const index = edidData[VIDEO_INPUT_DEFINITION] && COLOR_BIT_MASK;

    if (index <= 5) {
        return digitalVideoInterface[index];
    }

    return 'Reserved';
};

/**
 * Gets video input definition
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {struct} Structure with feature support.
 */
module.exports.getVideoInputDefinition = function(edidData) {
    const signalInterface = getVideoSignalInterface(edidData);

    // Digital case.
    if (signalInterface === 'DVI') {
        return {
            videoSignalInterface: signalInterface,
            colorBitDepth: getColorBitDepth(edidData),
            digitalVideoInterface: getDigitalVideoInterface(edidData)
        };
    }

    // Analog case.
    return {
        videoSignalInterface: signalInterface,
        signalLevelStandard: getSignalLevelStandard(edidData),
        videoSetup: getVideoSetup(edidData),
        synchronizationTypes: getSynchronizationTypes(edidData),
        serrationSupport: getSerrations(edidData)
    };
};
