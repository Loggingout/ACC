// TagListInput.jsx — small reusable chip-list editor for milk/sugar option arrays
import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function TagListInput({ label, values, onChange }) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const value = draft.trim();
    if (!value || values.includes(value)) return;
    onChange([...values, value]);
    setDraft("");
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-white/70 mb-2">{label}</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {values.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white text-xs"
          >
            {tag}
            <button type="button" onClick={() => onChange(values.filter((v) => v !== tag))} aria-label={`Remove ${tag}`}>
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder={`Add ${label.toLowerCase()}…`}
          className="flex-1 px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="button"
          onClick={addTag}
          className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Add"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
