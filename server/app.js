import express from 'express';
import bodyParser from 'body-parser';

import api from './routes/index';

const app = express();

app.use(bodyParser.json());
app.use('/api', api);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));