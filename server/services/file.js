import fs from 'fs';
import path from 'path';
import yauzl from 'yauzl';
import mkdirp from 'mkdirp';

import FileModel from '../models/file';

export const uploadFile = (file, userEmail) => {
	if (file.mimetype === 'application/zip' || file.mimetype === 'application/tar') {
		decompressionFileAndUpload(file, userEmail);
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

export const decompressionFileAndUpload = (file, userEmail) => {
	let tmpPath = path.join('server', 'upload'); // upload 파일 위치
	//yauzl 을 이용해 zip 파일 열기
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

					// .으로 시작하는 파일은 저장 하지 않는다.
					if (fileName.charAt(0) === '.') {
						readStream.resume();
					} else if (filePath.length === 1) {
						// 디렉토리가 없는 경우 바로 저장
						const fileNameAddDate = fileName + ' - ' + Date.now();
						const fullpath = path.join(tmpPath, fileNameAddDate);
						readStream.pipe(fs.createWriteStream(fullpath));

						uploadFileByDB(
							{
								originalname: fileName,
								path: fullpath
							},
							userEmail
						);
					} 
					// Dir안에 들어 있다면 dir 생성.
					else {
						const dirPath = path.dirname(entry.fileName);
						const fileNameAddDate = fileName + ' - ' + Date.now();
						const fullpath = path.join(tmpPath + '/' + dirPath, fileNameAddDate);

						mkdirp.sync(tmpPath + '/' + dirPath);
						readStream.pipe(
							fs.createWriteStream(fullpath)
						);
						
						uploadFileByDB(
							{
								originalname: fileName,
								path: fullpath
							},
							userEmail
						);
						
					}
				});
			}
		});

		zipfile.once('end', function() {
			// cb(null, database);
		});
	});
};