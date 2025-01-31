import express from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { config } from 'dotenv';
import { options } from './config/swagger';
import couponRoutes from './application/web/routes/CouponRoutes';
import { databaseConnect } from './config/databse';

config({ path: '../.env.local' });

const app = express();
const PORT = 8080;

app.use('/api', couponRoutes);

expressJSDocSwagger(app)(options);

async function startServer() {
  try {
    await databaseConnect();
    console.log(`Connected to MongoDB`);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
}

startServer();
