import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Button = ({ children, className, ...props }) => (
  <button {...props} className={`px-4 py-2 rounded-xl shadow-md font-bold text-base ${className}`}>
    {children}
  </button>
);

const emotions = [
  { emotion: "😊", color: "#FFD166" },
  { emotion: "😢", color: "#118AB2" },
  { emotion: "😡", color: "#EF476F" },
  { emotion: "😱", color: "#073B4C" },
  { emotion: "😍", color: "#06D6A0" },
  { emotion: "😴", color: "#9D4EDD" },
];

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const initializeGame = () => {
    const duplicated = [...emotions, ...emotions];
    const shuffled = duplicated
      .map((item) => ({ ...item, uid: Math.random().toString(36).slice(2) }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setMoves(0);
    setGameStarted(true);
  };

  const handleFlip = (uid) => {
    if (flipped.includes(uid) || matched.includes(uid) || flipped.length === 2) return;
    setFlipped((prev) => [...prev, uid]);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = flipped;
      const firstCard = cards.find((c) => c.uid === first);
      const secondCard = cards.find((c) => c.uid === second);

      if (firstCard.emotion === secondCard.emotion) {
        setMatched((prev) => [...prev, first, second]);
        setScore((s) => s + 10);
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      alert("🎉 You matched all emotions!");
    }
  }, [matched, cards]);

  const isFlipped = (uid) => flipped.includes(uid) || matched.includes(uid);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 px-4 py-4 sm:px-8 sm:py-8">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-wide text-center">
          Mood Matcher 🎭
        </h1>

        <div className="flex flex-wrap gap-4 items-center justify-center mb-6 w-full">
          <div className="bg-white rounded-xl shadow-md px-4 py-2 min-w-[100px] text-center">
            <p className="text-lg font-semibold text-gray-800">Score: {score}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md px-4 py-2 min-w-[100px] text-center">
            <p className="text-lg font-semibold text-gray-800">Moves: {moves}</p>
          </div>
          <Button
            onClick={initializeGame}
            className="bg-yellow-400 hover:bg-yellow-500 text-black min-w-[120px]"
          >
            {gameStarted ? "Restart Game" : "Start Game"}
          </Button>
        </div>

        <div className="flex-1 w-full flex justify-center items-center">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 w-full max-w-sm sm:max-w-lg md:max-w-3xl mx-auto">
            {cards.map((card) => (
              <motion.div
                key={card.uid}
                onClick={() => handleFlip(card.uid)}
                className="w-full aspect-[3/4] sm:w-auto sm:aspect-[4/5] perspective cursor-pointer select-none rounded-xl"
              >
                <motion.div
                  className={`relative w-full h-full rounded-xl shadow-lg transition-transform duration-500`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped(card.uid) ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-3xl sm:text-4xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    ❓
                  </div>

                  {/* Back */}
                  <div
                    className="absolute w-full h-full rounded-xl flex items-center justify-center text-4xl sm:text-5xl font-bold"
                    style={{
                      backgroundColor: card.color,
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {card.emotion}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-white mt-6 text-center text-base sm:text-lg">
          Match all the moods before your moves run out!
        </p>
      </div>
    </div>
  );
}
