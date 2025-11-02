import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Plus, LogOut, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/thunks/authThunks';
import ActivityLog from './ActivityLog';
import { fetchActivityLogs } from '../store/thunks/creatorThunk';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activityLogOpen, setActivityLogOpen] = useState(false);

  const dispatch= useDispatch()
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  useEffect(()=>{
    dispatch(fetchActivityLogs())
  },[])

  // Logout handler
  const handleLogout = async() => {
    // Clear stored data (update this logic as per your auth implementation)
    // localStorage.removeItem('creator_token');
    // localStorage.removeItem('creator_auth');
    // sessionStorage.clear();
    dispatch(logoutUser())
    // Redirect to login
    navigate('/login');
  };

  const handleActivtyLogClose=()=>{
    setActivityLogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="hidden sm:inline">CreatorHub</span>
            </Link>

            {/* Desktop Navigation */}
            {/* <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/dashboard"
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  isActive('/dashboard')
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                Creators
              </Link>
            </nav> */}

            {/* Create + Logout + Mobile Menu */}
            <div className="flex items-center gap-3">
             
             <button
                onClick={() => setActivityLogOpen(true)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Activity Log"
              >
                <Clock className="w-5 h-5" />
              </button>

              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-4 py-2  bg-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:bg-blue-700 transition-all duration-200 text-sm md:text-base"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Creator</span>
                <span className="sm:hidden">Add</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 hover:shadow-md transition-all duration-200 text-sm md:text-base"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-800">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  'block px-4 py-2 rounded-lg font-medium transition-all duration-200 mt-2',
                  isActive('/dashboard')
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                Creators
              </Link>

              {/* Mobile Logout */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left px-4 py-2 mt-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
              >
                Logout
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                &copy; 2025 CreatorHub. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
      <ActivityLog open={activityLogOpen} onOpenChange={handleActivtyLogClose} />
    </div>
  );
}
