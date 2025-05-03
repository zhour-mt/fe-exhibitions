"use client";

import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if no token is found
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
}
