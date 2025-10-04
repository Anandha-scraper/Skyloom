"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Lock, User } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("demo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted", { username, password });
    localStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };

  return (
    <div 
      style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        padding: '2rem',
        margin: '0 auto'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <Globe 
            style={{ 
              width: '48px', 
              height: '48px', 
              color: '#3b82f6',
              margin: '0 auto'
            }} 
          />
        </div>
        <h1 style={{ 
          fontSize: '1.875rem', 
          fontWeight: 'bold', 
          color: '#f8fafc',
          margin: '0 0 0.5rem 0',
          fontFamily: 'Inter, sans-serif'
        }}>
          NASA Earth Observation
        </h1>
        <p style={{ 
          fontSize: '1rem', 
          color: '#94a3b8',
          margin: '0',
          fontFamily: 'Inter, sans-serif'
        }}>
          Access historical weather data and climate analysis
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Username Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label 
            htmlFor="username" 
            style={{ 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#f8fafc',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Username
          </label>
          <div style={{ position: 'relative' }}>
            <User 
              style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '16px', 
                height: '16px', 
                color: '#94a3b8' 
              }} 
            />
            <input
              id="username"
              data-testid="input-username"
              type="text"
              placeholder="demo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                height: '44px',
                paddingLeft: '40px',
                paddingRight: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)'}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label 
            htmlFor="password" 
            style={{ 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#f8fafc',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <Lock 
              style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '16px', 
                height: '16px', 
                color: '#94a3b8' 
              }} 
            />
            <input
              id="password"
              data-testid="input-password"
              type="password"
              placeholder="demo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                height: '44px',
                paddingLeft: '40px',
                paddingRight: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)'}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          data-testid="button-login"
          style={{
            width: '100%',
            height: '44px',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.875rem',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            marginTop: '0.5rem'
          }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6'}
        >
          Sign In
        </button>

        {/* Demo Credentials */}
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#94a3b8', 
          textAlign: 'center',
          margin: '0',
          fontFamily: 'Inter, sans-serif'
        }}>
          Demo credentials: username and password are both "demo"
        </p>
      </form>
    </div>
  );
}