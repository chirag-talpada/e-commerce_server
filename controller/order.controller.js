const { Op } = require("sequelize");
const {
  cart_products,
  cart,
  products,
  order,
  order_product,
  sequelize,
  Sequelize,
} = require("../models");

const createOrder = async (req, res) => {
  const order_transaction = await sequelize.transaction();

  try {
    let { address, userID } = req.body;
    address = JSON.stringify(address);

    const cartProducts = await cart.findAll({
      attributes: [],
      include: [
        {
          model: products,
          attributes: ["price", "id"],
          through: { as: "cart_products", attributes: ["quantity"] },
        },
      ],
      where: {
        customer_id: userID,
      },
    });

    const cartItem = JSON.parse(JSON.stringify(cartProducts[0]));

    if (cartItem.products.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "cart is empty",
      });
    }

    const totalAmount = cartItem.products.reduce((cur, acc) => {
      return cur + acc.price * acc.cart_products.quantity;
    }, 0);

    const currentDate = new Date();

    const savedOrder = await order.create(
      {
        customer_id: userID,
        order_date: currentDate,
        total_amount: totalAmount,
        shipping_address: address,
        status: "processing",
      },
      {
        transaction: order_transaction,
      }
    );

    const orderProducts = cartItem.products.map((product) => {
      return {
        order_id: savedOrder.id,
        product_id: product.id,
        quantity: product.cart_products.quantity,
      };
    });

    const savedOrderProducts = await order_product.bulkCreate(orderProducts, {
      transaction: order_transaction,
    });

    const orderProductIDs = cartItem.products.map((product) => {
      return product.id;
    });

    const deleteCartProduct = await cart_products.destroy({
      where: {
        product_id: {
          [Op.in]: orderProductIDs,
        },
      },
    });

    await order_transaction.commit();

    return res.status(201).json({
      status: "success",
      message: "Order placed Successfully",
      data: { items: savedOrderProducts, id: savedOrder.id },
    });
  } catch (err) {
    console.log(err);

    await order_transaction.rollback();
    return res.status(500).send({
      status: "error",
      message: "something went wrong!",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    let { userID } = req.body;

    let orderData = await order.findAll({
      where: {
        customer_id: userID,
      },
    });

    orderData = orderData.map((order) => {
      return {
        id: order.id,
        order_date: order.order_date,
        shipping_address: order.shipping_address,
        status: order.status,
        total_amount: order.total_amount,
      };
    });

    return res.status(201).json({
      status: "success",
      message: "Order fetched Successfully",
      data: orderData,
    });
  } catch (err) {
    console.log(err);
    
    return res.status(500).send({
      status: "error",
      message: "something went wrong!",
    });
  }
};

module.exports = { createOrder, getOrders };
