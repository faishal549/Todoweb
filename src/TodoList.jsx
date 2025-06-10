import { useEffect, useState } from "react"

const TodoList = () => {
    const [text, setText] = useState("")
    const [todo, setTodo] = useState(() => {
        try {
            const savedItem = localStorage.getItem("Todo")
            if (savedItem) {
                return JSON.parse(savedItem)
            }
        } catch (error) {
            console.log(error)
        }
        return []
    })

    useEffect(() => {
        localStorage.setItem("Todo", JSON.stringify(todo))
    }, [todo])
    const handleAddTodo = () => {

        let trimText = text.trim()
        if (trimText === "") {
            alert("Todo can not be empty")
            return
        }
        let wordLimit = 5;
        let words = trimText.split(" ").filter(w => w.length > 0)
        let wordsCount = words.length
        if (wordsCount > wordLimit) {
            alert("Todo can not be more than 5 words")
            return
        }
        if (trimText.length > 50) {
            alert("Todo can not be more than 50 character ")
            return;
        }
        const newTodo = {
            id: todo.length + 1,
            content: text,
            completed: false,
        }
        setTodo((prev) => [...prev, newTodo])

        setText("")


    }

    const handleToggleCheckBox = (id) => {

        setTodo(todo.map(t => {
            if (t.id == id) {
                return {
                    ...t,
                    completed: !t.completed
                }
            } else {
                return t;
            }
        }))
    }

    const handleRemoveTodo = (id) => {
        setTodo(todo.filter((t) => t.id !== id))
    }
    return (
        <>
            <div className="container">
                <div className="todolist">
                    <div className="title">
                        <h1 className="title_todo">TodoList :📝</h1>
                    </div>
                    <div className="section">
                        <input type="text" placeholder="Add TODO :)" className="inputBar"
                            value={text} onChange={(event) => setText(event.target.value)} />
                        <button className="btn" onClick={handleAddTodo}>ADD</button>
                    </div>
                    <div className="listItem">
                        {todo.length === 0 ? <h1 className="msg">No Items are in TODO 🎃</h1> :
                            <ul>
                                {

                                    todo.map((t) => <li key={t.id}>
                                        <div>
                                            <input type="checkbox" className="checkBox" checked={t.completed}
                                                onChange={() => handleToggleCheckBox(t.id)} />
                                            <span className={t.completed ? "lineThrough" : ""}>{t.content} </span>
                                        </div>
                                        <div>
                                            <button className="btnDelete" onClick={() => handleRemoveTodo(t.id)}>Remove</button>
                                        </div>
                                    </li>)
                                }

                            </ul>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
export default TodoList