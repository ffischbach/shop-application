import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import * as dotenv from 'dotenv';
import { options } from './swagger';
import CouponModel from './coupons/models/Coupon';

dotenv.config({ path: '../.env.local' });
const app = express();
const PORT = '8080';

app.use(express.json());
expressJSDocSwagger(app)(options);

/**
 * A coupon item
 * @typedef {object} Coupon
 * @property {string} name.required - The coupon name is required in the response
 * @property {string} code.required - The coupon code
 * @property {string} expiryDate.required - The coupon expiration Date as string
 */

/**
 * A coupon request object
 * @typedef {object} CouponRequestPayload
 * @property {string} name.required - The coupon name is required in Payload
 * @property {string} expirationDate.required - The expiration Date (as string) is required in Payload
 */

/**
 * GET /api/coupons
 * @summary returns a list of all coupons
 * @tags coupons
 * @return {Coupon} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
app.get('/api/coupons', (req: Request, res: Response) => {
  res.send('');
});

/**
 * POST /api/coupon
 * @summary can be used to create a new coupon
 * @tags coupons
 * @param {CouponRequestPayload} request.body.required - coupon info
 * @return {Coupon} 200 - coupon response
 * @return {object} 400 - Bad request response
 */
app.post('/api/coupon', async (req: Request, res: Response) => {
  const newCoupon = new CouponModel({
    name: req.body.name,
    code: req.body.code,
    expiryDate: Date.parse(req.body.expiryDate)
  });

  const savedCoupon = await newCoupon.save();

  res.json(savedCoupon);
});

mongoose.connect(process.env.DB_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(8080);
});
