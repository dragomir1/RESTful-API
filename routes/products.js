// require modules
const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('./middleware/check-auth');
const ProductsController = require('./controllers/products');


// set up multer for file uploads and storage
const storage = multer.diskStorage({
  destination: function( req, file, cb ) {
    cb(null, './uploads');
  },
  filename: function ( req, file, cb ) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

 //  select specific files to use
 const filefilter = ( req, file, cb ) => {
   if(file.mimetype === "image/jpg" || file.mimetype === "image/png") {
     cb(null, true);
   } else {
     cb(null, false);
   }
 };

// set file size
const upload = multer({storage: storage, limits: {
  filesize: 1024 * 1024 * 5
}, filefilter: filefilter
});

// set GET POST PATCH DELETE routes to /products
router.get("/", ProductsController.products_get_all);

router.get("/:productId", ProductsController.products_get_product);

router.post("/", checkAuth, upload.single('productimage'), ProductsController.products_create_new_product);

router.patch("/:productId", checkAuth, ProductsController.products_update_product);

router.delete("/:productId" checkAuth, ProductsController.products_delete_product);


module.exports = router;
