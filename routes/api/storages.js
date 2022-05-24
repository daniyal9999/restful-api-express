const express = require("express");
var router = express.Router();
const validateStorage = require("../../middlewares/validatestorage")
var {Storage} = require("../../models/storage")

//get products
router.get("/", async (req, res) => {
    let page = Number(req.query.page? req.query.page:1);
    let perPage = Number(req.query.perPage? req.query.perPage:10);
    let skipRecords = (perPage*(page-1));
    let storages = await Storage.find().skip(skipRecords).limit(perPage);
    return res.send(storages)
})
//get single products
router.get("/:id", async (req, res) => {
    try {
        let storage = await Storage.findById(req.params.id);
        if(!storage) return res.status(400).send("Storage with given ID not available")
        return res.send(storage)
    } catch (err) {
        return res.status(400).send("Invalid ID");
    }
})
//update a product
router.put("/:id",validateStorage, async (req,res) => {
    try {
        let storage = await Storage.findById(req.params.id);
        if(!storage) return res.status(400).send("Storage with given ID not available")
        storage.name = req.body.name;
        storage.price = req.body.price;
        await storage.save();
        return res.send(storage);
    } catch (err) {
        return res.status(400).send("Invalid ID");
    }
})
//delete a record
router.delete("/:id", async (req,res) => {
    try {
        let storage = await Storage.findByIdAndDelete(req.params.id);
        if(!storage) return res.status(400).send("storage with given ID not available");
        return res.send(storage); 
    } catch (err) {
        return res.status(400).send("Invalid ID");
    }
})
//create a record
router.post("/",validateStorage, async (req,res) => {
    try {
        let storage = new Storage()
        if(!storage) return res.status(400).send("storage with given ID not available");
        storage.name = req.body.name;
        storage.price = req.body.price;
        await storage.save();
        return res.send(storage);
        
    } catch (err) {
        return res.status(400).send("Invalid ID");
    }
})
module.exports = router;