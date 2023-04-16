import { badRequestError } from "@/errors/bad-request.error";
import paymentRepository from "@/repositories/payment-repository";

async function getPaymentByTicketId(ticketId:number){
    const payment = await paymentRepository.findPaymentByTicketId(ticketId)

    if(!payment){
        throw badRequestError("Payment not found.")
    }

    return payment
}

const paymentService ={
    getPaymentByTicketId
}

export default paymentService