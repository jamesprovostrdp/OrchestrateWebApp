require('dotenv').config();

module.exports = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY, // Used to access Stripe Payment Processing
};