import * as express from 'express';
import CouponRepository from '../../../domain/repositories/CouponReposiory';
import CouponModel from '../../../infrastructure/data-access/CouponModel';
import MongoDBCouponRepository from '../../../infrastructure/data-access/MongoDBCouponRepository';
import CouponService from '../../../application/services/CouponService';
import CouponController from '../../../infrastructure/web/controllers/CouponController';

const router = express.Router();
router.use(express.json());

const mongoDBCouponRepository: MongoDBCouponRepository = new MongoDBCouponRepository(CouponModel);

const couponRepository: CouponRepository = new CouponRepository(mongoDBCouponRepository);

const couponService: CouponService = new CouponService(couponRepository);

const couponController = new CouponController(couponService);

/**
 * Coupon details
 * @typedef {object} CouponDiscount
 * @property {string} type.required - The discount type (percentage or amount)
 * @property {string} value.required - The value height
 * @property {string} currency - The value currency if type is amount (€ or $)
 */

/**
 * A coupon item
 * @typedef {object} Coupon
 * @property {string} name.required - The coupon name is required in the response
 * @property {string} expiryDate.required - The coupon expiration Date as string
 * @property {CouponDiscount} discount.required - The discount details
 */

/**
 * A coupon create request object
 * @typedef {object} CouponRequestPayload
 * @property {string} name.required - The coupon name is required in Payload
 * @property {string} expiryDate.required - The expiration Date (as string) is required
 * @property {CouponDiscount} discount.required - The discount details
 */

/**
 * GET /api/coupon/:id
 * @summary returns a list of all coupons
 * @tags coupons
 * @param {id} - coupon id
 * @return {Coupon} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/coupon/:id', couponController.getCouponById);

/**
 * POST /api/coupon
 * @summary can be used to create a new coupon
 * @tags coupons
 * @param {CouponRequestPayload} request.body.required - coupon info
 * @return {Coupon} 201 - coupon response
 * @return {object} 400 - Bad request response
 */
router.post('/coupon', couponController.createCoupon);
router.put('/coupon/:id', couponController.updateCoupon);
router.delete('/coupon/:id', couponController.deleteCoupon);

export default router;
