import mapBg from '../assets/middle-earth-map.jpeg';

const Home = () => {
  return (
    <div
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-center text-center px-4 bg-black"
      style={{
        backgroundImage: `url(${mapBg})`, //map bg de normalde public içerisindeydi ancak bir türlü çalışmadı ondan dolayı assets içerisinden import ediliyor
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-lotr-black/70 backdrop-blur-[2px] z-0"></div>

      <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
        <h1 className="text-6xl md:text-7xl font-black text-lotr-gold mb-6 drop-shadow-[0_5px_15px_rgba(212,175,55,0.4)] font-lotr">
          One Midterm to Rule Them All
        </h1>

        <div className="w-32 h-1 bg-lotr-gold mb-8 shadow-[0_0_10px_#d4af37]"></div>

        <p className="text-2xl text-lotr-stone max-w-2xl leading-relaxed italic font-serif">
          "Pocket-guide for the One API, a comprehensive resource for all things Middle-earth."
        </p>

        <div className="mt-10 p-6 border-t border-b border-lotr-gold/20 bg-lotr-green-dark/30 rounded-xl backdrop-blur-md">
          <p className="text-lg text-white/90 max-w-3xl font-serif">
            This portal was created as a midterm project for the Web Programming course. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
