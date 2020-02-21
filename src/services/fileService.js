import axios from 'axios';

const LOCAL_STORAGE_KEY="user";

const expiredSession = (response,props) => {
	
	if (response.data.errors === 'required login') {
		localStorage.removeItem(LOCAL_STORAGE_KEY);
		props.history.push('/login');
	}
};

export const getFileList = (props) => {

	return axios
		.get('/api/file')
		.then(response => {
			console.log(response);
			return response.data;
		})
		.catch(error => {
			expiredSession(error.response,props);
			console.log(error);
		});
};

export const getFile = (fileId,props) => {

	return axios
		.get(`/api/file/${fileId}`)
		.then(response => {
			console.log(response);
			return response.data;
		})
		.catch(error => {
			expiredSession(error.response,props);
			console.log(error);
		});
};

export const postFile = (formData,props) => {
	
	return axios
		.post('/api/file',formData)
		.then(response => {
			console.log(response);
			return response.data;
		})
		.catch(error => {
			expiredSession(error.response,props);
			console.log(error);
		});
};

export const editFile = (fileContent, fileObj ,props) => {
	
	fileObj.fileContent = fileContent;
	return axios
		.put('/api/file',fileObj)
		.then(response => {
			console.log(response);
			return response.data;
		})
		.catch(error => {
			expiredSession(error.response,props);
			console.log(error);
		});
};
