import { createContext, useContext, useState, type ReactNode } from 'react'

interface DemoUser {
  id: string
  email: string
}

interface AuthContextType {
  user: DemoUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function getStoredUsers(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem('cetm_users') || '{}')
  } catch {
    return {}
  }
}

function saveStoredUsers(users: Record<string, string>) {
  localStorage.setItem('cetm_users', JSON.stringify(users))
}

function getStoredSession(): DemoUser | null {
  try {
    const raw = localStorage.getItem('cetm_session')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(getStoredSession)

  const signUp = async (email: string, password: string) => {
    const users = getStoredUsers()
    if (users[email]) {
      return { error: 'An account with this email already exists' }
    }
    users[email] = password
    saveStoredUsers(users)
    const demoUser = { id: `user-${Date.now()}`, email }
    localStorage.setItem('cetm_session', JSON.stringify(demoUser))
    setUser(demoUser)
    return { error: null }
  }

  const signIn = async (email: string, password: string) => {
    const users = getStoredUsers()
    if (!users[email]) {
      return { error: 'No account found with this email' }
    }
    if (users[email] !== password) {
      return { error: 'Invalid password' }
    }
    const demoUser = { id: `user-${email}`, email }
    localStorage.setItem('cetm_session', JSON.stringify(demoUser))
    setUser(demoUser)
    return { error: null }
  }

  const signOut = async () => {
    localStorage.removeItem('cetm_session')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading: false, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
