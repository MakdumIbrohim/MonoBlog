export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MonoBlog</h3>
            <p className="text-gray-300">
              Platform blogging modern untuk berbagi cerita dan pengetahuan dengan dunia.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Beranda</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Tentang</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2025 MonoBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}