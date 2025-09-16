import { IProduct } from "@/lib/types"

interface IProductItemProps {
  data: IProduct
}

export default function ProductItem({ data }: IProductItemProps) {
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
    </div>
  )
}
