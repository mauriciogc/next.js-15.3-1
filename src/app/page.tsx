export default function HomePage() {
  return (
    <main className="container">
      <h1 className="title">Página principal</h1>
      <div className="flex gap-3 flex-wrap items-center px-4 py-3 rounded-xl">
        <button className="pill-button pill-button-default">Primary</button>

        <button className="pill-button pill-button-active flex items-center">
          Secondary
        </button>

        <button className="pill-button pill-button-default flex items-center">
          Primary
          <span className="pill-badge">01</span>
        </button>

        <button className="pill-button pill-button-active flex items-center">
          Secondary
          <span className="pill-badge">02</span>
        </button>
      </div>
    </main>
  );
}
