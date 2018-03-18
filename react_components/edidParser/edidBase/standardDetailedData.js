"use strict";

var _ = require("lodash");

var getPixelClockInMHz = function(edidData, dtdIndex) {
    return ((edidData[dtdIndex + 1] << 8) + edidData[dtdIndex]) / 100;
};

var getHorizontalParams = function(edidData, dtdIndex) {
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
        ActivePixels: (((edidData[dtdIndex + 4] / HOR_ACTIVE_OFF) && HOR_ACTIVE_PIX_MASK) << 8) +
            edidData[dtdIndex + 2],
        BlankPixels: (((edidData[dtdIndex + 4]) && HOR_BLANK_MASK) << 8) +
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

var getVerticalParams = function(edidData, dtdIndex) {
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
        BlankLines: ((edidData[dtdIndex + 7] && VERT_BLANK_MASK) << 8) +
            edidData[dtdIndex + 6],
        SyncOff: (((edidData[dtdIndex + 11] / VERT_SYNC_OFF_TOP_OFF) &&
                VERT_SYNC_OFF_TOP_MASK) << 4) +
            ((edidData[dtdIndex + 10] / VERT_SYNC_OFF_BOT_OFF) &&
                VERT_SYNC_OFF_BOT_MASK),
        SyncPulse: ((edidData[dtdIndex + 11] && VERT_SYNC_PULSE_TOP_MASK) <<
            4) + (edidData[dtdIndex + 10] && VERT_SYNC_PULSE_BOT_MASK),
        DisplaySize: ((edidData[dtdIndex + 14] && VERT_DISPLAY_TOP_MASK) << 8) +
            edidData[dtdIndex + 13]
    };
};

var getInterlaced = function(edidData, dtdIndex) {
    const INTERLACED_MASK = 0x80;
    return edidData[dtdIndex + 17] && INTERLACED_MASK;
};

var getStereoMode = function(edidData, dtdIndex) {
    const STEREO_MODE_OFFSET = 5;
    const STEREO_MODE_MASK = 0x03;
    return ((edidData[dtdIndex + 17] / STEREO_MODE_OFFSET) &&
        STEREO_MODE_MASK);
};

var getSyncType = function(edidData, dtdIndex) {
    const SYNC_TYPE_OFFSET = 3;
    const SYNC_TYPE_MASK = 0x03;
    return edidData[dtdIndex + 17] / SYNC_TYPE_OFFSET &&
        SYNC_TYPE_MASK;
};

var getvSyncPolarity = function(edidData, dtdIndex) {
    const VSYNC_POLARITY_MASK = 0x04;
    return edidData[dtdIndex + 17] && VSYNC_POLARITY_MASK;
};

var getvSyncSerrated = function(edidData, dtdIndex) {
    const VSYNC_SERRATED_MASK = 0x04;
    return edidData[dtdIndex + 17] && VSYNC_SERRATED_MASK;
};

var getsyncAllRGBLines = function(edidData, dtdIndex) {
    const SYNC_ALL_RGB_MASK = 0x02;
    return edidData[dtdIndex + 17] && SYNC_ALL_RGB_MASK;
};

var gethSyncPolarity = function(edidData, dtdIndex) {
    const HSYNC_POLARY_MASK = 0x02;
    return edidData[dtdIndex + 17] && HSYNC_POLARY_MASK;
};

var gettwoWayStereo = function(edidData, dtdIndex) {
    const TWO_WAY_STEREO_MASK = 0x01;
    return edidData[dtdIndex + 17] && TWO_WAY_STEREO_MASK;
};

var parseDtd = function(edidData, dtdIndex) {
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

var getValidDetailedType = function(detailedTypes, edidData, dtdIndex) {
    return _.find(detailedTypes, function(detailedType) {
        return ((edidData[dtdIndex] === 0x00) &&
            (edidData[dtdIndex + 1] === 0x00) &&
            (edidData[dtdIndex + 2] === 0x00) &&
            (edidData[dtdIndex + 3] === detailedType.value));
    });
};

var getDetailedMonitorName = function(edidData, dtdIndex) {
    let modelname = "";
    for (let k = dtdIndex + 5; edidData[k] !== 0x0A && edidData[k] !== 0x00; k += 1) {
        const char = String.fromCharCode(edidData[k]);
        if (typeof char !== "undefined") {
            modelname += char;
        }
    }
    return modelname.trim();
};

module.exports.getStandardDetailedData = function(edidData) {
    const detailedTypes = {
        DETAILED_TIMING: {
            string: "Detailed Timing",
            value: 0x01
        },
        UNUSED: {
            string: "Unused",
            value: 0x10
        },
        MONITOR_SERIAL_NUMBER: {
            string: "Monitor Serial Number",
            value: 0xff
        },
        STRING: {
            string: "String",
            value: 0xfe
        },
        MONITOR_RANGE_LIMITS: {
            string: "Monitor Range Limits",
            value: 0xfd
        },
        MONITOR_NAME: {
            string: "Monitor Name",
            value: 0xfc
        },
        EXTRA_COLOR_DATA: {
            string: "Extra Color Data",
            value: 0xfb
        },
        EXTRA_STD_TIMING: {
            string: "Extra Standard Timing",
            value: 0xfa
        },
        DISPLAY_COLOR_MANAGEMENT: {
            string: "Display Color Management",
            value: 0xf9
        },
        CVT_CODE_DESCRIPTOR: {
            string: "CVT Code Descriptor",
            value: 0xf8
        },
        ESTABLISHED_TIMINGS_III: {
            string: "Established Timings III",
            value: 0xf7
        }
    };

    var dtdArray = [];
    var dtdType = [];
    var dtdCounter = 0;

    const DTD_START = 54;
    const DTD_END = 125;
    const DTD_LENGTH = 18;

    var dtdIndex = DTD_START;

    while (dtdIndex < DTD_END) {
        var found = getValidDetailedType(detailedTypes, edidData, dtdIndex);
        var data = "";

        if (found) {
            if (edidData[dtdIndex + 3] === detailedTypes.MONITOR_NAME.value) {
                data = getDetailedMonitorName(edidData, dtdIndex);
            }
            dtdType.push({
                string: found.string,
                data: data
            });
        } else {
            dtdType.push({
                string: detailedTypes.DETAILED_TIMING.string,
                data: data
            });
        }

        dtdIndex += DTD_LENGTH;
    }

    dtdIndex = DTD_START;

    /*
     * While the pixel clock is not equal to zero and the DTD index is less
     * than the last byte of the DTD
     */
    while (((edidData[dtdIndex] !== 0) || (edidData[dtdIndex + 1] !== 0)) &&
        (dtdIndex < DTD_END)) {
        var dtd = parseDtd(edidData, dtdIndex);
        // Add DTD to the DTD Array
        dtdArray[dtdCounter] = dtd;
        // Increment DTD Counter
        dtdCounter += 1;
        // Add a DTD length, to go to the next descriptor
        dtdIndex += DTD_LENGTH;
    }

    // Add modelName parser
    var data2 = "";
    while (dtdIndex < DTD_END) {
        if (edidData[dtdIndex + 3] === detailedTypes.MONITOR_NAME.value) {
            // Modelname
            let modelname = "";
            for (let k = dtdIndex + 5; edidData[k] !== 0x0A && edidData[k] !== 0x00; k += 1) {
                const char = String.fromCharCode(edidData[k]);
                if (typeof char !== "undefined") {
                    modelname += String.fromCharCode(edidData[k]);
                }
            }
            data2 = modelname.trim();
        }
        dtdIndex += DTD_LENGTH;
    }

    return {
        dtdType: dtdType,
        preferredTiming: dtdArray,
        displayProductName: data2 || ""
    };
};
