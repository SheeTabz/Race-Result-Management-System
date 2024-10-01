import React from "react";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import store from "../../redux/store"; 
import { MemoryRouter } from "react-router-dom";
import RaceList from "../RaceModule/RaceList";

beforeEach(() => {
  // Clear localStorage before each test
  localStorage.clear();

  // Set initial students in localStorage
  const initialRaces = [
    { id: 1, title: "Men's 5KM Marathon", description: "18", endDate: "2024-03-10", startDate: "2024-03-09" , participants:[{name:"Tabitha", id: 1, lanes:"1", place:"", time:{}}]}
   
  ];
  localStorage.setItem("races", JSON.stringify(initialRaces));
});

// Test if the races fetched from the local storage is rendered correctly in the race page list
test('should render race component', async () => {

    render(<Provider store={store}>
        <MemoryRouter>
      <RaceList/>
     </MemoryRouter>
    </Provider>)
     expect(await screen.findByText("Men's 5KM Marathon")).toBeInTheDocument();
  
  })