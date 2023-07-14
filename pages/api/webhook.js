import mercadopago from "mercadopago";
import {mongooseConnect} from "@/lib/mongoose";
import {Order} from "@/models/Order";

export default async function handle(req, res) {
    await mongooseConnect();

    if (req.method === "POST") {
        try {
            const payment = req.query;
            if (payment.type === "payment") {           
              const data = await mercadopago.payment.findById(payment["data.id"]);
              const paid = data.response.status
              const orderId = data.response.metadata.order_id
              res.json(data);
              if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId,{
                  paid:true,
                })
              }
            }
            res.sendStatus(204);
          } catch (error) {
            res.json(error);
        }
    }
};