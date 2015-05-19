# react-validator-prop-types
[React PropType](https://facebook.github.io/react/docs/reusable-components.html#prop-validation) wrappers around [validator.js functions](https://github.com/chriso/validator.js#validators).

## What problem does this solve

Great validation libraries already exist, but the default set of React PropTypes is pretty sparse by comparison. This just wraps the popular validator.js library into prop types that support the `isRequired` convention.

## Usage
```js
var ValidatorPropTypes = require('react-validator-prop-types');
React.createClass({
  propTypes: {
    background: ValidatorPropTypes.hexColor,
    email: ValidatorPropTypes.email.isRequired,
    username: ValidatorPropTypes.lowercase.isRequired,
  }
  ...
});
```
The following prop types are available:
- email
- url
- fqdn
- ip
- alpha
- numeric
- alphanumeric
- base64
- hexadecimal
- hexColor
- lowercase
- uppercase
- int
- float
- uuid
- date
- creditCard
- json
- multibyte
- ascii
- fullWidth
- halfWidth
- variableWidth
- surrogatePair
- mongoId
- currency

## Missing functions ?

There's no easy way to wrap validator functions that take multiple, or optional arguments. This is why functions like `isMobilePhone` aren't supported (because of the `locale` argument). Suggestions for an api for those are encouraged.

## Acknowledgements

Thanks to [Chris O'Hara](https://github.com/chriso) for [validator.js](https://github.com/chriso/validator.js).
