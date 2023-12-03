import express from 'express';
import mongoose from 'mongoose';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { config } from 'dotenv';
import { options } from './swagger';
import couponRoutes from './infrastructure/web/routes/CouponRoutes';

config({ path: '../.env.local' });

const app = express();
const PORT = 8080;

app.use('/api', couponRoutes);

expressJSDocSwagger(app)(options);

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log(`Connected to MongoDB`);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
}

startServer();
