import axios from 'axios';

export const getFileList = () => {
	console.log('axios.getfile');
	return axios
		.get('/api/file')
		.then(response => {
			console.log(response);
			return response.data;
		})
		.catch(response => {
			console.log(response);
		});
};
