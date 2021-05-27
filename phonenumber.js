const PNF = require('google-libphonenumber').PhoneNumberFormat;
const CountryCodeSource = require('google-libphonenumber').PhoneNumber.CountryCodeSource;
const PhoneNumberType = require('google-libphonenumber').PhoneNumberType;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const shortInfo = require('google-libphonenumber').ShortNumberInfo.getInstance();

//const geocoder = require('google-libphonenumber').PhoneNumberOfflineGeocoder.getInstance();
//const carrierMapper = require('google-libphonenumber').PhoneNumberToCarrierMapper.getInstance();
//const phoneNumberToTimeZonesMapper = require('google-libphonenumber').PhoneNumberToTimeZonesMapper.getInstance();

module.exports = function(RED) {
    function PhoneNumberNode(config) {
        RED.nodes.createNode(this,config);

        this.defaultCountryLetters = config.defaultCountryLetters || ''
        this.regionDialingFrom = config.regionDialingFrom || ''
        //this.language = config.language || ''        
        //this.regionCode = config.regionCode || ''
        //this.outOfCountryFormatFromLetters = config.outOfCountryFormatFromLetters || ''

        var node = this;
        this.on('input', function(msg) {
            
            node.defaultCountryLetters = msg.defaultCountryLetters || node.defaultCountryLetters;
            node.regionDialingFrom = msg.regionDialingFrom || node.regionDialingFrom;

            const number = phoneUtil.parseAndKeepRawInput(msg.payload, node.defaultCountryLetters);
                       
            msg.phone = {};
            msg.phone.CountryCode = number.getCountryCode();
            msg.phone.NationalNumber = number.getNationalNumber();
            msg.phone.Extension = number.getExtension() || '';
            countryCodeSource = number.getCountryCodeSource();
            switch(countryCodeSource) {
                case CountryCodeSource.FROM_NUMBER_WITH_PLUS_SIGN:
                    msg.phone.CountryCodeSource = 'FROM_NUMBER_WITH_PLUS_SIGN';
                    break;
                case CountryCodeSource.FROM_NUMBER_WITH_IDD:
                    msg.phone.CountryCodeSource = 'FROM_NUMBER_WITH_IDD';
                    break;
                case CountryCodeSource.FROM_NUMBER_WITHOUT_PLUS_SIGN:
                    msg.phone.CountryCodeSource = 'FROM_NUMBER_WITHOUT_PLUS_SIGN';
                    break;
                case CountryCodeSource.FROM_DEFAULT_COUNTRY:
                    msg.phone.CountryCodeSource = 'FROM_DEFAULT_COUNTRY';
                    break;
                case CountryCodeSource.UNSPECIFIED:
                default:
                    msg.phone.CountryCodeSource = 'UNSPECIFIED';
            }

            msg.phone.ItalianLeadingZero = number.getItalianLeadingZero() || false;
            msg.phone.RawInput = number.getRawInput();
            msg.phone.isPossibleNumber = phoneUtil.isPossibleNumber(number);
            msg.phone.isValidNumber = phoneUtil.isValidNumber(number);
            //msg.phone.isValidShortNumber = phoneUtil.isValidShortNumber(number);
            if(node.regionDialingFrom) {
                // msg.phone['isValidShortNumberForRegion' + node.regionDialingFrom] = phoneUtil.isValidShortNumberForRegion(number, node.regionDialingFrom);
                msg.phone['isValidNumberForRegion' + node.regionDialingFrom] = phoneUtil.isValidNumberForRegion(number, node.regionDialingFrom);
            }            
            msg.phone.RegionCodeForNumber = phoneUtil.getRegionCodeForNumber(number);
            numberType = phoneUtil.getNumberType(number);

            msg.phone.E164 = phoneUtil.format(number, PNF.E164);
            msg.phone.INTERNATIONAL = phoneUtil.format(number, PNF.INTERNATIONAL);
            msg.phone.NATIONAL = phoneUtil.format(number, PNF.NATIONAL);
            msg.phone.RFC3966 = phoneUtil.format(number, PNF.RFC3966);
            msg.phone.OriginalFormat = phoneUtil.formatInOriginalFormat(number, node.defaultCountryLetters);

            //msg.geocoder = geocoder.getDescriptionForNumber(number, node.defaultCountryLetters);
            //msg.carrier = carrierMapper.getNameForNumber(number, node.defaultCountryLetters);

            switch(numberType) {
                case PhoneNumberType.FIXED_LINE:
                    msg.phone.NumberType = 'FIXED_LINE';
                    break;
                case PhoneNumberType.MOBILE:
                    msg.phone.NumberType = 'MOBILE';
                    break;
                case PhoneNumberType.FIXED_LINE_OR_MOBILE:
                    msg.phone.NumberType = 'FIXED_LINE_OR_MOBILE';
                    break;
                case PhoneNumberType.TOLL_FREE:
                    msg.phone.NumberType = 'TOLL_FREE';
                    break;
                case PhoneNumberType.PREMIUM_RATE:
                    msg.phone.NumberType = 'PREMIUM_RATE';
                    break;
                case PhoneNumberType.SHARED_COST:
                    msg.phone.NumberType = 'SHARED_COST';
                    break;
                case PhoneNumberType.VOIP:
                    msg.phone.NumberType = 'VOIP';
                    break;
                case PhoneNumberType.PERSONAL_NUMBER:
                    msg.phone.NumberType = 'PERSONAL_NUMBER';
                    break;
                case PhoneNumberType.PAGER:
                    msg.phone.NumberType = 'PAGER';
                    break;
                case PhoneNumberType.UAN:
                    msg.phone.NumberType = 'UAN';
                    break;
                case PhoneNumberType.VOICEMAIL:
                    msg.phone.NumberType = 'VOICEMAIL';
                    break;
                case PhoneNumberType.UNKNOWN:
                default:
                    msg.phone.NumberType = 'UNKNOWN';
                    break;
            }
            
            //msg.phone.OutOfCountryCallingNumber = phoneUtil.formatOutOfCountryCallingNumber(number, node.outOfCountryLetters);
            //msg.phone.connectsToEmergencyNumber = shortInfo.connectsToEmergencyNumber(msg.payload, node.defaultCountryLetters);
            //msg.phone.isPossibleShortNumber = shortInfo.isPossibleShortNumber(phoneUtil.parse(msg.payload, node.defaultCountryLetters));
            //msg.phone.isPossibleShortNumberForRegion = shortInfo.isPossibleShortNumberForRegion(number, node.defaultCountryLetters);

            node.send(msg);
        });
    }
    RED.nodes.registerType("phonenumber",PhoneNumberNode);
}