/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardsStore } from '@/store/cardsStore';
import { Card as CardType } from '@/types/card.types';
import { NavBar } from '@/components/UI/NavBar';
import { FaPlus, FaSearch, FaSort, FaSortAlphaDown, FaSortAlphaUp, FaFilter, FaTimes, FaEnvelope, FaPhone } from 'react-icons/fa';

const Main = () => {
  const navigate = useNavigate();
  const { cards, loading, error, fetchCards } = useCardsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof CardType>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [companyFilter, setCompanyFilter] = useState('');
  const [companies, setCompanies] = useState<string[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    try {
      fetchCards();
    } catch (err) {
      console.error("Error in fetchCards:", err);
      setLocalError("Failed to fetch cards. Please try again later.");
    }
  }, [fetchCards]);

  useEffect(() => {
    try {
      // Extract unique companies for filtering
      // Check if cards is an array and has items
      if (Array.isArray(cards) && cards.length > 0) {
        const uniqueCompanies = Array.from(new Set(cards.map(card => card.company)));
        setCompanies(uniqueCompanies);
      }
    } catch (err) {
      console.error("Error processing companies:", err);
      setLocalError("Error processing card data.");
    }
  }, [cards]);

  useEffect(() => {
    try {
      // Filter and sort cards
      // Ensure cards is an array before processing
      const cardsArray = Array.isArray(cards) ? cards : [];
      let result = [...cardsArray];
      
      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(card => 
          card.name?.toLowerCase().includes(term) || 
          card.email?.toLowerCase().includes(term) || 
          card.company?.toLowerCase().includes(term) ||
          card.phone?.toLowerCase().includes(term)
        );
      }
      
      // Apply company filter
      if (companyFilter) {
        result = result.filter(card => card.company === companyFilter);
      }
      
      // Apply sorting
      result.sort((a, b) => {
        const fieldA = a[sortField]?.toString().toLowerCase() || '';
        const fieldB = b[sortField]?.toString().toLowerCase() || '';
        
        if (sortDirection === 'asc') {
          return fieldA.localeCompare(fieldB);
        } else {
          return fieldB.localeCompare(fieldA);
        }
      });
      
      setFilteredCards(result);
    } catch (err) {
      console.error("Error filtering cards:", err);
      setLocalError("Error filtering card data.");
    }
  }, [cards, searchTerm, sortField, sortDirection, companyFilter]);

  const handleSort = (field: keyof CardType) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleCardClick = (card: CardType) => {
    try {
      if (!card || !card.id) {
        console.error("Invalid card or missing ID:", card);
        setLocalError("Cannot view this card. Invalid card data.");
        return;
      }
      navigate(`/card/${card.id}`);
    } catch (err) {
      console.error("Error navigating to card:", err);
      setLocalError("Error viewing card details.");
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCompanyFilter('');
    setSortField('name');
    setSortDirection('asc');
  };

  const formatDate = (date: string | Date): string => {
    if (!date) return 'N/A';
    
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        return 'Invalid date';
      }
      
      // Format date as "Mar 9, 2025" instead of ISO string
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      };
      
      return dateObj.toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Your Business Cards</h1>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setLocalError(null);
                fetchCards();
              }}
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center transition-colors"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing...
                </span>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Refresh
                </>
              )}
            </button>
            <button
              onClick={() => navigate('/create')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
            >
              <FaPlus className="mr-2" /> Create New Card
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search cards..."
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <FaTimes className="text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <FaFilter className="mr-2" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              {(searchTerm || companyFilter || sortField !== 'name' || sortDirection !== 'asc') && (
                <button
                  onClick={clearFilters}
                  className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md flex items-center transition-colors"
                >
                  <FaTimes className="mr-2" /> Clear
                </button>
              )}
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <div className="flex">
                    <select
                      value={sortField}
                      onChange={(e) => setSortField(e.target.value as keyof CardType)}
                      className="flex-grow border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="name">Name</option>
                      <option value="company">Company</option>
                      <option value="email">Email</option>
                      <option value="created_at">Date Created</option>
                    </select>
                    <button
                      onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                      className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-r-md border-t border-r border-b"
                    >
                      {sortDirection === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
                    </button>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Company</label>
                  <select
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Companies</option>
                    {companies.map((company, index) => (
                      <option key={index} value={company}>{company}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cards Display */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : localError ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {localError}</span>
            <div className="mt-2">
              <button
                onClick={() => {
                  setLocalError(null);
                  fetchCards();
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md inline-flex items-center"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            {searchTerm || companyFilter ? (
              <div>
                <p className="text-gray-600 mb-4">No cards match your search criteria.</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center transition-colors"
                >
                  <FaTimes className="mr-2" /> Clear Filters
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">You don't have any business cards yet. Create your first card!</p>
                <button
                  onClick={() => navigate('/create')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center transition-colors"
                >
                  <FaPlus className="mr-2" /> Create New Card
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <div
                key={card.id.toString()}
                onClick={() => handleCardClick(card)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.name}</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">{card.company}</p>
                    <p className="text-gray-600 flex items-center">
                      <FaEnvelope className="mr-2 text-gray-400" /> {card.email}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <FaPhone className="mr-2 text-gray-400" /> {card.phone}
                    </p>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    {formatDate(card.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;