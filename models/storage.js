var mongoose = require("mongoose");
const Joi = require('joi');

var storageSchema = mongoose.Schema({
    name: String,
    price: String,
});
var Storage= mongoose.model("Storage", storageSchema);

function validateStorage(data){
    const schema = Joi.object({
        name: Joi.string().min(0).required(),
        price: Joi.number().min(0).required()
    })
    return schema.validate(data,{abortEarly:false});
}

module.exports.Storage = Storage;
module.exports.validate = validateStorage;