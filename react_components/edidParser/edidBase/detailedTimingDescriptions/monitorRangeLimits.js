module.exports.getMonitorRangeLimits = function (edidData, dtdIndex) {
    const OffsetDisplayRangeLimits = 4;

    const MIN_V_RATE_MASK = 0x03;
    const MAX_V_RATE_MASK = 0x02;

    let minVRate = 0;
    let maxVRate = 0;

    if ((edidData[dtdIndex + OffsetDisplayRangeLimits] & MIN_V_RATE_MASK) === 0x03) {
        minVRate = 256;
    }

    if ((edidData[dtdIndex + OffsetDisplayRangeLimits] & MAX_V_RATE_MASK) === 0x02) {
        maxVRate = 256;
    }

    const MIN_H_RATE_MASK = 0xC0;
    const MAX_H_RATE_MASK = 0xC0;

    let minHRate = 0;

    if ((edidData[dtdIndex + OffsetDisplayRangeLimits] & MIN_H_RATE_MASK) === MIN_H_RATE_MASK) {
        minHRate = 256;
    }

    let maxHRate = 0;

    if ((edidData[dtdIndex + OffsetDisplayRangeLimits] & MAX_H_RATE_MASK) === MAX_H_RATE_MASK) {
        maxHRate = 256;
    }

    let videoTimingSupport = 'Unknown';

    const OffsetVideoTimingSupport = 10;

    if (edidData[dtdIndex + OffsetVideoTimingSupport] === 0) {
        videoTimingSupport = 'Default GTF';
    } else if (edidData[dtdIndex + OffsetVideoTimingSupport] === 1) {
        videoTimingSupport = 'Range limits only';
    } else if (edidData[dtdIndex + OffsetVideoTimingSupport] === 2) {
        videoTimingSupport = 'Secondary GTF';
    } else if (edidData[dtdIndex + OffsetVideoTimingSupport] === 4) {
        videoTimingSupport = 'CVT';
    }

    // TODO video timing data.

    return ({
        minVRate: minVRate + (edidData[dtdIndex + 5]),
        maxVRate: maxVRate + (edidData[dtdIndex + 6]),
        minHRate: minHRate + (edidData[dtdIndex + 7]),
        maxHRate: maxHRate + (edidData[dtdIndex + 8]),
        maxPixelClockMHz: (edidData[dtdIndex + 9] * 10),
        videoTimingSupport: videoTimingSupport
    });
};
