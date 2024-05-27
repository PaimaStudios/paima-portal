/* config-overrides.js */

const webpack = require("webpack");
const path = require("path");

module.exports = function override(config, env) {
  const wasmExtensionRegExp = /\.wasm$/;
  config.resolve.extensions.push(".wasm");
  config.experiments = {
    asyncWebAssembly: true,
  };
  config.resolve.fallback = {
    buffer: require.resolve("buffer/"),
    stream: false,
  };
  config.module.rules.forEach((rule) => {
    (rule.oneOf || []).forEach((oneOf) => {
      if (oneOf.type === "asset/resource") {
        oneOf.exclude.push(wasmExtensionRegExp);
      }
    });
  });
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  );
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.ignoreWarnings = [/Failed to parse source map/];
  config.resolve.alias = {
    ...config.resolve.alias,
    '@abis': path.resolve(__dirname, 'src/abis'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@config': path.resolve(__dirname, 'src/config'),
    '@dialogs': path.resolve(__dirname, 'src/dialogs'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  };
  return config;
};
