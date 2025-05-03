"use client";

import ProtectedRoute from '../components/ProtectedRoute';

export default function Dashboard() {
    
  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome to your Dashboard</h1>
        {/* Add your dashboard content here */}
      </div>
    </ProtectedRoute>
  );
}
