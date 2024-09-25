import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts'

export default function Header() {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)

  return (
    <header>
      <Link to="/">UNE Blog</Link>
      {!!user && <strong>Welcome {user.username}!</strong>}
      <div>
        {!user ? (
          <button onClick={() => navigate('login')}>Login</button>
        ) : (
          <>
            <button onClick={() => navigate('profile')}>Profile</button>
            <button onClick={() => logout()}>Logout</button>
          </>
        )}
      </div>
    </header>
  )
}
