export interface Plant {
  commonName: string;
  scientificName: string;
  description: string;
  careInstructions: {
    sunlight: string;
    watering: string;
    soil: string;
    fertilizer: string;
  };
  toxicity: string;
  commonPests: string;
  imageUrl: string; // The base64 string of the uploaded image
  mimeType: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  isLoading?: boolean;
}