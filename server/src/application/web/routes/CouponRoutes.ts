import * as express from 'express';
import CouponRepository from '../../../domain/repositories/CouponReposiory';
import MongoDBCouponModel from '../../../infrastructure/data-access/MongoDBCouponModel';
import MongoDBCouponRepository from '../../../infrastructure/data-access/MongoDBCouponRepository';
import CouponService from '../../../domain/services/CouponService';
import CouponController from '../controllers/CouponController';
import { body, ValidationChain } from 'express-validator';

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
 * Amount Coupon Request Payload
 * @typedef {object} AmountCouponRequestPayload
 * @property {string} name.required - The coupon name is required in Payload
 * @property {string} expiryDate.required - The expiration Date (as string) is required
 * @property {AmountCouponDiscount} discount.required - The discount details
*/
/** Amount Coupon Discount
 * @typedef {object} AmountCouponDiscount
 * @property {string} type.required - AMOUNT - The discount type
 * @property {string} value.required - The value height
 * @property {string} currency - enum:EUR,USD - If type of discount is amount currency needs to be selected (EUR or USD)
*/

/**
 * Percentage Coupon Request Payload
 * @typedef {object} PercentageCouponRequestPayload
 * @property {string} name.required - The coupon name is required in Payload
 * @property {string} expiryDate.required - The expiration Date (as string) is required
 * @property {PercentageCouponDiscount} discount.required - The discount details
 */
/**
 * Percentage Coupon Discount
 * @typedef {object} PercentageCouponDiscount
 * @property {string} type.required - PERCENT - The discount type
 * @property {string} value.required - The value height
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
 * GET /api/coupon/redeemable/:code
 * @summary validates Coupon redeemability via code
 * @tags coupons
 * @param {string} code.path.required - coupon code
 *
 * @return {object} 200 - coupon response
 * @example response - 200 - code is redeemable
 * {
 *   true
 * }
 *
 * @return {object} - 500 - Invalid Coupon
 * @example response - 500 - Coupon is not redeemable / invalid
 * {
 *   "error": "Invalid Coupon"
 * }
 */
router.get('/coupon/redeemable/:code', couponController.validateCouponCode);

/**
 * POST /api/coupon
 * @summary Create a new coupon
 * @tags coupons
 * @param {AmountCouponRequestPayload} request.body.required - coupon info
 * @example request - to successfully create a new coupon with value 50 €
 * {
 *   "expiryDate": "2024-01-01",
 *   "discount": {
 *     "type": "AMOUNT",
 *     "value": 50,
 *     "currency": "EUR"
 *   }
 * }
 * @param {PercentageCouponRequestPayload} request.body.required - coupon info
 * @example request - to successfully create a new coupon with Percentage Bonus of 25%
 * {
 *   "expiryDate": "2024-01-01",
 *   "discount": {
 *     "type": "PERCENT",
 *     "value": 25
 *   }
 * }
 *
 * @return {Coupon} 201 - successfully created coupon response
 * @example response - 201 - successfully created coupon response
 * {
 *   "id": "656cdb871eb8bda7fabfa04f",
 *   "code": "20fe00ef-2f50-49c3-b3cb-b48166e3560a",
 *   "expiryDate": "2024-01-01",
 *   "discount": {
 *     "type": "AMOUNT",
 *     "value": 50,
 *     "currency": "EUR"
 *   }
 * }
 */
const createCouponValidator: ValidationChain[] = [
  body('expiryDate').optional().isString(),
  body('discount.type').isIn(['PERCENT', 'AMOUNT']).withMessage('Invalid discount type'),
  body('discount.value').isNumeric(),
  body('discount.currency').optional().isIn(['EUR', 'USD']).withMessage('Invalid currency type'),
];
router.post('/coupon', createCouponValidator, couponController.createCoupon);

/**
 * Put /api/coupon/:id
 * @summary Updates coupon with id
 * @tags coupons
 * @param {string} id.path.required - coupon id
 * @param {AmountCouponRequestPayload} request.body.required - coupon info
 * @example request - to successfully create a new coupon
 * {
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
 *   "code": "20fe00ef-2f50-49c3-b3cb-b48166e3560a",
 *   "expiryDate": "2024-01-01",
 *   "discount": {
 *     "type": "AMOUNT",
 *     "value": 50,
 *     "currency": "EUR"
 *   }
 * }
 */
const updateCouponValidator: ValidationChain[] = [
  body('expiryDate').optional().isString().withMessage('Invalid expiration date'),
  body('discount.type').optional().isIn(['PERCENT', 'AMOUNT']).withMessage('Invalid discount type'),
  body('discount.value').optional().isNumeric().withMessage('Invalid discount value'),
  body('discount.currency').optional().isIn(['EUR', 'USD']).withMessage('Invalid currency type'),
];
router.put('/coupon/:id', updateCouponValidator, couponController.updateCoupon);

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
