import { useEffect, useId, useRef, useState } from "react";
import { Upload } from "lucide-react";

/**
 * Image slot with an upload placeholder so photos can be swapped from the UI.
 * Uploaded images are kept for the session (object URL).
 */
export function EditableImage({
  src,
  alt,
  className = "",
  label = "بارگذاری تصویر",
}: {
  src?: string | undefined;
  alt: string;
  className?: string;
  label?: string;
}) {
  const [url, setUrl] = useState<string | undefined>(src);
  const objectUrl = useRef<string | null>(null);
  const inputId = useId();

  useEffect(() => {
    return () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    };
  }, []);

  return (
    <div className={`group relative overflow-hidden bg-secondary ${className}`}>
      {url ? (
        <img src={url} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-foreground/45">
          <Upload className="size-5" />
          <span className="text-[0.7rem]">{label}</span>
        </div>
      )}

      <label
        htmlFor={inputId}
        className="absolute inset-x-0 bottom-0 flex cursor-pointer items-center justify-center gap-1.5 bg-foreground/55 py-1.5 text-[0.7rem] text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100 max-md:opacity-100"
      >
        <Upload className="size-3.5" />
        {label}
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label={label}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
          const next = URL.createObjectURL(file);
          objectUrl.current = next;
          setUrl(next);
        }}
      />
    </div>
  );
}
