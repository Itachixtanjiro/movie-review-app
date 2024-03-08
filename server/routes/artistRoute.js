const Artist = require('../models/artistsModel');
const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');

// add new artist
router.post('/',authMiddleware,async(req,res)=>{
    try {
        req.body.createdBy = req.userId;
        await Artist.create(req.body);
        res.json({message:"Artist added successfully", success: true});
    } catch (error) {
        res.status(500).json({mesage:error.mesage , success: false});
    }
});
 // get all artists
router.get("/",authMiddleware, async(req,res)=>{
    try {
        const artists = await Artist.find().sort({createdAt: -1});
        res.json ({data: artists,success:true});
    } catch (error) {
        res.status(500).json({message:error.message, successs: false});
    }
});
// get artist id
router.get("/:id",authMiddleware, async(req,res)=>{
    try {
        const artists = await Artist.findById(req.params.id);
        res.json ({data: artists,success:true});
    } catch (error) {
        res.status(500).json({message:error.message, successs: false});
    }
});
// update artist
router.put("/:id",authMiddleware, async(req,res)=>{
    try {
        const updatedArtist =await Artist.findByIdAndUpdate(req.params.id,req.body, {new: true});
        res.json ({message:"Artist Updated Successfully",success:true , data:updatedArtist});
    } catch (error) {
        res.status(500).json({message:error.message, successs: false});
    }
});
// delete artist
router.delete("/:id",authMiddleware, async(req,res)=>{
    try {
        await Artist.findByIdAndDelete(req.params.id);
        res.json ({message:"Artist Deleted Successfully",success:true});
    } catch (error) {
        res.status(500).json({message:error.message, successs: false});
    }
});
module.exports=router;