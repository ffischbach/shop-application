import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import CouponModel from './models/Coupon';

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

mongoose.connect('mongodb://root:rootpassword@127.0.0.1:27017')
  .then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(8080);
  });
