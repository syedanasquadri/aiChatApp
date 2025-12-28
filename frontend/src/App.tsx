import { useState } from "react";
import type { Message } from "./types";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    console.log("📤 Sending message:", userMessage);

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      console.log("📡 Raw response:", res);

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data = await res.json();
      console.log("📥 Backend data:", data);

      const aiMessage: Message = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      console.error("❌ Frontend error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Gemini Chat</h2>

      <div style={{ border: "1px solid #ccc", padding: 16, minHeight: 300 }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              marginBottom: 8,
            }}
          >
            <strong>{m.role === "user" ? "You" : "AI"}:</strong>{" "}
            {m.content}
          </div>
        ))}

        {loading && <p>🤖 Thinking...</p>}
        {error && <p style={{ color: "red" }}>❌ {error}</p>}
      </div>

      <div style={{ marginTop: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          style={{ width: "80%", padding: 8 }}
        />
        <button onClick={sendMessage} style={{ padding: 8 }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
