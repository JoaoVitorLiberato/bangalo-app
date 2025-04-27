import axios from "axios"
import { IOrder, IDataInfinity } from "../Types/Order"

const PaymentService = axios.create({
  baseURL: process.env.PAYMENT_SERVICE,
  headers: {
    "Content-Type": "application/json"
  }
})

export async function serviceLinkCheckout (payload: IOrder) {
  try {
    const { data } = await PaymentService.post("/payment/start", payload , {
      headers: {
        "Content-Type": "application/json"
      }
    })
  
    return data.link
  } catch {
    return "error-to-generate-link-payment"
  }
}

export async function serviceStatusPayment (payload: IDataInfinity) {
  try {
    const { data } = await PaymentService.post("/payment/status", payload , {
      headers: {
        "Content-Type": "application/json"
      }
    })
  
    return data
  } catch {
    return "error-get-status-payment"
  }
}