module.exports.getDetailedMonitorName = function(edidData, dtdIndex) {
    let modelname = '';
    for (let k = dtdIndex + 5; edidData[k] !== 0x0A && edidData[k] !== 0x00; k += 1) {
        const char = String.fromCharCode(edidData[k]);
        if (typeof char !== 'undefined') {
            modelname += char;
        }
    }
    return modelname.trim();
};
