import { raceReducer } from '../../redux/raceReducer';

describe('Race Reducer', () => {
  const initialState = {
    races: [],
  };

  test('should return the initial state', () => {
    expect(raceReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle SET_RACES', () => {
    const races = [
      { id: 1, title: "Men's 5KM Marathon", description: "18", startDate: "2024-03-09", endDate: "2024-03-10", participants: [] }
    ];
    const action = { type: 'SET_RACES', payload: races };
    const expectedState = { races };

    expect(raceReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle ADD_RACE', () => {
    const newRace = { id: 2, title: "Women's 10KM Marathon", description: "20", startDate: "2024-04-01", endDate: "2024-04-02", participants: [] };
    const action = { type: 'ADD_RACE', payload: newRace };
    const expectedState = {
      races: [newRace],
    };

    expect(raceReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle UPDATE_RACE', () => {
    const initialRaces = [
      { id: 1, title: "Men's 5KM Marathon", description: "18", startDate: "2024-03-09", endDate: "2024-03-10", participants: [] }
    ];
    const action = {
      type: 'UPDATE_RACE',
      payload: { id: 1, data: { title: "Updated Men's 5KM Marathon" } },
    };
    const expectedState = {
      races: [
        { id: 1, title: "Updated Men's 5KM Marathon", description: "18", startDate: "2024-03-09", endDate: "2024-03-10", participants: [] }
      ],
    };

    expect(raceReducer({ races: initialRaces }, action)).toEqual(expectedState);
  });

  test('should handle ADD_PARTICIPANT', () => {
    const initialRaces = [
      { id: 1, title: "Men's 5KM Marathon", description: "18", startDate: "2024-03-09", endDate: "2024-03-10", participants: [] }
    ];
    const newParticipant = { name: "Tabitha", id: 1, lanes: "1", place: "", time: {} };
    const action = {
      type: 'ADD_PARTICIPANT',
      payload: { raceId: 1, participant: newParticipant },
    };
    const expectedState = {
      races: [
        {
          id: 1,
          title: "Men's 5KM Marathon",
          description: "18",
          startDate: "2024-03-09",
          endDate: "2024-03-10",
          participants: [newParticipant],
        },
      ],
    };

    expect(raceReducer({ races: initialRaces }, action)).toEqual(expectedState);
  });

  test('should handle UPDATE_PARTICIPANT', () => {
    const initialRaces = [
      {
        id: 1,
        title: "Men's 5KM Marathon",
        description: "18",
        startDate: "2024-03-09",
        endDate: "2024-03-10",
        participants: [{ name: "Tabitha", id: 1, lanes: "1", place: "", time: {} }],
      },
    ];
    const action = {
      type: 'UPDATE_PARTICIPANT',
      payload: { raceId: 1, participantId: 1, data: { lanes: "2" } },
    };
    const expectedState = {
      races: [
        {
          id: 1,
          title: "Men's 5KM Marathon",
          description: "18",
          startDate: "2024-03-09",
          endDate: "2024-03-10",
          participants: [{ name: "Tabitha", id: 1, lanes: "2", place: "", time: {} }],
        },
      ],
    };

    expect(raceReducer({ races: initialRaces }, action)).toEqual(expectedState);
  });

  test('should handle DELETE_PARTICIPANT', () => {
    const initialRaces = [
      {
        id: 1,
        title: "Men's 5KM Marathon",
        description: "18",
        startDate: "2024-03-09",
        endDate: "2024-03-10",
        participants: [{ name: "Tabitha", id: 1, lanes: "1", place: "", time: {} }],
      },
    ];
    const action = {
      type: 'DELETE_PARTICIPANT',
      payload: { raceId: 1, participantId: 1 },
    };
    const expectedState = {
      races: [
        {
          id: 1,
          title: "Men's 5KM Marathon",
          description: "18",
          startDate: "2024-03-09",
          endDate: "2024-03-10",
          participants: [],
        },
      ],
    };

    expect(raceReducer({ races: initialRaces }, action)).toEqual(expectedState);
  });

  test('should handle SAVE_RESULTS', () => {
    const initialRaces = [
      {
        id: 1,
        title: "Men's 5KM Marathon",
        description: "18",
        startDate: "2024-03-09",
        endDate: "2024-03-10",
        participants: [],
      },
    ];
    const results = [{ participantId: 1, place: 1, time: '00:20:00' }];
    const action = {
      type: 'SAVE_RESULTS',
      payload: { raceId: 1, results },
    };
    const expectedState = {
      races: [
        {
          id: 1,
          title: "Men's 5KM Marathon",
          description: "18",
          startDate: "2024-03-09",
          endDate: "2024-03-10",
          participants: [],
          results,
        },
      ],
    };

    expect(raceReducer({ races: initialRaces }, action)).toEqual(expectedState);
  });
});
