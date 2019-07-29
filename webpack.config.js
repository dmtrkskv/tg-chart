const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
    devtool: NODE_ENV === "development" ? 'inline-source-map' : false,
    entry: "./app/index.js",
    output: {
        filename: "bundle.js"
    }
};