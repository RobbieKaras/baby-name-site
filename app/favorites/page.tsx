"use client";

import names from "../../data/names.json";
import { readJSON, writeJSON } from "../lib/storage";

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

export default function FavoritesPage() {
  const allNames = names as Name[];
  const likedIds = readJSON<number[]>(LIKES_KEY, []);

  const favorites = allNames.filter((n) => likedIds.includes(n.id));

  function clearLikes() {
    writeJSON(LIKES_KEY, []);
    window.location.reload();
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>❤️ Favorites</h1>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <a href="/swipe">Back to Swipe →</a>
        <a href="/">Home →</a>
        <button onClick={clearLikes}>Clear Favorites</button>
      </div>

      <div style={{ marginTop: 20 }}>
        {favorites.length === 0 ? (
          <p>No favorites yet. Go swipe some names!</p>
        ) : (
          favorites.map((n) => (
            <div
              key={n.id}
              style={{
                padding: 16,
                border: "1px solid #ddd",
                borderRadius: 12,
                marginBottom: 12,
                maxWidth: 650
              }}
            >
              <h2 style={{ margin: 0 }}>{n.name}</h2>
              <p style={{ marginTop: 8 }}>{n.meaning}</p>
              <p style={{ marginTop: 8, opacity: 0.85 }}>
                <strong>Origin:</strong> {n.origin.join(", ")} •{" "}
                <strong>Gender:</strong> {n.gender}
                {typeof n.popularity === "number" ? (
                  <>
                    {" "}
                    • <strong>Popularity:</strong> {n.popularity}
                  </>
                ) : null}
              </p>

              {n.vibes?.length ? (
                <p style={{ marginTop: 6 }}>
                  <strong>Vibes:</strong> {n.vibes.join(", ")}
                </p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
