/* eslint-disable */
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import AddTodo, { FormData } from "./components/AddTodo";
import TodoItem from "./components/TodoItem";
import {
  addTodo,
  ApiResponseType,
  deleteTodo,
  getTodos,
  TodoType,
  updateTodo,
} from "./services/todos";

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos: newTodos } }: AxiosResponse<ApiResponseType>) =>
        setTodos(newTodos),
      )
      .catch((err: Error) => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSaveTodo = (e: React.FormEvent, formData: FormData): void => {
    e.preventDefault();
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo: TodoType): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <h1 className="text-xl">My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: TodoType) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  );
};

export default App;
