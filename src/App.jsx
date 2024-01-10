import { useState } from "react"
import "./styles.css"

const App = () => {
  const [newItem, setNewItem] = useState(""); // text input
  const [todos, setTodos] = useState([]); // list will change everytime something is added (form is submitted)
  
  function handleSubmit(e) {
    e.preventDefault(); 

    setTodos(currentTodos => {
    return [
      ...currentTodos, 
      { id: crypto.randomUUID(), title: newItem, completed: false } 
    ]
  })
  setNewItem("") // to reset the form to blank once form is submitted
 }
  
  function toggleTodo (id, completed){
    setTodos (currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }
        return todo;
      })
    })
  }

  function deleteTodo (id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input value={newItem} onChange={e => setNewItem(e.target.value)} type="type" id="item" />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
                {todo.title}
              </label>
              <button onClick={()=>deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
            </li>
          )
        })}
      </ul>
      {/* <ul className="list">
        <li>
          <label>
            <input type="checkbox" />
            Item 2
          </label>
          <button className="btn btn-danger">Delete</button>
        </li>
      </ul> */}
    </>
  )
}

export default App