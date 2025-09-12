"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAppDispatch } from '@/store/hooks'
import { filterProducts, resetFilter } from '@/store/slices/productSlice'

const FilterForm = () => {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useAppDispatch()

  const onSubmit = ({ userId }: any) => {
    userId ? dispatch(filterProducts(userId)) : dispatch(resetFilter())
  }

  const handleReset = () => {
    reset({ userId: '' })
    dispatch(resetFilter())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="number"
        name="userId"
        className="w-full lg:w-1/2 mx-auto block"
        register={register}
        placeholder="Search by userId"
      />
      <br />
      <div className="w-full flex justify-end lg:w-1/2 mx-auto space-x-4">
        <Button 
          type="button" 
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button type="submit">Filter</Button>
      </div>
    </form>
  )
}

export default FilterForm