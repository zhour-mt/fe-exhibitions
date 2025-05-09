"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserIcon() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setShowLogout(false);
    router.push("/");
  };

  const handleClick = () => {
    if (isLoggedIn) {
      setShowLogout((prev) => !prev);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="relative inline-block">
      <button onClick={handleClick}>
        <Image
          src="/user.svg"
          alt="User"
          width={45}
          height={45}
          className="hover:opacity-80 transition-opacity"
        />
      </button>

      {isLoggedIn && showLogout && (
        <div className="absolute right-0 mt-2">
          <button
            onClick={handleLogout}
            className="text-sm font-semibold bg-white text-gray-700 hover:text-gray-900 py-2 px-2 rounded shadow"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
