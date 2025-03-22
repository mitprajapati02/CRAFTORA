
import Layout from './components/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ThemeProvider, useTheme } from './context/ThemeContext';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import TermsOfService from './components/TermsOfService';
import './App.css'

import SignUp from './components/SignUp';
import AddMedia from './components/AddMedia';
import ContactUs from './components/ContactUs';
import ForgotPass from './components/ForgotPass';

import LoginPage from './components/LoginPage';
import PrivacyPolicy from './components/PrivacyPolicy';

import UserDashboard from './components/UserDashboard';
import UserProfile from './components/UserProfile';
import AppDashboard from './components/AppDashboard';





function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Mini Layout Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/terms&service" element={<TermsOfService />} />
            <Route path="/add-media" element={<AddMedia />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Full Layout Pages (Added missing routes) */}
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/app-dashboard/:appId" element={<AppDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

