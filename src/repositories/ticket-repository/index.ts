import { Prisma } from '@prisma/client';
import { prisma } from '@/config';
import { TicketType } from '@/protocols';


async function findAllTicketsType(): Promise<TicketType[]> {
  return prisma.ticketType.findMany()
}


const ticketRepository = {
    findAllTicketsType,
};

export default ticketRepository;
