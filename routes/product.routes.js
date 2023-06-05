const router=require('express').Router();
const { saveProduct, updateProduct, getProduct } = require('../controller/product.controller');
const singleUpload = require('../middlewares/multer');
const  Validator=require('../middlewares/validator')


router.post('/',Validator('product'),singleUpload,saveProduct);
router.put('/:id',Validator('product'),updateProduct);
router.get('/',getProduct);


module.exports=router;