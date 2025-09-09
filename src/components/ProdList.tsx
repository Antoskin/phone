"use client";

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductsThunk } from '@/store/slices/productSlice';

export default function ProdList() {

  const { products, loading, loaded } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchProductsThunk());
    }
  }, [dispatch, loaded]);

  useEffect(() => {
    console.log('products', products);
  },[products])

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>ProdList</div>
  )
}