import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-fade-in">
      <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center">
        <span className="text-4xl font-bold text-violet-500">404</span>
      </div>
      <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Page not found</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Dashboard
      </Link>
    </div>
  );
}
