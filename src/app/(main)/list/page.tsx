import React from 'react'
import ProductList from '@/shared/components/ProductList'
import FilterForm from '@/shared/components/Forms/FilterForm'

export default async function List() {
  return (
    <div className='space-y-10'>
      <FilterForm />
      <ProductList />
    </div>
  )
}