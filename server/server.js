import express from 'express';
import cors from 'cors';


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import socialMediaRoutes from './routes/socialMediaRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import todoListRoutes from './routes/todoListRoutes.js';

const app = express();

app.use(cors({ origin: '*' })); // Allow frontend
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);

app.use('/api/user', userRoutes);

app.use('/api/social', socialMediaRoutes);

app.use('/api/reminder', reminderRoutes);

app.use('/api/todo', todoListRoutes);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on port ${PORT}`);
});
