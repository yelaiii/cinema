'use server'

import { refresh } from 'next/cache'

import { putCinemaOrdersCancel } from '@/api'

export async function returnTicketAction(orderId: string) {
  await putCinemaOrdersCancel({
    body: {
      orderId,
    },
  })
  refresh()
}
