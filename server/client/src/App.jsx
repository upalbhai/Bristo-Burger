import './App.css';
import './styles/app.scss';
import Home from './components/Home/Home';
import Header from './components/Layout/Header';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Footer from './components/Layout/Footer';
import Contact from './components/contact/Contact';
import Cart from './components/cart/Cart';
import Shipping from './components/Shipping/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import PaymentSuccess from './components/cart/PaymentSuccess';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import MyOrders from './components/Myorders/MyOrders';
import OrderDetails from './components/Myorders/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import Users from './components/admin/Users';
import Orders from './components/admin/Orders';
import About from './components/About/About';
import NotFound from './components/Layout/NotFound';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { loadUser } from './redux/actions/user';
import {ProtectedRoute} from 'protected-route-react'
import toast,{Toaster} from "react-hot-toast"

function App() {

  const dispatch= useDispatch();
  const {error,message,isAuthenticated,user}=useSelector(
    (state)=>state.auth)

  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch]);

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch({
        type:"clearError",
      })
    }
    if(message){
      toast.success(message);
      dispatch({
        type:"clearMessage",
      })
    }
  },[dispatch,error,message])
  return (
    <>     
        <Router>
          <Header isAuthenticated={isAuthenticated}/>
          <Routes>
            <Route  path="/" element={<Home />}/>
            <Route  path="/contact" element={<Contact/>}/>
            <Route  path="/about" element={<About/>}/>
            <Route  path="/cart" element={<Cart/>}/>
            
            <Route  path="/login" element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me">
              <Login/>
            </ProtectedRoute>
            }/>

            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route  path="/me" element={<Profile/>}/>
            <Route  path="/paymentsuccess" element={<PaymentSuccess/>}/>
            <Route  path="/shipping" element={<Shipping/>}/>
            <Route  path="/confirmorder" element={<ConfirmOrder/>}/>
            <Route  path="/myorders" element={<MyOrders/>}/>
            <Route  path="/order/:id" element={<OrderDetails/>}/>
            </Route>

            <Route 
            element=
            {<ProtectedRoute isAuthenticated={isAuthenticated} 
            adminRoute={true}
            isAdmin={user && user.role==="admin"}
            redirectAdmin='/me'
            />}>
            <Route  path="/admin/dashboard" element={<Dashboard/>}/>
            <Route  path="/admin/users" element={<Users/>}/>
            <Route  path="/admin/orders" element={<Orders/>}/>
            </Route>

            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
          <Footer />
          <Toaster />
        </Router>
    </>
  )
}

export default App
