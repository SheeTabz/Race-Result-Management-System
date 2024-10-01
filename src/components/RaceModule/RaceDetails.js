import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateRace, addParticipant, updateParticipant, deleteParticipant, saveResults } from '../../redux/raceActions';
import RaceInformationView from './RaceInformationView';
import PagesTemplate from '../PagesTemplate';
import RaceParticipantView from './RaceParticipantView';
import RaceResultsView from './RaceResultsView';

const RaceDetails = ({ races }) => {
    // Get the race ID from the URL
    const { id } = useParams(); 
    const raceId = parseInt(id);
    console.log('Race ID:', raceId);

    const [activeTab, setActiveTab] = useState('info');
    const dispatch = useDispatch();
// Function to handle the tab headers 
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const raceDetails = useSelector((state) => {
        const races = state.raceState.races;
        if (!Array.isArray(races)) {
            console.error('Races is not an array:', races);
            return null; 
        }
        return races.find((race) => race.id === raceId);
    });
    useEffect(() => {
        if (!raceDetails) {
            const storedRaces = JSON.parse(localStorage.getItem('races'));
            if (storedRaces) {
                const foundRace = storedRaces.find((race) => race.id === raceId);
                if (foundRace) {
                    dispatch({ type: 'SET_RACES', payload: storedRaces });
                }
            }
        }
    }, [dispatch, raceDetails, raceId]);
    // console.log(raceDetails)
      if (!raceDetails) {
        return <div>Race not found!</div>;
      }
    return (
        <div className="" data-testid="race-details">
            <PagesTemplate pageData={raceDetails.title} />

            <div className="tab-navbar w-4/5 m-auto">
                <button
                    className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
                    onClick={() => handleTabChange('info')}
                >
                    Race Info
                </button>
                <button
                    className={`tab-button ${activeTab === 'participants' ? 'active' : ''}`}
                    onClick={() => handleTabChange('participants')}
                >
                    Participants
                </button>
                <button
                    className={`tab-button ${activeTab === 'results' ? 'active' : ''}`}
                    onClick={() => handleTabChange('results')}
                >
                    Results
                </button>
            </div>

            <div className="tab-content w-4/5 m-auto">
                {activeTab === 'info' && (
                    <div className="tab-panel">
                        <RaceInformationView raceDetails={raceDetails}></RaceInformationView>
                    </div>
                )}

                {activeTab === 'participants' && (
                    <div className="tab-panel">
                        {/* <h3>Participant List</h3> */}
                        <RaceParticipantView raceId={raceId}></RaceParticipantView>
                    </div>
                )}

                {activeTab === 'results' && (
                    <div className="tab-panel">
                        {/* <h3>Race Results</h3> */}
                        <RaceResultsView raceId={raceId}></RaceResultsView>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RaceDetails;
