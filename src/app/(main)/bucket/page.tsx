'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import Empty from '@/components/layouts/Empty'
import BucketList from '@/components/BucketList'
import { useAppSelector } from '@/store/hooks'
import { IProduct } from '@/lib/types'
import { PAGE } from '@/config/page.config'
import Loader from '@/components/ui/Loader'

export default function Bucket() {
  const { products, loading } = useAppSelector((state) => state.product)
  const bucket: number[] = useAppSelector((state) => state.bucket.cards)

  const bucketProducts: IProduct[] = useMemo(() => {
    return products.filter((product: IProduct) => (
      bucket.includes(Number(product.id))
    ))
  }, [products, bucket])

  if (loading) {
    return <Loader />
  }

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
