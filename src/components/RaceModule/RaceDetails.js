import React, { useState } from 'react';
import RaceInformationView from './RaceInformationView';
import PagesTemplate from '../PagesTemplate';
import RaceParticipantView from './RaceParticipantView';
import RaceResultsView from './RaceResultsView';



const RaceDetails = () => {
    const [activeTab, setActiveTab] = useState('info');

    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
    const race = {
        name: "Mens 100m",
        startDate: "21-09-2024",
        endDate: "21-09-2024",
        description: "This is the annual mens marathon short distance",
        participants: [{
            id: 1,
            name: "Jane Doe",
            lane: "Lane 3"
        }]
    }
    const participants = [{
        id: 1,
        name: "Jane Doe",
        lane: "Lane 3"
    }]

    return (
        <div className=''>
         <PagesTemplate pageData={race.name}/>

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
            <RaceInformationView race={race}></RaceInformationView>
          </div>
        )}

        {activeTab === 'participants' && (
          <div className="tab-panel">
            <h3>Participant List</h3>

                <RaceParticipantView participants={race.participants} ></RaceParticipantView>
        
          </div>
        )}

        {activeTab === 'results' && (
          <div className="tab-panel">
            <h3>Race Results</h3>
             <RaceResultsView participants={race.participants}></RaceResultsView>
          </div>
        )}
      </div>
      
        </div>
    );
}

export default RaceDetails;
