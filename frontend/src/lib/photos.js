export const MAX_PHOTOS = 5;
const MAX_SIDE = 1600;
const QUALITY = 0.82;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

export const PHOTO_ACCEPT = ACCEPTED.join(",");
export const isAcceptedPhoto = (file) => ACCEPTED.includes(file.type);

// Downscale + re-encode as JPEG so a phone photo (5-10 MB) becomes a few hundred KB.
// Resolves to a bare base64 string (no "data:" prefix), which is what /api/lead expects.
export const photoToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff"; // flatten transparent PNGs
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", QUALITY).split(",")[1]);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("decode failed"));
    };
    img.src = url;
  });
