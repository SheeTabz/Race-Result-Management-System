import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='nav-bar lg:w-4/5 m-auto font-bold md:w-11/12'>
            <nav className='flex justify-between items-center py-5'>
                <div>LiveHeats</div>
                <div className='md:hidden'> 
                    <button onClick={toggleMenu} className='focus:outline-none'>
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16m-7 6h7' />
                        </svg>
                    </button>
                </div>
                <ul className={`list-none flex-col md:flex gap-x-10 md:flex-row ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    <Link to={'/races'}> <li>Races</li> </Link>
                    <Link to={'/students'}> <li>Students</li> </Link>
                   
                </ul>
            </nav>
           
        </div>
    );
}

export default NavBar;
