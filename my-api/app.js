import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';

import talleresRouter from './src/routes/talleres.routes.js'

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, resp) => {
  return resp.json({ message: "HEALTHY", code: 200})
})

app.use('/talleres', talleresRouter);


export default app;
