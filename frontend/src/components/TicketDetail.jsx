import { useState } from "react";
import TicketCard from "./TicketCard";

export default function TicketDetail({ ticket, onAddComment, onClose }) {
  const [commentText, setCommentText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(ticket.id, commentText.trim());
    setCommentText("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold text-text">{ticket.subject}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <TicketCard ticket={ticket} />
        </div>

        <div className="p-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{ticket.description}</p>
        </div>

        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Comments ({ticket.comments.length})
          </h3>

          {ticket.comments.length === 0 ? (
            <p className="text-sm text-gray-400 mb-4">No comments yet.</p>
          ) : (
            <div className="space-y-3 mb-6">
              {ticket.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text">{comment.author}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{comment.text}</p>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="px-4 py-2 bg-primary text-white font-medium rounded-lg text-sm hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
