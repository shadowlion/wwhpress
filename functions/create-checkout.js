const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.BOOK_PRICE_ID,
          quantity: 1,
          dynamic_tax_rates: [process.env.BOOK_NJ_TAX_ID],
        },
      ],
      shipping_rates: [process.env.BOOK_SHIPPING_ID],
      mode: "payment",
      submit_type: "book",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        sessionId: session.id,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
