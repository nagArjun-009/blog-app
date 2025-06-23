import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || '';
    await mongoose.connect(mongoURI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error: ', error);
  }
};

export default connectDB;
