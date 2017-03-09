import { SpecReporter } from 'jasmine-spec-reporter';

// https://github.com/bcaudan/jasmine-spec-reporter/blob/master/src/configuration.ts

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
  spec: {
    displayPending: true,
    displayDuration: true,
  },
}));
