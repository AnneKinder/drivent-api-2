import { Router } from 'express';
import { getAllTickets, getTicketByUser } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', getAllTickets)
    .get('/', getTicketByUser);

export { ticketsRouter };
