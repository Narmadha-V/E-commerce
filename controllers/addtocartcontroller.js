const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const CartItem= require("../models/cartItemModel");
const Discount= require("../models/discountModel");
const User = require("../models/usermodel");
const Order= require("../models/orderModel");



exports.getcart = async (req, res) => {
  try {
    const products = await CartItem.find({ isAddToCart: true });
    // console.log('productsInCart',products)
    res.status(200).render("cart", {
      title: "Cart",
      products:products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
exports.addToCart = async(req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!productId || typeof productId !== 'string') {
    return res.status(400).json({ error: 'Invalid productId' });
  }
  
  // if (!quantity || typeof quantity !== 'number') {
  //   return res.status(400).json({ error: 'Invalid quantity' });
  // }
  
  try {
    const cart = new Cart({
      userId,
      productId,
      quantity,
    });

    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
exports.updateCart = async(req, res) => {
  const productId = req.body.productId;
  const newQuantity = req.body.quantity;
  
  // TODO: Update the quantity of the product with the given ID in your database
  
  res.status(200).send('Product quantity updated successfully');
};
exports.updateProductsForCart = async (req, res, next) => {
  const prodId = req.params.prodId;
  const { quantity } = req.body; // Retrieve quantity from the request body
  const{user} = req.body;
  const product = await Product.findById(prodId);
  
  if (!product) {
    return next('No product found with that ID', 404);
  }
console.log(user)
  // Check if there is an existing cart item with the same product ID
  const existingCartItem = await CartItem.findOne({ productId: prodId });
  
  if (existingCartItem) {
    // If an existing cart item is found, update its quantity by adding the new quantity
    existingCartItem.quantity += parseInt(quantity);
    await existingCartItem.save();
   let price = (existingCartItem.price)
   let sku = (existingCartItem.sku)
   console.log(user)
    res.status(200).json({
      status: 'success',
      title: 'All Products',
      price,
      sku,
      products: [existingCartItem]
    });
  } else {
    // If no existing cart item is found, create a new cart item with the product details
    const cartItem = new CartItem({
      isAddToCart: true,
      sku: product.sku,
      productName: product.productName,
      price: product.price,
      productId: product._id,
      quantity:quantity,
      url: product.url,
      userId:user
    });

    // Save the cart item to the cart collection
    const savedCartItem = await cartItem.save();
    
    res.status(200).json({
      status: 'success',
      title: 'All Products',
      savedCartItem,
      products: [savedCartItem]
    });
  }
};
exports.removeItem = async (req, res) => {
  const itemId = req.body.id; // assuming the item id is sent in the request body
  console.log(itemId);
 const cartInProducts = await CartItem.findByIdAndDelete(itemId)
 console.log(`deletedproductfromcart:${cartInProducts}`)
 if (!cartInProducts) {
   return ("No product found with that ID", 404);
 }
 // res.status(201).render("admin-collection",{
 //   status: "success",
 //   data: null,
 // });
 console.log(`Product with ID ${itemId} has been deleted`);
 return res.status(200).json({
   status: 'success',
   message: `Product with ID ${itemId} has been deleted`,
 });

  
};
exports.getProductDiscounts = async (req, res) => {
  try {
    const { id } = req.body;
    const { promoCode } = req.body;
    // console.log('id:',promoCode,id)
    const discounts = await Discount.findById(id);
    let discountValue = 0;
    console.log(discounts.discountValue)
    discountValue += Number(discounts.discountValue);
    // console.log(discountValue)
    res.json({ success: true,discountValue});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
exports.getCheckout = async (req, res) => {

  try {
    const cartProducts = await CartItem.find();
    console.log('cartProducts',cartProducts);
    res.status(200).render('checkout', {
      title: 'Checkout',
      cartProducts:cartProducts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving cart products');
  }
};
exports.paymentPage = async (req, res) => {
  try {
    const cartProducts = await CartItem.find();
    console.log('cartProducts',cartProducts);
    res.status(200).render('payment', {
      title: 'payment',
      cartProducts:cartProducts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving cart products');
  }
 
}
exports.orderSuccessPage = async (req, res) => {
  res.status(200).render("order-success", {
            title:"order-success",
    })
}
exports.orderDetailsPage = async (req, res) => {
  const product = await CartItem.find({isAddToCart:true})
  const userContactInfo = {
    name: 'Narmadha',
    email: 'narmadha@example.com',
    phone: '1234567890',
    address: '123 Main Street',
    postalCode: '12345'
  };
  res.render('order-details', { userContactInfo,product });
};
exports.orderuserPage = async (req, res) => {
  const products = await CartItem.find({isAddToCart:true})

  const date = req.body.orderDate
  const totalamount= req.body.totalAmount
  console.log(date,totalamount)
  res.status(200).render("orderuser", {
    title:"orderuser",
    date,
    totalamount,
    products
})
}
exports.getOrder = async (req, res) => {
  const orders = await Order.find()
  res.status(200).render("adminorders", {
            title:"order-lists",
            orders:orders
    })
}