"use client";

import { useState } from "react";
import names from "@/data/names.json";

export default function SwipePage() {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("likes") || "[]");
    }
    return [];
  });

  const current = names[index];

  function swipe(like: boolean) {
    if (like) {
      const updated = [...likes, current.id];
      setLikes(updated);
      localStorage.setItem("likes", JSON.stringify(updated));
    }
    setIndex(index + 1);
  }

  if (!current) {
    return <h2>No more names!</h2>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{current.name}</h1>
      <p>{current.meaning}</p>
      <p><strong>Origin:</strong> {current.origin.join(", ")}</p>

      <button onClick={() => swipe(false)}>👎 Pass</button>
      <button onClick={() => swipe(true)}>❤️ Like</button>
    </div>
  );
}
