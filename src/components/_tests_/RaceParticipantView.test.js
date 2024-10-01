import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import store from "../../redux/store"; 
import { MemoryRouter } from "react-router-dom";
import RaceParticipants from "../RaceModule/RaceParticipantView";

beforeEach(() => {
  // Clear localStorage before each test
  localStorage.clear();

  // Set initial data for races and students in localStorage
  const initialRaces = [
    {
      id: 1,
      title: "Men's 5KM Marathon",
      description: "A challenging marathon event.",
      startDate: "2024-03-01",
      endDate: "2024-03-02",
      participants: [{name:"Tabitha", id: 1, lanes:"1", place:"",time:{}}],
    },
  ];

  const initialStudents = [
    { id: 1, name: "Tabitha", inactive: false },
    { id: 2, name: "John", inactive: false },
  ];

  localStorage.setItem("races", JSON.stringify(initialRaces));
  localStorage.setItem("students", JSON.stringify(initialStudents));
});

// Test if the RaceParticipants component renders correctly
test("should render RaceParticipants component and show no participants initially", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RaceParticipants raceId={1} />
      </MemoryRouter>
    </Provider>
  );

  // expect(await screen.findByText("Tabitha")).toBeInTheDocument();
});

// Test adding a participant
test("should add a participant", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RaceParticipants raceId={1} />
      </MemoryRouter>
    </Provider>
  );

  // Open the popup to add a participant
  fireEvent.click(screen.getByText("Add Participant"));

  // Select a participant and lane
  fireEvent.change(screen.getByLabelText(/Select Participant/i), { target: { value: "John" } });
  fireEvent.change(screen.getByLabelText(/Assigned Lane/i), { target: { value: "Lane 2" } });

  // Submit the form
  fireEvent.click(screen.getByText(/Add Participant/i));

  // Check if the participant is added to the table
  expect(await screen.findByText("John")).toBeInTheDocument();
  expect(await screen.findByText("Lane 2")).toBeInTheDocument();
});

// Test editing a participant
test("should edit a participant", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RaceParticipants raceId={1} />
      </MemoryRouter>
    </Provider>
  );

  // Open the edit popup
  fireEvent.click(screen.getByTestId('edit-button'));

  // Edit participant's lane
  fireEvent.change(screen.getByLabelText(/Assigned Lane/i), { target: { value: "Lane 3" } });
  fireEvent.click(screen.getByText(/Update Participant/i));

  // Check if the participant's lane is updated
  expect(await screen.findByText("Lane 3")).toBeInTheDocument();
});

// Test deleting a participant
test("should delete a participant", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RaceParticipants raceId={1} />
      </MemoryRouter>
    </Provider>
  );

  // Open the delete confirmation popup
  fireEvent.click(screen.getByTestId('delete-button'));

  // Confirm deletion
  fireEvent.click(screen.getByTestId('confirm-button'));

  // Check if the participant is removed
  expect(screen.queryByText("Tabitha")).not.toBeInTheDocument();
});
