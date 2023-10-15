import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import SignUp from './Pages/Sign-up';
import DashBoard from './DashBoard/Dashboard';
import HomePage from './HomePage';
import Hero from './Components/Hero';
import Stats from './Components/Stats';
import Header from './Components/Header';
import CTA from './Components/CTA';
import Page_404 from './Pages/Page_404';
import Construction from './Pages/Construction'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerList from './AdminDash/CustomerList';
import UserAuth from './Auth/UserAuth';
import Dashboard from './DashBoard/Dashboard';
import AdminDashboard from './AdminDash/AdminDashBoard';
import AdminLogin from './AdminAuth/AdminLogin';
import AdminSignUp from './AdminAuth/AdminSignUp';
import SpamDetectionApp from './Pages/Spam-Page';


function App() {
  return (
    
    <>
      <BrowserRouter>
        <Routes>
      <Route path="/" element={<HomePage />} />      {/* SpamDetectionApp later change this back to homapage */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/#product" element={<Hero />} />
          <Route path="/#impact" element={<Header />} />
          <Route path="/#stats" element={<Stats />} />
          <Route path="/#spam-free" element={<CTA />} />
          <Route path="/dash" element={<CustomerList/>} />
          <Route path="/userdash" element={<Dashboard/>} />
          {/* For Admin */}

          <Route path="/adminDash" element={<AdminDashboard/>} />
          <Route path="/AdminLogin" element={<AdminLogin/>} />
          <Route path="/AdminSignup" element={<AdminSignUp/>} />
          {/* <Route element={<UserAuth/>} > */}
            <Route path="/auth/login" element={<Login/>} />
          {/* </Route> */}


        </Routes>
      </BrowserRouter>
          {/* <Route path="*" element={<Page_404/>} /> */}

      
    </>
  );
}

export default App;
