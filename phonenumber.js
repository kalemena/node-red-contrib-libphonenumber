const PNF = require('google-libphonenumber').PhoneNumberFormat;
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
            msg.phone.Extension = number.getExtension();
            msg.phone.CountryCodeSource = number.getCountryCodeSource();
            msg.phone.ItalianLeadingZero = number.getItalianLeadingZero();
            msg.phone.RawInput = number.getRawInput();
            msg.phone.isPossibleNumber = phoneUtil.isPossibleNumber(number);
            msg.phone.isValidNumber = phoneUtil.isValidNumber(number);
            //msg.phone.isValidShortNumber = phoneUtil.isValidShortNumber(number);
            //msg.phone.isValidShortNumberForRegion = phoneUtil.isValidShortNumberForRegion(number, node.regionDialingFrom);
            //msg.phone.isValidNumberForRegion = phoneUtil.isValidNumberForRegion(number, node.regionDialingFrom);
            msg.phone.RegionCodeForNumber = phoneUtil.getRegionCodeForNumber(number);
            msg.phone.NumberType = phoneUtil.getNumberType(number);
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