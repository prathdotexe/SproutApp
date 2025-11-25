import React, { useState } from 'react';
import { Plant } from '../types';
import { TrashIcon, SunIcon, WaterDropIcon, SoilIcon, FertilizerIcon, ToxicityIcon, ChevronDownIcon, BugIcon } from './icons';

interface MyGardenProps {
  myGarden: Plant[];
  removeFromGarden: (scientificName: string) => void;
}

const PlantCard = ({ plant, removeFromGarden }: { plant: Plant; removeFromGarden: (name: string) => void; }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const careItems = [
    { key: 'sunlight', label: 'Sunlight', icon: <SunIcon className="w-5 h-5 mr-3 text-yellow-500" />, content: plant.careInstructions.sunlight },
    { key: 'watering', label: 'Watering', icon: <WaterDropIcon className="w-5 h-5 mr-3 text-blue-500" />, content: plant.careInstructions.watering },
    { key: 'soil', label: 'Soil', icon: <SoilIcon className="w-5 h-5 mr-3 text-orange-700" />, content: plant.careInstructions.soil },
    { key: 'fertilizer', label: 'Fertilizer', icon: <FertilizerIcon className="w-5 h-5 mr-3 text-green-500" />, content: plant.careInstructions.fertilizer },
    { key: 'toxicity', label: 'Toxicity', icon: <ToxicityIcon className="w-5 h-5 mr-3 text-red-500" />, content: plant.toxicity },
    { key: 'pests', label: 'Common Pests', icon: <BugIcon className="w-5 h-5 mr-3 text-gray-600" />, content: plant.commonPests },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <img src={plant.imageUrl} alt={plant.commonName} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold font-serif text-gray-800">{plant.commonName}</h3>
        <p className="text-sm italic text-gray-600 mb-4">{plant.scientificName}</p>
        
        <div className="space-y-1">
            {careItems.map(item => (
                <div key={item.key} className="border-t border-gray-200 first:border-t-0">
                    <button onClick={() => toggleAccordion(item.key)} className="w-full flex justify-between items-center py-3 text-left font-semibold text-gray-700 hover:bg-gray-50 rounded-md">
                        <span className="flex items-center">
                            {item.icon}
                            {item.label}
                        </span>
                        <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openAccordion === item.key ? 'rotate-180' : ''}`} />
                    </button>
                    {openAccordion === item.key && (
                        <div className="pb-3 px-2 text-sm text-gray-600">
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
      <div className="p-4 bg-gray-50 border-t">
         <button
            onClick={() => removeFromGarden(plant.scientificName)}
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 flex items-center justify-center transition-colors"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Remove
          </button>
      </div>
    </div>
  );
};

export default function MyGarden({ myGarden, removeFromGarden }: MyGardenProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">My Garden</h2>
      {myGarden.length === 0 ? (
        <div className="text-center py-10 px-6 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Your garden is empty.</p>
          <p className="text-sm text-gray-500 mt-2">Use the Plant Identifier to add plants to your collection!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myGarden.map(plant => (
            <PlantCard key={plant.scientificName} plant={plant} removeFromGarden={removeFromGarden} />
          ))}
        </div>
      )}
    </div>
  );
}