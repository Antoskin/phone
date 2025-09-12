import React from 'react'
import { fetchProductsServer } from '@/lib/api';
import ProductList from './ProductListClient.container';
import { IApiResponse } from '@/lib/api';
import { IProduct } from '@/lib/types';

const ProductListContainer = async () => {
  const { data, error }: IApiResponse<IProduct[]> = await fetchProductsServer()

  return (
    <ProductList products={data} error={error || null} />
  )
}

export default ProductListContainer