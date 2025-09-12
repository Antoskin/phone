import React from 'react'
import ProductList from '@/components/layouts/ProductList'
import FilterForm from '@/components/layouts/Forms/FilterForm'

export default async function List() {
  return (
    <div className='space-y-10'>
      <FilterForm />
      <ProductList />
    </div>
  )
}