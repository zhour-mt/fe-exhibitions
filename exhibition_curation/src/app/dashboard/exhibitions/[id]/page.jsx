

"use client";

import { use } from "react";


import { useState, useEffect } from "react";
import { fetchExhibitionById } from "../../../../../api";

export default function ExhibitionById({ params }) {
  const { id } = use(params);
  const [exhibition, setExhibition] = useState([]);

  useEffect(() => {
    fetchExhibitionById(id)
      .then((response) => {
        setExhibition(response.data);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return 
}
