import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Chat />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
