import React from "react";
import { TodoType } from "../services/todos";

interface Props {
  todo: TodoType;
  updateTodo: (todo: TodoType) => void;
  deleteTodo: (_id: string) => void;
}

const Todo = ({ todo, updateTodo, deleteTodo }: Props) => {
  const checkTodo: string = todo.status ? `line-through` : "";
  return (
    <div className="Card">
      <div className="Card--text">
        <h1 className={checkTodo}>{todo.name}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className="Card--button">
        <button
          type="button"
          onClick={() => updateTodo(todo)}
          className={todo.status ? `hide-button` : "Card--button__done"}
        >
          Complete
        </button>
        <button
          type="button"
          onClick={() => deleteTodo(todo._id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
