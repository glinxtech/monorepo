'use strict';

const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');
const glob = promisify(require('glob'));
const pug = require('pug');

const basedir = path.resolve('templates');

Promise.all([
	glob('templates/*.md')
		.then(mdFilePaths => Promise.all(mdFilePaths
			.map(filepath => fs.readFile(filepath, 'utf-8')
				.then(contents => ({
					contents,
					filename: path.parse(filepath.replace(/\.md$/, '.html')).base,
				}))))),
	fs.readFile(path.resolve('templates/about.pug'), 'utf-8'),
])
	.then(([files, template]) => Promise.all(files
		.map(({ filename, contents }) => pug.compile(template, { filename, basedir, compileDebug: true })(contents))));
