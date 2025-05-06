"use client";

import { use } from "react";

import { fetchChicagoArtworkById, fetchHarvardArtworkById } from "../../../../../api";

import { useState, useEffect } from "react";

export default function ArtworkById({ params }) {
  const { id, artInstitute } = use(params);
  const [artwork, setArtwork] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetcher =
      artInstitute === "harvard" ? fetchHarvardArtworkById : fetchChicagoArtworkById; 

    fetcher(id)
      .then((data) => {
        setArtwork(data)})
      .catch((err) => setError(err));
  }, [id, artInstitute]);

  console.log(artwork)


  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-purple-800 text-center my-6">
          {artwork.title}
        </h1>
        <div className="w-full bg-gray-100">
          <img
            src={artwork.image_url}
            alt={artwork.title}
            className="w-full object-contain"
            style={{ aspectRatio: "4 / 3", height: "auto", display: "block" }}
          />
        </div>

        <div className="p-6">
          <p className="text-md text-gray-700">
            <span className="font-semibold text-purple-600">Artist:</span>{" "}
            {artwork.artist_title || "Unknown"}
          </p>
          <p className="text-md text-gray-700">
            <span className="font-semibold text-purple-600">Artist:</span>{" "}
            {artInstitute === "aic" ? "Art Institute of Chicago" : "Harvard Art Museums"}
          </p>

          <p className="text-md text-gray-700">
            <span className="font-semibold text-purple-600">
              Date of Display:
            </span>{" "}
            {artwork.date_display || "Unknown"}
          </p>
          <p className="text-md text-gray-700">
            <span className="font-semibold text-purple-600">
              Place of Origin:
            </span>{" "}
            {artwork.place_of_origin || "Unknown"}
          </p>

          <p className="text-md text-gray-700">
            <span className="font-semibold text-purple-600">Artwork Type:</span>{" "}
            {artwork.artwork_type_title || "Unknown"}
          </p>
          <p className="text-md text-gray-700">
            <span className="font-semibold text-purple-600">Medium:</span>{" "}
            {artwork.medium_display || "Unknown"}
          </p>
          <p className="text-md text-gray-700">
            <span className="font-semibold text-purple-600">Dimensions:</span>{" "}
            {artwork.dimensions || "Unknown"}
          </p>

          <p className="text-md text-gray-700">
            <span className="font-semibold text-purple-600">Department:</span>{" "}
            {artwork.department_title || "Unknown"}
          </p>

          {artwork.thumbnail?.alt_text && (
            <p className="text-gray-800 leading-relaxed">
              {artwork.thumbnail.alt_text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
