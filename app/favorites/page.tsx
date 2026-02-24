"use client";

import names from "@/data/names.json";

export default function FavoritesPage() {
  const likedIds =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("likes") || "[]")
      : [];

  const favorites = names.filter(n => likedIds.includes(n.id));

  return (
    <div style={{ padding: 40 }}>
      <h1>❤️ Favorites</h1>
      {favorites.map(n => (
        <div key={n.id}>
          <h3>{n.name}</h3>
          <p>{n.meaning}</p>
        </div>
      ))}
    </div>
  );
}
