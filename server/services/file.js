import FileModel from '../models/file';

export const uploadFileByDB = (file,session) => {
	console.log('service::uploadFileByDB');
	
	file["userEmail"] = session.userEmail;
	
	const fileInfo = FileModel.create(file)
		.then(resultFileInfo => {
			return resultFileInfo;
		})
		.catch(err => {
			throw err;
		});
};
