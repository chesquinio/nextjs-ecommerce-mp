import { mongooseConnect } from '@/lib/mongoose';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método no permitido
  }

  const { name, email, password } = req.body;
  await mongooseConnect();

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({ error: 'Hubo un error en el registro' });
  }
}