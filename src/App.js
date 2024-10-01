import './App.css';
import NavBar from './components/navBar';
import RaceDetails from './components/RaceModule/RaceDetails';
import StudentList from './components/Students/StudentList';
import { useState, useEffect } from 'react';
import RaceList from './components/RaceModule/RaceList';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
function App() {

  // const dispatch = useDispatch();

  // // Load initial students data
  // useEffect(() => {
  //   dispatch(setStudents(studentData));
  // }, [dispatch]);

  return (
    <Provider store={store}>
    <div className="App">
      <header className=' nav-header bg-blue-800 text-white' >
<NavBar />
<hr className='bg-black' />
      </header>
      <Routes>   
 
      <Route path='/' exact element={<RaceList />} />
     
      <Route path='/races' element={<RaceList />} />
      <Route path='/students' element={<StudentList  />} />

   <Route path={"/races/:id"} element={<RaceDetails  />}/>
   </Routes> 
    </div>
    </Provider>
  );
}

export default App;
