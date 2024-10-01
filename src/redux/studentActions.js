export const ADD_STUDENT = 'ADD_STUDENT';
export const EDIT_STUDENT = 'EDIT_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const SET_STUDENTS = 'SET_STUDENTS';

// Action creators
export const addStudent = (student) => ({
  type: ADD_STUDENT,
  payload: student,
});

export const editStudent = (student) => ({
  type: EDIT_STUDENT,
  payload: student,
});

export const deleteStudent = (id) => ({
  type: DELETE_STUDENT,
  payload: id,
});

export const setStudents = (students) => ({
  type: SET_STUDENTS,
  payload: students,
});
