import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Todo } from './Todo'
import { useState } from 'react'
import { useEffect } from 'react'
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function Dashboard() {
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState([])

    useEffect(() => {
        const q = query(collection(db, 'todos'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = []
            querySnapshot.forEach((doc) => {
                todosArr.push({ ...doc.data(), id: doc.id })
            })
            setTodos(todosArr)
        })
    }, [])

    //Create to-do
    const createTodo = async (e) => {
        e.preventDefault(e)

        if (input === '') return

        await addDoc(collection(db, 'todos'), {
            text: input,
            completed: false,
        })
        setInput('')
    }

    //Read to-do

    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed,
        })
    }
    //Delete todo

    const deleteTodo = async (todo) => {
        await deleteDoc(doc(db, 'todos', todo.id))
    }

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="w-screen p-4 flex items-start justify-center">
            <div className="flex flex-col items-center bg-slate-100 w-2/5 pl-20 pr-20">
                <p className="m-5 text-center text-sm text-gray-500">
                    Logged in as: {currentUser && currentUser.email}{' '}
                    <button onClick={handleLogout} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Log out
                    </button>
                </p>
                <div className="text-lg">To-do List</div>
                <form onSubmit={createTodo} className="flex justify-center gap-2 text-sm pt-5 pb-5">
                    <input
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value)
                        }}
                        className="h-6 rounded-md"
                        type="text"
                        placeholder="do this and that..."
                    ></input>
                    <button type="submit" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Add
                    </button>
                </form>
                {todos.map((todo, index) => (
                    <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
                ))}
                <p className="pt-10">{`You have ${todos.length} todos`}</p>
            </div>
        </div>
    )
}
