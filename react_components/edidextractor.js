"use strict";

var _ = require("lodash");

module.exports.extractEdid = function(rawEdidData) {
    var startIdx = rawEdidData.indexOf("| ");
    var endIdx = rawEdidData.toLowerCase().indexOf("real buffer size: ");

    // Remove header information.
    var rawEdid = rawEdidData.slice(startIdx, endIdx);
    var rawLines = rawEdid.split(/[\r\n]+/g);

    // Remove empty line.
    var rawLinesFilter = _.filter(rawLines, function(line) {
        return line.length > 3;
    });

    // Parse each line
    var edidContent = _.map(rawLinesFilter, function(line) {
        // Remove line prefix.
        // Careful with trimRight function
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/TrimRight
        var lineSlice = line.slice(line.indexOf("|") + 3, line.length);
        return lineSlice.trimRight().split("  ");
    });

    var edidContentFlat = _.flattenDeep(edidContent);
    edidContentFlat = _.map(edidContentFlat, function(byte) {
        return parseInt(byte, 16);
    });

    return edidContentFlat;
};
