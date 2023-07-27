import Featured from '@/components/Featured'
import Header from '@/components/Header'
import NewProducts from '@/components/NewProducts'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Products'

function HomePage({featuredProduct, newProducts}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts products={newProducts}/>
    </div>
  )
}
export default HomePage

export async function getServerSideProps() {
  await mongooseConnect()
  const featuredProduct = await Product.findOne({ main: true });
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10})
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))   
    },
  }
}