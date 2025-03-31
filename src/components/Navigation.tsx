import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Pencil, LogOut, UserCircle2 } from 'lucide-react';

export function Navigation() {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#181818] border-b border-[#2a2a2a] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white tracking-tight">
          BlogSpace
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to="/create"
                className="flex items-center px-4 py-2 bg-[#2f2f2f] text-white rounded-xl hover:bg-[#3b3b3b] transition-colors"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Write
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setShowDropdown((prev) => !prev)}>
                  <UserCircle2 className="w-8 h-8 text-gray-300 hover:text-white" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#262628] text-white rounded-xl shadow-lg p-4 border border-[#333] z-50">
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                    <hr className="my-3 border-gray-700" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center text-sm text-red-400 hover:underline"
                    >
                      <LogOut className="w-4 h-4 mr-1" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white text-sm">
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-[#2f2f2f] text-white rounded-xl hover:bg-[#3b3b3b] transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
