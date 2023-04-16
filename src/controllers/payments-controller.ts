import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payments-service';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response, next: NextFunction) {

    const ticketId = parseInt(req.params.ticketId)

  try {
    const payment = await paymentService.getPaymentByTicketId(ticketId)
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}