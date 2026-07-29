import { useState, useEffect, useRef } from "react";
import { PRIORITY_COLORS, STATUS_COLORS } from "../utils/constants";
import { suggestReply } from "../services/ticketService";
import { Spinner } from "./FeedbackStates";

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function TicketDetail({ ticket, user, onAddComment, onUpdateStatus, onClose }) {
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDraft, setAiDraft] = useState("");
  const [aiError, setAiError] = useState("");
  const overlayRef = useRef(null);
  const inputRef = useRef(null);

  const priority = PRIORITY_COLORS[ticket.priority] || PRIORITY_COLORS.Low;
  const status = STATUS_COLORS[ticket.status] || STATUS_COLORS.Open;
  const isAgentOrAdmin = user?.role === "agent" || user?.role === "admin";

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!commentText.trim() || submitting) return;
    setSubmitting(true);
    try {
      await onAddComment(ticket._id, commentText.trim());
      setCommentText("");
      setAiDraft("");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSuggestReply() {
    setAiLoading(true);
    setAiError("");
    try {
      const { reply } = await suggestReply(ticket._id);
      setAiDraft(reply);
    } catch (err) {
      setAiError(err.response?.data?.error || err.message || "Failed to generate reply");
    } finally {
      setAiLoading(false);
    }
  }

  function handleUseDraft() {
    setCommentText(aiDraft);
    setAiDraft("");
  }

  async function handleResolve() {
    try {
      await onUpdateStatus(ticket._id, "Resolved");
    } catch {
      // error handled upstream
    }
  }

  const isResolved = ticket.status === "Resolved";

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-title"
    >
      <div className="bg-surface dark:bg-slate-800 rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-black/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-surface/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-border dark:border-slate-700/50 px-6 py-4 flex items-center justify-between z-10">
          <h2 id="ticket-title" className="text-lg font-bold text-slate-900 dark:text-slate-100 pr-4 line-clamp-1">{ticket.subject}</h2>
          <button
            onClick={onClose}
            className="shrink-0 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Close dialog"
          >
            <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${priority.bg} ${priority.text} ${priority.darkBg} ${priority.darkText}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
              {ticket.priority}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${status.bg} ${status.text} ${status.darkBg} ${status.darkText}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {ticket.status}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">{ticket.category}</span>
            {isAgentOrAdmin && !isResolved && (
              <button
                onClick={handleResolve}
                className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Resolve
              </button>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Comments ({ticket.comments.length})
            </h3>

            {ticket.comments.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-4 py-4 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl">No comments yet</p>
            ) : (
              <div className="space-y-2 mb-4">
                {ticket.comments.map((comment) => (
                  <div key={comment._id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 animate-slide-in-right">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{comment.author}</span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">{timeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}

            {aiDraft && (
              <div className="mb-3 p-4 rounded-xl border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-900/20 animate-slide-up">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-violet-700 dark:text-violet-400">AI Suggested Reply</span>
                  <button
                    onClick={handleUseDraft}
                    className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                  >
                    Use as comment
                  </button>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{aiDraft}</p>
              </div>
            )}

            {aiError && (
              <p className="text-xs text-red-500 dark:text-red-400 mb-3">{aiError}</p>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
              <textarea
                ref={inputRef}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                rows={2}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border dark:border-slate-700 text-sm bg-surface dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:border-violet-400 transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <div className="flex gap-2 self-end">
                {isAgentOrAdmin && !aiDraft && (
                  <button
                    type="button"
                    onClick={handleSuggestReply}
                    disabled={aiLoading}
                    className="px-3 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium rounded-xl text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                    title="Suggest AI reply"
                  >
                    {aiLoading ? (
                      <Spinner size="sm" className="!text-slate-400" />
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                      </svg>
                    )}
                    {aiLoading ? "Thinking..." : "Suggest"}
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!commentText.trim() || submitting}
                  className="px-4 py-2.5 bg-violet-600 text-white font-medium rounded-xl text-sm hover:bg-violet-700 active:bg-violet-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {submitting ? (
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : null}
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
