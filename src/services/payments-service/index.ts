import { Payment } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import { CardData } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getPaymentByTicketId(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTicketbyId(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const enrollmentId = ticket.enrollmentId;

  const enrollment = await enrollmentRepository.findEnrollmentById(enrollmentId);
  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const payment = await paymentRepository.findPaymentByTicketId(ticketId);
  if (!payment) {
    throw notFoundError();
  }

  return payment;
}

async function getPrice(ticketId: number) {
  const ticket = await ticketRepository.findTicketbyId(ticketId);

  const ticketType = await ticketRepository.findOneTicketType(ticket.ticketTypeId);

  return ticketType.price;
}

async function processPaymentByTicketId(ticketId: number, cardData: CardData, userId: number): Promise<Payment> {
  const ticket = await ticketRepository.findTicketbyId(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const enrollmentId = ticket.enrollmentId;

  const enrollment = await enrollmentRepository.findEnrollmentById(enrollmentId);
  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const value = Number(getPrice(ticketId));
  const cardIssuer = cardData.issuer;
  const cardLastDigits = cardData.number.toString().slice(-4);

  ticketRepository.updateStatus(ticketId);

  return await paymentRepository.create({ ticketId, value, cardIssuer, cardLastDigits });
}

const paymentService = {
  getPaymentByTicketId,
  processPaymentByTicketId,
};

export default paymentService;
