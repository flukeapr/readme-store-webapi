const stripe = require('stripe')('sk_test_51PGKc0EsI8llu3oDr9iFwOvtjslOPsgbgCCwTeCLAOFDnvsly3oaQn7IqDl9fPgtygZARZ7FBbPkMTEujmJ557qg00VZfzKaLr');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

export default async function handle (req, res)  {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2024-04-10'}
  );

  const data = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.cost,
    currency: 'thb',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51PGKc0EsI8llu3oDeskAqIH7UsdaJ5RUliyq9fv7w292YDksrB1m2gK477DtJ5w12MtIG18KE3mRFkfSEfbfSD1K00jB7CeSFX'
  });
};