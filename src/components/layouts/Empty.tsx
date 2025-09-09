
const Empty = ({ text }: { text?: string | null }) => {
  return (
    <div>{text || 'Empty'}</div>
  )
}

export default Empty;
