const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const productcontroller = require("./../controllers/productcontroller");
const cartcontroller = require("./../controllers/addtocartcontroller");
const authcontroller = require("./../controllers/authcontroller");





router.post('/edit-cart/:prodId',cartcontroller.updateProductsForCart);
router.post('/edit-cart/:prodId',cartcontroller.updateProductsForCart);
router.put('/edit-cart/:prodId',cartcontroller.updateProductsForCart);

router.post('/getProductDiscounts',cartcontroller.getProductDiscounts);
router.get('/getProductDiscounts',cartcontroller.getProductDiscounts);
router.use(authcontroller.protect); // Protect all routes below this middleware
router.use(authcontroller.restrictTo('admin')); // Restrict access to 'admin' users only

router.get('/home',productcontroller.getAllProducts);
router.get('/admin-collection',productcontroller.getAllProductsForAdmin);
router.get('/getproduct/:prodId',productcontroller.editProductsForAdmin);
router.post('/edit-product/:prodId',productcontroller.updateProductsForAdmin);
router.get(`/edit-product/:prodId`,productcontroller.updateProductsForAdmin);
router.delete(`/delete-product/:prodId`,  productcontroller.deleteProduct);
router.post('/add-product',productcontroller.createProduct)


router.post('/getorders',cartcontroller.getOrder);
router.get('/getorders',cartcontroller.getOrder);


module.exports = router;

