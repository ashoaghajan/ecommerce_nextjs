const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
      console.log(req.body.cartItems)
    try {
    const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        builling_address_collection: 'auto',
        shipping_options: [
            { shipping_rate: 'shr_1L3JcNJ999v6OkfN6hVYo47Y' },
            { shipping_rate: 'shr_1L3JdCJ999v6OkfNFvqkSBFR' }
        ],
        line_items: [
            {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: '{{PRICE_ID}}',
            quantity: 1,
            },
        ],
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
    }
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create(params);
        res.redirect(303, session.url);
    } 
    catch (err: any) {
        res.status(err.statusCode || 500).json(err.message);
    }
  } 
  else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
  }
}