module.exports = {
    defaultSyntax: require('./default'),
    Syntax: require('./syntax'),
    create: require('./syntax').create,
    parse: require('./parse'),
    stringify: require('./stringify'),
    walk: require('./walk')
};
