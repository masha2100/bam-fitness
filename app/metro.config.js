const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  'react-dom': require.resolve('react-native'),
};

module.exports = config;