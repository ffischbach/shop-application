import * as express from 'express';
import CouponRepository from '../../../domain/repositories/CouponReposiory';
import MongoDBCouponModel from '../../data-access/MongoDBCouponModel';
import MongoDBCouponRepository from '../../../infrastructure/data-access/MongoDBCouponRepository';
import CouponService from '../../../application/services/CouponService';
import CouponController from '../../../infrastructure/web/controllers/CouponController';

const router = express.Router();
router.use(express.json());

const mongoDBCouponRepository: MongoDBCouponRepository = new MongoDBCouponRepository(MongoDBCouponModel);

const couponRepository: CouponRepository = new CouponRepository(mongoDBCouponRepository);

const couponService: CouponService = new CouponService(couponRepository);

const couponController = new CouponController(couponService);

/**
 * Coupon
 * @typedef {object} Coupon
 * @property {string} code.required - The coupon code is required in the response
 * @property {string} expiryDate.required - The coupon expiration Date as string
 * @property {CouponDiscount} discount.required - The discount details
 */
/**
 * Coupon Discount
 * @typedef {object} CouponDiscount
 * @property {string} type.required - enum:PERCENT,AMOUNT - The discount type (percentage or amount)
 * @property {string} value.required - The value height
 * @property {string} currency - enum:EUR,USD - If type of discount is amount currency needs to be selected (EUR or USD)
 */

/**
 * Coupon Request Payload
 * @typedef {object} CouponRequestPayload
 * @property {string} name.required - The coupon name is required in Payload
 * @property {string} expiryDate.required - The expiration Date (as string) is required
 * @property {CouponDiscount} discount.required - The discount details
 */

/**
 * GET /api/coupon/:id
 * @summary returns coupon with id
 * @tags coupons
 * @param {string} id.path.required - coupon id
 * @return {Coupon} 200 - success response - application/json
 * @example response - 200 - success response example
 * {
 *   "id": "656cdb871eb8bda7fabfa04f",
 *   "name": "name",
 *   "code": "20fe00ef-2f50-49c3-b3cb-b48166e3560a",
 *   "expiryDate": "2024-01-01",
 *   "discount": {
 *     "type": "amount",
 *     "value": 50,
 *     "currency": "EUR"
 *   }
 * }
 * @return {object} 404 - Not found response
 * @example response - 404 - coupon not found
 * {
 *   "message": "Coupon not found."
 * }
 */
router.get('/coupon/:id', couponController.getCouponById);

/**
 * POST /api/coupon
 * @summary Create a new coupon
 * @tags coupons
 * @param {CouponRequestPayload} request.body.required - coupon info
 * @example request - to successfully create a new coupon with value 50 €
 * {
 *   "name": "new amount coupon",
 *   "expiryDate": "2024-01-01",
 *   "discount": {
 *     "type": "AMOUNT",
 *     "value": 50,
 *     "currency": "EUR"
 *   }
 * }
 * @example request - to successfully create a new coupon with value 50 %
 * {
 *   "name": "new percent coupon",
 *   "expiryDate": "2024-01-01",
 *   "discount": {
 *     "type": "PERCENT",
 *     "value": 30,
 *   }
 * }
 *
 * @return {Coupon} 201 - successfully created coupon response
 * @example response - 201 - successfully created coupon response
 * {
 *   "id": "656cdb871eb8bda7fabfa04f",
 *   "name": "name",
 *   "code": "20fe00ef-2f50-49c3-b3cb-b48166e3560a",
 *   "expiryDate": "2024-01-01",
 *   "discount": {
 *     "type": "AMOUNT",
 *     "value": 50,
 *     "currency": "EUR"
 *   }
 * }
 */
router.post('/coupon', couponController.createCoupon);

/**
 * Put /api/coupon/:id
 * @summary Updates coupon with id
 * @tags coupons
 * @param {string} id.path.required - coupon id
 * @param {CouponRequestPayload} request.body.required - coupon info
 * @example request - to successfully create a new coupon
 * {
 *   "name": "neuer coupon",
 *   "expiryDate": "2024-01-01",
 *   "discount": {
 *     "type": "AMOUNT",
 *     "value": 50,
 *     "currency": "EUR"
 *   }
 * }
 *
 * @return {Coupon} 200 - coupon response
 * @example response - 200 - successfully updated coupon response
 * {
 *   "id": "656cdb871eb8bda7fabfa04f",
 *   "name": "name",
 *   "code": "20fe00ef-2f50-49c3-b3cb-b48166e3560a",
 *   "expiryDate": "2024-01-01",
 *   "discount": {
 *     "type": "AMOUNT",
 *     "value": 50,
 *     "currency": "EUR"
 *   }
 * }
 */
router.put('/coupon/:id', couponController.updateCoupon);

/**
 * Put /api/coupon/redeem/:code
 * @summary Redeems Coupon via code
 * @tags coupons
 * @param {string} code.path.required - coupon code
 *
 * @return {Coupon} 200 - coupon response
 * @example response - 200 - successfully redeemed coupon response
 * {
 *   successfully redeemed code 946a666c-21fc-4154-bca8-cb6a2b1633c5 with amount 50 EUR
 * }
 */
router.put('/coupon/redeem/:code', couponController.redeemCoupon);

/**
 * Delete /api/coupon/:id
 * @summary Deletes coupon with id
 * @tags coupons
 * @param {string} id.path.required - coupon id
 * @return {object} 200 - coupon response
 * @example response - 200 - successfully deleted coupon response
 * {
 *   "message": "Coupon deleted successfully"
 * }
 * @return {object} 404 - Not found response
 * @example response - 404 - could not delete coupon response
 * {
 *   "message": "Could not delete. Coupon not found."
 * }
 */
router.delete('/coupon/:id', couponController.deleteCoupon);

export default router;
