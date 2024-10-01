import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import RaceResultsView from '../RaceModule/RaceResultsView';
import store from "../../redux/store";

beforeEach(() => {
  // Clear localStorage before each test
  localStorage.clear();

  // Set initial race in localStorage
  const initialRaces = [
    {
      id: 1,
      title: "Men's 5KM Marathon",
      description: "18",
      endDate: "2024-03-10",
      startDate: "2024-03-09",
      participants: [
        { name: "Tabitha", id: 1, lane: "1", place: "", time: { hours: 0, minutes: 0, seconds: 0 } },
        { name: "John", id: 2, lane: "2", place: "", time: { hours: 0, minutes: 0, seconds: 0 } },
      ],
    },
  ];
  localStorage.setItem("races", JSON.stringify(initialRaces));
});

test("allows recording results for participants and saves them", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RaceResultsView raceId={1} />
      </MemoryRouter>
    </Provider>
  );

  // Get all inputs for place
  const placeInputs = await screen.findAllByPlaceholderText("Enter Place");
  
  // Change the place for each participant 
  fireEvent.change(placeInputs[0], { target: { value: "1" } }); // Tabitha
  fireEvent.change(placeInputs[1], { target: { value: "2" } }); // John

  // Get all time inputs
  const timeInputs = await screen.findAllByPlaceholderText(/HH|MM|SS/);
  
  // Check if the input elements are valid input elements
  expect(timeInputs).toHaveLength(6); 

  // Set time for each participant
  const timeValues = [
    { hours: 0, minutes: 50, seconds: 34 }, // For Tabitha
    { hours: 1, minutes: 25, seconds: 12 }  // For John
  ];

  timeValues.forEach((time, index) => {
    // Calculate base index for each participant's time inputs
    const baseIndex = index * 3; 
    fireEvent.change(timeInputs[baseIndex], { target: { value: time.hours } }); 
    fireEvent.change(timeInputs[baseIndex + 1], { target: { value: time.minutes } }); 
    fireEvent.change(timeInputs[baseIndex + 2], { target: { value: time.seconds } });
  });

  // Click on Save Results
  fireEvent.click(screen.getByText("Save Results"));

  // Check local storage for the saved results
  await waitFor(() => {
    const updatedRaces = JSON.parse(localStorage.getItem("races"));
    
    // Check the updated participants in the updated races
    const updatedParticipants = updatedRaces[0].participants;
    
    expect(updatedParticipants).toEqual([
      {
        name: "Tabitha",
        id: 1,
        lane: "1",
        place: "1",
        time: {
          hours: 0,
          minutes: 50,
          seconds: 34,
        },
      },
      {
        name: "John",
        id: 2,
        lane: "2",
        place: "2",
        time: {
          hours: 1,
          minutes: 25,
          seconds: 12,
        },
      },
    ]);
  });
});
