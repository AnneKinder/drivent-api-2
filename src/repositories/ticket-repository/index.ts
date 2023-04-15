import { Prisma, Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';


async function findAllTicketsType(): Promise<TicketType[]> {
  return prisma.ticketType.findMany()
}

async function findOneTicketType(ticketTypeId: number): Promise<TicketType> {
  return prisma.ticketType.findFirst({
    where:{id: ticketTypeId}
  });
}

async function findTicketbyEnrollmentId(enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: { enrollmentId }
  });
}



const ticketRepository = {
    findAllTicketsType,
    findTicketbyEnrollmentId,
    findOneTicketType
};

export default ticketRepository;
