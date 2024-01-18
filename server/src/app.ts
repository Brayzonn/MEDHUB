import express from 'express';
const app = express();
import allRoutes from './routes/mainRoutes'

// import middleware modules
import corsMiddleware from './middleware/corsMiddleware';
import headersMiddleware from './middleware/headersMiddleware';
import sessionMiddleware from './middleware/sessionMiddleware';
import connectToDb from './config/db';

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(corsMiddleware)
app.use(headersMiddleware)
app.use(sessionMiddleware)

app.use('/api', allRoutes)

//connect to db
connectToDb()

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => console.log(`Hospital mngmnt app ${PORT}!`));
