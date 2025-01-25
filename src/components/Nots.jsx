import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Edit2 } from 'lucide-react';
import { AppContext } from "../App";

function NotesScreen() {
  const { dark, setSelectedNote } = useContext(AppContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch notes');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    navigate('/');
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        {error}
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-6">My Notes</h1>
      
      {notes.length === 0 ? (
        <div className="text-center text-gray-500">No notes found</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map(note => (
            <div 
              key={note._id} 
              className={`
                p-4 
                rounded-lg 
                shadow-md 
                relative 
                ${dark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'}
              `}
            >
              <p className="mb-4 pr-12">{note.content}</p>
              <div className="absolute bottom-2 right-2 flex space-x-2">
                <Trash2 
                  onClick={() => handleDelete(note._id)}
                  className="text-red-500 cursor-pointer hover:text-red-700"
                />
                <Edit2 
                  onClick={() => handleEdit(note)}
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                />
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Created: {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesScreen;