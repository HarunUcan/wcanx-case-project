# WcanX Case Project

WcanX Case Project, Next.js (Frontend), NestJS (Backend) ve MongoDB kullanılarak geliştirilmiş bir full‑stack web uygulamasıdır.
Proje Docker ve Docker Compose ile containerlaştırılmıştır ve tek komutla çalıştırılabilir.

---

## İçindekiler

- Genel Bakış
- Kullanılan Teknolojiler
- Proje Yapısı
- Kurulum
- Environment Değişkenleri
- Docker ile Çalıştırma
- Servisler
- Notlar

---

## Genel Bakış

Bu proje, kullanıcıların finansal işlemlerini yönetebileceği, gelir gider takibi yapabileceği bir case uygulamasıdır.
Frontend ve backend birbirinden bağımsızdır ve MongoDB üzerinde veri saklanır.

Tüm sistem Docker ortamında çalışacak şekilde yapılandırılmıştır.

---

## Kullanılan Teknolojiler

### Frontend
- Next.js 16
- React
- Tailwind CSS
- Recharts Grafik Kütüphanesi
- Dark/Light Tema (next-themes)

### Backend
- NestJS
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt Hashing Kütüphanesi

### DevOps
- Docker
- Docker Compose

---

## Proje Yapısı

```
wcanx-case-project
│
├── backend
│   ├── Dockerfile
│   └── .env (opsiyonel)
│
├── frontend
│   ├── Dockerfile
│   └── .env.local (zorunlu)
│
├── .env.example
├── docker-compose.yml
└── README.md
```

---

## Kurulum

### Gereksinimler

- Docker Desktop (Windows/Mac) veya Docker Engine (Linux)
- Docker Compose (Docker Desktop ile birlikte gelir)
- Terminalde Docker komutları çalıştırılırken Docker Desktop açık olmalıdır.

Kontrol etmek için:

```bash
docker --version
docker compose version
```

---

## Environment Değişkenleri

### Root .env

Projenin root dizininde `.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp .env.example .env
```

Örnek içerik:

```env
PORT=4000
JWT_SECRET=super-secret-change-me
JWT_EXPIRES_IN=86400
MONGO_URI=mongodb://root:rootpass@mongo:27017/wcanx_budget?authSource=admin
```

### Frontend .env.local (Zorunlu)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Bu dosya manuel olarak oluşturulmalıdır.

---

## Docker ile Çalıştırma

```bash
docker compose up -d --build
```

---

## Servisler

| Servis | Adres |
|------|------|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:4000 |

---

## Durdurma

```bash
docker compose down
```

---

## Notlar

- Proje Docker ortamında sorunsuz çalışır
- Frontend .env.local dosyası zorunludur
- MongoDB verileri volume üzerinde saklanır

---

## Geliştirici

Harun Uçan
