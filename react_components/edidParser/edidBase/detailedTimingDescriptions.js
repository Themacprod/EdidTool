var _ = require('lodash'),
	detailedTiming = require('./detailedTimingDescriptions/detailedTiming'),
	monitorName = require('./detailedTimingDescriptions/monitorName');


var getValidDetailedType = function(detailedTypes, edidData, dtdIndex) {
	return _.find(detailedTypes, function(detailedType) {
		return ((edidData[dtdIndex] === 0x00) &&
			(edidData[dtdIndex + 1] === 0x00) &&
			(edidData[dtdIndex + 2] === 0x00) &&
			(edidData[dtdIndex + 3] === detailedType.value));
	});
};

module.exports.getData = function(edidData) {
	const detailedTypes = {
		DETAILED_TIMING: {
			string: 'Detailed Timing',
			value: 0x01
		},
		UNUSED: {
			string: 'Unused',
			value: 0x10
		},
		MONITOR_SERIAL_NUMBER: {
			string: 'Monitor Serial Number',
			value: 0xff
		},
		STRING: {
			string: 'String',
			value: 0xfe
		},
		MONITOR_RANGE_LIMITS: {
			string: 'Monitor Range Limits',
			value: 0xfd
		},
		MONITOR_NAME: {
			string: 'Monitor Name',
			value: 0xfc
		},
		EXTRA_COLOR_DATA: {
			string: 'Extra Color Data',
			value: 0xfb
		},
		EXTRA_STD_TIMING: {
			string: 'Extra Standard Timing',
			value: 0xfa
		},
		DISPLAY_COLOR_MANAGEMENT: {
			string: 'Display Color Management',
			value: 0xf9
		},
		CVT_CODE_DESCRIPTOR: {
			string: 'CVT Code Descriptor',
			value: 0xf8
		},
		ESTABLISHED_TIMINGS_III: {
			string: 'Established Timings III',
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
		var data = '';

		if (found) {
			if (edidData[dtdIndex + 3] === detailedTypes.MONITOR_NAME.value) {
				data = monitorName.getDetailedMonitorName(edidData, dtdIndex);
			}
			if (edidData[dtdIndex + 3] === detailedTypes.DETAILED_TIMING.value) {
				data = detailedTiming.getDetailedTiming(edidData, dtdIndex);
			}
			dtdType.push({
				string: found.string,
				data: data
			});
		} else {
			dtdType.push({
				string: detailedTypes.DETAILED_TIMING.string,
				data: detailedTiming.getDetailedTiming(edidData, dtdIndex)
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
		var dtd = detailedTiming.getDetailedTiming(edidData, dtdIndex);
		// Add DTD to the DTD Array
		dtdArray[dtdCounter] = dtd;
		// Increment DTD Counter
		dtdCounter += 1;
		// Add a DTD length, to go to the next descriptor
		dtdIndex += DTD_LENGTH;
	}

	return {
		dtdType: dtdType,
		preferredTiming: dtdArray
	};
};
