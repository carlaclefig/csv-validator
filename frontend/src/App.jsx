import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Upload from './pages/Upload'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuth') === 'true'
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={() => {
            localStorage.setItem('isAuth', 'true')
            setIsAuthenticated(true)
          }} />}
        />
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Upload onLogout={() => {
                  localStorage.removeItem('isAuth')
                  setIsAuthenticated(false)
                }} />
              : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App