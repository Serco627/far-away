import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (percentage === 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [percentage]);

  return (
    <footer className="stats">
      {showConfetti && <Confetti />}
      <em>
        {percentage === 100
          ? `🎉 You are ready to go! Happy vacation! 🛫`
          : numItems === 0
          ? `You have no items in your list. Start adding some items to your packing list. 🚀`
          : `💼 You have ${numItems} items in your list and you already packed ${numPacked} (${percentage}%) 💼`}
      </em>
    </footer>
  );
}
