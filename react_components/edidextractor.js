var _ = require('lodash');

module.exports.extractEdidBin = function (rawEdidData) {
    let hex = [];
    for (let i = 0; i < rawEdidData.length; i++) {
        let byteStr = rawEdidData.charCodeAt(i).toString(16).toUpperCase();
        hex.push(parseInt(byteStr, 16));
    }

    return hex;
};

module.exports.extractEdidDat = function (rawEdidData) {
    let hexStr = rawEdidData.toUpperCase();
    hexStr = hexStr.match(/(0x)?[0-9A-F][0-9A-F][  ]+(0x)?[0-9A-F][0-9A-F][  ]+((0x)?[0-9A-F][0-9A-F][  ]*)+/g);
    hexStr = _.map(hexStr, (line) => line.split(/\s+/g));
    hexStr = _.flattenDeep(hexStr);
    hexStr = _.filter(hexStr, (line) => line.length);

    return _.map(hexStr, byte => parseInt(byte, 16));
};
