"use client";

import Link from "next/link";

import { useState } from "react";
import { loginUser } from "../../../api";
import { useRouter } from "next/navigation";

export default function Login() {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const [welcome, setWelcome] = useState("");

  const handleChange = (event) => {
    const type = event.target.id;
    const input = event.target.value;
    setUserLogin({ ...userLogin, [type]: input });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    return loginUser(userLogin)
      .then((response) => {
        console.log(response.token);
        const token = response.token;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
        }

        setWelcome(`Welcome back to CurationStudio, ${userLogin.username}`);
        setIsLoading(false);
        setError(null);
        router.push("/dashboard")
      })
      .catch((err) => {
        setError("Something went wrong. Please try again.");
        console.log(err)
        setIsLoading(false);
      });
  };

  return (
    <div>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="username"
              type="text"
              onChange={handleChange}
              value={userLogin.username}
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="password"
              type="password"
              onChange={handleChange}
              value={userLogin.password}
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={isLoading}
            >
              {" "}
              Sign In
            </button>
          </div>
        </div>
        <div className="text-center">
          <p className="mb-2 text-gray-600">New to CurationStudio?</p>
          <Link href="/register">
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded"
            >
              Register
            </button>
          </Link>
        </div>
      </form>
      <div>
        {welcome && <p>{welcome}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
}
