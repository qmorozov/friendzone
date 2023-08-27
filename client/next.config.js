const nextTranslate = require('next-translate-plugin');

module.exports = nextTranslate({
  reactStrictMode: false,
  optimizeImages: true,
  optimizeFonts: true,
  optimizeCss: true,
  optimizeSvg: true,
});
