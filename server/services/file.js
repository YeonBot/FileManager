import fs from 'fs';
import path from 'path';
import yauzl from 'yauzl';
import mkdirp from 'mkdirp';

import FileModel from '../models/file';

export const uploadFile = (file, userEmail) => {
	let tmpPath = path.join(__dirname, '..', 'upload');
	if (file.mimetype === 'application/zip') {
		console.log('zip 파일');
		yauzl.open(file.path, { autoClose: true, lazyEntries: true }, (err, zipfile) => {
			zipfile.readEntry();

			zipfile.on('entry', function(entry) {
				if (/\/$/.test(entry.fileName)) {
					console.log('entryFilename' + entry.fileName);
					zipfile.readEntry();
				} else {
					zipfile.openReadStream(entry, function(err, readStream) {
						if (err) throw err;

						readStream.on('end', function() {
							zipfile.readEntry();
						});

						var filePath = entry.fileName.split('/');
						let fileName = filePath[filePath.length - 1];

						console.log('파일 이름');
						console.log(fileName);
						console.log(filePath);

						if (fileName.charAt(0) === '.') {
							console.log('. 넘김');
							readStream.resume();
						} else if (filePath.length === 1) {
							console.log('c 저장');
							readStream.pipe(fs.createWriteStream(path.join(tmpPath, fileName)));
						} else {
							console.log('저장');

							const dirPath = path.dirname(entry.fileName);
							console.log('/' + dirPath);
							mkdirp.sync(tmpPath + '/' + dirPath);
							readStream.pipe(fs.createWriteStream(path.join(tmpPath + '/' + dirPath, fileName)));
						}
					});
				}
			});

			zipfile.once('end', function() {
				// cb(null, database);
			});
		});
	} else {
		uploadFileByDB(file, userEmail);
	}
};

export const uploadFileByDB = (file, userEmail) => {
	file['userEmail'] = userEmail;

	const fileInfo = FileModel.create(file)
		.then(resultFileInfo => {
			return resultFileInfo;
		})
		.catch(err => {
			throw err;
		});
};

export const getFileFromDB = fileId => {
	return FileModel.findById(fileId)
		.then(resultFileInfo => {
			return resultFileInfo;
		})
		.catch(err => {
			throw err;
		});
};

export const getFileFromDir = file => {
	const fileObj = file.toObject();

	fileObj['fileContent'] = fs.readFileSync(file.path, 'utf-8');

	return fileObj;
};

export const getFileList = userEmail => {
	return FileModel.find({ userEmail: userEmail })
		.then(resultFilesInfo => {
			return resultFilesInfo;
		})
		.catch(err => {
			throw err;
		});
};

export const editFileFromDir = file => {
	fs.writeFile(file.path, file.fileContent, 'utf-8', err => {
		if (err) throw err;
	});
};