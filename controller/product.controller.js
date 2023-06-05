const getDataUri = require("../utils/dataUri");
const { products, sequelize } = require("./../models/index");
const cloudinary=require('cloudinary');

const saveProduct = async (req, res) => {
    

    console.log(req.file);
    
    const fileuri=getDataUri(req.file);
    const mycloud=await cloudinary.v2.uploader.upload(fileuri.content);

    let public_id=mycloud.public_id;
    let url=mycloud.secure_url
    
    console.log(public_id,url);

    res.send("yes")

//     const product_transaction = await sequelize.transaction();
//     try {

//     const { name, desc, price, quantity_in_stock, seller_id, category_name } =
//       req.body;

//     const newCategory = {
//       name,
//       desc,
//     };

//     let data = await category.create(newCategory);

//     return res.status(201).json({
//       status: "success",
//       message: "Category created Successfully",
//       data: data,
//     });
//   } catch (err) {
//     return res.status(500).send({
//       status: "error",
//       message: "something went wrong!",
//     });
//   }


};

const updateProduct = async (req, res) => {
  try {
    const { name, desc } = req.body;
    const ID = req.params.id;

    const updatedCategory = {
      name,
      desc,
    };

    let data = await category.update(updatedCategory, {
      where: {
        id: ID,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Category updated Successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "something went wrong!",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    let data = await category.findAll({
      raw: true,
    });

    return res.status(200).json({
      status: "success",
      message: "Category fetched Successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "something went wrong!",
    });
  }
};

module.exports = { saveProduct, updateProduct, getProduct };
