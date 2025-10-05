# 🪨 Granite App

Integrasi model **IBM Granite** melalui Replicate API dengan beberapa contoh implementasi, mulai dari basic usage hingga aplikasi web sederhana.

---

## 🚀 Setup

1. **Clone repo atau extract zip**
   ```bash
   git clone https://github.com/username/granite-app.git
   cd granite-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Buat file `.env` di root project** dan isi dengan token Replicate API:
   ```env
   REPLICATE_API_TOKEN=your_api_token_here
   ```

4. **Jalankan contoh sesuai kebutuhan**
   - Contoh basic call Granite:
     ```bash
     node beginner/index.js
     ```
   - Contoh aplikasi kecil integrasi Granite:
     ```bash
     node ai-powered-app/index.js
     ```
   - Web App (Express + Frontend):
     ```bash
     npm start
     ```
     lalu buka di browser: [http://localhost:3000](http://localhost:3000)

---

## 📂 Struktur Project

```bash
granite-app/
├── beginner/           # contoh sederhana panggil Granite model
│   └── index.js
├── ai-powered-app/     # contoh aplikasi kecil integrasi Granite
│   ├── index.js
│   └── utils.js
├── web-app/            # web app dengan Express + frontend
│   ├── scripy/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   └── server.js
├── public/             # static assets (opsional untuk Firebase hosting)
├── .env                # simpan token API di sini
├── package.json
└── README.md
```

---

## 💡 Contoh Request API

### Backend (`server.js`)
Endpoint tersedia di:
```http
POST /api/chat
```

Request body:
```json
{
  "prompt": "Jelaskan singkat tentang AI Granite."
}
```

Response:
```json
{
  "response": "Granite adalah model bahasa dari IBM yang dioptimalkan untuk..."
}
```

---

## ⚡ Catatan

- **Jangan hardcode token API** di file frontend (`script.js`). Simpan di `.env` untuk keamanan.  
- Gunakan backend (Express) untuk handle request ke Replicate API.  
- Model default yang digunakan:
  ```
  ibm-granite/granite-3.3-8b-instruct
  ```

---

## 📜 License

MIT License © 2025
