import { ADD_STUDENT, EDIT_STUDENT, DELETE_STUDENT, SET_STUDENTS } from './studentActions';

const initialState = {
  students: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, { ...action.payload, id: state.students.length + 1 }],
      };
    case EDIT_STUDENT:
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? { ...student, ...action.payload } : student
        ),
      };
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter((student) => student.id !== action.payload),
      };
    default:
      return state;
  }
};

export default studentReducer;
