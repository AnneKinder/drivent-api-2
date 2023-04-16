import { Enrollment, Ticket, TicketType } from '@prisma/client';
import httpStatus from 'http-status';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { exclude } from '@/utils/prisma-utils';
import { badRequestError } from '@/errors/bad-request.error';
import { NewTicket, TicketWithTicketType } from '@/protocols';

async function getEnrollmentIdByUserId(userId: number): Promise<number> {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }
  return enrollment.id;
}

async function getTicketbyEnrollmentId(userId: number): Promise<TicketWithTicketType> {
  const enrollmentId = await getEnrollmentIdByUserId(userId);

  const ticket = await ticketRepository.findTicketbyEnrollmentId(enrollmentId);
  if (!ticket) {
    throw notFoundError();
  }

  const ticketType = await ticketRepository.findOneTicketType(ticket.ticketTypeId);
  if (!ticketType) {
    throw badRequestError('TicketTypeId not found.');
  }

  const obj: TicketWithTicketType = {
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
  };

  return obj;
}

async function getAllTickets(): Promise<TicketType[]> {
  const allTickets = await ticketRepository.findAllTicketsType();
  if (!allTickets) throw notFoundError();

  return allTickets;
}

async function createTicket(ticketTypeId: number, userId: number): Promise<TicketWithTicketType> {
  if (!ticketTypeId) {
    throw badRequestError('TicketTypeId not found.');
  }

  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const createdTicket = await ticketRepository.create({
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: 'RESERVED',
  });
  if (!createdTicket) {
    throw badRequestError('Ticket not created. Bad Request.');
  }

  return getTicketbyEnrollmentId(userId);
}

const ticketsService = {
  getAllTickets,
  getEnrollmentIdByUserId,
  getTicketbyEnrollmentId,
  createTicket,
};

export default ticketsService;
