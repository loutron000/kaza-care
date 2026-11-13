import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ChatSidebar from "../components/ChatSidebar";
import logo from "../assets/logo.png";
import "./SymptomChecker.css";

const observationOptions = [
  "Watery white / mucoid",
  "Greenish / sulfur tint",
  "Normal dry droppings",
  "I haven't inspected litter yet",
];

function SymptomChecker() {
  const { user } = useAuth();

  const farmerName = user?.user_metadata?.full_name?.trim() || "Farmer";
  const firstName = farmerName.split(" ")[0];

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notice, setNotice] = useState("");
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const hasConversation = messages.length > 0;

  const visibleMessages = messages.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleNewChat() {
    setMessages([]);
    setMessage("");
    setAttachment(null);
    setNotice("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleAttachment(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setNotice("Please select an image file.");
      event.target.value = "";
      return;
    }

    setAttachment(file);
    setNotice("");
  }

  function handleObservation(option) {
    setMessage((current) => (current ? `${current} ${option}` : option));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage && !attachment) return;

    const newMessage = {
      id: `${Date.now()}-${Math.random()}`,
      text: trimmedMessage,
      attachmentName: attachment?.name || null,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((current) => [...current, newMessage]);
    setMessage("");
    setAttachment(null);
    setNotice("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleExport() {
    if (!hasConversation) return;

    const log = [
      "Kaza Care - Symptom Checker Notes",
      `Farmer: ${farmerName}`,
      `Exported: ${new Date().toLocaleString()}`,
      "",
      ...messages.map((item) => {
        const attachmentText = item.attachmentName
          ? `\nAttachment selected: ${item.attachmentName}`
          : "";

        return `[${item.time}] ${farmerName}: ${item.text}${attachmentText}`;
      }),
      "",
      "Note: These are farmer-submitted notes. They have not been assessed by an AI model or verified by a veterinarian.",
    ].join("\n");

    const blob = new Blob([log], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.download = "kaza-care-symptom-notes.txt";
    downloadLink.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="symptom-layout">
      <ChatSidebar
        onNewChat={handleNewChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="symptom-main">
        <header className="symptom-topbar">
          <Link to="/farmer/dashboard" className="symptom-back-link">
            <span aria-hidden="true">←</span>
            Intake Overview
          </Link>

          <div className="symptom-topbar__actions">
            <button
              type="button"
              className="symptom-export-button"
              onClick={handleExport}
              disabled={!hasConversation}
            >
              Export Log
            </button>

            <button
              type="button"
              className="symptom-new-chat-button"
              onClick={handleNewChat}
            >
              + New Chat
            </button>
          </div>
        </header>

        <section className="symptom-disclaimer" role="note">
          <span className="symptom-disclaimer__icon" aria-hidden="true">
            !
          </span>
          <p>
            <strong>AI Guidance Only:</strong> This interface is for recording
            flock observations. It does not currently provide automated
            assessment or replace veterinary diagnosis. If birds are dying
            suddenly or showing severe distress, contact a veterinarian or
            animal-health worker promptly.
          </p>
        </section>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          id="symptom-image-upload"
          onChange={handleAttachment}
          hidden
        />

        {!hasConversation ? (
          <section className="symptom-welcome">
            <div className="symptom-welcome__content">
              <div className="symptom-welcome__icon">
                <img src={logo} alt="Kaza Care" />
              </div>

              <p className="symptom-welcome__eyebrow">
                YOUR FLOCK HEALTH ASSISTANT
              </p>

              <h1>
                Hello {firstName}, I'm <span>Kaza Care AI</span>
              </h1>

              <p className="symptom-welcome__description">
                Tell us what you've noticed about your flock, from breathing
                changes and droppings to feeding habits. You can describe your
                observations in your own words.
              </p>

              <form
                className="symptom-composer symptom-composer--welcome"
                onSubmit={handleSubmit}
              >
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Ask about flock symptoms, droppings, or Newcastle vaccines..."
                  rows={3}
                  aria-label="Describe your flock observations"
                />

                {attachment && (
                  <div className="symptom-attachment">
                    <span>📎 {attachment.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAttachment(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      aria-label="Remove attachment"
                    >
                      ×
                    </button>
                  </div>
                )}

                <div className="symptom-composer__bottom">
                  <div className="symptom-composer__tools">
                    <label
                      htmlFor="symptom-image-upload"
                      className="symptom-tool-button"
                    >
                      <span aria-hidden="true">＋</span>
                      Attach Coop Photo
                    </label>

                    <button
                      type="button"
                      className="symptom-tool-button"
                      onClick={() =>
                        setNotice(
                          "Voice notes are not available yet. You can type your observations instead.",
                        )
                      }
                    >
                      <span aria-hidden="true">🎙</span>
                      Voice Note
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="symptom-send-button"
                    aria-label="Submit observation"
                    disabled={!message.trim() && !attachment}
                  >
                    →
                  </button>
                </div>
              </form>

              {notice && (
                <p className="symptom-notice" role="status">
                  {notice}
                </p>
              )}

              <p className="symptom-welcome__footnote">
                Your observations help you keep a record of changes in your
                flock.
              </p>
            </div>
          </section>
        ) : (
          <section className="symptom-chat">
            <div className="symptom-chat__date">
              {new Date().toLocaleDateString([], {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>

            <div className="symptom-chat__messages">
              {visibleMessages.length > 0 ? (
                visibleMessages.map((item) => (
                  <article
                    className="symptom-message symptom-message--farmer"
                    key={item.id}
                  >
                    <div className="symptom-message__avatar">
                      {firstName.charAt(0).toUpperCase()}
                    </div>

                    <div className="symptom-message__body">
                      <div className="symptom-message__heading">
                        <strong>You</strong>
                        <time>{item.time}</time>
                      </div>

                      {item.text && <p>{item.text}</p>}

                      {item.attachmentName && (
                        <div className="symptom-message__attachment">
                          <span aria-hidden="true">📎</span>
                          {item.attachmentName}
                        </div>
                      )}
                    </div>
                  </article>
                ))
              ) : (
                <p className="symptom-search-empty">
                  No messages match your search.
                </p>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="symptom-unavailable" role="status">
              <strong>Automated assessment isn't connected yet.</strong>
              <p>
                Your observation has been added to this session, but Kaza Care
                AI cannot analyse it or provide a diagnosis at this stage.
                Please consult a qualified animal-health professional for
                advice.
              </p>
            </div>

            <div className="symptom-chat__composer-area">
              <div className="symptom-observations">
                <p>QUICK OBSERVATIONS</p>
                <div className="symptom-observations__options">
                  {observationOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => handleObservation(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <form className="symptom-composer" onSubmit={handleSubmit}>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Describe flock sounds, droppings, or feed intake changes in plain words..."
                  rows={2}
                  aria-label="Add another flock observation"
                />

                {attachment && (
                  <div className="symptom-attachment">
                    <span>📎 {attachment.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAttachment(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      aria-label="Remove attachment"
                    >
                      ×
                    </button>
                  </div>
                )}

                <div className="symptom-composer__bottom">
                  <div className="symptom-composer__tools">
                    <label
                      htmlFor="symptom-image-upload"
                      className="symptom-tool-button"
                    >
                      <span aria-hidden="true">＋</span>
                      Attach Photo
                    </label>

                    <button
                      type="button"
                      className="symptom-tool-button"
                      onClick={() =>
                        setNotice(
                          "Voice notes are not available yet. You can type your observations instead.",
                        )
                      }
                    >
                      <span aria-hidden="true">🎙</span>
                      Voice Note
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="symptom-send-button"
                    aria-label="Send observation"
                    disabled={!message.trim() && !attachment}
                  >
                    →
                  </button>
                </div>
              </form>

              {notice && (
                <p className="symptom-notice" role="status">
                  {notice}
                </p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default SymptomChecker;
