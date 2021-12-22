const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = override(
    (config) => {
        config.resolve.alias = {
          "@": path.resolve(__dirname, "src"),
        };
        config.devtool = false; //去掉map文件
        return config;
    },
)