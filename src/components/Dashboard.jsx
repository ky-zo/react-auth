import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <>
            <p className="mt-10 text-center text-sm text-gray-500">
                Logged in as: {currentUser && currentUser.email}{' '}
                <button onClick={handleLogout} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Log out
                </button>
            </p>
        </>
    )
}
