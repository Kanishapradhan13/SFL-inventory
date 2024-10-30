import express from 'express';
const router = express.Router();
import Sublocation from '../models/sublocation.model.js';
const { ObjectId } = mongoose.Types;
import mongoose from 'mongoose';
// get all sublocation of an Location
router.get('/all/:id', async (req, res) => {
  try {
    const sublocations = await Sublocation.aggregate([
      {
        $match: {
          location_id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: '_id',
          foreignField: 'sublocation_id',
          as: 'items',
        },
      },
      {
        $addFields: {
          no_of_items: { $size: '$items' },
        },
      },
      {
        $project: {
          items: 0, // exclude items array from the output
        },
      },
    ]);

    res.status(200).json(sublocations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



  // POST a new sublocation
router.post('/add/:id', async (req, res) => {
const sublocation = new Sublocation({
    sublocation_name: req.body.sublocation_name,
    location_id: req.params.id,
//   no_of_items: req.body.no_of_items,
});

try {
    const newSublocation = await sublocation.save();
    res.status(201).json(newSublocation);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});
  
router.get('/all', async (req, res)=>{
  try{
    const sublocations = await Sublocation.find();
    res.json(sublocations);
  }catch(err){
    res.status(500).json({message: err.message})
  }
})
// DELETE a sublocation by ID
router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedSublocation = await Sublocation.findByIdAndDelete(req.params.id);
      if (!deletedSublocation) {
        return res.status(404).json({ message: 'Sublocation not found' });
      }
      res.status(200).json({ message: 'Sublocation deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
export default router;