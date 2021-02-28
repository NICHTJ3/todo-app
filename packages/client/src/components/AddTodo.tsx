import React, { useState } from "react";
import { TodoType } from "../services/todos";

export type FormData = Omit<TodoType, "_id" | "status">;

type Props = {
  saveTodo: (e: React.FormEvent, formData: FormData) => void;
};

const AddTodo = ({ saveTodo }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <form className="Form" onSubmit={(e) => saveTodo(e, { name, description })}>
      <div>
        <div>
          <label htmlFor="name">
            Name
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              id="description"
            />
          </label>
        </div>
      </div>
      <button type="submit" disabled={!name && !description}>
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
