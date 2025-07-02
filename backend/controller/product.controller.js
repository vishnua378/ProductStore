const Product = require("../models/Product.model");
const mongoose = require("mongoose");

const getProducts = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success:true , data:products})
    }catch(error){
        console.log("error in fetching products:",error.message);
        res.status(500).json({success: false, message: "server error"})

    }
}

const createProduct = async(req,res)=>{
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message:"Please fil all fields"});
    }
    const newProduct = new Product(product)

    try{ 
        await newProduct.save(); 
        res.status(201).json({success:true,data:newProduct});
    }catch(error){
        console.log("Error in creating product:",error.message)
        res.status(500).json({success:false, message:"Server Error"})
    }
}


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.log("Error in deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct

};