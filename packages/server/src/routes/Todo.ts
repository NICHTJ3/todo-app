import { NextFunction,Request,Response, Router } from "express"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/Todo"
const API_KEY="icandothis"

const router: Router = Router()

router.get("/todos", (req:Request&{apiKey?:string},res:Response,next:NextFunction) => {
  const body = req.body as {apiKey:string};

  console.log(body.apiKey);
  if (req.apiKey===API_KEY){
    return next();
  }
  return res.json({message:"You can't do this"})
},getTodos)

router.post("/todos", addTodo)

router.put("/todos/:id", updateTodo)

router.delete("/todos/:id", deleteTodo)

export default router
