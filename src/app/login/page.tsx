import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { loginSchema, LoginSchema } from '@/lib/validator'


const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" name="username" register={register} />
        <Input type="text" name="password" register={register} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

export default LoginPage