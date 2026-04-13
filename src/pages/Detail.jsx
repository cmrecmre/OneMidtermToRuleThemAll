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
      .catch(err => { //Eğer APIye fazla istek atılırsa engel atıyor, kötü yoldan deneyimledim
        if (isMounted) {
          setApiError(err.response?.status === 429 ? "The Archives are sealed (Rate Limit)." : "Lost in the shadows...");
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [id, type]);

  const getImagePath = () => {
    if (!item) return null;
    const name = (item.name || item.title || "").toLowerCase(); //fotoğraf ve api içerik bağlantısı küçük harfe duyarlı olduğu için çevirme eklendi
    
    if (type === 'book') { //kitap ve filmler için görsel eklendi
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
    const name = (item.name || item.title || "").toLowerCase(); //yine aynı mantıkta kitap/film açıklamaları eklendi

    if (name.includes("fellowship")) return "The epic journey begins as a young Hobbit is entrusted with an ancient ring.";
    if (name.includes("two towers") || name.includes("tower")) return "The Fellowship is scattered, while the forces of Saruman and Sauron gather strength.";
    if (name.includes("return of the king")) return "The final battle for Middle-earth commences as the true heir to the throne emerges.";
    if (name.includes("unexpected journey")) return "Bilbo Baggins is swept into a quest to reclaim the lost Dwarf Kingdom of Erebor.";
    if (name.includes("desolation of smaug")) return "The dwarves, Bilbo and Gandalf have successfully escaped the Misty Mountains and Smaug awaits.";
    if (name.includes("five armies")) return "The Company of Thorin has reached the homeland, but danger awaits from all sides.";

    return type === 'movie' ? "A cinematic masterpiece from the world of Middle-earth." : "An ancient tome containing the history of Middle-earth.";
  };

  if (loading) return ( //veriler yüklenirken gelen yükleme ekranı
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="text-center p-20 text-lotr-gold animate-pulse font-lotr text-3xl tracking-widest">SEARCHING THE ARCHIVES...</div>
    </div>
  );

  if (apiError || !item) return ( //bunu test etmedim ama veri gelmezse burası çalışıyor olması gerek
    <div className="text-center p-20 text-white font-serif">
      <h2 className="text-2xl text-lotr-gold mb-4 font-lotr tracking-widest uppercase">Eru Ilúvatar!</h2>
      <p className="text-xl italic">{apiError || "This record has been lost to the shadows of Mordor."}</p>
      <button onClick={() => navigate(-1)} className="mt-8 px-8 py-3 border border-lotr-gold text-lotr-gold hover:bg-lotr-gold hover:text-lotr-black transition-all font-lotr">GO BACK</button>
    </div>
  );

  const imagePath = getImagePath();
  const description = getDescription();

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 animate-in fade-in duration-700">
      <div className="bg-lotr-green-mid border-2 border-lotr-gold/40 p-10 rounded-lg shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lotr-gold/50 to-transparent"></div>

        <h1 className="text-[clamp(1.8rem,4.8vw,3rem)] leading-tight font-lotr font-bold text-lotr-gold mb-10 border-b border-lotr-gold/20 pb-6 tracking-tight break-words max-w-full">
          {item.name || item.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-white font-serif text-xl leading-relaxed">
            
            {(type === 'book' || type === 'movie') && ( //kitaplar ve filmler için olan açıklama kutuları
              <div className="bg-lotr-black/20 p-4 border-l-2 border-lotr-gold/30 italic text-white/90 text-lg mb-6">
                "{description}" 
              </div>
            )}

            {type === 'character' && (
              <div className="space-y-4">
                <p><span className="text-lotr-gold/70 font-bold uppercase text-xs tracking-[0.3em] block mb-1">Race</span> {item.race || "Unknown"}</p>
                <p><span className="text-lotr-gold/70 font-bold uppercase text-xs tracking-[0.3em] block mb-1">Gender</span> {item.gender || "Not Specified"}</p>
                <p><span className="text-lotr-gold/70 font-bold uppercase text-xs tracking-[0.3em] block mb-1">Realm / Culture</span> {item.realm || item.culture || "Middle Earth"}</p>
                <p><span className="text-lotr-gold/70 font-bold uppercase text-xs tracking-[0.3em] block mb-1">Birth</span> {item.birth || "Ancient Era"}</p>
              </div>
            )}

            {type === 'movie' && (
              <div className="space-y-4">
                <p><span className="text-lotr-gold/70 font-bold uppercase text-xs tracking-[0.3em] block mb-1">Runtime</span> {item.runtimeInMinutes} minutes</p>
                <p><span className="text-lotr-gold/70 font-bold uppercase text-xs tracking-[0.3em] block mb-1">Academy Award Wins</span> {item.academyAwardWins} Oscars</p>
                <p><span className="text-lotr-gold/70 font-bold uppercase text-xs tracking-[0.3em] block mb-1">Budget</span> ${item.budgetInMillions} Million</p>
                <p><span className="text-lotr-gold/70 font-bold uppercase text-xs tracking-[0.3em] block mb-1">Box Office</span> ${item.boxOfficeRevenueInMillions} Million</p>
              </div>
            )}

            {type === 'book' && (
              <div className="space-y-4">
                <p className="italic text-lotr-gold/80 font-serif">"Written by J.R.R. Tolkien."</p>
              </div>
            )}
          </div>


          <div className="w-full group">
            {(type === 'book' || type === 'movie') && imagePath && !imgError ? (
              <img 
                src={imagePath}
                className="w-full rounded shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-2 border-lotr-gold/30 group-hover:border-lotr-gold/60 transition-all duration-700 object-cover aspect-[2/3]"
                alt={item.name}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="aspect-[2/3] bg-lotr-green-dark/40 flex flex-col items-center justify-center rounded border-2 border-lotr-gold/10 p-8 text-center">
                <div className="w-16 h-16 mb-4 border-t-2 border-lotr-gold/30 rounded-full animate-spin"></div>
                <span className="text-lotr-gold/40 font-lotr italic tracking-[0.2em] text-xs uppercase">
                  {type === 'character' ? "Middle Earth Portrait" : "Ancient Scroll Missing"} 
                </span> 
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={() => navigate(-1)}
          className="mt-16 px-12 py-4 bg-transparent border-2 border-lotr-gold/50 text-lotr-gold font-lotr font-bold hover:bg-lotr-gold hover:text-lotr-black transition-all duration-500 tracking-[0.3em] uppercase text-xs group"
        >
          <span className="inline-block transition-transform group-hover:-translate-x-2 mr-2">←</span> Return to Library
        </button> 
      </div>
    </div>
  ); //yine navigasyon geliştirme amacıyla back butonu
};
//api içerisinde görsel olmadığı için karakterlerin spesifik görselleri yok, ben gacha için manuel olarak görsel ekledim

export default Detail;
