"use client";

import { useEffect, useState } from "react";
import { fetchSavedArtworks } from "../../../api";
import ArtworkCard from "../artworks/ArtworkCard";
import Link from "next/link";

export default function SavedArtworksList() {
  const [savedArtworks, setSavedArtworks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchSavedArtworks()
      .then((response) => {
        setSavedArtworks(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-6 py-10 flex justify-center">
      <div className="w-full max-w-6xl bg-white p-4 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
          <h2 className="text-2xl font-bold text-purple-700 tracking-wide text-center sm:text-left">
            Your Saved Artworks
          </h2>
          <Link href="/artworks">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition">
              Browse artworks →
            </button>
          </Link>
        </div>

        {isLoading ? (
          <p className="text-purple-600 font-medium py-6">
            Loading saved artworks...
          </p>
        ) : error ? (
          <p className="text-red-500 text-sm">Failed to load artworks.</p>
        ) : savedArtworks.length === 0 ? (
          <p className="text-gray-500 italic">No saved artworks yet.</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {savedArtworks.map((artwork) => (
              <ArtworkCard
                artwork={artwork}
                setSavedArtworks={setSavedArtworks}
                key={artwork.id}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
