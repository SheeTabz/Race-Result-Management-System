import React from 'react';

const NavBar = () => {
    return (
        <div className='w-4/5 m-auto font-bold'>
            <nav className='flex justify-between   py-5'>
            <div>LiveHeats</div>
            <ul className='list-none flex gap-x-10'>
                <li>Races</li>
                <li>Students</li>
                <li>Leaderboards</li>
            </ul>
            </nav>
           <hr className='bg-black'></hr>
        </div>
    );
}

export default NavBar;
