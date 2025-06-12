const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/reviews.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");

// POST and DELETE (with mergeParams for listing ID)
router
  .route("/")
  .post(isLoggedIn, reviewController.createReview);

router
  .route("/:reviewid")
  .delete(isLoggedIn, isReviewAuthor, reviewController.deleteReview);

module.exports = router;
