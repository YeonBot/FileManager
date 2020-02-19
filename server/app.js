import './dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';

import api from './api/index';
import apiUser from './api/user';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}))


app.use('/api', api);
app.use('/api/user', apiUser);

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Successfully connected to mongodb'))
	.catch(e => console.log(e));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server Listening on port ${port}...`));
