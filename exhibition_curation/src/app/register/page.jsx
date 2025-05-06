"use client";

import Link from "next/link";

import { useState } from "react";
import { postUser } from "../../../api";

export default function RegisterPage() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });


  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const [welcome, setWelcome] = useState("");

  const handleChange = (event) => {
    const type = event.target.id;
    const input = event.target.value;
    setUserData({ ...userData, [type]: input });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    return postUser(userData)
      .then(() => {
        setWelcome(`Welcome to ArtArchive, ${userData.username}`);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.log(err)
        setError(err.response.data.message);
        setIsLoading(false);
      });
  };


  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center px-4">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-purple-700 mb-6 text-center">
        Join CurationStudio
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={userData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-sm text-center">{error}</p>}

      <div className="text-center mt-6">
        <p className="text-gray-600 mb-2">Already have an account?</p>
        <Link href="/login">
          <button className="bg-gray-100 hover:bg-gray-200 text-black font-medium py-2 px-4 rounded-lg transition">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  </main>
  );
}
