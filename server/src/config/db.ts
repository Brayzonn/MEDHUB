import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MongoURI;

async function connectToDatabase(): Promise<void> {
  if (!mongoURI) {
    console.error('MongoURI not found in environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

export default connectToDatabase;
