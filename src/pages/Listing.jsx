import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Listing = ({ endpoint, title, type }) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    setLoading(true);
    api.get(endpoint)
      .then(res => {
        setItems(res.data.docs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [endpoint]);

  //filter functions
  const filteredItems = items.filter(item => {
    const matchesSearch = (item.name || item.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const isCharacterPage = type.toLowerCase().includes('character');
    const matchesRace = !isCharacterPage || selectedRace === "" || item.race === selectedRace;
    return matchesSearch && matchesRace;
  });

  // pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleFilterChange = (e) => {
    setSelectedRace(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // race list 
  const races = [...new Set(items.map(i => i.race).filter(Boolean))].sort();

  if (loading) return <div className="text-center p-20 text-lotr-gold animate-pulse text-2xl font-serif">Searching records...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-6 border-b border-lotr-gold/20 pb-8">
        <h2 className="text-4xl font-serif font-bold text-lotr-gold">{title}</h2>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <input
            type="text"
            placeholder={`${title} Search...`}
            className="bg-lotr-black border border-lotr-gold/30 text-white px-4 py-3 rounded-md focus:outline-none focus:border-lotr-gold w-full flex-1"
            onChange={handleSearchChange}
          />

          {type.toLowerCase().includes('character') && (
            <select
              className="bg-lotr-black border border-lotr-gold/30 text-white px-4 py-3 rounded-md focus:outline-none focus:border-lotr-gold w-full md:w-64"
              onChange={handleFilterChange}
              value={selectedRace}
            >
              <option value="">All Races</option>
              {races.map(race => (
                <option key={race} value={race}>{race}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map(item => (
          <div key={item._id} className="group relative bg-gradient-to-br from-lotr-green-mid/50 to-lotr-black p-6 rounded-lg border border-lotr-gold/10 hover:border-lotr-gold/50 transition-all duration-500 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-lotr-gold/5 -mr-8 -mt-8 rotate-45 group-hover:bg-lotr-gold/10 transition-colors"></div>

            <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-lotr-gold transition-colors drop-shadow-md">
              {item.name || item.title}
            </h3>

            {item.race && (
              <div className="flex items-center gap-2 mb-4">
                <span className="h-[1px] w-4 bg-lotr-gold/40"></span>
                <p className="text-lotr-stone text-xs uppercase tracking-[0.2em]">{item.race}</p>
              </div>
            )}

            <Link
              to={`/${type}/${item._id}`}
              className="relative z-10 inline-block text-lotr-gold font-serif text-sm tracking-widest hover:text-white transition-all py-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-white before:transition-all hover:before:w-full"
            >
              Read Scrolls
            </Link>
          </div>
        ))}
      </div>


      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12 py-6 border-t border-lotr-gold/10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-4 py-2 border border-lotr-gold/30 text-lotr-gold hover:bg-lotr-gold hover:text-lotr-black disabled:opacity-30 transition-all"
          >
            Previous
          </button>
          <span className="text-lotr-stone font-serif">
            Page <span className="text-lotr-gold">{currentPage}</span> of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-4 py-2 border border-lotr-gold/30 text-lotr-gold hover:bg-lotr-gold hover:text-lotr-black disabled:opacity-30 transition-all"
          >
            Next
          </button>
        </div>
      )}

      {filteredItems.length === 0 && (
        <p className="text-center text-lotr-stone py-10">No records found matching your criteria.</p>
      )}
    </div>
  );
};

export default Listing;