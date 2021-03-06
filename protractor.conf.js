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
  maxSessions: 5,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 2 * 60 * 1000
  },
  SELENIUM_PROMISE_MANAGER: false,
  // useBlockingProxy: true,
  // highlightDelay: 321,
  onPrepare: function () {
    require('ts-node').register({ project: 'e2e' });
    jasmine.Suite.prototype.pend = function (message) {
      // https://github.com/angular/protractor/issues/2454#issuecomment-292793280
      this.markedPending = true;
      this.children.forEach(spec => spec.pend(message));
    };
  }
};

function now() {
  return new Date().toISOString().substr(0, 14)
    + (new Date().getMinutes() < 30 ? '00' : '30');
}

if (process.env.SAUCE === 'true' || process.env.CI === 'true') {
  const browsers = [
    { browserName: 'MicrosoftEdge',     platform: 'Windows 10',  version: '14.14393' },
    { browserName: 'chrome',            platform: 'Linux',       version: '48.0' },
    { browserName: 'firefox',           platform: 'Windows 7',   version: '47.0' },
    // { browserName: 'internet explorer', platform: 'Windows 7',   version: '11.0', requireWindowFocus: true },
    { browserName: 'safari',            platform: 'OS X 10.11',  version: '9.0' },
    {
      browserName: 'Browser',
      platformName: 'Android',
      platformVersion: '4.4',
      deviceName: 'Android Emulator',
      deviceOrientation: 'portrait',
      recordScreenshots: false,
    },
    {
      browserName: 'Safari',
      platformName: 'iOS',
      platformVersion: '9.3',
      deviceName: 'iPhone Simulator',
      deviceOrientation: 'portrait',
      recordScreenshots: false,
    }
  ];

  browsers.forEach(b => {
    exports.config.multiCapabilities.push(b);
  });

  exports.config.baseUrl = `http://representativo:3000/`;
  exports.config.sauceUser = process.env.SAUCE_USERNAME;
  exports.config.sauceKey = process.env.SAUCE_ACCESS_KEY;

  if (process.env.SAUCE === 'true') {
    exports.config.sauceBuild = `Local ` + now();
    exports.config.multiCapabilities.forEach((cap, i) => {
      cap.name = `Dev #${i} ${now()}`;
      cap.tags = ['dev-sauce'];
    });

  } else if (process.env.CI === 'true') {
    exports.config.sauceBuild = `Travis #${process.env.TRAVIS_BUILD_NUMBER}`;
    exports.config.multiCapabilities.forEach(cap => {
      cap.name = `Travis #${process.env.TRAVIS_JOB_NUMBER}`;
      cap["tunnel-identifier"] = process.env.TRAVIS_JOB_NUMBER;
      cap.tags = ['travis'];
    });
  }

} else {
  exports.config.baseUrl = `http://localhost:3000/`;
  exports.config.seleniumAddress = 'http://localhost:4444/wd/hub';
  exports.config.directConnect = true;
  exports.config.multiCapabilities.forEach(cap => {
    cap.name = `Dev ` + now();
    cap.tags = ['dev'];
  });
}
