import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { fetchProductByIdServer } from '@/lib/api'
import Empty from '@/components/layouts/Empty'
import ProductItem from '@/components/ProductItem'
import { PAGE } from '@/config/page.config'

interface IParams {
  id: number
}

export default async function Single({ params }: { params: Promise<IParams> }) {
  try {
    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return <Empty text="Invalid product ID" />;
    }
    
    const { data, error } = await fetchProductByIdServer(id);

    if (error) return <Empty text={error} />
    if (!data) return <Empty text="Product not found" />

    return (
      <>
        <ProductItem data={data} />
        <Link href={PAGE.LIST} className='flex gap-2 items-center text-blue-500'>
          <AiOutlineArrowLeft />
          <span>Back to list</span>
        </Link>
      </> 
    )
  }
  catch (error) {
    notFound()
  }
}