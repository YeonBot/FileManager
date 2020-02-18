import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.json({ data: 'this is index.' }));

router.get('/login', (req, res) => {
	
	req.session.logined = true;
	req.session.userEmail = "tjddus95@naver.com";	
	
	res.json({result: 'login success'});
	
});

router.get('/session', (req, res) => {
	
	if(req.session.logined){
		res.json({username:req.session.userEmail});	
	}else {
		res.json({result: 'login please'});
	}
	
});

export default router;