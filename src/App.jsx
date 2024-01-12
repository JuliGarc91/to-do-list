import { useState } from "react"
import "./styles.css"
import NewToDoForm from "./components/NewToDoForm";

const App = () => {
   // text input
  const [todos, setTodos] = useState([]); // list will change everytime something is added (form is submitted)
  
  function addToDo (title) { // after moving everything to the new component it doesn't work like it used to because it's not using the todos useState so make new callback fx that uses both form useState called newItem and and todos useState. Put callback in the NewToDoForm component where it is needed
    setTodos(currentTodos => {
      return [
        ...currentTodos, 
        { id: crypto.randomUUID(), title: newItem, completed: false } 
      ]
    })
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
    <NewToDoForm />
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos"} {/* to short circuit (stop code from executing the rest of the code) add conditional for when there are no to dos */}
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