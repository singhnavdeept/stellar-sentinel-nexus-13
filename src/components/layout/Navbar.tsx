import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, MoonStar, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-space/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="flex items-center gap-2">
                <span className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-blue-500 rounded-full opacity-70 animate-pulse"></div>
                  <div className="absolute inset-1 bg-blue-700 rounded-full"></div>
                  <div className="absolute inset-[6px] bg-orange-500 rounded-full"></div>
                </span>
                <span className="text-xl font-bold text-white">SolarSentinel</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="nav-link">Live Data</Link>
                <Link to="/phenomena" className="nav-link">Phenomena</Link>
                <Link to="/chatbot" className="nav-link">AI Assistant</Link>
                <Link to="/resources" className="nav-link">Resources</Link>
                <button 
                  onClick={handleLogout}
                  className="nav-link flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-space-blue/30 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              <MoonStar size={20} />
            </button>
            
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white/80 hover:text-white hover:bg-space-blue/30 transition-colors duration-200"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      } overflow-hidden bg-space/90 backdrop-blur-md`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Live Data
              </Link>
              <Link to="/phenomena" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Phenomena
              </Link>
              <Link to="/chatbot" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                AI Assistant
              </Link>
              <Link to="/resources" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Resources
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left mobile-nav-link"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
