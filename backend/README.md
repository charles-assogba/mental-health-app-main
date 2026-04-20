# REST API Express.js dengan TypeScript, Prisma & MySQL

API modern berbasis RESTful yang dibangun menggunakan Express.js, TypeScript, Prisma ORM, dan MySQL. Projek ini mencakup, validasi data, operasi CRUD, dan penanganan error yang baik.

## Fitur Utama

✅ **TypeScript** - Keamanan tipe dan fitur JavaScript modern  
✅ **Prisma ORM** - Query database dengan type-safe dan migrasi  
✅ **MySQL** - Database relasional yang handal  
✅ **Express.js** - Framework web minimalis dan cepat  
✅ **Validasi** - Validasi request menggunakan express-validator  
✅ **Penanganan Error** - Middleware error handling global  
✅ **Environment Variables** - Manajemen konfigurasi dengan dotenv  
✅ **ESLint + Prettier** - Kualitas kode dan format otomatis

## Prasyarat

- Node.js 18+
- MySQL 8+

## Cara Penggunaan

1. Jangan lupa nyalaiin server MySQL (XAMPP / Laragon / systemctl)

2. Install dependency node

```sh
npm install
```

3. Cek environment variable `.env` sudah benar semua

- Tip: Rename `.env.example` menjadi `.env`
- Contoh `.env` yang benar:

```.env
# Format: mysql://username:password@host:port/nama_database
DATABASE_URL="mysql://root@127.0.0.1:3306/prisma_testdb"
# Output: http://localhost:3000
SERVER_PORT=3000
```

4. Migrate database:

```sh
npm run migrate
```

5. Jika migration gagal, jalankan:

```sh
npm run reset
```

6. Jalankan server development:

```sh
npm run dev
```

7. Kunjungi `http://localhost:3000/`:

```json
{
    "msg": "API sehat",
    "toyota": "🚗 👍"
}
```
