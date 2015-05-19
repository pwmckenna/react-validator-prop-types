var ReactTools = require('react-tools');
var babel = require('babel-jest');

module.exports = {
    process: function(src, filename) {
        return babel.process(ReactTools.transform(src, filename), filename);
    }
};