import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { Category } from "@/models/Category";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Center from "@/components/Center";

function CategoryPage({ category, products }) {
  return (
    <>
      <Header />
      <Center>
        <h1>{category}</h1>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const { category } = context.params;
  const name = category
  await mongooseConnect();

  try {
    const category = await Category.findOne({ name });

    if (!category) {
      return
    }

    const products = await Product.find({ category: category._id });

    const serializedProducts = products.map((product) => ({
      _id: product._id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      images: product.images,
    }));

    return {
      props: {
        category: name,
        products: serializedProducts,
      },
    };
  } catch (error) {
    console.error("Error al obtener la categoría y productos:", error);
    return {
      notFound: true,
    };
  }
}

export default CategoryPage;
