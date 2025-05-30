'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="sm:hidden -ml-2 mr-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#333333] hover:text-[#A5D6A7] transition-colors">
                SNY
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  isActive('/') ? 'text-[#A5D6A7] font-semibold' : 'text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50'
                }`}
              >
                Home
              </Link>

              <div className="relative group">
                <button
                  onMouseEnter={() => setProductsDropdown(true)}
                  onMouseLeave={() => setProductsDropdown(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50"
                >
                  Products
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {productsDropdown && (
                  <div
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    onMouseEnter={() => setProductsDropdown(true)}
                    onMouseLeave={() => setProductsDropdown(false)}
                  >
                    <div className="py-1">
                      {['Kitchen Appliances', 'Living Room', 'Bedroom', 'Bathroom'].map((label) => (
                        <Link
                          key={label}
                          href="/product"
                          className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#A5D6A7] hover:text-white"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/#about-us"
                className="text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/#footer"
                className="text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') ? 'text-[#A5D6A7] font-semibold' : 'text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div className="relative">
              <button
                onClick={() => setProductsDropdown(!productsDropdown)}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50 flex justify-between items-center"
              >
                Products
                <svg
                  className={`ml-1 h-4 w-4 transform ${productsDropdown ? 'rotate-180' : ''} transition-transform duration-200`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {productsDropdown && (
                <div className="mt-2 pl-4">
                  {['Kitchen Appliances', 'Living Room', 'Bedroom', 'Bathroom'].map((label) => (
                    <Link
                      key={label}
                      href="/product"
                      className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/#about-us"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/#footer"
              className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}