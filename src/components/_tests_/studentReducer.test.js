import studentReducer from '../../redux/studentReducer';
import { ADD_STUDENT, EDIT_STUDENT, DELETE_STUDENT, SET_STUDENTS } from '../../redux/studentActions';

describe('Student Reducer', () => {
  const initialState = {
    students: [],
  };

  test('should return the initial state', () => {
    expect(studentReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle SET_STUDENTS', () => {
    const students = [
        { id: 1, name: "John Doe", age: 18, gender: "Male", registration: "1001" },
        { id: 2, name: "Jane Smith", age: 20, gender: "Female", registration: "1002" },
    ];
    const action = { type: SET_STUDENTS, payload: students };
    const expectedState = { students };

    expect(studentReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle ADD_STUDENT', () => {
    const newStudent = { name: 'New Student' };
    const action = { type: ADD_STUDENT, payload: newStudent };
    // The first student gets ID 1
    const expectedState = {
      students: [
        { id: 1, name: 'New Student' }, 
      ],
    };

    expect(studentReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle EDIT_STUDENT', () => {
    const initialStudents = [
        { id: 1, name: "John Doe", age: 18, gender: "Male", registration: "1001" },
        { id: 2, name: "Jane Smith", age: 20, gender: "Female", registration: "1002" },
    ];
    const action = {
      type: EDIT_STUDENT,
      payload:   { id: 1, name: "John Updated", age: 18, gender: "Male", registration: "1001" },
    };
    const expectedState = {
      students: [
        { id: 1, name: "John Updated", age: 18, gender: "Male", registration: "1001" },
        { id: 2, name: "Jane Smith", age: 20, gender: "Female", registration: "1002" },
      ],
    };

    expect(studentReducer({ students: initialStudents }, action)).toEqual(expectedState);
  });

  test('should handle DELETE_STUDENT', () => {
    const initialStudents = [
        { id: 1, name: "John Doe", age: 18, gender: "Male", registration: "1001" },
        { id: 2, name: "Jane Smith", age: 20, gender: "Female", registration: "1002" },
    ];
    // Delete student with ID 1
    const action = { type: DELETE_STUDENT, payload: 1 }; 
    // show remaining student after deletion
    const expectedState = {
      students: [
        { id: 2, name: "Jane Smith", age: 20, gender: "Female", registration: "1002" }, 
      ],
    };

    expect(studentReducer({ students: initialStudents }, action)).toEqual(expectedState);
  });
});
