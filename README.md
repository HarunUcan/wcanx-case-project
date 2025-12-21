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
- Case Gereksinim Kontrol Tablosu
- Proje Görselleri

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
# Backend
PORT=4000
JWT_SECRET=super-secret-change-me
JWT_EXPIRES_IN=86400
JWT_REFRESH_SECRET=super-secret-refresh-change-me
JWT_REFRESH_EXPIRES_IN=604800

# Mongo (Docker içi)
MONGO_URI=mongodb://root:rootpass@mongo:27017/wcanx_budget?authSource=admin
```

### Frontend .env.local (Zorunlu)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

⚠️ÖNEMLİ: Bu dosya manuel olarak 'frontend/.env.local' yoluna oluşturulmalıdır.

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

## Case Gereksinim Kontrol Tablosu

### Gereksinimler

| Gereksinim              | Açıklama                                      | Durum |
| ----------------------- | --------------------------------------------- | :---: |
| Kullanıcı Kaydı         | Kullanıcıların sisteme kayıt olabilmesi       |   ✔   |
| Kullanıcı Girişi        | JWT tabanlı giriş sistemi                     |   ✔   |
| JWT Authentication      | Kimlik doğrulama için JWT kullanımı           |   ✔   |
| Şifre Güvenliği         | Şifrelerin bcrypt ile hash’lenmesi            |   ✔   |
| Refresh Token Güvenliği | Refresh token'ın bcrypt ile hash’lenmesi      |   ✔   |
| Protected Routes        | Yetkisiz erişimlerin engellenmesi             |   ✔   |
| Gelir Ekleme            | Kullanıcıya ait gelir kaydı oluşturma         |   ✔   |
| Gider Ekleme            | Kullanıcıya ait gider kaydı oluşturma         |   ✔   |
| Kayıt Listeleme         | Kullanıcının kendi kayıtlarını görebilmesi    |   ✔   |
| Kayıt Silme             | Gelir / gider kayıtlarını silebilme           |   ✔   |
| Yetkilendirme           | Kullanıcı sadece kendi verilerine erişebilir  |   ✔   |
| Dashboard               | Özet bilgilerin dashboard ekranında gösterimi |   ✔   |
| Gelir / Gider Grafiği   | Aylık gelir–gider karşılaştırması             |   ✔   |
| Kategori Bazlı Grafik   | Giderlerin kategori dağılımı                  |   ✔   |
| Hata Yönetimi           | Temel exception & hata yönetimi               |   ✔   |


### Opsiyonel (Ekstra) Gereksinimler

| Gereksinim         | Açıklama                                      | Durum |
| ------------------ | --------------------------------------------- | :---: |
| Jeton Yenileme     | Access token süresi dolunca otomatik yenileme |   ✔   |
| İşlem Düzenleme    | Gelir / gider kayıtlarını güncelleme          |   ✔   |
| Aylık Filtreleme   | Ay/yıl bazlı veri filtreleme                  |   ✔   |
| Dark / Light Mode  | Koyu & açık tema desteği                      |   ✔   |
| Docker Kullanımı   | Docker & docker-compose entegrasyonu          |   ✔   |


---


## Proje Görselleri
### Açık Tema
<img width="1366" height="887" alt="screencapture-localhost-3000-dashboard-2025-12-21-02_56_33" src="https://github.com/user-attachments/assets/4e03c5c5-b273-46a2-be3b-c0fd40d07447" />
<img width="1366" height="763" alt="screencapture-localhost-3000-register-2025-12-21-02_41_52" src="https://github.com/user-attachments/assets/81ff9461-e184-4d21-940f-85ebc89fc677" />
<img width="1366" height="599" alt="screencapture-localhost-3000-login-2025-12-21-02_42_21" src="https://github.com/user-attachments/assets/15fc8b52-350e-4ff3-a476-37879601b75f" />
<img width="1366" height="642" alt="screencapture-localhost-3000-transactions-2025-12-21-02_43_23" src="https://github.com/user-attachments/assets/b8773404-ca8d-4b5e-bfe7-20660c793f1f" />

### Koyu Tema
<img width="1366" height="887" alt="screencapture-localhost-3000-dashboard-2025-12-21-05_25_43" src="https://github.com/user-attachments/assets/c5569c9d-6a14-4b56-add8-a028efd6e88c" />
<img width="1366" height="763" alt="screencapture-localhost-3000-register-2025-12-21-05_27_46" src="https://github.com/user-attachments/assets/13796277-b64a-4b4d-a3f4-275c876f8e2f" />
<img width="1366" height="788" alt="screencapture-localhost-3000-transactions-2025-12-21-05_26_00" src="https://github.com/user-attachments/assets/fbd44945-f3ca-4eaf-acf1-4254af733203" />
<img width="1366" height="599" alt="screencapture-localhost-3000-login-2025-12-21-05_27_23" src="https://github.com/user-attachments/assets/226508fa-1946-450c-b17a-358dcd13ba37" />


---

## Geliştirici

Harun Uçan
