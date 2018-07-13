module.exports.getMonitorRangeLimits = function (edidData, dtdIndex) {
    // TODO
    const OffsetDisplayRangeLimits = 4;
    const OffsetMinVerticalRate = 5;
    const OffsetMaxVerticalRate = 6;
    // const OffsetMinHorizontalRate = 7;
    // const OffsetMaxHorizontalRate = 8;
    // const OffsetMaxPixelClock = 9;

    const MIN_V_RATE_MASK = 0x03;
    const MAX_V_RATE_MASK = 0x02;

    let minVRate = 0;

    if ((edidData[dtdIndex + OffsetDisplayRangeLimits] & MIN_V_RATE_MASK) === 0x03) {
        minVRate = 256;
    }

    minVRate += (edidData[dtdIndex + OffsetMinVerticalRate]);

    let maxVRate = 0;

    if ((edidData[dtdIndex + OffsetDisplayRangeLimits] & MAX_V_RATE_MASK) === 0x02) {
        maxVRate = 256;
    }

    maxVRate += (edidData[dtdIndex + OffsetMaxVerticalRate]);

    return ({
        minVRate: minVRate,
        maxVRate: maxVRate,
        minHRate: 0,
        maxHRate: 0,
        maxPixelClock: 0,
        videoTimingSupport: 'Default GTF'
    });
};
