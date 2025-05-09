"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { fetchExhibitions } from "../../../api";
import ExhibitionCard from "./ExhibitionCard";
import CreateExhibitionModal from "./CreateExhibitionModal";
import Link from "next/link";
import SavedArtworks from "../saved/SavedArtworks";
import LogoutButton from "./LogoutButton";

export default function Dashboard() {
  const [exhibitions, setExhibitions] = useState([]);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  
  
  useEffect(() => {
      const storedName = localStorage.getItem("username");
      if (storedName) setUsername(storedName);
    }, []);
    
    

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleExhibitionCreated = (newExhibition) => {
    setExhibitions((prev) => [...prev, newExhibition]);
    closeModal();
  };

  const handleCreateExhibition = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchExhibitions()
      .then((response) => {
        setExhibitions(response);
      })
      .catch((err) => {
        setError(err);
      });
  }, [exhibitions.length]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex justify-center px-6 py-10">
        <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-6xl w-full">
          <div className="flex justify-between items-center mb-1">
            <h1 className="text-3xl font-bold text-purple-700">
              {username}'s Curation Studio
            </h1>
            <LogoutButton />
          </div>
          <section>
            <Link href="/artworks" className="w-full">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 my-5 mb-7 rounded-lg transition-all">
                Explore Artworks →
              </button>
            </Link>
          </section>
          <div>
            <SavedArtworks />
          </div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-purple-700 tracking-wide">
              Your Exhibitions
            </h2>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200"
              onClick={handleCreateExhibition}
            >
              + Create New Exhibition
            </button>
            {isModalOpen && (
              <CreateExhibitionModal
                exhibitions={exhibitions}
                setExhibitions={setExhibitions}
                onClose={closeModal}
                onCreate={handleExhibitionCreated}
              />
            )}
          </div>

          {exhibitions.length > 0 ? (
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {exhibitions.map((exhibition) => (
                <ExhibitionCard
                  key={exhibition.id}
                  exhibition={exhibition}
                  exhibitions={exhibitions}
                  setExhibitions={setExhibitions}
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 justify-left mb-4">
              You haven’t added any exhibitions yet.
            </p>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
