const Jasmine = require('jasmine');
const jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: './server',
  spec_files: [
    // a ordem dos nossos testes importa
    'user/**/*.spec.ts',
    '**/*.spec.ts',
  ],
  helpers: ['helpers/**/*.ts']
});

jasmine.execute();
