"use client";

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductsThunk } from '@/store/slices/productSlice';
import Loader from '../Loader';
import Empty from '../Empty';
import ProdList from './ProdList';

const ProductListcontainer = () => {
    const { products, loading, loaded } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchProductsThunk());
    }
  }, [dispatch, loaded]);

  if (loading) return <Loader />;

  if (products.length === 0) return <Empty />;

  return (
    <ProdList products={products} />
  )
}

export default ProductListcontainer