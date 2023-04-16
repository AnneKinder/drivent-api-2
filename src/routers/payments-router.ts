import { Router } from 'express';
import { getPaymentByTicketId } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPaymentByTicketId);

export { paymentsRouter };
