function Navbar({ isDark, onToggleTheme }) {
  return (
  <header className="border-b border-blue-100 bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight text-blue-700 dark:text-blue-300">
          onVoice
        </h1>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
            title="Toggle theme"
          >
            <span className="text-lg" aria-hidden="true">
              {isDark ? "\ud83c\udf19" : "\u2600\ufe0f"}
            </span>
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
