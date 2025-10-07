// node bundle.mjs

import fs from 'node:fs';

const FILE_IN = './main.css';
const FILE_OUT = './style.css';

const cssContent = fs
	.readFileSync(FILE_IN, 'utf8')
	.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove comments
const importRegex = /@import\s+(?:url\()?["']?([^"'\)]+)["']?\)?\s*;/g;

const importPaths = [];
let match;
while (match = importRegex.exec(cssContent)) {
	importPaths.push(match[1]);
}

let bundle = '';
importPaths.forEach((path) => {
	const cssFile = fs.readFileSync('./' + path, 'utf8');
	bundle += '\n' + cssFile;
});

bundle = bundle
	.replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
	.replace(/\s*([:;{},])\s*/g, '$1') // Remove whitespace around : ; { } ,
	.replace(/\s+/g, ' ') // Reduce multiple whitespaces to one
	.trim();

fs.writeFileSync(FILE_OUT, bundle, 'utf8');
