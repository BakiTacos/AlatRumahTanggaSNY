'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [homeDropdown, setHomeDropdown] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#333333] hover:text-[#A5D6A7] transition-colors">
                SNY
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-1">
              <div className="relative group">
                <button
                  onMouseEnter={() => setHomeDropdown(true)}
                  onMouseLeave={() => setHomeDropdown(false)}
                  className="text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  Home
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {homeDropdown && (
                  <div
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    onMouseEnter={() => setHomeDropdown(true)}
                    onMouseLeave={() => setHomeDropdown(false)}
                  >
                    <div className="py-1">
                      <Link href="/featured" className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#A5D6A7] hover:text-white">
                        Featured Products
                      </Link>
                      <Link href="/new-arrivals" className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#A5D6A7] hover:text-white">
                        New Arrivals
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative group">
                <button
                  onMouseEnter={() => setProductsDropdown(true)}
                  onMouseLeave={() => setProductsDropdown(false)}
                  className="text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
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
                      <Link href="/kitchen" className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#A5D6A7] hover:text-white">
                        Kitchen Appliances
                      </Link>
                      <Link href="/living-room" className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#A5D6A7] hover:text-white">
                        Living Room
                      </Link>
                      <Link href="/bedroom" className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#A5D6A7] hover:text-white">
                        Bedroom
                      </Link>
                      <Link href="/bathroom" className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#A5D6A7] hover:text-white">
                        Bathroom
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <a
                href="#about-us"
                className="text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About Us
              </a>
              <a
                href="#footer"
                className="text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Catalogue
              </a>
              <a
                href="#footer"
                className="text-[#333333] hover:text-[#A5D6A7] hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}