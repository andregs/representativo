const Jasmine = require('jasmine');
const jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: './server',
  spec_files: ['**/*.spec.ts'],
  helpers: ['helpers/**/*.ts']
});

jasmine.execute();
