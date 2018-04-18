var _ = require('lodash');

module.exports.extractEdid = function (rawEdidData) {
    var startIdx = rawEdidData.indexOf('| ');
    var endIdx = rawEdidData.toLowerCase().indexOf('real buffer size: ');

    // Remove header information.
    var rawEdid = rawEdidData.slice(startIdx, endIdx);
    var rawLines = rawEdid.split(/[\r\n]+/g);

    // Remove empty line.
    var rawLinesFilter = _.filter(rawLines, line => line.length > 3);

    // Parse each line
    var edidContent = _.map(rawLinesFilter, (line) => {
        // Remove line prefix.
        var lineSlice = line.slice(line.indexOf('|') + 3, line.length);
        return lineSlice.trimRight().split('  ');
    });

    var edidContentFlat = _.flattenDeep(edidContent);

    return _.map(edidContentFlat, byte => parseInt(byte, 16));
};
