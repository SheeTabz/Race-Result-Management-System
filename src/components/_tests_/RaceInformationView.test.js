import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RaceInformationView from '../RaceModule/RaceInformationView';
import { updateRace } from '../../redux/raceActions';

// Mocking local storage utility
jest.mock('../utils/localStorageUtils', () => ({
  saveRacesToLocalStorage: jest.fn(),
}));

const mockStore = configureStore([]);

describe('RaceInformationView Component', () => {
  let store;
  let raceDetails;

  beforeEach(() => {
 // Clear localStorage before each test
 localStorage.clear();

    raceDetails = {
      id: 1,
      title: 'Race 1',
      startDate: '2023-09-25',
      endDate: '2023-09-26',
      description: 'Race 1 description',
    };

    store = mockStore({
      raceState: {
        races: [raceDetails],
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders race details and allows editing', async () => {
    render(
      <Provider store={store}>
        <RaceInformationView raceDetails={raceDetails} />
      </Provider>
    );

    // Check if race details are pre-populated in the information page for a specific race 
    expect(screen.getByPlaceholderText(/Provide title/i)).toHaveValue('Race 1');
    expect(screen.getByLabelText(/Start Date/i)).toHaveValue('2023-09-25');
    expect(screen.getByLabelText(/End Date/i)).toHaveValue('2023-09-26');
    expect(screen.getByPlaceholderText(/Description/i)).toHaveValue('Race 1 description');

    // Simulate editing events the race title
    fireEvent.change(screen.getByPlaceholderText(/Provide title/i), { target: { value: 'Updated Race 1' } });
    fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2023-09-20' } });
    fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2023-09-21' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /edit/i }));

    // Ensure the updateRace action is dispatched
    expect(store.dispatch).toHaveBeenCalledWith(updateRace({
      ...raceDetails,
      title: 'Updated Race 1',
      startDate: '2023-09-20',
      endDate: '2023-09-21',
    }));

    // Wait for the success message to appear
    await waitFor(() => {
      expect(screen.getByText('Updated successfully!')).toBeInTheDocument();
    });
  });

  test('shows alert message for invalid dates', () => {
    render(
      <Provider store={store}>
        <RaceInformationView raceDetails={raceDetails} />
      </Provider>
    );

    // setting the start date later than the end date
    fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2023-09-27' } });
    fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2023-09-25' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /edit/i }));

    // Check if alert message is shown
    expect(screen.getByText(/Start date cannot be greater than the end date/i)).toBeInTheDocument();
  });
});
