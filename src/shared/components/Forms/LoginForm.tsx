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
import { loginSchema, type LoginSchema } from '@/lib/validator'
import { ZodError } from 'zod'



const LoginForm = () => {
  const [state, formAction] = useActionState(loginWithCredentials, {
    success: false,
    message: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof LoginSchema, string>>>({})
  const [isValidating, setIsValidating] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'


  interface ShemaRostika {
    pit_pivo_s_druziami: boolean
    skazat_4to_bolit_golova: boolean
  }

  const [Rosting, setRosting] = useState<Partial<Record<keyof ShemaRostika, boolean>>>({
    pit_pivo_s_druziami: false,
    skazat_4to_bolit_golova: true
  })


  useEffect(() => {
    if (state.success) router.refresh()
  }, [state])

  const validateForm = (formData: FormData): boolean => {
    try {
      setIsValidating(true)
      const formValues = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }
      
      loginSchema.parse(formValues)
      setValidationErrors({})
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Partial<Record<keyof LoginSchema, string>> = {}
        error.issues.forEach((err: any) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof LoginSchema] = err.message
          }
        })
        setValidationErrors(errors)
      }
      return false
    } finally {
      setIsValidating(false)
    }
  }

  const handleFormSubmit = (formData: FormData) => {
    if (validateForm(formData)) {
      formAction(formData)
    }
  }

  const LoginButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button type="submit" disabled={pending || isValidating}>
        {pending ? 'Logging in...' : isValidating ? 'Validating...' : 'Login'}
      </Button>
    )
  }


  return (
    <div className='flex flex-col justify-center gap-4 lg:w-1/3 w-full mx-auto min-h-[60vh]'>
      <h1 className='text-2xl font-bold mb-10'>Login</h1>
      {state && state.success && <p className='text-green-500'>{state.message}</p>}
      <form action={handleFormSubmit} className='flex flex-col gap-10'>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <div className='w-full'>
          <Input 
            type="text" 
            label="email" 
            name="email" 
            className='w-full'
            placeholder='Type your email'
          />
          {validationErrors.email && (
            <p className='text-red-500 text-sm mt-1'>{validationErrors.email}</p>
          )}
        </div>
        <div className='relative w-full'>
          <Input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            className='w-full'
            label="Password"
            placeholder='Type your password'
          />
          <Button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-2 top-1/2 -translate-y-1/2'
          >
            {showPassword ? <EyeIcon className='w-4 h-4' /> : <EyeOffIcon className='w-4 h-4' />}
          </Button>
          {validationErrors.password && (
            <p className='absolute -bottom-6 left-0 text-red-500 text-sm mt-1'>{validationErrors.password}</p>
          )}
        </div>
        <LoginButton />
      </form>
      {state && !state.success && <p className='text-red-500'>{state.message}</p>}
    </div>
  )
}

export default LoginForm