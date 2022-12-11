import mongoose from 'mongoose';
import 'dotenv/config';
import { MONGO_DB_URL } from '../utils/consts';

mongoose.set('strictQuery', true);

const connectToDatabase = (
  mongoDatabaseURI = MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
