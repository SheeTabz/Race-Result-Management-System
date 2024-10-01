import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NavBar from '../navBar'; 
import { MemoryRouter } from 'react-router-dom';

describe('NavBar Component', () => {
  test('renders NavBar with brand name and navigation links', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // confirm the logo name is rendered in the page 
    expect(screen.getByText('LiveHeats')).toBeInTheDocument();

    // confirm that navigation links are rendered for the student and race 
    expect(screen.getByText('Races')).toBeInTheDocument();
    expect(screen.getByText('Students')).toBeInTheDocument();


  });

  test('toggles menu when menu button is clicked', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    // Get the menu button (hamburger icon if it is on smaller screens)
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();

    // Get the menu list 
    const menuList = screen.getByRole('list');
    expect(menuList).toBeInTheDocument();

    // menu should have class 'hidden' (isMenuOpen is false) by default
    expect(menuList.className).toContain('hidden');
    // expect(menuList.className).not.toContain('block');

    // Click the menu button to toggle menu
    fireEvent.click(menuButton);

    // Now the menu should have class 'block' (isMenuOpen is true)
    expect(menuList.className).toContain('block');
    expect(menuList.className).not.toContain('hidden');

    // Click again to hide menu
    fireEvent.click(menuButton);

    // Menu should have class 'hidden' again
    expect(menuList.className).toContain('hidden');
    // expect(menuList.className).not.toContain('block');
  });

  test('navigation links navigate to the correct routes', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

     // Get navigation links
     const racesLink = screen.getByText('Races');
     const studentsLink = screen.getByText('Students');

 
     // Check that they are in the document
     expect(racesLink).toBeInTheDocument();
     expect(studentsLink).toBeInTheDocument();
   
     
     // check if navigation works 
     fireEvent.click(racesLink);
     fireEvent.click(studentsLink);
  
  
  });

  test('menu button is visible on small screens and hidden on medium/large screens', () => {
   
    // heck if the menu button has the 'hidden' class
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const menuButtonContainer = screen.getByRole('button');
    expect(menuButtonContainer).toHaveClass('md:hidden');
  });
});
