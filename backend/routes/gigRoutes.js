const express = require('express');
const Gig = require('../models/Gig');
const { protect, freelancerOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/gigs — get all gigs (with optional category/search filters)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    const gigs = await Gig.find(filter)
      .populate('freelancer', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/gigs/:id — get single gig
router.get('/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate('freelancer', 'name email avatar bio skills');

    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/gigs — create a gig (freelancers only)
router.post('/', protect, freelancerOnly, async (req, res) => {
  try {
    const { title, description, category, price, deliveryDays, image, tags } = req.body;

    const gig = await Gig.create({
      title,
      description,
      category,
      price,
      deliveryDays,
      image,
      tags: tags || [],
      freelancer: req.user._id,
    });

    res.status(201).json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/gigs/:id — delete own gig
router.delete('/:id', protect, freelancerOnly, async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }
    if (gig.freelancer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this gig' });
    }
    await gig.deleteOne();
    res.json({ message: 'Gig deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
