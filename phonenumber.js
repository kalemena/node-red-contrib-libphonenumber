const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
 
module.exports = function(RED) {
    function PhoneNumberNode(config) {
        RED.nodes.createNode(this,config);

        this.defaultCountry = config.defaultCountry || ''

        var node = this;
        this.on('input', function(msg) {
            
            // Parse number with country code and keep raw input.
            const number = phoneUtil.parseAndKeepRawInput(msg.payload, node.defaultCountry);
            
            msg.phone = {};
            msg.phone.CountryCode = number.getCountryCode();
            msg.phone.NationalNumber = number.getNationalNumber();
            msg.phone.Extension = number.getExtension();
            msg.phone.CountryCodeSource = number.getCountryCodeSource();
            msg.phone.ItalianLeadingZero = number.getItalianLeadingZero();
            msg.phone.RawInput = number.getRawInput();
            msg.phone.isPossibleNumber = phoneUtil.isPossibleNumber(number);
            msg.phone.isValidNumber = phoneUtil.isValidNumber(number);
            msg.phone.isValidNumberForRegion = phoneUtil.isValidNumberForRegion(number, 'US');
            msg.phone.RegionCodeForNumber = phoneUtil.getRegionCodeForNumber(number);
            msg.phone.NumberType = phoneUtil.getNumberType(number);
            msg.phone.E164 = phoneUtil.format(number, PNF.E164);
            msg.phone.OriginalFormat = phoneUtil.formatInOriginalFormat(number, 'US');
            msg.phone.NationalFormat = phoneUtil.format(number, PNF.NATIONAL);
            msg.phone.InternationalFormat = phoneUtil.format(number, PNF.INTERNATIONAL);
            msg.phone.OutOfCountryCallingNumberUS = phoneUtil.formatOutOfCountryCallingNumber(number, 'US');
            msg.phone.OutOfCountryCallingNumberCH = phoneUtil.formatOutOfCountryCallingNumber(number, 'CH');

            node.send(msg);
        });
    }
    RED.nodes.registerType("phonenumber",PhoneNumberNode);
}