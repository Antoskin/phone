import React from 'react'
import RegisterForm from '@/shared/components/Forms/RegisterForm'
import { auth } from '../../../../auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PAGE } from '@/config/page.config'

export default async function SignUp({ searchParams }: { searchParams: Promise<{ callbackUrl: string }> }) {
  const session = await auth();

  const { callbackUrl } = await searchParams;

  if (session) {
    return redirect(callbackUrl || '/')
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <RegisterForm />
      <p>Already have an account? <Link href={PAGE.LOGIN} className="hover:opacity-50 transition-opacity">Sign in</Link></p>
    </div>
  )
}