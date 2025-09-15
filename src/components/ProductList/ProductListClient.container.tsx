"use client"

import { useRouter } from 'next/navigation';
import ProductListClient from './ProductListClient'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Loader from '@/components/ui/Loader';
import { addCard } from '@/store/slices/bucketSlice'
import Empty from '../layouts/Empty'
import { RootState } from '@/store'
import { PAGE } from '@/config/page.config';

const ProductListClientContainer = () => {

  const { filteredProducts, loaded, error, loading } = useAppSelector((state: RootState) => state.product)
  const { cards } = useAppSelector((state: RootState) => state.bucket)

  const router = useRouter()
  const dispatch = useAppDispatch();

  const pathTo = (id: number) => {
    router.push(PAGE.SINGLE(id))
  }

  const addToBucket = (id: number) => {
    dispatch(addCard(id))
  }

  if (loading) return <Loader />

  if (error || filteredProducts.length === 0) {
    return <Empty text={error || 'No products found'} />
  }

  return (
    <ProductListClient 
      products={filteredProducts} 
      cards={cards}
      addToBucket={addToBucket}
      pathTo={pathTo} 
    />
  )
}

export default ProductListClientContainer

