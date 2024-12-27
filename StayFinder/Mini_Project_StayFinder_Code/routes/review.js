const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");//Express Error
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview ,isLoggedIn , isReviewAuthor}  =require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
//Post Reviews
router.post("/",isLoggedIn,validateReview ,
  wrapAsync (reviewController.createReview)
  
  ); 
    
    //delete review
    router.delete("/:reviewId" ,isLoggedIn , isReviewAuthor,
    wrapAsync(reviewController.deleteReview)

  );

    module.exports = router;