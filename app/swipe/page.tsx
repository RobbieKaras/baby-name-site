"use client";

import { useMemo, useState } from "react";
import names from "@/data/names.json";
import { readJSON, writeJSON } from "@/app/lib/storage";

type Name = {
  id: number;
  name: string;
  gender: string;
  origin: string[];
  meaning: string;
  popularity?: number;
  vibes?: string[];
};

const LIKES_KEY = "likes_v1";

export default function SwipePage() {
  const allNames = names as Name[];

  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState<number[]>(() => readJSON(LIKES_KEY, []));

  const current = allNames[index];

  const likedSet = useMemo(() => new Set(likes), [likes]);

  function swipe(like: boolean) {
    if (!current) return;

    if (like && !likedSet.has(current.id)) {
      const updated = [...likes, current.id];
      setLikes(updated);
      writeJSON(LIKES_KEY, updated);
    }

    setIndex((i) => i + 1);
  }

  function reset() {
    setIndex(0);
  }

  if (!current) {
    return (
      <main style={{ padding: 32, fontFamily: "system-ui, Arial" }}>
        <h1>Swipe</h1>
        <p>You reached the end.</p>

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button onClick={reset}>Start Over</button>
          <a href="/favorites">View Favorites →</a>
          <a href="/">Home →</a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: 32, fontFamily: "system-ui, Arial" }}>
      <h1>Swipe</h1>

      <div
        style={{
          marginTop: 16,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 12,
          maxWidth: 520,
        }}
      >
        <h2 style={{ margin: 0 }}>{current.name}</h2>
        <p style={{ marginTop: 8 }}>{current.meaning}</p>

        <p style={{ marginTop: 8 }}>
          <strong>Origin:</strong> {current.origin.join(", ")} <br />
          <strong>Gender:</strong> {current.gender}
          {typeof current.popularity === "number" ? (
            <>
              <br />
              <strong>Popularity:</strong> {current.popularity}
            </>
          ) : null}
        </p>

        {current.vibes?.length ? (
          <p style={{ marginTop: 8 }}>
            <strong>Vibes:</strong> {current.vibes.join(", ")}
          </p>
        ) : null}

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button onClick={() => swipe(false)}>👎 Pass</button>
          <button onClick={() => swipe(true)}>❤️ Like</button>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
        <a href="/favorites">Favorites ({likes.length}) →</a>
        <a href="/">Home →</a>
      </div>

      <p style={{ marginTop: 12, opacity: 0.7 }}>
        {index + 1} / {allNames.length}
      </p>
    </main>
  );
}
