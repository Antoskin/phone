import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-5'>
      <Image src="/globe.svg" alt="logo" width={100} height={100} />
      <h1 className='text-2xl font-bold'>404</h1>
      <p className='text-sm text-gray-500'>Page not found</p>
      <Link href="/" className='text-sm text-blue-500'>Go to home</Link>
    </div>
  )
}