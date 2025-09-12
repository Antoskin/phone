interface IButtonProps {
  type: 'submit' | 'reset' | 'button'
  children: React.ReactNode,
  onClick?: () => void
}

const Button = ({ type, children, onClick }: IButtonProps) => {
  return (
    <button 
      type={type} 
      className='bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600'
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button