const Waitlist = require('../models/Waitlist');

const createWaitlist = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Please provide both name and email' });
    }
    
    const newEntry = await Waitlist.create({
      name,
      email
    });

    res.status(201).json({
      message: 'Successfully joined the waitlist!',
      data: newEntry
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



module.exports = {
  createWaitlist
};
