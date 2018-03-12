// require modules
const mongoose = require('mongoose');

// set up product schema
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
  quantity: {type: Number, default: 1 } //required: true the default sets it to one if no additional info is passed.
});

// export module
module.exports = mongoose.model('Order', orderSchema);
