import esbuild from 'esbuild';

console.log('Starting build...');

esbuild.build({
  entryPoints: [
    './server.js',
  ],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  outfile: '../dist/server.js',
  minify: true,
  sourcemap: true,
  packages: 'external',
})
.then(() => {
  console.log('Build succeeded');
})
.catch((error) => {
  console.log("Build failed: ", error);
  process.exit(1);
});