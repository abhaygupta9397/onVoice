import { useState, forwardRef, useImperativeHandle } from "react";
import SearchBar from "./SearchBar.jsx";
import ProductCard from "./ProductCard.jsx";
import { parseSearchQuery } from "../utils/searchNlp.js";
import { searchProducts } from "../utils/searchEngine.js";

function SearchPaneImpl({ onAddToList, speakOut, onStatus }, ref) {
  const [searchResults, setSearchResults] = useState([]);
  const [lastQuery, setLastQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  const runSearch = (q) => {
    setInputValue(String(q || ""));
    const parsed = parseSearchQuery(q);
  if (!parsed.intent || !parsed.item) {
      const msg = "Do you want apples, or apple juice?";
      onStatus?.(msg);
      speakOut?.(msg);
      setLastQuery(q);
      setSearchResults([]);
      return;
    }

    setLastQuery(parsed.item);
  const filters = parsed.filters || {};
    const results = searchProducts({ item: parsed.item, filters });
    setSearchResults(results);
    if (results.length) {
      const pricePart = filters?.maxPrice
        ? ` under ${filters.maxPrice} rupees`
        : "";
      const brandPart = filters?.brand ? ` from ${filters.brand}` : "";
      const sizePart = filters?.size ? ` size ${filters.size}` : "";
      const sum = `I found ${results.length} ${parsed.item}${pricePart}${brandPart}${sizePart}.`;
      onStatus?.(sum);
      speakOut?.(sum);
    } else {
      const sum = `Sorry, I couldn't find ${parsed.item} with those filters.`;
      onStatus?.(sum);
      speakOut?.(sum);
    }
  };

  // Expose imperative API for voice to trigger searches
  useImperativeHandle(ref, () => ({
    runSearch,
    clear: () => {
      setLastQuery("");
      setSearchResults([]);
      setInputValue("");
    },
  }));

  return (
    <div className="w-full rounded-xl border border-blue-100 bg-white p-3 dark:bg-slate-800 dark:border-slate-700">
      <h2 className="mb-3 text-base sm:text-lg font-medium text-blue-800 dark:text-blue-300">
        Search
      </h2>

      <SearchBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={runSearch}
      />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {searchResults.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={(prod) => onAddToList?.(prod)}
          />
        ))}
      </div>

      {searchResults.length === 0 && lastQuery && (
        <p className="mt-3 text-sm text-gray-600 dark:text-slate-300">
          No results found.
        </p>
      )}
    </div>
  );
}

const SearchPane = forwardRef(SearchPaneImpl);

export default SearchPane;
