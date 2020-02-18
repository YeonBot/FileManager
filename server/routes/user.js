import express from 'express';
import User from '../models/user';
const router = express.Router();

router.post('/signin', async (req, res) => {
	console.log('signin');
	console.log(req.body.email);

	const userInfo = await User.findOne({ email: req.body.email })
		.then(result => {
			if (!result) {
				res.status(400).json({ error: 'USER DOES NOT EXIST' });
			} else if (result.password !== req.body.password) {
				res.status(400).json({ error: 'USER DOES NOT EXIST' });
			}
			
			req.session.logined = true;
			req.session.userId = result.id;
			req.session.userEmail = result.email;

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

	res.json({ msg: "Success user signUp." });
});

router.post('/logout', (req, res) => {
	console.log('logout');
	req.session.destroy();
	res.json({ msg: "Success user logout." });
});

export default router;