import { NextFunction, Request, Response } from 'express';
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

export async function getTicketByUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const ticket = await ticketsService.getTicketbyEnrollmentId(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    next();
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketTypeId } = req.body;
  const { userId } = req;

  if (!ticketTypeId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const result = await ticketsService.createTicket(ticketTypeId, userId);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next();
  }
}
