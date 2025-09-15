import { IProduct } from '@/lib/types'
import Button from '../ui/Button'

interface IProductListClientProps {
  products: IProduct[]
  pathTo: (id: number) => void
  addToBucket: (id: number) => void
}

const ProductListClient = ({ products, pathTo, addToBucket }: IProductListClientProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {products.map((product: IProduct) => (
        <div key={product.id} className='space-y-4'>
          <div 
            className='border border-gray-300 rounded-md p-5 cursor-pointer hover:shadow-lg transition-shadow'
            onClick={() => pathTo(product.id)}
          >
            <div className='text-lg font-bold mb-2'>
              {product.title}
            </div>
            <div className='text-sm text-gray-500 mb-3'>
              User ID: {product.userId} | Post ID: {product.id}
            </div>
            <div className='text-gray-700'>
              {product.body}
            </div>
          </div>
          <Button type='button' onClick={() => addToBucket(product.id)}>
            Add to Bucket
          </Button>
        </div>
      ))}
    </div>
  )
}

export default ProductListClient