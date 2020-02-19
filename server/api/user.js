import express from 'express';
import * as UserService from '../services/user';
import * as validators from '../services/validator';

const router = express.Router();

router.post('/signin', validators.userSignin ,validators.handleValidationErrors, async (req, res) => {
	console.log('controller::signin');
	
	const userInfo = await UserService.signin(req.body)
	.then( result =>{
		 return result;
	})
	.catch(e => {
		console.log(e);
		res.status(400).json({ errors: e.message });
	});
	UserService.addSession(req.session,userInfo);

	res.json(userInfo);
});

router.post('/signup', validators.userSignup ,validators.handleValidationErrors,  (req, res) => {
	console.log('controller::signup');	
	
	UserService.signup(req.body);

	res.json({ msg: "Success user signUp." });
});

router.post('/logout', (req, res) => {
	console.log('controller::logout');
	
	UserService.deleteSession(req.session);
	
	res.json({ msg: "Success user logout." });
});

export default router;