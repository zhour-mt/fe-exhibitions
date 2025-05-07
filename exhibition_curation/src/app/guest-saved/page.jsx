"use client";

import { useEffect, useState } from "react";
import { fetchGuestArtworks} from "../../../api";
import ArtworkCard from "../artworks/ArtworkCard";
import Link from "next/link";

export default function GuestSavedArtworksList() {
  const [guestArtworks, setGuestArtworks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGuestArtworks()
      .then((response) => {
        setGuestArtworks(response);
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

        {error ? (
          <p className="text-red-500 text-sm">Failed to load artworks.</p>
        ) : guestArtworks.length === 0 ? (
          <p className="text-gray-500 italic">No saved artworks yet.</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {guestArtworks.map((artwork) => (
              <ArtworkCard artwork={artwork} setGuestArtworks={setGuestArtworks} key={artwork.id} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

