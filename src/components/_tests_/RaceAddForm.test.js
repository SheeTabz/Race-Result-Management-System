import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import RaceAddForm from '../RaceModule/RaceAddForm';

describe('RaceAddForm', () => {
  // Mock function to add a race
  const mockAddRace = jest.fn();

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('should render the race add form correctly', () => {
    render(
      <Provider store={store}>
        <RaceAddForm closePopup={() => {}} addRace={mockAddRace} />
      </Provider>
    );

    // Check if form elements/inputs  are rendered
    expect(screen.getByLabelText(/Race Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    expect(screen.getByText(/Close/i)).toBeInTheDocument();
  });

  test('should show alert when start date is greater than end date', async () => {
    render(
      <Provider store={store}>
        <RaceAddForm closePopup={() => {}} addRace={mockAddRace} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Race' } });
    fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2024-03-10' } });
    fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2024-03-09' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Race' } });


    
    fireEvent.click(screen.getByText(/Submit/i));

    // Check for the alert messagein case of date errors
    expect(await screen.findByText(/Start date cannot be greater than the end date/i)).toBeInTheDocument();
    expect(mockAddRace).not.toHaveBeenCalled();
  });

  test('should show alert when end date is earlier than start date', async () => {
    render(
      <Provider store={store}>
        <RaceAddForm closePopup={() => {}} addRace={mockAddRace} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Race' } });
    fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2024-03-09' } });
    fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2024-03-10' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Race' } });

    
    fireEvent.click(screen.getByText(/Submit/i));

    // proceed with  submission
    expect(mockAddRace).toHaveBeenCalledWith({
      title: 'New Race',
      startDate: '2024-03-09',
      endDate: '2024-03-10',
      description: 'New Race',
    }); 
  });

  test('should close the form when close button is clicked', () => {
    const closePopup = jest.fn();
    render(
      <Provider store={store}>
        <RaceAddForm closePopup={closePopup} addRace={mockAddRace} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Close/i));
    // Ensure closePopup function is called after submitting a record 
    expect(closePopup).toHaveBeenCalled(); 
  });
});
