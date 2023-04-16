import { Payment, Prisma,   } from '@prisma/client';
import { prisma } from '@/config';



async function findPaymentByTicketId(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where:{ticketId}
  });
}

const paymentRepository = {
    findPaymentByTicketId
}

export default paymentRepository;