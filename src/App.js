import logo from './logo.svg';
import './App.css';
import NavBar from './components/navBar';
import RaceAddForm from './components/RaceModule/RaceAddForm';
import StudentAddForm from './components/Students/StudentAddForm';
import RaceParticipantForm from './components/RaceModule/RaceParticipantForm';
import RaceDetails from './components/RaceModule/RaceDetails';
import StudentList from './components/Students/StudentList';

function App() {
  return (
    <div className="App">
      <header className='bg-blue-800 text-white' >
<NavBar></NavBar>
      </header>

      {/* <RaceAddForm></RaceAddForm> */}
      {/* <StudentAddForm></StudentAddForm> */}
      {/* <RaceParticipantForm></RaceParticipantForm> */}
      {/* <RaceDetails></RaceDetails> */}
      <StudentList></StudentList>
    </div>
  );
}

export default App;
