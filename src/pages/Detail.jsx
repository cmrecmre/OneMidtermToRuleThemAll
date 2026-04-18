import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';

const Detail = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setImgError(false);
    setApiError(null);

    api.get(`/${type}/${id}`)
      .then(res => {
        if (isMounted) {
          const data = res.data.docs ? res.data.docs[0] : res.data;
          setItem(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setApiError(err.response?.status === 429 ? "The Archives are sealed (Rate Limit)." : "Lost in the shadows...");
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [id, type]);

  const getImagePath = () => {
    if (!item) return null;
    const name = (item.name || item.title || "").toLowerCase();

    if (type === 'book') {
      if (name.includes("fellowship")) return "/fellowship.jpeg";
      if (name.includes("two towers") || name.includes("tower")) return "/tower.jpg";
      if (name.includes("return of the king")) return "/return.jpg";
    }

    if (type === 'movie') {
      if (name.includes("fellowship")) return "/fellowship-movie.jpg";
      if (name.includes("two towers") || name.includes("tower")) return "/towers-movie.jpeg";
      if (name.includes("return of the king")) return "/return-movie.jpg";
      if (name.includes("unexpected journey")) return "/unexpected-journey.png";
      if (name.includes("desolation of smaug")) return "/smaug-descolate.jpg";
      if (name.includes("five armies")) return "/five-armies.jpg";
      if (name.includes("lord of the rings")) return "/lotr-trilogy.jpg";
      if (name.includes("hobbit")) return "/hobbit-trilogy.jpg";
    }
    return null;
  };

  const getDescription = () => {
    if (!item) return "";
    const name = (item.name || item.title || "").toLowerCase();

    if (name.includes("fellowship")) return "The epic journey begins as a young Hobbit is entrusted with an ancient ring.";
    if (name.includes("two towers") || name.includes("tower")) return "The Fellowship is scattered, while the forces of Saruman and Sauron gather strength.";
    if (name.includes("return of the king")) return "The final battle for Middle-earth commences as the true heir to the throne emerges.";
    if (name.includes("unexpected journey")) return "Bilbo Baggins is swept into a quest to reclaim the lost Dwarf Kingdom of Erebor.";
    if (name.includes("desolation of smaug")) return "The dwarves, Bilbo and Gandalf have successfully escaped the Misty Mountains and Smaug awaits.";
    if (name.includes("five armies")) return "The Company of Thorin has reached the homeland, but danger awaits from all sides.";

    return type === 'movie' ? "A cinematic masterpiece from the world of Middle-earth." : "An ancient tome containing the history of Middle-earth.";
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="text-center p-20 text-lotr-gold animate-pulse font-serif text-3xl tracking-[0.2em] uppercase">SEARCHING THE ARCHIVES...</div>
    </div>
  );

  if (apiError || !item) return (
    <div className="text-center p-20 text-white font-serif min-h-[70vh] flex flex-col justify-center items-center">
      <h2 className="text-4xl text-lotr-gold mb-6 tracking-widest uppercase">Eru Ilúvatar!</h2>
      <p className="text-xl italic text-lotr-stone">{apiError || "This record has been lost to the shadows of Mordor."}</p>
      <button onClick={() => navigate(-1)} className="mt-12 px-10 py-3 border border-lotr-gold text-lotr-gold hover:bg-lotr-gold hover:text-lotr-black transition-all font-serif uppercase tracking-widest">Return to the Light</button>
    </div>
  );

  const imagePath = getImagePath();
  const description = getDescription();

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#121d14] via-[#0a0f0a] to-black border border-lotr-gold/20 p-8 md:p-14 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-sm">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lotr-gold/40 to-transparent"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-[clamp(1.8rem,4vw,3.5rem)] font-serif font-bold text-white mb-4 drop-shadow-md">
              {item.name || item.title}
            </h1>
            <div className="w-24 h-1 bg-lotr-gold/50 mb-10 rounded-full"></div>

            {(type === 'book' || type === 'movie') && (
              <div className="relative bg-white/5 p-8 border-l-2 border-lotr-gold/40 italic text-lotr-stone text-lg mb-10 rounded-r-lg">
                <span className="absolute -top-4 -left-2 text-6xl text-lotr-gold/20 font-serif">“</span>
                {description}
                <div className="text-right h-2">
                  <span className="text-6xl text-lotr-gold/20 font-serif leading-none">”</span>
                </div>
              </div>
            )}

            {/* KARAKTER KARTI */}
            {type === 'character' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-black/30 p-8 rounded-xl border border-lotr-gold/10">
                <div className="space-y-6">
                  <div>
                    <span className="text-lotr-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Race</span>
                    <p className="text-2xl text-white font-serif">{item.race || "Unknown"}</p>
                  </div>
                  <div>
                    <span className="text-lotr-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Gender</span>
                    <p className="text-xl text-white font-serif italic">{item.gender || "Not Specified"}</p>
                  </div>
                  <div>
                    <span className="text-lotr-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Realm / Culture</span>
                    <p className="text-xl text-lotr-stone italic">{item.realm || item.culture || "Middle-earth"}</p>
                  </div>
                </div>
                <div className="space-y-6 md:border-l md:border-lotr-gold/10 md:pl-8">
                  <div>
                    <span className="text-lotr-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Birth / Death</span>
                    <p className="text-lg text-white font-serif">{item.birth || "Ancient Era"} — {item.death || "Present"}</p>
                  </div>
                  <div>
                    <span className="text-lotr-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Spouse</span>
                    <p className="text-lg text-lotr-stone">{item.spouse || "Not mentioned"}</p>
                  </div>
                  {item.wikiUrl && (
                    <div className="pt-4">
                      <a href={item.wikiUrl} target="_blank" rel="noreferrer" className="text-lotr-gold hover:text-white transition-colors text-xs font-bold border-b border-lotr-gold/20 hover:border-white tracking-widest">
                        EXPLORE ORIGINAL SCROLLS (WIKI) →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FİLM DETAYLARI (Runtime, Awards, Budget, Box Office, Rotten Tomatoes) */}
            {type === 'movie' && (
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <span className="text-lotr-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Runtime</span>
                    <p className="text-xl text-white font-serif">{item.runtimeInMinutes} min</p>
                  </div>
                  <div>
                    <span className="text-lotr-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Awards</span>
                    <p className="text-3xl text-white font-serif">{item.academyAwardWins} <span className="text-sm text-lotr-gold italic">Oscars</span></p>
                  </div>
                  <div>
                    <span className="text-lotr-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Budget</span>
                    <p className="text-xl text-white font-serif">${item.budgetInMillions}M</p>
                  </div>
                </div>
                <div className="space-y-6 border-l border-lotr-gold/10 pl-8">
                  <div>
                    <span className="text-lotr-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Review Score</span>
                    <p className="text-3xl text-green-500 font-serif">%{Math.round(item.rottenTomatoesScore)} <span className="text-sm text-lotr-stone italic">Fresh</span></p>
                  </div>
                  <div>
                    <span className="text-lotr-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold block mb-1">Box Office Revenue</span>
                    <p className="text-3xl text-white font-serif">${item.boxOfficeRevenueInMillions}M</p>
                  </div>
                </div>
              </div>
            )}

            {/* KİTAP DETAYLARI */}
            {type === 'book' && (
              <div className="mt-4 p-4 bg-lotr-gold/5 rounded border border-lotr-gold/10">
                <p className="italic text-lotr-gold font-serif text-lg text-center">"Written by J.R.R. Tolkien."</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative group w-full max-w-[400px]">
              <div className="absolute -inset-4 bg-lotr-gold/5 rounded-full blur-3xl group-hover:bg-lotr-gold/10 transition-all duration-700"></div>

              {imagePath && !imgError ? (
                <img
                  src={imagePath}
                  className="relative w-full rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-lotr-gold/20 group-hover:border-lotr-gold/50 transition-all duration-700 object-cover aspect-[2/3] transform group-hover:scale-[1.02]"
                  alt={item.name}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="relative aspect-[2/3] bg-lotr-green-dark/20 flex flex-col items-center justify-center rounded-lg border border-lotr-gold/10 p-12 text-center backdrop-blur-sm">
                  <div className="w-20 h-20 mb-6 border-t border-lotr-gold/20 rounded-full animate-spin"></div>
                  <span className="text-lotr-gold/30 font-serif italic tracking-[0.2em] text-xs uppercase">
                    {type === 'character' ? "Middle-earth Portrait Missing" : "Ancient Archive Sealed"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-lotr-gold/10">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-4 text-lotr-gold/60 hover:text-lotr-gold transition-colors font-serif uppercase tracking-[0.3em] text-xs"
          >
            <span className="transition-transform group-hover:-translate-x-2">←</span> Return to the Archives
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;