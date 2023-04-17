import { Router } from 'express';
import { getPaymentByTicketId, processPayment } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPaymentByTicketId).post('/process', processPayment);

export { paymentsRouter };
