// Imported modules
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const { stripeSecretKey } = require("./config/environmentVars");
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const eventRouter = require('./routes/eventRoutes');

// Connect to Database
connectDB();

// Initializes the Stripe instance with the Secret Key
const stripe = new Stripe(stripeSecretKey);
const app = express();

// Middleware setup for payment processing
app.use(cors()); // Allows cross-origin requests between the front-end and back-end
app.use(express.json()); // Parses incoming JSON requests

// Api routing for users and events
app.use('/api/user/', userRouter);
app.use('/api/event/', eventRouter);

// POST for payment window
app.post("/create-payment-intent", async (req, res) => {

  try {
    const { amount } = req.body; // Extracts the payment amount from the request body (in cents)

    // Creates a paymentIntent for each transaction
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents (e.g., 1000 = $10.00)
      currency: "cad", // Sets currency to Canadian Dollar
      payment_method_types: ["card"], // Payment methods are restricted to card payments
    });

    // Reponds with the client secret for front-end payment confirmation, and the payment id for tracking
    res.json({ clientSecret: paymentIntent.client_secret, paymentId: paymentIntent.id });
  } catch (error) {
    // Sends a 500 error message when an error occurs with payment
    res.status(500).json({ error: error.message });
  }
});

// Starts the server and listens on the specified port (port 3001)
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
