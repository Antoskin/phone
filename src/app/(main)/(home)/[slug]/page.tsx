import notFound from "@/app/not-found";
import { getProduct } from "@/lib/actions/product.actions";
import { IProduct } from "@/lib/types";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product: IProduct | null = await getProduct(slug);
console.log(product);
  if (!product) {
    return notFound();
  }

  return <div>
    <Link href="/" className="flex items-center gap-2 uppercase text-green-500 mb-10">
      <ArrowBigLeft /> go back
    </Link>
    {product.slug} <br />
    {product.description} <br />
    {product.price.toString()} <br />
    {product.description} <br />
  </div>;
};

export default ProductPage;