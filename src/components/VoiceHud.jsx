export default function VoiceHud({ listening, interim, finalText }) {
  const text = listening ? interim || finalText : finalText;
  const show = Boolean(listening || text);
  if (!show) return null;

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-2 text-sm dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-center gap-2">
        <div className="flex-none">
          {listening ? (
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
          ) : (
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-300" />
          )}
        </div>
        <div className="min-w-0 break-words text-sm text-gray-800 dark:text-slate-200" aria-live={listening ? "assertive" : "polite"} aria-atomic>
          {text || (listening ? "Listening…" : "")}
        </div>
      </div>
    </div>
  );
}
