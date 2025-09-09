import React from 'react'
import Link from 'next/link'
import { PAGE } from '@/config/page.config'

export default function Menu() {
  return (
    <div className="flex justify-between items-center">
      <div className='flex gap-4'>
        <Link href={PAGE.HOME}>Home</Link>
        <Link href={PAGE.LIST}>List</Link>
        {/* <Link href={PAGE.SINGLE(1)}>Single</Link> */}
      </div>
      <Link href={PAGE.BUCKET}>Bucket</Link>
    </div>
  )
}
