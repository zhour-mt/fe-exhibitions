import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  deleteArtwork,
  saveArtwork,
  postGuestArtworks,
  deleteGuestArtwork,
  saveArtworkToExhibition,
} from "../../../api";

export default function ArtworkCard({
  artwork,
  setSavedArtworks,
  setGuestArtworks,
  artInstitute,
  exhibitions,
  likedArt = [],
  showSaveControls = true,
}) {

  const router = useRouter();
  const isSavedView = !!artwork.artwork_id;
  const isInitiallyLiked =
    likedArt.includes(artwork.artwork_id || artwork.id) || isSavedView;

  const [selectedExhibition, setSelectedExhibition] = useState("");
  const [exhibitionMessage, setExhibitionMessage] = useState("");

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

  const handleCardClick = (event) => {
    router.push(
      `/artworks/${artInstitute}/${artwork.artwork_id || artwork.id}`
    );
  };

  const handleSaveToExhibition = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token || !selectedExhibition) return;

    const artworkToSave = {
      artwork_id: artwork_id,
      title: artwork.title,
      artist: artwork.artist_title,
      image_id: artwork.image_id,
      image_url: image_url,
    };

    saveArtworkToExhibition(selectedExhibition, artworkToSave, token)
      .then(() => setExhibitionMessage("Artwork saved to exhibition!"))
      .catch(() => setExhibitionMessage("Failed to save."));
  };

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="bg-gray-100" onClick={handleCardClick}>
        {image_url ? (
          <img
            src={image_url}
            alt={artwork.title}
            className="w-full object-contain"
            style={{ aspectRatio: "4 / 3", height: "auto", display: "block" }}
          />
        ) : (
          <div className="w-full h-[200px] flex items-center justify-center text-gray-400 text-sm">
            No Image Available
          </div>
        )}
      </div>

      <div className="p-4 flex-grow">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col">
            <h3
              className="text-base font-semibold leading-tight line-clamp-2"
              onClick={handleCardClick}
            >
              {artwork.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1" onClick={handleCardClick}>
              {artwork.artist_title || artwork.artist || "Unknown Artist"}
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
        {!isGuest && showSaveControls && (
          <div>
            <div className="mt-4 space-y-2">
              <select
                value={selectedExhibition}
                onChange={(e) => setSelectedExhibition(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Select exhibition</option>
                {exhibitions?.map((exhibition) => (
                  <option key={exhibition.id} value={exhibition.id}>
                    {exhibition.title}
                  </option>
                ))}
              </select>

              <button
                onClick={handleSaveToExhibition}
                disabled={!selectedExhibition}
                className="w-full bg-purple-600 text-white text-sm px-3 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                Save to Exhibition
              </button>

              {exhibitionMessage && (
                <p className="text-xs text-green-600">{exhibitionMessage}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
