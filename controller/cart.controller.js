const {
  cart,
  cart_products,
  products,
  Sequelize,
} = require("./../models/index");

const addProductToCart = async (req, res) => {
  try {
    const { id, quantity, userID } = req.body;

    const cartData = await cart.findOne({
      where: {
        customer_id: userID,
      },
      raw: true,
    });

    const product = await products.findOne({
      where: {
        id,
      },
    });

    const cartProduct = await cart_products.create({
      cart_id: cartData.id,
      product_id: id,
      quantity,
    });

    const savedCartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity,
    };

    return res.status(201).json({
      status: "success",
      message: "Product Added to the Cart ",
      data: savedCartProduct,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).send({
      status: "error",
      message: "something went wrong!",
    });
  }
};

const getCartProducts = async (req, res) => {
  try {
    const { userID } = req.body;

    const cartProducts = await cart.findAll({
      attributes: [],
      include: [
        {
          model: products,
          attributes: ["id", "name", "price", "image_url"],
          through: { as: "cart_products", attributes: ["quantity"] },
        },
      ],
      where: {
        customer_id: userID,
      },
      
    });

    const cartData=JSON.parse(JSON.stringify(cartProducts))

    return res.status(201).json({
      status: "success",
      message: "Cart product fetched succesfully",
      data: cartData[0].products,
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "something went wrong!",
    });
  }
};

module.exports = { addProductToCart, getCartProducts };
