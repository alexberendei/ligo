const autoprefixer = require('autoprefixer');

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['hugo_stats.json'],
  defaultExtractor: (content) => {
    let els = JSON.parse(content).htmlElements;
    return els.tags.concat(els.classes, els.ids);
  },
  safelist: [],
});

module.export = {
  plugins: [
    // these plugins are not run in development
    !process.env.HUGO_ENVIRONMENT === 'development' ? autoprefixer() : null,
    ...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss] : []),
  ],
};
