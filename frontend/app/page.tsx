export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Mono<span className="text-indigo-600">Blog</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Platform blogging modern untuk berbagi cerita, pengetahuan, dan ide-ide brilian dengan dunia.
            Bergabunglah dengan komunitas penulis dan pembaca yang inspiratif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
              Mulai Menulis
            </button>
            <button className="bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3 px-8 rounded-lg border border-indigo-600 transition duration-300">
              Jelajahi Blog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}