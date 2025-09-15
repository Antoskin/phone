import { IProduct } from '@/lib/types'
import React from 'react'

const BucketList = ({ products }: { products: IProduct[] }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.body}</p>
        </div>
      ))}
    </div>

  )
}

export default BucketList