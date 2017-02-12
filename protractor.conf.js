// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  directConnect: true,
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [
    { browserName: 'chrome' },
    // { browserName: 'internet explorer', requireWindowFocus: true },
    // { browserName: 'MicrosoftEdge' },
    // { browserName: 'firefox', marionette: true },
  ],
  baseUrl: 'http://localhost:3000/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  onPrepare: function() {
    require('ts-node').register({
      project: 'e2e'
    });
    jasmine.getEnv().addReporter(new SpecReporter({
			spec: {
        displayStacktrace: true
      }
		}));
  }
};
