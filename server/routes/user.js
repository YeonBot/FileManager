import express from 'express';
import user from '../models/user'; 
const router = express.Router();

router.get('/signin', (req, res) => res.json({ data: 'this is signin.' }));

router.get('/signup', (req, res) => res.json({ data: 'this is signup.' }));

router.post('/signin', (req, res) => res.json({ data: 'this is signin.' }));

router.post('/signup', (req, res) => {
	console.log(req.body.email);
	console.log(req.body.password);
	console.log(req.body.name);
	
	user.create({email: req.body.email,password: req.body.password, name: req.body.name},(err, user) =>{
		if (err) console.log(err);
		else console.log('saved user');
	});
	
	res.json({result: 1});
});

export default router;