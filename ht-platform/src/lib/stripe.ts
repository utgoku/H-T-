// npm install stripe

// Fallback to prevent crash if stripe is not installed
let Stripe: any = null;
try {
  Stripe = require('stripe').default || require('stripe');
} catch (error) {
  console.warn('Stripe is not installed yet. Run: npm install stripe');
}

/**
 * Stripe Payment Integration Setup
 * 
 * Setup Instructions:
 * 1. Install stripe package: npm install stripe
 * 2. Add keys to .env.local:
 *    STRIPE_SECRET_KEY=sk_test_...
 *    STRIPE_WEBHOOK_SECRET=whsec_...
 *    NEXT_PUBLIC_APP_URL=http://localhost:3000
 * 3. Configure webhook endpoint in Stripe dashboard pointing to <APP_URL>/api/stripe/webhook
 */

let stripeInstance: any = null;

/**
 * Lazily initialize Stripe instance
 */
export const getStripeInstance = () => {
  if (!Stripe) {
    throw new Error('Stripe package is not installed. Please run `npm install stripe`');
  }

  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY || 'mock_key_for_build';
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
      appInfo: {
        name: 'PrymaLab',
        version: '1.0.0',
      },
    });
  }

  return stripeInstance;
};

export const STRIPE_CONFIG = {
  currency: 'vnd',
  paymentMethods: ['card'],
  successUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?status=success&session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?status=cancelled`,
};

/**
 * Creates a Stripe Checkout Session
 * @param packageSlug - The identifier for the service package
 * @param customerEmail - The email of the customer purchasing
 * @returns The session URL to redirect the user to
 */
export const createCheckoutSession = async (packageSlug: string, customerEmail: string) => {
  try {
    // Import dynamically to avoid circular dependencies or missing constants
    const { SERVICE_PACKAGES } = await import('@/lib/constants').catch(() => ({ SERVICE_PACKAGES: [] }));
    
    // Mock package if constants are missing
    const pkg = SERVICE_PACKAGES?.find((p: any) => p.slug === packageSlug) || {
      slug: packageSlug,
      name: 'Gói Dịch Vụ PrymaLab',
      price: 500000
    };

    const stripe = getStripeInstance();
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: STRIPE_CONFIG.paymentMethods,
      mode: 'payment',
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: STRIPE_CONFIG.currency,
            product_data: {
              name: pkg.name,
            },
            unit_amount: pkg.price, 
          },
          quantity: 1,
        },
      ],
      success_url: STRIPE_CONFIG.successUrl,
      cancel_url: STRIPE_CONFIG.cancelUrl,
      metadata: {
        packageSlug,
      },
    });

    return session.url;
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    throw error;
  }
};

/**
 * Validates and processes a Stripe webhook event
 * @param payload - Raw body text of the webhook request
 * @param signature - The stripe-signature header value
 * @returns Processed event object
 */
export const handleWebhookEvent = (payload: string, signature: string) => {
  try {
    const stripe = getStripeInstance();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
    }

    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log(`Payment successful for session: ${session.id}`);
        // TODO: Grant access to service package in database
        break;
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent successful: ${paymentIntent.id}`);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return event;
  } catch (error) {
    console.error('Error handling Stripe webhook:', error);
    throw error;
  }
};
