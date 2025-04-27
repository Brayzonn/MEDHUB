import mongoose from 'mongoose';
require('dotenv').config();

const mongoURI: string | undefined = process.env.MongoURI;

//connect to Mongo
async function connectToDatabase() {
      try {
            await mongoose.connect(mongoURI ? mongoURI : '', {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
            } as mongoose.ConnectOptions);
                  console.log('MongoDB connected.....');
      } catch (error) {
                  console.error('MongoDB connection error:', error);
      }
  }

export default connectToDatabase