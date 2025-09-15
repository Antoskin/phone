"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import ProductListClient from './ProductListClient'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Loader from '@/components/ui/Loader';
import { setProducts, setError } from '@/store/slices/productSlice'
import { addCard } from '@/store/slices/bucketSlice'
import { IProduct } from '@/lib/types'
import Empty from '../layouts/Empty'
import { RootState } from '@/store'
import { PAGE } from '@/config/page.config';

const ProductListClientContainer = ({ products, error }: { products: IProduct[], error: string | null }) => {

  const { filteredProducts, loaded } = useAppSelector((state: RootState) => state.product)
  const [isHydrated, setIsHydrated] = useState<boolean>(false)

  const router = useRouter()
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      dispatch(setError(error))
    } else if (products && products.length > 0 && !loaded) {
      dispatch(setProducts(products))
    }

    setIsHydrated(true)
  }, [products, error, dispatch])

  const pathTo = (id: number) => {
    router.push(PAGE.SINGLE(id))
  }

  const addToBucket = (id: number) => {
    dispatch(addCard(id))
  }

  if (!isHydrated) return <Loader />

  if (error) return <Empty text={error} />

  if (filteredProducts.length === 0) return <Empty />

  return (
    <ProductListClient 
      products={filteredProducts || []} 
      addToBucket={addToBucket}
      pathTo={pathTo} 
      />
  )
}

export default ProductListClientContainer

