"use client"

import React, { useEffect } from 'react'
import ProductListClient from './ProductListClient'
import { useAppDispatch } from '@/store/hooks'
import { setProducts, setError } from '@/store/slices/productSlice'
import { IProduct } from '@/lib/types'
import Empty from '../Empty'

const ProductListClientContainer = ({ products, error }: { products: IProduct[], error: string | null }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      dispatch(setError(error))
    } else if (products && products.length > 0) {
      dispatch(setProducts(products))
    }
  }, [products, error, dispatch])

  if (error) return <Empty text={error} />

  if (products.length === 0) return <Empty />

  return <ProductListClient products={products} />
}

export default ProductListClientContainer