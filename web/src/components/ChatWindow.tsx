import { useEffect, useRef, useState, type FormEvent } from 'react';
import { profile } from '../data/profile';
import { ChatMarkdown } from './ChatMarkdown';

type Message = { role: 'user' | 'assistant'; text: string };

const GREETING: Message = {
  role: 'assistant',
  text: "Hey — I'm Naser's AI assistant. Ask me about his projects, his stack, or what he's been building.",
};

const SUGGESTIONS = [
  { label: 'The AI Receptionist?', prompt: 'Tell me about the AI Receptionist.' },
  { label: 'Coolest project?', prompt: 'Which project is the most impressive and why?' },
  { label: 'Your tech stack?', prompt: "What's your main tech stack?" },
];

// The persona and knowledge base live server-side (src/lib/persona.js),
// so the client only sends the conversation turns.
async function askAssistant(history: Message[]): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: history.map((m) => ({ role: m.role, content: m.text })) }),
  });
  if (!res.ok) throw new Error(`chat http ${res.status}`);
  const data: { reply?: string } = await res.json();
  return (data.reply || '').trim() || "Hmm, I didn't quite catch that — mind rephrasing?";
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  async function ask(raw: string) {
    const text = raw.trim();
    if (!text || loading) return;
    // The greeting is UI-only; the API expects the conversation to start with the user.
    const history = [...messages.slice(1), { role: 'user' as const, text }];
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const reply = await askAssistant(history);
      setMessages((m) => [...m, { role: 'assistant', text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          text: `I can't reach the assistant right now — but you can always email Naser at ${profile.email}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  const showSuggestions = messages.length <= 1 && !loading;

  return (
    <div className="chat" aria-label="Chat with Naser's AI assistant">
      <div className="chat__bar">
        <span className="chat__dot" />
        <span className="chat__dot" />
        <span className="chat__dot" />
        <span className="chat__title">ask-naser — chat</span>
        <span className="chat__status">
          <span className="chat__status-dot" />
          online
        </span>
      </div>

      <div ref={logRef} className="chat__log" role="log" aria-live="polite" data-lenis-prevent>
        {messages.map((m, i) => (
          <div key={i} className={`chat__row chat__row--${m.role}`}>
            <div className={`chat__bubble chat__bubble--${m.role}`}>
              {m.role === 'assistant' ? <ChatMarkdown text={m.text} /> : m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat__row chat__row--assistant">
            <div className="chat__bubble chat__bubble--thinking">thinking…</div>
          </div>
        )}
      </div>

      {showSuggestions && (
        <div className="chat__suggestions">
          {SUGGESTIONS.map((s) => (
            <button key={s.label} type="button" className="chip chip--button" onClick={() => ask(s.prompt)}>
              {s.label}
            </button>
          ))}
        </div>
      )}

      <form className="chat__form" onSubmit={onSubmit}>
        <input
          className="chat__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask about my projects…"
          aria-label="Your message"
          maxLength={2000}
        />
        <button className="chat__send" type="submit" aria-label="Send" disabled={loading}>
          ↵
        </button>
      </form>
    </div>
  );
}
