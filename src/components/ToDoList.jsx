import ToDoItem from "./ToDoItem"

const ToDoList = ( { todos, toggleTodo, deleteTodo } ) => {
  return (
    <ul className="list">
        {todos.length === 0 && "No Todos"} {/* to short circuit (stop code from executing the rest of the code) add conditional for when there are no to dos */}
        {todos.map(todo => {
          return (
            <ToDoItem 
                key={todo.id}
                {...todo} // to copy the to do data and make code more DRY
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
            />
          )
        })}
    </ul>
  )
}

export default ToDoList