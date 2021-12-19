const Product = require("../models/product");

class productController {
  static findProduct = async (req, res, next) => {
    try {
      const result = await Product.find();
      if (result.length === 0) {
        throw { name: "NOT_FOUND" };
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  };



  static createProduct = async (req, res, next) => {
    const url = req.protocol +  "://" + req.get("host")
    try {
      const result = await Product.create({
        nama: req.body.nama,
        gambar: url + "/images/" + req.file.filename,
        desc: req.body.desc,
        rating: req.body.rating,
        stock: req.body.stock,
        harga: req.body.harga,
        category: req.body.category
      })
    res.status(200).json({ message: "Product Creaated", result });
  } catch (error) {
    next({message: "gagal om"})
}
  };

  // static createProduct = async (req, res) => {
  //     const User = await User.findById
  //     if (User === User) {
  //       const result = await product.create({ namaProduct })
  //       await User.findOneAndUpdate(
  //         { _id: id}
  //       )
  //       res.status(200).json({ message: "product created", result})
  //     } else {
  //       throw { name: "gagal create product"}
  //     }
  //   }
  //   }
  // }

  static deleteProduct = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await Product.findByIdAndDelete(id)
        res.status(200).json({message: "Product Deleted", result})
    } catch (error) {
        next(error)
    }
  }
}

module.exports = productController;
