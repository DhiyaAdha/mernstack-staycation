const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.viewDashboard);

// category
router.get('/category', adminController.viewCategory);
router.post('/category', adminController.addCategory);

// bank
router.get('/bank', adminController.viewBank);
// item
router.get('/item', adminController.viewItem);
// booking
router.get('/booking', adminController.viewBooking);

module.exports = router;