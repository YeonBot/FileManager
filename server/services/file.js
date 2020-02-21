import fs from 'fs';
import FileModel from '../models/file';

export const uploadFileByDB = (file,userEmail) => {
	
	file["userEmail"] = userEmail;
	
	const fileInfo = FileModel.create(file)
		.then(resultFileInfo => {
			return resultFileInfo;
		})
		.catch(err => {
			throw err;
		});
};

export const getFileFromDB = (fileId) => {
	
	return FileModel.findById(fileId)
	.then(resultFileInfo => {
		return resultFileInfo;
	})
	.catch( err=>{
		throw err;
	})
}

export const getFileFromDir = (file) => {
	
	const fileObj = file.toObject();
	
	fileObj["fileContent"] = fs.readFileSync(file.path, 'utf-8');
	
	return fileObj;
}

export const getFileList = (userEmail) => {
	
	return FileModel.find({"userEmail":userEmail})
	.then(resultFilesInfo => {
		return resultFilesInfo;
	})
	.catch( err=>{
		throw err;
	})
}

export const editFileFromDir = (file) => {
	
	fs.writeFile(file.path,file.fileContent,'utf-8',(err) =>{
		if(err) throw err;
	});
	
}


