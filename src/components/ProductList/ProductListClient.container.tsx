"use client"

import { useEffect, useState } from 'react'
import ProductListClient from './ProductListClient'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Loader from '@/components/ui/Loader';
import { setProducts, setError } from '@/store/slices/productSlice'
import { IProduct } from '@/lib/types'
import Empty from '../layouts/Empty'
import { RootState } from '@/store'

const ProductListClientContainer = ({ products, error }: { products: IProduct[], error: string | null }) => {
  const dispatch = useAppDispatch();
  const { filteredProducts, loaded } = useAppSelector((state: RootState) => state.product)
  const [isHydrated, setIsHydrated] = useState<boolean>(false)
  
  useEffect(() => {
    if (error) {
      dispatch(setError(error))
    } else if (products && products.length > 0 && !loaded) {
      dispatch(setProducts(products))
    
    }

    setIsHydrated(true)
  }, [products, error, dispatch])

  if (!isHydrated) return <Loader />

  if (error) return <Empty text={error} />

  if (filteredProducts.length === 0) return <Empty />

  return <ProductListClient products={filteredProducts || []} />
}

export default ProductListClientContainer