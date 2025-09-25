import { HTMLInputTypeAttribute } from "react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

interface IInputProps<T extends FieldValues> {
  type: string | number
  name: Path<T>
  className?: string
  placeholder?: string
  register: UseFormRegister<T>
  required?: boolean
  label?: string
  error?: string
}

const Input = <T extends FieldValues> ({ type, name, register, required, className, placeholder, label, error }: IInputProps<T>) => {
  return (
    <label htmlFor={name} className="block relative">
      {label && <span className="absolute left-2 -top-4 -translate-y-1/2">{label}</span>}
    <input
      id={name}
      type={type as HTMLInputTypeAttribute}
      {...register(name, { required })}
      className={`
        border border-gray-300 outline-none active:outline-none focus:outline-none rounded-md p-2 
        [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [appearance:textfield]
        ${className}
      `}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm absolute -bottom-5 right-0">{error}</p>}
    </label>
  )
}

export { Input }
