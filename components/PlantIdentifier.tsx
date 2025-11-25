import React, { useState } from 'react';
import { Plant } from '../types';
import { geminiService } from '../services/geminiService';
import { SunIcon, WaterDropIcon, SoilIcon, FertilizerIcon, ToxicityIcon, BugIcon } from './icons';

interface PlantIdentifierProps {
  addToGarden: (plant: Plant) => void;
}

const parsePlantInfo = (markdown: string, imageUrl: string, mimeType: string): Plant | null => {
  const commonNameMatch = markdown.match(/\*\*Common Name:\*\* (.*)/);
  const scientificNameMatch = markdown.match(/\*\*Scientific Name:\*\* (.*)/);
  const descriptionMatch = markdown.match(/\*\*Description:\*\* ([\s\S]*?)(?=\n- \*\*|\n$)/);
  const sunlightMatch = markdown.match(/\*\*Sunlight:\*\* (.*)/);
  const wateringMatch = markdown.match(/\*\*Watering:\*\* (.*)/);
  const soilMatch = markdown.match(/\*\*Soil:\*\* (.*)/);
  const fertilizerMatch = markdown.match(/\*\*Fertilizer:\*\* (.*)/);
  const toxicityMatch = markdown.match(/\*\*Toxicity:\*\* (.*)/);
  const pestsMatch = markdown.match(/\*\*Common Pests:\*\* (.*)/);

  if (!commonNameMatch?.[1] || !scientificNameMatch?.[1]) {
    return null;
  }
  
  const plant: Plant = {
    commonName: commonNameMatch[1].trim(),
    scientificName: scientificNameMatch[1].trim(),
    description: descriptionMatch ? descriptionMatch[1].trim() : 'No description provided.',
    careInstructions: {
      sunlight: sunlightMatch ? sunlightMatch[1].trim() : 'N/A',
      watering: wateringMatch ? wateringMatch[1].trim() : 'N/A',
      soil: soilMatch ? soilMatch[1].trim() : 'N/A',
      fertilizer: fertilizerMatch ? fertilizerMatch[1].trim() : 'N/A',
    },
    toxicity: toxicityMatch ? toxicityMatch[1].trim() : 'N/A',
    commonPests: pestsMatch ? pestsMatch[1].trim() : 'N/A',
    imageUrl,
    mimeType,
  };

  return plant;
}


export default function PlantIdentifier({ addToGarden }: PlantIdentifierProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<Plant | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Reset state for new image
      setIsLoading(true);
      setError(null);
      setAnalysisResult(null);
      setSelectedImage(null);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);

        // remove the data URL prefix e.g. "data:image/png;base64,"
        const base64Data = base64String.split(',')[1];
        
        try {
          const resultText = await geminiService.analyzePlantImage(base64Data, file.type);
          if (resultText.toLowerCase().includes("not a plant") || resultText.toLowerCase().includes("unidentifiable") || resultText.toLowerCase().includes("sorry")) {
            setError(resultText);
            setAnalysisResult(null);
          } else {
            const parsedPlant = parsePlantInfo(resultText, base64String, file.type);
            if (parsedPlant) {
              setAnalysisResult(parsedPlant);
            } else {
              setError("Could not identify the plant from the image. The response might be in an unexpected format.");
              setAnalysisResult(null);
            }
          }
        } catch (e) {
          setError("An error occurred during analysis. Please try again.");
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToGarden = () => {
    if (analysisResult) {
      addToGarden(analysisResult);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Identify a Plant</h2>
      <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50 hover:border-green-400 transition-colors animate-breathe">
        <p className="mb-4 text-gray-600">Upload a picture of a plant to identify it and get care instructions.</p>
        <input
          type="file"
          id="plant-upload"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isLoading}
        />
        <label
          htmlFor="plant-upload"
          className={`cursor-pointer bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Analyzing...' : 'Choose an Image'}
        </label>
      </div>

      {isLoading && (
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 rounded-full animate-pulse bg-green-600"></div>
              <div className="w-4 h-4 rounded-full animate-pulse bg-green-600" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-4 h-4 rounded-full animate-pulse bg-green-600" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="mt-2 text-gray-600">Identifying your plant, please wait...</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {analysisResult && selectedImage && !isLoading && (
        <div className="mt-8 bg-white/90 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={selectedImage} alt={analysisResult.commonName} className="rounded-lg w-full h-auto object-cover max-h-[450px]" />
                </div>
                <div className="flex flex-col">
                    <div>
                        <h3 className="text-3xl font-bold font-serif text-gray-900">{analysisResult.commonName}</h3>
                        <p className="text-md italic text-gray-600 mt-1 mb-6">{analysisResult.scientificName}</p>
                        <p className="text-gray-700 mb-6 leading-relaxed">{analysisResult.description}</p>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Care Instructions</h4>
                            <div className="space-y-4">
                                <div className="flex items-start"><SunIcon className="w-5 h-5 mr-3 text-yellow-500 shrink-0 mt-1" /> <div><strong>Sunlight:</strong> <span className="text-gray-600">{analysisResult.careInstructions.sunlight}</span></div></div>
                                <div className="flex items-start"><WaterDropIcon className="w-5 h-5 mr-3 text-blue-500 shrink-0 mt-1" /> <div><strong>Watering:</strong> <span className="text-gray-600">{analysisResult.careInstructions.watering}</span></div></div>
                                <div className="flex items-start"><SoilIcon className="w-5 h-5 mr-3 text-orange-700 shrink-0 mt-1" /> <div><strong>Soil:</strong> <span className="text-gray-600">{analysisResult.careInstructions.soil}</span></div></div>
                                <div className="flex items-start"><FertilizerIcon className="w-5 h-5 mr-3 text-green-500 shrink-0 mt-1" /> <div><strong>Fertilizer:</strong> <span className="text-gray-600">{analysisResult.careInstructions.fertilizer}</span></div></div>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Additional Details</h4>
                            <div className="space-y-4">
                                <div className="flex items-start"><ToxicityIcon className="w-5 h-5 mr-3 text-red-500 shrink-0 mt-1" /> <div><strong>Toxicity:</strong> <span className="text-gray-600">{analysisResult.toxicity}</span></div></div>
                                <div className="flex items-start"><BugIcon className="w-5 h-5 mr-3 text-gray-600 shrink-0 mt-1" /> <div><strong>Common Pests:</strong> <span className="text-gray-600">{analysisResult.commonPests}</span></div></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto pt-6">
                        <button
                            onClick={handleAddToGarden}
                            className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                            >
                            Add to My Garden
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}