/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCardsStore } from '@/store/cardsStore';
import { Card as CardType } from '@/types/card.types';
import { QRCodeSVG } from 'qrcode.react';
import { NavBar } from '@/components/UI/NavBar';
import { FaEnvelope, FaPhone, FaBuilding, FaUser, FaDownload, FaEdit, FaTrash, FaQrcode, FaArrowLeft } from 'react-icons/fa';

const Single = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cards, loading, error, fetchCards, deleteCard } = useCardsStore();
  const [card, setCard] = useState<CardType | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  useEffect(() => {
    if (cards.length > 0 && id) {
      const foundCard = cards.find(c => c.id.toString() === id);
      setCard(foundCard || null);
      
      // Redirect to card-not-found if card doesn't exist
      if (!foundCard) {
        navigate('/card-not-found');
      }
    }
  }, [cards, id, navigate]);

  // Scroll to QR code section when it becomes visible
  useEffect(() => {
    if (showQR && qrCodeRef.current) {
      // Use a small timeout to ensure the element is rendered
      setTimeout(() => {
        qrCodeRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [showQR]);

  const handleDelete = async () => {
    if (!card) return;
    
    if (window.confirm('Are you sure you want to delete this card?')) {
      setIsDeleting(true);
      try {
        await deleteCard(card.id.toString());
        navigate('/');
      } catch (error) {
        console.error('Failed to delete card:', error);
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = () => {
    if (!card) return;
    navigate(`/modify/${card.id}`);
  };

  const toggleQRCode = () => {
    setShowQR(!showQR);
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

  const exportAsVCard = () => {
    if (!card) return;
    
    // Create vCard format
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${card.name}`,
      `ORG:${card.company}`,
      `EMAIL:${card.email}`,
      `TEL:${card.phone}`,
      'END:VCARD'
    ].join('\n');
    
    // Create download link
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${card.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportAsCSV = () => {
    if (!card) return;
    
    // Create CSV format
    const csvData = [
      'Name,Email,Phone,Company',
      `"${card.name}","${card.email}","${card.phone}","${card.company}"`
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${card.name.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Card not found!</strong>
            <span className="block sm:inline"> The requested business card could not be found.</span>
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Cards
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center mr-4"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Business Card Details</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Card Details */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32 flex items-center justify-center">
                <h2 className="text-3xl font-bold text-white">{card.name}</h2>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-xl text-gray-700 font-semibold">{card.company}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-500 mr-4 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-lg">{card.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-blue-500 mr-4 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-lg">{card.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaBuilding className="text-blue-500 mr-4 text-xl" />
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="text-lg">{card.company}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-sm text-gray-500">
                  <p>Created: {formatDate(card.created_at)}</p>
                  {card.updated_at && card.updated_at !== card.created_at && (
                    <p>Updated: {formatDate(card.updated_at)}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <FaEdit className="mr-2" /> Edit Card
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-t-2 border-white rounded-full"></div> Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash className="mr-2" /> Delete Card
                  </>
                )}
              </button>
              <button
                onClick={toggleQRCode}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <FaQrcode className="mr-2" /> {showQR ? 'Hide QR Code' : 'Show QR Code'}
              </button>
            </div>
          </div>

          {/* QR Code and Export Options */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Export Options</h3>
              <div className="space-y-3">
                <button
                  onClick={exportAsVCard}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-md flex items-center justify-center transition-colors"
                >
                  <FaDownload className="mr-2" /> Export as vCard (.vcf)
                </button>
                <button
                  onClick={exportAsCSV}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-md flex items-center justify-center transition-colors"
                >
                  <FaDownload className="mr-2" /> Export as CSV
                </button>
              </div>

              {showQR && (
                <div className="mt-6" ref={qrCodeRef}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">QR Code</h3>
                  <div className="flex justify-center p-4 bg-white rounded-lg border border-gray-200">
                    <QRCodeSVG
                      value={`BEGIN:VCARD\nVERSION:3.0\nFN:${card.name}\nORG:${card.company}\nEMAIL:${card.email}\nTEL:${card.phone}\nEND:VCARD`}
                      size={200}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"L"}
                      includeMargin={false}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    Scan this QR code to add this contact to your phone.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;