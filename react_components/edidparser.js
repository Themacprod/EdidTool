var header = require('./edidParser/edidBase/header'),
    edidVersionRevision = require('./edidParser/edidBase/versionRevision'),
    vendorProductId = require('./edidParser/edidBase/vendorProductId'),
    basicDisplayParameters = require('./edidParser/edidBase/basicDisplayParameters'),
    colorCharacteristics = require('./edidParser/edidBase/colorCharacteristics'),
    establishedTimings = require('./edidParser/edidBase/establishedTimings'),
    standardTimings = require('./edidParser/edidBase/standardTimings'),
    screenSize = require('./edidParser/edidBase/basicDisplayParameters/screenSizeAspectRatio'),
    detailedTimingDescriptions = require('./edidParser/edidBase/detailedTimingDescriptions');

var edidparser = function() {
    this.EDID_BLOCK_LENGTH = 128;

    this.DTD_LENGTH = 18;

    this.dataBlockType = {
        RESERVED: {
            string: 'RESERVED',
            value: 0
        },
        AUDIO: {
            string: 'AUDIO',
            value: 1
        },
        VIDEO: {
            string: 'VIDEO',
            value: 2
        },
        VENDOR_SPECIFIC: {
            string: 'VENDOR SPECIFIC',
            value: 3
        },
        SPEAKER_ALLOCATION: {
            string: 'SPEAKER ALLOCATION',
            value: 4
        },
        EXTENDED_TAG: {
            string: 'EXTENDED TAG',
            value: 7
        }
    };

    this.extendedDataBlockType = {
        VIDEO_CAPABILITY: {
            string: 'VIDEO CAPABILITY',
            value: 0
        },
        COLORIMETRY: {
            string: 'COLORIMETRY',
            value: 5
        },
        YCBCR420_VIDEO: {
            string: 'YCBCR420 VIDEO DATA',
            value: 14
        },
        YCBCR420_CAPABILITY_MAP: {
            string: 'YCBCR420_CAPABILITY_MAP',
            value: 15
        }
    };

    this.ieeeOuiType = {
        HDMI14: {
            string: 'HDMI14',
            value: 0x000C03
        },
        HDMI20: {
            string: 'HDMI20',
            value: 0xC45DD8
        }
    };

    this.overscanBehavior = [
        'No data',
        'Always overscanned',
        'Always underscanned',
        'Supports both overscan and underscan',
    ];

    this.audioFormatArray = [
        1,
        8,
        13,
        14,
        15,
    ];
    this.shortAudioDescriptors = [
        'RESERVED',
        'LPCM',
        'AC-3',
        'MPEG-1',
        'MP3',
        'MPEG2',
        'AAC LC',
        'DTS',
        'ATRAC',
        'DSD',
        'E-AC-3',
        'DTS-HD',
        'MLP',
        'DST',
        'WMA Pro',
    ];
    this.sadSampleRates = [
        '32 kHz',
        '44.1 kHz',
        '48 kHz',
        '88.2 kHz',
        '96 kHz',
        '176.4 kHz',
        '192 kHz',
    ];
    this.sadBitDepths = [
        '16 bit',
        '20 bit',
        '24 bit',
    ];
    this.speakerAllocation = [
        'Front Left/Front Right (FL/FR)',
        'Low Frequency Effort (LFE)',
        'Front Center (FC)',
        'Rear Left/Rear Right (RL/RR)',
        'Rear Center (RC)',
        'Front Left Center/Front Right Center (FLC/FRC)',
        'Rear Left Center/Rear Right Center (RLC/RRC)',
        'Front Left Wide/Front Right Wide (FLW/FRW)',
        'Front Left High/Frong Right High (FLH/FRH)',
        'Top Center (TC)',
        'Front Center High (FCH)',
    ];
};

edidparser.prototype.setEdidData = function(edid) {
    this.edidData = edid;
};

edidparser.prototype.parse = function() {
    if (header.isValidHeader(this.edidData) === true) {
        this.validHeader = 'OK';
    } else {
        this.validHeader = 'ERROR';
    }

    this.numberOfExtensions = this.getNumberExtensions();

    this.checksum = this.getChecksum();

    this.exts = [];
    // Begin Parsing Extension blocks
    for (var extIndex = 0; extIndex < this.numberOfExtensions; extIndex += 1) {
        this.exts[extIndex] = {};
        this.exts[extIndex].blockNumber = extIndex + 1;
        this.exts[extIndex].extTag = this.getExtTag(extIndex);
        this.exts[extIndex].revisionNumber = this.getRevisionNumber(extIndex);
        this.exts[extIndex].dtdStart = this.getDtdStart(extIndex);
        this.exts[extIndex].numDtds = this.getNumberExtDtds(extIndex);
        this.exts[extIndex].underscan = this.getUnderscan(extIndex);
        this.exts[extIndex].basicAudio = this.getBasicAudio(extIndex);
        this.exts[extIndex].ycbcr444 = this.getYcBcR444(extIndex);
        this.exts[extIndex].ycbcr422 = this.getYcBcR422(extIndex);
        // If DTDs don't start at byte 4
        if (this.exts[extIndex].dtdStart !== 4) {
            // Parse Data Collection block
            this.exts[extIndex].dataBlockCollection = this.parseDataBlockCollection(extIndex);
        }
        // Parse DTDs
        this.exts[extIndex].dtds = this.getExtDtds(extIndex, this.exts[extIndex].dtdStart);
        // Get Checkum
        this.exts[extIndex].checksum = this.getExtChecksum(extIndex);
    }
};

edidparser.prototype.getHeader = function() {
    return {
        header: header.getHeader(this.edidData)
    };
};

edidparser.prototype.getVendorProductId = function() {
    const manufacturerId = vendorProductId.getManufacturerId(this.edidData);

    return {
        manufacturerId: manufacturerId,
        manufacturerName: vendorProductId.getManufacturerName(manufacturerId),
        productCode: vendorProductId.getProductCodeId(this.edidData),
        serialNumber: vendorProductId.getSerialNumber(this.edidData),
        manufactureWeek: vendorProductId.getManufactureWeek(this.edidData),
        manufactureYear: vendorProductId.getManufactureYear(this.edidData)
    };
};

edidparser.prototype.getEdidVersionRevision = function() {
    return {
        version: edidVersionRevision.getVersion(this.edidData),
        revision: edidVersionRevision.getRevision(this.edidData)
    };
};

edidparser.prototype.getBasicDisplayParams = function() {
    return basicDisplayParameters.getBasicDisplayParameters(this.edidData);
};

edidparser.prototype.getScreenSize = function() {
    return screenSize.getScreenSizeAspectRatio(this.edidData);
};

edidparser.prototype.getChromaticityCoordinates = function() {
    return colorCharacteristics.getColorCharacteristics(this.edidData);
};

edidparser.prototype.getEstablishedModes = function() {
    return establishedTimings.getEstablishedModes(this.edidData);
};

edidparser.prototype.getStandardDisplayModes = function() {
    return standardTimings.getStandardTimings(this.edidData);
};

edidparser.prototype.getDtds = function() {
    return detailedTimingDescriptions.getData(this.edidData);
};

edidparser.prototype.getNumberExtensions = function() {
    var NUMBER_OF_EXTENSIONS = 126;
    return this.edidData[NUMBER_OF_EXTENSIONS];
};

edidparser.prototype.getChecksum = function() {
    var CHECKSUM = 127;
    return this.edidData[CHECKSUM];
};

edidparser.prototype.calcChecksum = function(block) {
    var startAddress = block * this.EDID_BLOCK_LENGTH;
    var endAddress = (startAddress + this.EDID_BLOCK_LENGTH) - 1;
    var checksum = 0;
    for (var index = startAddress; index < endAddress; index += 1) {
        checksum += this.edidData[index];
    }
    return (256 - (checksum % 256));
};

edidparser.prototype.validChecksum = function(block) {
    var checksum = this.edidData[((block + 1) * this.EDID_BLOCK_LENGTH) - 1];
    return checksum === this.calcChecksum(block);
};

edidparser.prototype.getExtTag = function(extIndex) {
    var BLOCK_OFFSET = this.EDID_BLOCK_LENGTH * (extIndex + 1);
    var EXT_TAG = BLOCK_OFFSET + 0;
    return this.edidData[EXT_TAG];
};

edidparser.prototype.getRevisionNumber = function(extIndex) {
    var BLOCK_OFFSET = this.EDID_BLOCK_LENGTH * (extIndex + 1);
    var REV_NUMBER = BLOCK_OFFSET + 1;
    return this.edidData[REV_NUMBER];
};

edidparser.prototype.getDtdStart = function(extIndex) {
    var BLOCK_OFFSET = this.EDID_BLOCK_LENGTH * (extIndex + 1);
    var DTD_START = BLOCK_OFFSET + 2;
    return this.edidData[DTD_START];
};

edidparser.prototype.getNumberExtDtds = function(extIndex) {
    var BLOCK_OFFSET = this.EDID_BLOCK_LENGTH * (extIndex + 1);
    var NUM_DTDS = BLOCK_OFFSET + 3;
    var NUM_DTDS_MASK = 0x0F;
    return (this.edidData[NUM_DTDS] & NUM_DTDS_MASK);
};

edidparser.prototype.getUnderscan = function(extIndex) {
    var BLOCK_OFFSET = this.EDID_BLOCK_LENGTH * (extIndex + 1);
    var UNDERSCAN = BLOCK_OFFSET + 3;
    var UNDERSCAN_MASK = 0x80;
    return this.edidData[UNDERSCAN] & UNDERSCAN_MASK;
};

edidparser.prototype.getBasicAudio = function(extIndex) {
    var BLOCK_OFFSET = this.EDID_BLOCK_LENGTH * (extIndex + 1);
    var BASIC_AUDIO = BLOCK_OFFSET + 3;
    var BASIC_AUDIO_MASK = 0x40;
    return this.edidData[BASIC_AUDIO] & BASIC_AUDIO_MASK;
};

edidparser.prototype.getYcBcR444 = function(extIndex) {
    var BLOCK_OFFSET = this.EDID_BLOCK_LENGTH * (extIndex + 1);
    var YCBCR_444 = BLOCK_OFFSET + 3;
    var YCBCR_444_MASK = 0x20;
    return this.edidData[YCBCR_444] & YCBCR_444_MASK;
};

edidparser.prototype.getYcBcR422 = function(extIndex) {
    var BLOCK_OFFSET = this.EDID_BLOCK_LENGTH * (extIndex + 1);
    var YCBCR_422 = BLOCK_OFFSET + 3;
    var YCBCR_422_MASK = 0x10;
    return this.edidData[YCBCR_422] & YCBCR_422_MASK;
};

edidparser.prototype.parseDataBlockCollection = function(extIndex) {
    var BLOCK_OFFSET = this.EDID_BLOCK_LENGTH * (extIndex + 1);
    var START_DATA_BLOCK = 4;
    var startAddress = BLOCK_OFFSET + START_DATA_BLOCK;
    var dataBlockLength = this.exts[extIndex].dtdStart - START_DATA_BLOCK;
    var endAddress = startAddress + dataBlockLength;
    var dataBlockCollection = [];

    var TAG_CODE_MASK = 0x07;
    var TAG_CODE_OFFSET = 5;
    var DATA_BLOCK_LENGTH_MASK = 0x1F;
    var index = startAddress;
    var numberDataBlocks = 0;
    while (index < endAddress) {
        // Parse tag code
        var blockTagCode = (this.edidData[index] / TAG_CODE_OFFSET) & TAG_CODE_MASK;
        // Parse Length
        var blockLength = (this.edidData[index] & DATA_BLOCK_LENGTH_MASK);

        // Object that holds Parsed Data block
        var dataBlock = [];

        // Parse the data block by the tag code
        if (blockTagCode === this.dataBlockType.AUDIO.value) {
            dataBlock = this.parseAudioDataBlock(index + 1, blockLength);
        } else if (blockTagCode === this.dataBlockType.VIDEO.value) {
            dataBlock = this.parseVideoDataBlock(index + 1, blockLength);
        } else if (blockTagCode === this.dataBlockType.VENDOR_SPECIFIC.value) {
            dataBlock = this.parseVendorDataBlock(index + 1, blockLength);
        } else if (blockTagCode === this.dataBlockType.SPEAKER_ALLOCATION.value) {
            dataBlock = this.parseSpeakerDataBlock(index + 1, blockLength);
        } else if (blockTagCode === this.dataBlockType.EXTENDED_TAG.value) {
            dataBlock = this.parseExtendedTagDataBlock(index + 1, blockLength);
        }

        // Add the new object to the data block collection
        dataBlockCollection[numberDataBlocks] = dataBlock;
        // Increment the Index, to the location of the next block
        index += (blockLength + 1);
        // Increment the number of data blocks
        numberDataBlocks += 1;
    }
    return dataBlockCollection;
};

edidparser.prototype.parseAudioDataBlock = function(startAddress, blockLength) {
    var audioBlock = [];
    // Audio blocks are made up of Short Audio Descriptors that are three bytes each
    var SHORT_AUDIO_DESC_LENGTH = 3;
    // The number of Short Audio Descriptors is the block length divided by the descriptor size
    var numberShortAudioDescriptors = blockLength / SHORT_AUDIO_DESC_LENGTH;
    var shortAudDescIndex = 0;
    var index = startAddress;

    // Set the Audio Block Tag
    audioBlock.tag = this.dataBlockType.AUDIO;
    // Set the Audio block length
    audioBlock.dataLength = blockLength;
    // Set the number of short audio descriptors
    audioBlock.length = numberShortAudioDescriptors;
    // Create array for short audio descriptors
    audioBlock.shortAudioDescriptors = [];


    // Parse the short audio descriptors in the Audio Data Block
    var SHORT_AUDIO_DESC_MASK = 0x0F;
    var SHORT_AUDIO_DESC_OFF = 3;
    var MAX_CHANNELS_MASK = 0x07;
    var SAMPLE_RATE_MASK = 0x7F;
    while (shortAudDescIndex < numberShortAudioDescriptors) {
        // Each Short Audio Descriptor is a 3 byte object
        var shortAudDesc = {};

        // Parse the format
        shortAudDesc.format = (this.edidData[index] / SHORT_AUDIO_DESC_OFF) & SHORT_AUDIO_DESC_MASK;
        // Parse max number of channels
        shortAudDesc.maxChannels = (this.edidData[index] & MAX_CHANNELS_MASK) + 1;
        // Parse audio sample rates
        shortAudDesc.sampleRates = this.edidData[index + 1] & SAMPLE_RATE_MASK;

        if (shortAudDesc.format <= this.audioFormatArray[0]) {
            var BIT_DEPTH_MASK = 0x07;
            shortAudDesc.bitDepth = this.edidData[index + 2] & BIT_DEPTH_MASK;
        } else if (shortAudDesc.format <= this.audioFormatArray[1]) {
            var MAX_BIT_RATE_MASK = 0xFF;
            shortAudDesc.bitRate = (this.edidData[index + 2] & MAX_BIT_RATE_MASK) << 8;
        } else if (shortAudDesc.format <= this.audioFormatArray[2]) {
            var AUDIO_FORMAT_CODE_MASK = 0xFF;
            shortAudDesc.audioFormatCode = this.edidData[index + 2] & AUDIO_FORMAT_CODE_MASK;
        } else if (shortAudDesc.format <= this.audioFormatArray[3]) {
            var PROFILE_MASK = 0x07;
            shortAudDesc.profile = this.edidData[index + 2] & PROFILE_MASK;
        } else if (shortAudDesc.format <= this.audioFormatArray[4]) {
            var FORMAT_CODE_EXT_OFF = 3;
            var FORMAT_CODE_EXT_MASK = 0x1F;
            shortAudDesc.formatCodeExt = (this.edidData[index + 2] / FORMAT_CODE_EXT_OFF) & FORMAT_CODE_EXT_MASK;
        }

        // Add Short Audio Descriptor to Audio Data Block
        audioBlock.shortAudioDescriptors[shortAudDescIndex] = shortAudDesc;
        // Move the index to the beginning of the next Short Audio Descriptor
        index += SHORT_AUDIO_DESC_LENGTH;
        // Increment the count to the next Short Audio Descriptor
        shortAudDescIndex += 1;
    }

    return audioBlock;
};

edidparser.prototype.parseVideoDataBlock = function(startAddress, blockLength) {
    var videoBlock = {};
    videoBlock.tag = this.dataBlockType.VIDEO;
    videoBlock.length = blockLength;

    var index = 0;
    videoBlock.shortVideoDescriptors = [];

    var NATIVE_RESOLUTION_MASK = 0x80;
    var CEA861F_VIC_MASK = 0x40;
    var LOW_VIC_MASK = 0x3F;
    var HIGH_VIC_MASK = 0xFF;
    while (index < blockLength) {
        var shortVideoDescriptor = {};
        var dataByte = this.edidData[startAddress + index];
        if ((dataByte & CEA861F_VIC_MASK) > 0) {
            shortVideoDescriptor.vic = dataByte & HIGH_VIC_MASK;
            shortVideoDescriptor.nativeResolution = false;
        } else {
            shortVideoDescriptor.vic = dataByte & LOW_VIC_MASK;
            shortVideoDescriptor.nativeResolution = dataByte & NATIVE_RESOLUTION_MASK;
        }
        videoBlock.shortVideoDescriptors[index] = shortVideoDescriptor;

        index += 1;
    }

    // Store the video block - it is referenced by other data blocks (e.g. YCbCr 4:2:0 Capability Map)
    this.videoBlock = videoBlock;

    return videoBlock;
};

edidparser.prototype.parseVendorDataBlockHDMI14 = function(startAddress, blockLength, vendorBlock) {
    // Subtract one, so the indexing matches the HDMI Specification
    var vsdbAddress = startAddress - 1;

    var PHYSICAL_ADDRESS_1 = 4;
    var PHYSICAL_ADDRESS_2 = 5;
    // Physical Address
    vendorBlock.physicalAddress = (this.edidData[vsdbAddress + PHYSICAL_ADDRESS_1] << 8) |
        (this.edidData[vsdbAddress + PHYSICAL_ADDRESS_2]);

    var AI_DC_DUAL_ADDRESS = 6;
    if (blockLength >= AI_DC_DUAL_ADDRESS) {
        var SUPPORT_AI_MASK = 0x80;
        // Parse Supports ACP, ISRC1, ISRC2
        vendorBlock.supportsAI = this.edidData[vsdbAddress + AI_DC_DUAL_ADDRESS] & SUPPORT_AI_MASK;

        var DEEP_COLOR_48_MASK = 0x40;
        vendorBlock.deepColor48 = this.edidData[vsdbAddress + AI_DC_DUAL_ADDRESS] & DEEP_COLOR_48_MASK;
        var DEEP_COLOR_36_MASK = 0x20;
        vendorBlock.deepColor36 = this.edidData[vsdbAddress + AI_DC_DUAL_ADDRESS] & DEEP_COLOR_36_MASK;
        var DEEP_COLOR_30_MASK = 0x10;
        vendorBlock.deepColor30 = this.edidData[vsdbAddress + AI_DC_DUAL_ADDRESS] & DEEP_COLOR_30_MASK;
        var DEEP_COLOR_Y444_MASK = 0x08;
        vendorBlock.deepColorY444 = this.edidData[vsdbAddress + AI_DC_DUAL_ADDRESS] & DEEP_COLOR_Y444_MASK;
        var DUAL_DVI_MASK = 0x01;
        vendorBlock.dualDvi = this.edidData[vsdbAddress + AI_DC_DUAL_ADDRESS] & DUAL_DVI_MASK;
    }

    /*
     * Parse Max TMDS rate, the edid has TMDS clock. Multiply TMDS clock x 5Mhz
     * And you'll get max TMDS rate
     */
     var MAX_TMDS_CLOCK_ADDRESS = 7;
     if (blockLength >= MAX_TMDS_CLOCK_ADDRESS) {
         vendorBlock.maxTmdsRate = this.edidData[vsdbAddress + MAX_TMDS_CLOCK_ADDRESS] * 5;
     }

    var LATENCY_PRESENT_ADDRESS = 8;
    if (blockLength >= LATENCY_PRESENT_ADDRESS) {
        var LATENCY_FIELDS_PRESENT_MASK = 0x80;
        vendorBlock.latencyPresent = this.edidData[vsdbAddress + LATENCY_PRESENT_ADDRESS] & LATENCY_FIELDS_PRESENT_MASK;

        var I_LATENCY_FIELDS_PRESENT_MASK = 0x80;
        vendorBlock.iLatencyPresent = this.edidData[vsdbAddress + LATENCY_PRESENT_ADDRESS] & I_LATENCY_FIELDS_PRESENT_MASK;
    }

    var AUDIO_LATENCY_ADDRESS = 10;

    // If Latency fields are present
    if (vendorBlock.latencyPresent && (blockLength >= AUDIO_LATENCY_ADDRESS)) {
        var VIDEO_LATENCY_ADDRESS = 9;
        vendorBlock.videoLatency = ((this.edidData[vsdbAddress + VIDEO_LATENCY_ADDRESS] - 1) *
            2);
        vendorBlock.audioLatency = ((this.edidData[vsdbAddress + AUDIO_LATENCY_ADDRESS] - 1) *
            2);
    }

    // If Interlaced Latency fields are present
    if (vendorBlock.iLatencyPresent && (blockLength >= AUDIO_LATENCY_ADDRESS)) {
        var I_VIDEO_LATENCY_ADDRESS = 11;
        vendorBlock.iVideoLatency = ((this.edidData[vsdbAddress + I_VIDEO_LATENCY_ADDRESS] - 1) *
            2);

        var I_AUDIO_LATENCY_ADDRESS = 12;
        vendorBlock.iAudioLatency = ((this.edidData[vsdbAddress + I_AUDIO_LATENCY_ADDRESS] - 1) *
            2);
    }

    return vendorBlock;
};


edidparser.prototype.parseVendorDataBlockHDMI20 = function(startAddress, blockLength, vendorBlock) {
    // Subtract one, so the indexing matches the HDMI Specification
    var vsdbAddress = startAddress - 1;

    var FIELD_ADDRESS = 0;
    var FIELD_MASK = 0x0;

    FIELD_ADDRESS = 4;
    // VSDB version for HDMI Forum
    vendorBlock.versionHF = this.edidData[vsdbAddress + FIELD_ADDRESS];

    FIELD_ADDRESS = 5;
    vendorBlock.maxTmdsRateHF = this.edidData[vsdbAddress + FIELD_ADDRESS] * 5;

    FIELD_ADDRESS = 6;
    FIELD_MASK = 0x80;
    vendorBlock.supportsSCDC = this.edidData[vsdbAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 6;
    FIELD_MASK = 0x40;
    vendorBlock.supportsSCDCRR = this.edidData[vsdbAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 6;
    FIELD_MASK = 0x08;
    vendorBlock.supportsLTE340scramble = this.edidData[vsdbAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 6;
    FIELD_MASK = 0x04;
    vendorBlock.supports3DIV = this.edidData[vsdbAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 6;
    FIELD_MASK = 0x02;
    vendorBlock.supports3DDV = this.edidData[vsdbAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 6;
    FIELD_MASK = 0x01;
    vendorBlock.supports3DOSD = this.edidData[vsdbAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 7;
    FIELD_MASK = 0x04;
    vendorBlock.deepColorY42030 = this.edidData[vsdbAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 7;
    FIELD_MASK = 0x02;
    vendorBlock.deepColorY42030 = this.edidData[vsdbAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 7;
    FIELD_MASK = 0x01;
    vendorBlock.deepColorY42030 = this.edidData[vsdbAddress + FIELD_ADDRESS] & FIELD_MASK;

    return vendorBlock;
};


edidparser.prototype.parseVendorDataBlock = function(startAddress, blockLength) {
    var vendorBlock = {};
    vendorBlock.tag = this.dataBlockType.VENDOR_SPECIFIC;
    vendorBlock.length = blockLength;

    // Subtract one, so the indexing matches the HDMI Specification
    var vsdbAddress = startAddress - 1;

    var IEEE_REG_IDENTIFIER_1 = 1;
    var IEEE_REG_IDENTIFIER_2 = 2;
    var IEEE_REG_IDENTIFIER_3 = 3;
    // 24-bit IEEE Registration Identifier
    vendorBlock.ieeeIdentifier = (this.edidData[vsdbAddress + IEEE_REG_IDENTIFIER_3] << 16) +
        (this.edidData[vsdbAddress + IEEE_REG_IDENTIFIER_2] << 8) +
        (this.edidData[vsdbAddress + IEEE_REG_IDENTIFIER_1]);

    if (vendorBlock.ieeeIdentifier === this.ieeeOuiType.HDMI14.value) {
        // HDMI 1.4 VSDB
        return this.parseVendorDataBlockHDMI14(startAddress, blockLength, vendorBlock);
    } else if (vendorBlock.ieeeIdentifier === this.ieeeOuiType.HDMI20.value) {
        // HDMI 2.0 VSDB
        return this.parseVendorDataBlockHDMI20(startAddress, blockLength, vendorBlock);
    }

    return vendorBlock;
};

edidparser.prototype.parseVideoCapabilityDataBlock = function(startAddress, blockLength, extendedTagBlock) {
    extendedTagBlock.extendedTag = this.extendedDataBlockType.VIDEO_CAPABILITY;

    var FIELD_ADDRESS = 0;
    var FIELD_MASK = 0x0;
    var FIELD_SHIFT = 0;
    var fieldData = 0;

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x80;
    extendedTagBlock.quantizationRangeYCC = this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x40;
    extendedTagBlock.quantizationRangeRGB = this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x30;
    FIELD_SHIFT = 4;
    fieldData = (this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK) / FIELD_SHIFT;
    extendedTagBlock.overscanPT = this.overscanBehavior[fieldData];

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x0C;
    FIELD_SHIFT = 2;
    fieldData = (this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK) / FIELD_SHIFT;
    extendedTagBlock.overscanIT = this.overscanBehavior[fieldData];

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x03;
    FIELD_SHIFT = 0;
    fieldData = (this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK) / FIELD_SHIFT;
    extendedTagBlock.overscanCE = this.overscanBehavior[fieldData];

    return extendedTagBlock;
};

edidparser.prototype.parseColorimetryDataBlock = function(startAddress, blockLength, extendedTagBlock) {
    extendedTagBlock.extendedTag = this.extendedDataBlockType.COLORIMETRY;

    var FIELD_ADDRESS = 0;
    var FIELD_MASK = 0x0;

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x80;
    extendedTagBlock.supportsBT2020RGB = this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x40;
    extendedTagBlock.supportsBT2020YCC = this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x20;
    extendedTagBlock.supportsBT2020cYCC = this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x10;
    extendedTagBlock.supportsAdobeRGB = this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x08;
    extendedTagBlock.supportsAdobeYCC601 = this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x04;
    extendedTagBlock.supportssYCC601 = this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x02;
    extendedTagBlock.supportsxvYCC709 = this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 1;
    FIELD_MASK = 0x01;
    extendedTagBlock.supportsxvYCC601 = this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK;

    FIELD_ADDRESS = 2;
    FIELD_MASK = 0x08;
    extendedTagBlock.gamutMD3 = (this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK) ? 1 : 0;

    FIELD_ADDRESS = 2;
    FIELD_MASK = 0x04;
    extendedTagBlock.gamutMD2 = (this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK) ? 1 : 0;

    FIELD_ADDRESS = 2;
    FIELD_MASK = 0x02;
    extendedTagBlock.gamutMD1 = (this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK) ? 1 : 0;

    FIELD_ADDRESS = 2;
    FIELD_MASK = 0x01;
    extendedTagBlock.gamutMD0 = (this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK) ? 1 : 0;

    return extendedTagBlock;
};

edidparser.prototype.parseYCbCr420VideoDataBlock = function(startAddress, blockLength, extendedTagBlock) {
    extendedTagBlock.extendedTag = this.extendedDataBlockType.YCBCR420_VIDEO;

    var svdIndex = 0;

    var NATIVE_RESOLUTION_MASK = 0x80;
    var CEA861F_VIC_MASK = 0x40;
    var LOW_VIC_MASK = 0x3F;
    var HIGH_VIC_MASK = 0xFF;

    /*
     * SVDs listed in this block support only YCbCr 4:2:0 color format.
     * These SVDs are not listed in the standard Video data block.
     */
    extendedTagBlock.YCbCr420OnlyShortVideoDescriptors = [];

    for (svdIndex = 0; svdIndex < (blockLength - 1); svdIndex += 1) {
        var shortVideoDescriptor = {};
        // Add 1 as this is an extended tag data block
        var dataByte = this.edidData[startAddress + 1 + svdIndex];
        if ((dataByte & CEA861F_VIC_MASK) > 0) {
            shortVideoDescriptor.vic = dataByte & HIGH_VIC_MASK;
            shortVideoDescriptor.nativeResolution = false;
        } else {
            shortVideoDescriptor.vic = dataByte & LOW_VIC_MASK;
            shortVideoDescriptor.nativeResolution = dataByte & NATIVE_RESOLUTION_MASK;
        }
        extendedTagBlock.YCbCr420OnlyShortVideoDescriptors[svdIndex] = shortVideoDescriptor;
    }

    return extendedTagBlock;
};

edidparser.prototype.parseYCbCr420CapabilityMapDataBlock = function(startAddress, blockLength, extendedTagBlock) {
    extendedTagBlock.extendedTag = this.extendedDataBlockType.YCBCR420_CAPABILITY_MAP;

    var FIELD_ADDRESS = 0;
    var FIELD_MASK = 0x0;
    var svdIndex = 0;
    var YCbCr420Capable = false;
    var YCbCr420svdIndex = 0;

    /*
     * YCbCr420 Capability Map block contains a bit map of SVDs from the Video block
     * If a bit is set to '1', the corresponding SVD supports YCbCr 4:2:0 color format
     * This data block is only used for SVDs which support 4:2:0 and some other colour
     * Format (e.g. 4:2:2).
     * For SVDs which support only 4:2:0, YCbCr 4:2:0 Video data block is used.
     */
    extendedTagBlock.YCbCr420CapableShortVideoDescriptors = [];

    for (FIELD_ADDRESS = 1; FIELD_ADDRESS < blockLength; FIELD_ADDRESS += 1) {
        for (FIELD_MASK = 0x01; FIELD_MASK <= 0x80; FIELD_MASK *= 1) {
            YCbCr420Capable = this.edidData[startAddress + FIELD_ADDRESS] & FIELD_MASK;
            if (YCbCr420Capable) {
                extendedTagBlock.YCbCr420CapableShortVideoDescriptors[YCbCr420svdIndex] = this.videoBlock.shortVideoDescriptors[svdIndex];
                YCbCr420svdIndex += 1;
            }
            svdIndex += 1;
        }
    }

    return extendedTagBlock;
};

edidparser.prototype.parseSpeakerDataBlock = function(startAddress, blockLength) {
    var speakerBlock = {};
    speakerBlock.tag = this.dataBlockType.SPEAKER_ALLOCATION;
    speakerBlock.length = blockLength;

    speakerBlock.payload = (this.edidData[startAddress + 2] << 16) +
        (this.edidData[startAddress + 1] << 8) +
        (this.edidData[startAddress]);

    return speakerBlock;
};

edidparser.prototype.parseExtendedTagDataBlock = function(startAddress, blockLength) {
    var extendedTagBlock = {};
    extendedTagBlock.tag = this.dataBlockType.EXTENDED_TAG;
    extendedTagBlock.length = blockLength;

    var EXTENDED_TAG_ADDRESS = 0;

    var extendedBlockTagCode = this.edidData[startAddress + EXTENDED_TAG_ADDRESS];

    if (extendedBlockTagCode === this.extendedDataBlockType.VIDEO_CAPABILITY.value) {
        return this.parseVideoCapabilityDataBlock(startAddress, blockLength, extendedTagBlock);
    } else if (extendedBlockTagCode === this.extendedDataBlockType.COLORIMETRY.value) {
        return this.parseColorimetryDataBlock(startAddress, blockLength, extendedTagBlock);
    } else if (extendedBlockTagCode === this.extendedDataBlockType.YCBCR420_VIDEO.value) {
        return this.parseYCbCr420VideoDataBlock(startAddress, blockLength, extendedTagBlock);
    } else if (extendedBlockTagCode === this.extendedDataBlockType.YCBCR420_CAPABILITY_MAP.value) {
        return this.parseYCbCr420CapabilityMapDataBlock(startAddress, blockLength, extendedTagBlock);
    }

    extendedTagBlock.extendedTag = this.edidData[startAddress + EXTENDED_TAG_ADDRESS];

    return extendedTagBlock;
};

edidparser.prototype.getExtChecksum = function(extIndex) {
    var BLOCK_OFFSET = this.EDID_BLOCK_LENGTH * (extIndex + 1);
    var CHECKSUM_OFFSET = 127;

    return this.edidData[BLOCK_OFFSET + CHECKSUM_OFFSET];
};

edidparser.prototype.getExtDtds = function(extIndex, startAddress) {
    var BLOCK_OFFSET = this.EDID_BLOCK_LENGTH * (extIndex + 1);
    var dtdArray = [];
    var dtdCounter = 0;
    var dtdIndex = startAddress + BLOCK_OFFSET;
    var endAddress = (this.EDID_BLOCK_LENGTH * (extIndex + 2)) - 2;

    while (((this.edidData[dtdIndex] !== 0) || (this.edidData[dtdIndex + 1] !== 0)) &&
        (dtdIndex < endAddress)) {
        // DetailedTimingDescriptions.detailedTiming.getDetailedTiming(dtdIndex);
        var dtd = 0;
        // Add DTD to the DTD Array
        dtdArray[dtdCounter] = dtd;
        // Increment DTD Counter
        dtdCounter += 1;
        // Add a DTD length, to go to the next descriptor
        dtdIndex += this.DTD_LENGTH;
    }
    return dtdArray;
};

module.exports = edidparser;
