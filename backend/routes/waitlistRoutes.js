const express = require('express');
const router = express.Router();
const createWaitlist=require("../controllers/waitlistController")

router.post('/waitlist', createWaitlist);


module.exports = router;
