import React from "react";
import EditTodo from "./EditTodo";

interface InterfaceTodos {
  todo_id: number;
  description: string;
  completed: boolean;
  created: Date;
}

interface InterfaceProps {
  todos: InterfaceTodos[];
  deleteTodo: (id: number) => Promise<void>;
  updateTodo: (id: number, description: string) => Promise<void>;
}

const ListTodos: React.FC<InterfaceProps> = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <table className="table mt-5 text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Todo</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.todo_id}>
            <td>{todo.todo_id}</td>
            <td data-testid={`todo-${todo.description}`}>{todo.description}</td>
            <td>
              <EditTodo todo={todo} updateTodo={updateTodo}></EditTodo>
            </td>
            <td>
              <button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListTodos;
