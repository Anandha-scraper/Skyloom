"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      redirect("/dashboard");
    }
  }, []);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/generated_images/Earth_from_space_weather_view_6fc954f0.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        position: 'relative'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }}
      />
      
      {/* Login form with higher z-index */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <LoginForm />
      </div>
    </div>
  );
}