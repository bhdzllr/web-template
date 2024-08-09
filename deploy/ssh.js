const fs = require('fs');

const tar = require('tar');
const { Client } = require('ssh2');

const sshConfig = require('./ssh.example.json');
sshConfig.privateKey = fs.readFileSync(sshConfig.privateKey);

const conn = new Client();

main();

function main() {
	conn.on('ready', () => {
		create();

		upload(() => {
			unroll([
				'tar -xvf package.tar',
				'rsync -av --delete /home/user/public/ /var/www/html/',
				'rm package.tar',
				'rm -r /home/user/public',
			], (output) => {
				log(output);
				remove();
			});
		});
	}).connect(sshConfig);
}

function create() {
	tar.c({ file: 'package.tar', sync: true }, ['public/']);
}

function upload(cb) {
	conn.sftp((err, sftp) => {
		if (err) console.log(err);

		sftp.fastPut('./package.tar', '/home/user/package.tar', function (err) {
			if (err) console.log(err.message);

			cb();
		});
	});
}

function unroll(cmdsList, cb) {
	let output = '';

	conn.shell((err, stream) => {
		if (err) console.log(err.message);
	
		stream.on('close', () => {
			conn.end();

			cb(output);
		}).on('data', (data) => {
			output += data;
		});
			cmds = cmdsList.join('\n');
			if (cmdsList[cmdsList.length - 1] !== 'exit') cmds += '\n' + 'exit' + '\n';

			stream.end(cmds);
		});
}

function log(output) {
	fs.writeFileSync('./deploy/ssh.log', output);
}

function remove() {
	fs.unlinkSync('./package.tar');
} 
