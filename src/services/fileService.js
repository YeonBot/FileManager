import axios from 'axios';

export const getFileList = () => {
	console.log('axios.getfile');
	axios
		.get('/api/file')
		.then(response => {
			console.log(response);
		})
		.catch(response => {
			console.log(response);
		});
};
