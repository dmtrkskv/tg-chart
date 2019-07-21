// var path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: "./app/index.js",
    output: {
        filename: "bundle.js"
    },
    mode: 'development'
};