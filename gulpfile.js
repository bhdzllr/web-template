const { series, parallel, src, dest, watch } = require('gulp');

const del = require('del');
const fs = require('fs');

const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const tar = require('gulp-tar');
const GulpSSH = require('gulp-ssh');

const srcFolder = 'src';
const distFolder = 'dist';
const sshConfig = require('./ssh.example.json');
const ssh = new GulpSSH({
	ignoreErrors: false,
	sshConfig: {
		host: sshConfig.host,
		port: sshConfig.port,
		username: sshConfig.username,
		// privateKey: fs.readFileSync(sshConfig.privateKey),
	}
});

function clean() {
	return del([
		distFolder
	], { force: true });
}

function pages(cb) {
	src([
			srcFolder + '/**/*.html',
			'!' + srcFolder + '/markup.html',
			'!' + srcFolder + '/standalone.html'
		])
		.pipe(dest(distFolder));

	src([
		srcFolder + '/pages/**/*',
		'!' + srcFolder + '/pages/**/*.html'
	]).pipe(dest(distFolder));

	cb();
}

function styles() {
	return src(srcFolder + '/css/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			errorLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.pipe(postcss([
			require('postcss-preset-env')({
				autoprefixer: {
					grid: true,
				},
			}),
			require('postcss-encode-background-svgs')(),
		]))
		.on('error', (error) => { console.error(error.toString()); })
		.pipe(rename({
			basename: 'style',
			suffix: '.min',
			extname: '.css'
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(dest(distFolder + '/css/'));
}

function scripts() {
	if (fs.existsSync(srcFolder + '/sw.js')) {
		src(srcFolder + '/sw.js')
			.pipe(dest(distFolder));
	}	

	src(srcFolder + '/js/lib/files/check.js')
		.pipe(dest(distFolder + '/js/lib/files/'));

	return src(srcFolder + '/js/main.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(dest(distFolder));
}

function res(cb) {
	src(srcFolder + '/img/**/*')
		.pipe(dest(distFolder + '/img/'));

	src(srcFolder + '/fonts/**/*')
		.pipe(dest(distFolder + '/fonts/'));

	src(srcFolder + '/docs/**/*')
		.pipe(dest(distFolder + '/docs/'));

	src([
			srcFolder + '/browserconfig.xml',
			srcFolder + '/favicon.ico',
			srcFolder + '/icon.png',
			srcFolder + '/site.webmanifest',
			srcFolder + '/tile.png',
			srcFolder + '/tile-wide.png',
		])
		.pipe(dest(distFolder));

	cb();
}

function dev() {
	watch([
		srcFolder + '/index.html',
		srcFolder + '/pages/**/*.html',
		srcFolder + '/templates/**/*.html'
	], series(pages));

	watch([,
		srcFolder + '/css/**/*.scss'
	], series(styles));

	watch([,
		srcFolder + '/js/**/*.js'
	], series(scripts));
}

function deployUp() {
	if (sshConfig.host === '0.0.0.0')
		return console.error('Unable to deploy, SSH config in file "ssh.json" needed, see "ssh.exmaple.json".');

	return src(distFolder + '/**/*', { base: '.' }) // base '.' to use whole dist folder
		.pipe(tar('package.tar'))
		.pipe(dest(distFolder))
		.pipe(ssh.dest('/home/user/dist'));
}

function deployRemote() {
	return ssh.shell([
			'tar -xvf package.tar',
			'rsync -av --delete /home/user/dist/ /var/www/html/',
			'rm package.tar',
			'rm -r /home/user/dist',
		], { filePath: 'deploy-shell.log' });
}

function deployDown() {
	return del([distFolder + '/package.tar']);
}

exports.default = series(clean, parallel(pages, styles, scripts, res), dev);
exports.dev = exports.default;
exports.dist = series(clean, parallel(pages, styles, scripts, res));
exports.deploy = series(deployUp, deployRemote, deployDown);
