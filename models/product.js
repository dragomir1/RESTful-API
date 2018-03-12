// require modules
const mongoose = require('mongoose');

// set up product schema
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true},
  price: {type: Number, required: true},
  productImage: ( type: String, required: true)
});

// export module
module.exports = mongoose.model('Product', productSchema);
