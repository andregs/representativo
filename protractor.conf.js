// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  directConnect: process.env.CI !== true,
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [
    {
      browserName: 'chrome',
      name: `Travis #${process.env.TRAVIS_JOB_NUMBER}`,
      build: process.env.TRAVIS_BUILD_NUMBER,
      "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER,
      tags: ['travis']
    },
    // { browserName: 'internet explorer', requireWindowFocus: true },
    // { browserName: 'MicrosoftEdge' },
    // { browserName: 'firefox', marionette: true },
  ],
  baseUrl: `http://${process.env.CI ? 'representativo' : 'localhost'}:3000/`,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  }
};
