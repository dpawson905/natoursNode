/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_ifsc043Rprx3j8Pd9lXrMI8X'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    showAlert('success', 'Thank you for your purchase');
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
