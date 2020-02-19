import express from 'express';
import User from '../models/user';
import * as validators from '../services/validator';
import { check, oneOf, validationResult, validator } from 'express-validator';


const router = express.Router();

router.post('/signin', validators.userSignup ,handleValidationErrors, async (req, res) => {
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

router.post('/signup', validators.userSignin ,handleValidationErrors,  (req, res) => {
	console.log('signup');	

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

function handleValidationErrors(req,res ,next) {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		console.log(errors.array());
    	return res.status(422).json({ errors: errors.array() });
	}
	next(); 
}

export default router;