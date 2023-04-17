import { Enrollment, Prisma, Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { NewTicket } from '@/protocols';

async function findAllTicketsType(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findOneTicketType(ticketTypeId: number): Promise<TicketType> {
  return prisma.ticketType.findFirst({
    where: { id: ticketTypeId },
  });
}

async function findTicketbyEnrollmentId(enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
  });
}

async function findTicketbyId(ticketId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
  });
}

async function create({ ticketTypeId, enrollmentId, status }: NewTicket): Promise<any> {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status,
    },
  });
}

async function updateStatus(ticketId: number): Promise<any> {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: 'PAID',
    },
  });
}

const ticketRepository = {
  findAllTicketsType,
  findTicketbyEnrollmentId,
  findOneTicketType,
  findTicketbyId,
  create,
  updateStatus,
};

export default ticketRepository;
