import { Plane, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/Button'

export function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <nav className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <Link to="/app/dashboard" className="flex items-center gap-2 text-blue-600">
          <Plane className="h-5 w-5" />
          <span className="font-bold text-lg">CostEfficient Travel</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600 hidden sm:block">{user?.email}</span>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-1" />
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  )
}
