'use strict';

var React = require('react');
var PropTypes = require('../src/ValidatorPropTypes');
var _ = require('lodash');


var errorPrefix = 'Warning: Failed propType: ';

var getRequiredPropTypeError = function (propName, componentName) {
    return errorPrefix + `Required \`${propName}\` was not specified in \`${componentName}\`.`;
};

var getPropTypeError = function (propName, componentName) {
    return errorPrefix + `Invalid \`${propName}\` was specified in \`${componentName}\`.`
};

var propTypes = {
    email: PropTypes.email,
    url: PropTypes.url,
    fqdn: PropTypes.fqdn,
    ip: PropTypes.ip,
    alpha: PropTypes.alpha,
    numeric: PropTypes.numeric,
    alphanumeric: PropTypes.alphanumeric,
    base64: PropTypes.base64,
    hexadecimal: PropTypes.hexadecimal,
    hexColor: PropTypes.hexColor,
    lowercase: PropTypes.lowercase,
    uppercase: PropTypes.uppercase,
    int: PropTypes.int,
    float: PropTypes.float,
    uuid: PropTypes.uuid,
    date: PropTypes.date,
    creditCard: PropTypes.creditCard,
    json: PropTypes.json,
    multibyte: PropTypes.multibyte,
    ascii: PropTypes.ascii,
    fullWidth: PropTypes.fullWidth,
    halfWidth: PropTypes.halfWidth,
    variableWidth: PropTypes.variableWidth,
    surrogatePair: PropTypes.surrogatePair,
    mongoId: PropTypes.mongoId,
    currency: PropTypes.currency
};

var propTypesRequired = {};
for (var k in propTypes) {
    propTypesRequired[k] = propTypes[k].isRequired;
}

var Component = React.createClass({
    propTypes: propTypes,
    render: function () {
        return null;
    }
});

var RequiredComponent = React.createClass({
    propTypes: propTypesRequired,
    render: function () {
        return null;
    }
});

describe('propTypes', function () {
    beforeEach(function () {
        this.warnings = [];
        this.warn = console.warn;
        console.warn = function (msg) {
            this.warnings.push(msg);
        }.bind(this);
    });
    afterEach(function () {
        console.warn = this.warn;
    });

    it('makes sure all propTypes can pass', function () {
        var props = {
            email: 'pwmckenna@gmail.com',
            url: 'http://pwmckenna.com/',
            fqdn: 'pwmckenna.com',
            ip: '4.2.2.2',
            alpha: 'alpha',
            numeric: '4222',
            alphanumeric: 'alpha4222',
            hexColor: '#ffffff',
            lowercase: 'lower',
            uppercase: 'UPPER',
            int: 4222,
            float: 4222.4222
        };
        React.renderToString(
            <Component {...props} />
        );
        if (this.warnings.length) {
            throw new Error('did not expected warnings for valid proptypes');
        }
    });

    it('makes sure all propTypes can fail', function () {
        var props = {
            email: NaN,
            url: NaN,
            fqdn: NaN,
            ip: NaN,
            alpha: NaN,
            numeric: NaN,
            alphanumeric: NaN,
            hexColor: NaN,
            lowercase: 'NaN',
            uppercase: 'nan',
            int: NaN,
            float: NaN
        };
        React.renderToString(
            <Component {...props} />
        );
        _.each(props, function (value, key) {
            if (!_.contains(this.warnings, getPropTypeError(key, 'Component'))) {
                throw new Error('expected to see prop type warnings for ' + key + ' printed to console.warn');
            }
        }, this);
    });
    it('tests required propTypes', function () {
        React.renderToString(
            // make sure to set a prop to null to ensure that null does not satisfy isRequired
            <RequiredComponent email={null}/>
        );
        _.each(propTypes, function (value, key) {
            if (!_.contains(this.warnings, getRequiredPropTypeError(key, 'RequiredComponent'))) {
                throw new Error('expected to see required prop type warnings for ' + key + ' printed to console.warn');
            }
        }, this);
    })
});
