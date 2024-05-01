// App.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo } from "./features/todos/todosSlice";
import { v4 as uuidv4 } from "uuidv4";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const { todos } = useSelector((store) => store);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(e.target[0].value));
    e.target[0].value = "";
    setText("");
    dispatch({
      type: "todos/addTodo",
      payload: {
        id: uuid(),
        text: text,
      },
    });
  };

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="app-container">
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <h4>{todo.text}</h4>
            <button onClick={() => handleRemove(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
