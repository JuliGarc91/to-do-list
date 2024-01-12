import ToDoItem from "./ToDoItem"

const ToDoList = ( { todos, toggleTodo, deleteTodo } ) => {
  return (
    <ul className="list">
        {todos.length === 0 && "No Todos"} {/* to short circuit (stop code from executing the rest of the code) add conditional for when there are no to dos */}
        {todos.map(todo => {
          return (
            // <li key={todo.id}>
            //   <label>
            //     <input type="checkbox" checked={todo.completed} 
            //     // onChange={e => toggleTodo(todo.id, e.target.checked)}
            //     />
            //     {todo.title}
            //   </label>
            //   <button 
            //     // onClick={()=>deleteTodo(todo.id)} 
            //     className="btn btn-danger"
            //   >Delete</button>
            // </li>
            <ToDoItem 
                key={todo.id}
                {...todo} // to copy the to do data and make code more DRY
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                // completed={todo.completed} 
                // id={todo.id} 
                // title={todo.title}
            />
          )
        })}
    </ul>
  )
}

export default ToDoList