import React, { useEffect, useRef, useState } from "react";
import { TodoType } from "../services/todos";

export type FormData = Omit<TodoType, "_id" | "status">;

type Props = {
  saveTodo: (e: React.FormEvent, formData: FormData) => void;
};

const AddTodo = ({ saveTodo }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);

  // TODO: Does this cause a render loop?
  useEffect(() => {
    ref.current?.focus();
  }, [ref]);

  // NOTE: This should look okay once we're in a container
  return (
    <form
      className="flex flex-row w-full justify-content-center space-x-2"
      onSubmit={(e) => {
        saveTodo(e, { name, description });
        setName("");
        setDescription("");
        ref.current?.focus();
      }}
    >
      <label htmlFor="name" className="sr-only">
        Name
      </label>
      <input
        // NOTE: This seams wrong. I feel I shouldn't need a ref and state
        ref={ref}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        type="text"
        id="name"
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      />
      <label htmlFor="description" className="sr-only">
        Description
      </label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        type="text"
        id="description"
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      />
      <button
        type="submit"
        className="group relative whitespace-nowrap flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={Boolean(!name || !description)}
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
