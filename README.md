# node-red-contrib-libphonenumber

<p>A Node Red wrapper around Google Lib Phone Number</p>
<p>Parses, validates and converts a phone number.</p>
<p>This node wraps default capabilities.</p>
<p>See details and meaning of outputs at <a href="https://www.npmjs.com/package/google-libphonenumber">Google-LibPhoneNumber</a></p>

<h3>Inputs</h3>
    <dl class="message-properties">
        <dt>payload
            <span class="property-type">string | buffer</span>
        </dt>
        <dd> the raw phone number. </dd>            
    </dl>
    <dl class="message-properties">
        <dt>msg.defaultCountryLetters
            <span class="property-type">string | buffer</span>
        </dt>
        <dd> the default country number formating. </dd>            
    </dl>
    <dl class="message-properties">
        <dt>msg.regionDialingFrom
            <span class="property-type">string | buffer</span>
        </dt>
        <dd> Optional. If provided, msg.phone.isValidNumberForRegion&lt;region&gt; is returned.</dd>            
    </dl>
<h3>Outputs</h3>
    <dl class="message-properties">
        <dt>msg.phone
            <span class="property-type">string | buffer</span>
        </dt>
        <dd> Parsed number info with various details.</dd>            
    </dl>
<p>See details and meaning of outputs at <a href="https://www.npmjs.com/package/google-libphonenumber">Google-LibPhoneNumber</a></p>

# Installation

From node-red home directory, run below command:

```bash
$ npm -i node-red-contrib-libphonenumber
```

# Example

## Screenshot

![Basic parse flow](/example/example.png)

## Sample output

```json
{
    "_msgid":"58c04e91.b1f0a",
    "topic":"","payload":"0123456789",
    "phone":{
        "CountryCode":33,
        "NationalNumber":123456789,
        "Extension":"",
        "CountryCodeSource":"FROM_DEFAULT_COUNTRY",
        "ItalianLeadingZero":false,
        "RawInput":"0123456789",
        "isPossibleNumber":true,
        "isValidNumber":true,
        "isValidNumberForRegionGB":false,
        "RegionCodeForNumber":"FR",
        "NumberType":"FIXED_LINE",
        "E164":"+33123456789",
        "INTERNATIONAL":"+33 1 23 45 67 89",
        "NATIONAL":"01 23 45 67 89",
        "RFC3966":"tel:+33-1-23-45-67-89",
        "OriginalFormat":"01 23 45 67 89"
    }
}
```

## Flow

```json
[
    {
        "id": "ff7d7036.5206",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": ""
    },
    {
        "id": "d93be7de.37c7c",
        "type": "phonenumber",
        "z": "ff7d7036.5206",
        "name": "Parse Phone Number",
        "defaultCountryLetters": "FR",
        "regionDialingFrom": "GB",
        "x": 660,
        "y": 120,
        "wires": [
            [
                "29b6bc91.33599c"
            ]
        ]
    },
    {
        "id": "6eb1095d.89e388",
        "type": "inject",
        "z": "ff7d7036.5206",
        "name": "",
        "topic": "",
        "payload": "0123456789",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 370,
        "y": 120,
        "wires": [
            [
                "d93be7de.37c7c"
            ]
        ]
    },
    {
        "id": "29b6bc91.33599c",
        "type": "debug",
        "z": "ff7d7036.5206",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "x": 890,
        "y": 120,
        "wires": []
    }
]
```
