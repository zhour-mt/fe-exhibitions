"use client";

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
  console.log(userData)

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    return postUser(userData)
      .then(() => {
        setWelcome(`Welcome to ArtArchive, ${userData.username}`);
        console.log("hi")
        setIsLoading(false);
        setError(null)
      })
      .catch((err) => {
        setError("Something went wrong. Please try again.");
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your details </label>
      <input
        type="text"
        id="username"
        onChange={handleChange}
        value={userData.username}
        required
      ></input>
      <input
        type="email"
        id="email"
        onChange={handleChange}
        value={userData.email}
        required
      ></input>
      <input
        type="password"
        id="password"
        onChange={handleChange}
        value={userData.password}
        required
      ></input>
      <button type="submit" disabled={isLoading}>
        Submit details
      </button>
      {welcome && <p>{welcome}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading && <p>Loading...</p>}
    </form>
  );
}
