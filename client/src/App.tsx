import "./App.css";
import { useEffect, useState } from "react";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import axios from "axios";

interface InterfaceTodos {
  todo_id: number;
  description: string;
  completed: boolean;
  created: Date;
}

function App() {
  const [todos, setTodos] = useState<InterfaceTodos[]>([]);

  useEffect(() => {
    fetchTodosList();
  }, []);

  const fetchTodosList = async (): Promise<void> => {
    try {
      const response = await axios.get<InterfaceTodos[]>(
        "http://localhost:4000/todos"
      );
      setTodos(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async (todo: string): Promise<void> => {
    const isInclude = todos.some((todoContent) => {
      return todoContent.description === todo;
    });
    if (isInclude) {
      alert("There is the same Todo. Impossible to register same Todo.");
      return;
    }
    try{
      const response = await axios.post("http://localhost:4000/todos", {
        description: todo,
      });
      setTodos(response.data);
    }catch(err){
      console.log(err);
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      const response = await axios.delete(`http://localhost:4000/todos/${id}`);
      setTodos(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTodo = async (id: number, description: string): Promise<void> => {
    try {
      const response = await axios.put(`http://localhost:4000/todos/${id}`, {
        description,
      });
      setTodos(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App container">
      <InputTodo addTodo={addTodo}></InputTodo>
      <ListTodos
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      ></ListTodos>
    </div>
  );
}

export default App;
