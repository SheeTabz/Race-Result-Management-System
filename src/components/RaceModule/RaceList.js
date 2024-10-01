import React, { useState, useEffect } from 'react';
import RaceAddForm from './RaceAddForm';
import { FaCalendarAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { addRace, setRaces } from '../../redux/raceActions';
import { saveRacesToLocalStorage, getRacesFromLocalStorage } from '../utils/localStorageUtils';
import PagesTemplate from '../PagesTemplate';

const RaceList = () => {
    // const races = useSelector((state) => state.raceState.races);
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
const races = getRacesFromLocalStorage();


    // Open the add race event pop-up
    const openPopup = () => setShowPopup(true);
    // Close the pop-up
    const closePopup = () => setShowPopup(false);

    // Fetch races from local storage when component loads
    useEffect(() => {
        const storedRaces = getRacesFromLocalStorage();
        if (storedRaces.length > 0) {
            dispatch(setRaces(storedRaces));
        }
    }, [dispatch]);

    const handleAddRace = (raceDetails) => {
        const newRace = { id: Date.now(), ...raceDetails, participants: [] }; 
        const updatedRaces = [...races, newRace];
        
        // Save to local storage
        saveRacesToLocalStorage(updatedRaces);
        
        // Dispatch the new race to Redux
        dispatch(addRace(newRace));
        setShowPopup(false);
    };

    // Function to calculate days remaining and determine the race status
    const getRaceStatus = (startDate, endDate) => {
        const today = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const endDateOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate());

        // Check if the race is live (today's date is within the race start and end dates)
        if (todayDateOnly >= startDateOnly && todayDateOnly <= endDateOnly) {
            return { status: 'Live', color: 'green' };
        }
        // Check if the race has passed (today is after the race end date)
        if (todayDateOnly > endDateOnly) {
            return { status: 'Completed', color: 'gray' };
        }
        // Check if the race is upcoming (today is before the race start date)
        const daysToGo = Math.ceil((startDateOnly - todayDateOnly) / (1000 * 60 * 60 * 24)); 
        return { status: `${daysToGo} day(s) to go`, color: 'blue' };
    };

    return (
        <div>
            <PagesTemplate pageData="Races"/>
        <div className="race-event-list w-4/5 m-auto">
            <div className="race-header">
                <h1></h1>
                <button className="add-race-btn" onClick={openPopup}>
                    <FaPlus /> Add New Race
                </button>
            </div>

            {races.length > 0 ? (
                races.map((race) => {
                    const { status, color } = getRaceStatus(race.startDate, race.endDate);

                    return (
                        <Link to={`/races/${race.id}`} className="race-link" key={race.id}>
                            <div className="race-event-item">
                                <FaCalendarAlt className="calendar-icon" />
                                <div className="race-details">
                                    <h3 className="race-name">{race.title}</h3>
                                    <p className="race-date">
                                        {new Date(race.startDate).toLocaleDateString()} -{' '}
                                        {new Date(race.endDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`race-status-tag ${color}`}>{status}</span>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <p className="text-4xl font-bold text-center" >No race events available.</p>
            )}

            {/* Pop-up for adding a new race */}
            {showPopup && <RaceAddForm closePopup={closePopup} addRace={handleAddRace} />}
        </div>
        </div>
    );
};

export default RaceList;
