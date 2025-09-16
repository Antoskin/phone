import { IProduct } from '@/lib/types'
import Button from '../ui/Button'
import { FaEye, FaTrash } from 'react-icons/fa'

interface IBucketListProps {
  products: IProduct[]
  removeFromBucket: (id: number) => void
  pathTo: (id: number) => void
}

const BucketList = ({ products, removeFromBucket, pathTo }: IBucketListProps) => {
  return (
    <div className='space-y-10 lg:w-1/2 mx-auto'>
      {products.map((product) => (
        <div key={product.id} className='space-y-4 border-b border-gray-300 pb-5 last:border-b-0'>
          <h3 className='text-2xl font-bold'>{product.title}</h3>
          <p>{product.body}</p>
          <div className='flex justify-end gap-2'>
            <Button type='button' onClick={() => pathTo(product.id)}>
              <FaEye />
            </Button>
            <Button type='button' onClick={() => removeFromBucket(product.id)}>
              <FaTrash />
            </Button>
          </div>
        </div>
      ))}
    </div>

  )
}

export default BucketList