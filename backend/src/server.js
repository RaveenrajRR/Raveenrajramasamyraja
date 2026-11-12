
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

import { env } from './config/env.js';

import contactRoutes from './routes/contact.js';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';

import {
  notFound,
  errorHandler
} from './middleware/errorHandler.js';

const app = express();

// =====================================
// SECURITY
// =====================================

app.use(helmet());

// =====================================
// CORS CONFIGURATION
// =====================================

const allowedOrigins = [
  env.frontendOrigin?.replace(/\/+$/, ''),
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin.replace(/\/+$/, ''))) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// =====================================
// BODY PARSER
// =====================================

app.use(express.json({ limit: '32kb' }));

// =====================================
// RATE LIMIT
// =====================================

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false
}));

// =====================================
// HEALTH CHECK
// =====================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'raveen-raj-portfolio-api'
  });
});

// =====================================
// API ROUTES
// =====================================

app.use('/api/contact', contactRoutes);

app.use('/api', publicRoutes);

app.use('/api/admin', adminRoutes);

// =====================================
// ERROR HANDLING
// =====================================

app.use(notFound);
app.use(errorHandler);

// =====================================
// SERVER
// =====================================

app.listen(env.port, () => {
  console.log(`Portfolio API listening on ${env.port}`);
  console.log('Allowed Origins:', allowedOrigins);
});
