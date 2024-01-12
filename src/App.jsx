// import { useState, useEffect } from "react";
// import "./styles.css";
// import NewToDoForm from "./components/NewToDoForm";
// import ToDoList from "./components/ToDoList";

// const App = () => {
//   const [todos, setTodos] = useState(() => {
//     const localValue = localStorage.getItem("ITEMS");
//     if (localValue == null) return [];
//     try {
//       return JSON.parse(localValue);
//     } catch (e) {
//       console.error("Parsing error in localStorage 'ITEMS':", e);
//       return [];
//     }
//   });

//   const [backgroundImage, setBackgroundImage] = useState('https://www.bbg.org/img/uploads/lightbox/_lightbox_retina/starburst_MS_51860951755.jpg');

//   const backgroundImages = ['./assets/Jupiter-Moon-Orbit.png', './assets/Saturn-Rings-BW.png', './assets/Capricorn-Messier.jpeg'];

//   const changeBackground = () => {
//     const currentIndex = backgroundImages.indexOf(backgroundImage);
//     const nextIndex = (currentIndex + 1) % backgroundImages.length;
//     setBackgroundImage(backgroundImages[nextIndex]);
//   };

//   useEffect(() => {
//     localStorage.setItem("ITEMS", JSON.stringify(todos));
//   }, [todos]);

//   function addToDo(title) {
//     setTodos(currentTodos => [
//       ...currentTodos, 
//       { id: crypto.randomUUID(), title, completed: false }
//     ]);
//   }

//   function toggleTodo(id, completed) {
//     setTodos(currentTodos => currentTodos.map(todo => {
//       if (todo.id === id) {
//         return { ...todo, completed };
//       }
//       return todo;
//     }));
//   }

//   function deleteTodo(id) {
//     setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
//   }

//   const divStyle = {
//     backgroundImage: `url(${backgroundImage})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'fixed',
//     minHeight: '100vh',
//     width: '100%'
//   };

//   return (
//     <div style={divStyle}>
//       <button onClick={changeBackground}>Change Background</button>
//       <NewToDoForm onSubmit={addToDo} />
//       <h1 className="header">Todo List</h1>
//       <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
//     </div>
//   );
// };

// export default App;

import { useState, useEffect } from "react";
import NewToDoForm from "./components/NewToDoForm";
import ToDoList from "./components/ToDoList";
import "./styles.css"; // Assuming this is where your CSS is defined

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

