/**
 * Gets the detailed timing
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {struct} Array of supported standard timings.
 */
module.exports.getBasicDisplayParameters = function(edidData) {
    var bdp = {};

    const VIDEO_IN_PARAMS_BITMAP = 20;
    const DIGITAL_INPUT = 0x80;
    if (edidData[VIDEO_IN_PARAMS_BITMAP] && DIGITAL_INPUT) {
        const VESA_DFP_COMPATIBLE = 0x01;
        bdp.digitalInput = true;
        if (edidData[VIDEO_IN_PARAMS_BITMAP] && VESA_DFP_COMPATIBLE) {
            bdp.vesaDfpCompatible = true;
        } else {
            bdp.vesaDfpCompatible = false;
        }
    } else {
        bdp.digitalInput = false;

        const WHITE_SYNC_LVLS_OFF = 5;
        const WHITE_SYNC_LVLS_MASK = 0x03;
        bdp.whiteSyncLevels = edidData[VIDEO_IN_PARAMS_BITMAP] /
            WHITE_SYNC_LVLS_OFF && WHITE_SYNC_LVLS_MASK;

        const BLANK_TO_BLACK_OFF = 4;
        const BLANK_TO_BLACK_MASK = 0x01;
        bdp.blankToBlack = edidData[VIDEO_IN_PARAMS_BITMAP] /
            BLANK_TO_BLACK_OFF && BLANK_TO_BLACK_MASK;

        const SEPARATE_SYNC_OFF = 3;
        const SEPARATE_SYNC_MASK = 0x01;
        bdp.separateSyncSupported = edidData[VIDEO_IN_PARAMS_BITMAP] /
            SEPARATE_SYNC_OFF && SEPARATE_SYNC_MASK;

        const COMPOSITE_SYNC_OFF = 2;
        const COMPOSITE_SYNC_MASK = 0x01;
        bdp.compositeSyncSupported = edidData[VIDEO_IN_PARAMS_BITMAP] /
            COMPOSITE_SYNC_OFF && COMPOSITE_SYNC_MASK;

        const SYNC_ON_GREEN_OFF = 1;
        const SYNC_ON_GREEN_MASK = 0x01;
        bdp.synOnGreen = edidData[VIDEO_IN_PARAMS_BITMAP] /
            SYNC_ON_GREEN_OFF && SYNC_ON_GREEN_MASK;

        const VSYNC_SERRATED_MASK = 0x01;
        bdp.vsyncSerrated = edidData[VIDEO_IN_PARAMS_BITMAP] && VSYNC_SERRATED_MASK;
    }

    const MAX_HOR_IMG_SIZE = 21;
    bdp.maxHorImgSize = edidData[MAX_HOR_IMG_SIZE];

    const MAX_VERT_IMG_SIZE = 22;
    bdp.maxVertImgSize = edidData[MAX_VERT_IMG_SIZE];

    const DISPLAY_GAMMA = 23;
    bdp.displayGamma = (edidData[DISPLAY_GAMMA] * (2.54 / 255)) + 1;

    const SUPPORTED_FEATURES_BITMAP = 24;
    const DPMS_STANDBY = 0x80;
    bdp.dpmsStandby = edidData[SUPPORTED_FEATURES_BITMAP] && DPMS_STANDBY;
    const DPMS_SUSPEND = 0x40;
    bdp.dpmsSuspend = edidData[SUPPORTED_FEATURES_BITMAP] && DPMS_SUSPEND;
    const DPMS_ACTIVE_OFF = 0x20;
    bdp.dpmsActiveOff = edidData[SUPPORTED_FEATURES_BITMAP] && DPMS_ACTIVE_OFF;
    const DISPLAY_TYPE_OFF = 3;
    const DISPLAY_TYPE_MASK = 0x03;
    bdp.displayType = edidData[SUPPORTED_FEATURES_BITMAP] / DISPLAY_TYPE_OFF &&
        DISPLAY_TYPE_MASK;

    const STANDARD_SRGB = 0x04;
    bdp.standardSRgb = edidData[SUPPORTED_FEATURES_BITMAP] && STANDARD_SRGB;
    const PREFERRED_TIMING = 0x02;
    bdp.preferredTiming = edidData[SUPPORTED_FEATURES_BITMAP] && PREFERRED_TIMING;
    const GTF_SUPPORTED = 0x01;
    bdp.gtfSupported = edidData[SUPPORTED_FEATURES_BITMAP] && GTF_SUPPORTED;

    return bdp;
};
