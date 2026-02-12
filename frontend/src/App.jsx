import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import AdminScanner from "./pages/AdminScanner"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path="/edit-profile" element={
            <ProtectedRoute><EditProfile /></ProtectedRoute>} />

          <Route path="/scanner" element={
            <ProtectedRoute><AdminScanner /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
