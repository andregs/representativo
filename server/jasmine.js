const Jasmine = require('jasmine');
const jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: './dist',
  spec_files: ['**/*.spec.js'],
  helpers: ['helpers/**/*.js']
});

jasmine.execute();
