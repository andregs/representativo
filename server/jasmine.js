require('reflect-metadata');
const Jasmine = require('jasmine');
const jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: './dist/server',
  spec_files: [
    // a ordem dos nossos testes importa
    'user/**/*.spec.js',
    '**/*.spec.js',
    '../client/**/*.spec.js',
  ],
  helpers: ['helpers/**/*.js']
});

jasmine.execute();
