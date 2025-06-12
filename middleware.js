const Listing = require("./models/listing");
const Review = require("./models/reviews");

module.exports.isLoggedIn = (req,res,next) =>{
  req.session.redirectURL = req.originalUrl;
  console.log(req);
      if(!req.isAuthenticated()){
    req.flash("error","You must be logged in !!");
    return res.redirect("/login");
  }
  next();
}


module.exports.saveRedirectURL = (req,res,next) =>{
  if(req.session.redirectURL){
  res.locals.redirectURL = req.session.redirectURL;
  }
  next();
}

module.exports.isOwner = async (req,res,next) => {
  
  let {id} = req.params;
  let lising = await Listing.findById(id);
  if(!lising.owner.equals(res.locals.curruser._id)){
    req.flash("error", "You are not the Owner of the Lisiting");
    return res.redirect(`/listings/${id}`);
  }

  next();

};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { reviewid } = req.params;
  let review = await Review.findById(reviewid); 

  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect("back");
  }

  if (!review.author.equals(res.locals.curruser._id)) {
    req.flash("error", "You are not the Author of the Review");
    return res.redirect(`/listings/${req.params.id}`);
  }

  next();
};
