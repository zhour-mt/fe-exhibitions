export default function ArtworkCard({ artwork }) {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="bg-gray-100">
        {artwork.image_id ? (
          <img
            src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`}
            alt={artwork.title}
            className="w-full object-contain"
            style={{ aspectRatio: '4 / 3', height: 'auto', display: 'block' }}
          />
        ) : (
          <div className="w-full h-[200px] flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="text-base font-semibold leading-tight line-clamp-2">
          {artwork.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{artwork.artist_title || "Unknown Artist"}</p>
      </div>
    </div>
  );
}
