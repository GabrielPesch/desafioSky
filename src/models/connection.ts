import mongoose from 'mongoose';
import 'dotenv/config';
import { MONGO_DB_URL } from '../utils/consts';

mongoose.set('strictQuery', true);

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
