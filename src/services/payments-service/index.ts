import { notFoundError, unauthorizedError } from '@/errors';
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

const paymentService = {
  getPaymentByTicketId,
};

export default paymentService;
