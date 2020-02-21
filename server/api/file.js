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
	console.log('controller::get file list');

	const files = await FileService.getFileList(req.session.userEmail);

	res.status(200).json(files);
});

router.post('/', upload.single('file'), async (req, res) => {
	console.log('controller::file upload');

	let file = req.file;

	FileService.uploadFileByDB(file, req.session.userEmail);

	res.json(file);
});

export default router;