const express = require('express');
const discountcontroller = require('../controllers/discountcontroller');
const productcontroller = require('../controllers/productcontroller');
const authcontroller = require('../controllers/authcontroller');



const router = express.Router();

router.use(authcontroller.protect); // Protect all routes below this middleware
router.use(authcontroller.restrictTo('admin')); // Restrict access to 'admin' users only
router.post('/admin/creatediscount',  discountcontroller.createDiscount);
router.get('/admin/discount',discountcontroller.getAllDiscountsForAdmin);

router.get(`/admin/getdiscount/:prodId`,discountcontroller.getDiscount);
router.post(`/admin/edit-discount/:prodId`,discountcontroller.editDiscountForAdmin);
router.get(`/admin/edit-discount/:prodId`,discountcontroller.editDiscountForAdmin);

router.delete(`/admin/delete-discount/:prodId`,discountcontroller.deleteDiscount);
router.get("/check-discount-eligibility/:productId", discountcontroller.checkDiscountEligibility);

module.exports = router;
