"use client"

import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { loginSchema, LoginSchema } from '@/lib/validator'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = (data: LoginSchema) => {
    console.log(data)
  }

  return (
    <div className='flex flex-col justify-center gap-4 lg:w-1/3 w-full mx-auto h-[80vh]'>
      <h1 className='text-2xl font-bold mb-10'>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10'>
        <Input 
          type="text" 
          register={register} 
          label="Username" 
          name="username" 
          className='w-full'
          placeholder='Type your username'
          error={errors.username?.message}
        />
        <div className='relative w-full'>
          <Input 
            type={showPassword ? "text" : "password"} 
            register={register} 
            name="password" 
            className='w-full'
            label="Password"
            placeholder='Type your password'
            error={errors.password?.message}
          />
          <Button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-2 top-1/2 -translate-y-1/2'
          >
            {showPassword ? <EyeIcon className='w-4 h-4' /> : <EyeOffIcon className='w-4 h-4' />}
          </Button>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

export default LoginPage