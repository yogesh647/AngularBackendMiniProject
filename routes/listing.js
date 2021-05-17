
const route=require("express").Router();

// path require
const Listing=require('../model/Listing');

//Add new route listing
route.post('/',async (req,res)=>{
const listing=new Listing({
    title:req.body.title,
    price:req.body.price,
    locality:req.body.locality,
    details:req.body.details
});
try
{
   const savedListing=await listing.save();
   res.send(savedListing);
}
catch(error)
{
   res.status(400).send(error);
}

});

// get route all listing
route.get('/', async (req,res)=>{
    
    try{
        const listing=await Listing.find();
        res.json(listing);
    }
    catch(error){
        res.json({message:error});
    }

    });

// Single route listing
route.get('/:listingId',async (req,res)=>{
    try{
       const listing=await Listing.findById(req.params.listingId);
       res.json(listing);
    }
    catch(error){
        res.json({message:error});
    }

    
    });

//Update route listing
route.put('/:listingId',async (req,res)=>{
    try{
        const listing={
            title:req.body.title,
            price:req.body.price,
            locality:req.body.locality,
            details:req.body.details
        }
        const updateListing= await Listing.findByIdAndUpdate({_id:req.params.listingId},listing);
        res.json(updateListing);
    }
    catch(error){
        res.json({message:error});
    }

    
    });

//Delete route listing
route.delete('/:listingId',async (req,res)=>{
    try{
      const removeListing=await Listing.findByIdAndDelete(req.params.listingId);
      res.json(removeListing);
    }
    catch(error){
        res.json({message:error});
    }
    });


module.exports=route;
