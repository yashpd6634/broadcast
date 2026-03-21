import React, { useState } from "react";

export default function Grid({ n = 5, delay = 500 }) {
  const total = n * n;
  const [colors, setColors] = useState(() => Array(total).fill("steelblue"));
  const [order, setOrder] = useState([]); // stores indices in click order
  const [running, setRunning] = useState(false);

  const clickCell = (i) => {
    if (running) return;
    if (colors[i] === "tomato") return; // already clicked
    setColors((c) => {
      const copy = c.slice();
      copy[i] = "tomato";
      return copy;
    });
    setOrder((o) => [...o, i]);
  };

  const start = async () => {
    if (running || order.length === 0) return;
    setRunning(true);
    for (const idx of order) {
      setColors((c) => {
        const copy = c.slice();
        copy[idx] = "steelblue";
        return copy;
      });
      // wait
      await new Promise((r) => setTimeout(r, delay));
    }
    setOrder([]);
    setRunning(false);
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 720, margin: 20 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={start}
          disabled={running || order.length === 0}
          style={{
            color: "black",
            padding: "16px",
            cursor: running ? "not-allowed" : "pointer",
            border: "1px solid black",
          }}
        >
          {running ? "Resetting..." : "Start"}
        </button>
        <button
          onClick={() => {
            if (running) return;
            setColors(Array(total).fill("steelblue"));
            setOrder([]);
          }}
          style={{
            color: "black",
            padding: "16px",
            cursor: running ? "not-allowed" : "pointer",
            border: "1px solid black",
          }}
          disabled={running}
        >
          Reset
        </button>
        <div style={{ marginLeft: "auto" }}>Clicked: {order.length}</div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${n}, 1fr)`,
          gap: 8,
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => clickCell(i)}
            disabled={running}
            style={{
              height: 72,
              background: colors[i],
              border: "none",
              color: "white",
              fontWeight: 700,
              borderRadius: 6,
              cursor: running ? "not-allowed" : "pointer",
            }}
          >
            {order.indexOf(i) >= 0 ? order.indexOf(i) + 1 : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
