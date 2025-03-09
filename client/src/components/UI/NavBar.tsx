import { Link, useNavigate } from 'react-router-dom';
import { FaQrcode, FaUser, FaSignOutAlt, FaPlus, FaHome, FaInfoCircle } from 'react-icons/fa';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';

export const NavBar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <FaQrcode className="text-2xl" />
            <span className="text-xl font-bold">ScanCard</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 flex items-center space-x-1">
              <FaHome />
              <span>Home</span>
            </Link>
            <Link to="/about" className="hover:text-blue-200 flex items-center space-x-1">
              <FaInfoCircle />
              <span>About</span>
            </Link>
            {user ? (
              <>
                <Link to="/create" className="hover:text-blue-200 flex items-center space-x-1">
                  <FaPlus />
                  <span>Create Card</span>
                </Link>
                <Link to="/profile" className="hover:text-blue-200 flex items-center space-x-1">
                  <FaUser />
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center space-x-1 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="mobile-menu-button p-2 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col space-y-4 py-4">
            <Link 
              to="/" 
              className="hover:text-blue-200 flex items-center space-x-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaHome />
              <span>Home</span>
            </Link>
            <Link 
              to="/about" 
              className="hover:text-blue-200 flex items-center space-x-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaInfoCircle />
              <span>About</span>
            </Link>
            {user ? (
              <>
                <Link 
                  to="/create" 
                  className="hover:text-blue-200 flex items-center space-x-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaPlus />
                  <span>Create Card</span>
                </Link>
                <Link 
                  to="/profile" 
                  className="hover:text-blue-200 flex items-center space-x-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUser />
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center space-x-1 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
