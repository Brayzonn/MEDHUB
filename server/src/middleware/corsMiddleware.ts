import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = process.env.CORS_ORIGINS?.split(',').map(origin => origin.trim()) || [];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

export default cors(corsOptions);

