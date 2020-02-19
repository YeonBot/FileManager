import UserModel from '../models/user';

export const signup = userdto => {
	console.log('service::signup');

	const user = UserModel.create(userdto)
		.then(result => {
			return result;
		})
		.catch(err => {
			throw err;
		});
};

export const signin = async userdto => {
	console.log('service::signin');

	return await UserModel.findOne({ email: userdto.email })
		.then(user => {
			if (!user) {
				throw new Error('USER DOES NOT EXIST');
			} else if (user.password !== userdto.password) {
				throw new Error('INCORECT PASSWORD');
			}

			const result = { email: user.email, name: user.name };

			return result;
		})
		.catch(err => {
			throw err;
		});
};

export const addSession = (session, userInfo) => {
	console.log('service::addSession');

	session.logined = true;
	session.userId = userInfo.email;
	session.userEmail = userInfo.name;
};

export const deleteSession = session => {
	console.log('service::addSession');

	session.destroy();
};


