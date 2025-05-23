import React, { useState } from 'react';
import "./App.css";
import Nav from './components/Nav';
import { Search } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import FadeLoader from "react-spinners/FadeLoader";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const App = () => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputBorderColor, setInputBorderColor] = useState('#374151');

  const changeBgColor = () => {
    setInputBorderColor("#1d4f8b");
  };

  const resetColor = () => {
    setInputBorderColor("#374151");
  };

  const AI = new GoogleGenerativeAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY });

  async function getResult() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Considered you are a dictionary AI. We will give you a word and you need to give all the dictionary details in good form including examples, meanings, definitions, synonyms, phonetics, etc. The word is "${word}".`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setResult(reply || "No response received.");
    } catch (err) {
      console.error("Error:", err);
      setResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
  
      <div className="flex-grow">
       <div className="search mt-5 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
          <div className="inputBox flex items-center border rounded-lg" style={{ borderColor: inputBorderColor }}>
            <Search  className='ml-3 cursor-pointer text-blue-800 px-0.5 text-lg md:text-xl' />
            <input 
              onKeyUp={(e) => { if(e.key === "Enter"){ getResult(); } }} 
              onChange={(e) => setWord(e.target.value)} 
              value={word} 
              type="text" 
              onBlur={resetColor} 
              onFocus={changeBgColor} 
              placeholder='Search a word...' 
              className="w-full text-xl bg-transparent text-black focus:outline-none"
            />
          </div>
        </div>
  
       
        <div className="resultContainer py-5 mt-5 min-h-[40vh] mx-4  sm:mx-8 md:mx-12 lg:mx-24 xl:mx-32" style={{ borderTop: "1px solid #1e40af" }}>
          <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
          {loading && <FadeLoader color="#9333ea" className='mt-5' />}
        </div>
      </div>
  
      
      <footer className="mt-auto w-full bg-[#1d4f8b] h-[80px] flex items-center justify-center">
        <p className="text-white">
          Made with ❤️ by <span className="text-fuchsia-400 cursor-pointer">Nisarga</span> all rights reserved.
        </p>
      </footer>
    </div>
  );
  
}

export default App;
