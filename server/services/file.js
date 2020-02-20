import FileModel from '../models/file';

export const uploadFileByDB = (file,userEmail) => {
	console.log('service::uploadFileByDB');
	
	file["userEmail"] = userEmail;
	
	const fileInfo = FileModel.create(file)
		.then(resultFileInfo => {
			return resultFileInfo;
		})
		.catch(err => {
			throw err;
		});
};

export const getFileList = (userEmail) => {
	console.log('service::getFileList');
	
	return FileModel.find({"userEmail":userEmail})
	.then(resultFilesInfo => {
		console.log(resultFilesInfo);
		return resultFilesInfo;
	})
	.catch( err=>{
		throw err;
	})
}
