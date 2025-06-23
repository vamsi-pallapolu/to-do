import { useState, useEffect } from "react";

function App() {
  const [newTodo, setNewTodo] = useState(''); // This stores the input value
  const [todos, setTodos] = useState([]); // This stores the list of todos
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  // Add this state at the top with your other useState hooks
const [filter, setFilter] = useState('all'); // 'all', 'active', or 'completed'

  // Load todos from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Function to handle when the button is clicked
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return; // Prevent adding empty todos
    setTodos([...todos, { text: newTodo, completed: false }]); // Add new todo to the list
    setNewTodo(''); // Clear the input box after adding
  };

  // Funtion to handle when the input text changes
  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  // Function to delete a todo by its index
  const handleDeleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  // Toggle completed status
  const handleToggleCompleted = (indexToToggle) => {
    setTodos(
      todos.map((todo, index) =>
        index === indexToToggle
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

   // Start editing a todo
  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

   // Save the edited todo
  const handleSaveEdit = (index) => {
    setTodos(
      todos.map((todo, idx) =>
        idx === index ? { ...todo, text: editText } : todo
      )
    );
    setEditIndex(null);
    setEditText('');
  };

  const filteredTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.completed;
  if (filter === 'completed') return todo.completed;
  return true; // 'all'
});

  return (
    
   <div>
      <h1>My Todo App</h1>
      <input
        type = "text"
        placeholder="Enter a todo"
        value = {newTodo}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTodo}>Add</button>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
    </div>
    <button onClick={() => setTodos([])}>Clear All</button>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index}>
          <input
            type ="checkbox"
            checked = {todo.completed}
            onChange={()=>{handleToggleCompleted(index)}}
          />  
        {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.text}
                </span>
                <button onClick={() => handleEditTodo(index)}>Edit</button>
              </>
            )}
          <button onClick={()=>{handleDeleteTodo(index)}}>Delete</button>
          </li> // Display each todo in a list item
        ))}
      </ul>
    </div>
  );
}

export default App
