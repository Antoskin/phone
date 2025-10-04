"use client"

import React, { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { registerWithCredentials } from '@/lib/actions/user.action'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'



const RegisterForm = () => {
  const [data, formAction] = useActionState(registerWithCredentials, {
    success: false,
    message: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'


  useEffect(() => {
    if (data.success) router.refresh()
  }, [data?.success])

  const LiginButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button type="submit" disabled={pending}>{pending ? 'pending...' : 'Sign up'}</Button>
    )
  }

  const togglePasswordHandler = () => {
    setShowPassword(!showPassword)
  }


  const TogglePassword = () => {
    return (
      <Button 
            type="button" 
            onClick={togglePasswordHandler}
            className='absolute right-2 top-1/2 -translate-y-1/2'
          >
            {showPassword ? <EyeIcon className='w-4 h-4' /> : <EyeOffIcon className='w-4 h-4' />}
          </Button>
    )
  }

  return (
    <div className='flex flex-col justify-center gap-4 lg:w-1/3 w-full mx-auto min-h-[60vh]'>
      <h1 className='text-2xl font-bold mb-10'>Registration Form</h1>
      {data && !data.success && <p className='text-red-500'>{data.message}</p>}
      <form action={formAction} className='flex flex-col gap-10'>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <Input 
          type="text" 
          // register={register} 
          label="Name" 
          name="name" 
          className='w-full'
          placeholder='Type your name'
          // error={errors.username?.message}
        />
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
          <TogglePassword />
        </div>
        <div className='relative w-full'>
          <Input 
              type={showPassword ? "text" : "password"} 
              // register={register} 
              name="confirmPassword" 
              className='w-full'
              label="Confirm Password"
              placeholder='Type your confirm password'
              // error={errors.confirmPassword?.message}
            />
        </div>

        <LiginButton />
      </form>
    </div>
  )
}

export default RegisterForm