export default function Footer() {
  return (
    <footer id="footer" className="bg-[#333333] text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SNY Home Appliances</h3>
            <p className="text-gray-300">
              Quality home appliances for your everyday needs.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">Email: info@sny.com</p>
            <p className="text-gray-300">Phone: (123) 456-7890</p>
            <p className="text-gray-300">Address: 123 Main St, City</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#A5D6A7]">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-[#A5D6A7]">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-[#A5D6A7]">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} SNY Home Appliances. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}