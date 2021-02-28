import axios, { AxiosResponse } from "axios";
import { FormData } from "./components/AddTodo";

const baseUrl: string = "http://localhost:3000";

export interface TodoType {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponseType {
  message: string;
  status: string;
  todos: TodoType[];
  todo?: TodoType;
}

export const getTodos = async (): Promise<AxiosResponse<ApiResponseType>> => {
  try {
    const todos: AxiosResponse<ApiResponseType> = await axios.get(
      `${baseUrl}/todos`,
    );
    return todos;
  } catch (error) {
    throw new Error(error);
  }
};

export const addTodo = async (
  formData: FormData,
): Promise<AxiosResponse<ApiResponseType>> => {
  try {
    const todo: Omit<TodoType, "_id"> = {
      name: formData.name,
      description: formData.description,
      status: false,
    };
    const saveTodo: AxiosResponse<ApiResponseType> = await axios.post(
      `${baseUrl}/todos`,
      todo,
    );
    return saveTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTodo = async (
  todo: TodoType,
): Promise<AxiosResponse<ApiResponseType>> => {
  try {
    const todoUpdate: Pick<TodoType, "status"> = {
      status: true,
    };
    const updatedTodo: AxiosResponse<ApiResponseType> = await axios.put(
      `${baseUrl}/todos/${todo._id}`,
      todoUpdate,
    );
    return updatedTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (
  _id: string,
): Promise<AxiosResponse<ApiResponseType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiResponseType> = await axios.delete(
      `${baseUrl}/todos/${_id}`,
    );
    return deletedTodo;
  } catch (error) {
    throw new Error(error);
  }
};
