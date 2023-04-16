import { notFoundError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';

async function getPaymentByTicketId(ticketId: number) {
  const payment = await paymentRepository.findPaymentByTicketId(ticketId);

  if (!payment) {
    throw notFoundError();
  }

  return payment;
}

const paymentService = {
  getPaymentByTicketId,
};

export default paymentService;
