"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  username: string
  email?: string
  avatar?: string
  loginMethod: "lightning" | "demo"
  lightningAddress?: string
  joinedAt: Date
  lastLogin: Date
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (method: "lightning" | "demo", userData?: Partial<User>) => void
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("einundzwanzig-user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser({
          ...userData,
          joinedAt: new Date(userData.joinedAt),
          lastLogin: new Date(userData.lastLogin),
        })
      } catch (error) {
        console.error("Failed to parse saved user data:", error)
        localStorage.removeItem("einundzwanzig-user")
      }
    }
  }, [])

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("einundzwanzig-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("einundzwanzig-user")
    }
  }, [user])

  const login = (method: "lightning" | "demo", userData?: Partial<User>) => {
    const newUser: User = {
      id: userData?.id || Math.random().toString(36).substr(2, 9),
      username: userData?.username || (method === "lightning" ? "Lightning User" : "Demo User"),
      email: userData?.email,
      avatar: userData?.avatar,
      loginMethod: method,
      lightningAddress: userData?.lightningAddress,
      joinedAt: userData?.joinedAt || new Date(),
      lastLogin: new Date(),
    }
    setUser(newUser)
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
