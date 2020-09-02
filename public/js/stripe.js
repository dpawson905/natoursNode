/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51HMi5XEfvVWRSrp6FUOuZ2MxVVr1WuBwoQMxqHgJ4SQW8Jzx8JyZVJ6bQK1LifbhoNDK0Ixbu2ePrErimTKxv3tX00eChf6RUf'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
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
