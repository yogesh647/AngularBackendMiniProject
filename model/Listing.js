const mongoose=require("mongoose");

const ListingSchema=new mongoose.Schema({
    title:String,
    price:String,
    locality:String,
    details:String

});

module.exports=mongoose.model('/Listing',ListingSchema);