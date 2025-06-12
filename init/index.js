const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
const { initialize } = require("passport");

main()
.then(()=>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDb = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner:"684931580445ba9ac2b8630a",
    }));
    await Listing.insertMany(initData.data);
    // console.log(initData.data);
    console.log("Data was initialized");
}

initDb();