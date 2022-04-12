import logo from './logo.svg';
import './App.css';
import LandingPage from './Pages/LandingPage';
import Navbar from './Components/Navbar';

// FUNCTIONAL COMPONENT
// Initialize component
function App() {
  // function and data
  let data = []

  // return html component
  return (
    <div>
      <Navbar />
      <LandingPage />
    </div>
  );
}

// Untuk mengeksport component agar dapat ditampilkan oleh virtualDOM react
export default App;
