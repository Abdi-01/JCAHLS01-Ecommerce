import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Navbar from './Components/Navbar';
import RegisterPage from './Pages/RegisterPage';
import ProductsPage from './Pages/ProductsPage';
import ProductsAdmin from './Pages/ProductsAdmin';
import ProductDetail from './Pages/ProductDetail';
// FUNCTIONAL COMPONENT
// Initialize component
function App() {
  // function and data
  let data = []

  // return html component
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/admin' element={<ProductsAdmin />} />
        <Route path='/product/detail' element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

// Untuk mengeksport component agar dapat ditampilkan oleh virtualDOM react
export default App;
