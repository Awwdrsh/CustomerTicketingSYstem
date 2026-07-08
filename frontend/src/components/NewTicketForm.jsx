import { useState } from "react";

const categories = ["Account", "Billing", "Technical", "Bug Report", "Feature Request"];
const priorities = ["Low", "Medium", "High"];

export default function NewTicketForm({ onSubmit }) {
  const [form, setForm] = useState({
    subject: "",
    description: "",
    category: "",
    priority: "",
  });
  const [errors, setErrors] = useState({});

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

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({
      subject: form.subject.trim(),
      description: form.description.trim(),
      category: form.category,
      priority: form.priority,
    });
    setForm({ subject: "", description: "", category: "", priority: "" });
  }

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorClass = "text-xs text-danger mt-1";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
      <h2 className="text-lg font-semibold text-text">Create New Ticket</h2>

      <div>
        <label className={labelClass}>Subject</label>
        <input
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
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className={inputClass}
          placeholder="Detailed description of the issue"
        />
        {errors.description && <p className={errorClass}>{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category</label>
          <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className={errorClass}>{errors.category}</p>}
        </div>

        <div>
          <label className={labelClass}>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange} className={inputClass}>
            <option value="">Select priority</option>
            {priorities.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.priority && <p className={errorClass}>{errors.priority}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white font-medium rounded-lg text-sm hover:bg-primary-dark transition-colors duration-200"
      >
        Submit Ticket
      </button>
    </form>
  );
}

