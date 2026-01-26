const express = require('express');
const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking
} = require('./../controllers/bookingController');
const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router.use(protect);

router.get('/checkout-session/:tourId', protect, getCheckoutSession);

router
  .route('/')
  .get(restrictTo('admin', 'lead-guide'), getAllBookings)
  .post(createBooking)
  .delete();

router
  .route('/:id')
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

module.exports = router;
