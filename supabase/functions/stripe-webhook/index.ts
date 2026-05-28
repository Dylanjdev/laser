import Stripe from 'https://esm.sh/stripe@17.5.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-12-18.acacia',
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

Deno.serve(async request => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const signature = request.headers.get('Stripe-Signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

  if (!signature || !webhookSecret) {
    return new Response('Missing Stripe webhook configuration', { status: 400 })
  }

  const body = await request.text()
  let event: Stripe.Event

  try {
    const cryptoProvider = Stripe.createSubtleCryptoProvider()
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider,
    )
  } catch (error) {
    console.error('Stripe signature verification failed', error)
    return new Response('Invalid signature', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.client_reference_id

    console.log('Received checkout.session.completed', {
      sessionId: session.id,
      hasBookingId: Boolean(bookingId),
      paymentStatus: session.payment_status,
    })

    if (!bookingId) {
      console.error('Checkout session missing client_reference_id', session.id)
      return new Response('Missing booking reference', { status: 400 })
    }

    if (session.payment_status !== 'paid') {
      console.error('Checkout session completed without paid status', {
        sessionId: session.id,
        paymentStatus: session.payment_status,
      })
      return new Response('Payment is not paid', { status: 400 })
    }

    const { data, error } = await supabase
      .from('bookings')
      .update({
        status: 'paid',
        stripe_checkout_session_id: session.id,
        stripe_customer_email: session.customer_details?.email ?? null,
        amount_total: session.amount_total,
      })
      .eq('id', bookingId)
      .eq('status', 'pending')
      .select('id')

    if (error) {
      console.error('Booking update failed', error)
      return new Response('Booking update failed', { status: 500 })
    }

    if (!data?.length) {
      console.error('No pending booking matched Stripe session', {
        sessionId: session.id,
        bookingId,
      })
      return new Response('No pending booking matched', { status: 404 })
    }

    console.log('Booking marked paid', {
      sessionId: session.id,
      bookingId,
    })
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
