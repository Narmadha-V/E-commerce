const Product = require("./../models/productModel");
const Discount = require("./../models/discountModel");
const moment = require('moment');


exports.createDiscount = async (req, res, next) => {
  try {
    console.log(req.body); // log the request body to see what values are being received

    const { discountCode, discountValue, status, appliesTo, selectedProducts, startDate, endDate } = req.body;

    console.log(`appliesto:${appliesTo}`); // log appliesTo value to see if it's correct

    let productObjects = [];

    // Check if the discount applies to all products or just specific ones
    if (appliesTo === 'All Products') {
      productObjects = await Product.find();
      console.log(`productObjects:${productObjects}`)
    }

    // Check if the status is not "Disable"
   
      // Validate start and end dates
      const currentDate = moment();
      const startDateObj = moment(startDate, 'YYYY-MM-DD');
      const endDateObj = moment(endDate, 'YYYY-MM-DD');

      if (!startDateObj.isValid() || !endDateObj.isValid() || startDateObj.isBefore(currentDate) || endDateObj.isBefore(currentDate)) {
        return res.status(400).json({
          status: 'error',
          message: 'Please enter a valid start and end date.'
        });
      }

      // Create the discount
      const discount = await Discount.create({
        discountCode,
        discountValue,
        status,
        appliesTo,
        products: productObjects,
        startDate,
        endDate
      });

      res.status(201).json({
        status: 'success',
        discount:discount,
        productObjects :productObjects 
      });
    
  } catch (error) {
    next(error);
  }
};

exports.checkDiscountEligibility = async (req, res) => {
  try {
    const productId = req.params.productId; // get product ID from URL parameter
    const today = new Date();
    const discount = await Discount.findById(productId);
console.log(discount)
    if (discount) {
      res.status(200).json({
        status: "success",
        data: {
          message: `Product ${productId} is eligible for discount ${discount.discountCode}`,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          message: `Product ${productId} is not eligible for any discounts.`,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getAllDiscountsForAdmin = async (req, res) => {

  const discounts = await Discount.find();

    res.status(200).render('admindiscount',{
    status:"success",
    title:'All discount',
    discounts: discounts
    })
};
exports.getDiscount = async (req, res) => {
  const discount = await Discount.findById(req.params.prodId);
  if (!discount) {
    return ('No discount found with that ID', 404);
  }

  res.status(200).render("admin-edit-discount",{
    status: 'success',
    discount:discount
    
  });

};
exports.deleteDiscount = async (req, res, next) => {
  const prodId = req.params.prodId
  const discount = await Discount.findByIdAndDelete(prodId);
  //  console.log(`deletedDiscount:${Discount}`)
  if (!discount) {
    return next("No Discount found with that ID", 404);
  }
 
  // console.log(`Discount with ID ${prodId} has been deleted`);
  return res.status(200).json({
    status: 'success',
    message: `Discount with ID ${prodId} has been deleted`,
  });
};
exports.createDis  = async(req, res) => {
  try {
    const appliesTo = req.body.products === "All Products" ? "All Products" : "Specific Products";
    const discount = await Discount.create(req.body);
  console.log(`discount:${discount}`)

    res.status(201).json({
      status: "success",
      data: {
        discount: discount,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }

};
exports.editDiscountForAdmin = async (req, res) => {
  const prodId = req.params.prodId

  const discount = await Discount.findByIdAndUpdate(prodId, req.body, {
    new: true,
    runValidators: true
  });
  if (!discount) {
    return ('No discount found with that ID', 404);
  }

//   // Check the status value and update the status property accordingly
//   // if (req.body.status === 'Enable') {
//   //   discount.status = 'Active';
//   //   discount.expiryDate = req.body.endDate;
//   // } else if (req.body.status === 'Disable') {
//   //   discount.status = 'Expired';
//   //   discount.expiryDate = null;
//   // }
// if (req.body.status === 'Enable') {
//   const currentDate = moment();
//   const expiryDate = moment(discount.endDate, 'YYYY-MM-DD');

//   if (currentDate.isBefore(expiryDate)) {
//     discount.status = 'Active';
//     discount.expiryDate = req.body.endDate;
//   } else {
//     discount.status = 'Expired';
//     discount.expiryDate = null;
//   }
// } else {
//   discount.status = 'Disable';
//   discount.expiryDate = null;
// }
if (req.body.status === 'Enable') {
  const currentDate = moment();
  const expiryDate = moment(req.body.endDate, 'YYYY-MM-DD');

  if (currentDate.isBefore(expiryDate)) {
    discount.status = 'Active';
    discount.expiryDate = req.body.endDate;
  } else {
    discount.status = 'Expired';
    discount.expiryDate = null;
  }
} else if (req.body.status === 'Disable') {
  discount.status = 'Disable';
  discount.expiryDate = null;
}


  await discount.save();

  console.log(discount);
  res.status(200).json({
    status:"success",
    title:'discount with id ',
    discount: [discount]
  });
};




