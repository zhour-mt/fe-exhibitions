import Link from "next/link";
import ExhibitionDeleter from "./ExhibitionDeleter";
import Image from "next/image";

export default function ExhibitionCard({
  exhibition,
  exhibitions,
  setExhibitions,
}) {
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="p-4 flex flex-col justify-between flex-grow">
        <Link
          href={`/exhibitions/${exhibition.id}`}
          className="p-1 flex flex-col justify-between flex-grow hover:cursor-pointer"
        >
          <div className="flex justify-center">
            <Image
              src="/exhibitions_image.png"
              alt="Icon representing exhibitions"
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />
          </div>

          <h3 className="text-base font-semibold leading-tight line-clamp-2">
            {exhibition.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {exhibition.description || "No description"}
          </p>
        </Link>
        <ExhibitionDeleter
          exhibition={exhibition}
          exhibitions={exhibitions}
          setExhibitions={setExhibitions}
        />
      </div>
    </div>
  );
}
