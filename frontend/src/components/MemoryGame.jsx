import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Button = ({ children, className, ...props }) => (
  <button {...props} className={`px-6 py-2 rounded-xl shadow-md font-bold ${className}`}>
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-6 tracking-wide">
        Mood Matcher 🎭
      </h1>

      <div className="flex gap-6 items-center mb-6">
        <div className="bg-white rounded-xl shadow-md px-4 py-2">
          <p className="text-lg font-semibold text-gray-800">Score: {score}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md px-4 py-2">
          <p className="text-lg font-semibold text-gray-800">Moves: {moves}</p>
        </div>
        <Button
          onClick={initializeGame}
          className="bg-yellow-400 hover:bg-yellow-500 text-black"
        >
          {gameStarted ? "Restart Game" : "Start Game"}
        </Button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-md">
        {cards.map((card) => (
          <motion.div
            key={card.uid}
            onClick={() => handleFlip(card.uid)}
            className="w-20 h-24 sm:w-24 sm:h-28 perspective cursor-pointer"
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
                className="absolute w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-3xl"
                style={{ backfaceVisibility: "hidden" }}
              >
                ❓
              </div>

              {/* Back */}
              <div
                className="absolute w-full h-full rounded-xl flex items-center justify-center text-4xl font-bold"
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

      <p className="text-white mt-6 text-center text-sm">
        Match all the moods before your moves run out!
      </p>
    </div>
  );
}
