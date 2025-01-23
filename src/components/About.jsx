import React, { useContext } from "react";
import { AppContext } from "../App"; 
import { CheckCircle } from 'lucide-react'; 

const About = () => {
  const { dark } = useContext(AppContext);

  const features = [
    "Fast text extraction",
    "Text editing and formatting",
    "Multiple export options",
    "Batch processing",
    "Secure data handling",
    "User-friendly interface",
    "Text downloading",
    "Text voice-over"
  ];

  return (
    <div
      id="about"
      className={`
        p-6 pt-8 min-h-[calc(100vh-70px)] 
        ${dark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}
        transition-colors duration-300
      `}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 border-b pb-2">About Textify</h2>
        
        <p className="mb-4 leading-relaxed">
          Textify is more than just a tool; it's a comprehensive text management solution designed for professionals, students, and anyone seeking to streamline their text-related workflows.
        </p>
        
        <p className="mb-4 leading-relaxed">
          Our app serves as a personal text wizard, capable of transforming how you interact with text across various contexts. From digital notes to printed materials, Textify ensures precise text capture and conversion.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-4">Key Features:</h3>
        
        <ul className="grid md:grid-cols-2 gap-2 mb-6">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className="flex items-center space-x-2 text-md"
            >
              <CheckCircle 
                className={`h-5 w-5 ${dark ? 'text-blue-400' : 'text-blue-600'}`} 
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <p className="mb-4 leading-relaxed">
          Whether you're organizing documents, extracting contact information, or revolutionizing your note-taking process, Textify offers a powerful, intuitive solution for all your text management needs.
        </p>
        
        <p className="font-semibold text-lg mt-6">
          Unlock the potential of text recognition with Textify – Your ultimate text transformation tool!
        </p>
      </div>
    </div>
  );
};

export default About;