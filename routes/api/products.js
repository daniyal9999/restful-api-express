const express = require("express");
var router = express.Router();
const validateProduct = require("../../middlewares/validateproduct")
var {Product} = require("../../models/product")

//get products
router.get("/", async (req, res) => {
    let page = Number(req.query.page? req.query.page:1);
    let perPage = Number(req.query.perPage? req.query.perPage:10);
    let skipRecords = (perPage*(page-1));
    let products = await Product.find().skip(skipRecords).limit(perPage);
    return res.send(products)
})
//get single products
router.get("/:id", async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product) return res.status(400).send("Product with given ID not available")
        return res.send(product)
    } catch (err) {
        return res.status(400).send("Invalid ID");
    }
})
//update a product
router.put("/:id",validateProduct, async (req,res) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product) return res.status(400).send("Product with given ID not available")
        product.name = req.body.name;
        product.price = req.body.price;
        await product.save();
        return res.send(product);
    } catch (err) {
        return res.status(400).send("Invalid ID");
    }
})
//delete a record
router.delete("/:id", async (req,res) => {
    try {
        let product = await Product.findByIdAndDelete(req.params.id);
        if(!product) return res.status(400).send("Product with given ID not available");
        return res.send(product); 
    } catch (err) {
        return res.status(400).send("Invalid ID");
    }
})
//create a record
router.post("/",validateProduct, async (req,res) => {
    try {
        let product = new Product()
        if(!product) return res.status(400).send("Product with given ID not available");
        product.name = req.body.name;
        product.price = req.body.price;
        await product.save();
        return res.send(product);
        
    } catch (err) {
        return res.status(400).send("Invalid ID");
    }
})
module.exports = router;