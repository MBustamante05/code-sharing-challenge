import express from 'express';
import cors from 'cors';
import { PORT } from '../config.js';

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
}

import { connectDB } from './lib/db.js';
import codeRouter from './routes/code.route.js';

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/code', codeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})