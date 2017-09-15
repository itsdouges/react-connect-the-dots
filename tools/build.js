const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const pkg = require('../package.json');

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*'])).then(() => {
  try {
    fs.statSync('dist');
  } catch (e) {
    fs.mkdirSync('dist');
  }
});

// Compile source code into a distributable format with Babel
for (const format of ['es6', 'cjs', 'umd']) {
  promise = promise.then(() => rollup.rollup({
    entry: 'src/index.js',
    external: Object.keys(pkg.dependencies),
    plugins: [
      babel(Object.assign(pkg.babel, {
        babelrc: false,
        include: '**/**.js',
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        presets: pkg.babel.presets.map((x) => (x === 'es2015' ? 'es2015-rollup' : x)),
      })),
    ],
  }).then((bundle) => bundle.write({
    dest: `dist/${format === 'cjs' ? 'index' : `index.${format}`}.js`,
    format,
    sourceMap: true,
    moduleName: format === 'umd' ? pkg.name : undefined,
  })));
}

// Copy package.json and LICENSE.txt
promise = promise.then(() => {
  delete pkg.private;
  delete pkg.devDependencies;
  delete pkg.scripts;
  delete pkg.eslintConfig;
  delete pkg.babel;
  fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
  fs.writeFileSync('dist/LICENSE', fs.readFileSync('LICENSE', 'utf-8'), 'utf-8');
  fs.writeFileSync('dist/README.md', fs.readFileSync('README.md', 'utf-8'), 'utf-8');
  fs.writeFileSync('dist/example.gif', fs.readFileSync('example.gif', 'utf-8'), 'utf-8');
});

promise.catch((err) => console.error(err.stack)); // eslint-disable-line no-console
