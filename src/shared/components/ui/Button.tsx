interface IButtonProps {
  type: 'submit' | 'reset' | 'button'
  children: React.ReactNode,
  onClick?: () => void
  className?: string
}

const Button = ({ type, children, onClick, className }: IButtonProps) => {
  return (
    <button 
      type={type} 
      className={`bg-violet-500 text-white rounded-md p-2 hover:bg-violet-600 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export { Button }