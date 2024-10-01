import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa'; 
import PagesTemplate from '../PagesTemplate';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, editStudent, deleteStudent, setStudents } from '../../redux/studentActions';

const StudentList = () => {
  const students = useSelector((state) => state.studentState.students) || [];
  const dispatch = useDispatch();
  // console.log(students)
  const [newStudent, setNewStudent] = useState({ name: '', age: '', gender: '', registration: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Load students from localStorage when component loads
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
     // Set the students in Redux state
    dispatch(setStudents(storedStudents));
  }, [dispatch]);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newStudent.name && newStudent.age && newStudent.gender) {
      let updatedStudents;
      if (isEditing) {
        // Update student in local storage and Redux
        updatedStudents = students.map((student) => 
          student.id === currentStudentId ? { ...newStudent, id: currentStudentId } : student
        );

        // Update races to reflect participant name change
        const races = JSON.parse(localStorage.getItem('races')) || [];
        // Update participant name if it matches
        races.forEach(race => {
          race.participants.forEach(participant => {
            if (participant.name === newStudent.name) {
              participant.name = newStudent.name; 
            }
          });
        });
        localStorage.setItem('races', JSON.stringify(races));
      } else {
        // Add new student
        updatedStudents = [...students, { ...newStudent, id: students.length + 1 }];
        // console.log(updatedStudents);
      }

      // Update localStorage and Redux state
      localStorage.setItem('students', JSON.stringify(updatedStudents)); 
      dispatch(setStudents(updatedStudents));

      // Reset state
      setNewStudent({ name: '', age: '', gender: '', registration: '' });
      setIsEditing(false);
      setShowPopup(false);
    } else {
      alert('Please fill in all fields');
    }
  };


  const handleEdit = (student) => {
    setIsEditing(true);
    setNewStudent(student);
    setCurrentStudentId(student.id);
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    const deletedStudent = students.find((student) => student.id === id);

    // Update participants to mark as inactive
    const races = JSON.parse(localStorage.getItem('races')) || [];
    races.forEach(race => {
      race.participants.forEach(participant => {
        if (participant.name === deletedStudent.name) {
           // Mark participant as inactive
          participant.active = false;
        }
      });
    });

    // Save updated races
    localStorage.setItem('races', JSON.stringify(races));

    dispatch(deleteStudent(id));
    // Update localStorage after delete
    localStorage.setItem('students', JSON.stringify(updatedStudents)); 
  };

  const openPopup = () => {
    setNewStudent({ name: '', age: '', gender: '', registration: '' });
    setIsEditing(false);
    setShowPopup(true);
  };

  return (
    <div data-testid="studenList">
      <PagesTemplate pageData="Students" />
      <div className="student-list-page w-4/5 m-auto ">
      
        {/* Add Student Button */}
        <button data-testid="add-button" className="add-student-btn"  onClick={openPopup}>
          <FaPlus /> Add Student
        </button>

        {/* Student Table */}
        <table className="students-table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Registration No</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>{student.registration}</td>

                  <td>
                    <button data-testid="edit-student" onClick={() => handleEdit(student)}  className="icon-btn">
                      <FaEdit className="edit-icon" />
                    </button>
                  </td>
                  <td>
                    <button data-testid="delete-student" onClick={() => handleDelete(student.id)} className="icon-btn">
                      <FaTrashAlt className="delete-icon" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No students found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Popup Form for Add/Edit */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>{isEditing ? 'Edit Student' : 'Add New Student'}</h3>
              <form onSubmit={handleSubmit}  className="student-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                  id="name"
                    type="text"
                    name="name"
                    value={newStudent.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Student Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                  id="age"
                    type="number"
                    name="age"
                    value={newStudent.age}
                    onChange={handleInputChange}
                    required
                    placeholder="Student Age"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                  id='gender'
                    name="gender"
                    value={newStudent.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="registration">Student Registration No</label>
                  <input
                  id="registration"
                    type="number"
                    name="registration"
                    value={newStudent.registration}
                    onChange={handleInputChange}
                    required
                    placeholder="Registration No"
                  />
                </div>

                <button data-testid="add-student"  type="submit" className="submit-btn">
                  {isEditing ? 'Update Student' : 'Add Students'}
                </button>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;
