"use client";

import Image from "next/image";
import { deleteExhibition } from "../../../api";
import { useState } from "react";

export default function ExhibitionDeleter({
  exhibition,
  exhibitions,
  setExhibitions,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = (event) => {
    let id = exhibition.id;
    event.currentTarget.disabled = true;
    setIsDeleting(true);
    deleteExhibition(id).then(() => {
      setExhibitions((prev) =>
        prev.filter((exhibition) => exhibition.id !== id)
      );
      setIsDeleting(true);
    });
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="p-1 rounded-full hover:bg-red-100 active:bg-red-200 transition duration-200 disabled:opacity-50"
        title="Delete exhibition"
      >
        🗑️
      </button>
    </>
  );
}
