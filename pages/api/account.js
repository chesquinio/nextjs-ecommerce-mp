import jwt from "jsonwebtoken";
import { User } from "@/models/User";
import { Order } from "@/models/Order";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Acceso no permitido" });
  }

  await mongooseConnect();

  try {
    
    const decodedToken = jwt.verify(token, "tu_secreto_secreto");

    const user = await User.findOne( {_id:decodedToken.userId} );

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const userEmail = user.email;
    const paidOrders = await Order.find({ paid: true, email: userEmail });

    return res.status(200).json({ name: user.name, email: user.email, orders: paidOrders });
  } catch (error) {
    console.error("Error en el token JWT:", error);
    return res.status(401).json({ error: "Acceso no autorizado" });
  }
}