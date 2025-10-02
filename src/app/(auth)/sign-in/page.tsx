"use server"

import React from 'react'
import LoginForm from '@/shared/components/Forms/LoginForm'
import { auth } from '../../../../auth'
import { redirect } from 'next/navigation'
import Link from 'next/link';
import { PAGE } from '@/config/page.config';

export default async function SignIn({ searchParams }: { searchParams: Promise<{ callbackUrl: string }> }) {
  const session = await auth();

  const { callbackUrl } = await searchParams;

  if (session) {
    return redirect(callbackUrl || '/')
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <LoginForm />
      <p>Don't have an account? <Link href={PAGE.REGISTER} className="hover:opacity-50 transition-opacity">Sign up</Link></p>
    </div>
  )
}