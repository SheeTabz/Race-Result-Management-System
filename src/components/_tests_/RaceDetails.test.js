import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import configureStore from "redux-mock-store"; 
import RaceDetails from "../RaceModule/RaceDetails"; 
import store from "../../redux/store";
// Create a mock store
// const mockStore = configureStore([]);

describe('RaceDetails Component', () => {
//   let store;
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  
    // Set initial  race in localStorage
    const initialRaces = [
      { id: 1, title: "Men's 5KM Marathon", description: "18", endDate: "2024-03-10", startDate: "2024-03-09" , participants:[{name:"Tabitha", id: 1, lanes:"1", place:"", time:{}}]}
     
    ];
    localStorage.setItem("races", JSON.stringify(initialRaces));
  });
  test('should render race information when race is found', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/races/1']}>
        <Routes>
        <Route path="/races/:id" element={<RaceDetails />} />

        </Routes>
       
        </MemoryRouter>
      </Provider>
    );

    // Check if the race title is rendered
    expect(await screen.findByText("Men's 5KM Marathon")).toBeInTheDocument();
    
    // Check that the info tab is rendered by default
    expect(screen.getByText("Race Info")).toBeInTheDocument();
    
    // Click on the participants tab and check if the component renders
    fireEvent.click(screen.getByText("Participants"));
    expect(screen.getByText("Participants")).toBeInTheDocument();
    
    // Click on the results tab and check if the component renders
    fireEvent.click(screen.getByText("Results"));
    expect(screen.getByText("Results")).toBeInTheDocument();
  });

  test('should show "Race not found!" when no race is found', async () => {
    render(
      <Provider store={store}>
        {/* Test A race ID that does not exist */}
        <MemoryRouter initialEntries={['/races/2']}> 
       <Routes>
       <Route path="/races/:id" element={<RaceDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText("Race not found!")).toBeInTheDocument();
  });
});