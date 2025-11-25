import React, { useState } from 'react';
import { Plant } from './types';
import PlantIdentifier from './components/PlantIdentifier';
import ChatBot from './components/ChatBot';
import MyGarden from './components/MyGarden';
import { BookOpenIcon, LookupIcon, MessageCircleIcon, SproutIcon } from './components/icons';

type Tab = 'identifier' | 'chatbot' | 'garden';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('identifier');
  const [myGarden, setMyGarden] = useState<Plant[]>([]);

  const addToGarden = (plant: Plant) => {
    if (!myGarden.some(p => p.scientificName === plant.scientificName)) {
      setMyGarden(prevGarden => [...prevGarden, plant]);
      setActiveTab('garden'); 
    } else {
      alert(`${plant.commonName} is already in your garden!`);
    }
  };
  
  const removeFromGarden = (scientificName: string) => {
    setMyGarden(prevGarden => prevGarden.filter(p => p.scientificName !== scientificName));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'identifier':
        return <PlantIdentifier addToGarden={addToGarden} />;
      case 'chatbot':
        return <ChatBot />;
      case 'garden':
        return <MyGarden myGarden={myGarden} removeFromGarden={removeFromGarden} />;
      default:
        return <PlantIdentifier addToGarden={addToGarden} />;
    }
  };

  return (
    <div className="min-h-screen text-gray-800 font-sans">
      <header className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-green-700 flex items-center">
            <div className="w-8 h-8 mr-2">
              <SproutIcon />
            </div>
            Sprout
          </h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-lg">
          <nav className="flex border-b border-white/50">
            <button
              onClick={() => setActiveTab('identifier')}
              className={`flex-1 py-4 px-6 text-center font-semibold flex items-center justify-center transition-colors duration-200 ${
                activeTab === 'identifier'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:bg-black/5'
              }`}
            >
              <LookupIcon/>
              <div className="w-5 h-5 mr-2"></div>
              Plant Lookup
            </button>
            <button
              onClick={() => setActiveTab('chatbot')}
              className={`flex-1 py-4 px-6 text-center font-semibold flex items-center justify-center transition-colors duration-200 ${
                activeTab === 'chatbot'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:bg-black/5'
              }`}
            >
              <MessageCircleIcon className="w-5 h-5 mr-2" />
              Greenroom Chat
            </button>
            <button
              onClick={() => setActiveTab('garden')}
              className={`flex-1 py-4 px-6 text-center font-semibold flex items-center justify-center transition-colors duration-200 ${
                activeTab === 'garden'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:bg-black/5'
              }`}
            >
              <BookOpenIcon className="w-5 h-5 mr-2" />
              My Plants Corner ({myGarden.length})
            </button>
          </nav>
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-gray-700/80 font-semibold text-sm">
        <p>Powered by Prathdotexe & Gemini API</p>
      </footer>
    </div>
  );
}