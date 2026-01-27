/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  const stripe = Stripe(
    'pk_test_51SraUfQVAS1feIYIOlYFKaM7Zf7TPkFT2J0zvpWAIuweZj3sB84FHDKelU41HwjbVpuK8zj3ODOm1XMVZ0YQlIYp00kHeCGMHW'
  );
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
