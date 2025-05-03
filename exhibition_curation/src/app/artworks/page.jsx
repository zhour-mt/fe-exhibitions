"use client";

import { useState, useEffect } from "react";
import { fetchArtworks } from "../../../api";
import Link from "next/link";
import ArtworkCard from "./ArtworkCard";

export default function Artworks() {
  const [artworks, setArtworks] = useState([]);

  const [filteredArtworks, setFilteredArtworks] = useState([]);

  const [filter, setFilter] = useState("");

  const [sort, setSort] = useState("title-asc");

  const [searchTerm, setSearchTerm] = useState("");

  const [pagination, setPagination] = useState(null);

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArtworks(page)
      .then(({ artworks, pagination }) => {
        setArtworks(artworks);
        setPagination(pagination);

        setFilteredArtworks(artworks);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [page]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = artworks.filter((art) => {
      const title = art.title?.toLowerCase() || "";
      const artist = art.artist?.toLowerCase() || "";
      return title.includes(term) || artist.includes(term);
    });

    setFilteredArtworks(filtered);
  };

  const processedArtworks = artworks
    .filter((art) => (filter ? art.artwork_type_title === filter : true))
    .sort((a, b) => {
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      if (sort === "title-desc") return b.title.localeCompare(a.title);
      if (sort === "date-asc") return (a.date_start || 0) - (b.date_start || 0);
      if (sort === "date-desc")
        return (b.date_start || 0) - (a.date_start || 0);
      return 0;
    });

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 px-6 py-5">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Browse artworks...
        </h2>
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by title or artist..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
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
            <option value="Costume and Accessories">Costume and Accessories</option>
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

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {processedArtworks.map((artwork) => (
            <Link href={`/artworks/${artwork.id}`} className="w-full">
              <ArtworkCard artwork={artwork} />
            </Link>
          ))}
        </ul>

        {filteredArtworks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No artworks found.</p>
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
