import { loadConfig } from '../config/configLoader';
import mongoose, { Mongoose } from 'mongoose';

const config = loadConfig();
const mongo = config.db.mongodb;
export const db = mongoose
  .connect(`mongodb://${mongo.uri}:${mongo.port}/${mongo.name}`)
  .then((res) => {
    if (res) {
      console.log('database connect successfully');
    }
  })
  .catch((err) => {
    console.log(err);
  });
