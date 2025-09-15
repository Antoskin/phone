'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import Empty from '@/components/layouts/Empty'
import BucketList from '@/components/BucketList'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeCard } from '@/store/slices/bucketSlice'
import { IProduct } from '@/lib/types'
import { PAGE } from '@/config/page.config'
import Loader from '@/components/ui/Loader'
import { useRouter } from 'next/navigation'

export default function Bucket() {
  const { products, loading } = useAppSelector((state) => state.product)
  const bucket: number[] = useAppSelector((state) => state.bucket.cards)
  
  const dispatch = useAppDispatch()
  const router = useRouter()

  const bucketProducts: IProduct[] = useMemo(() => {
    return products.filter((product: IProduct) => (
      bucket.includes(Number(product.id))
    ))
  }, [products, bucket])

  const removeFromBucket = (id: number) => {
    dispatch(removeCard(id))
  }

  const pathTo = (id: number) => {
    router.push(PAGE.SINGLE(id))
  }

  if (loading) {
    return <Loader />
  }

  if (bucketProducts.length === 0) {
    return <div className='lg:w-1/2 mx-auto'>
      <Empty text='No products in bucket' />
      <Link href={PAGE.LIST} className='flex items-center gap-2 mt-5'>
        <FaArrowLeft />
        Go to home
      </Link>
    </div>
  }

  return (
    <BucketList 
      products={bucketProducts} 
      pathTo={pathTo}
      removeFromBucket={removeFromBucket}
    />
  )
}
