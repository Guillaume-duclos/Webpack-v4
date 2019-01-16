/*module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions',
    },
    'cssnano': {},
  },
};*/

module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};

/*
module.exports = {
  plugins: [
    //require('postcss-easy-import'),
    require("postcss-preset-env")({
      stage: 0,
    }),
    require('autoprefixer')
  ],
};*/
