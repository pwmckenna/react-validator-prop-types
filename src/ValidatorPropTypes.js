'use strict';

var validator = require('validator');

var checkType = function (fn, isRequired, props, propName, componentName) {
    if (props[propName] == null) {
        if (isRequired) {
            return new Error(`Required \`${propName}\` was not specified in \`${componentName}\`.`);
        }
        return;
    }

    if (!fn(props[propName])) {
        return new Error(`Invalid \`${propName}\` was specified in \`${componentName}\`.`);
    }
};

var createPropType = function (validatorFn) {
    var propType = checkType.bind(null, validatorFn, false);
    propType.isRequired = checkType.bind(null, validatorFn, true);
    return propType;
};

var map = {
    email: 'isEmail',
    url: 'isURL',
    fqdn: 'isFQDN',
    ip: 'isIP',
    alpha: 'isAlpha',
    numeric: 'isNumeric',
    alphanumeric: 'isAlphanumeric',
    base64: 'isBase64',
    hexadecimal: 'isHexadecimal',
    hexColor: 'isHexColor',
    lowercase: 'isLowercase',
    uppercase: 'isUppercase',
    int: 'isInt',
    float: 'isFloat',
    uuid: 'isUUID',
    date: 'isISO8601',
    creditCard: 'isCreditCard',
    json: 'isJSON',
    multibyte: 'isMultibyte',
    ascii: 'isAscii',
    fullWidth: 'isFullWidth',
    halfWidth: 'isHalfWidth',
    variableWidth: 'isVariableWidth',
    surrogatePair: 'isSurrogatePair',
    mongoId: 'isMongoId',
    currency: 'isCurrency'
};

for (var key in map) {
    var functionName = map[key];
    if (!validator.hasOwnProperty(functionName)) {
        throw new Error('validator.' + functionName + ' is not a function');
    }
    module.exports[key] = createPropType(validator[functionName]);
}
