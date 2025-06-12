const mongoose = require("mongoose");
const Schema =mongoose.Schema;
const Review = require("./reviews.js");
const User = require("./user.js");

const listingSchema = new Schema({

    title:{
        type:String ,
        require:true
    },
    description : String,
    image:{
        type:String,
        default:  "https://unsplash.com/photos/a-large-swimming-pool-surrounded-by-palm-trees-_pPHgeHz1uk",
       set: (v) => v === "" 
       ? "https://unsplash.com/photos/a-large-swimming-pool-surrounded-by-palm-trees-_pPHgeHz1uk"
       :v
    },
    price:Number,
    location:String,
    country:String,

    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        },
    ],

    owner:{
        type:Schema.Types.ObjectId,
         ref:"User"
    }

});


listingSchema.post("findOneAndDelete" , async (listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;