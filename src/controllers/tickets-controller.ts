import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';

export async function getAllTickets(_req: Request, res: Response) {
  try {
    const allTickets = await ticketsService.getAllTickets();
    return res.status(httpStatus.OK).send(allTickets);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
