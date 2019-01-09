const path = require('path');
const { RemoteBrowserTarget } = require('happo.io');
const happoPluginPuppeteer = require('happo-plugin-puppeteer');

const { HAPPO_KEY, HAPPO_SECRET } = process.env;

module.exports = {
  apiKey: HAPPO_KEY,
  apiSecret: HAPPO_SECRET,

  // Anything ending in `happo.js` will be subject to testing
  include: '**/*happo.js',

  // Set up the browsers and viewports we want to render our happo examples in.
  targets: {
    'chrome': new RemoteBrowserTarget('chrome', {
      viewport: '800x600'
    })
  },

  // Make sure the OpenSans font is available
  stylesheets: [
    'http://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&subset=cyrillic,greek'
  ],

  // Some examples depend on images found in `src/website/public`. By adding
  // that folder to the happo config, we make sure they are included in the test
  // run.
  publicFolders: [
    path.resolve(__dirname, 'src/website/public')
  ],

  // The <LiveProvider> wrapper adds a full-width div around the content. We can
  // configure happo to use content in the inner div to prevent all examples
  // from being full-width.
  rootElementSelector: '.react-live-preview',

  plugins: [
    happoPluginPuppeteer()
  ]
};
