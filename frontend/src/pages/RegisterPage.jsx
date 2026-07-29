import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await register(form.name, form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-border dark:border-slate-700 text-sm bg-surface dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:focus:border-violet-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500";

  return (
    <div className="min-h-screen bg-bg dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/25">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Create account</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Get started with HelpDeskLite</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface dark:bg-slate-800/50 rounded-2xl border border-border dark:border-slate-700/50 p-6 space-y-4">
          {error && (
            <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3">{error}</div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Name</label>
            <input id="name" type="text" name="name" value={form.name} onChange={handleChange}
              className={inputClass}
              placeholder="Your name" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
            <input id="email" type="email" name="email" value={form.email} onChange={handleChange}
              className={inputClass}
              placeholder="you@example.com" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <input id="password" type="password" name="password" value={form.password} onChange={handleChange}
              className={inputClass}
              placeholder="At least 6 characters" />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Confirm Password</label>
            <input id="confirmPassword" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
              className={inputClass}
              placeholder="Repeat your password" />
          </div>

          <button type="submit" disabled={submitting}
            className="w-full py-2.5 bg-violet-600 text-white font-medium rounded-xl text-sm hover:bg-violet-700 active:bg-violet-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {submitting ? (
              <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Creating account...</>
            ) : "Create account"}
          </button>

          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-600 dark:text-violet-400 font-semibold hover:text-violet-700 dark:hover:text-violet-300">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
