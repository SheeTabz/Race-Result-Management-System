export const setRaces = (races) => ({
    type: 'SET_RACES',
    payload: races,
});

export const addRace = (race) => ({
    type: 'ADD_RACE',
    payload: race,
  });
  
  export const updateRace = (id, data) => ({
    type: 'UPDATE_RACE',
    payload: { id, data },
  });
  
  export const addParticipant = (raceId, participant) => ({
    type: 'ADD_PARTICIPANT',
    payload: { raceId, participant },
  });
  
  export const updateParticipant = (raceId, participantId, data) => ({
    type: 'UPDATE_PARTICIPANT',
    payload: { raceId, participantId, data },
  });
  
  export const deleteParticipant = (raceId, participantId) => ({
    type: 'DELETE_PARTICIPANT',
    payload: { raceId, participantId },
  });
  
  export const saveResults = (raceId, results) => ({
    type: 'SAVE_RESULTS',
    payload: { raceId, results },
  });
  
