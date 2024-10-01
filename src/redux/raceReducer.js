const initialState = {
    races: [],
  };
  
  export const raceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RACES':
            return { ...state, races: action.payload };

      case 'ADD_RACE':
        return { ...state, races: [...state.races, action.payload] };
  
      case 'UPDATE_RACE':
        return {
          ...state,
          races: state.races.map((race) =>
            race.id === action.payload.id ? { ...race, ...action.payload.data } : race
          ),
        };
  
      case 'ADD_PARTICIPANT':
        return {
          ...state,
          races: state.races.map((race) =>
            race.id === action.payload.raceId
              ? {
                  ...race,
                  participants: [...race.participants, action.payload.participant],
                }
              : race
          ),
        };
  
      case 'UPDATE_PARTICIPANT':
        return {
          ...state,
          races: state.races.map((race) =>
            race.id === action.payload.raceId
              ? {
                  ...race,
                  participants: race.participants.map((participant) =>
                    participant.id === action.payload.participantId
                      ? { ...participant, ...action.payload.data }
                      : participant
                  ),
                }
              : race
          ),
        };
  
      case 'DELETE_PARTICIPANT':
        return {
          ...state,
          races: state.races.map((race) =>
            race.id === action.payload.raceId
              ? {
                  ...race,
                  participants: race.participants.filter(
                    (participant) => participant.id !== action.payload.participantId
                  ),
                }
              : race
          ),
        };
  
      case 'SAVE_RESULTS':
        return {
          ...state,
          races: state.races.map((race) =>
            race.id === action.payload.raceId
              ? { ...race, results: action.payload.results }
              : race
          ),
        };
  
      default:
        return state;
    }
  };
  