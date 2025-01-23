import React, { useState, lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export const AppContext = React.createContext();

const Navbar = lazy(() => import("./components/Navbar"));
const Input = lazy(() => import("./components/Input"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  const [dark, setDark] = useState(false);
  const [selectedPage, setSelectedPage] = useState("home");

  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <AppContext.Provider
      value={{
        dark,
        toggleTheme,
        selectedPage,
        setSelectedPage,
      }}
    >
      <Router>
        <div
          className={`
            min-h-screen 
            transition-colors 
            duration-300 
            ${dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}
          `}
        >
          <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {dark ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-blue-600" />
            )}
          </button>

          <Suspense
            fallback={<div className="text-center py-10">Loading...</div>}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Input />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
