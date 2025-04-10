"use client";

import { useState, useEffect } from "react";
import { fetchArticles } from "../../../api";
import ArtworkCard from "./ArtworkCard";

export default function Artworks() {
  const [artworks, setArtworks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);


  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles()
      .then((artworkData) => {
        setArtworks(artworkData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <ul>
        {artworks.map((artwork) => (
          <li key={artwork.id} className="artwork-card">
            {console.log(artwork)}
            <ArtworkCard artwork={artwork} key={artwork.id} />
          </li>
        ))}
      </ul>
    </>
  );
}
