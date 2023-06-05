const register = require('./register.validator')
const login=require('./login.validator')
const category=require('./category.validator')
const seller=require('./seller.validator')
const product=require('./product.validator')

module.exports = {
    register,
    login,
    category,
    seller,
    product
}