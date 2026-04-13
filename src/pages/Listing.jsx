import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Listing = ({ endpoint, title, type }) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); //arama cubugu icin fonksiyon 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(endpoint)
      .then(res => {
        setItems(res.data.docs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [endpoint]);

  const filteredItems = items.filter(item => 
    (item.name || item.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center p-20 text-lotr-gold animate-pulse text-2xl font-serif">Searching records...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-lotr-green-soft pb-6 min-w-0">
        <h2 className="text-[clamp(1.5rem,4.2vw,2.25rem)] leading-tight font-serif font-bold text-lotr-gold break-words max-w-full">
          {title}
        </h2>
        
        <input 
          type="text" 
          placeholder={`${title} Search...`} //arama cubugu goruntusu ve fonksiyonu
          id={`${type}-search`}
          name={`${type}-search`}
          aria-label={`${title} search`}
          className="bg-lotr-green-dark border border-lotr-stone text-white px-4 py-2 rounded-md focus:outline-none focus:border-lotr-gold w-full md:w-64"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item._id} className="bg-lotr-green-mid p-6 rounded-lg border border-lotr-green-soft hover:border-lotr-gold transition-all group shadow-lg min-w-0">
            <h3 className="text-[clamp(1rem,2.8vw,1.25rem)] font-bold text-white mb-4 group-hover:text-lotr-gold-light transition-colors leading-snug break-words whitespace-normal hyphens-auto max-w-full">
              {item.name || item.title} 
            </h3>
            
            {item.race && <p className="text-lotr-stone mb-4 text-sm uppercase tracking-widest">{item.race}</p>}
            
            <Link 
              to={`/${type}/${item._id}`} 
              className="inline-block text-lotr-gold font-serif hover:text-white transition-colors border-b border-transparent hover:border-white"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <p className="text-center text-lotr-stone py-10">No records found matching your criteria.</p>
      )}
    </div>
  );
};

export default Listing;
