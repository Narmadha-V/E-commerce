const Product = require("./../models/productModel");
const Order = require("./../models/orderModel");
const { orderSuccessPage } = require("./addtocartcontroller");


exports.getAllProducts = async (req, res) => {
  // console.log('User input',req.user)
    const products = await Product.find();
     res.status(200).render('overview',{
      status:"success",
      title:'All Products',
      products: products
     })
};
exports.getAllProductsForAdmin = async (req, res) => {

  const products = await Product.find();
  // console.log(products)

    res.status(200).render('admin-collection',{
    status:"success",
    title:'All Products',
    products: products
    })
};
exports.updateProductsForAdmin = async (req, res,next) => {
  const prodId = req.params.prodId
  const { productName, sku, price, description, status, url,isAddToCart } = req.body;
  const products = await Product.findByIdAndUpdate(prodId,
    { productName, sku, price, description, status, url ,isAddToCart},
    { new: true, runValidators: true });
// console.log(status)
  if (!products) {
    return next('No product found with that ID', 404);
  }
  res.status(200).json({
    status:"success",
    title:'All Products',
    products: [products]
    })

};
exports.createProduct = async (req, res) => {
  
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newProduct: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
// exports.getProduct = async (req, res) => {
//   const prodId = req.params.prodId
//   const products = await Product.findById(prodId);
//     res.status(200).render('product-details',{
//     status:"success",
//     title:'All Products',
//     products: products
//     })
// };
exports.getProduct = async (req, res) => {
  const prodId = req.params.prodId;
  const product = await Product.findById(prodId);

 
  res.status(200).render('product-details', {
    status: 'success',
    title: 'Product Details',
    products: product
  });
};
exports.editProductsForAdmin = async (req, res) => {
  const prodId = req.params.prodId
  const products = await Product.findById(prodId);
    res.status(200).render('edit-product',{
    status:"success",
    title:'All Products',
    products: products
    })
};
exports.deleteProduct = async (req, res, next) => {
  const prodId = req.params.prodId
  const product = await Product.findByIdAndDelete(prodId);
  //  console.log(`deletedproduct:${product}`)
  if (!product) {
    return next("No product found with that ID", 404);
  }
  // res.status(201).render("admin-collection",{
  //   status: "success",
  //   data: null,
  // });
  // console.log(`Product with ID ${prodId} has been deleted`);
  return res.status(200).json({
    status: 'success',
    message: `Product with ID ${prodId} has been deleted`,
  });
};
exports.createOrder = async (req, res, next) => {
  try {
    const { formattedDate, price,userid ,quantity,productId} = req.body;
    // console.log("cartdata",productId)
    const order = new Order({
      userid,
      date:formattedDate,
      price,
      quantity,
      products:[productId]
    });
    console.log(userid)
    console.log(formattedDate,price)

    const orderItem = await order.save();
    // console.log(orderItem)
    res.status(201).json({ 
      products: [orderItem],
      userid,
      formattedDate,
      price,
      userid,
      message: 'Order created successfully.' });
  } catch (error) {
    next(error);
  }
};


