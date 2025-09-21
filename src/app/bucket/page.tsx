'use client'

import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import Empty from '@/shared/components/layouts/Empty'
import BucketList from '@/shared/components/BucketList'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { initCardsFromLocalStorage } from '@/store/slices/bucketSlice'
import { IProduct } from '@/lib/types'
import { PAGE } from '@/config/page.config'


export default function Bucket() {
  const products: IProduct[] = useAppSelector((state) => state.product.products)
  const bucket: number[] = useAppSelector((state) => state.bucket.cards)
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initCardsFromLocalStorage())
  }, [dispatch])

  const bucketProducts: IProduct[] = useMemo(() => {
    return products.filter((product: IProduct) => (
      bucket.includes(Number(product.id))
    ))
  }, [products, bucket])

  useEffect(() => {
    console.log(bucket, 'bucket')
  }, [bucket])

  useEffect(() => {
    console.log(products, 'products')
  }, [products])

  if (bucketProducts.length === 0) {
    return <>
      <Empty text='No products in bucket' />
      <Link href={PAGE.LIST} className='flex items-center gap-2 mt-5'>
        <FaArrowLeft />
        Go to home
      </Link>
    </>
  }

  return (
    <BucketList products={bucketProducts} />
  )
}
