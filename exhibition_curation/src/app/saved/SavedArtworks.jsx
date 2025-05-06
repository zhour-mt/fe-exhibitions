"use client";

import { useState, useEffect } from "react";
import { fetchSavedArtworks } from "../../../api";
import Link from "next/link";

export default function SavedArtworks() {
  const [savedArtworks, setSavedArtworks] = useState([]);
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSavedArtworks()
      .then((response) => {
        setSavedArtworks(response);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const savedCount = savedArtworks.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-purple-700 tracking-wide">
          Saved Artworks
        </h2>
        <Link
          href="/saved"
          className="bg-purple-600 hover:bg-purple-700 justify-right text-white font-semibold py-2 px-4 rounded shadow transition duration-200"
        >
          View Saved Artworks →
        </Link>
      </div>
      <p className="text-gray-700 justify-left mb-4">
        You have saved <span className="font-semibold">{savedCount}</span>{" "}
        {savedCount === 1 ? "artwork" : "artworks"} to your collection.
      </p>
    </div>
  );
}
