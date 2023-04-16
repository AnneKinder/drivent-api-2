import { Router } from 'express';
import { getPaymentByTicketId} from '@/controllers';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter
    .all('/*', authenticateToken)
    .get('/:ticketId', getPaymentByTicketId);


export { paymentsRouter };
