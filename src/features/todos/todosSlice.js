import { createSlice } from "@reduxjs/toolkit";

function dataFromLocal() {
  const data = localStorage.getItem("todos");
  if (data) {
    return JSON.parse(data);
  }
  return [];
}
const initialState = {
  todos: dataFromLocal(),
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos.push(payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
      return state;
    },
    removeTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload.id);
    },
  },
});

export const { addTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
