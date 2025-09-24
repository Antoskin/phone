"use server";
import { getProducts } from "@/lib/actions/product.actions";
import { IProduct } from "@/lib/types";
//const timer = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function Home() {
  //await timer(2000);

  try {
    const products = await getProducts();
    return (
      <div>
        <h1>Products</h1>
        <div>
          {products?.map((p: IProduct) => (
            <div key={p.id}>
              <h1>product ID: {p.id}</h1>
              <h1>slug: {p.slug}</h1>
              <p>description: {p.description}</p>
              <p>price: {p.price.toString()}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error loading products</div>;
  }
}
