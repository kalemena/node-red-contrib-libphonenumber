const PNF = require('google-libphonenumber').PhoneNumberFormat;
const CCS = require('google-libphonenumber').PhoneNumber.CountryCodeSource;
const PhoneNumberType = require('google-libphonenumber').PhoneNumberType;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const shortInfo = require('google-libphonenumber').ShortNumberInfo.getInstance();

module.exports = function(RED) {
    function PhoneNumberNode(config) {
        RED.nodes.createNode(this,config);

        this.defaultCountryLetters = config.defaultCountryLetters || ''
        //this.language = config.language || ''
        //this.regionDialingFrom = config.regionDialingFrom || ''
        //this.regionCode = config.regionCode || ''
        //this.outOfCountryFormatFromLetters = config.outOfCountryFormatFromLetters || ''

        var node = this;
        this.on('input', function(msg) {
            
            const number = phoneUtil.parseAndKeepRawInput(msg.payload, node.defaultCountryLetters);
                       
            msg.phone = {};
            msg.phone.CountryCode = number.getCountryCode();
            msg.phone.NationalNumber = number.getNationalNumber();
            msg.phone.Extension = number.getExtension() != null ? number.getExtension() : '';
            countryCodeSource = number.getCountryCodeSource();
            switch(countryCodeSource) {
                case CCS.FROM_NUMBER_WITH_PLUS_SIGN:
                    msg.phone.CountryCodeSource = 'FROM_NUMBER_WITH_PLUS_SIGN';
                    break;
                case CCS.FROM_NUMBER_WITH_IDD:
                    msg.phone.CountryCodeSource = 'FROM_NUMBER_WITH_IDD';
                    break;
                case CCS.FROM_NUMBER_WITHOUT_PLUS_SIGN:
                    msg.phone.CountryCodeSource = 'FROM_NUMBER_WITHOUT_PLUS_SIGN';
                    break;
                case CCS.FROM_DEFAULT_COUNTRY:
                    msg.phone.CountryCodeSource = 'FROM_DEFAULT_COUNTRY';
                    break;
                case CCS.UNSPECIFIED:
                default:
                    msg.phone.CountryCodeSource = 'UNSPECIFIED';
            }

            msg.phone.ItalianLeadingZero = (number.getItalianLeadingZero() != null ? number.getItalianLeadingZero() : false);
            msg.phone.RawInput = number.getRawInput();
            msg.phone.isPossibleNumber = phoneUtil.isPossibleNumber(number);
            msg.phone.isValidNumber = phoneUtil.isValidNumber(number);
            //msg.phone.isValidShortNumber = phoneUtil.isValidShortNumber(number);
            //msg.phone.isValidShortNumberForRegion = phoneUtil.isValidShortNumberForRegion(number, node.regionDialingFrom);
            //msg.phone.isValidNumberForRegion = phoneUtil.isValidNumberForRegion(number, node.regionDialingFrom);
            msg.phone.RegionCodeForNumber = phoneUtil.getRegionCodeForNumber(number);
            numberType = phoneUtil.getNumberType(number);
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
            
            msg.phone.E164 = phoneUtil.format(number, PNF.E164);
            msg.phone.INTERNATIONAL = phoneUtil.format(number, PNF.INTERNATIONAL);
            msg.phone.NATIONAL = phoneUtil.format(number, PNF.NATIONAL);
            msg.phone.RFC3966 = phoneUtil.format(number, PNF.RFC3966);
            msg.phone.OriginalFormat = phoneUtil.formatInOriginalFormat(number, node.defaultCountryLetters);

            //msg.phone.OutOfCountryCallingNumber = phoneUtil.formatOutOfCountryCallingNumber(number, node.outOfCountryLetters);
            //msg.phone.connectsToEmergencyNumber = shortInfo.connectsToEmergencyNumber(msg.payload, node.defaultCountryLetters);
            //msg.phone.isPossibleShortNumber = shortInfo.isPossibleShortNumber(phoneUtil.parse(msg.payload, node.defaultCountryLetters));
            //msg.phone.isPossibleShortNumberForRegion = shortInfo.isPossibleShortNumberForRegion(number, node.defaultCountryLetters);

            node.send(msg);
        });
    }
    RED.nodes.registerType("phonenumber",PhoneNumberNode);
}