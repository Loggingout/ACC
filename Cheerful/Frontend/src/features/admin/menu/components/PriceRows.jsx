// PriceRows.jsx — editable list of { size, price } rows for sized menu items
import { Plus, Trash2 } from "lucide-react";

export default function PriceRows({ prices, onChange }) {
  const rows = Object.entries(prices);

  const updateRow = (index, key, value) => {
    const next = [...rows];
    next[index] = key === "size" ? [value, next[index][1]] : [next[index][0], value];
    onChange(Object.fromEntries(next));
  };

  const removeRow = (index) => {
    const next = rows.filter((_, i) => i !== index);
    onChange(Object.fromEntries(next));
  };

  const addRow = () => {
    onChange({ ...prices, "": 0 });
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-white/70 mb-2">Sizes &amp; Prices</label>
      <div className="flex flex-col gap-2">
        {rows.map(([size, price], index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={size}
              onChange={(e) => updateRow(index, "size", e.target.value)}
              placeholder="small"
              className="flex-1 px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => updateRow(index, "price", Number(e.target.value))}
              className="w-24 px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => removeRow(index)}
              className="p-1.5 text-white/50 hover:text-red-400 transition-colors"
              aria-label="Remove size"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addRow}
        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors"
      >
        <Plus size={14} /> Add size
      </button>
    </div>
  );
}
