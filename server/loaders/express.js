import * as express from 'express';
import * as bodyParser from 'body-parser';
import session from 'express-session';

import api from '../api/index';
import apiUser from '../api/user';
import apiFile from '../api/file';

import * as validators from '../services/validator';

export default async ({ app }) => {
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: true
		})
	);

	app.use('/api', api);
	app.use('/api/user', apiUser);
	
	app.use(validators.sessionCheck);
	app.use('/api/file', apiFile);

	// ...More middlewares

	// Return the express app
	return app;
};