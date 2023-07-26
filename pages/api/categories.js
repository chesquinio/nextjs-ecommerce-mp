import { Category } from "@/models/Category";
import { Product } from "@/models/Products";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  await mongooseConnect();

  try {
    const categories = await Category.find();

    const categoriesWithProducts = await Promise.all(
        categories.map(async (category) => {
          const products = await Product.find({ category: category._id });
          return {
            _id: category._id,
            name: category.name,
            products: products.map((product) => ({
              _id: product._id,
              title: product.title,
              description: product.description,
              price: product.price,
              images: product.images,
            })),
          };
        })
    );

    return res.status(200).json(categoriesWithProducts);
  } catch (error) {
    console.error("Error al obtener las categorías y productos:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}