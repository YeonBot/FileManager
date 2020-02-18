import express from 'express';
import User from '../models/user';
const router = express.Router();

router.post('/signin', async (req, res) => {
	console.log('signin');
	console.log(req.body.email);

	const userInfo = await User.findOne({ email: req.body.email })
		.then(result => {
			// null check , return 회원 없음.
			return result;
		})
		.catch(err => {
			throw err;
		});

	res.json(userInfo);
});

router.post('/signup', (req, res) => {
	console.log('signup');
	console.log(req.body.email);
	console.log(req.body.password);
	console.log(req.body.name);

	User.create({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name
	})
		.then(result => {
			return result;
		})
		.catch(err => {
			throw err;
		});

	res.json({ result: 1 });
});

export default router;