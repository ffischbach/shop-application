import mongoose from 'mongoose';

export async function databaseConnect() {
  mongoose
    .connect(process.env.DB_URL!)
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((error) => {
      console.log('database connection failed. exiting now...');
      console.error(error);
      process.exit(1);
    });
}
