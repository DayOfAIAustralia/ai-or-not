const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-black dark:border-gray-700 px-18 py-6 z-50">
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="Day of AI" className="h-18" />
      <span className="font-bold text-gray-900 dark:text-white ml-4 text-3xl">
        AI or Not?
      </span>
    </div>
  </nav>
);

export default Navbar;
