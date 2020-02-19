const { check, validationResult } = require('express-validator');

export const handleValidationErrors = (req,res ,next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		console.log(errors.array());
    	return res.status(422).json({ errors: errors.array() });
	}
	next(); 
}

export const userSignup = [
	check('email')
		.exists()
		.withMessage('email is required')
		.isEmail()
		.withMessage('wrong email')
	,
	check('password')
		.exists()
		.withMessage('password is required')
	,
	check('name')
		.exists()
		.withMessage('password is required')
];

export const userSignin = [
	check('email')
		.exists()
		.withMessage('email is required')
		.isEmail()	
		.withMessage('wrong email')
	,
	check('password')
		.exists()
		.withMessage('password is required')
];