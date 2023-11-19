const path = require('path');
const {Config} = require('next-recompose-plugins');
const {PHASE_PRODUCTION_BUILD} = require('next/constants');
const withBundleAnalyzer = require('@next/bundle-analyzer');

/** @type {import("next").NextConfig} */
const config = new Config(async () => {
  return {
    reactStrictMode: true,
    sassOptions: {
      includePaths: [path.join(__dirname, 'src/styles')]
    },
  };
})
  .applyPlugin((phase, args, config) => {
    return withBundleAnalyzer({enabled: phase === PHASE_PRODUCTION_BUILD})(config);
  }, 'bundle-analyzer')
  .build();

module.exports = config;
