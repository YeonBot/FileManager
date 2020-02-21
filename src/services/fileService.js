import axios from 'axios';

const LOCAL_STORAGE_KEY="user";

const expiredSession = (response,props) => {
	if (response.data.errors === 'required login') {
		localStorage.removeItem(LOCAL_STORAGE_KEY);
		props.history.push('/login');
	}
};

export const getFileList = (props) => {
	console.log('axios.getfile');
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

export const postFile = (formData,props) => {
	console.log('axios.postFile');
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
