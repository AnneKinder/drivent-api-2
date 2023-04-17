import { notFoundError, unauthorizedError } from '@/errors';
import { CardData } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getPaymentByTicketId(ticketId: number, userId: number) {
  const payment = await paymentRepository.findPaymentByTicketId(ticketId);

  if (!payment) {
    throw notFoundError();
  }

  //   const ticket = await ticketRepository.findTicketbyEnrollmentId(userId)
  //   if(ticket.id!==ticketId){
  //     throw unauthorizedError()
  //   }

  return payment;
}

async function processPaymentByTicketId(ticketId: number, cardData: CardData, userId: number): Promise<any> {
  const ticket = await ticketRepository.findTicketbyId(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const enrollmentId = ticket.enrollmentId;

  const enrollment = await enrollmentRepository.findEnrollmentById(enrollmentId);

  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}

const paymentService = {
  getPaymentByTicketId,
  processPaymentByTicketId,
};

export default paymentService;
