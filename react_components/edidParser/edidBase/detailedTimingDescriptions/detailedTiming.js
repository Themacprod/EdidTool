var getPixelClockInMHz = function (edidData, dtdIndex) {
    return ((edidData[dtdIndex + 1] << 8) + edidData[dtdIndex]) / 100;
};

var getHorizontalParams = function (edidData, dtdIndex) {
    const HOR_ACTIVE_OFF = 4;
    const HOR_ACTIVE_PIX_MASK = 0x0F;
    const HOR_BLANK_MASK = 0x0F;
    const HOR_SYNC_OFF_OFF = 6;
    const HOR_SYNC_OFF_MASK = 0x03;
    const HOR_SYNC_PULSE_OFF = 4;
    const HOR_SYNC_PULSE_MASK = 0x03;
    const HOR_DISPLAY_TOP_OFF = 4;
    const HOR_DISPLAY_TOP_MASK = 0x0F;

    return {
        ActivePixels: (((edidData[dtdIndex + 4] / HOR_ACTIVE_OFF) & HOR_ACTIVE_PIX_MASK) << 8) +
            edidData[dtdIndex + 2],
        BlankPixels: (((edidData[dtdIndex + 4]) & HOR_BLANK_MASK) << 8) +
            edidData[dtdIndex + 3],
        SyncOff: (((edidData[dtdIndex + 11] / HOR_SYNC_OFF_OFF) &&
            HOR_SYNC_OFF_MASK) << 8) + edidData[dtdIndex + 8],
        SyncPulse: (((edidData[dtdIndex + 11] / HOR_SYNC_PULSE_OFF) &&
            HOR_SYNC_PULSE_MASK) << 8) + edidData[dtdIndex + 9],
        DisplaySize: (((edidData[dtdIndex + 14] / HOR_DISPLAY_TOP_OFF) &&
            HOR_DISPLAY_TOP_MASK) << 8) + edidData[dtdIndex + 12],
        BorderPixels: edidData[dtdIndex + 15]
    };
};

var getVerticalParams = function (edidData, dtdIndex) {
    const VERT_ACTIVE_OFF = 4;
    const VERT_ACTIVE_MASK = 0x0F;
    const VERT_BLANK_MASK = 0x0F;
    const VERT_SYNC_OFF_TOP_OFF = 2;
    const VERT_SYNC_OFF_TOP_MASK = 0x03;
    const VERT_SYNC_OFF_BOT_OFF = 4;
    const VERT_SYNC_OFF_BOT_MASK = 0x0F;
    const VERT_SYNC_PULSE_TOP_MASK = 0x03;
    const VERT_SYNC_PULSE_BOT_MASK = 0x0F;
    const VERT_DISPLAY_TOP_MASK = 0x0F;

    return {
        ActiveLines: (((edidData[dtdIndex + 7] / VERT_ACTIVE_OFF) &&
            VERT_ACTIVE_MASK) << 8) + edidData[dtdIndex + 5],
        BlankLines: ((edidData[dtdIndex + 7] & VERT_BLANK_MASK) << 8) +
            edidData[dtdIndex + 6],
        SyncOff: (((edidData[dtdIndex + 11] / VERT_SYNC_OFF_TOP_OFF) &&
                VERT_SYNC_OFF_TOP_MASK) << 4) +
            ((edidData[dtdIndex + 10] / VERT_SYNC_OFF_BOT_OFF) &&
                VERT_SYNC_OFF_BOT_MASK),
        SyncPulse: ((edidData[dtdIndex + 11] & VERT_SYNC_PULSE_TOP_MASK) <<
            4) + (edidData[dtdIndex + 10] & VERT_SYNC_PULSE_BOT_MASK),
        DisplaySize: ((edidData[dtdIndex + 14] & VERT_DISPLAY_TOP_MASK) << 8) +
            edidData[dtdIndex + 13],
        BorderLines: edidData[dtdIndex + 15]
    };
};

var getInterlaced = function (edidData, dtdIndex) {
    const INTERLACED_MASK = 0x80;
    return edidData[dtdIndex + 17] & INTERLACED_MASK;
};

var getStereoMode = function (edidData, dtdIndex) {
    const STEREO_MODE_OFFSET = 5;
    const STEREO_MODE_MASK = 0x03;
    return ((edidData[dtdIndex + 17] / STEREO_MODE_OFFSET) &&
        STEREO_MODE_MASK);
};

var getSyncType = function (edidData, dtdIndex) {
    const SYNC_TYPE_OFFSET = 3;
    const SYNC_TYPE_MASK = 0x03;
    return edidData[dtdIndex + 17] / SYNC_TYPE_OFFSET &&
        SYNC_TYPE_MASK;
};

var getvSyncPolarity = function (edidData, dtdIndex) {
    const VSYNC_POLARITY_MASK = 0x04;
    return edidData[dtdIndex + 17] & VSYNC_POLARITY_MASK;
};

var getvSyncSerrated = function (edidData, dtdIndex) {
    const VSYNC_SERRATED_MASK = 0x04;
    return edidData[dtdIndex + 17] & VSYNC_SERRATED_MASK;
};

var getsyncAllRGBLines = function (edidData, dtdIndex) {
    const SYNC_ALL_RGB_MASK = 0x02;
    return edidData[dtdIndex + 17] & SYNC_ALL_RGB_MASK;
};

var gethSyncPolarity = function (edidData, dtdIndex) {
    const HSYNC_POLARY_MASK = 0x02;
    return edidData[dtdIndex + 17] & HSYNC_POLARY_MASK;
};

var gettwoWayStereo = function (edidData, dtdIndex) {
    const TWO_WAY_STEREO_MASK = 0x01;
    return edidData[dtdIndex + 17] & TWO_WAY_STEREO_MASK;
};

/**
 * Gets the detailed timing
 * @param {array} edidData Byte array filled with EDID content.
 * @param {int} dtdIndex Detailed index.
 * @returns {array} Array of supported standard timings.
 */
module.exports.getDetailedTiming = function (edidData, dtdIndex) {
    const syncTypes = {
        ANALOG_COMPOSITE: 0x00,
        BIPOLAR_ANALOG_COMPOSITE: 0x01,
        DIGITAL_COMPOSITE: 0x02,
        DIGITAL_SEPARATE: 0x03
    };

    var dtd = {};

    // Pixel Clock in MHz
    dtd.pixelClock = getPixelClockInMHz(edidData, dtdIndex);
    dtd.HorizontalParams = getHorizontalParams(edidData, dtdIndex);
    dtd.VerticalParams = getVerticalParams(edidData, dtdIndex);
    dtd.interlaced = getInterlaced(edidData, dtdIndex);
    dtd.stereoMode = getStereoMode(edidData, dtdIndex);
    dtd.syncType = getSyncType(edidData, dtdIndex);
    dtd.syncType = getSyncType(edidData, dtdIndex);
    // Bit is dependent on sync type
    if (dtd.syncType === syncTypes.DIGITAL_SEPARATE) {
        dtd.vSyncPolarity = getvSyncPolarity(edidData, dtdIndex);
    } else {
        dtd.vSyncSerrated = getvSyncSerrated(edidData, dtdIndex);
    }

    // Bit is dependent on syn type
    if ((dtd.syncType === syncTypes.ANALOG_COMPOSITE) ||
        (dtd.syncType === syncTypes.BIPOLAR_ANALOG_COMPOSITE)) {
        dtd.syncAllRGBLines = getsyncAllRGBLines(edidData, dtdIndex);
    } else {
        dtd.hSyncPolarity = gethSyncPolarity(edidData, dtdIndex);
    }

    dtd.twoWayStereo = gettwoWayStereo(edidData, dtdIndex);

    return dtd;
};
