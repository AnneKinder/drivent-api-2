import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getAllTickets(_req: AuthenticatedRequest, res: Response) {
  try {
    const allTickets = await ticketsService.getAllTickets();
    return res.status(httpStatus.OK).send(allTickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
