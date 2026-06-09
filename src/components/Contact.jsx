import { useState, useEffect, useRef } from "react";
import "./Contact.css";
import Navbar from "./Navbar";
import logo from "../assets/logo.png";

// ── Bot knowledge base ──
const BOT_NAME = "Boba";
const TYPING_DELAY = 800;

const QUICK_REPLIES = [
  { label: "📍 Where are you?", key: "location" },
  { label: "🧋 What's on the menu?", key: "menu" },
  { label: "🕘 Opening hours?", key: "hours" },
  { label: "🛵 How do I order?", key: "order" },
  { label: "📞 Contact info?", key: "contact" },
];

const RESPONSES = {
  location: [
    "We're based in Maseru, Lesotho! 📍",
    "Find us at PG9J+3JW, Mateka, Maseru.",
    <span key="loc-link">Get directions on <a href="https://www.google.com/maps?q=-29.28225080,27.53159010" target="_blank" rel="noreferrer">Google Maps →</a></span>,
  ],
  menu: [
    "Here's what we're serving right now 🧋",
    <span key="menu-list">
      <strong>Our Menu:</strong><br/>
      ☕ Iced Coffee — <strong>M22</strong><br/>
      🍵 Matcha Latte — <strong>M27</strong><br/>
      🍓 Strawberry Milk Tea — <strong>M22</strong>
    </span>,
    "More seasonal drinks coming soon. Stay tuned! 👀",
  ],
  hours: [
    "Here are our opening hours ⏰",
    <span key="hours-list">
      <strong>Mon – Fri:</strong> 09:00 – 17:00<br/>
      <strong>Sat – Sun:</strong> 09:00 – 15:00
    </span>,
    "We're open every day — come sip with us! ☁️",
  ],
  order: [
    "Ordering is super easy 🛵",
    <span key="order-app">We're on the <strong>Local Bites</strong> app for delivery!</span>,
    <span key="order-link">Order here → <a href="https://store.localbites.co.ls/stores/boba-heaven/" target="_blank" rel="noreferrer">https://store.localbites.co.ls/stores/boba-heaven/</a></span>,
  ],
  contact: [
    "Here's how to reach us 📬",
    <span key="contact-info">
      📞 <a href="tel:+26663134972">63134972</a><br/>
      💬 <a href="https://wa.me/27718185667" target="_blank" rel="noreferrer">WhatsApp: +27 71 818 5667</a><br/>
      📧 <a href="mailto:bobaheavenls@gmail.com">bobaheavenls@gmail.com</a>
    </span>,
  ],
  default: [
    "Hmm, I'm not sure about that one 🤔",
    "Try one of the quick options below and I'll help you out!",
  ],
};

function getResponseKey(text) {
  const t = text.toLowerCase();
  if (/locat|where|address|map|find|maseru|mateka/.test(t)) return "location";
  if (/menu|drink|food|price|cost|how much|iced|matcha|strawberry|milk tea|boba|bubble/.test(t)) return "menu";
  if (/hour|open|close|time|when/.test(t)) return "hours";
  if (/order|buy|deliv|localbite|app|get/.test(t)) return "order";
  if (/contact|phone|call|whatsapp|email|reach|number/.test(t)) return "contact";
  return "default";
}

let msgId = 0;
const newMsg = (from, content, isJSX = false) => ({
  id: msgId++,
  from,
  content,
  isJSX,
  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
});

// ── Contact Form ──
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    // Opens mailto with pre-filled content
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:bobaheavenls@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="form-card">
      <div className="form-card-header">
        <p className="form-eyebrow">Get in touch</p>
        <h2 className="form-heading">Send us a<br /><em>message.</em></h2>
        <p className="form-sub">We'll get back to you within 24 hours.</p>
      </div>

      <div className="form-fields">
        <div className="form-field">
          <label className="form-label">Name</label>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label className="form-label">Message</label>
          <textarea
            className="form-input form-textarea"
            name="message"
            placeholder="What's on your mind?"
            value={form.message}
            onChange={handleChange}
            rows={5}
          />
        </div>

        <button
          className={`form-submit ${sent ? "form-submit--sent" : ""}`}
          onClick={handleSubmit}
        >
          {sent ? "✓ Opening mail app..." : "Send Message →"}
        </button>
      </div>

      <div className="form-socials">
        <a href="https://wa.me/27718185667" target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.946 7.946 0 0 1-4.078-1.123l-.292-.174-3.117.884.846-3.083-.189-.308A7.946 7.946 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/bobaheavenls" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
        </a>
        <a href="https://www.tiktok.com/%40bobaheaven_ls" target="_blank" rel="noreferrer" aria-label="TikTok">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

// ── Chatbot ──
function Chatbot() {
  const [messages, setMessages] = useState([
    newMsg("bot", "Hey there! 👋 I'm Boba, your virtual assistant."),
    newMsg("bot", "Ask me anything or pick a topic below!"),
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState(QUICK_REPLIES);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendBotReplies = (key) => {
    const replies = RESPONSES[key] || RESPONSES.default;
    setTyping(true);
    setQuickReplies([]);
    replies.forEach((reply, i) => {
      setTimeout(() => {
        setMessages(prev => [...prev, newMsg("bot", reply, typeof reply !== "string")]);
        if (i === replies.length - 1) {
          setTyping(false);
          setQuickReplies(QUICK_REPLIES);
        }
      }, TYPING_DELAY * (i + 1));
    });
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, newMsg("user", text)]);
    setInput("");
    setTimeout(() => sendBotReplies(getResponseKey(text)), 300);
  };

  const handleQuickReply = (qr) => {
    setMessages(prev => [...prev, newMsg("user", qr.label)]);
    setTimeout(() => sendBotReplies(qr.key), 300);
  };

  return (
    <div className="chat-wrapper">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-avatar">
          <img src={logo} alt="Boba Heaven" className="chat-logo" />
        </div>
        <div className="chat-header-info">
          <span className="chat-header-name">{BOT_NAME} · Boba Heaven LS</span>
          <span className="chat-header-status">
            <span className="status-dot" /> Online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`msg-row msg-row--${msg.from}`}>
            {msg.from === "bot" && (
              <div className="msg-avatar">
                <img src={logo} alt="bot" className="msg-avatar-img" />
              </div>
            )}
            <div className={`msg-bubble msg-bubble--${msg.from}`}>
              {msg.isJSX ? msg.content : <span>{msg.content}</span>}
              <span className="msg-time">{msg.time}</span>
            </div>
          </div>
        ))}
        {typing && (
          <div className="msg-row msg-row--bot">
            <div className="msg-avatar">
              <img src={logo} alt="bot" className="msg-avatar-img" />
            </div>
            <div className="msg-bubble msg-bubble--bot typing-bubble">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      {quickReplies.length > 0 && (
        <div className="quick-replies">
          {quickReplies.map((qr) => (
            <button key={qr.key} className="quick-reply-btn" onClick={() => handleQuickReply(qr)}>
              {qr.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="chat-input-row">
        <input
          className="chat-input"
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="chat-send-btn" onClick={handleSend} aria-label="Send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Page ──
export default function Contact() {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <div className="contact-page">
  <Navbar />

  <div className="contact-layout">
    <ContactForm />

    {/* Desktop chatbot */}
    <div className="desktop-chat">
      <Chatbot />
    </div>
  </div>

  {/* Mobile floating widget */}
  <button
    className="chat-widget-btn"
    onClick={() => setChatOpen(true)}
  >
    <img src={logo} alt="Chat" />
  </button>

  {/* Mobile modal */}
  {chatOpen && (
    <div
      className="chat-modal-overlay"
      onClick={() => setChatOpen(false)}
    >
      <div
        className="chat-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="chat-modal-header">
          <span>Boba Assistant</span>

          <button
            className="chat-modal-close"
            onClick={() => setChatOpen(false)}
          >
            ✕
          </button>
        </div>

        <Chatbot />
      </div>
    </div>
  )}
</div>
  );
}