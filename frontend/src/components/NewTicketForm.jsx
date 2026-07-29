import { useState } from "react";
import { CATEGORIES, PRIORITIES } from "../utils/constants";

export default function NewTicketForm({ onSubmit }) {
  const [form, setForm] = useState({
    subject: "",
    description: "",
    category: "",
    priority: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errs = {};
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.category) errs.category = "Please select a category";
    if (!form.priority) errs.priority = "Please select a priority";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        subject: form.subject.trim(),
        description: form.description.trim(),
        category: form.category,
        priority: form.priority,
      });
      setForm({ subject: "", description: "", category: "", priority: "" });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-border dark:border-slate-700 text-sm bg-surface dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:border-violet-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500";
  const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";
  const errorClass = "text-xs text-red-500 dark:text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="subject" className={labelClass}>Subject</label>
        <input
          id="subject"
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className={inputClass}
          placeholder="Brief summary of the issue"
        />
        {errors.subject && <p className={errorClass}>{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Detailed description of the issue"
        />
        {errors.description && <p className={errorClass}>{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className={labelClass}>Category</label>
          <select id="category" name="category" value={form.category} onChange={handleChange} className={inputClass}>
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className={errorClass}>{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="priority" className={labelClass}>Priority</label>
          <select id="priority" name="priority" value={form.priority} onChange={handleChange} className={inputClass}>
            <option value="">Select priority</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.priority && <p className={errorClass}>{errors.priority}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto px-6 py-2.5 bg-violet-600 text-white font-medium rounded-xl text-sm hover:bg-violet-700 active:bg-violet-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </>
        ) : (
          "Submit Ticket"
        )}
      </button>
    </form>
  );
}
