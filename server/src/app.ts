import express from 'express';
const app = express();
import allRoutes from './routes/mainRoutes';
import corsMiddleware from './middleware/corsMiddleware';
import sessionMiddleware from './middleware/sessionMiddleware';
import connectToDb from './config/db';


app.use(corsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware)

// app.use((req, res, next) => {
//     console.log(`Received ${req.method} request to ${req.url}`);
//     next();
// });

app.use('/api', allRoutes)
app.use('/images', express.static('images'))

//connect to mongo db
connectToDb()

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => console.log(`Hospital management app listening on port ${PORT}!`));
