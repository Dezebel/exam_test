import { Routes, Route, Navigate } from 'react-router-dom'

import { Header, UserProvider } from './components'
import {
  Home,
  Login,
  PostDetails,
  PostEditor,
  Profile,
  Register,
} from './pages'

function App() {
  return (
    <UserProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="post/:postId" element={<PostDetails />} />
          <Route path="new-post" element={<PostEditor />} />
          <Route path="edit-post/:postId" element={<PostEditor />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </UserProvider>
  )
}

export default App
