var _ = require('lodash'),
    manufacturerNames = require('./manufacturernames');

/**
 * Gets the ID manufacturer Name (format is EISA 3-character ID).
 * Exemple for Monoprice monitor it will return "MPC".
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {int} EISA 3-character ID.
 */
module.exports.getManufacturerId = function (edidData) {
    const MANUFACTURER_ID_1 = 0x09;
    const MANUFACTURER_ID_2 = 0x08;

    if ((edidData[MANUFACTURER_ID_2] === 0) || (edidData[MANUFACTURER_ID_1] === 0)) {
        return '-';
    }

    const manufacturerid = (edidData[MANUFACTURER_ID_2] << 8) + edidData[MANUFACTURER_ID_1];
    let string1 = ((manufacturerid >> 10) & 0x1f) - 1;
    let string2 = ((manufacturerid >> 5) & 0x1f) - 1;
    let string3 = (manufacturerid & 0x1f) - 1;

    string1 = String.fromCharCode(string1 + 'A'.charCodeAt(0));
    string2 = String.fromCharCode(string2 + 'A'.charCodeAt(0));
    string3 = String.fromCharCode(string3 + 'A'.charCodeAt(0));

    return string1 + string2 + string3;
};

/**
 * Gets the full manufacturer Name from the EISA 3-character ID.
 * Exemple for Monoprice monitor it will return "MPC"
 * @param {string} manufacturerId EISA 3-character ID.
 * @returns {string} EISA 3-character ID full string conversion. See manufacturername.json file
 */
module.exports.getManufacturerName = function (manufacturerId) {
    var manufacturerNameFound = _.find(manufacturerNames, function (manufacturerName) {
        return manufacturerName[0] === manufacturerId;
    });

    if (manufacturerNameFound) {
        return manufacturerNameFound[1];
    }

    return '-';
};

/**
 * Gets the ID Product Code (Vendor assigned code).
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {int} 2 bytes ID Prodcut code.
 */
module.exports.getProductCodeId = function (edidData) {
    const PRODUCT_CODE1 = 0x0A;
    const PRODUCT_CODE2 = 0x0B;

    var hexValue = ((edidData[PRODUCT_CODE2] << 8) +
        edidData[PRODUCT_CODE1]).toString(16).toUpperCase();

    if (hexValue.length < 4) {
        hexValue = `0${hexValue}`;
    }

    return hexValue;
};

/**
 * Gets the ID Serial Number (32-bit serial number).
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {int} 32-bit serial number.
 */
module.exports.getSerialNumber = function (edidData) {
    const SERIAL_NUMBER1 = 0x0C;
    const SERIAL_NUMBER2 = 0x0D;
    const SERIAL_NUMBER3 = 0x0E;
    const SERIAL_NUMBER4 = 0x0F;

    return (edidData[SERIAL_NUMBER4] << 24) +
        (edidData[SERIAL_NUMBER3] << 16) +
        (edidData[SERIAL_NUMBER2] << 8) +
        edidData[SERIAL_NUMBER1];
};

/**
 * Gets the week of manufacturer (week number).
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {int} Week number.
 */
module.exports.getManufactureWeek = function (edidData) {
    const MANUFACTURE_WEEK = 0x10;
    return edidData[MANUFACTURE_WEEK];
};

/**
 * Gets the year of manufacturer (year number).
 * @param {array} edidData Byte array filled with EDID content.
 * @returns {int} Year number.
 */
module.exports.getManufactureYear = function (edidData) {
    const MANUFACTURE_WEEK = 0x11;
    return edidData[MANUFACTURE_WEEK];
};
