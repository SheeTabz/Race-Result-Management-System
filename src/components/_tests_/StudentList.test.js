import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import store from "../../redux/store"; 
import StudentList from "../Students/StudentList";

beforeEach(() => {
  // Clear localStorage before each test
  localStorage.clear();

  // Set initial students in localStorage
  const initialStudents = [
    { id: 1, name: "John Doe", age: 18, gender: "Male", registration: "1001" },
    { id: 2, name: "Jane Smith", age: 20, gender: "Female", registration: "1002" },
  ];
  localStorage.setItem("students", JSON.stringify(initialStudents));
});

test('should render student component', async () => {
  render(
    <Provider store={store}>
      <StudentList /> 
    </Provider>
  );
  expect(await screen.findByText("Jane Smith")).toBeInTheDocument();
  expect(await screen.findByText("John Doe")).toBeInTheDocument();
});

// Test addition of a new student 
test("adds a new student when the form is submitted", async () => {
  render(
    <Provider store={store}>
      <StudentList />
    </Provider>
  );
  
  // Open the add student form
  const addButton = await screen.findByTestId('add-button');
  fireEvent.click(addButton);

  // Fill out the form fields
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Amos" } });
  fireEvent.change(screen.getByLabelText(/age/i), { target: { value: "19" } });
  fireEvent.change(screen.getByLabelText(/gender/i), { target: { value: "Male" } });
  fireEvent.change(screen.getByLabelText(/registration/i), { target: { value: "1003" } });

  // Submit the form
  fireEvent.click(screen.getByTestId('add-student'));

  // Check that the new student appears in the list
  expect(await screen.findByText(/Amos/i)).toBeInTheDocument();
});

// Test editing an existing student
test("edits an existing student when the form is submitted", async () => {
  render(
    <Provider store={store}>
      <StudentList />
    </Provider>
  );

  // Open the edit student form for John Doe
  const editButtons = await screen.findAllByTestId('edit-student');
  // Click the edit button for the first student
  fireEvent.click(editButtons[0]); 

  // Verify that the form is populated with the existing data
  expect(screen.getByLabelText(/name/i).value).toBe("John Doe");

  // Change the name and submit
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Johnathan Doe" } });
  fireEvent.click(screen.getByTestId('add-student'));

  // Check that the updated name appears in the list
  expect(await screen.findByText(/Johnathan Doe/i)).toBeInTheDocument();
});


// Test deleting a student
test("deletes a student when the delete button is clicked", async () => {
  render(
    <Provider store={store}>
      <StudentList />
    </Provider>
  );

  // Check that both students are rendered
  expect(await screen.findByText("John Doe")).toBeInTheDocument();
  expect(await screen.findByText("Jane Smith")).toBeInTheDocument();

  // Find the delete button for Jane Smith
  const deleteButtons = await screen.findAllByTestId('delete-student');
  
  // Click the delete button for Jane Smith
  fireEvent.click(deleteButtons[1]); 



    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  // Verify that John Doe is still present
  expect(await screen.findByText("John Doe")).toBeInTheDocument();
});

