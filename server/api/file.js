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

// 1. multer 미들웨어 등록
let upload = multer({
	storage: storage
});

const router = express.Router();

router.get('/', async (req, res) => {
	console.log('controller::file list');

	res.json({ file: 'file' });
});

router.post('/', upload.single('imgFile'), async (req, res) => {
	console.log('controller::file upload');

	let file = req.file;

	FileService.uploadFileByDB(file, req.session);

	res.json(file);
});

export default router;