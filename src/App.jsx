import { useState } from "react"
import "./styles.css"
import NewToDoForm from "./components/NewToDoForm";
import ToDoList from "./components/ToDoList";

const App = () => {
   // text input
  const [todos, setTodos] = useState([]); // list will change everytime something is added (form is submitted)
  
  function addToDo (title) { // after moving everything to the new component it doesn't work like it used to because it's not using the todos useState so make new callback fx that uses both form useState called newItem and and todos useState. Put callback in the NewToDoForm component where it is needed
    setTodos(currentTodos => {
      return [
        ...currentTodos, 
        { id: crypto.randomUUID(), title, completed: false } // passed on title as parameter since newItem useState is in different component (title would be newItem entered into text field)
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
    <NewToDoForm onSubmit={addToDo} />
      <h1 className="header">Todo List</h1>
      <ToDoList todos={todos} />
    </>
  )
}

export default App