const plugins = {
  base: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    'tailwindcss': {}
  },
  productionOnly: {
    'postcss-preset-env': {
      features: { 'nesting-rules': false }
    },
    cssnano: {}
  }
};

module.exports = {
  plugins: Object.assign({}, plugins.base, process.env.NODE_ENV === 'production' && plugins.productionOnly)
};
