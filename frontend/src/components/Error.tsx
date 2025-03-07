import { Link, useNavigate } from 'react-router-dom'

export const Error = ({ error }: { error: string }) => {
  const navigate = useNavigate()
  return (
    <div className='dark:text-slate-200'>
      <h1>Uh-oh</h1>
      <p>It appears something went wrong</p>
      <Link to='/'>Home</Link>
    </div>
  )
}