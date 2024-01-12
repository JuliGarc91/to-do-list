import { useState } from "react";
const NewToDoForm = () => {
    const [newItem, setNewItem] = useState(""); // this App is the only one that will use this useState and handleSubmit fx
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
  return (
    <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input value={newItem} onChange={e => setNewItem(e.target.value)} type="type" id="item" />
        </div>
        <button className="btn">Add</button>
    </form>
  )
}

export default NewToDoForm;