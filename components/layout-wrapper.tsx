"use client";

import { useEffect, useState, useCallback } from "react";

// 404 Component for small screens
const SmallScreenError = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8 max-w-md">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Screen Too Small</h1>
      <p className="text-gray-700 mb-6">
        This application requires a screen width of at least 1024 pixels.
        Please use a larger device or rotate your screen to landscape mode.
      </p>
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        <p>Minimum required: 1024px width</p>
        <p className="text-sm mt-2">Current screen size is too small for optimal experience</p>
      </div>
    </div>
  </div>
);

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  const checkScreenSize = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true; // Default to true on server
  }, []);

  useEffect(() => {
    // Add resize listener
    const handleResize = () => {
      setIsLargeScreen(checkScreenSize());
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkScreenSize]);

  // Render 404 component if screen is too small
  if (!isLargeScreen) {
    return <SmallScreenError />;
  }

  return <>{children}</>;
}