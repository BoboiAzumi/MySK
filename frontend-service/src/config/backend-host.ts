const ev = import.meta.env.VITE_ENVIRONMENT
export const BackendUrl = ev.toUpperCase() == "DEVELOPMENT" ? `http://localhost:3000` : ev.toUpperCase() == "SPLIT" ? import.meta.env.VITE_BACKEND_URL : "/api"