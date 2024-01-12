import { useState, useEffect } from "react";
import NewToDoForm from "./components/NewToDoForm";
import ToDoList from "./components/ToDoList";
import "./styles.css";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    try {
      return JSON.parse(localValue);
    } catch (e) {
      console.error("Parsing error in localStorage 'ITEMS':", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addToDo(title) {
    setTodos(currentTodos => [
      ...currentTodos, 
      { id: crypto.randomUUID(), title, completed: false }
    ]);
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => currentTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed };
      }
      return todo;
    }));
  }

  function deleteTodo(id) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  }

  return (
    <>
      <h1 className="header">To Do List</h1>
      <NewToDoForm onSubmit={addToDo} />
      <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
};

export default App;