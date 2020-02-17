const express = require('express');
// import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.json({data:'this is index.'}));

router.post('/user', (req, res) => res.json({data:'this is user.'}));

module.exports = router