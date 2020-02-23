import express from 'express';
import multer from 'multer';

import * as FileService from '../services/file';

let storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'server/upload');
	},
	filename: function(req, file, callback) {
		callback(null, file.originalname + ' - ' + Date.now());
	}
});

// multer 미들웨어 등록
let upload = multer({
	storage: storage
});

const router = express.Router();

router.get('/', async (req, res) => {
	const files = await FileService.getFileList(req.session.userEmail);

	res.status(200).json(files);
});

router.get('/:id', async (req, res) => {
	const file = await FileService.getFileFromDB(req.params.id);
	let fileAddedFileContent;
	try {
		fileAddedFileContent = await FileService.getFileFromDir(file);
	} catch (err) {
		FileService.deleteFileFromDB(file._id);
		res.status(400).json();
	}

	res.status(200).json(fileAddedFileContent);
});

router.post('/', upload.single('file'), async (req, res) => {
	let file = req.file;

	FileService.uploadFile(file, req.session.userEmail);

	res.json(file);
});

router.put('/', async (req, res) => {
	const file = req.body;

	FileService.editFileFromDir(file);

	res.json();
});

router.delete('/', async (req, res) => {
	const file = req.body;

	FileService.deleteFileFromDB(file._id);
	FileService.deleteFileFromDir(file.path);

	res.json({ msg: 'delete success' });
});

export default router;