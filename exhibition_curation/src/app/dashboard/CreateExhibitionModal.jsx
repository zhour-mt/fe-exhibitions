"use client";

import { useState } from "react";
import { postExhibition } from "../../../api";

export default function CreateExhibitionModal({
  onClose,
  onCreate,
  setExhibitions,
  exhibitions,
}) {
  const [exhibitionData, setExhibitionData] = useState({
    title: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    const type = event.target.id;
    const input = event.target.value;
    setExhibitionData({ ...exhibitionData, [type]: input });
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    return postExhibition(exhibitionData)
      .then((response) => {
        setExhibitions([...exhibitions, response]);
        onCreate(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-purple-700">
          Create New Exhibition
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Exhibition Title"
            id="title"
            value={exhibitionData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            placeholder="Description"
            id="description"
            type="text"
            value={exhibitionData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
