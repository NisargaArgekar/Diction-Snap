import React, { useState } from 'react'
import "./App.css"
import Nav from './components/Nav'
import { Search } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai'
import FadeLoader from "react-spinners/FadeLoader";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const App = () => {

  const [word, setWord] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const changeBgColor = () => {
    let inputBox = document.querySelector(".inputBox");
    inputBox.style.borderColor = "#9333ea";
  };

  const resetColor = () => {
    let inputBox = document.querySelector(".inputBox");
    inputBox.style.borderColor = "#374151";
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
    <>
      <Nav />
      <div className="search mt-5 px-[250px]">

        <div className="inputBox">
        <Search color='#8e6131' className='ml-3 cursor-pointer' />

          <input onKeyUp={(e)=>{
            if(e.key === "Enter"){
              getResult();
            }
          }} onChange={(e) => { setWord(e.target.value) }} value={word} type="text" onBlur={resetColor} onFocus={changeBgColor} placeholder='Search a word...' />
        </div>

      </div>

      <div className="resultContainer py-[20px] mt-5 min-h-[40vh] mx-[250px]" style={{ borderTop: "1px solid #8e6131", borderBottom: "1px solid #8e6131" }}>

        <Markdown remarkPlugins={[remarkGfm]}>{result}</Markdown>
        {loading && <FadeLoader color="#9333ea" className='mt-5' />}
      </div>

      <div className="footer flex items-center justify-center h-[80px] bg-[#1F2937]">
        <p className='text-white'>Made with ❤️ by <span className='text-purple-600 cursor-pointer'>Nisarga</span> all rights reserved.</p>
      </div>
    </>
  )
}

export default App