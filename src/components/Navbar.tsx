import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Binary, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Members', path: '/members' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white rounded-full p-1.5">
                <Binary className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-800 transition-all duration-300">
              Automata Theory
            </span>
          </Link>

          <div className="hidden md:flex items-center">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-5 py-2 mx-1 rounded-lg transition-all duration-300 overflow-hidden group ${
                  location.pathname === item.path
                    ? 'text-blue-700 font-medium'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {location.pathname === item.path && (
                  <span className="absolute inset-0 w-full h-full bg-blue-100 rounded-lg -z-10"></span>
                )}
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
            
            <a 
              href="https://github.com/yourusername/automata-project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-1 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>GitHub</span>
              <ChevronRight size={16} />
            </a>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-500 ${
              isOpen ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100 mt-4 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-2 pt-2">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                style={{ animationDelay: `${index * 75}ms` }}
                className={`px-4 py-3 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                } ${isOpen ? 'animate-fadeIn' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            
            <a 
              href="https://github.com/yourusername/automata-project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-between"
            >
              <span>View on GitHub</span>
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;