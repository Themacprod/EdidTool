module.exports.getDisplayProductSerial = function (edidData, dtdIndex) {
    let serialNumber = '';
    for (let k = dtdIndex + 5; edidData[k] !== 0x0A && edidData[k] !== 0x00; k += 1) {
        const char = String.fromCharCode(edidData[k]);
        if (typeof char !== 'undefined') {
            serialNumber += char;
        }
    }
    return serialNumber.trim();
};
