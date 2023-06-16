import axios from "axios";

const api = axios.create({
  baseURL: "https://wiremap.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFTOKEN": "voikk27qkz7EuHmwuYQxQRmEYZ7Lsbxu26u0iF2UX46eKPzUnylokAYJoGMHueEi",
  },
});

export default api;
