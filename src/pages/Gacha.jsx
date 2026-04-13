import { useState } from 'react';

const Gacha = () => {
  const [character, setCharacter] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState("Seek your companions...");
  const [sauronBoost, setSauronBoost] = useState(0);

  // çıkabilecek karakterler, hepsinin görseli tek tek eklendi mlsf 
  const initialPool = [
    { name: "Frodo", img: "/frodo.jpg", type: "friend" },
    { name: "Aragorn", img: "/aragorn.jpg", type: "friend" },
    { name: "Legolas", img: "/Legolas.jpg", type: "friend" },
    { name: "Gimli", img: "/gimli.jpeg", type: "friend" },
    { name: "Gandalf", img: "/gandalf.jpg", type: "friend" },
    { name: "Boromir", img: "/boromir.jpeg", type: "friend" },
    { name: "Samwise", img: "/sam.jpeg", type: "friend" },
    { name: "Merry", img: "/merry.jpg", type: "friend" },
    { name: "Pippin", img: "/pippin.jpeg", type: "friend" },
    { name: "Saruman", img: "/saruman.jpeg", type: "enemy" },
    { name: "Galadriel", img: "/Galadriel.jpg", type: "friend" },
    { name: "Thranduil", img: "/Thranduil.jpg", type: "friend" },
    { name: "Elrond", img: "/Elrond.jpg", type: "friend" },
    { name: "Gollum", img: "/Gollum.png", type: "enemy" },
    { name: "Arwen", img: "/Arwen.jpg", type: "friend" },
    { name: "Eowyn", img: "/eowyn.jpeg", type: "friend" },
    { name: "Faramir", img: "/Faramir.jpg", type: "friend" },
    { name: "Smaug", img: "/smaug.jpeg", type: "enemy" },
    { name: "Thorin", img: "/thorin.jpeg", type: "friend" },
    { name: "Witch-king", img: "/witch-king.jpeg", type: "enemy" },
    { name: "Sauron", img: "/sauron.jpeg", type: "enemy" },
  ];

  const [pool, setPool] = useState(initialPool);

  const summonCharacter = () => {
    if (isSpinning) return;
    if (pool.length === 0) {
      setMessage("All fates revealed. No more companions remain."); //bu ihtimal imkansız gibi bir şey aslında çünkü sauron gelirse resetleniyor
      return;
    }

    setIsSpinning(true);
    setMessage("The Eye is watching...");
    setCharacter(null);

    // Animasyon efekti icin biraz gecikme ekliyoruz
    setTimeout(() => {
      const sauron = pool.find(p => p.name.toLowerCase() === "sauron");
      const nonSauron = pool.filter(p => p.name.toLowerCase() !== "sauron");
      const baseChance = 0.05;
      const sauronChance = Math.min(baseChance + sauronBoost, 0.6); //sauron harici enemy gelirse counter sıfırlanmaz ancak sauronun gelme olasılığını artırır, her enemy resetleyince çok sıkıcı oldu

      let randomChar = null;
      if (sauron && (nonSauron.length === 0 || Math.random() < sauronChance)) {
        randomChar = sauron;
      } else {
        const randomIndex = Math.floor(Math.random() * nonSauron.length);
        randomChar = nonSauron[randomIndex];
      }

      setCharacter(randomChar);
      setIsSpinning(false);

      if (randomChar.name.toLowerCase() === "sauron") {
        setCounter(0);
        setMessage("SAURON FOUND YOU! Your fellowship has scattered...");
        setPool(initialPool);
        setSauronBoost(0);
      } else {
        setPool(prev => prev.filter(p => p !== randomChar));
      }

      if (randomChar.type === "enemy" && randomChar.name.toLowerCase() !== "sauron") {
        setSauronBoost(prev => Math.min(prev + 0.08, 0.5));
        setMessage("A shadow stirs... Sauron's chance grows.");
      } else if (randomChar.type === "friend") {
        setCounter(prev => prev + 1);
        setMessage(`You found ${randomChar.name}!`);
      } else {
        //sauron mesajı yukarıda halihazırda mevcut
      }

      setTimeout(() => {
        setCharacter(null);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col items-center min-h-screen">
      <h1 className="font-lotr text-5xl text-lotr-gold mb-4 uppercase tracking-widest">Gacha of Middle-earth</h1>
      
      <div className="bg-lotr-green-dark/50 p-6 rounded-lg border border-lotr-gold/30 mb-8 text-center shadow-2xl">
        <p className="text-lotr-gold font-bold uppercase tracking-widest text-sm">Fellowship Size</p>
        <span className="text-5xl text-white font-black">{counter}</span>
      </div>

      <div className={`relative w-64 h-96 transition-transform duration-1000 preserve-3d ${isSpinning ? 'animate-bounce' : ''}`}>
        {!character ? (
          //kartın kapalı hali için ayrı cardback bulundu
          <div className="w-full h-full bg-lotr-green-mid border-4 border-lotr-gold rounded-xl overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <img src="/cardback.jpg" alt="Back" className="w-full h-full object-cover opacity-80" />
          </div>
        ) : (
          //açık kartlarda da karakter görseli çekiyor, publicten
          <div className={`w-full h-full rounded-xl border-4 ${character.type === 'enemy' ? 'border-red-600 shadow-[0_0_30px_red]' : 'border-lotr-gold shadow-[0_0_30px_#d4af37]'} overflow-hidden relative group bg-lotr-black`}>
            <img src={character.img} alt={character.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-center">
              <h3 className="text-white font-lotr text-xl">{character.name}</h3>
            </div>
          </div>
        )}
      </div>

      <p className={`mt-8 font-serif italic text-xl ${character?.type === 'enemy' ? 'text-red-500' : 'text-lotr-stone'}`}>
        {message}
      </p>

      <button
        onClick={summonCharacter}
        disabled={isSpinning}
        className="mt-10 px-10 py-4 bg-lotr-gold text-lotr-black font-lotr font-bold text-xl hover:bg-white transition-all transform hover:scale-110 disabled:opacity-50 shadow-[0_0_15px_rgba(212,175,55,0.5)]"
      >
        {isSpinning ? "SUMMONING..." : "DRAW A CARD"}
      </button>
    </div>
  );
};

export default Gacha;
