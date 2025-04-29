import mongoose from 'mongoose'
import dotenv from 'dotenv'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

// Debug output
console.log('Environment variables loaded');
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Use the connection string from environment variables
const MONGODB_URI = 'mongodb+srv://jadog200211:Guojinteng.1122@diettracker.ckvqpgs.mongodb.net/?retryWrites=true&w=majority&appName=DietTracker';;
// temp hard code for testing
// const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error!!:', err.message);
    process.exit(1);
  }
};

export default connectDB;