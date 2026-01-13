const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 bg-yellow px-4 md:px-18 py-2 md:py-6 z-50">
    <div className="flex items-center gap-2 md:gap-3">
      <img src="/logo.png" alt="Day of AI" className="h-10 md:h-18" />
      <span className="font-bold text-gray-900 ml-2 md:ml-4 text-xl md:text-4xl">AI or Not?</span>
    </div>
  </nav>
);

export default Navbar;
