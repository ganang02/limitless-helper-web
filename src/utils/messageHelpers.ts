import { fetchProgrammingQuote, fetchWikipediaInfo, generateWebTemplate } from './apiServices';

export interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

export const generateAIResponse = async (userInput: string): Promise<string> => {
  const lowercaseInput = userInput.toLowerCase();

  // Cek jika user meminta untuk membuat website
  if (lowercaseInput.includes('buat website') || lowercaseInput.includes('bikin web')) {
    return generateWebTemplate('landing page');
  }

  // Cek jika user meminta quote programming
  if (lowercaseInput.includes('quote') || lowercaseInput.includes('kutipan')) {
    const quoteResponse = await fetchProgrammingQuote();
    return quoteResponse.data;
  }

  // Cek jika user meminta informasi
  if (lowercaseInput.includes('apa itu') || lowercaseInput.includes('jelaskan')) {
    const query = userInput.replace(/apa itu|jelaskan/gi, '').trim();
    const wikiResponse = await fetchWikipediaInfo(query);
    return wikiResponse.data;
  }

  // Default response
  return `Halo! Saya dapat membantu Anda dengan:
1. Membuat template website (ketik "buat website")
2. Memberikan quote programming (ketik "quote")
3. Mencari informasi (ketik "apa itu [kata kunci]")

Apa yang ingin Anda ketahui?`;
};