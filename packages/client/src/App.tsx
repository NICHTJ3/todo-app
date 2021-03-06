/* eslint-disable */
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import AddTodo, { FormData } from "./components/AddTodo";
import TodoItem from "./components/TodoItem";
import Container from "./components/ui/Container";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Container className="space-y-2">
        <h1 className="text-5xl font-bold">Todoy</h1>
        <AddTodo saveTodo={handleSaveTodo} />
        <div className="overflow-scroll h-96 border border-gray-100 rounded-md shadow-lg p-2 space-y-1">
          {todos.length ? (
            todos.map((todo: TodoType) => (
              <TodoItem
                key={todo._id}
                toggleComplete={handleUpdateTodo}
                deleteTodo={handleDeleteTodo}
                todo={todo}
              />
            ))
          ) : (
          // TODO: Center this and make it look pretty
            <h1>You have no todo's yet try adding one with the form above</h1>
          )}
        </div>
      </Container>
    </div>
  );
};

export default App;
