// eslint-disable-next-line no-undef
const mix = require('laravel-mix');

// eslint-disable-next-line no-undef
require('laravel-mix-eslint');
// eslint-disable-next-line no-undef
require('laravel-mix-eslint-config');

mix.react('src/index.js', 'dist')
  .extract(['react', 'rsuite'])
  .eslint({
    enforce: 'pre',
    exclude: ['/node_modules/'],
    loader: 'eslint-loader',
    options: {
      fix: false,
      cache: false
    }
});
