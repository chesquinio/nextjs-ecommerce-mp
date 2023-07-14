import mercadopago from "mercadopago";
import { Product } from "@/models/Products";
import { Order } from "@/models/Order";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  if (req.method !== "POST") {
    res.json("Should be a POST request");
    return;
  }
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_API_KEY,
  });
  await mongooseConnect();

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;

  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        title: productInfo.title,
        unit_price: productInfo.price,
        currency_id: "ARG",
        quantity,
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const result = await mercadopago.preferences.create({
    items: line_items,
    notification_url: "https://dd68-152-171-16-186.ngrok-free.app/api/webhook",
    metadata: {orderId:orderDoc._id.toString()},
    back_urls: {
      success: `${process.env.HOST}/cart?success=1`,
      //failure: `${process.env.HOST}/cart?canceled=1`,
      //pending: `${HOST}/pending`,
    },
  });

  res.json(result.body);
}