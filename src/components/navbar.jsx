import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-lotr-green-dark px-4 py-3 sm:py-4 shadow-xl border-b border-lotr-gold/30">
      <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 min-w-0">
        <Link
          to="/"
          className="text-[clamp(1.2rem,4vw,1.75rem)] font-bold text-lotr-gold hover:text-lotr-gold-light transition break-words max-w-full"
        >
          One Midterm To Rule Them All 
        </Link> 
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:text-base"> 
          <Link to="/movies" className="text-lotr-stone hover:text-lotr-gold transition">Movies</Link>
          <Link to="/books" className="text-lotr-stone hover:text-lotr-gold transition">Books</Link>
          <Link to="/characters" className="text-lotr-stone hover:text-lotr-gold transition">Characters</Link>
          <Link to="/gacha" className="text-lotr-stone hover:text-lotr-gold transition">Gacha</Link>
        </div> 
      </div>
    </nav>
  );
};
//navbar tableri var, bu sefer navigation her sayfadan erişilebilir oldu ödevin aksine
//benimki diğerlerini yönetemez muhtemelen ama pun intended
export default Navbar;
