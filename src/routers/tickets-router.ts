import { Router } from 'express';
import { getAllTickets, getTicketByUser, postTicket } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', getAllTickets).get('/', getTicketByUser).post('/', postTicket);

export { ticketsRouter };
