const Review = require('../models/reviewModel');

const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tour_id) filter = { tour: req.params.tour_id };
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = new Review(req.body);
  if (!newReview.tour) newReview.tour = req.params.tour_id;
  if (!newReview.user) newReview.user = req.user.id;
  await newReview.save();

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
