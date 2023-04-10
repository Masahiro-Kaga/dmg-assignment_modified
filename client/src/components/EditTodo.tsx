import React, { Fragment, useState } from "react";

interface InterfaceTodo {
  todo_id: number;
  description: string;
  completed: boolean;
  created: Date;
}

interface InterfaceProps {
  todo: InterfaceTodo;
  updateTodo: (id: number, description: string) => Promise<void>;
}

const EditTodo: React.FC<InterfaceProps> = ({ todo, updateTodo }) => {
  const [description, setDescription] = useState<string>(todo.description);
  return (
    <Fragment>
      <button
        className="btn btn-warning"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div className="modal fade" id={`id${todo.todo_id}`}>
      <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >X</button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={() => updateTodo(todo.todo_id, description)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>

      </div>
    </Fragment>
  );
};

export default EditTodo;
