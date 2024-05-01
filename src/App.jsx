import { useDispatch, useSelector } from "react-redux";
import { removeTodo, addTodo } from "./features/todos/todosSlice";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [text, setText] = useState("");
  const { todos } = useSelector((store) => store.todos);
  const dispatch = useDispatch();
  const hanldeSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addTodo({
        id: uuidv4(),
        text,
      })
    );

    setText("");
  };

  return (
    <div className="flex justify-center items-center flex-col mt-24">
      <h1 className="text-4xl mb-5 text-violet-600 font-bold">Todos</h1>
      <form onSubmit={hanldeSubmit}>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs mb-5"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button className="btn btn-primary text-xl w-full max-w-xs mb-5">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <h4 className="text-xl font-normal text-black text-center mb-3">
                {todo.text}
              </h4>
              <div className="flex items-center gap-6">
                <label htmlFor="">
                  <span className="text-2xl text-slate-400 font-normal text-center">
                    Completed:
                  </span>
                  <input className="w-5 h-5 items-center " type="checkbox" />
                </label>
                <button
                  className="btn btn-secondary mb-3 mt-3 text-[16px] items-center "
                  onClick={() => dispatch(removeTodo(todo.id))}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
