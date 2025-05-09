"use client";

import { useState, useEffect } from "react";
import {
  fetchChicagoArtworks,
  fetchGuestArtworks,
  fetchHarvardArtworks,
  fetchSavedArtworks,
  fetchExhibitions,
} from "../../../api";
import Link from "next/link";
import ArtworkCard from "./ArtworkCard";

export default function Artworks() {
  const [artworks, setArtworks] = useState([]);

  const [likedArt, setLikedArt] = useState([]);

  const [exhibitions, setExhibitions] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [artInstitute, setArtInstitute] = useState("aic");

  const [filter, setFilter] = useState("");

  const [sort, setSort] = useState("title-asc");

  const [searchTerm, setSearchTerm] = useState("");

  const [pagination, setPagination] = useState(null);

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchSavedArtworks().then((response) => {
        const artIds = response.map((art) => art.artwork_id);
        setLikedArt(artIds);
      });
      fetchExhibitions()
        .then((response) => {
          setExhibitions(response);
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      const guestSessionId = localStorage.getItem("guest_session_id");
      if (guestSessionId) {
        fetchGuestArtworks().then((response) => {
          const artIds = response.map((art) => art.artwork_id);
          setLikedArt(artIds);
        });
      }
    }

    const fetcher =
      artInstitute === "aic" ? fetchChicagoArtworks : fetchHarvardArtworks;

    fetcher({ page, limit: 20, searchTerm })
      .then(({ artworks, pagination }) => {
        setArtworks(artworks);
        setPagination(pagination);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [page, searchTerm, artInstitute]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const filteredArtworks = artworks
    .filter((art) => {
      const title = (art.title || "").toLowerCase();
      const artist = (art.artist_title || art.artist || "").toLowerCase();
      const type = art.artwork_type_title || art.classification || "";

      const artworkMatchingSearch = title.includes(searchTerm) || artist.includes(searchTerm);

      const artworkMatchingFilter = filter ? type === filter : true;

      return artworkMatchingSearch && artworkMatchingFilter;
    })
    .sort((a, b) => {
      const titleA = a.title || "";
      const titleB = b.title || "";
      const dateA = a.date_start || a.begin_date || 0;
      const dateB = b.date_start || b.begin_date || 0;

      if (sort === "title-asc") return titleA.localeCompare(titleB);
      if (sort === "title-desc") return titleB.localeCompare(titleA);
      if (sort === "date-asc") return dateA - dateB;
      if (sort === "date-desc") return dateB - dateA;
      return 0;
    });

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 px-6 py-1">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
          <h2 className="text-2xl font-bold text-purple-700 tracking-wide text-center sm:text-left">
            Browse artworks...
          </h2>
          <Link href={isLoggedIn ? "/dashboard" : "/guest-saved"}>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition">
              View Saved Artworks
            </button>
          </Link>
        </div>
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by title or artist..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={artInstitute}
            onChange={(event) => setArtInstitute(event.target.value)}
            className="px-4 py-2 border rounded w-full sm:w-1/2"
          >
            <option value="aic">Art Institute of Chicago</option>
            <option value="harvard">Harvard Art Museums</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
          {artInstitute === "aic" ? (
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="px-4 py-2 border rounded w-full sm:w-1/2"
            >
              <option value="">Art Types</option>
              <option value="Painting">Painting</option>
              <option value="Architectural Drawing">
                Architectural Drawing
              </option>
              <option value="Basketry">Basketry</option>
              <option value="Print">Print</option>
              <option value="Textile">Textile</option>
              <option value="Sculpture">Sculpture</option>
              <option value="Vessel">Vessel</option>
              <option value="Furniture">Furniture</option>
              <option value="Costume and Accessories">
                Costume and Accessories
              </option>
              <option value="Metalwork">Metalwork</option>
              <option value="Photograph">Photograph</option>
              <option value="Drawing and Watercolor">
                Drawing and Watercolor
              </option>
            </select>
          ) : (
            <p className="text-gray-500 italic self-center">
              Filtering by type unavailable for Harvard Art Museums.
            </p>
          )}

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="px-4 py-2 border rounded w-full sm:w-1/2"
          >
            <option value="title-asc">Title (A–Z)</option>
            <option value="title-desc">Title (Z–A)</option>
            <option value="date-asc">Date (Oldest first)</option>
            <option value="date-desc">Date (Newest first)</option>
          </select>
        </div>

        {isLoading ? (
          <p className="text-center text-purple-600 text-lg py-10">
            Loading artworks...
          </p>
        ) : filteredArtworks.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No artworks found.</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredArtworks.map((artwork) => (
              <ArtworkCard
                artwork={artwork}
                key={artwork.id}
                likedArt={likedArt}
                artInstitute={artInstitute}
                exhibitions={exhibitions}
              />
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center">Page {page}</span>
        <button
          onClick={() =>
            setPage((p) =>
              pagination && p < pagination.total_pages ? p + 1 : p
            )
          }
          disabled={pagination && page >= pagination.total_pages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
