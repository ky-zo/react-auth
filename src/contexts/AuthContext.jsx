import { createContext } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

const UserContext = createContext()

export function useAuth() {
    return useContext(UserContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    return <UserContext.Provider value={{ currentUser, signup, login, logout }}>{!loading && children}</UserContext.Provider>
}
