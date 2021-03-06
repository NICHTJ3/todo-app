import React from "react";
import { TodoType } from "../services/todos";

interface Props {
  todo: TodoType;
  toggleComplete: (todo: TodoType) => void;
  deleteTodo: (_id: string) => void;
}

const Todo = ({ todo, toggleComplete, deleteTodo }: Props) => {
  const checkTodo: string = todo.status ? `line-through` : "";
  return (
    // TODO: Container?
    <div className="flex rounded-md border-gray-100 border w-100 p-2 shadow-sm">
      <div className="flex-1">
        <h1 className={checkTodo}>{todo.name}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      {/* TODO: Move these to a check box and a bin icon at the left side? */}
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => toggleComplete(todo)}
          className="group relative whitespace-nowrap m-2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Toggle Completed
        </button>
        <button
          type="button"
          onClick={() => deleteTodo(todo._id)}
          className="group relative whitespace-nowrap m-2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
