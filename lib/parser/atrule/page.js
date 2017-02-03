var TYPE = require('../../scanner').TYPE;
var LEFTCURLYBRACKET = TYPE.LeftCurlyBracket;

module.exports = {
    expression: function() {
        if (this.scanner.lookupNonWSType(0) === LEFTCURLYBRACKET) {
            return null;
        }

        return this.SelectorList();
    },
    block: function() {
        return this.Block(this.Declaration);
    }
};