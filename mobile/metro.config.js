const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for shared package
config.resolver.nodeModulesPaths = [
  ...config.resolver.nodeModulesPaths,
  '../shared/node_modules',
];

// Enable symlinks for monorepo
config.resolver.unstable_enableSymlinks = true;

module.exports = config;