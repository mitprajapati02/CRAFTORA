import MiniHeader from './MiniHeader'
import MiniFooter from './MiniFooter';


import Header from './Header';
import Footer from './Footer';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import OffcanvasNavbar from './OffcanvasNavbar';
import OffcanvasSidebar from './OffcanvasSidebar';
import SearchOffcanvas from './SearchOffcanvas';




import UserProfile from './UserProfile';
import AppDashboard from './AppDashboard';
import UserDashboard from './UserDashboard';



import '../App.css'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { useEffect, useState } from 'react';


import { useLocation, Outlet } from 'react-router-dom';

const Layout = () => {

  const location = useLocation();

  useEffect(() => {
    document.title = location.pathname === '/' ? 'Home' : location.pathname.replace('/', ' ').toUpperCase();
  }, [location.pathname]);


  const miniLayoutPaths = ['/login', '/signup', '/terms&service', '/add-media', '/contact-us', '/forgot-password', '/privacy-policy', '/change-password', '/reset-password'];
  const fullLayoutPaths = {
    '/user-profile': <UserProfile />,
    '/app-dashboard': <AppDashboard />,
    '/': <UserDashboard />
  };


  const isMiniLayout = miniLayoutPaths.includes(location.pathname);
  const mainContent = fullLayoutPaths[location.pathname] || <Outlet />;

  return (
    <>
      <div className="all-container" style={{ backgroundColor: '#d5ebe1' }}>
        {!isMiniLayout && <Navbar />}
        <div className="flex-grow-1 d-flex flex-column">
          {isMiniLayout ? <MiniHeader /> : <Header />}
          <div className="main-container hide-scrollbar main-content">
            {mainContent}
            {/* {message} */}
          </div>
        </div>
        {!isMiniLayout && <Sidebar />}
        {!isMiniLayout && <OffcanvasNavbar />}
        {!isMiniLayout && <OffcanvasSidebar />}
        {!isMiniLayout && <SearchOffcanvas />}
      </div>
      {isMiniLayout ? <MiniFooter /> : <Footer />}
    </>
  );
};

export default Layout;



