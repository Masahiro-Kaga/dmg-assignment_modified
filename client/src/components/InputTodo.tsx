import React, { Fragment, useState } from "react";

interface InterfaceProps {
  addTodo: (todo: string) => Promise<void>;
}

const InputTodo: React.FC<InterfaceProps> = ({ addTodo }) => {
  const [todoText, setTodoText] = useState<string>("");
  const onSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await addTodo(todoText);
    setTodoText("");
  };
  return (
    <Fragment>
      <h1 className="text-center">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          onChange={(e) => setTodoText(e.target.value)}
          className="form-control"
          value={todoText}
        ></input>
        <button
          className={`btn btn-success ${todoText === "" ? "disabled" : ""}`}
        >
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
