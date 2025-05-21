import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

import { QueryUsers } from '@/shared/lib/services/firebase'

export async function POST(req: NextRequest) {
  try {
    const clerkEvent = await verifyWebhook(req)

    const { id } = clerkEvent.data
    const eventType = clerkEvent.type

    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', clerkEvent.data)

    if (eventType === 'user.created') {
      const { id, email_addresses, first_name, last_name, image_url } = clerkEvent.data

      await QueryUsers.createOrUpdateUser({
        id,
        email: email_addresses[0]?.email_address || '',
        firstName: first_name,
        lastName: last_name,
        imageUrl: image_url
      })
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}