const Empty = ({ text, className }: { text?: string | null, className?: string }) => {
  return (
    <div className={`
      ${className ? className : ''} 
      p-10 bg-amber-800 rounded-md text-center text-black text-2xl`
    }>
      {text || 'Empty'}
    </div>
  )
}

export default Empty;
