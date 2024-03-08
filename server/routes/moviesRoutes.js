const Movie = require("../models/movieModel");
const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

// add new movie
router.post("/", authMiddleware, async (req, res) => {
  try {
    req.body.createdBy = req.userId;
    await Movie.create(req.body);
    res
      .status(200)
      .json({ message: "Movie added successfully", success: true });
  } catch (error) {
    res.status(500).json({ mesage: error.mesage, success: false });
  }
});

// get all movies
router.get("/", authMiddleware, async (req, res) => {
  try {
    const filters = req.query;
    const query={};
    if (filters.genre){
      query.genre = filters.genre;
    }
    if (filters.language){
      query.language = filters.language;
    }
    const movies = await Movie.find(query)
      .populate("hero", "name")
      .populate("heroine", "name")
      .populate("director", "name")
      .populate("createdBy", "name");
    res.status(200).json({ data: movies, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, successs: false });
  }
});
// getMovie id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const movies = await Movie.findById(req.params.id)
      .populate("hero", "name")
      .populate("heroine", "name")
      .populate("director", "name")
      .populate("cast")
      .populate("createdBy", "name").sort({createdAt: -1});
    res.status(200).json({ data: movies, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, successs: false });
  }
});
// updateMovie
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send({
      message: "Movies Updated Successfully",
      success: true,
      data: updateMovie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, successs: false });
  }
});
// deleteMovie
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndDelete(req.params.id , {new:true});
    res.send({ message: "Movie Deleted Successfully", success: true, data: updatedMovie });
  } catch (error) {
    res.status(500).json({ message: error.message, successs: false });
  }
});

// get movies by artist id
router.get("/get-movies-by-artist/:id", async(req,res)=>{
  try {
    const artistId = req.params.id;
     const movies = await Movie.find({
      $or: [{hero:artistId},{heroine: artistId},{director: artistId},{cast: {$in : [artistId]}}],
     });
     res.status(200).json({ data: movies, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, successs: false });
  }
}); 
module.exports = router;
