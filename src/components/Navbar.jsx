import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun, NotebookText } from 'lucide-react';
import { AppContext } from "../App";

export default function Navbar() {
  const { dark, toggleTheme, selectedPage, setSelectedPage } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', key: 'home' },
    { label: 'Notes', path: '/notes', key: 'notes' },
    { label: 'About', path: '/about', key: 'about' },
    { label: 'Contact', path: '/contact', key: 'contact' }
  ];

  const toggleMenu = () => setOpen(!open);

  return (
    <nav 
      className={`
        h-[70px] 
        flex 
        w-full 
        items-center 
        justify-between 
        px-[5%] 
        ${dark ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"}
        transition-colors
        duration-300
        relative
        z-50
      `}
    >
      <Link 
        to="/" 
        className="text-2xl font-bold hover:text-blue-500 transition-colors"
      >
        Textify
      </Link>

      <button 
        className="sm:hidden z-20" 
        onClick={toggleMenu}
      >
        {open ? <X /> : <Menu />}
      </button>

      <ul 
        className={`
          flex 
          items-center 
     ${open 
      ? `fixed inset-0 flex-col justify-center ${dark ? 'bg-gray-900' : 'bg-white'}` 
      : `hidden`
    } 
          sm:flex 
          sm:flex-row 
          sm:relative 
          sm:bg-transparent 
          space-y-4 
          sm:space-y-0 
          sm:space-x-4
        `}
      >
        {navItems.map(({ label, path, key }) => (
          <li key={key}>
            <Link 
              to={path} 
              onClick={() => {
                setSelectedPage(key);
                setOpen(false);
              }}
              className={`
                ${selectedPage === key ? 'text-blue-500' : ''}
                hover:text-blue-400 
                transition-colors
                flex
                items-center
              `}
            >
              {key === 'notes' && <NotebookText className="mr-2" />}
              {label}
            </Link>
          </li>
        ))}

        <li 
          className="flex items-center cursor-pointer"
          onClick={() => {
            toggleTheme();
            setOpen(false);
          }}
        >
          {dark ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
          <span>{dark ? 'Light' : 'Dark'} Mode</span>
        </li>
      </ul>
    </nav>
  );
}