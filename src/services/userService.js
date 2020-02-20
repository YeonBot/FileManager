import axios from 'axios';

const LOCAL_STORAGE_KEY="user";

export const login = (userLoginInfo, props) => {
	console.log('axios.login');
	axios
		.post('/api/user/signin', userLoginInfo)
		.then(response => {
			console.log(response);
			localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(response.data));
			props.history.push('/');
		})
		.catch(response => {
			console.log(response);
		});
};

export const register = userRegisterInfo => {
	console.log('axios.register');
	axios
		.post('/api/user/signup', userRegisterInfo)
		.then(response => {
			console.log(response);
		})
		.catch(response => {
			console.log(response);
		});
};

export const logout = (props) => {
	console.log('axios.logout');
	axios
		.post('/api/user/logout')
		.then(response => {
			console.log(response);
			localStorage.removeItem(LOCAL_STORAGE_KEY);
			props.history.push('/login');
		})
		.catch(response => {
			console.log(response);
		});
};
