const express = require('express');
const Order = require('../models/Order');
const Gig = require('../models/Gig');
const { protect } = require('../middleware/auth');

const router = express.Router();

// POST /api/orders — place an order (clients book a gig)
router.post('/', protect, async (req, res) => {
  try {
    const { gigId, requirements } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    // Prevent freelancer from ordering their own gig
    if (gig.freelancer.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot order your own gig' });
    }

    const order = await Order.create({
      gig: gig._id,
      client: req.user._id,
      freelancer: gig.freelancer,
      totalPrice: gig.price,
      requirements: requirements || '',
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/me — get all orders for current user (both as client and freelancer)
router.get('/me', protect, async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ client: req.user._id }, { freelancer: req.user._id }],
    })
      .populate('gig', 'title price category image')
      .populate('client', 'name email')
      .populate('freelancer', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/orders/:id/status — update order status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Only the freelancer of the order can update status
    if (order.freelancer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
