import { NavBar } from '@/components/UI/NavBar';
import { FaInfoCircle, FaQrcode, FaPlus, FaEdit, FaTrash, FaDownload, FaSearch, FaFilter, FaUser } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaInfoCircle className="mr-3 text-blue-600" />
            About ScanCard
          </h1>
          <p className="text-gray-600 mt-2">
            Learn about the ScanCard application and how to use it effectively.
          </p>
        </div>

        {/* About the Project Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">About the Project</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              ScanCard is a modern digital business card manager designed to help professionals organize, 
              store, and share their business contacts efficiently. With ScanCard, you can:
            </p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Create and manage digital business cards</li>
              <li>Generate QR codes for easy sharing</li>
              <li>Export contacts as vCards or CSV files</li>
              <li>Search and filter your business card collection</li>
              <li>Access your cards from any device with internet connection</li>
            </ul>
            
            <p className="mb-4">
              Built with React, TypeScript, and Tailwind CSS, ScanCard offers a responsive and 
              intuitive user interface that works seamlessly across desktop and mobile devices.
            </p>
            
            <div className="flex items-center justify-center my-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg flex items-center">
                <FaQrcode className="text-4xl mr-4" />
                <div>
                  <h3 className="text-xl font-bold">ScanCard</h3>
                  <p>Your Digital Business Card Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Use ScanCard</h2>
          
          {/* Step 1 */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                1
              </div>
              <h3 className="text-xl font-medium text-gray-800">Creating a New Business Card</h3>
            </div>
            <div className="ml-11">
              <p className="mb-3 text-gray-600">
                To create a new business card, follow these steps:
              </p>
              <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-600">
                <li>Click on the <span className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"><FaPlus className="mr-1" /> Create Card</span> button in the navigation bar</li>
                <li>Fill in the required information (name, email, phone, company)</li>
                <li>Review the preview of your card on the right side</li>
                <li>Click the "Create Card" button to save your new business card</li>
              </ol>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 italic">
                  Tip: You can toggle the preview visibility by clicking the "Show/Hide Preview" button.
                </p>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                2
              </div>
              <h3 className="text-xl font-medium text-gray-800">Managing Your Business Cards</h3>
            </div>
            <div className="ml-11">
              <p className="mb-3 text-gray-600">
                On the main dashboard, you can:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                <li>View all your business cards in a grid layout</li>
                <li>Click on a card to view its details</li>
                <li>Use the <span className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"><FaSearch className="mr-1" /> Search</span> function to find specific cards</li>
                <li>Apply <span className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"><FaFilter className="mr-1" /> Filters</span> to sort and organize your collection</li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 italic">
                  Tip: You can sort your cards by name, company, or date created.
                </p>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                3
              </div>
              <h3 className="text-xl font-medium text-gray-800">Viewing and Sharing Cards</h3>
            </div>
            <div className="ml-11">
              <p className="mb-3 text-gray-600">
                When viewing a business card, you can:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
                <li>See all contact details in a clean, organized layout</li>
                <li>Click <span className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"><FaEdit className="mr-1" /> Edit</span> to modify the card information</li>
                <li>Click <span className="inline-flex items-center bg-red-100 text-red-800 px-2 py-1 rounded text-sm"><FaTrash className="mr-1" /> Delete</span> to remove the card</li>
                <li>Click <span className="inline-flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm"><FaQrcode className="mr-1" /> Show QR Code</span> to display a QR code for sharing</li>
                <li>Use <span className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm"><FaDownload className="mr-1" /> Export</span> options to download as vCard or CSV</li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 italic">
                  Tip: The QR code contains all the contact information and can be scanned by most smartphone cameras.
                </p>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div>
            <div className="flex items-center mb-2">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                4
              </div>
              <h3 className="text-xl font-medium text-gray-800">Managing Your Profile</h3>
            </div>
            <div className="ml-11">
              <p className="mb-3 text-gray-600">
                To update your profile information:
              </p>
              <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-600">
                <li>Click on the <span className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"><FaUser className="mr-1" /> Profile</span> link in the navigation bar</li>
                <li>View your current profile information</li>
                <li>Click "Edit Profile" to make changes</li>
                <li>Update your username and email as needed</li>
                <li>Click "Save Changes" to update your profile</li>
              </ol>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 italic">
                  Tip: Keeping your profile information up-to-date ensures you receive important notifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 