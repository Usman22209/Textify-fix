import React, { useContext, useState, useCallback, useRef } from "react";
import { Copy, Clipboard, Trash2, Download, Volume2, VolumeX } from 'lucide-react';
import { AppContext } from "../App";

export default function Input() {
  const { dark } = useContext(AppContext);
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [alert, setAlert] = useState("");
  const alertRef = useRef(null);

  const showAlert = useCallback((message) => {
    setAlert(message);
    if (alertRef.current) {
      alertRef.current.classList.remove("hidden");
      setTimeout(() => {
        alertRef.current.classList.add("hidden");
        setAlert("");
      }, 1500);
    }
  }, []);

  const textTransformations = {
    toUpper: () => {
      if (text.length > 0) {
        setText(text.toUpperCase());
        showAlert("Text Converted to UpperCase successfully!");
      }
    },
    toLower: () => {
      if (text.length > 0) {
        setText(text.toLowerCase());
        showAlert("Text Converted to LowerCase successfully!");
      }
    },
    removeExtraSpaces: () => {
      const cleanedString = text.replace(/\s+/g, " ").trim();
      setText(cleanedString);
      showAlert("All Extra spaces removed");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      showAlert("Text copied successfully!");
    });
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(prev => prev + clipboardText);
      showAlert("Text pasted successfully!");
    } catch (error) {
      console.error("Error pasting text:", error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `textify_download_${new Date().toISOString()}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    showAlert("Text downloaded Successfully");
  };

  const handleTextToSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
    } else {
      const msg = new SpeechSynthesisUtterance(text);
      msg.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(msg);
    }
    setIsPlaying(!isPlaying);
  };

  const resetText = () => {
    setText("");
    showAlert("Text reset successfully!");
  };

  return (
    <div className={`min-h-[calc(100vh-70px)]  mt-5 ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Alert Component */}
      <div 
        ref={alertRef} 
        className="hidden w-full absolute  z-10 bg-blue-600 text-center py-3"
      >
        <div className="flex justify-center items-center text-white">
          {alert}
        </div>
      </div>

      <div className={`sm:w-4/5 mx-auto p-6 ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Text Analyzer</h1>
          <div className="flex space-x-3">
            <Clipboard 
              onClick={handlePaste} 
              className="cursor-pointer hover:text-blue-500" 
            />
            <Copy 
              onClick={handleCopy} 
              className="cursor-pointer hover:text-blue-500" 
            />
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`
            w-full 
            p-3 
            rounded 
            border 
            ${dark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}
          `}
          rows="7"
          placeholder="Enter text to analyze"
        />

        <div className="mt-4 text-sm">
          Characters: {text.trim().length} | 
          Words: {text.trim() ? text.trim().split(/\s+/).length : 0} | 
          Read Time: {(text.trim().length / 300).toFixed(2)} mins
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <button 
            onClick={textTransformations.toUpper}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upper Case
          </button>
          <button 
            onClick={textTransformations.toLower}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Lower Case
          </button>
          <button 
            onClick={textTransformations.removeExtraSpaces}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Remove Spaces
          </button>
        </div>

        <div className="flex space-x-4 mt-4">
          <Trash2 
            onClick={resetText} 
            className="cursor-pointer hover:text-red-500" 
            title="Reset Text"
          />
          <Download 
            onClick={handleDownload} 
            className="cursor-pointer hover:text-green-500" 
            title="Download Text"
          />
          {isPlaying ? (
            <VolumeX 
              onClick={handleTextToSpeech} 
              className="cursor-pointer hover:text-red-500" 
              title="Stop Speech"
            />
          ) : (
            <Volume2 
              onClick={handleTextToSpeech} 
              className="cursor-pointer hover:text-blue-500" 
              title="Start Speech"
            />
          )}
        </div>

        {text && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Preview</h2>
            <div 
              className={`
                p-3 
                rounded 
                border 
                max-h-48 
                overflow-y-auto
                ${dark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}
              `}
            >
              {text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}