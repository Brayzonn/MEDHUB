import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
import allRoutes from './routes/mainRoutes';
import corsMiddleware from './middleware/corsMiddleware';
import sessionMiddleware from './middleware/sessionMiddleware';
import connectToDb from './config/db';
import { apiRateLimiter } from './middleware/rateLimiter';

app.use(corsMiddleware);                       
app.use(express.json());                       
app.use(express.urlencoded({ extended: true })); 
app.use(apiRateLimiter);                       
app.use(sessionMiddleware);  
 
app.use('/api', allRoutes);   

connectToDb()

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
    console.log(`MEDHUB SERVER listening on port ${PORT}!`);
});
