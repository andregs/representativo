// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  directConnect: false,
  multiCapabilities: [
    { browserName: 'chrome', version: '56.0', platform: 'Windows 10' },
  ],
  maxSessions: process.env.CI ? 5 : 1,
  baseUrl: `http://${process.env.CI ? 'representativo' : 'localhost'}:3000/`,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare: function () {
    require('ts-node').register({
      project: 'e2e'
    });
  }
};

const browsers = [{
  browserName: 'MicrosoftEdge',
  platform: 'Windows 10',
  version: '14.14393',
// }, {
//   browserName: 'internet explorer',
//   platform: 'Windows 7',
//   version: '11.0',
}];

browsers.forEach(b => {
  exports.config.multiCapabilities.push(b);
});

if (process.env.CI === 'true') {
  exports.config.sauceUser = process.env.SAUCE_USERNAME;
  exports.config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  exports.config.sauceBuild = `Travis #${process.env.TRAVIS_BUILD_NUMBER}`;
  exports.config.multiCapabilities.forEach(cap => {
    cap.name = `Travis #${process.env.TRAVIS_JOB_NUMBER}`;
    cap["tunnel-identifier"] = process.env.TRAVIS_JOB_NUMBER;
    cap.tags = ['travis'];
  });

} else {
  exports.config.seleniumAddress = 'http://localhost:4444/wd/hub';
}
