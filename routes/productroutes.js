const express = require("express");

const productcontroller = require("./../controllers/productcontroller");
const cartcontroller = require("../controllers/addtocartcontroller");
const authcontroller = require("./../controllers/authcontroller");

const router = express.Router();
router.use(authcontroller.protect); // Protect all routes below this middleware

  router.get('/home', productcontroller.getAllProducts);
  router.get(`/product-details/:prodId`,productcontroller.getProduct);
 
  router.get('/cart', cartcontroller.getcart);
  router.post('/cart', cartcontroller.getcart);

  router.post('/update-quantity', cartcontroller .updateCart);
  
  router.post('/addToCart',cartcontroller.addToCart);
  router.get('/addToCart',cartcontroller.addToCart);

  router.post('/removeItem/:prodId', cartcontroller.removeItem);
  router.get('/removeItem/:prodId', cartcontroller.removeItem);


  router.get('/checkout', cartcontroller .getCheckout)
  router.post('/checkout', cartcontroller .getCheckout)

  router.get('/payment', cartcontroller.paymentPage)
  router.post('/payment', cartcontroller.paymentPage)

  router.get('/order-success', cartcontroller.orderSuccessPage)
  router.post('/order-success', cartcontroller.orderSuccessPage)

  router.get('/order-details', cartcontroller.orderDetailsPage)
  router.post('/order-details', cartcontroller.orderDetailsPage)
  router.get('/orderuser', cartcontroller.orderuserPage)
  router.post('/orderuser', cartcontroller.orderuserPage)
  router.get('/orderuser', cartcontroller.orderuserPage)
  router.get('/getorders',productcontroller.createOrder);
  router.post('/getorders',productcontroller.createOrder);



module.exports = router;
