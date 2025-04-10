

export default function ArtworkCard({ artwork }) {
  return (
    <div>
      <div className="article-details">
        <h2>{artwork.title}</h2>
        <img src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`} />
      </div>
    </div>
  );
}
