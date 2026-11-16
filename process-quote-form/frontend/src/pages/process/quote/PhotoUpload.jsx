import { useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { MAX_PHOTOS, PHOTO_ACCEPT, isAcceptedPhoto, photoToBase64 } from "@/lib/photos";
import { cn } from "@/lib/utils";

// photos: [{ id, preview, data }] where data is the base64 string once processing finishes (null until then).
export const PhotoUpload = ({ photos, setPhotos }) => {
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);

  const addFiles = (fileList) => {
    const files = Array.from(fileList);
    const accepted = files.filter(isAcceptedPhoto);
    const room = MAX_PHOTOS - photos.length;
    const chosen = accepted.slice(0, Math.max(room, 0));
    const notes = [];
    if (accepted.length < files.length) notes.push("Only JPG, PNG or WebP photos can be added.");
    if (accepted.length > chosen.length) notes.push(`You can add up to ${MAX_PHOTOS} photos.`);
    setMessage(notes.join(" "));

    chosen.forEach((file) => {
      const id = `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`;
      const preview = URL.createObjectURL(file);
      setPhotos((prev) => [...prev, { id, preview, data: null }]);
      photoToBase64(file)
        .then((data) => setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, data } : p))))
        .catch(() => {
          URL.revokeObjectURL(preview);
          setPhotos((prev) => prev.filter((p) => p.id !== id));
          setMessage(`We couldn't read ${file.name}. Try a different photo.`);
        });
    });
  };

  const remove = (photo) => {
    URL.revokeObjectURL(photo.preview);
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setMessage("");
  };

  const full = photos.length >= MAX_PHOTOS;

  return (
    <div>
      <p className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.16em]">
        Photos of your trade-in
        <span className="ml-1.5 font-semibold normal-case tracking-normal text-muted-foreground">(optional)</span>
      </p>
      <label
        htmlFor="tradeInPhotos"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); if (!full) addFiles(e.dataTransfer.files); }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed px-6 py-10 text-center transition-colors focus-within:ring-2 focus-within:ring-primary/30",
          dragging ? "border-primary bg-primary/10" : "border-input hover:border-primary",
          full && "cursor-not-allowed opacity-50",
        )}
      >
        <ImagePlus aria-hidden="true" className="h-8 w-8 text-primary" />
        <span className="font-semibold">Tap to add photos, or drag them here</span>
        <span className="text-sm text-muted-foreground">Front, back, interior and odometer help most. Up to {MAX_PHOTOS} photos (JPG, PNG or WebP).</span>
        <input
          id="tradeInPhotos"
          data-testid="field-tradeInPhotos"
          type="file"
          accept={PHOTO_ACCEPT}
          multiple
          disabled={full}
          onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
          className="sr-only"
        />
      </label>
      {message && <p role="alert" className="mt-2 text-sm font-medium text-destructive">{message}</p>}
      {photos.length > 0 && (
        <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {photos.map((p, i) => (
            <li key={p.id} className="relative aspect-square overflow-hidden border border-border bg-background">
              <img src={p.preview} alt={`Trade-in photo ${i + 1}`} className="h-full w-full object-cover" />
              {!p.data && (
                <span className="absolute inset-0 flex items-center justify-center bg-background/70">
                  <Loader2 aria-label="Preparing photo" className="h-5 w-5 animate-spin" />
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(p)}
                aria-label={`Remove photo ${i + 1}`}
                className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center bg-foreground text-background hover:bg-primary hover:text-primary-foreground"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
