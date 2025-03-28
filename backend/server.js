const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const { stripeSecretKey } = require("./config/environmentVars");
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const eventRouter = require('./routes/eventRoutes');

// Connect to Database
connectDB();

const stripe = new Stripe(stripeSecretKey);
const app = express();

app.use(cors());
app.use(express.json());


// Api routing for users
app.use('/api/user/', userRouter);
app.use('/api/event/', eventRouter);

// POST for payment window
app.post("/create-payment-intent", async (req, res) => {
	try {
		const { amount } = req.body; // Amount in cents (e.g., $10.00 = 1000)

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: "cad",
			payment_method_types: ["card"],
		});

    res.json({ clientSecret: paymentIntent.client_secret, paymentId: paymentIntent.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
