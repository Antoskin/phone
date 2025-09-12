
const Empty = ({ text }: { text?: string | null }) => {
  return (
    <div className="p-10 bg-amber-800 rounded-md text-center text-black text-2xl">{text || 'Empty'}</div>
  )
}

export default Empty;
