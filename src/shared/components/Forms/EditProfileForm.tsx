"use client"

import { useState, useEffect } from "react"

interface EditProfileFormProps {
  user: {
    email: string
    name: string
    image: string
  }
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [image, setImage] = useState(user?.image)

  useEffect(() => {
    
  }, [user])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(name, email, image)
  }
  return (
    <>
    <div>EditProfileForm {user?.email}  </div>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="image" name="image" value={image} onChange={(e) => setImage(e.target.value)} />
      <button type="submit">Update</button>
    </form>
    </>
  )
}

export default EditProfileForm