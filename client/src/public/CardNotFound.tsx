import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaExclamationCircle } from 'react-icons/fa';
import { NavBar } from '@/components/UI/NavBar';

const CardNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <FaExclamationCircle className="text-red-500 text-6xl mx-auto mb-6" />
            
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Card Not Found</h1>
            
            <p className="text-gray-600 mb-8">
              The business card you're looking for doesn't exist or has been deleted.
            </p>
            
            <div className="flex flex-col space-y-4">
              <Link 
                to="/"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md flex items-center justify-center transition-colors"
              >
                <FaHome className="mr-2" /> View All Cards
              </Link>
              
              <Link 
                to="/create"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md flex items-center justify-center transition-colors"
              >
                <FaPlus className="mr-2" /> Create New Card
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNotFound; 