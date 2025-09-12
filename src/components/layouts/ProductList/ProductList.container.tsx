import React from 'react'
import { fetchProductsServer } from '@/lib/api';
//import Loader from '../Loader';
import Empty from '../Empty';
import ProductList from './ProductList';

const ProductListContainer = async () => {
  const { data: products, error } = await fetchProductsServer()

  if (error) {
    return error;
  }

  if (products.length === 0) return <Empty />;

  return (
    <ProductList products={products} />
  )
}

export default ProductListContainer