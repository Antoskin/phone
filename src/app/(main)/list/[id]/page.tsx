import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { fetchProductByIdServer } from '@/lib/api'
import Empty from '@/shared/components/layouts/Empty'
import ProductItem from '@/shared/components/ProductItem'
import { PAGE } from '@/config/page.config'
import { headers } from 'next/headers'

interface IParams {
  id: number
}

export default async function Single({ params }: { params: Promise<IParams> }) {
  try {
    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return <Empty text="Invalid product ID" />;
    }
    
    const headersList = await headers()
    const referer = headersList.get('referer') || PAGE.LIST

    const { data, error } = await fetchProductByIdServer(id);

    if (error) return <Empty text={error} />
    if (!data) return <Empty text="Product not found" />

    return (
      <>
        <ProductItem data={data} />
        <Link href={referer} className='lg:w-1/2 mx-auto flex gap-2 items-center text-blue-500 hover:text-blue-600'>
          <AiOutlineArrowLeft />
          <span>Go Back</span>
        </Link>
      </> 
    )
  }
  catch (error) {
    notFound()
  }
}

async function ResponseSSG({ id }: { id: number }) {
  const response = await fetchProductByIdServer(id);
  const product = await response.json();
  return (
    <>
      
    </>
  )
}