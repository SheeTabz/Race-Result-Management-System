import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from './redux/store';
import App from './App';

beforeEach(() => {
  // Clear localStorage before each test
  localStorage.clear();

  // Set initial race in localStorage
  const races = [
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
  localStorage.setItem("races", JSON.stringify(races));
});

describe('App Component', () => {
  test('renders NavBar and default route (RaceList)', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Check if NavBar is rendered by looking for the "LiveHeats" brand
    expect(screen.getByText('LiveHeats')).toBeInTheDocument();

    // Check if RaceList is rendered (use role or className instead of text matchers)
    const racesHeading = screen.getByRole('heading', { name: /races/i });
    expect(racesHeading).toBeInTheDocument();
  });

  test('renders StudentList when navigating to /students', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/students']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Check if StudentList is rendered by targeting a specific part of the list (e.g., table, heading)
    const studentsHeading = screen.getByTestId("studenList");
    expect(studentsHeading).toBeInTheDocument();
  });

  test('renders RaceDetails when navigating to /races/:id', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/races/1']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Check if RaceDetails is rendered by targeting a specific part of the race details (e.g., title)
    const raceDetailsTitle = screen.getByTestId("race-details");
    expect(raceDetailsTitle).toBeInTheDocument();
  });

  test('renders RaceList when navigating to /races', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/races']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Check if RaceList is rendered by using role or class selector for the race list
    const raceListTitle = screen.getByRole('heading', { name: /races/i });
    expect(raceListTitle).toBeInTheDocument();
  });
});
