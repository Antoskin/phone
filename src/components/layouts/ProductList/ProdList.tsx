"use client";

import React from 'react'
import { IProduct } from '@/lib/types';

export default function ProdList({ products }: { products: IProduct[] }) {

  return (
    <div className='grid grid-cols-4 gap-5'>
      {products.map((product: IProduct) => (
        <div key={product.id} className='border border-gray-300 rounded-md p-5 cursor-pointer'>
          <div className='text-lg font-bold mb-4'>
            {product.name}
          </div>
          {product?.data && (
            <div className='grid grid-cols-1 gap-2'>
              {Object.entries(product.data).map(([key, value]) => (
                <div key={key + product.id} className='flex gap-2'>
                  <span className='text-sm text-gray-500'>{key}</span>
                  <span className='text-sm'>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}