const style = {
    li: `flex justify-between w-[100%]`,
    row: `text-sm flex gap-2`,
    button: `font-semibold leading-6 text-indigo-600 hover:text-indigo-500`,
    textComplete: `line-through`,
}

export const Todo = ({ todo, toggleComplete, deleteTodo }) => {
    return (
        <li className={style.li}>
            <div className={style.row}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {
                        toggleComplete(todo)
                    }}
                />
                <p
                    onClick={() => {
                        toggleComplete(todo)
                    }}
                    className={todo.completed ? style.textComplete : ``}
                >
                    {todo.text}
                </p>
            </div>
            <div>
                <button
                    onClick={() => {
                        deleteTodo(todo)
                    }}
                    className={style.button}
                >
                    Del
                </button>
            </div>
        </li>
    )
}
