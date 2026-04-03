import { Plane } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <Plane className="h-5 w-5" />
            <span className="font-bold">CostEfficient Travel Manager</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/login" className="hover:text-white transition-colors">Log In</Link>
            <Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CostEfficient Travel Manager
          </p>
        </div>
      </div>
    </footer>
  )
}
