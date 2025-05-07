"use client";

import { useState, useEffect } from "react";
import {
  fetchChicagoArtworks,
  fetchGuestArtworks,
  fetchHarvardArtworks,
  fetchSavedArtworks,
} from "../../../api";
import Link from "next/link";
import ArtworkCard from "./ArtworkCard";

export default function Artworks() {
  const [artworks, setArtworks] = useState([]);

  const [likedArt, setLikedArt] = useState([]);

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
      fetchSavedArtworks().then((data) => {
        const ids = data.map((art) => art.artwork_id);
        setLikedArt(ids);
      });
    } else {
      const guestSessionId = localStorage.getItem("guest_session_id");
      if (guestSessionId) {
        fetchGuestArtworks().then((data) => {
          const ids = data.map((art) => art.artwork_id);
          setLikedArt(ids);
        });
      }
    }

    const fetcher =
      artInstitute === "aic" ? fetchChicagoArtworks : fetchHarvardArtworks;

    fetcher({ page, limit: 20, searchTerm, filter })
      .then(({ artworks, pagination }) => {
        setArtworks(artworks);
        setPagination(pagination);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [page, searchTerm, filter, artInstitute]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const processedArtworks = artworks
    .filter((art) => {
      const title = art.title?.toLowerCase() || "";
      const artist = art.artist_title?.toLowerCase() || "";
      const matchesSearch =
        title.includes(searchTerm) || artist.includes(searchTerm);
      const matchesFilter = filter ? art.artwork_type_title === filter : true;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      if (sort === "title-desc") return b.title.localeCompare(a.title);
      if (sort === "date-asc") return (a.date_start || 0) - (b.date_start || 0);
      if (sort === "date-desc")
        return (b.date_start || 0) - (a.date_start || 0);
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
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded w-full sm:w-1/2"
          >
            <option value="">All Types</option>
            <option value="Painting">Painting</option>
            <option value="Architectural Drawing">Architectural Drawing</option>
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

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
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
        ) : processedArtworks.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No artworks found.</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {processedArtworks.map((artwork) => (
              <ArtworkCard
                artwork={artwork}
                key={artwork.id}
                likedArt={likedArt}
                artInstitute={artInstitute}
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
