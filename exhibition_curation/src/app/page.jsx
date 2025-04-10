import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to ArtArchive!</h1>

      <Link href="/artworks">
        <button>Go to Artworks</button>
      </Link>
    </main>
  );
}
