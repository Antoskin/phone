interface IButtonProps {
  type: 'submit' | 'reset' | 'button'
  children: React.ReactNode,
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const Button = ({ type, children, onClick, className, disabled }: IButtonProps) => {
  return (
    <button 
      type={type} 
      className={`bg-violet-500 text-white rounded-md p-2 hover:bg-violet-600 cursor-pointer ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export { Button }