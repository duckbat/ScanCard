import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import { NavBar } from '@/components/UI/NavBar';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-6" />
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
            
            <p className="text-gray-600 mb-8">
              The page you are looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col space-y-4">
              <Link 
                to="/"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md flex items-center justify-center transition-colors"
              >
                <FaHome className="mr-2" /> Go to Home
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-gray-500 text-sm">
            <p>If you believe this is an error, please contact support.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 