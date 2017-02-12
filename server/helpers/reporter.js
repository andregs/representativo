const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

// https://github.com/bcaudan/jasmine-spec-reporter/blob/master/src/configuration.ts

jasmine.getEnv().clearReporters();               // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter({  // add jasmine-spec-reporter
  spec: {
    displayPending: true,
    displayDuration: true
  }
}));
