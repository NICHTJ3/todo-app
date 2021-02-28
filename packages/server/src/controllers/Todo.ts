import { Request, Response } from 'express';
import { ITodo } from '../models/ITodo';
import Todo from '../models/Todo';

export const addTodo = async (req: Request, res: Response) => {
  const body = req.body as Pick<ITodo, 'name' | 'description' | 'status'>;

  const todo: ITodo = new Todo({
    name: body.name,
    description: body.description,
    status: body.status,
  });

  const newTodo: ITodo = await todo.save();
  const allTodos: ITodo[] = await Todo.find();

  res.status(201).json({ message: 'Todo added', todo: newTodo, todos: allTodos });
};

export const getTodos = async (_: Request, res: Response) => {
  const todos: ITodo[] = await Todo.find();
  res.status(200).json({ todos });
};

export const updateTodo = async (req: Request, res: Response) => {
  const {
    params: { id },
    body,
  } = req;
  const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate({ _id: id }, body);
  const allTodos: ITodo[] = await Todo.find();
  res.status(200).json({
    message: 'Todo updated',
    todo: updatedTodo,
    todos: allTodos,
  });
};

export const deleteTodo = async (req: Request, res: Response) => {
  const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(req.params.id);
  const allTodos: ITodo[] = await Todo.find();
  res.status(200).json({
    message: 'Todo deleted',
    todo: deletedTodo,
    todos: allTodos,
  });
};
