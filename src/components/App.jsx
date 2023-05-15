import { AuthProvider } from '../contexts/AuthContext'
import Signup from './Signup'
import Dashboard from './Dashboard'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />

                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

export default App
