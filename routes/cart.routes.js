const { addProductToCart, getCartProducts } = require('../controller/cart.controller');
const { auth } = require('../middlewares/Auth');



const router=require('express').Router();

router.post('/add',auth,addProductToCart);
router.get('/get',auth,getCartProducts);


module.exports=router;