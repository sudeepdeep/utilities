/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export function LazyImage({ src, alt, className, ...props }: any) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => console.warn(`Failed to load image: ${src}`)}
      style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      {...props}
    />
  );
}
