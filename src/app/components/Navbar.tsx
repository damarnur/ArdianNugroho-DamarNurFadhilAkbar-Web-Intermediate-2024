import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-bg-light p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-display font-bold text-accent-blue">
          MovieSearch
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-accent-blue transition">
            Home
          </Link>
          <Link href="/movies" className="hover:text-accent-blue transition">
            Movies
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
