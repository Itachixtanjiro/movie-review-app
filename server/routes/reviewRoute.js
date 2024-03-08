const Review = require("../models/reviewModel");
const router = require("express").Router();
const Movie = require("../models/movieModel");
const authMiddleware = require("../middleware/authMiddleware");
const { message } = require("antd");
const { default: mongoose } = require("mongoose");
//add review

router.post("/", authMiddleware, async (req, res) => {
  try {
    
    req.body.user = req.userId;
    const newReview = new Review(req.body);
    await newReview.save();
    const movieId = new mongoose.Types.ObjectId(req.body.movie);
    // average rating
    const averageRating = await Review.aggregate([
      {
        $match: { movie: movieId },
      },
      {
        $group: {
          _id: "$movie",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    const averageRatingvalue = averageRating[0]?.averageRating || 0;
    await Movie.findOneAndUpdate(movieId, {
      rating: averageRatingvalue,
    });
    res
      .status(200)
      .json({ message: "Review added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});
 // get all reviews by movie id

router.get('/', async(res,req)=>{
     try {
        
        const reviews = await Review.find(req.query|| {}).sort({createdAt:-1})
        .populate("user", "new email")
        .populate("movie","name");
        res.status(200).json({data:reviews, success:true});
     } catch (error) {
        res.status(500).json({message:error.message, success:true});
     }
}); 

// update reviews
router.put('/:id', authMiddleware, async(res,req)=>{
  try {
    await Review.findByIdAndUpdate(req.params.id, req.body,{new : true});
    const movieId = new mongoose.Types.ObjectId(req.body.movie);
    // average rating
    const averageRating = await Review.aggregate([
      {
        $match: { movie: movieId },
      },
      {
        $group: {
          _id: "$movie",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    const averageRatingvalue = averageRating[0]?.averageRating || 0;
    await Movie.findOneAndUpdate(movieId, {
      rating: averageRatingvalue,
    });
    res
      .status(200)
      .json({ message: "Review updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});


// delete review
 router.delete("/:id", authMiddleware, async (res, req) => {
   try {
     await Review.findByIdAndUpdate(req.params.id);
     const movieId = new mongoose.Types.ObjectId(req.body.movie);
     // average rating
     const averageRating = await Review.aggregate([
       {
         $match: { movie: movieId },
       },
       {
         $group: {
           _id: "$movie",
           averageRating: { $avg: "$rating" },
         },
       },
     ]);
     const averageRatingvalue = averageRating[0]?.averageRating || 0;
     await Movie.findOneAndUpdate(movieId, {
       rating: averageRatingvalue,
     });
     res
       .status(200)
       .json({ message: "Review deleted successfully", success: true });
   } catch (error) {
     res.status(500).json({ message: error.message, success: false });
   }
 });


 module.exports =router;