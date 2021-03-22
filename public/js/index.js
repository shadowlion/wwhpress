const stripe = Stripe(
  "pk_test_51ISoQ4FerEI1oMqtSjXSRYVnPONSpRYBkuVZ7ROLfRojsQqCmM0rYqlaXGaZOs6jtVHAOo9EDZobN3nyWRl9Fdtc008mvdhP3u"
);

const checkoutButton = document.querySelector("#cc-checkout");
checkoutButton.addEventListener("click", async () => {
  try {
    const result = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1ITs72FerEI1oMqtrfOkOl36",
          quantity: 1,
        },
        {
          price: "price_1IWoxcFerEI1oMqthr0SLg0d",
          quantity: 1,
        }
      ],
      mode: "payment",
      successUrl: "https://wwhpress.netlify.app/success",
      cancelUrl: "https://wwhpress.netlify.app/cancel",
      shippingAddressCollection: {
        allowedCountries: ["US", "CA"],
      },
      submitType: "book",
    });

    if (result.error) {
      const displayError = document.querySelector("#error");
      displayError.textContent = result.error.message;
    }
  } catch (error) {
    console.error(error);
  }
});
