import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
// import app from './app.js';
import authRoutes from './routes/Auth.js';
import adminRoutes from './routes/Admin.js';
import dataRoutes from './routes/Data.js';
import sqiRoutes from './routes/sqi.js';
import { notFound, errorHandler } from './middleware/error.js';

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/sqi', sqiRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 4000;

await connectDB();

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
