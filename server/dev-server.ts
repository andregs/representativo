import * as nodemon from 'nodemon';
import * as localtunnel from 'localtunnel';

nodemon({
  script: 'dist/server/server.js',
  watch: ['dist'],
  ignore: ['dist/public'],
  nodeArgs: ['--inspect']
});

nodemon.on('log', e => {
  console.log(e.colour);
});

[
  'start',
  'restart'
].forEach(e => {
  nodemon.on(e, () => {
    console.log('[nodemon]', e);
    if (process.argv[2] === '--no-tunnel') return;
    setTimeout(() => {
      const tunnel = localtunnel(
        3000,
        { subdomain: 'representativo' },
        (err, res) => {
          if (err) throw err;
          console.log('tunnel url', res.url);
        }
      );
      tunnel.on('error', arg => {
        console.error('tunnel error', arg);
        nodemon.emit('restart');
      });
      tunnel.on('close', arg => console.error('tunnel close', arg));
    }, 2000);
  });
});

[
  'crash',
  'exit',
  // 'config:update',
  'stdout',
  'stderr',
  'readable'
].forEach(e => {
  nodemon.on(e, (...args) => {
    console.log('[nodemon]', e, args);
  });
});
