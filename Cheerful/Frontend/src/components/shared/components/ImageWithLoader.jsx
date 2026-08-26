// ImageWithLoader.jsx — shows a pulse skeleton until the image finishes loading (or a fallback on error)
import { useState } from "react";

export default function ImageWithLoader({ src, alt, className = "", imgClassName = "", ...props }) {
  const [status, setStatus] = useState("loading"); // loading | loaded | error

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {status === "loading" && <div className="absolute inset-0 bg-white/10 animate-pulse" />}
      {status === "error" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 text-white/30 text-[11px] text-center px-2">
          Image unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`${imgClassName} transition-opacity duration-300 ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
          {...props}
        />
      )}
    </div>
  );
}
