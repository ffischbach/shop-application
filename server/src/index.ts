import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import CouponModel from './models/Coupon';

dotenv.config({ path: '../.env.local' });
const app = express();
const PORT = '8080';

app.use(express.json());

app.get('/api/coupons', (req: Request, res: Response) => {
  res.send('');
});

app.post('/api/coupon', async (req: Request, res: Response) => {
  const newCoupon = new CouponModel({
    name: req.body.name
  });

  const savedCoupon = await newCoupon.save();

  res.json(savedCoupon);
});

mongoose.connect(process.env.DB_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(8080);
});
