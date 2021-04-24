const checkoutButton = document.querySelector("#cc-checkout");

checkoutButton.addEventListener("click", async () => {
  try {
    const url = "/.netlify/functions/create-checkout";
    const response = await fetch(url);
    const { sessionId, publishableKey } = await response.json();
    const stripe = Stripe(publishableKey);
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
});
