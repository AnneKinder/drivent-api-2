import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payments-service';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketId } = req.query;
  const userId = req.userId;

  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const payment = await paymentService.getPaymentByTicketId(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (err) {
    next(err);
  }
}
