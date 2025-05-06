"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeIcon() {
  const [homeDestination, setHomeDestination] = useState("/");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHomeDestination("/dashboard");
    }
  }, []);

  return (
    <Link href={homeDestination} className="inline-block">
      <Image
        src="/icons8-home.svg"
        alt="Home"
        width={45}
        height={45}
        className="hover:opacity-80 transition-opacity"
      />
    </Link>
  );
}
