import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import { TicketType } from '@/protocols';

async function getAllTickets(): Promise<TicketType[]> {
  const allTickets = await ticketRepository.findAllTicketsType();
  if (!allTickets) throw notFoundError();

  return allTickets
}



const ticketsService = {
    getAllTickets,
};

export default ticketsService;
