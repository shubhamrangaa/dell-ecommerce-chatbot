import Head from "next/head"
import ProductsList from "../components/ProductsList"
import CategoryButtons from "../components/CategoryButtons"
import { getProducts } from "../utils/api"

const HomePage = ({ products, categories }) => {
  return (
    <div>
      <Head>
        <title>Dell - laptops</title>
      </Head>
      <CategoryButtons categories={categories} />
      <ProductsList products={products} />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProducts()
  return { props: { products } }
}

export default HomePage
