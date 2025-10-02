"use client"

import React, { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { loginWithCredentials } from '@/lib/actions/user.action'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'



const LoginForm = () => {
  const [state, formAction] = useActionState(loginWithCredentials, {
    success: false,
    message: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'


  useEffect(() => {
    if (state.success) router.refresh()
  }, [state])

  const LiginButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button type="submit" disabled={pending}>{pending ? 'Logging in...' : 'Login'}</Button>
    )
  }


  return (
    <div className='flex flex-col justify-center gap-4 lg:w-1/3 w-full mx-auto min-h-[60vh]'>
      <h1 className='text-2xl font-bold mb-10'>Login</h1>
      {state && state.success && <p className='text-green-500'>{state.message}</p>}
      <form action={formAction} className='flex flex-col gap-10'>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <Input 
          type="text" 
          // register={register} 
          label="email" 
          name="email" 
          className='w-full'
          placeholder='Type your email'
          // error={errors.username?.message}
        />
        <div className='relative w-full'>
          <Input 
            type={showPassword ? "text" : "password"} 
            // register={register} 
            name="password" 
            className='w-full'
            label="Password"
            placeholder='Type your password'
            // error={errors.password?.message}
          />
          <Button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-2 top-1/2 -translate-y-1/2'
          >
            {showPassword ? <EyeIcon className='w-4 h-4' /> : <EyeOffIcon className='w-4 h-4' />}
          </Button>
        </div>
        <LiginButton />
      </form>
    </div>
  )
}

export default LoginForm