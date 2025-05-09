"use client";

import { useState, useEffect } from "react";
import { fetchExhibitionById } from "../../../../api";
import { useParams, useSearchParams } from "next/navigation";
import ArtworkCard from "@/app/artworks/ArtworkCard";

export default function ExhibitionById() {
  const { id } = useParams();

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const [exhibitionArtworks, setExhibitionArtworks] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExhibitionById(id)
      .then((response) => {
        setExhibitionArtworks(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-purple-700 mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">{description || "No description"}</p>
        {isLoading ? (
          <div className="text-center text-purple-700 py-10">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-10">
            Failed to load exhibition.
          </div>
        ) : !exhibitionArtworks || exhibitionArtworks.length === 0 ? (
          <div className="text-center text-gray-700 py-10">
            You haven't added any artworks to the exhibition yet.
          </div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {exhibitionArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                showSaveControls={false}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
