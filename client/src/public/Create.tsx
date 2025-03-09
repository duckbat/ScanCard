/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardsStore } from '@/store/cardsStore';
import { CardForm, Card } from '@/types/card.types';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavBar } from '@/components/UI/NavBar';
import { v4 as uuidv4 } from 'uuid';

const Create = () => {
  const navigate = useNavigate();
  const { addCard, loading, error } = useCardsStore();
  const [formData, setFormData] = useState<CardForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [showPreview, setShowPreview] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create a temporary Card object with required fields
      // In a real app, these would be set by the backend
      const now = new Date().toISOString();
      
      const tempCard: Card = {
        ...formData,
        id: uuidv4() as unknown as any, // Using UUID v4 for temporary ID
        created_at: now,
        updated_at: now,
        user_id: uuidv4(),
        user: { 
          id: uuidv4() as unknown as any, 
          username: 'tempuser', 
          email: 'temp@example.com', 
          password: 'password', 
          created_at: now
        }
      };
      
      await addCard(tempCard);
      navigate('/');
    } catch (error) {
      console.error('Failed to create card:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Business Card</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <div className="flex items-center">
                    <FaUser className="text-gray-500 mr-2" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <div className="flex items-center">
                    <FaEnvelope className="text-gray-500 mr-2" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <div className="flex items-center">
                    <FaPhone className="text-gray-500 mr-2" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                    Company
                  </label>
                  <div className="flex items-center">
                    <FaBuilding className="text-gray-500 mr-2" />
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    {showPreview ? (
                      <>
                        <FaEyeSlash className="mr-1" /> Hide Preview
                      </>
                    ) : (
                      <>
                        <FaEye className="mr-1" /> Show Preview
                      </>
                    )}
                  </button>
                  
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded inline-flex items-center transition-colors"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="inline-flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </span>
                    ) : (
                      <>
                        <FaSave className="mr-2" />
                        Create Card
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Preview Section - Always in DOM but visibility controlled by showPreview */}
          <div className={`w-full md:w-1/2 transition-opacity duration-300 ${showPreview ? 'opacity-100' : 'opacity-0 md:invisible'}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-24 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">
                  {formData.name || 'Your Name'}
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-700 font-semibold">{formData.company || 'Company Name'}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-500 mr-3" />
                    <p className="text-gray-600">{formData.email || 'email@example.com'}</p>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-blue-500 mr-3" />
                    <p className="text-gray-600">{formData.phone || '+1 (555) 123-4567'}</p>
                  </div>
                  <div className="flex items-center">
                    <FaBuilding className="text-blue-500 mr-3" />
                    <p className="text-gray-600">{formData.company || 'Company Name'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`mt-4 text-center text-gray-500 text-sm ${showPreview ? '' : 'hidden'}`}>
              <p>This is a preview of how your business card will look.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;