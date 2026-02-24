export default function HomePage() {
  return (
    <main style={{ padding: 32 }}>
      <h1>Baby Names (MVP)</h1>
      <p>Prototype: swipe names, save favorites.</p>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <a href="/swipe">Go to Swipe →</a>
        <a href="/favorites">View Favorites →</a>
      </div>
    </main>
  );
}
