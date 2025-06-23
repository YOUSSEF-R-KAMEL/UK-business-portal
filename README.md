# UK Business Portal

A modern, responsive business management dashboard built with **Angular**, **NgRx**, and **PrimeNG**.
It supports **user and associate login**, dynamic routing, full CRUD features, and role-based navigation.

---

## 🚀 Features

* 🔐 User, Associate, and Admin login
* 🧑‍💼 Associate Management (Add, Edit, Delete)
* 📰 Article Management and Display
* 🌐 Role-based Navigation (Admin, User, Associate)
* ⚙️ NgRx State Management
* 💅 PrimeNG UI & PrimeFlex Styling
* 🔄 Real-time form validation and toasts
* 📦 JSON-Server API Simulation

---

## 📸 Screenshots

> Add screenshots of Home, Login, Associates, Articles pages
> (You can upload images to the GitHub `issues` and copy the image link)

---

## 🔧 Tech Stack

* **Angular 17+**
* **NgRx Store + Effects + Entity**
* **PrimeNG + PrimeFlex**
* **SCSS / Tailwind (optional)**
* **RxJS**
* **JSON Server (mock backend)**

---

## ⚡ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/YOUSSEF-R-KAMEL/UK-business-portal.git
cd UK-business-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run JSON Server

```bash
npx json-server --watch db.json --port 3000
```

### 4. Run Angular App

```bash
ng serve
```

> App runs at `http://localhost:4200`

---

## 👤 User Roles

* **Admin** → Full access (Manage articles, users, and associates)
* **User** → Access articles only
* **Associate** → Access dashboard & personal info only

---

## 🎓 About Developer

Built with dedication by **Youssef Raafat Kamel**.
Contact: [se.youssefrafat@gmail.com](mailto:se.youssefrafat@gmail.com)

[![GitHub](https://img.shields.io/badge/GitHub--blue?style=social\&logo=github)](https://github.com/YOUSSEF-R-KAMEL)

---

## ✨ Future Improvements

* JWT Authentication
* Dark/Light mode toggle
* Lazy loading modules
* Unit & e2e testing (Jasmine/Karma)
* Full admin dashboard

---

## ✅ License

This project is open-source and available under the [MIT License](LICENSE).
