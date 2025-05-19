import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    // When navigating directly to a page other than home, reduce loading time
    const loadTime = location.pathname === '/' ? 3000 : 500;
    
    // Show loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, loadTime);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {loading ? (
        <div className="fixed inset-0 bg-blue-600 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Automata Theory Project</h2>
            <p className="text-white">Loading amazing visualizations...</p>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;