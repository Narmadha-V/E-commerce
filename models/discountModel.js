const mongoose = require("mongoose");
const Product = require('./productModel')
const { Schema } = mongoose;

const discountSchema = new mongoose.Schema({

    discountCode: { type: String, required: true, unique: true },
    discountValue: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Enable", "Disable", "Active", "Scheduled","Expired"],
      // required: [true, "A product must have a status"],
    }
    ,
    appliesTo: {
      type: String,
      enum: ["All Products", "Specific products"],
      // default: "all",
    },
    // products: {
    //   type: mongoose.Schema.Types.Mixed,
    //   required: true,
    // },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    expiryDate:{type: Date}
  }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  
}
  );
  discountSchema.virtual('startDateFormatted').get(function() {
    return this.startDate.toISOString().substring(0, 10);
  });
  
  discountSchema.virtual('endDateFormatted').get(function() {
    return this.endDate.toISOString().substring(0, 10);
  });

const Discount = mongoose.model("Discount", discountSchema)
module.exports =Discount;





