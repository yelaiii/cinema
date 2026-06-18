import { getCinemaOrders } from '@/api'
import { parseDDMMYY } from '@/app/_utils/parse-date-string'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Typography } from '@/components/ui/typography'

import { TicketCard } from './_components/ticket-card'

export default async function TicketsPage() {
  const orders = await getCinemaOrders()
  const tickets = orders.data.orders.flatMap((order) => order.tickets)

  const activeTickets = []
  const historyTickets = []

  const now = new Date()

  for (const ticket of tickets) {
    const date = parseDDMMYY(ticket.seance.date)
    const [hours, minutes] = ticket.seance.time.split(':')
    date.setHours(+hours, +minutes)

    if (ticket.status === 'PAYED' && date > now) activeTickets.push(ticket)
    else if (date < now || ticket.status === 'CANCELED') historyTickets.push(ticket)
  }

  return (
    <div>
      <div className="md:hidden h-[56px] flex items-center">
        <Typography tag="h1" variant="title-md">
          Билеты
        </Typography>
      </div>

      <Tabs className="flex flex-col pb-40">
        <TabsList className="w-full my-[24px]">
          <TabsTrigger value="active">Ативные</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="flex flex-col gap-[16px]">
          {!activeTickets.length && (
            <Typography variant="heading-md">У вас, пока что, нет билетов</Typography>
          )}
          {activeTickets.map((ticket, i) => (
            <TicketCard key={ticket._id} ticket={ticket} i={i + 1} />
          ))}
        </TabsContent>
        <TabsContent value="history" className="flex flex-col gap-[16px]">
          {!historyTickets.length && <Typography variant="heading-md">Пусто</Typography>}
          {historyTickets.map((ticket, i) => (
            <TicketCard key={ticket._id} ticket={ticket} i={i + 1} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
