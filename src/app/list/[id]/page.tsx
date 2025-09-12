import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchProductByIdServer } from '@/lib/api'
import Empty from '@/components/layouts/Empty'
import { PAGE } from '@/config/page.config'

interface IParams {
  id: number
}

export default async function Single({ params }: { params: IParams }) {
  try {
    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return <Empty text="Invalid product ID" />;
    }
    
    const { data, error } = await fetchProductByIdServer(id);
    if (error) return <Empty text={error} />
    if (!data) return <Empty text="Product not found" />

    return (
      <div className='lg:w-1/2 mx-auto relative'>
        <p className='text-sm text-gray-500 mb-4'>
          User ID: {data?.userId}
        </p>
        <p className='text-2xl font-bold mb-4 capitalize leading-relaxed'>
          {data?.title}
        </p>
        <p className='text-gray-500 mb-4'>
          {data?.body}
        </p>
        <Link href={PAGE.LIST} className='text-blue-500'>Back to list</Link>
      </div>
    )
  }
  catch (error) {
    notFound()
  }
}