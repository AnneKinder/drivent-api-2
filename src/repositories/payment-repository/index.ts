import { Payment, Prisma } from '@prisma/client';
import { prisma } from '@/config';
import { NewPayment } from '@/protocols';

async function findPaymentByTicketId(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function create({ ticketId, value, cardIssuer, cardLastDigits }: NewPayment): Promise<Payment> {
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer,
      cardLastDigits,
    },
  });
}

const paymentRepository = {
  findPaymentByTicketId,
  create,
};

export default paymentRepository;
