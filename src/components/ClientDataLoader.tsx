"use client"

import { useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setError, setProducts, setLoading } from '@/store/slices/productSlice'
import { IProduct } from '@/lib/types'
import { RootState } from '@/store'
import { initCardsFromLocalStorage } from '@/store/slices/bucketSlice'

const ClientDataLoader = ({ products, error }: { products: IProduct[], error: string | null }) => {
  const { loaded } = useAppSelector((state: RootState) => state.product)

  const dispatch = useAppDispatch();

  //init bucket card
  useEffect(() => {
    dispatch(initCardsFromLocalStorage())
  }, [dispatch])

  //set products from server
  useEffect(() => {
    dispatch(setLoading(true))

    if (error) {
      dispatch(setError(error))
    } else if (products && products.length > 0 && !loaded) {
      dispatch(setProducts(products))
    }

    dispatch(setLoading(false))
  }, [products, error, dispatch])

  return null
}

export default ClientDataLoader;