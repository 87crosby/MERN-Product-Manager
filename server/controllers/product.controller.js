const Product = require("../models/product.model");



module.exports.findAllProducts = (req,res)=>{
    Product.find()
        .then(allProducts=>{
            res.json({results: allProducts})
        })
        .catch(err=>{
            res.json({err:err})
        })
}


module.exports.createNewProduct = (req,res)=>{
    Product.create(req.body)
        .then(newProductObj=>{
            res.json({results: newProductObj })
        })
        .catch(err=>{
            res.json({err:err})
        })
}

module.exports.findOneProduct = (req,res)=>{
    
    Product.findOne({_id:req.params.id})
        .then(foundProduct=>{
            res.json({results: foundProduct })
        })
        .catch(err=>{
            res.json({err:err})
        })
}


module.exports.updateExistingProduct = (req, res) => {
    Product.findOneAndUpdate(
        { _id: req.params.id }, //find the objects whose _id == req.params.id
        req.body, //req.body is the information from the form to update with
        { new: true, runValidators: true } //new:true means return the newly updated info. 
    )
        .then(updatedProduct => {
            res.json({ results: updatedProduct })
        })
        .catch(err=>{
            res.json({err:err})
        })
        
}

module.exports.deleteProduct = (req,res)=>{
    Product.deleteOne({_id: req.params.id})
        .then(deletedProduct =>{
            res.json({results: deletedProduct})
        })
        .catch(err=>{
            res.json({err:err})
        })
}

