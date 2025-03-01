// config.ts
export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3333",
  CLOUDINARY_API_KEY:
    import.meta.env.VITE_CLOUDINARY_API_KEY || "886132447392463",
  CLOUDINARY_API_SECRET:
    import.meta.env.VITE_CLOUDINARY_API_SECRET || "WVXBK5SJRA6ib0Tj9G6VwETNWq0",
  CLOUDINARY_CLOUD_NAME:
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dqrcywqyg",
  CLOUDINARY_PRESET: import.meta.env.VITE_CLOUDINARY_PRESET || "user-profile",
  VITE_STRIPE_PK:
    import.meta.env.VITE_STRIPE_PK ||
    "pk_test_51QtM40FPx9xIDyIQ5jcOcxsQ1xAKdRxopM9EnG0a5RRQbOplMEMC2xYOnEQrJySkkxMScWi5jDdVgcnPK6dASCIU00QPnXGh1q",
};
