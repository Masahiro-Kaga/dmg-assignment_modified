import { render, screen, fireEvent, Matcher } from "@testing-library/react";
import App from "./App";

let getDeleteId: Matcher;

describe("Lists", () => {
  it('show new post which is "Watching movie', async () => {
    render(<App />);

    const input = screen.getByLabelText("todo");
    fireEvent.change(input, { target: { value: "Testing1 - Watching Movie" } });
    fireEvent.click(screen.getByText("Submit"));
    const todoListOne = await screen.findAllByTestId(
      "todo-Testing1 - Watching Movie"
    );
    expect(todoListOne.length).toBeGreaterThan(0);

    // getDeleteId = todoListOne[0]
    //   .getAttribute("data-testid")!
    //   .replace("todo-", "delete-");
    // console.log(getDeleteId);
  }); 

  // it('remove "Testing1 - Watching Movie"', async () => {
  //   render(<App />);
  //   const labellabel = await screen.findByLabelText("testRemoving");
  //   console.log(labellabel);
  //   // const deleteButton = await screen.findByTestId(getDeleteId);
  //   fireEvent.click(labellabel);
  
  //   // await screen.findByText((content, element) => {
  //   //   return (
  //   //     element?.tagName.toLowerCase() === "td" &&
  //   //     content.startsWith("Testing1 - Watching Movie")
  //   //   );
  //   // });

  //   // const deletedTodoList = screen.getAllByText("Testing1 - Watching Movie", {
  //   //   selector: "td",
  //   // })[0];
  //   // expect(deletedTodoList).toBeNull();
  // });

});