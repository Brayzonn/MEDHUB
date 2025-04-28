import cors, { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
    origin: ["http://localhost:3000", "https://med-hub-hazel.vercel.app"],
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
};

export default cors(corsOptions);
