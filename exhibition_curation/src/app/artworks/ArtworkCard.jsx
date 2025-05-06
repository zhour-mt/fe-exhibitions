import Link from "next/link";

import { useState, useEffect } from "react";
import {
  deleteArtwork,
  saveArtwork,
  postGuestArtworks,
  deleteGuestArtwork,
} from "../../../api";

export default function ArtworkCard({
  artwork,
  setSavedArtworks,
  setGuestArtworks,
  artInstitute,
  likedArt = [],
}) {
  const isSavedView = !!artwork.artwork_id;
  const isInitiallyLiked = likedArt.includes(artwork.artwork_id || artwork.id) || isSavedView;


  let image_url = null;

  if (artwork.image_url && artwork.image_url.startsWith("http")) {
    image_url = artwork.image_url;
  } else if (artwork.image_id && artwork.image_id.startsWith("http")) {
    image_url = artwork.image_id;
  } else if (artwork.image_id) {
    image_url = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`;
  } else {
    image_url = null;
  }

  const [liked, setLiked] = useState(isInitiallyLiked);

  const [error, setError] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsGuest(!token);
  }, []);

  const artwork_id = artwork.artwork_id || artwork.id;

  const handleLikeClick = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!liked) {
      const artworkDetails = {
        artwork_id: artwork_id,
        title: artwork.title,
        artist: artwork.artist_title,
        image_id: artwork.image_id,
      };

      if (isGuest) {
        postGuestArtworks(artworkDetails)
          .then(() => setLiked(true))
          .catch((err) => setError(err));
      } else {
        saveArtwork({ ...artworkDetails, exhibition_id: null })
          .then(() => setLiked(true))
          .catch((err) => setError(err));
      }
    } else {
      if (isGuest) {
        deleteGuestArtwork(artwork_id)
          .then(() => {
            setLiked(false);
            if (setGuestArtworks) {
              setGuestArtworks((prev) => {
                return prev.filter(
                  (artwork) => (artwork.artwork_id || artwork.id) !== artwork_id
                );
              });
            }
          })
          .catch((err) => setError(err));
      } else {
        deleteArtwork(artwork_id)
          .then(() => {
            setLiked(false);
            if (setSavedArtworks) {
              setSavedArtworks((prev) => {
                return prev.filter(
                  (artwork) => (artwork.artwork_id || artwork.id) !== artwork_id
                );
              });
            }
          })
          .catch((err) => setError(err));
      }
    }
  };

  return (
    <Link
      href={`/artworks/${artInstitute}/${artwork.artwork_id || artwork.id}`}
      className="block h-full"
    >
      <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="bg-gray-100">
          {image_url ? (
            <img
              src={image_url}
              alt={artwork.title}
              className="w-full object-contain"
              style={{ aspectRatio: "4 / 3", height: "auto", display: "block" }}
            />
          ) : (
            <div className="w-full h-[200px] flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        <div className="p-4 flex-grow">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <h3 className="text-base font-semibold leading-tight line-clamp-2">
                {artwork.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {artwork.artist_title || "Unknown Artist"}
              </p>
            </div>

            <button
              onClick={handleLikeClick}
              className="text-gray-400 hover:text-red-500 transition duration-200 text-xl"
              title="Add to favourites"
            >
              {liked ? "🩷" : "🤍"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
