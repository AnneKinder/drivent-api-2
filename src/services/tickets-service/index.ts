import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { exclude } from '@/utils/prisma-utils';
import { Enrollment, Ticket, TicketType } from '@prisma/client';

async function getEnrollmentIdByUserId(userId: number): Promise<number> {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }
  return enrollment.id;
}

async function getTicketbyEnrollmentId(userId: number): Promise<Ticket &{
  TicketType: TicketType
}> {

  const enrollmentId = await getEnrollmentIdByUserId(userId)

  const ticket = await ticketRepository.findTicketbyEnrollmentId(enrollmentId);
  if (!ticket) {
   throw notFoundError();
  }

  const ticketType = await ticketRepository.findOneTicketType(ticket.ticketTypeId)
  if (!ticketType) {
    throw notFoundError();
   }

   const obj = {
     id: ticket.id,
     status: ticket.status, 
     ticketTypeId: ticket.ticketTypeId,
     enrollmentId: ticket.enrollmentId,
     TicketType: {
       id: ticketType.id,
       name: ticketType.name,
       price: ticketType.price,
       isRemote: ticketType.isRemote,
       includesHotel: ticketType.includesHotel,
       createdAt: ticketType.createdAt,
       updatedAt: ticketType.updatedAt,
     },
     createdAt: ticket.createdAt,
     updatedAt: ticket.updatedAt,
   }

  return obj
}

async function getAllTickets(): Promise<TicketType[]> {
  const allTickets = await ticketRepository.findAllTicketsType();
  if (!allTickets) throw notFoundError();

  return allTickets
}




const ticketsService = {
    getAllTickets,
    getEnrollmentIdByUserId,
    getTicketbyEnrollmentId
};

export default ticketsService;
