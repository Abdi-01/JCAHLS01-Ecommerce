import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Navbar from './Components/Navbar';
import RegisterPage from './Pages/RegisterPage';
import ProductsPage from './Pages/ProductsPage';
import ProductsAdmin from './Pages/ProductsAdmin';
import ProductDetail from './Pages/ProductDetail';
import Axios from 'axios';
import { API_URL } from './helper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAction } from './redux/actions/productsAction';
import { loginAction, keepLogin } from './redux/actions/usersAction';
import TransactionsAdminPage from './Pages/TransactionsAdmin';
import CartPage from './Pages/Cart';
import TransactionsPage from './Pages/Transactions';
import NotFoundPage from './Pages/404';
// FUNCTIONAL COMPONENT
// Initialize component
function App() {

  // untuk mengeksekusi action pada redux, dan menghubungkannya ke reducer by sistem redux
  const dispatch = useDispatch();
  // function and data

  const { role } = useSelector((state) => {
    return {
      role: state.usersReducer.role
    }
  })

  const getProducts = () => {
    Axios.get(`${API_URL}/products`)
      .then((response) => {
        console.log(response.data)
        dispatch(getProductsAction(response.data))
      }).catch((error) => {
        console.log(error)
      })
  }

  React.useEffect(() => {
    dispatch(keepLogin());
    getProducts();
  }, [])

  // return html component
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/detail' element={<ProductDetail />} />
        {
          role == "admin" ?
            <>
              <Route path='/products/admin' element={<ProductsAdmin />} />
              <Route path='/transactions/admin' element={<TransactionsAdminPage />} />
            </>
            :
            <>
              <Route path='/cart' element={<CartPage />} />
              <Route path='/transactions' element={<TransactionsPage />} />
            </>
        }
        <Route path='*' element={<NotFoundPage />} />

      </Routes>
    </div>
  );
}

// Untuk mengeksport component agar dapat ditampilkan oleh virtualDOM react
export default App;
