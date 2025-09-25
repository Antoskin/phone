interface IInputProps {
  type: string
  name: string,
  className?: string
  placeholder?: string
  register: (name: string, options?: any) => any
  required?: boolean
}

const Input = ({ type, name, register, required, className, placeholder }: IInputProps) => {
  return (
    <input
      type={type}
      {...register(name, { required })}
      className={`
        border border-gray-300 outline-none active:outline-none focus:outline-none rounded-md p-2 
        [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield]
        ${className}
      `}
      placeholder={placeholder}
    />
  )
}

export { Input }
